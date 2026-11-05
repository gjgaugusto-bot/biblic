import { readFileSync, existsSync } from "node:fs";
import { runInNewContext } from "node:vm";

const fail = (message) => {
  console.error("FALHA:", message);
  process.exitCode = 1;
};
const required = ["index.html", "style.css", "app.js", "study-data.js", "book-art.js", "scripts/browser-smoke.mjs"];
for (const file of required) {
  if (!existsSync(file)) fail(`Arquivo obrigatório ausente: ${file}`);
  else if (!readFileSync(file, "utf8").trim()) fail(`Arquivo obrigatório vazio: ${file}`);
}

if (existsSync("index.html") && existsSync("app.js")) {
  const html = readFileSync("index.html", "utf8");
  const app = readFileSync("app.js", "utf8");
  const scripts = ["study-data.js", "book-art.js", "app.js"];
  const positions = scripts.map((name) => html.indexOf(name));
  if (positions.some((position) => position < 0)) fail("index.html precisa carregar study-data.js, book-art.js e app.js");
  else if (!(positions[0] < positions[1] && positions[1] < positions[2]))
    fail("A ordem dos scripts deve ser study-data.js, book-art.js e app.js");

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
      const genesis = books.find((book) => book.name === "Gênesis");
      if (!genesis || genesis.chapters !== 50) fail("Configuração de Gênesis deve conter 50 capítulos");
    } catch (error) {
      fail(`Configuração BOOKS não pôde ser validada: ${error.message}`);
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
