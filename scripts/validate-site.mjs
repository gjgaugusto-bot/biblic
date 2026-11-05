import { readFileSync, existsSync } from "node:fs";

const fail = (message) => {
  console.error("FALHA:", message);
  process.exitCode = 1;
};
const required = ["index.html", "style.css", "app.js", "study-data.js"];
for (const file of required) {
  if (!existsSync(file)) fail(`Arquivo obrigatório ausente: ${file}`);
  else if (!readFileSync(file, "utf8").trim()) fail(`Arquivo obrigatório vazio: ${file}`);
}

if (existsSync("index.html") && existsSync("app.js")) {
  const html = readFileSync("index.html", "utf8");
  const app = readFileSync("app.js", "utf8");
  const studyPos = html.indexOf("study-data.js");
  const appPos = html.indexOf("app.js");
  if (studyPos < 0 || appPos < 0) fail("index.html precisa carregar study-data.js e app.js");
  else if (studyPos > appPos) fail("study-data.js deve ser carregado antes de app.js");

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
}
if (!process.exitCode) console.log("Validação estrutural aprovada.");
