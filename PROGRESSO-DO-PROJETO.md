# Controle de progresso — Enciclopédia Bíblica

Última atualização: 2026-11-06

## Estado atual confirmado

- Repositório oficial: https://github.com/gjgaugusto-bot/biblic
- Branch de publicação: `main`
- Site: https://gjgaugusto-bot.github.io/biblic/
- Branch de trabalho: `desenvolvimento` (novas alterações devem passar por Pull Request)
- Espelho automático de código: `backup-automatico`
- Snapshot inicial de segurança: `backup-site-2026-11-05`
- Estrutura do projeto: site estático em HTML, CSS e JavaScript.
- O usuário confirmou que a correção de abertura dos capítulos funcionou.
- A correção mais recente de abertura usa botões com chamada direta a `openChapterFromButton`; os arquivos foram atualizados e publicados na branch principal.

## Próxima etapa de conteúdo

- Retomar o estudo em Gênesis 5, respeitando integralmente as regras editoriais abaixo.
- Não marcar capítulo como concluído até passar pela revisão textual, conferência das referências/dados e confirmação do usuário quando aplicável.

## Regras editoriais obrigatórias

1. Não interferir na interpretação do texto nem acrescentar conclusões teológicas não solicitadas.
2. Quando o usuário fornecer o texto bíblico, preservá-lo integralmente, sem resumir, reescrever ou omitir partes.
3. Não inventar personagens, símbolos, significados, episódios ou referências.
4. Na seção de simbologias dos capítulos, incluir exclusivamente itens que existam na base de dados fornecida pelo usuário e que estejam associados ao capítulo.
5. Não apagar, alterar ou reinterpretar símbolos fornecidos pelo usuário sem autorização explícita.
6. Se não houver símbolo da base do usuário associado ao capítulo, deixar a seção vazia ou informar que não há itens vinculados à base fornecida.
7. Distinguir claramente texto bíblico, dados fornecidos pelo usuário, conteúdo editorial e informação ainda não verificada.
8. A tradução de trabalho de Gênesis no site é material próprio de estudo; não apresentá-la como tradução bíblica publicada ou versão oficial.
9. Se for necessária uma tradução portuguesa protegida por direitos autorais, pedir ao usuário que forneça o texto ou trabalhar com referência/resumo permitido.

## Protocolo de conclusão por capítulo

Um capítulo só pode receber status **REVISADO** quando:
- [ ] O texto foi conferido linha por linha com a fonte fornecida/definida.
- [ ] Nenhum trecho foi resumido, omitido ou alterado sem autorização.
- [ ] Personagens e episódios correspondem ao texto e aos dados aprovados.
- [ ] Simbologias foram comparadas com a base do usuário; nenhum item foi inventado.
- [ ] Referências foram conferidas e não foram fabricadas.
- [ ] Campos vazios ou pendências estão identificados, sem preenchimento especulativo.
- [ ] A página abre e as abas/controles relevantes funcionam.
- [ ] A alteração passou pelas verificações automáticas.
- [ ] O resultado foi registrado neste arquivo com data, arquivos/commit e estado.

Status permitidos: **RASCUNHO**, **EM REVISÃO**, **REVISADO**, **PUBLICADO**. Publicado não significa automaticamente revisado: os dois estados devem ser registrados separadamente.

## Registro de alterações e decisões

| Data | Área | Alteração/decisão | Verificação | Estado |
|---|---|---|---|---|
| 2026-11-05 | Site | Corrigida a abertura dos capítulos por chamada direta nos botões e atualização dos scripts publicados | Usuário confirmou que funcionou | PUBLICADO |
| 2026-11-05 | Proteção | Adicionados protocolo, diário, checklist de PR, validador estrutural e workflow que só espelha após validação | Conferência dos arquivos confirmou 66 livros, Gênesis com 50 capítulos, ordem correta dos scripts e nenhum ID duplicado; execução do GitHub Actions ainda precisa ser confirmada | IMPLEMENTADO; EXECUÇÃO PENDENTE |
| 2026-11-05 | Conteúdo | Definida a regra de usar somente simbologias presentes na base do usuário | Regra editorial obrigatória | ATIVO |

## Pendências conhecidas e limites

- O backup do GitHub protege o código versionado, não os dados guardados apenas no navegador.
- O backup local depende do armazenamento do navegador e pode ser perdido se os dados do navegador forem apagados ou o dispositivo for perdido.
- Exportar o JSON e guardar cópias externas continua obrigatório para proteger edições locais.
- A validação automática verifica estrutura/sintaxe e consistência básica; não substitui a revisão bíblica, a inspeção visual e os testes reais no navegador.
- A integração disponível não permitiu consultar as regras de proteção da branch `main` (resposta 403). Portanto, não afirmar que a branch está bloqueada contra push direto.
- Não existe, neste momento, evidência registrada de teste automatizado completo em navegador real.

