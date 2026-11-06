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
- O PR #35 permanece draft, aberto e não integrado. Não mesclar, publicar ou disparar deploy sem pedido explícito do proprietário.
- A branch congelada é preservada por procedimento, não por uma trava técnica confirmada. A integração atual não tem permissão para criar regras de proteção; não afirmar que a branch está bloqueada contra escrita.
- O snapshot do código não inclui dados que estejam somente no `localStorage` do navegador. Antes de limpar o navegador, trocar de dispositivo ou reinstalar o aplicativo, exportar e guardar o backup JSON.
- Ao iniciar cada nova conversa, ler este protocolo, `BASE-IMUTAVEL.md` e `PROGRESSO-DO-PROJETO.md`; conferir o SHA atual das branches e trabalhar somente na branch de trabalho.
