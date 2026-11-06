# ESTADO OFICIAL DO PROJETO — CONTINUIDADE ENTRE CONVERSAS

Atualizado em 2026-11-06.

> **REGRA PRINCIPAL: NÃO RECOMEÇAR O TRABALHO.** Este arquivo é o ponto de retomada obrigatório para qualquer nova sessão. Leia-o antes de propor revisões, depois consulte os registros citados. A falta de memória de uma conversa nunca é motivo para repetir trabalho já feito.

## Objetivo

Concluir a Enciclopédia Bíblica, preservando o trabalho existente, e avançar pelos 66 livros em ordem até Apocalipse. O objetivo de cada sessão é produzir avanço concreto, registrar o resultado e deixar o projeto pronto para a próxima etapa — não reabrir etapas concluídas sem motivo.

## Estado confirmado nesta data

| Área | Estado | O que isso significa |
|---|---|---|
| Gênesis | **Revisado no histórico; fechamento final da abertura pendente** | O usuário informou que Gênesis já foi revisado várias vezes. Fazer somente a conferência final da abertura combinada. Não reiniciar a revisão dos 50 capítulos. |
| Êxodo 1–40 | **Integrado; revisão acadêmica versículo por versículo ainda pendente** | Texto, notas lexicais e correções estão no projeto. A análise com o hebraico precisa prosseguir sem refazer a integração técnica. |
| Controle editorial por versículo | **Implementado em branch e aguardando validação** | PR #36, branch `feat/controle-editorial-versiculos-2026-11-06`. Não declarar concluído até o teste de navegador passar. |
| Demais livros | **Aguardando sequência editorial** | Não começar antes de estabilizar a etapa atual; avançar em ordem até Apocalipse. |
| Site publicado | **Não alterado por esta etapa** | O PR #36 é rascunho e não foi integrado nem publicado. |

## Regra definitiva para Gênesis

1. Fazer uma única conferência final da abertura, conforme combinado com o proprietário.
2. Limitar a conferência a erros objetivos: omissão, acréscimo, inconsistência, problema real de tradução/fidelidade ou erro linguístico relevante.
3. Não fazer nova revisão geral dos capítulos 1–50, não reavaliar escolhas apenas por preferência estilística e não exigir que o usuário repita etapas já feitas.
4. Corrigir e registrar somente problemas concretos encontrados.
5. Ao terminar a conferência final, atualizar este documento e `REGISTRO-EDITORIAL.md` para **GÊNESIS — FECHADO DEFINITIVAMENTE**.
6. Depois de fechado, Gênesis sai da fila de trabalho. Só poderá ser reaberto por evidência objetiva de erro relevante ou fonte nova que demonstre problema real; a justificativa e os versículos afetados devem ser registrados. Nova conversa, perda de contexto, mudança de ferramenta ou preferência estilística não justificam reabertura.

**Importante:** até que a conferência final da abertura seja executada e registrada, não afirmar que Gênesis já está definitivamente fechado. O histórico de revisão dos demais capítulos, porém, permanece preservado.

## Regras para não repetir trabalho

- Nunca voltar um versículo de **Revisado** para **Pendente** ou **Em revisão** por causa de nova conversa.
- Nunca repetir revisão de livro/capítulo que tenha registro de conclusão válido.
- Antes de iniciar qualquer tarefa, identificar o próximo item genuinamente pendente no registro oficial.
- Se houver dúvida, consultar os arquivos e o histórico do Git; não presumir que o trabalho não foi feito.
- Só reabrir com fonte relevante e motivo concreto, identificando exatamente os versículos afetados.
- Não transformar revisão estilística opcional em requisito para concluir.
- Não apagar histórico, notas, traduções, símbolos ou dados locais do usuário.
- Não marcar como concluído algo que não foi efetivamente conferido e registrado.

## Próximas ações — ordem obrigatória

1. **Concluir a infraestrutura atual:** corrigir a falha do teste Playwright do PR #36, executar novamente o workflow e verificar o resultado completo. O último resultado conhecido do workflow `42267847733` foi falha no passo de teste em Chromium; sintaxe e validação estrutural passaram. Investigar a falha antes de integrar.
2. Revisar o diff do PR #36 e, após os checks passarem, apresentar o resultado para decisão do proprietário. Não integrar nem publicar sem autorização explícita.
3. Fazer a conferência final limitada da abertura de Gênesis e registrar o fechamento definitivo.
4. Prosseguir com a revisão acadêmica de Êxodo, aproveitando o texto e as notas já integrados; não reconstruir o livro.
5. Seguir livro por livro até Apocalipse, atualizando o registro ao fim de cada unidade concluída.

## Arquivos que toda nova sessão deve consultar

1. `ESTADO-OFICIAL-DO-PROJETO.md` — este ponto de retomada e a fila real.
2. `PROTOCOLO-DE-TRABALHO.md` — regras de segurança, revisão e publicação.
3. `PROGRESSO-DO-PROJETO.md` — histórico técnico e estado do projeto.
4. `REGISTRO-EDITORIAL.md` — estados e histórico por versículo.
5. `REVISAO-EXODO.md` — trabalho e pendências já registrados de Êxodo.
6. `CRITERIOS-EDITORIAIS.md` — critérios de conteúdo e aprovação.

## Como registrar cada sessão

Ao terminar uma etapa, atualizar este arquivo e os registros correspondentes com: data, livro/capítulo/versículos, trabalho efetivamente realizado, fontes, correções, testes executados, commit/PR e próximo ponto pendente. Manter a lista curta e factual. Não duplicar tarefas concluídas.

## Limites técnicos importantes

- O painel editorial mantém alterações no navegador via localStorage; isso não sincroniza sozinho com o GitHub.
- Exportar o backup JSON e versionar o registro é necessário para transportar alterações locais entre dispositivos/conversas.
- A branch de recurso e o PR não significam publicação. A branch `main` e o site público não devem ser alterados sem autorização expressa.