## Regra de atualização deste documento

Toda sessão que alterar conteúdo, código ou estrutura deve atualizar este arquivo no mesmo conjunto de trabalho, registrando:
1. o que mudou;
2. por que mudou;
3. arquivos e commit;
4. verificações executadas e seus resultados;
5. pendências e próximo passo;
6. status correto, sem declarar sucesso não verificado.

Se houver divergência entre este registro e o estado real do repositório, prevalece o estado real após inspeção; corrigir este documento antes de continuar o trabalho.


## Registro técnico — reforço de proteção (2026-11-05)

Arquivos criados/atualizados:
- `PROGRESSO-DO-PROJETO.md` — commit `da3079174da896ee5645303c0ee372295e96a4b8` (registro inicial).
- `PROTOCOLO-DE-TRABALHO.md` — commit `ebaf2b2f5d6aeb6501e6567522c20fd69b74a5c6`.
- `.github/PULL_REQUEST_TEMPLATE.md` — commit `02adf60c07ab5c3758274c009d582b82b6a00138`.
- `scripts/validate-site.mjs` — commit `29c3c32f45eb4ee56608848e36b9bf8bbe62b0e9`.
- `.github/workflows/site-safety.yml` — commit `027145632eb3f7a53694790431c427ad4c55ad11`.
- `BACKUPS.md` — commit `156e38c71536af906b49c1a00c9de77516b89856`.

Verificação estática independente após as gravações: arquivos presentes; scripts em ordem; 66 livros; Gênesis com 50 capítulos; registros de livros válidos; nenhum ID HTML duplicado. Isso não equivale à execução confirmada do workflow nem a teste funcional em navegador.


## Reforço do fluxo de publicação — 2026-11-05

- Criada a branch `desenvolvimento` a partir de `main` para receber as próximas alterações antes da publicação.
- Regra operacional definida: não editar `main` diretamente; usar branch de trabalho, Pull Request, revisão do diff e workflow aprovado.
- A exigência técnica de proteção da branch ainda não foi ativada: a integração não possui permissão para gravar regras de branch/rulesets. O proprietário precisa ativar a regra pela interface do GitHub.
- Configuração recomendada para não bloquear o mantenedor solo: exigir Pull Request e o check `validate`, exigir resolução de conversas, permitir zero aprovações obrigatórias enquanto não houver segundo revisor. Se houver segundo revisor de confiança, exigir uma aprovação.
- Não afirmar que a branch está protegida até verificar a regra ativa no GitHub.


## Verificação do reforço de segurança — 2026-11-05

- Branch `desenvolvimento` criada a partir da versão atual de `main`; cabeça confirmada em `63002d2adde12c8fd60c1e169a501fff2828f1fd`.
- Workflow `Proteção do site` executado no commit `63002d2adde12c8fd60c1e169a501fff2828f1fd`: job `validate` concluído com sucesso e job `mirror` concluído com sucesso.
- Espelho de segurança atualizado depois da validação.
- A proteção nativa da branch ainda não foi ativada, pois a integração não tem permissão para alterar rulesets/branch protection. Configuração manual pendente no GitHub.


## 2026-11-05 — Identidade visual ilustrada clássica (em revisão)
- Definido com o usuário o estilo ilustrado clássico para a enciclopédia: pergaminho, molduras ornamentais, detalhes dourados e ilustrações vetoriais relacionadas ao conteúdo dos 66 livros.
- Implementação inicial em branch `design-ilustrado-classico`, sem alterar a `main` nem publicar no site ao vivo.
- As ilustrações são decorativas e descritivas; não acrescentam interpretações nem simbologias ao banco do usuário.
- Alterações previstas: cartões ilustrados dos 66 livros, paleta visual clássica e revisão responsiva.
- Status: implementação inicial; validar sintaxe, estrutura, aparência em navegador e diff antes de abrir PR.


## 2026-11-05 — Revisão visual monocromática (em validação)

- Pedido do usuário: substituir as ilustrações simples/genéricas e ampliar os ornamentos no site inteiro, usando preto e branco.
- Atualizado `style.css`: paleta monocromática, fundos claros, cabeçalho preto, molduras duplas, detalhes ornamentais, cartões com bordas de gravura, painéis e leitor com molduras, botões e navegação coerentes; ajustes responsivos preservados.
- Atualizado `book-art.js`: 66 gravuras vetoriais com cenas/objetos relacionados a cada livro; substituídos rótulos genéricos por descrições específicas. As imagens são decorativas e não criam significados simbólicos para a base de estudos.
- Atualizado `index.html`: versões de cache dos estilos e ilustrações.
- Branch de trabalho: `refino-visual-preto-branco`.
- Verificação inicial: 66 entradas de ilustração encontradas; foi detectada e corrigida uma definição ausente para a cena da torre de vigia. A validação final de sintaxe/estrutura e a execução visual em navegador ainda dependem do workflow e da inspeção publicada.
- Estado: IMPLEMENTADO EM BRANCH; AGUARDANDO CI/REVISÃO.


