# Relatório de auditoria global — Deuteronômio

Data: 6 de novembro de 2026  
Repositório: `gjgaugusto-bot/biblic`  
Arquivos principais: `deuteronomy-data.js`, `deuteronomy-notes.js`, `editorial-review.js`, `index.html`, `app.js`

## Resultado da auditoria estrutural

- 34 de 34 capítulos presentes.
- 959 de 959 versículos integrados, com a contagem de cada capítulo conferida.
- Nenhum capítulo ausente ou vazio.
- Nenhum versículo vazio.
- 34 blocos de notas lexicais presentes.
- 261 notas lexicais após esta auditoria; todas têm termo e explicação preenchidos.
- Nenhuma chave de nota duplicada.
- Nenhuma nota aponta para um versículo fora do capítulo correspondente.
- Nenhuma entrada de tradução repetida por erro estrutural foi identificada. A frase equivalente em 14:11 e 14:20 é uma repetição legítima da fórmula alimentar: o hebraico usa צִפּוֹר em 14:11 e עוֹף em 14:20.
- O leitor do site reconhece Deuteronômio como livro de índice 4, carrega `DEUTERONOMY_TEXT` e busca as notas em `TRANSLATION_NOTES[4]`.
- `index.html` carrega os arquivos de dados, notas e controle editorial; as versões de cache foram atualizadas.
- Deuteronômio permanece com estado editorial `em_revisao`.

## Contagem por capítulo

| Capítulo | Versículos | Capítulo | Versículos |
|---:|---:|---:|---:|
| 1 | 46 | 18 | 22 |
| 2 | 37 | 19 | 21 |
| 3 | 29 | 20 | 20 |
| 4 | 49 | 21 | 23 |
| 5 | 33 | 22 | 30 |
| 6 | 25 | 23 | 25 |
| 7 | 26 | 24 | 22 |
| 8 | 20 | 25 | 19 |
| 9 | 29 | 26 | 19 |
| 10 | 22 | 27 | 26 |
| 11 | 32 | 28 | 68 |
| 12 | 32 | 29 | 29 |
| 13 | 18 | 30 | 20 |
| 14 | 29 | 31 | 30 |
| 15 | 23 | 32 | 52 |
| 16 | 22 | 33 | 29 |
| 17 | 20 | 34 | 12 |
| **Total** | **959** | | |

## Achados editoriais e ajustes realizados

1. **Cabeçalho desatualizado:** o arquivo de dados ainda dizia “início da integração; capítulo 1 de 34”. Atualizado para refletir os 34 capítulos e 959 versículos integrados, sem declarar a revisão textual concluída.
2. **Cabeçalho das notas:** atualizado para identificar o escopo completo de Deuteronômio 1–34 e o total de 261 notas.
3. **Deuteronômio 14:11 e 14:20:** a tradução portuguesa repete legitimamente a fórmula “Podereis comer toda ave pura”. Foi acrescentada nota em 14:20 distinguindo os substantivos hebraicos צִפּוֹר e עוֹף.
4. **Deuteronômio 29:1 — diferença de numeração:** na divisão da BHS, a frase “Estas são as palavras da aliança...” é Deuteronômio 28:69; nesta edição, ela aparece como 29:1, conforme a divisão corrente em muitas Bíblias portuguesas. Assim, Deuteronômio 29:2–29 nesta edição corresponde a 29:1–28 na numeração hebraica. A nota 29:1 agora explicita essa diferença.
5. **Deuteronômio 33:6:** a nota foi ampliada para explicar מִסְפָּר (“número/contagem”), cuja leitura contextual tradicional é “não sejam poucos”.
6. **Deuteronômio 34:6:** a nota agora registra que o sujeito de “sepultou” não é explicitado no próprio versículo; a leitura tradicional o identifica com YHWH, mas a tradução conserva o pronome.

## Consistência e integração técnica

- O índice de livros em `app.js` identifica Deuteronômio como livro 4, com 34 capítulos.
- O texto é obtido de `window.DEUTERONOMY_TEXT[capítulo]`.
- As notas são obtidas de `window.TRANSLATION_NOTES[4][capítulo][versículo]`.
- Os scripts de dados e notas são carregados antes de `app.js` e `editorial-review.js`.
- A revisão editorial registra os 34 capítulos como integrados, mas mantém o estado `em_revisao`.

## Limites desta auditoria

Esta auditoria global confirma a integridade estrutural, a cobertura dos capítulos, a correspondência das notas, a integração ao leitor e alguns pontos editoriais identificados. **Ela não equivale a uma colação integral, versículo por versículo, de todos os 959 versículos contra a BHS, nem a uma revisão acadêmica independente da tradução.**

A BHS é uma edição crítica do texto hebraico, não uma tradução portuguesa. A consulta online da Deutsche Bibelgesellschaft permite leitura e consulta, mas restringe a reprodução e integração do texto hebraico integral em outros materiais. A tradução do projeto permanece própria. O cotejo textual detalhado deve continuar em lotes, registrando separadamente os capítulos efetivamente conferidos.

## Fontes de referência

- [Biblia Hebraica Stuttgartensia — Society of Biblical Literature](https://www.sbl-site.org/resources/digital-texts/biblia-hebraica-stuttgartensia/)
- [BHS — Deuteronômio 28](https://www.die-bibel.de/en/bible/BHS/DEU.28) — inclui 28:69, que corresponde a 29:1 na divisão corrente.
- [BHS — Deuteronômio 29](https://www.die-bibel.de/bibel/BHS/DEU.29)
- [BHS — Deuteronômio 31](https://www.die-bibel.de/bibel/BHS/DEU.31)
- [BHS — Deuteronômio 32](https://www.die-bibel.de/bibel/BHS/DEU.32)
- [BHS — Deuteronômio 33](https://www.die-bibel.de/bibel/BHS/DEU.33)
- [BHS — Deuteronômio 34](https://www.die-bibel.de/bibel/BHS/DEU.34)
- [Mechon-Mamre — Deuteronômio 31](https://new.mechon-mamre.org/p/pt/pt0531.htm)

