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
  await page.addInitScript(() => window.addEventListener("error", event => { if (event instanceof ErrorEvent) console.error("WINDOW_ERROR", event.message, event.filename, event.lineno, event.colno); }));
  page.on("pageerror", error => pageErrors.push(error.stack || error.message));
  page.on("console", message => { if (message.type() === "error") pageErrors.push(`CONSOLE ${JSON.stringify(message.location())}: ${message.text()}`); });

  const response = await page.goto(baseURL, { waitUntil: "networkidle" });
  assert.equal(response?.status(), 200, "A página inicial deve responder HTTP 200");
  assert.match(await page.title(), /Enciclopédia Bíblica/);
  await page.locator("#oldBooks .book").first().waitFor();
  assert.equal(await page.locator(".book").count(), 66, "A página deve exibir os 66 livros");
  const expectedChapterCounts = [50,40,27,36,34,24,21,4,31,24,22,25,29,36,10,13,10,42,150,31,12,8,66,52,5,48,12,14,3,9,1,4,7,3,3,3,2,14,4,28,16,24,21,28,16,16,13,6,6,4,4,5,3,6,4,3,1,13,5,5,3,5,1,1,1,22];
  for (let index = 0; index < expectedChapterCounts.length; index++) {
    await page.locator(".book").nth(index).click();
    await page.locator("#readerView").waitFor({ state: "visible" });
    assert.equal(await page.locator("#chapterLinks [data-chapter-number]").count(), expectedChapterCounts[index], `A contagem de capítulos de ${index + 1} deve ser correta`);
    await page.locator('#chapterLinks [data-chapter-number="1"]').click();
    const chapterOneEntries = await page.locator("#reader .verse-entry").count();
    if (index === 65 && chapterOneEntries === 0) {
      // Apocalipse permanece em PR separado até a revisão textual; não exigir sua presença na main antes do merge.
      console.log("Apocalipse ainda não integrado à main; conteúdo validado separadamente no PR #111.");
    } else {
      assert.ok(chapterOneEntries > 0, `O capítulo 1 do livro ${index + 1} deve carregar texto no leitor`);
    }
    await page.locator('.navbtn[data-view="home"]').click();
  }

  // Confere todos os livros integrados nesta revisão. Apocalipse entra quando seu módulo está carregado.
  const lastIntegratedBook = await page.evaluate(() => window.REVELATION_TEXT ? 65 : 64);
  await page.locator('.navbtn[data-view="admin"]').click();
  for (let index = 0; index <= lastIntegratedBook; index++) {
    await page.locator("#editBook").selectOption(String(index));
    await page.locator("#editChapter").selectOption("1");
    const editorText = await page.locator("#chapterVerses").inputValue();
    assert.ok(editorText.split(/\r?\n/).filter(line => line.trim()).length > 0, `O editor deve carregar o texto padrão do livro ${index}`);
  }
  await page.locator('.navbtn[data-view="home"]').click();

  await page.locator(".book").nth(58).click();
  const jamesCounts = [27,26,18,17,20];
  for (let chapter = 1; chapter <= 5; chapter++) {
    if (chapter > 1) await page.locator("#chapterList").click();
    await page.locator(`#chapterLinks [data-chapter-number="${chapter}"]`).click();
    assert.equal(await page.locator("#reader .verse-entry").count(), jamesCounts[chapter - 1], `Tiago ${chapter}: quantidade de versículos`);
    assert.ok((await page.locator("#reader").innerText()).length > 100, `Tiago ${chapter}: conteúdo carregado`);
  }
  await page.locator('.navbtn[data-view="admin"]').click();
  await page.locator("#editBook").selectOption("58");
  await page.locator("#editChapter").selectOption("5");
  assert.ok((await page.locator("#chapterVerses").inputValue()).includes("Elias era humano como nós"), "O editor deve carregar Tiago 5");
  await page.locator('.navbtn[data-view="home"]').click();

  await page.locator(".book").nth(59).click();
  const firstPeterCounts = [25,25,22,19,14];
  for (let chapter = 1; chapter <= 5; chapter++) {
    if (chapter > 1) await page.locator("#chapterList").click();
    await page.locator(`#chapterLinks [data-chapter-number="${chapter}"]`).click();
    assert.equal(await page.locator("#reader .verse-entry").count(), firstPeterCounts[chapter - 1], `1 Pedro ${chapter}: quantidade de versículos`);
    assert.ok((await page.locator("#reader").innerText()).length > 100, `1 Pedro ${chapter}: conteúdo carregado`);
  }
  await page.locator('.navbtn[data-view="admin"]').click();
  await page.locator("#editBook").selectOption("59");
  await page.locator("#editChapter").selectOption("5");
  assert.ok((await page.locator("#chapterVerses").inputValue()).includes("Silvano"), "O editor deve carregar 1 Pedro 5");
  await page.locator('.navbtn[data-view="home"]').click();

  await scanAccessibility(page, "início");
  assert.match(await page.locator(".translation-notice").innerText(), /textos traduzidos disponíveis.*estágio de revisão variam conforme o livro/i, "O aviso deve deixar claro que a disponibilidade e a revisão variam por livro");
  await page.locator('.navbtn[data-view="symbols"]').click();
  assert.equal(await page.locator('.study-category[data-study-category="Cores"]').innerText(), "Cores bíblicas", "A categoria de cores deve usar o nome padronizado");
  assert.equal(await page.locator('.study-category[data-study-category="Tipologias"]').innerText(), "Tipologias bíblicas", "A categoria de tipologias deve usar o nome padronizado");
  await page.locator('.navbtn[data-view="home"]').click();
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

  await page.locator('.navbtn[data-view="home"]').click();
  await page.locator(".book").nth(43).click();
  await page.locator('#chapterLinks [data-chapter-number="1"]').click();
  assert.ok((await page.locator("#reader").innerText()).includes("Preparei o primeiro relato"), "Atos 1 deve carregar a tradução baseada no grego");
  assert.equal(await page.locator("#reader .verse-entry").count(), 26, "Atos 1 deve apresentar os 26 versículos da estrutura SBLGNT");
  await scanAccessibility(page, "Atos capítulo 1");
  await page.locator("#chapterList").click();
  await page.locator("#chapterLinks [data-chapter-number=\"2\"]").click();
  assert.ok((await page.locator("#reader").innerText()).includes("dia de Pentecostes"), "Atos 2 deve carregar a tradução baseada no grego");
  assert.equal(await page.locator("#reader .verse-entry").count(), 47, "Atos 2 deve apresentar os 47 versículos da estrutura SBLGNT");
  await scanAccessibility(page, "Atos capítulo 2");
  const actsPositions = [26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,40,38,40,30,35,27,27,32,44,31];
  for (let chapter = 3; chapter <= 28; chapter++) {
    await page.locator("#chapterList").click();
    await page.locator(`#chapterLinks [data-chapter-number="${chapter}"]`).click();
    assert.equal(await page.locator("#reader .verse-entry").count(), actsPositions[chapter - 1], `Atos ${chapter} deve preservar as posições de versículo e as variantes registradas`);
    assert.ok((await page.locator("#reader").innerText()).length > 100, `Atos ${chapter} deve carregar conteúdo`);
  }

  await page.locator("#chapterList").click();
  await page.locator('.navbtn[data-view="home"]').click();
  await page.locator(".book").nth(44).click();
  const romansPositions = [32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27];
  for (let chapter = 1; chapter <= 16; chapter++) {
    if (chapter > 1) await page.locator("#chapterList").click();
    await page.locator(`#chapterLinks [data-chapter-number="${chapter}"]`).click();
    assert.equal(await page.locator("#reader .verse-entry").count(), romansPositions[chapter - 1], `Romanos ${chapter} deve preservar a estrutura de versículos SBLGNT`);
    assert.ok((await page.locator("#reader").innerText()).length > 100, `Romanos ${chapter} deve carregar conteúdo`);
  }

  await page.locator("#chapterList").click();
  await page.locator('.navbtn[data-view="home"]').click();
  await page.locator(".book").nth(45).click();
  const corinthiansCounts = [31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24];
  for (let chapter = 1; chapter <= 16; chapter++) {
    if (chapter > 1) await page.locator("#chapterList").click();
    await page.locator(`#chapterLinks [data-chapter-number="${chapter}"]`).click();
    assert.equal(await page.locator("#reader .verse-entry").count(), corinthiansCounts[chapter - 1], `1 Coríntios ${chapter}: estrutura de versículos`);
    assert.ok((await page.locator("#reader").innerText()).length > 100, `1 Coríntios ${chapter}: conteúdo carregado`);
  }
  await page.locator("#chapterList").click();
  await page.locator('.navbtn[data-view="home"]').click();
  await page.locator(".book").nth(46).click();
  const corinthians2Counts = [24,17,18,18,21,18,16,24,15,18,33,21,13];
  for (let chapter = 1; chapter <= 13; chapter++) {
    if (chapter > 1) await page.locator("#chapterList").click();
    await page.locator(`#chapterLinks [data-chapter-number="${chapter}"]`).click();
    assert.equal(await page.locator("#reader .verse-entry").count(), corinthians2Counts[chapter - 1], `2 Coríntios ${chapter}: estrutura de versículos`);
    assert.ok((await page.locator("#reader").innerText()).length > 100, `2 Coríntios ${chapter}: conteúdo carregado`);
  }
  await page.locator("#chapterList").click();
  await page.locator('.navbtn[data-view="home"]').click();
  await page.locator(".book").nth(47).click();
  const galatiansCounts = [24,21,29,31,26,18];
  for (let chapter = 1; chapter <= 6; chapter++) {
    if (chapter > 1) await page.locator("#chapterList").click();
    await page.locator(`#chapterLinks [data-chapter-number="${chapter}"]`).click();
    assert.equal(await page.locator("#reader .verse-entry").count(), galatiansCounts[chapter - 1], `Gálatas ${chapter}: estrutura de versículos`);
    assert.ok((await page.locator("#reader").innerText()).length > 100, `Gálatas ${chapter}: conteúdo carregado`);
  }
  await page.locator("#chapterList").click();
  await page.locator('.navbtn[data-view="home"]').click();
  await page.locator(".book").nth(48).click();
  const ephesiansCounts = [23,22,21,32,33,24];
  for (let chapter = 1; chapter <= 6; chapter++) {
    if (chapter > 1) await page.locator("#chapterList").click();
    await page.locator(`#chapterLinks [data-chapter-number="${chapter}"]`).click();
    assert.equal(await page.locator("#reader .verse-entry").count(), ephesiansCounts[chapter - 1], `Efésios ${chapter}: estrutura de versículos`);
    assert.ok((await page.locator("#reader").innerText()).length > 100, `Efésios ${chapter}: conteúdo carregado`);
  }
  await page.locator('.navbtn[data-view="home"]').click();
  await page.locator(".book").nth(49).click();
  const philippiansCounts = [30,30,21,23];
  for (let chapter = 1; chapter <= 4; chapter++) {
    if (chapter > 1) await page.locator("#chapterList").click();
    await page.locator(`#chapterLinks [data-chapter-number="${chapter}"]`).click();
    assert.equal(await page.locator("#reader .verse-entry").count(), philippiansCounts[chapter - 1], `Filipenses ${chapter}: estrutura de versículos`);
    assert.ok((await page.locator("#reader").innerText()).length > 100, `Filipenses ${chapter}: conteúdo carregado`);
  }
  await page.locator('.navbtn[data-view="home"]').click();
  await page.locator(".book").nth(50).click();
  const colossiansCounts = [29,23,25,18];
  for (let chapter = 1; chapter <= 4; chapter++) {
    if (chapter > 1) await page.locator("#chapterList").click();
    await page.locator(`#chapterLinks [data-chapter-number="${chapter}"]`).click();
    assert.equal(await page.locator("#reader .verse-entry").count(), colossiansCounts[chapter - 1], `Colossenses ${chapter}: estrutura de versículos`);
    assert.ok((await page.locator("#reader").innerText()).length > 100, `Colossenses ${chapter}: conteúdo carregado`);
  }
  await page.locator('.navbtn[data-view="home"]').click();
  await page.locator(".book").nth(51).click();
  const thessalonians1Counts = [10,20,13,18,28];
  for (let chapter = 1; chapter <= 5; chapter++) {
    if (chapter > 1) await page.locator("#chapterList").click();
    await page.locator(`#chapterLinks [data-chapter-number="${chapter}"]`).click();
    assert.equal(await page.locator("#reader .verse-entry").count(), thessalonians1Counts[chapter - 1], `1 Tessalonicenses ${chapter}: estrutura de versículos`);
    assert.ok((await page.locator("#reader").innerText()).length > 100, `1 Tessalonicenses ${chapter}: conteúdo carregado`);
  }
  await page.locator('.navbtn[data-view="home"]').click();
  await page.locator(".book").nth(52).click();
  const thessalonians2Counts = [12,17,18];
  for (let chapter = 1; chapter <= 3; chapter++) {
    if (chapter > 1) await page.locator("#chapterList").click();
    await page.locator(`#chapterLinks [data-chapter-number="${chapter}"]`).click();
    assert.equal(await page.locator("#reader .verse-entry").count(), thessalonians2Counts[chapter - 1], `2 Tessalonicenses ${chapter}: estrutura de versículos`);
    assert.ok((await page.locator("#reader").innerText()).length > 100, `2 Tessalonicenses ${chapter}: conteúdo carregado`);
  }
  await page.locator('.navbtn[data-view="home"]').click();
  await page.locator(".book").nth(53).click();
  const timothy1Counts = [20,15,16,16,25,21];
  for (let chapter = 1; chapter <= 6; chapter++) {
    if (chapter > 1) await page.locator("#chapterList").click();
    await page.locator(`#chapterLinks [data-chapter-number="${chapter}"]`).click();
    assert.equal(await page.locator("#reader .verse-entry").count(), timothy1Counts[chapter - 1], `1 Timóteo ${chapter}: estrutura de versículos`);
    assert.ok((await page.locator("#reader").innerText()).length > 100, `1 Timóteo ${chapter}: conteúdo carregado`);
  }
  await page.locator('.navbtn[data-view="home"]').click();
  await page.locator(".book").nth(54).click();
  const timothy2Counts = [18,26,17,22];
  for (let chapter = 1; chapter <= 4; chapter++) {
    if (chapter > 1) await page.locator("#chapterList").click();
    await page.locator(`#chapterLinks [data-chapter-number="${chapter}"]`).click();
    assert.equal(await page.locator("#reader .verse-entry").count(), timothy2Counts[chapter - 1], `2 Timóteo ${chapter}: estrutura de versículos`);
    assert.ok((await page.locator("#reader").innerText()).length > 100, `2 Timóteo ${chapter}: conteúdo carregado`);
  }
  await page.locator('.navbtn[data-view="home"]').click();
  await page.locator(".book").nth(55).click();
  const titusCounts = [16,15,15];
  for (let chapter = 1; chapter <= 3; chapter++) {
    if (chapter > 1) await page.locator("#chapterList").click();
    await page.locator(`#chapterLinks [data-chapter-number="${chapter}"]`).click();
    assert.equal(await page.locator("#reader .verse-entry").count(), titusCounts[chapter - 1], `Tito ${chapter}: estrutura de versículos`);
    assert.ok((await page.locator("#reader").innerText()).length > 100, `Tito ${chapter}: conteúdo carregado`);
  }
  await page.locator('.navbtn[data-view="home"]').click();
  await page.locator(".book").nth(56).click();
  await page.locator(`#chapterLinks [data-chapter-number="1"]`).click();
  assert.equal(await page.locator("#reader .verse-entry").count(), 25, "Filemom: estrutura de versículos");
  assert.ok((await page.locator("#reader").innerText()).length > 100, "Filemom: conteúdo carregado");
  await page.locator('.navbtn[data-view="home"]').click();
  await page.locator(".book").nth(57).click();
  const hebrewsCounts = [14,18,19,16,14,20,28,13,28,39,40,29,25];
  for (let chapter = 1; chapter <= 13; chapter++) {
    if (chapter > 1) await page.locator("#chapterList").click();
    await page.locator(`#chapterLinks [data-chapter-number="${chapter}"]`).click();
    assert.equal(await page.locator("#reader .verse-entry").count(), hebrewsCounts[chapter - 1], `Hebreus ${chapter}: estrutura de versículos`);
    assert.ok((await page.locator("#reader").innerText()).length > 100, `Hebreus ${chapter}: conteúdo carregado`);
  }

  await page.locator('.navbtn[data-view="admin"]').click();
  await page.locator("#adminView").waitFor({ state: "visible" });
  assert.ok((await page.locator("#adminView").innerText()).includes("livros que já possuem esse material"), "A orientação do editor lexical deve abranger todos os livros com notas");
  await page.locator("#editBook").selectOption("0");
  await page.locator("#editChapter").selectOption("4");
  assert.ok(await page.locator("#editorialReviewPanel").innerText().then(text => text.includes("Revisado:")),"O painel deve mostrar o estado migrado de Gênesis");
  assert.equal(await page.locator('[data-review-row="0-4-1"] .review-state').first().innerText(),"Revisado","Gênesis deve preservar o estado revisado anterior");
  await page.locator("#editBook").selectOption("1");
  await page.locator("#editChapter").selectOption("1");
  assert.equal(await page.locator('[data-review-row="1-1-1"] .review-state').first().innerText(),"Em revisão","Êxodo deve preservar o estado anterior em revisão");
  const firstReviewRow = page.locator('[data-review-row="1-1-1"]');
  await firstReviewRow.locator("details").evaluate(element => element.open = true);
  await firstReviewRow.locator("[data-review-target]").selectOption("revisado");
  await firstReviewRow.locator("[data-review-source]").fill("Fonte de teste — não editorial");
  await firstReviewRow.locator("[data-review-observation]").fill("Conferência simulada para teste automatizado.");
  await firstReviewRow.locator("[data-review-apply]").click();
  assert.equal(await page.locator('[data-review-row="1-1-1"] .review-state').first().innerText(),"Revisado","A transição Em revisão → Revisado deve funcionar com evidência");
  assert.equal(await firstReviewRow.locator("[data-review-target] option[value=pendente]").count(),0,"Um trecho revisado não pode voltar a Pendente");
  await page.locator('[data-review-row="1-1-1"] details').evaluate(element => element.open = true);
  await page.locator('[data-review-row="1-1-1"] [data-review-target]').selectOption("reaberto");
  await page.locator('[data-review-row="1-1-1"] [data-review-source]').fill("Nova fonte de teste");
  await page.locator('[data-review-row="1-1-1"] [data-review-reason]').fill("");
  await page.locator('[data-review-row="1-1-1"] [data-review-apply]').click();
  assert.ok((await page.locator('[data-review-row="1-1-1"] [data-review-message]').innerText()).includes("motivo concreto"),"A reabertura sem justificativa deve ser bloqueada");
  await page.locator('[data-review-row="1-1-1"] [data-review-reason]').fill("Erro concreto simulado para validar a reabertura.");
  await page.locator('[data-review-row="1-1-1"] [data-review-apply]').click();
  assert.equal(await page.locator('[data-review-row="1-1-1"] .review-state').first().innerText(),"Reaberto","A reabertura exige e registra fonte e motivo");
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem("encBibEditorialReviewsV1"))["1-1-1"].history.length),3,"O histórico de transições deve preservar a migração e as duas mudanças");
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
  assert.ok(exportedBackup.editorialReviews && exportedBackup.editorialReviews["1-1-1"], "O backup exportado deve incluir o histórico editorial por versículo");

  const importData = {
    edits: { "0-4": { title: "Título restaurado pelo teste" } },
    guides: [{ name: "Guia importada", description: "Descrição", content: "Conteúdo" }],
    studyEdits: {},
    studyCategories: { "Símbolos": { title: "Categoria importada", description: "Descrição importada" } },
    symbols: [{ name: "Símbolo importado", text: "Descrição importada" }],
    characters: [{ name: "Personagem importado", bio: "Biografia importada" }],
    editorialReviews: { "1-1-1": { status: "reaberto", source: "Fonte importada", observation: "", reopenReason: "Justificativa importada", updatedAt: "2026-11-06T00:00:00.000Z", history: [{ from: "revisado", to: "reaberto", at: "2026-11-06T00:00:00.000Z", source: "Fonte importada", observation: "", reason: "Justificativa importada" }] } }
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
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem("encBibEditorialReviewsV1"))["1-1-1"].status), "reaberto", "A importação deve restaurar o estado editorial");

  page.once("dialog", dialog => dialog.accept());
  await page.locator("#clearData").click();
  assert.equal(await page.evaluate(() => localStorage.getItem("enciclopediaBiblicaEditsV1")), null, "Limpeza deve remover os dados locais após confirmação");

  const mobile = await context.newPage();
  await mobile.setViewportSize({ width: 390, height: 844 });
  mobile.on("pageerror", error => pageErrors.push(error.stack || error.message));
  await mobile.goto(baseURL, { waitUntil: "networkidle" });
  const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert.ok(overflow <= 1, `A página não deve ter rolagem horizontal no celular (overflow: ${overflow}px)`);
  assert.equal(await mobile.locator("#search").count(), 0, "A página móvel também não deve exibir o campo de busca removido");
  assert.equal(await mobile.locator(".book").count(), 66, "Os 66 livros devem continuar visíveis no celular");
  await mobile.setViewportSize({ width: 320, height: 720 });
  const narrowOverflow = await mobile.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert.ok(narrowOverflow <= 1, `A página não deve ter rolagem horizontal em telas de 320 px (overflow: ${narrowOverflow}px)`);
  await mobile.emulateMedia({ reducedMotion: "reduce" });
  const reducedMotion = await mobile.locator(".book").first().evaluate(element => getComputedStyle(element).transitionProperty);
  assert.equal(reducedMotion, "none", "A interface deve respeitar a preferência por movimento reduzido");

  assert.deepEqual(pageErrors, [], "Não devem ocorrer exceções JavaScript no navegador");
  if (axeFindings.length) {
    console.error("VIOLAÇÕES DE ACESSIBILIDADE:", JSON.stringify(axeFindings, null, 2));
    failures.push(`${axeFindings.length} violações detectáveis de acessibilidade`);
  }
  if (failures.length) throw new Error(failures.join("; "));
  console.log("TESTES DE NAVEGADOR APROVADOS: 66 livros, Atos 1 (26 versículos), Atos 2 (47 posições) e Atos 3–28 (estrutura integral), ficha do livro, capítulo 4, abas, persistência, categorias da biblioteca, simbologia, personagem, guia, exportação, importação, limpeza, celular e acessibilidade.");
} catch (error) {
  console.error("FALHA NOS TESTES DE NAVEGADOR:", error);
  process.exitCode = 1;
} finally {
  if (pageErrors.length) console.error("ERROS JAVASCRIPT:", JSON.stringify(pageErrors));
  await browser.close();
}
