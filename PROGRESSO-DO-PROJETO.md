# Controle de progresso — Enciclopédia Bíblica

Última atualização: 2026-11-05

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
