import { readFileSync, existsSync } from "node:fs";
import { runInNewContext } from "node:vm";

const fail = (message) => {
  console.error("FALHA:", message);
  process.exitCode = 1;
};
const required = ["index.html", "style.css", "app.js", "study-data.js", "book-art.js", "editorial-review.js", "REGISTRO-EDITORIAL.md", "scripts/browser-smoke.mjs"];
for (const file of required) {
  if (!existsSync(file)) fail(`Arquivo obrigatório ausente: ${file}`);
  else if (!readFileSync(file, "utf8").trim()) fail(`Arquivo obrigatório vazio: ${file}`);
}

if (existsSync("index.html") && existsSync("app.js")) {
  const html = readFileSync("index.html", "utf8");
  const app = readFileSync("app.js", "utf8");
  const scripts = ["study-data.js", "book-art.js", "exodus-data.js", "exodus-11-15.js", "exodus-16-20.js", "exodus-21-25.js", "exodus-26-30.js", "exodus-31-35.js", "exodus-36-40.js", "translation-notes.js", "app.js", "editorial-review.js"];
  const positions = scripts.map((name) => html.indexOf(name));
  if (positions.some((position) => position < 0)) fail("index.html precisa carregar study-data.js, book-art.js e app.js");
  else if (!(positions[0] < positions[1] && positions[1] < positions[2]))
    fail("A ordem dos scripts deve ser study-data.js, book-art.js e app.js");

  if (html.includes('id="search"') || app.includes("ensureSearchInput")) fail("A busca de livros da página inicial foi removida e não deve ser recriada pelo JavaScript");
  for (const id of ["studyCategoryTitleSymbols","studyCategoryTitleColors","studyCategoryTitleNumbers","studyCategoryTitleTypes","saveStudyCategories","resetStudyCategories"]) {
    if (!html.includes(`id="${id}"`)) fail(`Editor de categorias incompleto: ${id}`);
  }
  if (!app.includes("STUDY_CATEGORIES_KEY") || !app.includes("saveStudyCategorySettings") || !app.includes("studyCategories"))
    fail("As categorias da biblioteca precisam ser salvas e incluídas no backup");
  const review = readFileSync("editorial-review.js", "utf8");
  if (!html.includes("editorialReviewPanel") || !review.includes("revisado") || !review.includes("reaberto")) fail("O controle editorial por versículo está incompleto");
  if (!app.includes("encBibEditorialReviewsV1") || !app.includes("editorialReviews")) fail("O histórico editorial precisa integrar os backups locais e a exportação/importação");
  if (!review.includes("TRANSITIONS") || !review.includes("motivo concreto") || !review.includes("fonte relevante")) fail("As regras de transição e reabertura do controle editorial estão ausentes");

  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map((m) => m[1]);
  const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (duplicates.length) fail(`IDs HTML duplicados: ${[...new Set(duplicates)].join(", ")}`);

  const match = app.match(/const BOOKS=(\[[\s\S]*?\]);/);
  if (!match) fail("Não foi possível localizar a configuração BOOKS");
  else {
    try {
      const books = JSON.parse(match[1]);
      if (books.length !== 66) fail(`Esperados 66 livros; encontrados ${books.length}`);
      if (books.some((book) => !book.name || !Number.isInteger(book.chapters) || book.chapters < 1))
        fail("Há livro sem nome ou contagem de capítulos válida");
      const expectedChapterCounts = [50,40,27,36,34,24,21,4,31,24,22,25,29,36,10,13,10,42,150,31,12,8,66,52,5,48,12,14,3,9,1,4,7,3,3,3,2,14,4,28,16,24,21,28,16,16,13,6,6,4,4,5,3,6,4,3,1,13,5,5,3,5,1,1,1,22];
      if (books.length === expectedChapterCounts.length && books.some((book, index) => book.chapters !== expectedChapterCounts[index]))
        fail("A contagem de capítulos dos 66 livros diverge da configuração canônica esperada");
      if (new Set(books.map((book) => book.name)).size !== books.length) fail("Há nomes de livros duplicados");
      if (new Set(books.map((book) => book.slug)).size !== books.length) fail("Há identificadores internos de livros duplicados");
      if (books.reduce((sum, book) => sum + book.chapters, 0) !== 1189) fail("A soma dos capítulos deve ser 1.189");
      const genesis = books.find((book) => book.name === "Gênesis");
      if (!genesis || genesis.chapters !== 50) fail("Configuração de Gênesis deve conter 50 capítulos");
    } catch (error) {
      fail(`Configuração BOOKS não pôde ser validada: ${error.message}`);
    }
  }
  // Confere a contagem de versículos de cada capítulo de Gênesis para detectar omissões acidentais.
  const expectedGenesisVerses = [31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26];
  const chapterVerses = new Map();
  const genesisOne = app.match(/const GENESIS1=(\[[\s\S]*?\]);/);
  const genesisTwo = app.match(/const GENESIS_TEXT=\{1:GENESIS1,2:(\[[\s\S]*?\])\};/);
  if (!genesisOne || !genesisTwo) fail("Não foi possível localizar os textos dos capítulos 1 e 2 de Gênesis");
  else {
    try {
      chapterVerses.set(1, runInNewContext(genesisOne[1], {}));
      chapterVerses.set(2, runInNewContext(genesisTwo[1], {}));
      for (let chapter = 3; chapter <= 50; chapter++) {
        const expression = new RegExp("GENESIS_TEXT\\[" + chapter + "\\]=(\\[[\\s\\S]*?\\]);");
        const match = app.match(expression);
        if (!match) throw new Error("Capítulo " + chapter + " não localizado");
        chapterVerses.set(chapter, runInNewContext(match[1], {}));
      }
      for (let chapter = 1; chapter <= 50; chapter++) {
        const actual = chapterVerses.get(chapter);
        if (!Array.isArray(actual) || actual.length !== expectedGenesisVerses[chapter - 1])
          fail("Gênesis " + chapter + ": esperados " + expectedGenesisVerses[chapter - 1] + " versículos; encontrados " + (Array.isArray(actual) ? actual.length : "conteúdo inválido"));
      }
    } catch (error) {
      fail("Falha ao conferir os versículos de Gênesis: " + error.message);
    }
  }

  if (!app.includes("function validateImportedBackup") || !app.includes("AUTO_BACKUP_HISTORY_KEY"))
    fail("Proteções de importação e histórico de backup local não foram encontradas");
  if (!app.includes("function readLocalArray") || !app.includes("function readLocalObject"))
    fail("As leituras protegidas dos dados locais estão ausentes");
  if (!app.includes("function renderChapterSymbols") || !app.includes("refreshChapterSymbols") || !app.includes("symbolDetailsText"))
    fail("O vínculo de simbologias dos capítulos com a biblioteca do usuário está ausente");
  if (!app.includes('role="tab"') || !app.includes('aria-selected="true"') || !app.includes("tab.onkeydown"))
    fail("As abas do capítulo precisam oferecer semântica acessível e navegação por teclado");
  const artwork = readFileSync("book-art.js", "utf8");
  if (!artwork.includes('aria-hidden="true" focusable="false"') || artwork.includes('role="img" aria-label="Gravura de '))
    fail("As gravuras decorativas devem ser ocultadas de leitores de tela para evitar rótulos redundantes");

  const symbolStart = app.indexOf("function renderChapterSymbols");
  const symbolEnd = app.indexOf("\n\nconst $=", symbolStart);
  if (symbolStart < 0 || symbolEnd < 0) fail("Não foi possível isolar as funções de vínculo de simbologias");
  else {
    try {
      const helperSource = app.slice(symbolStart, symbolEnd);
      const renderStudyItems = (items) => items.map(([name, description]) => name + ":" + description).join("|");
      const esc = (value) => String(value);
      const target = { innerHTML: "" };
      const sandbox = {
        window: { STUDY_LIBRARY: [
          { name: "Pomba", category: "Símbolos", description: "Descrição cadastrada" },
          { name: "Azul", category: "Cores", description: "Não é símbolo" }
        ] },
        readLocalArray: () => [{ name: "Arca", text: "Descrição personalizada" }],
        renderStudyItems,
        esc,
        document: { querySelector: () => target },
        recordAppError: () => {},
        currentBook: 0,
        currentChapter: 1
      };
      runInNewContext(helperSource, sandbox);
      const checks = [
        sandbox.renderChapterSymbols("Pomba").includes("Pomba"),
        sandbox.renderChapterSymbols("Arca").includes("Arca"),
        sandbox.renderChapterSymbols("Azul").includes("Nenhum dos nomes"),
        sandbox.renderChapterSymbols("Nome inexistente").includes("Nenhum dos nomes"),
        sandbox.renderChapterSymbols("").includes("Nenhuma simbologia vinculada"),
        (sandbox.renderChapterSymbols("Pomba\nPomba").match(/Pomba/g) || []).length === 1
      ];
      const asyncTarget = { innerHTML: "" };
      const asyncWindow = {
        loadStudyLibraryData: async function () {
          this.STUDY_LIBRARY = [{ name: "Pomba", category: "Símbolos", description: "Carregado" }];
          return this.STUDY_LIBRARY;
        }
      };
      const asyncSandbox = {
        window: asyncWindow,
        readLocalArray: () => [],
        renderStudyItems,
        esc,
        document: { querySelector: () => asyncTarget },
        recordAppError: () => {},
        currentBook: 0,
        currentChapter: 1
      };
      runInNewContext(helperSource, asyncSandbox);
      await asyncSandbox.refreshChapterSymbols(0, 1, "Pomba");
      checks.push(asyncTarget.innerHTML.includes("Pomba"));
      if (checks.some((passed) => !passed)) fail("Falha nos testes funcionais de vínculo de simbologias");
    } catch (error) {
      fail(`Teste de vínculo de simbologias falhou: ${error.message}`);
    }
  }

  const importStart = app.indexOf("function validateImportedBackup");
  const importEnd = app.indexOf("\n$('importData').onchange", importStart);
  if (importStart < 0 || importEnd < 0) fail("Não foi possível isolar o validador de backups importados");
  else {
    try {
      const importSandbox = {};
      runInNewContext(app.slice(importStart, importEnd), importSandbox);
      const validate = importSandbox.validateImportedBackup;
      const checks = [
        validate({ edits: {}, guides: [], studyEdits: {}, symbols: [], characters: [] }) === "",
        validate({ symbols: [{ name: "Pomba", text: "Descrição" }] }) === "",
        Boolean(validate([])),
        Boolean(validate({ symbols: {} })),
        Boolean(validate({ characters: [null] })),
        Boolean(validate({ characters: [{ bio: "Sem nome" }] }))
      ];
      if (checks.some((passed) => !passed)) fail("Falha nos testes de validação de backups importados");
    } catch (error) {
      fail(`Teste de importação de backup falhou: ${error.message}`);
    }
  }

  if (!app.includes("[...BACKUP_KEYS,AUTO_BACKUP_KEY,AUTO_BACKUP_HISTORY_KEY]"))
    fail("A limpeza de dados locais precisa remover também o histórico de backups automáticos");
  if (!app.includes("file.size>15*1024*1024") || !app.includes("[...BACKUP_KEYS,AUTO_BACKUP_KEY,AUTO_BACKUP_HISTORY_KEY].forEach((storageKey)=>previous[storageKey]"))
    fail("A importação precisa limitar o tamanho do arquivo e preservar rollback completo");
  if (!app.includes("typeof d.versesText==='string'") || !app.includes("typeof x.name==='string'"))
    fail("A leitura de conteúdo local precisa tolerar registros incompletos");
  if (!app.includes("renderBookInfo()") || !app.includes("Sobre o livro"))
    fail("A ficha bibliográfica dos livros não foi localizada no aplicativo");
  if (!app.includes("esc(d.title||b.name+' '+c)"))
    fail("O título editável do capítulo precisa ser escapado antes de entrar no HTML");
  const css = readFileSync("style.css", "utf8");
  if (!css.includes(".book-info") || !css.includes(".book-info-grid"))
    fail("Os estilos da ficha bibliográfica estão ausentes");
}
if (existsSync("scripts/browser-smoke.mjs")) {
  const browserTests = readFileSync("scripts/browser-smoke.mjs", "utf8");
  if (!browserTests.includes("new AxeBuilder") || !browserTests.includes("clearData") || !browserTests.includes("exportData"))
    fail("A suíte de navegador precisa cobrir acessibilidade, limpeza e exportação");
}
if (!process.exitCode) console.log("Validação estrutural aprovada.");