### Resultado da verificação visual monocromática — 2026-11-05

- `new Function` (análise de sintaxe sem executar o código) aprovado para `book-art.js`, `app.js` e `study-data.js`.
- Conferência estrutural: 66 livros na configuração; Gênesis com 50 capítulos; nenhum ID HTML duplicado; 66 entradas de gravura; nenhuma referência a cena sem desenho correspondente.
- `index.html` carrega os arquivos visuais com versão de cache atualizada.
- O validador oficial do repositório e o workflow GitHub não retornaram execução/check associado ao commit durante esta revisão; por isso não registrar CI como aprovado.
- Não foi possível executar teste visual em navegador nesta etapa. A aparência em dispositivos reais permanece pendente de conferência após publicação.
- Estado: SINTAXE E CONFERÊNCIA ESTRUTURAL MANUAIS APROVADAS; CI E TESTE VISUAL PENDENTES.


### Publicação do refinamento monocromático — 2026-11-05

- Pull Request #3 integrado à `main`: https://github.com/gjgaugusto-bot/biblic/pull/3
- Commit de integração: `f8b7466af8a1ffeb507f9369ab76decbfb02838f`.
- Snapshot de segurança criado: branch `backup-visual-2026-11-05`, apontando para o commit integrado.
- O espelho `backup-automatico` ainda não refletia este commit na última conferência; o snapshot dedicado preserva esta versão.
- Código visual e 66 gravuras confirmados na `main`.
- Acesso público ao GitHub Pages não pôde ser confirmado nesta verificação; não declarar atualização visual do navegador como testada.
- Estado do código: INTEGRADO À MAIN. Estado da publicação visual no navegador: NÃO VERIFICADO.


### 2026-11-05 — Aprofundamento das gravuras e acabamento geral (em revisão)

- Nova etapa iniciada na branch `redesign-preto-branco`, preservando a `main` até a revisão.
- Refinado o renderizador das 66 ilustrações com moldura dupla, textura de gravura, hachuras, raios de fundo e detalhes ornamentais em preto e branco; mantidas as cenas descritivas já associadas aos livros.
- Ampliado o acabamento ornamental global: espaçamento, divisórias, molduras internas, detalhes tipográficos, foco acessível e responsividade.
- Atualizados os identificadores de cache para evitar que o navegador continue exibindo CSS/gravuras antigos.
- Nenhum texto bíblico, anotação ou registro de simbologia foi alterado.
- Verificações nesta etapa: integridade do conteúdo original dos scripts e presença de 66 entradas serão conferidas antes do PR; execução visual em navegador permanece uma etapa separada.
- Estado: ALTERAÇÕES EM BRANCH; AGUARDANDO VALIDAÇÃO ESTÁTICA E CI.


### Publicação do refinamento visual — 2026-11-05

- Pull Request #5 integrado à `main` por squash: https://github.com/gjgaugusto-bot/biblic/pull/5
- Commit integrado: `f020937094a382f3d4064b0a5a55f70e5c65b6bd`.
- Snapshot de segurança anterior à integração: branch `backup-visual-monocromatico-2026-11-05`, apontando para o commit da proposta `fd98e0bbd8da5dbe94440eba99a78a636e145b61`.
- Conferência posterior confirmou os novos recursos de gravura em `book-art.js`, os ornamentos em `style.css` e a atualização dos identificadores de cache em `index.html`.
- Os arquivos `app.js` e `study-data.js` foram preservados nesta alteração.
- A consulta de execução do GitHub Actions não retornou workflow associado ao commit e o status combinado não apresentou checks. Portanto, CI não foi declarado aprovado.
- A abertura pública do GitHub Pages não pôde ser confirmada nesta verificação. A integração na `main` está confirmada; a atualização visual no navegador ainda precisa de verificação externa.
- Estado: INTEGRADO À MAIN; PUBLICAÇÃO VISUAL EXTERNA NÃO VERIFICADA.


### Revisão de correspondência das 66 gravuras — 2026-11-05

- Criado snapshot anterior à revisão: `backup-antes-revisao-gravuras-2026-11-05`.
- Ajustadas cenas específicas para corresponder melhor aos títulos/temas descritivos já cadastrados:
  - 1 Samuel: funda de Davi.
  - 2 Samuel: coroa e harpa.
  - 2 Reis: carro de fogo de Elias.
  - Oseias: família.
  - Lucas: rolo e instrumento de escrita.
  - 1 Tessalonicenses: carta à comunidade.
  - Filemom: correntes abertas.
  - Zacarias: cavaleiro montado.
  - Apocalipse: sete lâmpadas junto ao trono.
