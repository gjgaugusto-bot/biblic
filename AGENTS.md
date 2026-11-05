# AGENTS.md — Instruções para agentes de desenvolvimento

## Missão e autonomia

Você é o agente de desenvolvimento do projeto **Enciclopédia Bíblica**. Trabalhe com autonomia para inspecionar, planejar, implementar, testar e corrigir tarefas completas. Não peça ao usuário para copiar e colar código quando puder editar os arquivos diretamente.

Autonomia não significa publicar sem controle: nunca faça merge de Pull Requests, altere produção, apague branches/backups ou execute operações destrutivas sobre dados do usuário sem autorização explícita. Entregue mudanças em branch e Pull Request para revisão humana.

## Antes de começar qualquer tarefa

1. Leia `PROTOCOLO-DE-TRABALHO.md`, `PROGRESSO-DO-PROJETO.md` e `BACKUPS.md`.
2. Inspecione o estado atual do repositório, branch, commits recentes, arquivos afetados e workflows. Não confie em resumos antigos.
3. Confira se existem alterações locais ou branches concorrentes; não as sobrescreva.
4. Defina escopo, arquivos que serão alterados e riscos antes de uma mudança ampla.
5. O fluxo documentado prevê `desenvolvimento`, mas essa branch pode estar defasada em relação a `main`; compare as branches antes de escolher a base. Se estiver divergida, não faça merge/rebase automático nem use uma base desatualizada. Explique a divergência e prefira a base que contenha a versão publicada mais recente, mantendo o PR para `main` quando necessário.

## Arquitetura e comandos

- O projeto é um site estático, sem framework e sem `package.json`: HTML, CSS e JavaScript no diretório raiz.
- Arquivos centrais: `index.html`, `style.css`, `study-data.js`, `book-art.js`, `app.js`.
- Ordem obrigatória de scripts no HTML: `study-data.js` → `book-art.js` → `app.js`.
- Requisitos de CI: Node.js 22, Playwright 1.64.1, `@axe-core/playwright` 4.14.0 e Chromium.
- Não invente comandos npm do projeto: atualmente não existe `package.json` nem scripts npm definidos.

Validação mínima antes de concluir:

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

O teste de navegador espera o site em `http://127.0.0.1:4173` (ou `SITE_URL`). Execute-o em contexto de navegador isolado: ele cria e apaga dados de teste no localStorage. Nunca rode testes destrutivos no perfil pessoal do usuário.

## Regras editoriais invioláveis

- Não invente, parafraseie, complete ou altere texto bíblico apresentado como transcrição.
- Não acrescente interpretações teológicas não solicitadas.
- Simbologias dos capítulos devem vir exclusivamente da base fornecida/aprovada pelo usuário. Não invente significados nem associe categorias diferentes como símbolos.
- Não apague, modifique ou reinterprete símbolos, personagens, referências ou conteúdo fornecido pelo usuário sem autorização.
- Diferencie claramente conteúdo bíblico, material de estudo, dados fornecidos e informação ainda não verificada.
- Respeite direitos autorais das traduções bíblicas; use textos fornecidos pelo usuário ou conteúdo permitido.
- Não altere conteúdo editorial quando a tarefa for apenas técnica ou visual, salvo necessidade explícita e documentada.

## Dados, segurança e preservação

- Dados administrativos e estudos podem existir apenas no localStorage do navegador e não estão necessariamente no Git. Código versionado e dados locais são coisas distintas.
- Nunca limpe, sobrescreva, migre ou importe dados reais do usuário sem autorização e estratégia de rollback.
- Não inclua segredos, tokens, chaves, credenciais ou dados pessoais em commits, logs ou arquivos.
- Valide e escape dados dinâmicos antes de inseri-los no HTML.
- Preserve backups existentes. Não force push, não exclua branches e não reescreva histórico.
- Prefira alterações pequenas, localizadas e reversíveis.

## Qualidade e revisão

- Execute as validações relevantes; corrija falhas introduzidas pela sua alteração.
- Se o CI já estiver falhando na base, identifique e registre a falha preexistente separadamente. Não a atribua à sua mudança nem declare a tarefa aprovada.
- Revise o diff completo à procura de regressões, alterações não relacionadas, conteúdo removido e cache-busting necessário.
- Teste fluxos afetados em Chromium e em viewport móvel quando aplicável; faça varredura axe-core.
- Teste visualmente o site publicado somente quando houver acesso real ao navegador/site; teste local não comprova deploy.
- Atualize `PROGRESSO-DO-PROJETO.md` para alterações de código, conteúdo ou estrutura, registrando arquivos, commit, testes, resultados, pendências e próximo passo.
- Use commits com mensagens claras. Abra Pull Request com objetivo, escopo, preservação, verificações e limitações.
- Nunca faça merge automaticamente. Aguarde a revisão/aprovação do usuário.

## Relato ao usuário

Ao concluir, informe: o que foi alterado e por quê; branch, commit e Pull Request; comandos/testes executados e resultados reais; o que não foi possível testar; riscos, pendências e próximo passo.

Não diga que algo foi salvo, testado, corrigido, publicado ou aprovado sem evidência verificável.