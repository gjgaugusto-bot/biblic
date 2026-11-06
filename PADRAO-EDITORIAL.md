# Padrão editorial e técnico — Enciclopédia Bíblica

## Contrato comum dos livros

Todo livro com tradução publicada deve oferecer:
1. Dados do texto separados da lógica de interface.
2. Identificação explícita da fonte-base e da edição textual consultada.
3. Tradução identificada como própria/de trabalho enquanto não houver revisão final.
4. Notas lexicais em estrutura separada, indexadas por livro, capítulo e versículo.
5. Contagem de capítulos e versículos conferida com a edição textual declarada.
6. Convenções consistentes para nomes divinos, nomes próprios, transliteração, pontuação e termos recorrentes.
7. Estado editorial transparente: rascunho, revisão estrutural, revisão linguística, revisão exegética ou aprovado.
8. Carregamento dos arquivos de dados antes de app.js.
9. Verificação automática de capítulos ausentes, versículos vazios, notas fora do capítulo e scripts não carregados.

## Convenções de tradução

- Preservar distinções semânticas do hebraico/aramaico/grego; não uniformizar palavras diferentes apenas por estilo.
- Registrar escolhas discutíveis nas notas lexicais.
- Não apresentar consulta a uma fonte como colação integral.
- Não declarar cotejo versículo a versículo sem evidência documentada.
- Manter o nome divino conforme a política editorial do livro, registrando qualquer diferença entre livros até que uma revisão global a resolva.
- Não atribuir ao texto-base características de manuscritos/autógrafos que a fonte não oferece.

## Organização dos arquivos

A organização física pode ser dividida em lotes, mas a interface deve consumir um único objeto de dados por livro e um único espaço lógico de notas por livro. Notas usam o contrato window.TRANSLATION_NOTES[índiceDoLivro][capítulo][versículo] com os campos term e text. Cada livro deve ter arquivo(s) de notas próprios; a fragmentação em lotes (como Êxodo) não deve alterar o contrato de dados. As notas são seletivas e não precisam existir em todos os versículos, mas sua distribuição deve ser inventariada e descrita sem alegar cobertura integral.

## Padrão de fonte

Para cada livro, registrar:
- língua e tradição textual;
- edição/fonte-base;
- URL ou referência bibliográfica;
- licença/atribuição quando aplicável;
- limites conhecidos da fonte;
- data da última conferência.
