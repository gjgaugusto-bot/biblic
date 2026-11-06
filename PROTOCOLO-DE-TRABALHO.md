# Protocolo de trabalho, revisão e recuperação

## 1. Regra de segurança: nada direto e irreversível

- Nunca substituir arquivos sem buscar primeiro a versão atual e o SHA vigente.
- Nunca fazer duas gravações simultâneas no mesmo arquivo.
- Antes de mudanças estruturais, registrar o estado atual e garantir que exista commit recuperável.
- Trabalhar em branch separada para mudanças maiores; revisar o diff e só então integrar em `main`.
- Não apagar dados do usuário, localStorage, símbolos, textos ou histórico sem pedido explícito.
- Nunca afirmar que algo foi salvo, publicado, testado ou corrigido sem confirmação do serviço ou teste correspondente.

## 2. Fluxo obrigatório para cada alteração

1. **Inspecionar:** buscar os arquivos atuais e identificar dependências e dados relacionados.
2. **Definir escopo:** listar exatamente o que será alterado e o que não pode ser tocado.
3. **Preservar:** guardar referência ao commit anterior; não editar com base em cópia antiga.
4. **Alterar minimamente:** evitar reescrever arquivos inteiros quando uma mudança pequena resolver.
5. **Verificar sintaxe e estrutura:** executar os testes automáticos do repositório.
6. **Revisar conteúdo:** comparar com a fonte/base aprovada pelo usuário, sem preencher lacunas por suposição.
7. **Testar no site:** abrir páginas, capítulos, abas, formulários e fluxos afetados sempre que possível.
8. **Publicar com rastreabilidade:** registrar commit, arquivos e resultado.
9. **Atualizar o progresso:** atualizar `PROGRESSO-DO-PROJETO.md` no mesmo trabalho.
10. **Relatar honestamente:** separar o que foi verificado, o que foi apenas inspecionado e o que ainda depende de teste manual.

## 3. Revisão de conteúdo bíblico

Para cada capítulo, usar duas passagens de revisão:

### Revisão A — fidelidade
- Texto integral conforme fonte aprovada.
- Ordem dos versículos preservada.
- Sem paráfrases introduzidas como se fossem texto bíblico.
- Personagens, episódios e referências conferidos.
- Dúvidas marcadas como pendências.

### Revisão B — regras do usuário
- Nenhuma interpretação acrescentada pelo assistente.
- Simbologias somente da base do usuário.
- Nenhum símbolo ou significado removido/modificado sem autorização.
- Se não houver item correspondente na base, não criar um.
- Nenhuma informação incerta apresentada como fato.

A revisão deve deixar um registro claro do que foi conferido e do que não foi possível confirmar.

## 4. Revisão técnica

- `node --check app.js` e `node --check study-data.js`.
- Verificar arquivos essenciais e carregamento correto dos scripts.
- Validar 66 livros e contagem estrutural de capítulos configurada.
- Verificar IDs HTML duplicados.
- Executar a suíte Playwright em Chromium: busca, abertura de livros e capítulos, abas, gravação e persistência, simbologias, personagens, guias, exportação, importação, limpeza e viewport móvel.
- Executar varreduras automatizadas de acessibilidade (axe-core) nas telas principais; corrigir violações WCAG detectáveis antes da integração.
- Inspecionar o site publicado após o deploy sempre que o ambiente permitir; teste local não comprova publicação.
- Se o teste falhar, não promover a alteração como concluída. Corrigir ou reverter usando o commit anterior.

## 5. Backups em camadas

1. **Git:** histórico de commits na branch principal.
2. **Espelho:** branch `backup-automatico`, atualizada após a validação do workflow.
3. **Snapshot manual:** branch `backup-site-2026-11-05` como marco inicial de segurança.
4. **Dados locais:** backup automático e histórico limitado mantidos no navegador.
5. **Exportação externa:** exportar o JSON regularmente e guardar em outro dispositivo ou serviço confiável.

Importante: os backups de código não incluem automaticamente o conteúdo local do navegador. O JSON exportado precisa ser guardado fora do navegador.

## 6. Política de publicação — fluxo obrigatório

- Branch de trabalho criada: `desenvolvimento`, derivada de `main`.
- A partir desta decisão, todas as alterações futuras devem ser feitas primeiro em `desenvolvimento` ou em branches derivadas dela; não editar `main` diretamente no fluxo normal.
- Ao concluir uma etapa, abrir Pull Request de `desenvolvimento` para `main`, revisar o diff, aguardar o workflow `Proteção do site` passar e só então integrar.
- Mudanças amplas devem usar uma branch própria derivada de `desenvolvimento` e retornar por Pull Request.
- O usuário confirmou que o ruleset “Proteção da main” está ativo, exigindo Pull Request, bloqueando exclusões e force push e exigindo resolução de conversas, com zero aprovações obrigatórias.
- O workflow `Proteção do site` valida sintaxe/estrutura e executa testes reais em Chromium e varreduras axe-core no Pull Request.
- A exigência de status check obrigatório no ruleset ainda não foi confirmada. Após a primeira execução bem-sucedida, configurar `validate` como check obrigatório no ruleset; a integração atual não tem permissão administrativa para alterar rulesets.
- Para não bloquear o proprietário que trabalha sozinho, começar exigindo PR e checks aprovados, com zero aprovações obrigatórias. A revisão humana continua obrigatória no protocolo. Se houver outro revisor de confiança, pode-se elevar a exigência para uma aprovação.
- Nunca declarar que a proteção está ativa antes de confirmar a regra na interface do GitHub.

