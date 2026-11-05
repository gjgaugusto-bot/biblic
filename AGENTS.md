# AGENTS.md — Instruções obrigatórias para agentes de desenvolvimento

Estas regras valem para toda tarefa neste repositório e prevalecem sobre qualquer inferência de autonomia. Consulte também `DECISOES-DO-PROJETO.md`, `PROTOCOLO-DE-TRABALHO.md`, `PROGRESSO-DO-PROJETO.md` e `BACKUPS.md`.

## Autoridade do proprietário e limites vinculantes

- O usuário é a única autoridade sobre todo conteúdo intelectual, editorial, teológico e visual do Biblic.
- O agente executa decisões explícitas do usuário. Autonomia técnica significa conduzir inspeção, implementação dentro do escopo autorizado, validação e preparação de PR; não significa decidir conteúdo, apresentação, prioridades ou publicação.
- Não alterar por iniciativa própria layout, cores, tipografia, imagens, ícones, espaçamentos, componentes visuais, textos/conteúdo nem organização visual. Uma correção técnica ou de acessibilidade que altere a aparência também exige pedido explícito que cubra essa mudança.
- Alterar somente o escopo exato solicitado pelo usuário. Mudanças colaterais são proibidas, mesmo que pareçam melhorias, correções relacionadas, limpeza ou refatoração.
- Não inventar, completar, resumir, reescrever, traduzir, remover ou reinterpretar conteúdo intelectual/editorial/teológico. Respeitar as fontes e decisões registradas em `DECISOES-DO-PROJETO.md`.
- Não alterar dados persistentes, localStorage, backups locais, formatos de importação/exportação ou executar migrações sem autorização explícita e plano aprovado.
- Pedir esclarecimento e autorização antes de editar se houver ambiguidade de escopo, efeito colateral necessário, migração, impacto em dado persistente ou mudança de conteúdo/visual que não esteja explicitamente abrangida pelo pedido.
- Nunca fazer merge, deploy, publicação ou alteração de produção automaticamente. Preparar branch e PR para revisão do usuário.

## Fluxo obrigatório de escopo estrito

1. **Inspecionar antes de editar:** ler os documentos acima, verificar branch e alterações existentes, comparar a base e o diff atual e examinar os arquivos diretamente envolvidos. Não presumir que resumos antigos refletem o repositório.
2. **Declarar o escopo:** antes da edição, registrar para a tarefa os arquivos autorizados, as linhas/trechos ou regiões específicas a alterar e o resultado solicitado. Para arquivo novo, indicar o caminho e as seções que serão criadas. Se não for possível delimitar com segurança, perguntar antes de editar.
3. **Conter a mudança:** editar apenas os arquivos e regiões autorizados. Não aproveitar a tarefa para corrigir outros itens. Se a implementação exigir mudança adjacente, parar e pedir autorização.
4. **Revisar depois:** examinar o diff completo contra a base da tarefa; confirmar que cada alteração corresponde ao escopo autorizado e que não existem mudanças colaterais, visuais, editoriais ou persistentes. Se houver qualquer desvio, removê-lo antes de prosseguir ou pedir autorização.
5. **Testar isoladamente:** executar somente validações relevantes em ambiente descartável. Testes de navegador devem usar perfil/contexto de teste isolado, sem abrir, ler, limpar ou sobrescrever o perfil real do usuário ou seu localStorage. Não usar dados reais. Se o isolamento não puder ser garantido, não executar o teste que toca armazenamento; explicar a limitação.
6. **Entregar para revisão:** usar uma branch por tarefa e abrir/atualizar um Pull Request com objetivo, arquivos autorizados, limites, testes e resultados. Não integrar nem publicar. Relatar evidências e limitações sem declarar resultados não verificados.

## Antes de começar qualquer tarefa