- Removida uma definição duplicada de desenho de barco no catálogo de formas.
- Conferência automatizada em memória: 66 livros, 66 entradas, 45 formas vetoriais, nenhuma cena sem forma correspondente; as 66 chamadas de renderização produziram SVG com rótulo acessível.
- Sintaxe de `book-art.js`, `app.js` e `study-data.js` aprovada por análise sintática; ordem de carregamento no HTML confirmada.
- Nenhum texto bíblico, interpretação, personagem cadastrado ou simbologia foi alterado.
- Pull Request #8 integrado à `main`: https://github.com/gjgaugusto-bot/biblic/pull/8.
- Commit de integração: `6c75d822c8c29dd53b3c3945ef8dbac04020b92e`.
- Workflow `Proteção do site` (execução 42118561618) concluído com sucesso; etapa `validate` aprovada. A etapa `mirror` foi ignorada por se tratar de evento de PR.
- A inspeção visual em navegador e a confirmação de atualização do GitHub Pages continuam pendentes; não declarar a renderização publicada como conferida.
- Estado: ALTERAÇÕES INTEGRADAS À MAIN; VALIDAÇÃO AUTOMÁTICA APROVADA; INSPEÇÃO VISUAL PUBLICADA PENDENTE.


## Ficha “Sobre o livro” — Gênesis

- Criada a primeira ficha bibliográfica exibida abaixo da lista de capítulos ao abrir Gênesis.
- Campos: nome hebraico, origem do nome Gênesis, posição no cânon, capítulos, idioma, autoria tradicional e discussão acadêmica, datação da composição, período dos acontecimentos narrados, contexto geográfico-cultural, estrutura, formas literárias e relação com o Pentateuco.
- Autoria e datação foram redigidas com ressalvas explícitas; a ficha diferencia tradição religiosa de hipóteses acadêmicas e não apresenta datas controversas como fatos estabelecidos.
- A ficha é exibida somente para Gênesis nesta primeira etapa; os outros livros permanecem sem alterações e poderão receber fichas próprias depois.
- Nenhum texto bíblico, resumo de capítulo, personagem, símbolo ou dado localStorage foi alterado.
- Estado inicial: implementado em branch própria, aguardando validação automatizada pelo workflow do PR.


### Integração da ficha de Gênesis

- Pull Request #10: https://github.com/gjgaugusto-bot/biblic/pull/10 — integrado à `main`.
- Commit de integração: `12bf5a8b5648183021b6efe8a640aa50e59e11fd`.
- Workflow `Proteção do site`, execução 42119572250 (run 41): sucesso; job `validate` aprovado; job `mirror` ignorado por ser evento de PR.
- A ficha aparece abaixo dos capítulos somente em Gênesis nesta primeira etapa. Cache-bust dos arquivos CSS e JavaScript atualizado para evitar uso de versões antigas pelo navegador.
- A inspeção visual no GitHub Pages ainda depende de abertura no navegador; a integração e validação automatizada estão confirmadas.
- Estado: INTEGRADO; VALIDAÇÃO AUTOMÁTICA APROVADA; INSPEÇÃO VISUAL PUBLICADA PENDENTE.


### Ajuste de posição da ficha — Gênesis

- Após retorno do usuário, identificada uma questão de visibilidade: a ficha estava sendo renderizada depois dos 50 botões de capítulos.
- Reposicionada imediatamente após o título e a apresentação do livro, antes da lista de capítulos.
- A ficha continua restrita a Gênesis; demais livros, conteúdo bíblico, personagens e simbologias não foram alterados.
- Backup de `main` criado antes do ajuste. Sintaxe de `app.js` validada localmente antes do PR.
- Estado: aguardando workflow automatizado.


- PR #12 integrado à `main` (commit `686fb79871b7fdbbff9310f06ab993b8b6f1e37e`). Workflow `Proteção do site`, execução 42119944892 (run 45): job `validate` concluído com sucesso; `mirror` ignorado por evento de PR.
- Cache-bust do JavaScript atualizado novamente para `20261105-sobre-livro2`, garantindo URL nova após reposicionamento da ficha.


## Auditoria técnica inicial — 2026-11-05

