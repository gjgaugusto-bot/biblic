import assert from "node:assert/strict";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const baseURL = process.env.SITE_URL || "http://127.0.0.1:4173";
const browser = await chromium.launch({ headless: true });
const failures = [];
const pageErrors = [];
const axeFindings = [];

async function scanAccessibility(page, label) {
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  for (const violation of result.violations) {
    axeFindings.push({
      screen: label,
      id: violation.id,
      impact: violation.impact,
      description: violation.help,
      nodes: violation.nodes.map(node => ({ target: node.target, html: node.html, failureSummary: node.failureSummary }))
    });
  }
}

try {
  const context = await browser.newContext({ viewport: { width: 1365, height: 900 }, acceptDownloads: true });
  const page = await context.newPage();
  page.on("pageerror", error => pageErrors.push(error.message));

  const response = await page.goto(baseURL, { waitUntil: "networkidle" });
  assert.equal(response?.status(), 200, "A página inicial deve responder HTTP 200");
  assert.match(await page.title(), /Enciclopédia Bíblica/);
  await page.locator("#oldBooks .book").first().waitFor();
  assert.equal(await page.locator(".book").count(), 66, "A página deve exibir os 66 livros");
  const expectedChapterCounts = [50,40,27,36,34,24,21,4,31,24,22,25,29,36,10,13,10,42,150,31,12,8,66,52,5,48,12,14,3,9,1,4,7,3,3,3,2,14,4,28,16,24,21,28,16,16,13,6,6,4,4,5,3,6,4,3,5,5,3,5,1,1,1,22];
  for (let index = 0; index < expectedChapterCounts.length; index++) {
    await page.locator(".book").nth(index).click();
    await page.locator("#readerView").waitFor({ state: "visible" });
    assert.equal(await page.locator("#chapterLinks [data-chapter-number]").count(), expectedChapterCounts[index], `A contagem de capítulos de ${index + 1} deve ser correta`);
    await page.locator('.navbtn[data-view="home"]').click();
  }

  await scanAccessibility(page, "início");
  assert.equal(await page.locator(".book-illustration[aria-hidden=\"true\"]").count(), 66, "As gravuras são decorativas e não devem duplicar os nomes dos livros");

  assert.equal(await page.locator("#search").count(), 0, "A página inicial não deve exibir o campo de busca removido");
  await page.locator("#oldBooks .book").first().click();
  await page.locator("#readerView").waitFor({ state: "visible" });
  await page.getByRole("heading", { name: "Sobre o livro" }).waitFor();
  assert.ok(await page.locator(".book-info").innerText().then(text => text.includes("Idioma original")));
  assert.ok(await page.locator(".book-info").innerText().then(text => text.includes("Autoria")));
  await scanAccessibility(page, "ficha do livro");

  await page.locator('#chapterLinks [data-chapter-number="4"]').click();
  await page.locator("#reader h1").waitFor();
  assert.ok((await page.locator("#reader").innerText()).includes("Caim"));
  await page.locator('[data-section="symbols"]').click();
  assert.ok((await page.locator('[data-panel="symbols"]').innerText()).includes("Simbologias deste capítulo"));
  assert.equal(await page.locator('[data-section="symbols"]').getAttribute("aria-selected"), "true");
  await page.locator('[data-section="symbols"]').press("ArrowLeft");
  assert.equal(await page.locator('[data-section="characters"]').getAttribute("aria-selected"), "true", "As abas devem funcionar pelo teclado");
  await scanAccessibility(page, "leitor de capítulo");

  await page.locator("#chapterList").click();
  await page.locator('.navbtn[data-view="admin"]').click();
  await page.locator("#adminView").waitFor({ state: "visible" });
  await page.locator("#editBook").selectOption("0");
  await page.locator("#editChapter").selectOption("4");
  const marker = "Teste automático de persistência — não é conteúdo editorial.";
  await page.locator("#chapterSummary").fill(marker);
  await page.locator("#saveChapter").click();
  assert.match(await page.locator("#saveStatus").innerText(), /salvo neste navegador/);
  await page.reload({ waitUntil: "networkidle" });
  await page.locator('.navbtn[data-view="admin"]').click();
  await page.locator("#editBook").selectOption("0");
  await page.locator("#editChapter").selectOption("4");
  assert.equal(await page.locator("#chapterSummary").inputValue(), marker, "A edição deve persistir após recarregar");
  await scanAccessibility(page, "painel administrativo");

  const categoryTitle = "Simbologias de teste";
  await page.locator("#studyCategoryTitleSymbols").fill(categoryTitle);
  await page.locator("#saveStudyCategories").click();
  assert.match(await page.locator("#studyCategoriesStatus").innerText(), /Abas atualizadas e salvas/);
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem("encBibStudyCategories"))["Símbolos"].title), categoryTitle, "As categorias devem ser salvas no armazenamento local");
  await page.reload({ waitUntil: "networkidle" });
  await page.locator(".navbtn[data-view=\"admin\"]").click();
  assert.equal(await page.locator("#studyCategoryTitleSymbols").inputValue(), categoryTitle, "As categorias devem persistir após recarregar");

  await page.locator("#symbolName").fill("Símbolo de teste");
  await page.locator("#symbolText").fill("Descrição de teste isolada.");
  await page.locator("#addSymbol").click();
  assert.match(await page.locator("#symbolStatus").innerText(), /adicionada/);

  await page.locator("#characterName").fill("Personagem de teste");
  await page.locator("#characterBio").fill("Biografia de teste isolada.");
  await page.locator("#addCharacter").click();
  assert.match(await page.locator("#characterStatus").innerText(), /adicionado/);

  await page.locator("#guideName").fill("Guia de teste");
  await page.locator("#guideDescription").fill("Descrição de teste.");
  await page.locator("#guideContent").fill("Conteúdo de teste.");
  await page.locator("#addGuide").click();
  assert.match(await page.locator("#guideStatus").innerText(), /criada/);

  const downloadPromise = page.waitForEvent("download");
  await page.locator("#exportData").click();
  const download = await downloadPromise;
  assert.equal(download.suggestedFilename(), "backup-enciclopedia-biblica.json");
  const exportStream = await download.createReadStream();
  const exportChunks = [];
  for await (const chunk of exportStream) exportChunks.push(chunk);
  const exportedBackup = JSON.parse(Buffer.concat(exportChunks).toString("utf8"));
  assert.equal(exportedBackup.studyCategories["Símbolos"].title, categoryTitle, "O backup exportado deve incluir as categorias personalizadas");

  const importData = {
    edits: { "0-4": { title: "Título restaurado pelo teste" } },
    guides: [{ name: "Guia importada", description: "Descrição", content: "Conteúdo" }],
    studyEdits: {},
    studyCategories: { "Símbolos": { title: "Categoria importada", description: "Descrição importada" } },
    symbols: [{ name: "Símbolo importado", text: "Descrição importada" }],
    characters: [{ name: "Personagem importado", bio: "Biografia importada" }]
  };
  await page.locator("#importData").setInputFiles({
    name: "backup-teste.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(importData))
  });
  await page.waitForFunction(() => document.querySelector("#saveStatus")?.textContent.includes("Backup importado e validado"));
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem("enciclopediaBiblicaEditsV1"))["0-4"].title), "Título restaurado pelo teste");
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem("encBibStudyCategories"))["Símbolos"].title), "Categoria importada", "A importação deve restaurar as categorias personalizadas");
  assert.equal(await page.locator("#studyCategoryTitleSymbols").inputValue(), "Categoria importada");

  page.once("dialog", dialog => dialog.accept());
  await page.locator("#clearData").click();
  assert.equal(await page.evaluate(() => localStorage.getItem("enciclopediaBiblicaEditsV1")), null, "Limpeza deve remover os dados locais após confirmação");

  const mobile = await context.newPage();
  await mobile.setViewportSize({ width: 390, height: 844 });
  mobile.on("pageerror", error => pageErrors.push(error.message));
  await mobile.goto(baseURL, { waitUntil: "networkidle" });
  const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert.ok(overflow <= 1, `A página não deve ter rolagem horizontal no celular (overflow: ${overflow}px)`);
  assert.equal(await mobile.locator("#search").count(), 0, "A página móvel também não deve exibir o campo de busca removido");
  assert.equal(await mobile.locator(".book").count(), 66, "Os 66 livros devem continuar visíveis no celular");

  assert.deepEqual(pageErrors, [], "Não devem ocorrer exceções JavaScript no navegador");
  if (axeFindings.length) {
    console.error("VIOLAÇÕES DE ACESSIBILIDADE:", JSON.stringify(axeFindings, null, 2));
    failures.push(`${axeFindings.length} violações detectáveis de acessibilidade`);
  }
  if (failures.length) throw new Error(failures.join("; "));
  console.log("TESTES DE NAVEGADOR APROVADOS: 66 livros, ficha do livro, capítulo 4, abas, persistência, categorias da biblioteca, simbologia, personagem, guia, exportação, importação, limpeza, celular e acessibilidade.");
} catch (error) {
  console.error("FALHA NOS TESTES DE NAVEGADOR:", error);
  process.exitCode = 1;
} finally {
  if (pageErrors.length) console.error("ERROS JAVASCRIPT:", JSON.stringify(pageErrors));
  await browser.close();
}
