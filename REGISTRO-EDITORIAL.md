# Registro editorial central — Enciclopédia Bíblica

Atualizado em 2026-11-06.

Este documento define o registro versionado do estado editorial. O painel do site mantém alterações locais no navegador e inclui o campo `editorialReviews` no backup JSON. Para que essas alterações sejam compartilhadas entre dispositivos e conversas, o backup exportado deve ser incorporado a este registro por commit no repositório. O armazenamento local, sozinho, não sincroniza com o GitHub.

## Estados oficiais

1. **Pendente** — ainda não analisado.
2. **Em revisão** — análise em andamento.
3. **Revisado** — conferido e aprovado.
4. **Reaberto** — somente após erro concreto ou fonte relevante que justifique nova análise.

## Transições permitidas

- Pendente → Em revisão.
- Em revisão → Revisado, com fonte consultada e observação do que foi conferido.
- Revisado → Reaberto, exclusivamente com fonte relevante e motivo concreto.
- Reaberto → Em revisão.
- Não existe transição automática de Revisado para Pendente ou Em revisão. Mudança de conversa, sessão ou ferramenta não altera o estado.

## Estrutura do registro por versículo

A chave de cada trecho segue `livro-capítulo-versículo`, usando os índices internos dos 66 livros (Gênesis = 0; Êxodo = 1). Cada registro conserva estado atual, data, fonte, observação e histórico de transições. Registros de versículos que deixarem de aparecer no texto não são apagados automaticamente.

## Migração inicial do histórico existente

- **Gênesis, capítulos 1–50:** os versículos presentes na tradução de trabalho recebem estado inicial **Revisado**, migrado da declaração anterior do proprietário de que Gênesis era considerado revisado. A conferência final de abertura continua anotada como pendência no nível do livro. A migração não representa uma nova revisão feita nesta etapa.
- **Êxodo, capítulos 1–40:** os versículos presentes na tradução de trabalho recebem estado inicial **Em revisão**, preservando o estado anterior registrado em `REVISAO-EXODO.md`. A integração dos capítulos e as correções de primeira passada não são tratadas como aprovação acadêmica final.
- **Demais livros:** permanecem **Pendente** até que a análise específica comece.

Os estados migrados são gerados pelo módulo `editorial-review.js` e ficam rastreáveis no código. Alterações posteriores no painel são locais ao navegador até serem exportadas e versionadas.

## Histórico de decisões

| Data | Decisão | Motivo |
|---|---|---|
| 2026-11-06 | Instituídos quatro estados editoriais e transições controladas | Preservar aprovações e impedir reabertura sem evidência concreta |
| 2026-11-06 | Migrado Gênesis como Revisado e Êxodo como Em revisão | Preservar o estado editorial informado e documentado antes da implementação |
| 2026-11-06 | Alterações locais entram no backup JSON | Evitar perda de progresso e permitir versionamento explícito no repositório |

## Limites importantes

- O painel registra o processo; não verifica automaticamente o hebraico ou o grego.
- O estado Revisado depende de conferência humana documentada.
- O estado Reaberto exige fonte e justificativa, e o histórico anterior permanece intacto.
- O backup local não é um backup remoto. Exporte e versione os registros regularmente.