## 7. Continuidade entre conversas

Antes de iniciar uma nova etapa:
- Ler este protocolo e `PROGRESSO-DO-PROJETO.md`.
- Conferir a branch `main` e os arquivos reais antes de editar.
- Criar snapshot de segurança antes de mudanças técnicas amplas.
- Nunca remover estilos duplicados ou regras CSS sem confirmar que não sustentam o visual aprovado.
- Tratar as regras editoriais deste protocolo como restrições fixas.
- Em caso de conflito entre lembrança de conversa e repositório, conferir o histórico e pedir esclarecimento se o conteúdo do usuário estiver em dúvida.

Ao encerrar cada etapa, atualizar o registro de progresso. Não depender apenas da memória do chat.


## 8. Base congelada e continuidade a partir de 2026-11-06

- A branch `base-imutavel-2026-11-06` é a referência congelada após a auditoria técnica. Não fazer commits, atualizações de arquivo ou force push nela.
- A branch `trabalho-base-2026-11-06` nasce do mesmo commit e é o ponto de partida das próximas tarefas. Para mudanças grandes, criar branches de recurso derivadas dela e retornar por Pull Request.
- A branch `arquivo-pre-auditoria-2026-11-06` preserva o estado anterior às correções desta auditoria.
- A branch `main` representa a publicação e não deve ser alterada nesta fase.
- O PR #35 foi fechado e integrado à branch `base-imutavel-2026-11-06` pelo merge commit `0d879f02df46fb1b4a5a2d87fe1c21bfba06187b`; não foi integrado em `main`. Não mesclar, publicar ou disparar deploy sem pedido explícito do proprietário.
- A branch congelada é preservada por procedimento, não por uma trava técnica confirmada. A integração atual não tem permissão para criar regras de proteção; não afirmar que a branch está bloqueada contra escrita.
- O snapshot do código não inclui dados que estejam somente no `localStorage` do navegador. Antes de limpar o navegador, trocar de dispositivo ou reinstalar o aplicativo, exportar e guardar o backup JSON.
- Ao iniciar cada nova conversa, ler este protocolo, `BASE-IMUTAVEL.md` e `PROGRESSO-DO-PROJETO.md`; conferir o SHA atual das branches e trabalhar somente na branch de trabalho.


## 9. Atualização de continuidade — 2026-11-06

- Antes de criar a branch do controle editorial, foi comparada a base `trabalho-base-2026-11-06` com `main`. A base de trabalho estava 148 commits atrás e não continha a integração atual de Êxodo.
- Para não perder o conteúdo mais recente, a branch `feat/controle-editorial-versiculos-2026-11-06` foi criada a partir do HEAD atual de `main`, sem escrever em `main` nem na branch congelada.
- Enquanto `trabalho-base-2026-11-06` permanecer atrás, novas branches de recurso devem partir do HEAD mais recente aprovado de `main` ou de uma branch de trabalho atualizada por PR. Nunca usar uma base antiga que omita conteúdo já integrado.
- O PR #36 contém a implementação do controle editorial e permanece em draft até a validação automática e revisão do diff. Não integrar nem publicar sem autorização explícita.


## 10. Estado oficial, retomada e proibição de retrabalho — 2026-11-06

- Antes de qualquer atividade em nova conversa, ler obrigatoriamente `ESTADO-OFICIAL-DO-PROJETO.md`, além deste protocolo, `PROGRESSO-DO-PROJETO.md` e `REGISTRO-EDITORIAL.md`. Esse documento é a fonte de retomada; a ausência de memória do chat nunca autoriza recomeçar uma revisão.
- Não repetir revisão de livro ou capítulo já concluído e documentado. Não rebaixar estado Revisado por troca de conversa, sessão, ferramenta ou modelo.
- Gênesis já passou por várias revisões segundo o proprietário. Fazer somente a conferência final da abertura já combinada; não reiniciar os 50 capítulos. Depois de concluída e registrada, marcar o livro como fechado definitivamente. Reabrir apenas diante de evidência objetiva de erro relevante ou fonte nova que comprove problema real, com justificativa e escopo exato registrados.
- Êxodo 1–40 já está integrado; continuar a revisão acadêmica verso a verso a partir dos registros existentes, sem reconstruir ou refazer a integração.
- Ao concluir cada etapa, registrar o próximo ponto genuinamente pendente no estado oficial. A fila deve avançar em ordem até Apocalipse.
- Não integrar PR nem publicar no site sem autorização explícita do proprietário.
