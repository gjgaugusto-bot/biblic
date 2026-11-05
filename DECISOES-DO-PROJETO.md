# DECISOES-DO-PROJETO.md

Registro permanente das escolhas explícitas do proprietário do Biblic. Este arquivo preserva decisões; não concede ao agente liberdade para ampliá-las ou tomar decisões semelhantes por conta própria.

## Regra de autoridade

O proprietário decide todo conteúdo intelectual, editorial, teológico e visual. O agente executa tecnicamente somente as instruções explícitas do usuário, dentro do escopo definido para cada tarefa. As regras operacionais vinculantes estão em `AGENTS.md` e `PROTOCOLO-DE-TRABALHO.md`.

Uma decisão registrada documenta uma escolha já feita. Ela não autoriza mudanças futuras fora do pedido atual. Em especial, decisões visuais históricas não são autorização permanente para redesenhar, ajustar ou “melhorar” qualquer elemento visual.

## Decisões vigentes

### Autoridade intelectual, editorial, teológica e visual

- Todo conteúdo intelectual, editorial e teológico é decisão do proprietário; o agente não deve criar, completar, resumir, reescrever, traduzir ou reinterpretar conteúdo por iniciativa própria.
- Toda escolha visual é decisão do proprietário. O agente não altera por iniciativa própria layout, cores, tipografia, imagens, ícones, espaçamentos, componentes ou organização visual. Uma mudança de acessibilidade que altere a aparência também precisa estar explicitamente solicitada.
- Uma ordem autoriza somente o escopo que ela descreve. Mudanças colaterais são proibidas.
- Ambiguidade, efeitos colaterais, migrações, mudanças de dados persistentes ou mudanças de conteúdo/visual não abrangidas claramente pelo pedido exigem esclarecimento e autorização antes da edição.
- Cada tarefa deve ter branch isolada, diff delimitado antes da edição, revisão integral posterior e Pull Request. Não fazer merge nem publicação automaticamente.

### Conteúdo bíblico e material de estudo

- Texto bíblico fornecido pelo proprietário deve ser preservado integralmente quando apresentado como transcrição; não resumir, omitir ou reescrever sem pedido explícito.
- Não acrescentar interpretações teológicas, personagens, episódios, símbolos, significados ou referências por inferência do agente.
- Distinguir texto bíblico, material próprio de estudo, dados fornecidos pelo usuário e informações ainda não verificadas.
- A tradução de trabalho de Gênesis registrada no projeto é material próprio de estudo; não apresentá-la como tradução publicada ou versão oficial.
- Se uma tradução protegida por direitos autorais for necessária, o proprietário deve fornecer o texto ou deve ser usado conteúdo permitido.
- A próxima etapa de conteúdo registrada é retomar o estudo em Gênesis 5. O status de capítulo só pode ser alterado após as conferências definidas em `PROGRESSO-DO-PROJETO.md`.

### Simbologias

- Incluir em capítulos somente simbologias que constem da base fornecida pelo proprietário e estejam associadas ao capítulo.
- Não inventar, completar, remover, alterar ou reinterpretar símbolos e significados fornecidos.
- Se não existir item correspondente na base, não criar um; manter a seção vazia ou registrar que não há item vinculado.
- Nomes sem correspondência na base não devem receber descrições especulativas.

### Decisões visuais registradas pelo proprietário

Este histórico documenta pedidos anteriores; não autoriza alterações visuais futuras sem pedido explícito para a tarefa em questão.

1. **Identidade ilustrada clássica — 2026-11-05, registrada como “em revisão” em `PROGRESSO-DO-PROJETO.md`:** pergaminho, molduras ornamentais, detalhes dourados e ilustrações vetoriais relacionadas ao conteúdo dos 66 livros. As ilustrações foram definidas como decorativas/descritivas, sem adicionar simbologias à base de estudos.
2. **Revisão monocromática — 2026-11-05, registrada em `PROGRESSO-DO-PROJETO.md`:** pedido para substituir ilustrações simples/genéricas, ampliar os ornamentos pelo site e usar preto e branco. O registro posterior documenta 66 gravuras vetoriais em preto e branco e a integração dos PRs #3 e #5.
3. **Estado documentado:** o histórico de progresso marca essas etapas como integradas à `main`, mas também registra que algumas inspeções visuais no site publicado não foram confirmadas. Este registro não declara uma nova aprovação visual e não muda o estado descrito no histórico.

## Histórico de registro

| Data | Decisão registrada | Origem |
|---|---|---|
| 2026-11-05 | Autoridade do proprietário sobre conteúdo e visual; execução limitada ao pedido; sem mudanças colaterais; revisão de diff antes/depois; autorização prévia para ambiguidades, efeitos colaterais, migrações, dados persistentes ou mudanças de conteúdo/visual; branch e PR sem merge/publicação automática | Pedido explícito do proprietário nesta conversa e regras solicitadas para o Biblic |
| 2026-11-05 | Regras editoriais, de simbologia, direitos autorais, estudo de Gênesis e decisões visuais históricas listadas acima | `PROGRESSO-DO-PROJETO.md`, `PROTOCOLO-DE-TRABALHO.md` e `AGENTS.md` existentes |

## Manutenção deste registro

- Acrescentar uma decisão somente quando o proprietário a expressar ou aprovar claramente.
- Registrar a data, a escolha com palavras fiéis ao sentido original e a fonte no chat/documento.
- Se uma decisão posterior alterar uma anterior, registrar a atualização e sua origem; não apagar o histórico.
- Não transformar uma escolha para uma tarefa em preferência geral sem confirmação explícita.
- Em caso de conflito ou dúvida sobre o que o proprietário escolheu, interromper a parte dependente e pedir esclarecimento.
