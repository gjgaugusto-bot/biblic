# Critérios editoriais e de revisão — Enciclopédia Bíblica

## Objetivo

Manter uma base estável para a publicação dos livros bíblicos. Novos conteúdos devem entrar por módulos, sem reescrever componentes já validados.

## Fonte e método

- Para o Antigo Testamento, usar o texto hebraico massorético como texto-base declarado.
- Para o Novo Testamento, declarar a edição crítica grega adotada antes de iniciar cada livro.
- Consultar mais de uma edição textual e léxicos reconhecidos quando uma decisão for controversa.
- Não apresentar uma hipótese etimológica, histórica, arqueológica ou teológica como se fosse significado lexical comprovado.
- Distinguir no texto: tradução, observação gramatical, nota lexical e interpretação.
- Preservar ambiguidades reais do original; quando houver mais de uma leitura plausível, registrá-las com concisão.

## Padrão de cada nota lexical

Cada nota deve:
1. Identificar a forma hebraica ou grega pertinente ao versículo.
2. Informar transliteração consistente.
3. Explicar o campo semântico relevante no contexto, sem atribuir à palavra todos os sentidos possíveis do dicionário.
4. Distinguir sentido lexical de inferência contextual ou interpretação teológica.
5. Sinalizar incerteza quando a forma, identificação material, etimologia ou leitura textual for debatida.
6. Evitar afirmações categóricas sem apoio textual ou lexicográfico.

## Convenções de transliteração

- Manter uma convenção única por língua em todo o projeto.
- Não misturar transliteração acadêmica, pronúncia moderna e grafias aportuguesadas na mesma nota sem explicar a escolha.
- Preservar caracteres hebraicos e gregos originais.
- Revisar especialmente guturais, consoantes enfáticas, vogais longas e nomes divinos.

## Fluxo obrigatório de revisão

1. **Integridade:** conferir capítulos, versículos, referências e carregamento dos arquivos.
2. **Texto-base:** comparar a tradução com o texto original e identificar omissões ou acréscimos.
3. **Léxico:** conferir cada nota com léxicos e ocorrências paralelas.
4. **Contexto:** verificar sintaxe, gênero literário e contexto imediato.
5. **Consistência:** comparar termos repetidos e escolhas de tradução no restante do livro.
6. **Revisão editorial:** ortografia, clareza, neutralidade e padronização.
7. **Publicação:** registrar alterações em commit separado, atualizar versão/cache e testar o site.

## Estados editoriais

- **Pendente:** ainda não passou por revisão específica.
- **Em revisão:** está sendo comparado com as fontes.
- **Revisado:** passou pelas etapas documentadas; isso não significa consenso acadêmico.
- **Controverso:** há mais de uma leitura relevante e a divergência deve permanecer explícita.

Não marcar um capítulo ou livro como academicamente revisado apenas porque os arquivos carregam ou a contagem de versículos confere.

## Arquitetura e preservação

- Manter dados bíblicos e notas lexicais em módulos separados da interface.
- Evitar duplicar conteúdo ou recriar a aplicação para adicionar um livro.
- Fazer alterações em lotes pequenos e commits específicos.
- Antes de alterar arquivos existentes, buscar a versão atual e preservar o conteúdo não relacionado.
- Toda edição local do navegador deve ser exportável; não prometer sincronização entre dispositivos sem um serviço de armazenamento compartilhado.
- Manter backups antes de importações, migrações ou mudanças de formato.

## Situação de Êxodo

- O conteúdo dos capítulos 1–40 está integrado em módulos carregados pelo site.
- As notas lexicais estão distribuídas entre `translation-notes.js` (inclui notas de Êxodo 1–10) e módulos de Êxodo 11–40.
- A aplicação oferece edição local das notas e exportação/importação de backup.
- A contagem estrutural e a integração dos lotes foram verificadas anteriormente.
- A revisão lexical e textual independente, nota por nota e versículo por versículo, deve continuar sendo registrada como trabalho em andamento. Não declarar o livro academicamente concluído antes dessa checagem.

## Regra para novos livros

Um livro novo só deve ser iniciado no mesmo padrão de módulos de dados, notas, fontes declaradas e validação. A estrutura da aplicação deve ser reutilizada; mudanças estruturais devem ser feitas uma vez, com compatibilidade retroativa.
