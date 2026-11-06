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


### Êxodo 2:1–25
- Conferência textual integral concluída contra o Texto Massorético.
- Correção objetiva em 2:12: “escondeu-o na areia” → “enterrou-o na areia”.
- Notas lexicais em 2:2, 2:3, 2:12, 2:17 e 2:25; notas de 2:10 e 2:22 preservadas.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 3:1–22.


### Êxodo 3:1–22
- Conferência textual integral concluída contra o Texto Massorético.
- Correções em 3:3–4 para refletir סור (*sur*), “desviar-se/afastar-se do caminho”.
- Notas lexicais em 3:2–3; notas de 3:14 e 3:19 preservadas.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 4:1–31.


### Êxodo 4:1–31
- Conferência textual integral concluída contra o Texto Massorético.
- Ajuste em 4:11 para refletir שׂים (*sim*), “pôr/colocar”, em formulação idiomática.
- Notas lexicais em 4:6, 4:10, 4:11 e 4:31; notas de 4:13, 4:18 e 4:24–26 preservadas.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 5:1–23.


### Êxodo 5:1–23
- Conferência textual integral concluída contra o Texto Massorético.
- Ajuste em 5:16 para preservar a coordenação hebraica; variante textual antiga documentada.
- Notas lexicais em 5:3, 5:7, 5:8, 5:16 e 5:21.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 6:1–30.


### Êxodo 6:1–30
- Conferência textual integral concluída contra o Texto Massorético.
- Ajuste em 6:3 para a forma passiva nifal “não fui conhecido por eles”.
- Ajuste em 6:26 para “Estes são Arão e Moisés”.
- Notas lexicais/gramaticais em 6:1, 6:3, 6:12, 6:20, 6:26 e 6:30; nota de 6:9 preservada.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 7:1–29.


### Êxodo 7:1–29
- Conferência textual integral concluída contra o Texto Massorético; nenhuma alteração no corpo da tradução.
- Notas lexicais em 7:3, 7:13, 7:14 e 7:15; nota de 7:9 preservada.
- Distinções registradas entre קשה (*qashah*), חזק (*chazaq*), כבד (*kaved*), תַּנִּין (*tannin*) e נָחָשׁ (*nachash*).
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 8:1–28.


### Êxodo 8:1–28
- Conferência textual integral concluída contra o Texto Massorético.
- Ajuste em 8:5 para “Toma para ti a honra de escolher”, refletindo a expressão idiomática hitpa'er alai.
- Notas lexicais em 8:5, 8:12, 8:15, 8:17, 8:19, 8:22 e 8:26.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 9:1–35.


### Êxodo 9:1–35
- Conferência textual integral concluída contra o Texto Massorético; nenhuma alteração no corpo da tradução.
- Notas lexicais ampliadas/acrescentadas em 9:6, 9:12, 9:16, 9:31, 9:32, 9:34 e 9:35.
- Registradas a tensão textual sobre o rebanho, as fases agrícolas e as raízes distintas no motivo do coração do faraó.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 10:1–29.


### Êxodo 10:1–29
- Conferência textual integral concluída contra o Texto Massorético; nenhuma alteração no corpo da tradução.
- Notas lexicais em 10:2, 10:10, 10:13, 10:19 e 10:21.
- Registradas a nuance de hit'allalti, a possível alusão a Rá, os ventos oriental/ocidental e a escuridão palpável.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 11:1–10.


### Êxodo 11:1–10
- Conferência textual integral concluída contra o Texto Massorético.
- Ajustes em 11:1, 11:4 e 11:8.
- Notas lexicais em 11:1, 11:4 e 11:8; notas anteriores de 11:2, 11:5 e 11:7 preservadas.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 12:1–51.


### Êxodo 12:1–51
- Conferência textual integral concluída contra o Texto Massorético.
- Ajuste em 12:21 para “Retirai e tomai”, refletindo משך e לקח.
- Notas lexicais em 12:3, 12:21 e 12:42; notas anteriores preservadas.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 13:1–22.


### Êxodo 13:1–22
- Conferência textual integral concluída contra o Texto Massorético.
- Corrigido erro tipográfico em 13:11.
- Ajustado 13:17 para “o povo não mude de ideia”; nota corrigida para distinguir נחה (conduzir) de נחם (mudar de ideia).
- Nota de 13:18 ampliada sobre chamushim e Yam Suf.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 14:1–31.


