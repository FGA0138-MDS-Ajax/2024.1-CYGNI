---
sidebar_label: "Visão do Projeto"
sidebar_position: 1
---

# Visão Geral do Produto

## Problema
A utilização de múltiplas plataformas para desempenhar tarefas semelhantes resulta em uma série de desafios. Em uma sessão de administração de recursos humanos, por exemplo, é comum a necessidade de recorrer a mais de um sistema para a realização do trabalho, gerando uma repetição das mesmas atividades. Esse trabalho não integrado, onde as informações muitas vezes estão dispersas em sistemas isolados, não apenas consome tempo e recursos, mas também aumenta as chances de erros e inconsistência nos dados. Como resultado, a produtividade pode ser afetada e a tomada de decisões baseada em dados pode se tornar menos precisa, limitando a capacidade de uma organização de alcançar seus objetivos de forma eficaz e eficiente.


![Diagrama de Ishikawa do projeto.](/static/img/Ishikawa.png)
*Representação do Diagrama Ishikawa para identificar possíveis problemas que o software se propõe a resolver.*

## Declaração de Posição do Produto

#### Qual é o produto que o grupo se propõe a desenvolver?
O AGIS é uma aplicação desktop de gestão de recursos humanos, que visa fornecer as funcionalidades desejadas pelo cliente, como a geração de relatórios, criação de escalas de trabalho e comunicação interna das fichas dos funcionários, além da geração de campanhas - calendário que mostra quem está apto a trabalhar no dia e mês.

#### O que torna este produto diferente dos seus concorrentes (se existirem concorrentes)?
Este produto se destaca pela geração automática de campanhas e escalas com base nas fichas dos funcionários. Sua capacidade de operação offline é uma vantagem significativa para a segurança, garantindo a continuidade do trabalho em diferentes ambientes e condições de conectividade.

#### Quem são os usuários-alvo e clientes do produto? Quais suas características e porque o produto é importante para eles.
Os usuários-alvo são gestores de pessoas, especificamente escalantes (caso do nosso cliente), responsáveis pela criação e administração de escalas de trabalho dentro das empresas. Para eles, o produto é de extrema importância, pois oferece uma solução que simplifica e otimiza suas tarefas diárias.

#### Por que os clientes deveriam utilizar / comprar este produto?
O produto oferece uma solução confiável e eficiente para a criação de escalas e manuseio de fichas de funcionários. Com o servidor operando internamente na empresa, garantimos segurança e controle sobre os dados. Além disso, proporcionamos funcionalidades como a geração automática de relatórios, campanhas e escalas de trabalho, simplificando processos e tornando o trabalho mais eficiente e otimizado.

## Tabela 02 - Tabela de organização do Projeto

| Para:                   | Gestores de pessoas, especialmente aqueles responsáveis por construir escalas |
|-------------------------|-------------------------------------------------------------------------------|
| Necessidade:            | Gerenciamento dos funcionários, geração de relatórios de pessoal              |
| O AGIS:                 | É uma aplicação desktop.                                                      |
| Que:                    | Visa a economia de tempo, eficiência e confiabilidade para a administração de RH |
| Ao contrário:           | Da utilização de múltiplos sistemas e plataformas não integradas              |
| Nosso produto:          | Proporciona a centralização de dados e processos, além de fornecer a geração automática de relatórios, campanhas e escalas, funcionando em um servidor interno. |

## Objetivos do Produto

**Objetivo geral:** Desenvolver uma aplicação desktop que visa a gestão eficiente de pessoas, otimize a administração dos dias de trabalho e integre funcionalidades de softwares de gerência, incluso a criação de escalas e campanhas.
- Gerir pessoas com eficiência, e principalmente, com confiabilidade.
- Gerenciar os dias de trabalho dos funcionários.
- Integrar softwares distintos de gerência em somente uma aplicação.

## Tecnologias a Serem Utilizadas

- **Linguagens de programação e Frameworks:** Utilizaremos o HTML, CSS e JavaScript como marcadores e linguagens de programação, em conjunto com os frameworks React e o Electron para o FrontEnd. Para o Backend, usaremos JavaScript, em conjunto com o NestJS e Express.

- **Ambiente de desenvolvimento:** Como a maioria dos integrantes utilizam o Visual Studio Code, o utilizaremos para a edição de códigos, aproveitando de suas tecnologias de Live Sharing etc. Durante o desenvolvimento do projeto, o controle das versões será feito por Commits no GitHub. Para facilitar a configuração do ambiente de desenvolvimento, será usado o Docker para rodar a aplicação em ambiente local.

- **Arquitetura de Software:** Utilizaremos a Arquitetura em Camadas, na qual a separação de preocupações é a principal propriedade da arquitetura, cada camada de software tem uma função específica. Isso facilita a atualização de camadas individuais e também permite que as equipes separem as cargas de trabalho.

- **Arquitetura do Banco de Dados:** Optamos pelo MongoDB, um banco de dados No-SQL que oferece praticidade e flexibilidade no controle de coleções de dados e, devido a maturidade do projeto, também oferece de forma nativa ferramentas para sua gestão, dispensando o uso de ORMs e ferramentas de visualização de dados à parte.

- **Ferramentas:** A fim de organizar as atas de reuniões, funções e tarefas utilizamos o Miro (com o uso dos quadros Kanban). Para as reuniões, usamos o Discord. Electron para desenvolvimento da aplicação.
