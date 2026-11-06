# ESTADO OFICIAL DO PROJETO — CONTINUIDADE ENTRE CONVERSAS

Atualizado em 2026-11-06.

> **REGRA PRINCIPAL: NÃO RECOMEÇAR O TRABALHO.** Este arquivo é o ponto de retomada obrigatório para qualquer nova sessão. Leia-o antes de propor revisões, depois consulte os registros citados. A falta de memória de uma conversa nunca é motivo para repetir trabalho já feito.

## Objetivo

Concluir a Enciclopédia Bíblica, preservando o trabalho existente, e avançar pelos 66 livros em ordem até Apocalipse. O objetivo de cada sessão é produzir avanço concreto, registrar o resultado e deixar o projeto pronto para a próxima etapa — não reabrir etapas concluídas sem motivo.

## Estado confirmado nesta data

| Área | Estado | O que isso significa |
|---|---|---|
| Gênesis | **FECHADO DEFINITIVAMENTE** | A conferência final da abertura (capítulos 1–3) foi concluída em 2026-11-06. Não reiniciar nem reabrir por nova conversa, preferência estilística ou falta de contexto. |
| Êxodo 1–40 | **Integrado; revisão acadêmica versículo por versículo ainda pendente** | Texto, notas lexicais e correções estão no projeto. A análise com o hebraico precisa prosseguir sem refazer a integração técnica. |
| Controle editorial por versículo | **Implementado e validado em Chromium** | PR #36, branch `feat/controle-editorial-versiculos-2026-11-06`. Workflow `42269297633` passou em sintaxe, estrutura, Chromium, testes funcionais e axe-core. Aguardando decisão de integração/publicação. |
| Demais livros | **Aguardando sequência editorial** | Não começar antes de estabilizar a etapa atual; avançar em ordem até Apocalipse. |
| Site publicado | **Não alterado por esta etapa** | O PR #36 não foi integrado nem publicado; `main` e o site público permanecem intactos. |

## Regra definitiva para Gênesis

1. [x] Fazer uma única conferência final da abertura (Gênesis 1–3), conforme combinado com o proprietário.
2. Limitar a conferência a erros objetivos: omissão, acréscimo, inconsistência, problema real de tradução/fidelidade ou erro linguístico relevante.
3. Não fazer nova revisão geral dos capítulos 1–50, não reavaliar escolhas apenas por preferência estilística e não exigir que o usuário repita etapas já feitas.
4. Corrigir e registrar somente problemas concretos encontrados.
5. [x] Conferência concluída e registrada em `REGISTRO-EDITORIAL.md`: **GÊNESIS — FECHADO DEFINITIVAMENTE**.
6. Depois de fechado, Gênesis sai da fila de trabalho. Só poderá ser reaberto por evidência objetiva de erro relevante ou fonte nova que demonstre problema real; a justificativa e os versículos afetados devem ser registrados. Nova conversa, perda de contexto, mudança de ferramenta ou preferência estilística não justificam reabertura.

**ENCERRAMENTO REGISTRADO (2026-11-06):** a conferência final dos capítulos 1–3 foi concluída. Gênesis está **FECHADO DEFINITIVAMENTE** no fluxo editorial do projeto. O histórico dos capítulos 4–50 permanece preservado. Não repetir a conferência. Reabrir somente diante de evidência objetiva de erro relevante ou fonte nova que justifique correção específica.

## Regras para não repetir trabalho

- Nunca voltar um versículo de **Revisado** para **Pendente** ou **Em revisão** por causa de nova conversa.
- Nunca repetir revisão de livro/capítulo que tenha registro de conclusão válido.
- Antes de iniciar qualquer tarefa, identificar o próximo item genuinamente pendente no registro oficial.
- Se houver dúvida, consultar os arquivos e o histórico do Git; não presumir que o trabalho não foi feito.
- Só reabrir com fonte relevante e motivo concreto, identificando exatamente os versículos afetados.
- Não transformar revisão estilística opcional em requisito para concluir.
- Não apagar histórico, notas, traduções, símbolos ou dados locais do usuário.
- Não marcar como concluído algo que não foi efetivamente conferido e registrado.

