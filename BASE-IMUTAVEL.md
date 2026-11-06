# Base de referência congelada — 2026-11-06

Esta é a referência técnica do projeto após a auditoria integral. Ela deve ser preservada sem alterações.

## Branches
- `base-imutavel-2026-11-06`: snapshot de referência; não editar.
- `trabalho-base-2026-11-06`: ponto de partida para todo trabalho futuro.
- `arquivo-pre-auditoria-2026-11-06`: snapshot do estado anterior às correções da auditoria.

## O que foi verificado
- Sintaxe JavaScript e integridade estrutural.
- 66 livros, slugs únicos e contagem canônica de 1.189 capítulos.
- Contagem estrutural dos versículos dos 50 capítulos de Gênesis.
- Navegação e lista de capítulos de todos os livros em Chromium.
- Ficha de livro, leitura de Gênesis 4 e abas acessíveis por mouse e teclado.
- Edição e persistência no navegador.
- Personalização, persistência, exportação e importação das categorias da biblioteca.
- Cadastro de simbologias, personagens e guias.
- Exportação, importação e limpeza de backup.
- Layout móvel em 390 px e 320 px, preferência por movimento reduzido e varreduras axe-core.

## Limites conhecidos
- A aprovação técnica não certifica a tradução bíblica. Os textos de Gênesis permanecem rascunhos que precisam de revisão semântica especializada.
- Os outros livros estão navegáveis e preparados para receber conteúdo; não são traduções concluídas.
- A biblioteca temática não foi certificada como fonte acadêmica.
- Os dados pessoais guardados apenas no `localStorage` não estão incluídos no GitHub. Exportar o JSON pelo painel administrativo e guardá-lo separadamente.
- A branch congelada é preservada por procedimento; não há confirmação de bloqueio técnico de escrita.

## Regra de continuidade
Criar novas branches a partir de `trabalho-base-2026-11-06`. Nunca alterar `base-imutavel-2026-11-06`. Não mesclar o PR #35 nem publicar o site sem autorização explícita.
