import { readFileSync, existsSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { gunzipSync } from "node:zlib";

const fail = (message) => {
  console.error("FALHA:", message);
  process.exitCode = 1;
};
const required = ["index.html", "style.css", "app.js", "study-data.js", "book-art.js"];
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
        getStudyEntries: () => [
          { name: "Pomba", category: "Símbolos", description: "Descrição cadastrada" },
          { name: "Arca", category: "Símbolos", description: "Descrição personalizada" },
          { name: "Azul", category: "Cores", description: "Não é símbolo" }
        ],
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
        getStudyEntries: () => (asyncWindow.STUDY_LIBRARY || []).filter((item) => item.category === "Símbolos"),
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

  const arrayStart = app.indexOf("function readLocalArray");
  const arrayEnd = app.indexOf("function readLocalObject", arrayStart);
  if (arrayStart < 0 || arrayEnd < 0) fail("Não foi possível isolar a leitura segura de listas locais");
  else {
    try {
      const errors = [];
      const source = [{ name: "Moisés", bio: "Biografia" }, null, { bio: "Sem nome" }, { name: "Arão", bio: 4 }];
      const sandbox = { readLocalData: () => source, recordAppError: (...args) => errors.push(args) };
      runInNewContext(app.slice(arrayStart, arrayEnd), sandbox);
      const items = sandbox.readLocalArray("encBibCharacters");
      if (items.length !== 2 || items[1].bio !== "" || source.length !== 4 || !errors.length)
        fail("A leitura protegida de listas não filtrou registros inválidos sem alterar os dados originais");
    } catch (error) {
      fail(`Teste de listas locais falhou: ${error.message}`);
    }
  }

  const entriesStart = app.indexOf("function getStudyEntries");
  const entriesEnd = app.indexOf("async function renderSymbols", entriesStart);
  if (entriesStart < 0 || entriesEnd < 0) fail("Não foi possível isolar a composição da biblioteca de estudos");
  else {
    try {
      const sandbox = {
        window: { STUDY_LIBRARY: [
          { name: "Pomba", category: "Símbolos", description: "Descrição original" },
          { name: "Registro inválido", category: "Símbolos" },
          { name: "Azul", category: "Cores", description: "Cor" }
        ] },
        readLocalObject: () => ({ "Símbolos|Pomba": { description: "Descrição editada" } }),
        readLocalArray: () => [{ name: "Arca", text: "Descrição personalizada" }]
      };
      runInNewContext(app.slice(entriesStart, entriesEnd), sandbox);
      const entries = sandbox.getStudyEntries();
      const checks = [
        entries.length === 4,
        entries.find((item) => item.name === "Pomba")?.description === "Descrição editada",
        entries.find((item) => item.name === "Arca")?.category === "Símbolos",
        entries.find((item) => item.name === "Registro inválido")?.description === ""
      ];
      if (checks.some((passed) => !passed)) fail("Falha ao normalizar a biblioteca de estudos");
    } catch (error) {
      fail(`Teste da biblioteca de estudos falhou: ${error.message}`);
    }
  }

  const importStart = app.indexOf("function validateImportedBackup");
  const importEnd = app.indexOf("\n$('importData').onchange", importStart);
  if (importStart < 0 || importEnd < 0) fail("Não foi possível isolar o validador de backups importados");
  else {
    try {
      const booksMatch = app.match(/const BOOKS=(\[[\s\S]*?\]);/);
      const importSandbox = { BOOKS: booksMatch ? JSON.parse(booksMatch[1]) : [] };
      runInNewContext(app.slice(importStart, importEnd), importSandbox);
      const validate = importSandbox.validateImportedBackup;
      const checks = [
        validate({ edits: {}, guides: [], studyEdits: {}, symbols: [], characters: [] }) === "",
        validate({ edits: { "0-1": { title: "Criação", versesText: "Texto" } } }) === "",
        validate({ symbols: [{ name: "Pomba", text: "Descrição" }] }) === "",
        Boolean(validate([])),
        Boolean(validate({ symbols: {} })),
        Boolean(validate({ characters: [null] })),
        Boolean(validate({ characters: [{ bio: "Sem nome" }] })),
        Boolean(validate({ edits: { "0-999": { title: "Inválido" } } })),
        Boolean(validate({ edits: { "0-1": { versesText: { texto: "inválido" } } } })),
        Boolean(validate({ symbols: [{ name: "Pomba", text: 123 }] })),
        Boolean(validate({ guides: [{ name: "Guia", content: [] }] }))
      ];
      if (checks.some((passed) => !passed)) fail("Falha nos testes de validação profunda de backups importados");
    } catch (error) {
      fail(`Teste de importação de backup falhou: ${error.message}`);
    }
  }

  if (!app.includes("[...BACKUP_KEYS,AUTO_BACKUP_KEY,AUTO_BACKUP_HISTORY_KEY]"))
    fail("A limpeza de dados locais precisa remover também o histórico de backups automáticos");
  if (!app.includes("renderBookInfo()") || !app.includes("Sobre o livro"))
    fail("A ficha bibliográfica dos livros não foi localizada no aplicativo");
  if (!app.includes("esc(d.title||b.name+' '+c)"))
    fail("O título editável do capítulo precisa ser escapado antes de entrar no HTML");
  const css = readFileSync("style.css", "utf8");
  if (!css.includes(".book-info") || !css.includes(".book-info-grid"))
    fail("Os estilos da ficha bibliográfica estão ausentes");
  if (!css.includes("prefers-reduced-motion") || !css.includes("forced-colors"))
    fail("As preferências de movimento reduzido e alto contraste precisam ser respeitadas");
  if (!html.includes('aria-label="Buscar um livro bíblico"') || !html.includes('aria-label="Buscar na biblioteca de estudos"'))
    fail("Os campos de busca precisam de rótulos acessíveis");
  if (!html.includes('aria-live="polite"'))
    fail("As mensagens de estado precisam ser anunciadas por leitores de tela");

  const referencedIds = [...app.matchAll(/\$\('([^']+)'\)/g)].map((match) => match[1]);
  const staticIds = new Set(ids);
  const generatedIds = new Set(["backBook", "chapterList", "chapterJump", "prev", "next", "editThis", "editStudyCurrent"]);
  const missingIds = [...new Set(referencedIds.filter((id) => !staticIds.has(id) && !generatedIds.has(id)))];
  if (missingIds.length) fail(`IDs usados pelo aplicativo não encontrados no HTML: ${missingIds.join(", ")}`);
  const cssBraceBalance = (css.match(/{/g) || []).length - (css.match(/}/g) || []).length;
  if (cssBraceBalance !== 0) fail("O CSS contém blocos de regras sem fechamento");

  const studyData = readFileSync("study-data.js", "utf8");
  const compressed = studyData.match(/STUDY_LIBRARY_B64="([^"]+)"/);
  if (!compressed) fail("A biblioteca compactada de estudos não foi encontrada");
  else {
    try {
      const library = JSON.parse(gunzipSync(Buffer.from(compressed[1], "base64")).toString("utf8"));
      const categories = new Set(["Símbolos", "Cores", "Números", "Tipologias"]);
      const keys = library.map((item) => item.category + "|" + item.name);
      if (!Array.isArray(library) || !library.length) fail("A biblioteca de estudos está vazia ou inválida");
      if (library.some((item) => !item || typeof item.name !== "string" || !item.name.trim() || typeof item.category !== "string" || !categories.has(item.category) || typeof item.description !== "string"))
        fail("A biblioteca contém registros com campos ou categorias inválidos");
      if (keys.length !== new Set(keys).size) fail("A biblioteca contém itens duplicados na mesma categoria");
    } catch (error) {
      fail(`A biblioteca compactada não pôde ser descompactada: ${error.message}`);
    }
  }

  const artworkSandbox = { window: {} };
  try {
    runInNewContext(readFileSync("book-art.js", "utf8"), artworkSandbox);
    const renders = Array.from({ length: 66 }, (_, index) => artworkSandbox.window.bookArtwork(index));
    if (renders.some((svg) => typeof svg !== "string" || !svg.includes("<svg") || !svg.includes("aria-label=") || !svg.includes("viewBox=")))
      fail("Uma ou mais gravuras dos 66 livros não produziram SVG acessível");
  } catch (error) {
    fail(`As gravuras dos livros não puderam ser renderizadas: ${error.message}`);
  }
}
if (!process.exitCode) console.log("Validação estrutural aprovada.");
