# CHECK-UP FUNCIONAL DO SITE — 2026-11-06

## Resultado

**APROVADO no último commit da branch `main`.** O workflow automatizado de proteção do site e o workflow de publicação do GitHub Pages terminaram com sucesso no commit `f1a9cf6712be759834749f04a8ee9acab8652a59`.

- Proteção do site: [workflow 42307301590](https://github.com/gjgaugusto-bot/biblic/actions/runs/42307301590) — sucesso.
- Publicação GitHub Pages: [workflow 42307301519](https://github.com/gjgaugusto-bot/biblic/actions/runs/42307301519) — sucesso.
- No workflow de proteção, passaram sintaxe JavaScript, validação estrutural, instalação do Chromium, servidor local, testes Playwright/Chromium, varredura axe-core e atualização do espelho de segurança.

## Funcionalidades cobertas pelos testes

1. **Catálogo e navegação:** renderização dos 66 livros; abertura dos livros; conferência da quantidade de capítulos de cada livro (1.189 capítulos no total).
2. **Ficha do livro:** exibição da seção “Sobre o livro”, incluindo idioma original e autoria.
3. **Leitor:** abertura de capítulo e conteúdo de Gênesis 4; navegação entre abas de simbologias/personagens; acessibilidade das abas por teclado.
4. **Controle editorial:** migração de estados legados; mudança de estado com fonte e observação; bloqueio de aprovação sem evidência; bloqueio de reabertura sem motivo e fonte; histórico de transições.
5. **Edição local:** salvar edição de capítulo e confirmar persistência após recarregar a página.
6. **Biblioteca:** edição e persistência das categorias; cadastro de símbolo, personagem e guia.
7. **Backup:** exportação JSON; conferência de dados exportados; importação de dados; validação de arquivo inválido; limpeza local mediante confirmação.
8. **Responsividade:** telas de 390 px e 320 px sem rolagem horizontal; preferência por movimento reduzido respeitada.
9. **Acessibilidade e estabilidade:** varredura axe-core nas telas inicial, ficha do livro, leitor e painel administrativo; nenhuma exceção JavaScript durante o fluxo de teste.
10. **Integridade estrutural:** 66 livros, nomes e slugs únicos, contagem canônica de 1.189 capítulos, IDs HTML sem duplicação, carregamento ordenado dos módulos e validações de dados/backup/editorial.

## Arquivos e automação

- `scripts/validate-site.mjs`: valida estrutura, configuração dos livros, carregamento de módulos, integridade de Gênesis, controle editorial, biblioteca, backups e IDs.
- `scripts/browser-smoke.mjs`: testes de ponta a ponta com Playwright e axe-core.
- `.github/workflows/site-safety.yml`: executa verificações em cada push/PR e atualiza o espelho `backup-automatico` somente após aprovação.
- `.github/workflows/deploy-pages.yml`: publica o site no GitHub Pages após push na `main`.

## Limites do resultado

- O teste é automatizado e cobre os fluxos listados; não equivale a uma inspeção manual de cada versículo, nota lexical ou conteúdo de todos os capítulos.
- Nem toda combinação de busca/filtro, cada campo do editor, todos os botões de navegação e todos os conteúdos foram exercitados individualmente. Novos fluxos devem ganhar testes específicos quando forem alterados.
- As edições administrativas continuam armazenadas no `localStorage` do navegador. Não sincronizam automaticamente com o GitHub nem com outros dispositivos. Exportar e guardar o backup é essencial.
- O leitor de produção não foi percorrido manualmente por uma sessão humana neste check-up; a evidência funcional é o workflow Playwright/Chromium concluído com sucesso.

## Divergências editoriais a reconciliar (não alteradas neste check-up)

- A página inicial informa “Deuteronômio: capítulos 1–24 integrados; tradução em andamento”, mas os arquivos e o relatório editorial do repositório registram 34 capítulos e 959 versículos integrados, ainda em revisão. Atualizar o aviso público para refletir os 34 capítulos.
- O aviso público e `editorial-review.js` ainda apresentam Êxodo como “em revisão”; há confirmação do responsável do projeto de que Êxodo já foi revisado. Antes de alterar os estados por versículo ou aplicar selo de cotejo, reconciliar a declaração editorial com o relatório de Êxodo e a evidência documental, sem inventar cotejo acadêmico.
- O selo “Cotejado versículo a versículo” está aplicado somente a Números e informa corretamente que a colação massorética dos 36 capítulos não equivale a cotejo direto integral com a BHS.

## Próxima ação técnica recomendada

Manter os dois workflows obrigatórios. Na próxima alteração funcional, ampliar o Playwright para testar busca/filtros da biblioteca, edição de notas lexicais, ficha “Sobre o livro”, navegação anterior/próximo capítulo, referências relacionadas e restauração de backup com dados locais preexistentes.
