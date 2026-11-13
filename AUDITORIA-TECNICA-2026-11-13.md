# Auditoria técnica geral — 2026-11-13

## Escopo e limites

Auditoria estática do repositório `gjgaugusto-bot/biblic`, branch `main`, commit `72401db7daaaf98a2107ad263113231acd2b42ab`, com inspeção de workflows, arquivos de dados, rotas e testes. Não equivale a teste manual de todos os fluxos no navegador nem a revisão linguística ou exegética dos textos.

## Achados confirmados

### T1 — A publicação do GitHub Pages não dependia do workflow de proteção
**Severidade: alta.** O workflow `.github/workflows/deploy-pages.yml` iniciava a publicação diretamente em qualquer push para `main`, sem depender da validação estrutural, do Chromium ou do axe-core executados em `site-safety.yml`. Como os workflows são independentes, uma falha nos testes não impedia necessariamente a publicação.

**Correção nesta branch:** adicionar job `validate` ao workflow de deploy, com sintaxe, validação estrutural, Playwright/Chromium e smoke test; o job `deploy` passa a depender de `needs: validate`. A publicação fica bloqueada se qualquer etapa falhar.

### T2 — Proteção da branch principal não confirmada pelo GitHub
**Severidade: alta.** A API retornou `main.protected=false`; a consulta aos rulesets retornou lista vazia. Isso contradiz a documentação antiga que dizia haver ruleset ativo exigindo PR. Não há evidência técnica atual de bloqueio de push direto, status checks obrigatórios ou proteção contra force push/exclusão.

**Ação necessária:** configurar no GitHub a proteção de `main` (exigir PR, impedir force push e exclusão, e exigir o check `validate`). A conexão atual permite leitura, mas não confirmou capacidade administrativa para criar a regra. Até lá, tratar a proteção como NÃO ATIVA.

### T3 — Apocalipse ainda não está integrado à branch publicada
**Severidade: alta.** A página lista 66 livros e 1.189 capítulos, mas `main` não carrega `apocalipse-data.js` e não possui rotas do índice 65 no leitor/editor. O PR #115 contém a integração proposta e permanece aberto. O smoke test atual permite explicitamente que o capítulo 1 de Apocalipse não tenha texto na `main`.

**Ação:** não declarar os 66 livros publicados até o PR #115 ser aprovado, integrado e o Pages publicar o commit resultante. A revisão textual de Apocalipse continua pendente mesmo após integração técnica.

### T4 — A cobertura de testes de navegador é desigual
**Severidade: média.** O validador estrutural carrega os módulos externos e verifica a existência de todos os capítulos e de arrays não vazios para cada livro integrado. Entretanto, a contagem canônica de versículos é conferida no validador para Gênesis; os testes de navegador fazem conferência detalhada de todos os capítulos apenas em Tiago e 1 Pedro, e verificam carregamento no editor dos cinco livros históricos corrigidos. Não existe ainda conferência automatizada independente de contagens canônicas de versículos para todos os capítulos de todos os livros.

**Ação:** ampliar manifestos de contagens por capítulo, com fonte e edição identificadas, e testar leitor/editor contra eles. Não inferir correção textual apenas de uma contagem coincidente.

### T5 — Documentação de estado estava desatualizada
**Severidade: média.** `ESTADO-OFICIAL-DO-PROJETO.md` e `PROGRESSO-DO-PROJETO.md` mantinham como estado corrente uma fila de novembro de 6, incluindo 1 Samuel como aguardando PR e a próxima tarefa como 2 Samuel, embora o catálogo atual já contenha a maior parte dos livros e o trabalho tenha avançado até Apocalipse.

**Correção nesta branch:** acrescentar estado atual com data, commit e ressalva de que o conteúdo precisa de revisão editorial; preservar o histórico antigo como registro histórico.

### T6 — Documentação afirmava proteção da main sem evidência atual
**Severidade: alta.** O protocolo afirmava que o ruleset estava ativo e bloqueava push direto, mas a leitura atual retornou `protected=false` e nenhum ruleset. A afirmação foi corrigida no texto de continuidade desta branch; a configuração administrativa ainda precisa ser feita no GitHub.

## Verificações positivas nesta inspeção

- Catálogo contém 66 livros, com 1.189 capítulos previstos.
- Índices e slugs do catálogo são únicos segundo o validador existente.
- A validação estrutural verifica que cada capítulo integrado tem conteúdo não vazio.
- Os cinco livros históricos (Josué, Juízes, Rute, 1 Samuel e 2 Samuel) possuem correção de carregamento no editor já integrada.
- O fluxo de backup local documenta corretamente que localStorage não sincroniza automaticamente com GitHub nem entre dispositivos.
- O controle editorial separa estados de revisão da integração técnica e declara que não verifica hebraico/grego automaticamente.

## Não verificado nesta rodada

- Correção gramatical, lexical, sintática ou exegética de cada versículo.
- Fidelidade de cada tradução ao hebraico/aramaico/grego.
- Precisão de todas as notas lexicais, referências cruzadas, personagens, episódios e simbologias.
- Integridade dos backups locais efetivamente existentes nos navegadores dos usuários.
- Teste manual de todos os controles em todos os dispositivos e navegadores.
- Configuração de proteção administrativa da branch `main`.

## Próximas etapas obrigatórias

1. Aprovar a correção do bloqueio de deploy e demais ajustes técnicos desta branch.
2. Configurar a proteção real da branch `main` no GitHub.
3. Integrar Apocalipse somente após checks aprovados e decisão editorial explícita; em seguida publicar e verificar o Pages.
4. Expandir testes de contagens canônicas e de editor para os 66 livros.
5. Executar a revisão editorial integral: texto original, variantes, léxico, gramática, sintaxe, português, notas e referências, registrando cada correção por versículo.