## Próximas ações — ordem obrigatória

1. [x] Corrigir a falha Playwright: `translation-notes.js` agora inicializa os capítulos antes de anexar notas. O workflow `42269297633` passou integralmente.
2. [x] Revisar o diff do PR #36 e registrar o estado; a branch está 25 commits à frente e 0 atrás de `main`.
3. [x] Concluir a conferência final de Gênesis 1–3 e registrar Gênesis como fechado definitivamente.
4. Próximo: retomar a revisão acadêmica de Êxodo, aproveitando o texto e as notas já integrados; não reconstruir o livro.
5. Seguir livro por livro até Apocalipse, atualizando o registro ao fim de cada unidade concluída.

## Arquivos que toda nova sessão deve consultar

1. `ESTADO-OFICIAL-DO-PROJETO.md` — este ponto de retomada e a fila real.
2. `PROTOCOLO-DE-TRABALHO.md` — regras de segurança, revisão e publicação.
3. `PROGRESSO-DO-PROJETO.md` — histórico técnico e estado do projeto.
4. `REGISTRO-EDITORIAL.md` — estados e histórico por versículo.
5. `REVISAO-EXODO.md` — trabalho e pendências já registrados de Êxodo.
6. `CRITERIOS-EDITORIAIS.md` — critérios de conteúdo e aprovação.

## Como registrar cada sessão

Ao terminar uma etapa, atualizar este arquivo e os registros correspondentes com: data, livro/capítulo/versículos, trabalho efetivamente realizado, fontes, correções, testes executados, commit/PR e próximo ponto pendente. Manter a lista curta e factual. Não duplicar tarefas concluídas.

## Limites técnicos importantes

- O painel editorial mantém alterações no navegador via localStorage; isso não sincroniza sozinho com o GitHub.
- Exportar o backup JSON e versionar o registro é necessário para transportar alterações locais entre dispositivos/conversas.
- A branch de recurso e o PR não significam publicação. A branch `main` e o site público não devem ser alterados sem autorização expressa.


## Fechamento definitivo de Gênesis e validação do controle editorial — 2026-11-06

- **Gênesis 1–3:** conferência final da abertura concluída em uma única passagem, com foco em fidelidade lexical, sintaxe, ambiguidades do hebraico e português. Não foi identificada necessidade de reescrever o texto-base. A nota lexical de Gênesis 2:22 foi complementada para registrar que וַיִּבֶן (vayyiven) vem de בנה, “construir/edificar”; a tradução existente “formou” permanece possível como tradução de sentido, com a nuance explicada ao leitor.
- Gênesis 1:1: a forma tradicional “No princípio” foi mantida; a análise gramatical é discutida na bibliografia, e estudo de 2025 mostra que a leitura adverbial tradicional é compatível com tradições históricas do hebraico bíblico.
- Gênesis 1:2, 1:6, 2:7, 2:18, 2:21, 3:15–17: alternativas de sentido e escolhas de tradução foram conferidas e preservadas nas notas, sem impor interpretação única onde há debate lexical ou sintático.
- **Estado editorial do livro: FECHADO DEFINITIVAMENTE.** Não reiniciar revisão de Gênesis por mudança de conversa, ferramenta ou modelo. Reabrir somente com evidência concreta de erro relevante ou fonte nova que justifique alteração pontual, registrando versículos e motivo.
- Corrigida falha JavaScript em `translation-notes.js`: anexos de notas agora criam objeto para capítulos sem notas-base, evitando `Object.assign` sobre `undefined`.
- Workflow GitHub Actions `42269297633` (run 270): sintaxe, validação estrutural, instalação Chromium, servidor local, testes Playwright funcionais e varredura axe-core concluídos com sucesso. Resultado: “TESTES DE NAVEGADOR APROVADOS”.
- O PR #36 continua sem integração/publicação; `main` e o site público não foram alterados.
- Próximo trabalho de conteúdo: Êxodo, revisão acadêmica verso a verso a partir do ponto registrado em `REVISAO-EXODO.md`, sem refazer a integração dos capítulos 1–40.