- Criado snapshot pré-auditoria: `backup-auditoria-tecnica-2026-11-05`.
- Criada branch de trabalho: `auditoria-tecnica-2026-11-05`.
- Achado crítico: a ação "Apagar edições locais" removia os dados atuais e o backup mais recente, mas deixava o histórico automático. Na próxima inicialização, o mecanismo de recuperação podia restaurar os dados que o usuário acabara de apagar.
- Achado de integridade: a importação aceitava estruturas sem validação de tipo e substituía campos ausentes por listas/objetos vazios, podendo apagar dados locais válidos ao importar um backup parcial.
- Achado de cobertura: o workflow não verificava a sintaxe de `book-art.js); o validador também não exigia esse arquivo nem conferia a ordem completa dos três scripts.
- Correções nesta branch: limpar também o histórico ao apagar dados; validar o formato do backup antes de gravar; preservar campos ausentes em backups parciais; reverter os dados locais anteriores se a gravação da importação falhar; reforçar o validador estrutural e a checagem de sintaxe.
- Preservado: conteúdo bíblico, fichas editoriais, base de simbologias, personagens, ilustrações e identidade visual.
- Limite: não há teste de navegador real disponível nesta etapa; a validação automatizada continua estática/estrutural.
- Estado: correções preparadas nesta branch, aguardando execução das validações e revisão do diff; nada foi publicado ainda.


### Integração da primeira etapa da auditoria técnica

- PR #14 integrado à `main`: https://github.com/gjgaugusto-bot/biblic/pull/14.
- Commit de integração: `dbbf60bccd948c17d13262ae880ceefb8d2379ce`.
- Workflow `Proteção do site`, execução 42121194291 (run 49): sucesso; job `validate` aprovado; `mirror` ignorado por evento de PR.
- Corrigida a ação de apagar dados locais: agora remove também o histórico de backups automáticos, impedindo que a rotina de restauração recupere os dados apagados.
- Importação de backups agora valida tipos e estrutura antes de gravar; arquivos parciais preservam os campos locais que não trouxerem; se uma gravação falhar, os dados anteriores são restaurados.
- Workflow passou a verificar a sintaxe de `book-art.js`; validador exige os três scripts e a ordem `study-data.js` → `book-art.js` → `app.js), além de conferir a presença da ficha "Sobre o livro".
- Testes isolados da validação de backup: 6/6 aprovados. Sintaxe dos três scripts: aprovada. HTML: 53 IDs, nenhum duplicado; ordem de scripts aprovada.
- Snapshot pré-auditoria preservado em `backup-auditoria-tecnica-2026-11-05`.
- Nenhum conteúdo bíblico, interpretação, simbologia, personagem, ilustração ou estilo visual foi alterado.
- Limite mantido: não houve inspeção em navegador real; a aprovação CI é estrutural e não prova todos os fluxos de interface.
- Estado: PRIMEIRA ETAPA INTEGRADA; VALIDAÇÃO AUTOMÁTICA APROVADA; AUDITORIA FUNCIONAL AMPLA CONTINUA.


## Revisão adicional de segurança — 2026-11-05

- Identificado um ponto de injeção HTML: o título de capítulo editável/importável era inserido no leitor sem passar pela função de escape, ao contrário dos demais campos dinâmicos revisados.
- Corrigido em branch própria: o título agora passa por `esc()` antes de ser renderizado.
- O validador estrutural foi ampliado para impedir regressão dessa proteção.
- Nenhum conteúdo existente foi alterado; a correção afeta somente a forma segura de exibir títulos.
- Estado: correção preparada; aguardando validação automatizada e integração.


### Atualização da auditoria técnica

- A correção de renderização dos títulos dos capítulos foi integrada no PR #16.
- Commit: 009875b4bc45843ba3c1de03888a5b9a0c72ca39.
- Workflow 42121524042: sucesso; validação aprovada.
- Os títulos editáveis agora passam por escape de HTML antes da exibição.
- O validador verifica a proteção e o cache do app foi atualizado.
- Nenhum texto bíblico, símbolo, personagem ou ilustração foi modificado.
- A inspeção em navegador real continua pendente.


## Reforço de armazenamento local — 2026-11-05

- Padronizadas as leituras de listas e objetos do armazenamento local, com fallback seguro quando o JSON estiver corrompido ou tiver tipo incorreto.
- As gravações agora distinguem falha ao salvar do dado principal e falha ao atualizar o backup automático; as mensagens do painel não afirmam backup concluído quando ele falhou.
- A exportação usa os leitores protegidos e mantém o URL temporário ativo até o navegador iniciar o download.
- O validador agora exige os leitores protegidos de dados locais.
- Estado: implementação preparada para testes e integração; nenhum conteúdo editorial foi alterado.


### Integração do reforço de armazenamento local

- PR #18 integrado à main: https://github.com/gjgaugusto-bot/biblic/pull/18.
- Commit de integração: caa9e21f799dd72af6c04742f0ad676d46020d4e.
- Workflow Proteção do site, execução 42121866525 (run 58): sucesso; validação aprovada; mirror ignorado no evento de PR.
- Leituras de listas e objetos agora usam funções protegidas contra JSON corrompido e tipos inesperados.
- As mensagens do painel distinguem falha de gravação do dado principal e falha de backup automático.
- Exportação usa dados validados e revoga o URL temporário somente depois do início do download.
- Testes isolados de armazenamento: 8/8 aprovados.
- Nenhum texto bíblico, símbolo, personagem, gravura ou estilo foi alterado.
- Estado: INTEGRADO; VALIDAÇÃO AUTOMÁTICA APROVADA; inspeção em navegador real pendente.