### Êxodo 14:1–31
- Conferência textual integral concluída contra o Texto Massorético.
- Ajuste em 14:6 para “atrelou seu carro”, refletindo אסר (*asar*).
- Nota lexical em 14:6; notas anteriores do capítulo preservadas.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 15:1–27.


### Êxodo 15:1–27
- Conferência textual integral concluída contra o Texto Massorético; nenhuma alteração no corpo da tradução.
- Notas ampliadas em 15:2, 15:8, 15:11 e 15:17; nota de 15:23 preservada.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 16:1–36.


### Êxodo 16:1–36
- Conferência textual integral concluída contra o Texto Massorético.
- Ajuste em 16:14 para “algo fino e em flocos”.
- Notas lexicais em 16:14, 16:15, 16:33 e 16:36; notas anteriores preservadas.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 17:1–16.


### Êxodo 17:1–16
- Conferência textual integral concluída contra o Texto Massorético.
- Ajuste em 17:16 para “uma mão está sobre o trono de Yah”, mais próximo de עַל (*al*).
- Notas anteriores de 17:2, 17:6, 17:7, 17:15 e 17:16 preservadas.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 18:1–27.


### Êxodo 18:1–27
- Conferência textual integral concluída contra o Texto Massorético; nenhuma alteração no corpo da tradução.
- Notas sintáticas em 18:19 e 18:23; notas anteriores preservadas.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 19:1–25.


### Êxodo 19:1–25
- Conferência textual integral concluída contra o Texto Massorético; nenhuma alteração no corpo da tradução.
- Nota lexical acrescentada em 19:22; notas anteriores do capítulo preservadas.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 20:1–26.


### Êxodo 20:1–26
- Conferência textual integral concluída contra o Texto Massorético.
- Ajuste em 20:25 para concordância singular com o altar: “erguer sua ferramenta sobre ele, você o profanará”.
- Nota lexical em 20:25; notas anteriores do capítulo preservadas.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 21:1–36.


### Êxodo 21:1–36
- Conferência textual integral concluída contra o Texto Massorético.
- Ajuste em 21:23 para “se houver dano”, sem o adjetivo “grave” não expresso no hebraico.
- Notas anteriores preservadas, incluindo a ambiguidade de 21:22–23.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 22:1–31.


### Êxodo 22:1–31
- Conferência textual integral concluída contra o Texto Massorético.
- Ajuste em 22:29 para “a abundância de tua colheita e o produto de teus lagares”.
- Nota lexical em 22:29; notas anteriores preservadas.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 23:1–33.


### Êxodo 23:1–33
- Conferência textual integral concluída contra o Texto Massorético; nenhuma alteração no corpo da tradução.
- Nota lexical em 23:26 sobre perda gestacional e infertilidade; notas anteriores preservadas.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 24:1–18.


### Êxodo 24:1–18
- Conferência textual integral concluída contra o Texto Massorético; nenhuma alteração no corpo da tradução.
- Notas anteriores de 24:7, 24:8 e 24:10 preservadas.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 25:1–40.


### Êxodo 25:1–40
- Conferência textual integral concluída contra o Texto Massorético.
- Ajustes em 25:29 para a ordem dos utensílios e em 25:38 para distinguir pinças de bandejas de cinzas.
- Notas lexicais em 25:29 e 25:38; notas anteriores preservadas.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 26:1–37.


### Êxodo 26:1–37
- Conferência textual integral concluída contra o Texto Massorético; nenhuma alteração no corpo da tradução.
- Notas lexicais em 26:17, 26:24 e 26:36; notas anteriores preservadas.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 27:1–21.


### Êxodo 27:1–21
- Conferência textual integral concluída contra o Texto Massorético; nenhuma alteração no corpo da tradução.
- Notas lexicais em 27:5 e 27:9; notas anteriores preservadas.
- Fontes e justificativas em REVISAO-EXODO.md.
- Estado operacional no painel: continua “Em revisão” até que cada transição individual seja registrada com fonte e observação.
- Próximo trecho pendente: Êxodo 28:1–43.