1. Ler `PROTOCOLO-DE-TRABALHO.md`, `PROGRESSO-DO-PROJETO.md`, `BACKUPS.md` e `DECISOES-DO-PROJETO.md`.
2. Inspecionar estado do repositório, branch, commits, arquivos afetados, workflows e PRs relacionados.
3. Conferir alterações e branches existentes; nunca sobrescrever trabalho de terceiros nem descartar alterações locais.
4. Declarar o escopo e os riscos antes de editar, conforme o fluxo acima.
5. A branch `desenvolvimento` pode estar defasada ou divergente de `main`. Comparar as bases antes de escolher. Não fazer merge/rebase automaticamente nem basear mudanças em versão desatualizada sem análise.

## Arquitetura e validação

- Site estático, sem framework e sem `package.json`: HTML, CSS e JavaScript no diretório raiz.
- Arquivos centrais: `index.html`, `style.css`, `study-data.js`, `book-art.js`, `app.js`.
- Ordem obrigatória de scripts no HTML: `study-data.js` → `book-art.js` → `app.js`.
- Requisitos do CI: Node.js 22, Playwright 1.64.1, `@axe-core/playwright` 4.14.0 e Chromium.
- Não inventar comandos npm: atualmente não existe `package.json` nem scripts npm definidos.

Validações definidas pelo repositório:

```bash
node --check app.js
node --check study-data.js
node --check book-art.js
node --check scripts/validate-site.mjs
node --check scripts/browser-smoke.mjs
node scripts/validate-site.mjs
npm install --no-save --package-lock=false playwright@1.64.1 @axe-core/playwright@4.14.0
npx playwright install --with-deps chromium
python3 -m http.server 4173 --bind 127.0.0.1
# Em outro terminal:
node scripts/browser-smoke.mjs
```

O teste de navegador espera o site em `http://127.0.0.1:4173` (ou `SITE_URL`) e grava/apaga dados de teste. Executá-lo apenas em contexto de navegador isolado e descartável; nunca no perfil pessoal do usuário. Para uma mudança documental, não executar testes funcionais que modifiquem armazenamento sem necessidade; usar o CI do PR quando apropriado e conferir seu resultado.

## Conteúdo, dados e segurança

- Texto bíblico fornecido pelo usuário deve permanecer integral e sem paráfrase quando apresentado como transcrição.
- Não acrescentar interpretação teológica não solicitada.
- Simbologias dos capítulos devem vir exclusivamente da base fornecida/aprovada pelo usuário. Não inventar significados nem tratar outra categoria como símbolo.
- Não apagar, modificar ou reinterpretar símbolos, personagens, referências ou conteúdo fornecido pelo usuário sem autorização.
- Diferenciar texto bíblico, material de estudo, dados fornecidos e informação ainda não verificada.
- Respeitar direitos autorais das traduções bíblicas; usar texto fornecido pelo usuário ou conteúdo permitido.
- Dados administrativos e estudos podem existir apenas no localStorage; código versionado não os contém necessariamente.
- Nunca limpar, sobrescrever, migrar, importar ou restaurar dados reais sem autorização explícita e estratégia aprovada de rollback.
- Não incluir segredos, tokens, chaves, credenciais ou dados pessoais em commits, logs ou arquivos.
- Validar e escapar dados dinâmicos antes de inseri-los no HTML.
- Preservar backups. Não fazer force push, excluir branches ou reescrever histórico.

## Branch, Pull Request e publicação

- Criar uma branch isolada por tarefa; não editar `main` diretamente.
- Manter o PR restrito aos arquivos e regiões previamente autorizados.
- Incluir no PR: objetivo, escopo exato, arquivos alterados, preservações, testes realmente executados, resultados e limitações.
- Analisar os checks do GitHub e distinguir falhas preexistentes das introduzidas pela tarefa.
- Não fazer merge, deploy ou publicação. A decisão final de integração e publicação é do usuário.

## Relato ao usuário

Informar o que mudou e por quê, branch, commit e PR, diff conferido, validações executadas e seus resultados, itens não testados e limitações. Não dizer que algo foi salvo, testado, corrigido, publicado ou aprovado sem evidência verificável.