## Correção do vínculo de simbologias por capítulo — 2026-11-05

- O campo de simbologias do painel administrativo salvava texto, mas o leitor ignorava esse valor e a edição era reaberta vazia.
- A edição agora preserva a lista de nomes informada pelo usuário e o leitor procura correspondências exatas na biblioteca de simbologias e nos itens personalizados do navegador.
- Somente registros encontrados na base são exibidos; nomes sem correspondência não recebem descrições inventadas.
- A biblioteca é carregada sob demanda quando necessário. O campo foi ajustado para pedir um nome por linha, conforme o cadastro existente.
- Estado: correção preparada; inclui testes funcionais no validador e aguarda a execução do workflow.


### Integração do vínculo de simbologias por capítulo

- PR #20 integrado à main: https://github.com/gjgaugusto-bot/biblic/pull/20.
- Commit de integração: 6c01304f271a91577a83c0ef8e3d06d6ec86abcc.
- Workflow Proteção do site, execução 42122398910 (run 66): sucesso; validação aprovada; mirror ignorado no evento de PR.
- O campo de simbologias preserva os nomes digitados e o leitor exibe somente correspondências encontradas na categoria Símbolos da biblioteca ou nos símbolos personalizados do usuário.
- Nomes desconhecidos não recebem significado; categorias diferentes não são aceitas como símbolos; a biblioteca pode ser carregada sob demanda.
- Validador agora executa testes funcionais de vínculo de símbolos e testes de importação de backup. Execução do validador em ambiente isolado: aprovada.
- Nenhum conteúdo bíblico, significado da biblioteca ou ilustração foi alterado.
- Estado: INTEGRADO; VALIDAÇÃO AUTOMÁTICA APROVADA; inspeção visual em navegador real pendente.


### Integração final do vínculo de simbologias

- PR #20 integrado à main e registrado no diário.
- PR #21 integrado à main: https://github.com/gjgaugusto-bot/biblic/pull/21.
- Commit de integração do registro: 241b1a85b098c29b1d4aca1caced3595e9f5c5c5.
- Workflow Proteção do site, execução 42122506913 (run 68): sucesso; validação aprovada; mirror ignorado no evento de PR.
- O validador agora executa testes funcionais para correspondência de símbolos e importação de backups, além das verificações estruturais.
- Inspeção pública do GitHub Pages não foi possível por indisponibilidade de acesso da ferramenta de navegação; não declarar visual publicado como conferido.
- Estado: CORREÇÕES TÉCNICAS INTEGRADAS; CI APROVADO; TESTE VISUAL EXTERNO PENDENTE.


## Auditoria operacional e testes de navegador — 2026-11-05

- Snapshot criado antes da etapa: `backup-antes-hardening-operacional-2026-11-05`.
- Branch de trabalho: `hardening-operacional-final-2026-11-05` (derivada da cópia de trabalho técnica).
- Adicionada suíte Playwright/Chromium com verificação de busca, 66 livros, ficha bibliográfica, abertura do capítulo 4, abas por mouse/teclado, persistência de edição, simbologias, personagens, guias, exportação, importação, limpeza e viewport móvel.
- Adicionadas varreduras axe-core nas telas inicial, ficha do livro, capítulo e painel administrativo.
- Workflow `Proteção do site` ampliado para instalar dependências fixadas e executar testes de navegador em cada PR.
- Reforçada tolerância a registros locais incompletos; importação agora valida campos textuais, limita arquivos a 15 MB e preserva rollback dos dados e dos dois níveis de backup.
- Exportação e limpeza passaram a tratar falhas de armazenamento sem afirmar sucesso indevido.
- Abas do capítulo receberam semântica ARIA e navegação por teclado.
- Campos de busca receberam nomes acessíveis.
- Estado: implementação preparada; resultados de Chromium/axe e revisão do diff pendentes.
- Nenhum conteúdo bíblico, interpretação, significado da biblioteca, personagem ou gravura foi intencionalmente alterado.


## Correção de contraste das abas do leitor — 2026-11-05

- O workflow do PR #30 identificou contraste insuficiente na aba selecionada “Personagens” durante o teste de teclado: texto branco sobre fundo cinza calculado em 4:1, abaixo do mínimo WCAG AA de 4,5:1.
- Preparada correção localizada em `style.css`: aba selecionada passa a usar texto escuro sobre fundo claro, com borda/sublinhado de seleção e foco visível reforçado.
- Nenhum texto bíblico, dado de estudo, simbologia ou conteúdo editorial foi alterado.
- Branch: `fix-contraste-abas-capitulo`. Validação automatizada pelo workflow do Pull Request ainda pendente; não declarar a correção aprovada até o resultado do CI.
- Próximo passo: executar o workflow, revisar qualquer falha residual e só então solicitar revisão humana.

