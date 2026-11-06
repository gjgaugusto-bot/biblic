# Auditoria de padronização — Gênesis a Josué

Branch de trabalho: `feat/josue-texto-wlc-2026-11-06`

Esta auditoria é estrutural/editorial. Não certifica revisão exegética integral.

## Ajustes já feitos nesta branch

- Extraídos os dados de Gênesis do corpo de app.js para genesis-data.js, sem reescrever o texto durante a movimentação.
- index.html carrega genesis-data.js antes de app.js.
- app.js passa a consumir window.GENESIS_TEXT.
- Corrigida a referência do capítulo 1 para window.GENESIS1 no arquivo externo.
- Criado um padrão editorial comum em PADRAO-EDITORIAL.md.
- Josué permanece integrado nesta branch, com 24 capítulos e notas lexicais para os 24 capítulos.

## Lacunas e diferenças identificadas

| Livro | Texto | Notas lexicais | Observação |
|---|---|---|---|
| Gênesis | Capítulos 1–15 integrados (382 versículos) | 49 notas lexicais efetivas em arquivo próprio (contagem de chaves a confirmar após execução no navegador) | Capítulos 16–50 ainda não foram integrados (35 capítulos ausentes); capítulos 1–2 têm fonte-base a documentar; capítulos 3–15 foram traduzidos com consulta à WLC |
| Êxodo | Arquivos em lotes cobrem capítulos 1–40 | 190 notas lexicais selecionadas em arquivos por faixa de capítulos | Dados e notas permanecem fragmentados fisicamente, mas compartilham objetos globais padronizados |
| Levítico | 27 capítulos em leviticus-data.js | 162 notas lexicais selecionadas em leviticus-notes.js | Notas não são uma por versículo; conferir distribuição por capítulo |
| Números | 36 capítulos em numbers-data.js | 273 notas lexicais selecionadas em numbers-notes.js | Não implica nota em cada versículo |
| Deuteronômio | 34 capítulos em deuteronomy-data.js | 261 notas lexicais selecionadas em deuteronomy-notes.js | Não implica nota em cada versículo |
| Josué | 24 capítulos em joshua-data.js | 140 notas lexicais selecionadas em joshua-notes.js | Tradução de trabalho; revisão exegética final pendente |

## Pendências antes de publicação geral

1. Completar Gênesis 16–50 ou restringir claramente a disponibilidade do livro aos capítulos existentes.
2. Gerar inventário real de versículos e notas de todos os livros, não apenas contagem de chaves.
3. Harmonizar fontes-base e registrar diferenças justificadas; não trocar fontes sem conferir o texto.
4. Padronizar a apresentação das notas no leitor e no painel administrativo.
5. Verificar o carregamento em navegador e a ausência de erros de console.
6. Fazer revisão linguística e exegética dos textos antes de classificá-los como revisados.

## Política de publicação

Não publicar como integral qualquer livro com capítulos ausentes. Não exibir selos de revisão/cotejo que não estejam comprovados. Esta branch ainda não deve ser mesclada à main enquanto as pendências acima permanecerem.
