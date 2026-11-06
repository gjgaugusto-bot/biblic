# Proteção, base de referência e backups

## Estado da base
- A branch `base-imutavel-2026-11-06` será a referência congelada desta auditoria.
- A branch `trabalho-base-2026-11-06` será usada para as próximas alterações; nunca editar a branch de referência.
- A branch `arquivo-pre-auditoria-2026-11-06` preserva o estado anterior às correções desta auditoria.
- O Pull Request #35 permanece aberto em modo draft e não foi integrado à branch `main`.
- A branch `main` e o site publicado não foram alterados nesta etapa.

## Verificações automáticas
O workflow **Proteção do site** verifica sintaxe JavaScript, arquivos essenciais, ordem de carregamento, IDs HTML duplicados, unicidade dos livros e slugs, os 66 livros e a contagem canônica de 1.189 capítulos. Também confere a quantidade de versículos dos 50 capítulos de Gênesis.

A suíte Playwright/Chromium testa:
- abertura e lista de capítulos dos 66 livros;
- ficha bibliográfica, leitura de Gênesis 4 e abas por mouse/teclado;
- edição e persistência após recarregar;
- personalização, persistência, exportação e importação das quatro categorias da biblioteca;
- cadastro de simbologias, personagens e guias;
- exportação, importação e limpeza de backups;
- ausência de rolagem horizontal em telas de 390 px e 320 px;
- preferência por movimento reduzido;
- varreduras axe-core nas telas inicial, ficha do livro, leitor e painel administrativo.

Última execução integral aprovada: workflow **Proteção do site**, execução `42157420986`. Os testes automatizados não substituem revisão manual em outros navegadores, dispositivos e tecnologias assistivas.

## Dados de estudo no navegador
O aplicativo salva edições, guias, símbolos, personagens e categorias no armazenamento local (`localStorage`) do navegador. Esses dados não fazem parte dos commits do GitHub nem entram automaticamente na base congelada. Exporte o JSON pelo Painel administrativo e guarde-o fora do navegador para preservar seus dados pessoais.

## Limites e proteção técnica
- A integração disponível não consegue administrar regras de proteção/rulesets do GitHub. A API informa `protected=false` para as branches consultadas; isso não confirma nem descarta a existência de rulesets separados.
- Portanto, a branch de referência será preservada por procedimento: nenhuma alteração ou atualização nela; todo trabalho futuro deve partir dela para outra branch. Não afirmar que existe bloqueio técnico de escrita.
- A branch `backup-automatico` espelha `main` após validação; ela não substitui a base congelada nem o backup dos dados locais.
- Erros JavaScript registrados no navegador ficam no dispositivo e não são enviados automaticamente ao GitHub.
- Para proteger dados contra perda do aparelho ou limpeza do navegador, exporte o backup JSON regularmente e guarde cópias externas.

## Publicação
Nenhuma publicação foi feita nesta etapa. O workflow de deploy publica somente quando há push em `main` ou acionamento manual. Não integrar o PR #35 nem executar deploy sem autorização explícita do proprietário.

Consulte `PROTOCOLO-DE-TRABALHO.md` para o fluxo de inspeção, alteração, revisão, teste e recuperação. Consulte `PROGRESSO-DO-PROJETO.md` para o histórico detalhado.


## Registro editorial por versículo

O controle editorial usa quatro estados: Pendente, Em revisão, Revisado e Reaberto. As mudanças feitas no painel são salvas em `encBibEditorialReviewsV1`, incluídas no backup automático local e exportadas no campo `editorialReviews` do JSON. A importação valida o formato e preserva campos ausentes. O registro versionado do repositório está em `REGISTRO-EDITORIAL.md`; exporte e versione as alterações do navegador para sincronizá-las entre dispositivos e conversas. A limpeza dos dados locais não apaga os estados-base definidos no código.