## Ficha “Sobre o livro” — Êxodo (2026-11-05)

- Criada ficha bibliográfica para Êxodo, exibida ao abrir o livro no mesmo componente usado por Gênesis.
- Campos incluídos: nome hebraico e título grego, posição no cânon, capítulos, idioma, autoria tradicional e discussão acadêmica, datação, período narrativo, contexto geográfico, estrutura, formas literárias e lugar no Pentateuco.
- Autoria, datação da composição e historicidade dos eventos estão descritas com ressalvas, sem tratar questões debatidas como consenso. Conteúdo de referência conferido com a introdução acadêmica da Society for Old Testament Study e a apresentação de Princeton sobre Êxodo.
- Arquivos alterados: `app.js` e `index.html` (versão de cache do script atualizada).
- Base de trabalho: branch `biografia-exodo-main`, criada a partir de `origin/main`, pois `origin/desenvolvimento` não continha a ficha de Gênesis que serve de padrão.
- Nenhum texto bíblico, resumo de capítulo, personagem, simbologia ou dado local do navegador foi alterado.
- Verificações automatizadas e inspeção visual ainda pendentes; não declarar publicação.
- Estado: IMPLEMENTADO EM BRANCH; VALIDAÇÃO AUTOMÁTICA E INSPEÇÃO VISUAL PENDENTES.

