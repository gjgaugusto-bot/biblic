# Inventário e protocolo da auditoria editorial — 2026-11-13

## Estado técnico de partida

- A branch `main` contém 66 livros e 1.189 capítulos.
- Apocalipse está integrado com uma primeira redação de 22 capítulos / 405 posições; não está aprovado editorialmente.
- A publicação do commit `344e2ea59c48313e6f1b57649b126bd016e0d03f` foi concluída com sucesso no workflow `43349123196`.
- A suíte Playwright/Chromium e axe-core passou no workflow `43349123205`.
- Esses resultados demonstram estrutura, carregamento e fluxos testados; não demonstram fidelidade da tradução ao original.

## Cobertura de notas lexicais encontrada

O `index.html` carrega módulos que alimentam `window.TRANSLATION_NOTES` para os índices 0–5 do catálogo:

| Índice | Livro | Módulo(s) |
|---:|---|---|
| 0 | Gênesis | `translation-notes.js` |
| 1 | Êxodo | `translation-notes.js` e módulos por blocos de capítulos 11–40 |
| 2 | Levítico | `leviticus-notes.js` |
| 3 | Números | `numbers-notes.js` |
| 4 | Deuteronômio | `deuteronomy-notes.js` |
| 5 | Josué | `joshua-notes.js` |

Não foram identificados módulos dedicados de notas lexicais carregados para os índices 6–65 (Juízes até Apocalipse). Isso é uma lacuna de cobertura do material de notas, não prova de que não existam observações em outros campos de estudo. O inventário deve ser atualizado se forem encontrados outros registros estruturados.

O controle `editorial-review.js` migra estados históricos para Gênesis, Êxodo, Levítico, Números e Deuteronômio. Para os demais livros, o estado inicial padrão é pendente; a ausência de um registro legado não deve ser interpretada como revisão concluída.

## Protocolo obrigatório por versículo

Para cada um dos 66 livros, trabalhar capítulo a capítulo e registrar cada decisão:

1. **Base textual:** identificar edição e fonte do texto original, incluindo variantes relevantes; não misturar texto crítico e tradição majoritária sem anotação.
2. **Forma original:** conferir palavra, lema, morfologia e função sintática quando a fonte permitir. MorphGNT pode ajudar na estrutura, mas uma contagem/ID não equivale a análise lexical.
3. **Sentido contextual:** verificar faixa semântica, uso no contexto imediato, paralelos e possíveis ambiguidades.
4. **Fidelidade:** conferir sujeito, objeto, tempo/aspecto, voz, negação, conectivos, relações lógicas, metáforas, idiomatismos e elipses.
5. **Português:** revisar gramática, regência, concordância, colocação, pontuação, clareza e consistência terminológica sem apagar características do original.
6. **Variantes:** documentar acréscimos, omissões e leituras variantes; nunca inserir no texto principal uma leitura secundária sem sinalização.
7. **Notas:** verificar lema, forma citada, transliteração, explicação morfológica, semântica, contexto e se a nota sustenta exatamente o que afirma.
8. **Referências:** conferir referências cruzadas, nomes próprios, números, lugares e alusões.
9. **Registro:** salvar texto anterior, correção, justificativa, fonte, responsável e estado editorial por versículo.
10. **Validação:** executar testes estruturais e de navegador após alterações; isso não substitui a revisão textual.

## Regras de classificação

- **Pendente:** ainda não conferido.
- **Em revisão:** há cotejo ativo, mas existem questões não resolvidas.
- **Revisado:** todos os itens acima foram verificados e as decisões documentadas; não usar apenas por contagem correta ou teste técnico.
- **Reaberto:** surgiu evidência, variante ou problema que exige nova análise.

Uma primeira redação completa continua sendo rascunho até concluir a revisão. Nenhum livro deve ser marcado como revisado por inferência ou por migração automática.

## Ordem de trabalho

1. Inventariar as fontes originais e variantes de cada livro.
2. Revisar as notas existentes de Gênesis–Josué, sem presumir que notas antigas estejam corretas.
3. Revisar texto e notas de cada livro em ordem canônica, do primeiro ao último.
4. Criar notas lexicais adicionais somente quando forem úteis e sustentadas pela fonte; não fabricar notas para preencher quantidade.
5. Manter um relatório de problemas por capítulo e uma lista de decisões pendentes.
6. Ao concluir cada livro, executar validação automatizada e registrar a aprovação editorial separadamente da integração técnica.

## Limites desta etapa

Este documento é um inventário e protocolo. Não declara que qualquer texto ou nota foi auditado nesta rodada. A revisão efetiva exige cotejo com as fontes originais apropriadas e registro de correções versículo a versículo.
