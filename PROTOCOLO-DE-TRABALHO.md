# Protocolo de trabalho, revisão e recuperação

## 1. Regra de segurança: nada direto e irreversível

- Nunca substituir arquivos sem buscar primeiro a versão atual e o SHA vigente.
- Nunca fazer duas gravações simultâneas no mesmo arquivo.
- Antes de mudanças estruturais, registrar o estado atual e garantir que exista commit recuperável.
- Trabalhar em branch separada; revisar o diff e só então integrar em `main`.
- Não apagar dados do usuário, localStorage, símbolos, textos ou histórico sem pedido explícito.
- Nunca afirmar que algo foi salvo, publicado, testado ou corrigido sem confirmação do serviço ou teste correspondente.

## 2. Fluxo obrigatório para cada alteração

1. **Inspecionar:** buscar os arquivos atuais e identificar dependências e dados relacionados.
2. **Definir escopo:** listar exatamente o que será alterado e o que não pode ser tocado.
3. **Preservar:** criar ou confirmar snapshot recuperável; nunca editar com base em cópia antiga.
4. **Alterar minimamente:** evitar reescrever arquivos inteiros quando uma mudança pequena resolver.
5. **Verificar sintaxe e estrutura:** executar os testes automáticos do repositório.
6. **Revisar conteúdo:** comparar com a fonte/base aprovada pelo usuário, sem preencher lacunas por suposição.
7. **Testar no site:** abrir páginas, capítulos, abas, formulários e fluxos afetados sempre que houver navegador disponível.
8. **Publicar com rastreabilidade:** integrar por PR somente depois da validação; registrar commit, arquivos e resultado.
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

O workflow `Proteção do site` executa:
- `node --check` nos arquivos JavaScript e no validador.
- Verificação dos arquivos essenciais, ordem dos scripts, 66 livros e Gênesis com 50 capítulos.
- Detecção de IDs HTML duplicados e referências a IDs ausentes.
- Testes da biblioteca compactada, dos 66 SVGs e do vínculo de simbologias.
- Testes de validação profunda de backup, rollback de salvamento e preservação de listas locais.
- Verificações básicas de CSS, rótulos acessíveis, regiões de status, movimento reduzido e alto contraste.

Regras para promover mudanças:
- Não integrar se o workflow falhar ou estiver em execução.
- Se o teste falhar, corrigir ou reverter usando o commit anterior.
- Um teste estrutural não equivale a teste de navegador real.
- Se o navegador real não estiver disponível, registrar explicitamente essa limitação; não afirmar que o site publicado foi visualmente conferido.

## 5. Backups em camadas

1. **Git:** histórico de commits na branch principal.
2. **Espelho:** branch `backup-automatico`, atualizada após a validação do workflow.
3. **Snapshot manual:** branch `backup-site-2026-11-05` e snapshot `backup-antes-estabilizacao-2026-11-05`.
4. **Dados locais:** backup automático e histórico limitado mantidos no navegador.
5. **Exportação externa:** exportar o JSON regularmente e guardar em outro dispositivo ou serviço confiável.

Importante: os backups de código não incluem automaticamente o conteúdo local do navegador. O JSON exportado precisa ser guardado fora do navegador.

## 6. Política de publicação — fluxo obrigatório

- O ruleset **Proteção da main** está ativo e direcionado à branch padrão, conforme leitura da API do GitHub em 2026-11-05.
- O ruleset exige Pull Request, impede exclusão e force push e exige resolução das conversas; aprovações obrigatórias estão em zero para permitir manutenção individual.
- Todas as alterações devem ser feitas em branches de trabalho e integradas por Pull Request; não editar `main` diretamente.
- Aguardar o workflow `Proteção do site` terminar com sucesso antes de integrar.
- O ruleset ainda não tem um status check obrigatório configurado. Até isso ser configurado, o protocolo exige a aprovação do workflow antes do merge, mesmo que o GitHub não bloqueie tecnicamente um merge com check pendente.
- A ausência de aprovações obrigatórias não elimina a revisão técnica: diff, validações e testes continuam obrigatórios.

## 7. Continuidade entre conversas

Antes de iniciar uma nova etapa:
- Ler este protocolo e `PROGRESSO-DO-PROJETO.md`.
- Conferir a branch `main` e os arquivos reais antes de editar.
- Tratar as regras editoriais deste protocolo como restrições fixas.
- Em caso de conflito entre lembrança de conversa e repositório, conferir o histórico e pedir esclarecimento se o conteúdo do usuário estiver em dúvida.

Ao encerrar cada etapa, atualizar o registro de progresso. Não depender apenas da memória do chat.