Referências de consulta: Society for Old Testament Study, [Exodus](https://www.sots.ac.uk/wiki/exodus); Princeton University Press, [The Book of Exodus: A Biography](https://assets.press.princeton.edu/chapters/i13379.pdf).

## Auditoria integral de Gênesis — 2026-11-06

- A revisão está em andamento; nenhum capítulo foi certificado como tradução acadêmica revisada.
- Fonte de conferência definida: texto hebraico do Westminster Leningrad Codex (WLC), disponibilizado no projeto Open Scriptures Hebrew Bible (OSHB). O texto-base WLC é de domínio público; os dados de lemas/morfologia OSHB exigem atribuição CC BY 4.0.
- Auditoria estrutural inicial dos 50 capítulos: foram detectadas omissões em Gênesis 2:1 e Gênesis 8:20–22. As lacunas foram reinseridas no texto do site nesta etapa.
- Gênesis 41–50 foi substituído por novos rascunhos em português, elaborados com conferência dos capítulos hebraicos WLC correspondentes. A revisão especializada independente continua pendente.
- Gênesis 1–40 contém rascunhos de tradução próprios, mas ainda requer conferência semântica verso a verso com o WLC; contagem correta de versículos, isoladamente, não comprova fidelidade.
- Verificação de interface identificou contraste insuficiente na aba inativa “Simbologias” (3,41:1; mínimo WCAG AA 4,5:1). Foi aplicada regra de contraste mais forte às abas não selecionadas. O teste de navegador deverá ser executado novamente.
- Status editorial geral: EM REVISÃO. Não usar “tradução fiel certificada”, “revisado” ou “concluído” até validação por pessoa com competência em hebraico bíblico.


### Atualização da revisão de texto (2026-11-06)

- Substituídos os textos de Gênesis 41–50, que anteriormente eram de Almeida 1911 com ortografia antiga, por rascunhos novos em português conferidos com os capítulos hebraicos WLC.
- Capítulos trabalhados nesta etapa: 41–42 (fontes hebraicas WLC dos capítulos 41 e 42); 43–45 (WLC 43–45); 46–48 (WLC 46–48); 49–50 (WLC 49–50).
- Preservada em Gênesis 49:10 a forma “Siló”, sem resolver no corpo do texto a interpretação discutida do termo hebraico.
- O inventário estrutural inicial encontrou as seguintes contagens canônicas: 1–50 correspondem às contagens tradicionais de versículos após a inclusão de Gênesis 2:1 e 8:20–22.
- Próxima etapa obrigatória: conferência semântica verso a verso dos capítulos 1–40, incluindo revisão de termos ambíguos, nomes próprios, medidas, cronologia e expressões idiomáticas; depois, segunda leitura de 41–50.
- Status de todos os capítulos: RASCUNHO / EM REVISÃO, não REVISADO. Os rascunhos foram produzidos com auxílio de IA e ainda exigem validação por especialista em hebraico bíblico.


### Conferência pontual de Gênesis 2–3 (2026-11-06)

- Gênesis 2:22: ajustado “transformou a costela” para “formou uma mulher a partir da costela”, refletindo o verbo hebraico בנה (construir/formar).
- Gênesis 3:8: “ao sopro do dia” ajustado para “à brisa do dia”, para uma expressão mais inteligível do hebraico לרוח היום.
- Gênesis 3:15: ajustado o pronome “esta” para “ele”, acompanhando o pronome masculino הוא ligado a זרע (“descendência/semente”).
- Essas correções são decisões de tradução de trabalho, não uma edição crítica certificada; a passagem e as alternativas devem permanecer abertas a revisão especializada.


### Conferência pontual adicional (2026-11-06)

- Gênesis 4:1: retirada a palavra interpretativa “auxílio” da fala de Eva; a formulação agora preserva “Adquiri um homem com YHWH”, cuja construção hebraica é ambígua.
- Gênesis 45:8: “conselheiro do faraó” foi substituído por “pai para o faraó”, preservando a metáfora presente no hebraico.
- Acrescentada à validação estrutural uma checagem automática das contagens de versículos dos 50 capítulos de Gênesis, para detectar omissões futuras.
- A execução dessa nova checagem e da suíte de navegador depende da conclusão do workflow do Pull Request #35.


## Auditoria técnica integral e congelamento da base — 2026-11-06

- Preservado o estado anterior à auditoria na branch `arquivo-pre-auditoria-2026-11-06`.
- Corrigido o aviso da página inicial para não afirmar que todo o conteúdo do site é uma tradução literal. Agora informa que Gênesis contém rascunhos de tradução para estudo, ainda sujeitos a revisão especializada, e que os demais livros estão preparados para receber conteúdo.
- Corrigidos os rótulos dos textos de capítulo: Gênesis é identificado como rascunho de tradução; textos inseridos em outros livros pelo painel são identificados como conteúdo inserido pelo administrador, sem atribuir-lhes uma fonte hebraica que não foi informada.
- Atualizada a versão de cache dos estilos e do JavaScript após as alterações.
- Ampliada a validação estrutural para conferir a contagem canônica de capítulos de cada um dos 66 livros, unicidade de nomes e slugs e soma total de 1.189 capítulos.
- Ampliada a suíte de navegador para abrir os 66 livros e conferir suas listas de capítulos; testar salvamento, persistência, exportação e importação das categorias personalizadas; e verificar telas de 320 px, 390 px e preferência por movimento reduzido.
- Adicionada regra CSS para respeitar `prefers-reduced-motion`.
- Resultado do workflow `42157420986`: sintaxe, estrutura, navegação, persistência, backups, Chromium e axe-core aprovados.
- Mantida a verificação de contagem dos versículos dos 50 capítulos de Gênesis. Essa verificação confirma estrutura, não fidelidade semântica.
- Escopo não certificado: a revisão semântica verso a verso de Gênesis ainda depende de leitura especializada em hebraico bíblico; a biblioteca de estudos também não foi validada como fonte acadêmica.
- Os dados salvos apenas no navegador (`localStorage`) não são incluídos no snapshot GitHub. É necessário exportar o backup JSON separadamente.
- Nenhuma alteração foi integrada em `main`; o PR #35 continua draft; o site não foi publicado.
- Base congelada: `base-imutavel-2026-11-06`. Continuidade: `trabalho-base-2026-11-06`.


## Controle editorial por versículo — implementação em andamento (2026-11-06)

- Criada a branch de trabalho `feat/controle-editorial-versiculos-2026-11-06`, derivada do estado atual de `main` após confirmar que a branch `trabalho-base-2026-11-06` estava 148 commits atrás e não continha a integração atual de Êxodo. A base congelada não foi alterada.
- Adicionado `editorial-review.js` com os quatro estados oficiais, transições controladas, fonte/observação para aprovação, motivo e fonte obrigatórios para reabertura e histórico por versículo.
- O estado-base migra Gênesis como Revisado, conforme a declaração anterior do proprietário, e Êxodo como Em revisão, conforme `REVISAO-EXODO.md`. A migração não executa uma nova revisão acadêmica.
- Os demais livros permanecem Pendente até a análise específica.
- O painel preserva registros órfãos caso a quantidade de versículos mude; não rebaixa automaticamente trechos revisados.
- O campo `editorialReviews` foi integrado à exportação/importação JSON, ao backup automático local e à validação do backup.
- Criado `REGISTRO-EDITORIAL.md` como referência versionada das regras e da migração inicial.
- Atualizados `CRITERIOS-EDITORIAIS.md`, `BACKUPS.md`, o validador estrutural e os testes Playwright.
- Limite: alterações feitas no painel continuam locais ao navegador até que o backup JSON seja exportado e versionado no repositório. Não há sincronização remota automática.
- Aguardar execução do workflow no Pull Request e conferir a interface; nenhuma alteração foi integrada em `main` nem publicada.

### Próximas etapas editoriais

1. Conferir a conferência final de abertura de Gênesis sem rebaixar os versículos já aprovados.
2. Retomar Êxodo com revisão hebraica versículo por versículo, atualizando estados somente após a conferência real.
3. Depois de estabilizado o fluxo, avançar livro por livro até Apocalipse, registrando correções, fontes, pendências e reaberturas.