---

## ADENDO DE CONTINUIDADE — 2026-11-06 (SUBSTITUI ESTADOS TÉCNICOS ANTIGOS)

Este adendo é a referência mais recente e prevalece sobre trechos anteriores deste documento que ainda mencionem PR #36 pendente, site não publicado ou estado técnico anterior. O histórico antigo foi preservado apenas como histórico.

### Estado atual do repositório e do site

- Repositório canônico: `gjgaugusto-bot/biblic`, branch `main`.
- Site: https://gjgaugusto-bot.github.io/biblic/
- Último commit verificado nesta sessão: `f1a9cf6712be759834749f04a8ee9acab8652a59`.
- O selo de cotejo de Números está publicado. Seu texto e tooltip delimitam corretamente o escopo: colação massorética dos 36 capítulos; não afirma cotejo direto integral com a BHS.
- Gênesis: fechado definitivamente conforme registro editorial e decisão do responsável.
- Êxodo: texto e notas dos 40 capítulos integrados. O responsável confirmou em conversa que considera o livro revisado; entretanto, os arquivos atuais `editorial-review.js` e `index.html` ainda exibem Êxodo como em revisão. Reconciliar a divergência com o relatório e a evidência do livro antes de alterar estados por versículo ou publicar selo. Não presumir cotejo BHS integral.
- Levítico: revisão editorial interna concluída; 27 capítulos e 859 versículos.
- Números: revisão editorial interna concluída; 36 capítulos e 1.288 versículos; ressalvas sobre BHS e revisão independente mantidas no relatório.
- Deuteronômio: 34 capítulos, 959 versículos e 261 notas lexicais integrados; auditoria estrutural concluída; cotejo BHS versículo a versículo e revisão acadêmica independente pendentes. Continua em revisão.
- Próximo livro na sequência de integração: Josué, salvo se o responsável escolher primeiro reconciliar as divergências editoriais já apontadas.

### Check-up funcional do site

O check-up de 2026-11-06 foi registrado em `CHECKUP-FUNCIONAL-2026-11-06.md`.

- Workflow de proteção do site: [42307301590](https://github.com/gjgaugusto-bot/biblic/actions/runs/42307301590) — **sucesso** no commit atual.
- Workflow de publicação GitHub Pages: [42307301519](https://github.com/gjgaugusto-bot/biblic/actions/runs/42307301519) — **sucesso** no commit atual.
- Passaram: sintaxe JS, validação estrutural, testes Playwright/Chromium, varredura axe-core, testes de navegação, leitor, abas, controle editorial, persistência, biblioteca, criação de conteúdo, exportação/importação/limpeza de backup, responsividade em 390 px e 320 px e movimento reduzido.
- O espelho `backup-automatico` foi atualizado após a aprovação do workflow.
- Limite: a aprovação comprova os fluxos automatizados listados, não revisão manual de todos os versículos/conteúdos nem teste humano de cada combinação de interface.

### Próximas melhorias técnicas sugeridas

Expandir `scripts/browser-smoke.mjs` para testar explicitamente busca e filtros da biblioteca, edição de notas lexicais, ficha “Sobre o livro”, navegação anterior/próximo capítulo, referências relacionadas e restauração de backup sobre dados locais preexistentes. Manter os workflows de proteção e publicação ativos.

### Instrução para a próxima sessão/modelo

Antes de qualquer trabalho, ler este adendo, `CHECKUP-FUNCIONAL-2026-11-06.md`, `PROTOCOLO-DE-TRABALHO.md`, `REGISTRO-EDITORIAL.md` e os relatórios do livro em andamento. Não confiar em memória da conversa para decidir o estado do repositório; verificar a branch `main` e preservar todo trabalho existente. Não reiniciar Gênesis nem reconstruir livros já integrados. Continuar com lotes grandes, registrar alterações e validar antes de publicar.
