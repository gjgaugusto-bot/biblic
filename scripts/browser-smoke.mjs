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
      elements: violation.nodes.length
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

  await scanAccessibility(page, "início");

  await page.locator("#search").fill("Gênesis");
  assert.equal(await page.locator(".book").count(), 1, "A busca deve filtrar Gênesis");
  await page.locator("#oldBooks .book").click();
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

  const importData = {
    edits: { "0-4": { title: "Título restaurado pelo teste" } },
    guides: [{ name: "Guia importada", description: "Descrição", content: "Conteúdo" }],
    studyEdits: {},
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

  page.once("dialog", dialog => dialog.accept());
  await page.locator("#clearData").click();
  assert.equal(await page.evaluate(() => localStorage.getItem("enciclopediaBiblicaEditsV1")), null, "Limpeza deve remover os dados locais após confirmação");

  const mobile = await context.newPage();
  await mobile.setViewportSize({ width: 390, height: 844 });
  mobile.on("pageerror", error => pageErrors.push(error.message));
  await mobile.goto(baseURL, { waitUntil: "networkidle" });
  const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert.ok(overflow <= 1, `A página não deve ter rolagem horizontal no celular (overflow: ${overflow}px)`);
  await mobile.locator("#search").fill("Apocalipse");
  assert.equal(await mobile.locator(".book").count(), 1, "A busca deve funcionar na largura móvel");

  assert.deepEqual(pageErrors, [], "Não devem ocorrer exceções JavaScript no navegador");
  if (axeFindings.length) {
    console.error("VIOLAÇÕES DE ACESSIBILIDADE:", JSON.stringify(axeFindings, null, 2));
    failures.push(`${axeFindings.length} violações detectáveis de acessibilidade`);
  }
  if (failures.length) throw new Error(failures.join("; "));
  console.log("TESTES DE NAVEGADOR APROVADOS: busca, 66 livros, ficha do livro, capítulo 4, abas, persistência, simbologia, personagem, guia, exportação, importação, limpeza, celular e acessibilidade.");
} catch (error) {
  console.error("FALHA NOS TESTES DE NAVEGADOR:", error);
  process.exitCode = 1;
} finally {
  if (pageErrors.length) console.error("ERROS JAVASCRIPT:", JSON.stringify(pageErrors));
  await browser.close();
}
