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


## Gênesis — fechamento definitivo (2026-11-06)

**Estado do livro: FECHADO DEFINITIVAMENTE.** A conferência final da abertura, capítulos 1–3, foi concluída. O trabalho anterior dos capítulos 4–50 permanece aprovado no histórico, sem ser reiniciado.

### Escopo e resultado

- Conferidos os textos de Gênesis 1–3 com atenção a escolhas lexicais, sintaxe hebraica, ambiguidades relevantes, consistência e clareza em português.
- Gênesis 1:1: mantido “No princípio”. A construção de בְּרֵאשִׁית é debatida; a leitura adverbial tradicional é linguisticamente defensável em tradições históricas do hebraico, embora existam análises dependentes/relativas.
- Gênesis 1:2: mantido “sopro de Deus”, sem ocultar que רוּחַ אֱלֹהִים admite discussão entre “espírito”, “vento” e “sopro”.
- Gênesis 1:6–8: mantido “expansão”, opção neutra para רָקִיעַ; o texto a identifica como “Céus” no v. 8.
- Gênesis 1:26–27: mantidos os plurais “Façamos” e “nossa imagem”; a interpretação do plural é discutida e não deve ser fechada por uma nota de tradução.
- Gênesis 2:7: mantido “ser vivente” para נֶפֶשׁ חַיָּה; a expressão é aplicada também aos animais e não exige a noção filosófica posterior de alma separada.
- Gênesis 2:18: mantido “auxiliadora que lhe corresponda” para עֵזֶר כְּנֶגְדּוֹ, que preserva a ideia de ajuda/companheira correspondente sem sugerir subordinação lexical.
- Gênesis 2:21: mantido “costela”, com a alternativa lexical “lado” preservada na nota existente para צֵלָע.
- Gênesis 2:22: acrescentada nota para וַיִּבֶן (vayyiven), da raiz בנה (“construir/edificar”). A tradução corrente “formou” permanece como tradução de sentido, e a nota registra a imagem verbal de construção e a alternativa “fez da costela uma mulher”.
- Gênesis 2:23: mantido o jogo sonoro entre אִישׁ (ish) e אִשָּׁה (ishah), sem afirmar uma etimologia histórica comum.
- Gênesis 3:15: mantida a tradução com o mesmo verbo “ferir” nas duas metades, preservando a repetição do hebraico; זֶרַע (“descendência/semente”) é coletivo e não obriga, pela gramática isolada, uma identificação exclusivamente individual.
- Gênesis 3:16–17: preservadas as ambiguidades de תְּשׁוּקָה (“desejo”) e da expressão sobre dor/concepção; “por tua causa” para בַּעֲבוּרֶךָ permanece compatível com o sentido.
- Não foi encontrada omissão ou acréscimo que exigisse reescrita dos capítulos nesta conferência. Não foram feitas alterações no corpo da tradução; a única complementação foi a nota lexical de 2:22.

### Fontes de conferência

- Benjamin Kantor, “The Origins of ‘In the Beginning . . .’”, *Journal of Biblical Literature* 144/4 (2025), 601–636: https://doi.org/10.15699/jbl.1444.2025.2
- Robert D. Holmstedt, “The Syntax of Genesis 1:1–3”, *Journal for Semitics* 31/2 (2022): https://journals.co.za/doi/10.25159/2663-6573/11647
- NET Bible, notas de tradução para Gênesis 1:2, 1:6, 2:7, 2:18, 2:22, 3:15–17: https://classic.net.bible.org/
- Westminster Leningrad Codex / Open Scriptures Hebrew Bible, como texto-base hebraico de conferência do projeto.

### Regra de encerramento

Gênesis está **FECHADO DEFINITIVAMENTE** no fluxo editorial do projeto. Não voltar a revisar o livro por nova conversa, perda de contexto, troca de ferramenta/modelo ou preferência estilística. Só reabrir versículos específicos mediante evidência objetiva de erro relevante ou fonte nova que justifique correção concreta; registrar motivo, fonte e escopo. O livro sai da fila de trabalho.


## Êxodo — registro de revisão de conteúdo (2026-11-06)

### Êxodo 1:1–22
- Primeira conferência textual integral concluída contra o Texto Massorético.
- Correções objetivas: 1:15 (“parteiras hebreias”, leitura massorética mais direta) e 1:20 (“o povo se multiplicou e se tornou muito poderoso”, distinguindo os verbos hebraicos).
- Notas lexicais registradas: 1:1, 1:5, 1:15, 1:16, 1:19, 1:20 e 1:21; nota existente de 1:7 preservada.
- Fontes e justificativas detalhadas em `REVISAO-EXODO.md`.
- Estado operacional no painel: permanece **Em revisão** até a transição individual de cada versículo, com fonte e observação. Esta anotação de progresso não altera automaticamente o localStorage do navegador.
- Próximo trecho pendente: Êxodo 2:1–25.

### Política de continuidade
Não repetir a revisão de Êxodo 1 por reinício de conversa. Reabrir apenas se surgir evidência concreta de erro relevante ou fonte nova que justifique uma alteração específica, documentando o motivo e os versículos afetados.
