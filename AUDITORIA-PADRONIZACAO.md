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
| Gênesis | O objeto de dados encontrado contém capítulos 1–6 (160 versículos) | Estrutura antiga embutida no app.js foi mantida à parte nesta etapa | Capítulos 7–50 ainda não foram integrados (44 capítulos ausentes); completar antes de declarar o livro integral |
| Êxodo | Arquivos em lotes cobrem capítulos 1–40 | Notas distribuídas em translation-notes.js e arquivos por lotes | Estrutura fragmentada; precisa de inventário automático unificado |
| Levítico | 27 capítulos em leviticus-data.js | leviticus-notes.js | A cobertura das notas é parcial; inventariar por capítulo/versículo |
| Números | 36 capítulos em numbers-data.js | notes para os capítulos 1–36 | Não implica nota em cada versículo |
| Deuteronômio | 34 capítulos em deuteronomy-data.js | notes para os capítulos 1–34 | Não implica nota em cada versículo |
| Josué | 24 capítulos em joshua-data.js | notes para os capítulos 1–24 | Tradução de trabalho; revisão exegética final pendente |

## Pendências antes de publicação geral

1. Completar Gênesis 7–50 ou restringir claramente a disponibilidade do livro aos capítulos existentes.
2. Gerar inventário real de versículos e notas de todos os livros, não apenas contagem de chaves.
3. Harmonizar fontes-base e registrar diferenças justificadas; não trocar fontes sem conferir o texto.
4. Padronizar a apresentação das notas no leitor e no painel administrativo.
5. Verificar o carregamento em navegador e a ausência de erros de console.
6. Fazer revisão linguística e exegética dos textos antes de classificá-los como revisados.

## Política de publicação

Não publicar como integral qualquer livro com capítulos ausentes. Não exibir selos de revisão/cotejo que não estejam comprovados. Esta branch ainda não deve ser mesclada à main enquanto as pendências acima permanecerem.
