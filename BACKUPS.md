# Proteção e backups

## Camadas de proteção do código
- Branch de trabalho `desenvolvimento` criada a partir de `main`; novas alterações devem seguir por Pull Request.
- O GitHub mantém o histórico de commits da branch `main`.
- A branch `backup-automatico` recebe o espelho de `main` somente depois que o job de validação passa.
- A branch `backup-site-2026-11-05` é um snapshot manual de referência.
- Mudanças maiores devem ser preparadas em branch separada, revisadas e integradas após validação.

## Verificações automáticas
O workflow **Proteção do site** verifica a sintaxe dos scripts, arquivos essenciais, ordem de carregamento, IDs duplicados, configuração dos 66 livros, integridade dos backups e vínculos de simbologia. Também instala Playwright/Chromium e executa testes reais de navegação, busca, ficha do livro, capítulo 4, edição e persistência, simbologias, personagens, guias, exportação, importação, limpeza, viewport móvel e varreduras axe-core nas telas principais. As verificações automatizadas não substituem toda a avaliação manual.

## Dados de estudo no navegador
O aplicativo mantém backup local e histórico limitado das últimas cópias dos dados de estudo. Esse mecanismo depende do armazenamento do navegador e não substitui exportar o arquivo JSON para outro local.

## Limites importantes
- O workflow valida Pull Requests, mas a integração não tem permissão para ativar regras de proteção/rulesets. Até a regra ser configurada manualmente no GitHub, o fluxo por `desenvolvimento` e Pull Request é obrigatório por procedimento, mas não bloqueia tecnicamente um push direto em `main`.
- A integração disponível não conseguiu ler a configuração de proteção de `main` (HTTP 403); não presumimos que exista bloqueio.
- Testes automatizados em Chromium verificam os fluxos principais em navegador real, mas não substituem testes manuais em diferentes aparelhos, navegadores e tecnologias assistivas.
- Erros JavaScript capturados no navegador ficam no dispositivo; não são enviados automaticamente ao GitHub.
- O espelho automático protege o código versionado, não os dados locais do navegador.
- Para proteger dados contra perda do aparelho ou limpeza do navegador, exporte o backup JSON regularmente e guarde cópias externas.

## Procedimento
Consulte `PROTOCOLO-DE-TRABALHO.md` para o fluxo obrigatório de inspeção, alteração, revisão, teste, publicação e recuperação. Consulte `PROGRESSO-DO-PROJETO.md` para o estado atual e o histórico de decisões.
