---
sidebar_label: "Declaração do escopo do projeto"
sidebar_positionL: 8
---
# Declaração do escopo do projeto

### Backlog do produto
 
O backlog do produto é uma lista dinâmica de todos os requisitos, funcionalidades,
correções e melhorias que precisam ser feitas em um produto. O backlog é constantemente
revisado e atualizado com o decorrer do tempo, novos itens serão adicionados, prioridades
serão ajustadas e detalhes sendo aprimorados à medida que o entendimento do produto
evolui. O backlog do produto está detalhado na seguinte tabela

| Numeração | Cenário / Requisito | Tipo de Requisito | Priorização do Requisito | Descrição Sucinta do Requisito | User Stories (U.S.) Associadas |
|-----------|---------------------|-------------------|--------------------------|---------------------------------|---------------------------------|
| 01        | sprint 02           | Funcional         | Must                     | O administrador deve ser capaz, primeiramente, de implementar as informações relativas aos funcionários que serão persistentes no programa. Como um administrador, quero cadastrar funcionários no banco de dados. | Como administrador, desejo inserir os dados dos funcionários no sistema. |
| 02        | sprint 04           | Funcional         | Should                   | A fim de implementar uma das principais funções da aplicação, que é gerar diversos tipos de relatório, o administrador deve ser capaz de interagir com o banco de dados da forma que melhor lhe convir. Como administrador, quero editar, visualizar e excluir funcionários do banco de dados. | Como administrador, desejo editar, visualizar e excluir registros de funcionários no sistema. |
| 03        | sprint 05           | Funcional         | Could                    | O relatório de escalas faz uma busca nos funcionários e verifica quais estão de férias, quais estão de abono ou afastados e quais estão aptos a trabalhar. Se o funcionário não tem nenhuma restrição e está em horário de trabalho, ele pode ser escalado. Como um administrador, quero gerar/acessar relatórios de escala. | Como administrador, desejo visualizar relatórios de escalas para tomar decisões de escalonamento. |
| 04        | sprint 05           | Funcional         | Could                    | A ficha de pessoas dá uma visualização geral de todo o quadro de pessoal, mostrando informações como nome, telefone, cursos, escalas e outras informações gerais. Como um administrador, quero gerar/acessar fichas de pessoas. | Como administrador, desejo visualizar fichas de informações pessoais dos funcionários. |
| 05        | sprint 3            | Funcional         | Must                     | Para começar a cadastrar funcionários e gerar relatórios, o administrador deve estar devidamente logado, a fim de obter os acessos. O administrador deve ser capaz de se cadastrar no sistema e atualizar suas informações. | Como administrador, desejo me cadastrar no sistema e manter minhas informações atualizadas. |
| 06        | sprint 3            | Não funcional     | Must                     | Os administradores têm exclusividade em qualquer tipo de operação de escrita "W" de dados. Outros possíveis usuários são apenas leitores. O ambiente deve ser seguro e todas as atribuições de edição de dados são exclusivas do administrador. | Como administrador, desejo ter acesso exclusivo para editar dados no sistema. |
| 07        | sprint 4            | Funcional         | Should                   | Os usuários não podem editar nenhum tipo de informação no sistema. Como usuário, devo ser capaz de acessar as informações e relatórios que eu tiver acesso. | Como usuário, desejo visualizar informações e relatórios disponíveis no sistema. |
| 08        | sprint 4            | Funcional         | Could                    | O administrador tem total acesso ao sistema, podendo inclusive atribuir acessos de leitura aos usuários. Como administrador, devo poder atribuir diferentes formas de acesso aos arquivos e relatórios gerados. | Como administrador, desejo configurar diferentes níveis de acesso para os usuários. |



### Perfis de usuário

| # | **Nome do perfil** | **Características do perfil** | **Permissões de acesso** |
|---|-------------------|-------------------------------|--------------------------|
| `<1>` | Administrador     | O administrador tem acesso a todas as áreas da aplicação, pode acessar e editar fichas de pessoas, gerar relatórios, gerir os afastamentos, cadastrar outro administrador e gerir escalas. | - Acessar e editar fichas de pessoas, que contém nome, endereço, telefone, curso, tipo de trabalho. - Gerar relatórios de afastamentos, abono, contingente e férias. - Administrar escalas de trabalho. |
| `<2>` | Usuário (Leitor)   | Apenas ler informações inseridas pelos administradores. | Leitura. |
