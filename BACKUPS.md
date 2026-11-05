# Proteção e backups

## Backup automático do código
A branch `backup-automatico` recebe um espelho do código de `main` sempre que há um push na branch principal. O histórico de commits do GitHub também permanece disponível para recuperar versões anteriores.

## Verificações automáticas
O workflow **Proteção do site** verifica a sintaxe de `app.js` e `study-data.js` e confirma a presença dos arquivos essenciais. Em pull requests, executa as verificações sem alterar o site publicado.

## Backup dos estudos no navegador
O aplicativo mantém uma cópia local e um histórico limitado das últimas oito cópias dos dados de estudo. Esse mecanismo depende do armazenamento do navegador e não substitui exportar o arquivo de backup para outro local.

## Limites importantes
- O espelho de código é executado pelo GitHub Actions depois de um push; ele não impede que uma alteração com erro chegue ao Pages antes da verificação.
- A verificação detecta erros de sintaxe e ausência de arquivos, mas não substitui testes visuais e funcionais completos.
- Erros JavaScript capturados no navegador são registrados localmente no dispositivo; não são enviados automaticamente ao GitHub.
- Para proteção contra perda do aparelho ou limpeza do navegador, exporte o backup e guarde-o fora do dispositivo.
