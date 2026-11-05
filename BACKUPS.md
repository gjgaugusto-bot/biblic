# Proteção e backups

## Código e histórico
- A branch principal é `main`; mudanças técnicas devem entrar por Pull Request, nunca por edição direta de `main`.
- O ruleset **Proteção da main** foi consultado na API do GitHub em 2026-11-05 e está ativo, direcionado à branch padrão.
- O ruleset impede exclusão e force push, exige Pull Request e resolução das conversas; aprovações obrigatórias estão em zero para permitir manutenção individual.
- O workflow **Proteção do site** executa verificações em Pull Requests, em pushes para `main` e manualmente.
- O ruleset ainda não exige formalmente o status check como condição de merge. Por procedimento, não integrar PR antes de o workflow terminar com sucesso.
- A branch `backup-automatico` recebe o espelho de `main` após o job de validação passar.
- Snapshot anterior à estabilização técnica: `backup-antes-estabilizacao-2026-11-05`.
- Outros snapshots manuais de referência: `backup-site-2026-11-05`, `backup-visual-2026-11-05`, `backup-visual-monocromatico-2026-11-05` e `backup-antes-revisao-gravuras-2026-11-05`.

## Verificações automáticas
O workflow **Proteção do site** verifica a sintaxe dos arquivos JavaScript, estrutura dos 66 livros, IDs HTML, referências de elementos usados pelo aplicativo, integridade da biblioteca compactada, renderização SVG das 66 gravuras, validação profunda de backups, rollback de salvamento e preservação de registros locais. Também verifica requisitos básicos de acessibilidade e integridade do CSS.

Essas verificações reduzem regressões, mas não substituem inspeção visual em navegador real, teste em diferentes dispositivos ou revisão editorial.

## Dados de estudo no navegador
- As edições, guias, símbolos e personagens ficam no armazenamento local do navegador.
- O aplicativo mantém snapshots automáticos locais e um histórico limitado às últimas oito cópias.
- O log local conserva até vinte erros recentes.
- A recuperação automática restaura chaves ausentes; não substitui exportação externa nem sincroniza aparelhos.
- Registros incompletos podem ser ocultados da interface para evitar falhas, mas não são removidos do armazenamento ao serem exibidos ou exportados.
- Operações de inclusão são bloqueadas se a lista existente não puder ser validada, evitando sobrescrever dados que possam ser recuperáveis.

## Limites importantes
- O armazenamento do navegador é de melhor esforço: limpeza de dados, perda do dispositivo, modo privado ou restrições do navegador podem remover ou impedir gravações.
- O espelho automático protege o código versionado, não os dados locais do navegador.
- Erros capturados no navegador ficam no dispositivo; não são enviados automaticamente ao GitHub.
- A integração pública do GitHub Pages não pôde ser aberta pela ferramenta de navegação durante esta auditoria; a publicação visual precisa ser conferida em navegador real.
- Para proteger dados contra perda do aparelho ou limpeza do navegador, exporte o backup JSON regularmente e guarde cópias externas.

## Procedimento
Consulte `PROTOCOLO-DE-TRABALHO.md` para o fluxo obrigatório de inspeção, alteração, revisão, teste, publicação e recuperação. Consulte `PROGRESSO-DO-PROJETO.md` para o estado atual e o histórico de decisões.
