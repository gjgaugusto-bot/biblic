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
| Controle editorial por versículo | **Integrado e publicado** | PR #36 integrado à `main` pelo commit `2d65a9262fdb87354d4b8c0530a88f87898b0f2d`. Workflow de publicação GitHub Pages `42269769636` concluiu com sucesso. |
| Demais livros | **Aguardando sequência editorial** | Não começar antes de estabilizar a etapa atual; avançar em ordem até Apocalipse. |
| Site publicado | **Publicado** | A implantação automática do GitHub Pages após o merge do PR #36 concluiu com sucesso (run `42269769636`). |

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


## Atualização de continuidade — 2026-11-06 (após integração e início de Êxodo)

- PR #36 integrado à `main` pelo commit `2d65a9262fdb87354d4b8c0530a88f87898b0f2d`; publicação GitHub Pages confirmada pelo workflow `42269769636` com conclusão `success`.
- Criada branch de revisão `review/exodo-1-5-2026-11-06` a partir da `main` já atualizada.
- Êxodo 1:1–22 conferido contra o Texto Massorético. Correções pontuais em 1:15 e 1:20; notas lexicais ampliadas em 1:1, 1:5, 1:15, 1:16, 1:19, 1:20 e 1:21. A nota preexistente de 1:7 foi preservada.
- O capítulo 1 está com a primeira conferência textual integral registrada, mas seu estado no painel permanece “Em revisão” até a transição individual ser gravada com fonte e observação; não declarar o livro concluído.
- Próximo ponto: Êxodo 2:1–25.


### Continuidade de conteúdo — Êxodo 2 (2026-11-06)

- Êxodo 2:1–25 conferido integralmente contra o Texto Massorético.
- Correção: 2:12, “escondeu-o na areia” → “enterrou-o na areia”, conforme o sentido contextual de טמן (taman) e o registro do BDB.
- Notas lexicais acrescentadas em 2:2, 2:3, 2:12, 2:17 e 2:25; notas anteriores de 2:10 e 2:22 preservadas.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 3:1–22. Êxodo 1 e 2 não devem ser revistos novamente sem evidência concreta de erro relevante.


### Continuidade de conteúdo — Êxodo 3 (2026-11-06)

- Êxodo 3:1–22 conferido integralmente contra o Texto Massorético.
- Correções em 3:3–4 para preservar o sentido de סור (*sur*): “desviar-se”, não “aproximar-se”.
- Notas acrescentadas em 3:2–3; notas anteriores de 3:14 e 3:19 preservadas.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 4:1–31.


### Continuidade de conteúdo — Êxodo 4 (2026-11-06)

- Êxodo 4:1–31 conferido integralmente contra o Texto Massorético.
- Ajuste em 4:11: “Quem fez a boca do homem?” → “Quem deu ao ser humano uma boca?”, refletindo שׂים (*sim*, pôr/colocar) em formulação idiomática.
- Notas acrescentadas em 4:6, 4:10, 4:11 e 4:31; notas anteriores de 4:13, 4:18 e 4:24–26 preservadas.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 5:1–23.


### Continuidade de conteúdo — Êxodo 5 (2026-11-06)

- Êxodo 5:1–23 conferido integralmente contra o Texto Massorético.
- Ajuste em 5:16: “embora a culpa seja do teu próprio povo” → “e a culpa é do teu próprio povo”, acompanhando a coordenação hebraica; variante antiga documentada.
- Notas acrescentadas em 5:3, 5:7, 5:8, 5:16 e 5:21.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 6:1–30.


### Continuidade de conteúdo — Êxodo 6 (2026-11-06)

- Êxodo 6:1–30 conferido integralmente contra o Texto Massorético.
- Ajuste em 6:3 para refletir o nifal נוֹדַעְתִּי (*noda'ti*): “não fui conhecido por eles”.
- Ajuste em 6:26 para português natural: “Estes são Arão e Moisés”.
- Notas acrescentadas em 6:1, 6:3, 6:12, 6:20, 6:26 e 6:30; nota de 6:9 preservada.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 7:1–29.


### Continuidade de conteúdo — Êxodo 7 (2026-11-06)

- Êxodo 7:1–29 conferido integralmente contra o Texto Massorético; nenhuma alteração no corpo da tradução.
- Notas acrescentadas em 7:3, 7:13, 7:14 e 7:15; nota anterior de 7:9 preservada.
- Distinções registradas: קשה (*qashah*, endurecer), חזק (*chazaq*, fortalecer), כבד (*kaved*, estar pesado); תַּנִּין (*tannin*) e נָחָשׁ (*nachash*).
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 8:1–28.


### Continuidade de conteúdo — Êxodo 8 (2026-11-06)

- Êxodo 8:1–28 conferido integralmente contra o Texto Massorético.
- Ajuste em 8:5 para explicitar a nuance idiomática “Toma para ti a honra de escolher”.
- Notas acrescentadas/ampliadas em 8:5, 8:12, 8:15, 8:17, 8:19, 8:22 e 8:26.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 9:1–35.


### Continuidade de conteúdo — Êxodo 9 (2026-11-06)

- Êxodo 9:1–35 conferido integralmente contra o Texto Massorético; nenhuma alteração no corpo da tradução.
- Notas ampliadas/acrescentadas em 9:6, 9:12, 9:16, 9:31, 9:32, 9:34 e 9:35.
- Registradas a tensão narrativa sobre “todo o rebanho”, as fases agrícolas e a diferença entre חזק (*chazaq*) e כבד (*kaved*).
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 10:1–29.


### Continuidade de conteúdo — Êxodo 10 (2026-11-06)

- Êxodo 10:1–29 conferido integralmente contra o Texto Massorético; nenhuma alteração no corpo da tradução.
- Notas ampliadas/acrescentadas em 10:2, 10:10, 10:13, 10:19 e 10:21.
- Registradas a nuance de hit'allalti, a possível alusão a Rá em 10:10, a direção dos ventos e a escuridão palpável.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 11:1–10.


### Continuidade de conteúdo — Êxodo 11 (2026-11-06)

- Êxodo 11:1–10 conferido integralmente contra o Texto Massorético.
- Ajustes em 11:1 (posição de “por completo”), 11:4 (“por volta da meia-noite”) e 11:8 (“se prostrarão”).
- Notas ampliadas/acrescentadas em 11:1, 11:4 e 11:8; notas anteriores de 11:2, 11:5 e 11:7 preservadas.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 12:1–51.


### Continuidade de conteúdo — Êxodo 12 (2026-11-06)

- Êxodo 12:1–51 conferido integralmente contra o Texto Massorético.
- Ajuste em 12:21: “Escolhei e tomai” → “Retirai e tomai”, refletindo os verbos משך e לקח.
- Notas acrescentadas em 12:3, 12:21 e 12:42; notas anteriores do capítulo preservadas.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 13:1–22.


### Continuidade de conteúdo — Êxodo 13 (2026-11-06)

- Êxodo 13:1–22 conferido integralmente contra o Texto Massorético.
- Corrigido erro tipográfico em 13:11 (“e a der”).
- Ajustado 13:17 para “o povo não mude de ideia”; nota corrigida para distinguir נחה (conduzir) de נחם (mudar de ideia).
- Nota ampliada em 13:18 sobre chamushim e Yam Suf.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 14:1–31.


### Continuidade de conteúdo — Êxodo 14 (2026-11-06)

- Êxodo 14:1–31 conferido integralmente contra o Texto Massorético.
- Ajuste em 14:6: “preparou seu carro” → “atrelou seu carro”, refletindo אסר (*asar*).
- Nota acrescentada em 14:6; notas anteriores do capítulo preservadas.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 15:1–27.


### Continuidade de conteúdo — Êxodo 15 (2026-11-06)

- Êxodo 15:1–27 conferido integralmente contra o Texto Massorético; nenhuma alteração no corpo da tradução.
- Notas ampliadas em 15:2, 15:8, 15:11 e 15:17; nota de 15:23 preservada.
- Registradas as opções de sentido de ve'anvehu, a imagem de ned, a expressão nora tehilot e a metáfora de plantar Israel.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 16:1–36.


### Continuidade de conteúdo — Êxodo 16 (2026-11-06)

- Êxodo 16:1–36 conferido integralmente contra o Texto Massorético.
- Ajuste em 16:14: “algo fino e granuloso” → “algo fino e em flocos”.
- Notas ampliadas/acrescentadas em 16:14, 16:15, 16:33 e 16:36; notas anteriores preservadas.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 17:1–16.


### Continuidade de conteúdo — Êxodo 17 (2026-11-06)

- Êxodo 17:1–16 conferido integralmente contra o Texto Massorético.
- Ajuste em 17:16 para “uma mão está sobre o trono de Yah”, mais próximo da preposição hebraica עַל (*al*).
- Notas anteriores de 17:2, 17:6, 17:7, 17:15 e 17:16 preservadas.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 18:1–27.


### Continuidade de conteúdo — Êxodo 18 (2026-11-06)

- Êxodo 18:1–27 conferido integralmente contra o Texto Massorético; nenhuma alteração no corpo da tradução.
- Notas acrescentadas em 18:19 e 18:23; notas anteriores de 18:1, 18:3, 18:11 e 18:21 preservadas.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 19:1–25.


### Continuidade de conteúdo — Êxodo 19 (2026-11-06)

- Êxodo 19:1–25 conferido integralmente contra o Texto Massorético; nenhuma alteração no corpo da tradução.
- Nota acrescentada em 19:22 sobre יִפְרֹץ (*yifrotz*), “irromper/abrir brecha”; notas anteriores do capítulo preservadas.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 20:1–26.


### Continuidade de conteúdo — Êxodo 20 (2026-11-06)

- Êxodo 20:1–26 conferido integralmente contra o Texto Massorético.
- Ajuste em 20:25 para concordância singular com o altar: “erguer sua ferramenta sobre ele, você o profanará”.
- Nota lexical acrescentada em 20:25; notas anteriores do capítulo preservadas.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 21:1–36.


### Continuidade de conteúdo — Êxodo 21 (2026-11-06)

- Êxodo 21:1–36 conferido integralmente contra o Texto Massorético.
- Ajuste em 21:23 para “se houver dano”, sem o adjetivo “grave” não expresso no hebraico.
- Notas anteriores do capítulo preservadas, incluindo a ambiguidade de 21:22–23.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 22:1–31.


### Continuidade de conteúdo — Êxodo 22 (2026-11-06)

- Êxodo 22:1–31 conferido integralmente contra o Texto Massorético.
- Ajuste em 22:29 para “a abundância de tua colheita e o produto de teus lagares”.
- Nota lexical acrescentada em 22:29; notas anteriores do capítulo preservadas.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 23:1–33.


### Continuidade de conteúdo — Êxodo 23 (2026-11-06)

- Êxodo 23:1–33 conferido integralmente contra o Texto Massorético; nenhuma alteração no corpo da tradução.
- Nota lexical acrescentada em 23:26 sobre perda gestacional e infertilidade; notas anteriores preservadas.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 24:1–18.


### Continuidade de conteúdo — Êxodo 24 (2026-11-06)

- Êxodo 24:1–18 conferido integralmente contra o Texto Massorético; nenhuma alteração no corpo da tradução.
- Notas anteriores de 24:7, 24:8 e 24:10 preservadas.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 25:1–40.


### Continuidade de conteúdo — Êxodo 25 (2026-11-06)

- Êxodo 25:1–40 conferido integralmente contra o Texto Massorético.
- Ajustes em 25:29 para a ordem dos utensílios e em 25:38 para distinguir pinças de bandejas de cinzas.
- Notas lexicais acrescentadas em 25:29 e 25:38; notas anteriores preservadas.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 26:1–37.


### Continuidade de conteúdo — Êxodo 26 (2026-11-06)

- Êxodo 26:1–37 conferido integralmente contra o Texto Massorético; nenhuma alteração no corpo da tradução.
- Notas ampliadas em 26:17, 26:24 e 26:36 sobre encaixes, armações dos cantos e a cortina de entrada.
- Notas anteriores do capítulo preservadas.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 27:1–21.


### Continuidade de conteúdo — Êxodo 27 (2026-11-06)

- Êxodo 27:1–21 conferido integralmente contra o Texto Massorético; nenhuma alteração no corpo da tradução.
- Notas ampliadas em 27:5 e 27:9 sobre a moldura do altar e as cortinas do pátio; notas anteriores preservadas.
- Registro detalhado e fontes em REVISAO-EXODO.md.
- Próximo ponto: Êxodo 28:1–43.
