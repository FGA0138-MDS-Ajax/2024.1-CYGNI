---
sidebar_position: 8
sidebar_label: "Visão de Implementação"
---

## Visão de Implementação

![Representação da Visão de Implementação.](../../static/img/DiagramadeEstados.png)

*Figura 3: Desenho esquemático da visão de implementação*

1. **Usuário**
    - Representado por um ícone de pessoa.
    - Interage com o sistema AGIS através de seu computador.

2. **Computador do Usuário**
    - O software AGIS roda localmente no computador do usuário.
    - Está conectado à rede do departamento.
    - Executa a parte de Front-End.

3. **Administrador**
    - Representado por um ícone de pessoa com óculos.
    - Interage com o sistema AGIS através de seu computador, similar ao usuário comum, mas com permissões adicionais.

4. **Computador do Administrador**
    - O software AGIS roda localmente no computador do administrador.
    - Está conectado à rede do departamento.
    - Executa a parte de Front-End.

5. **Servidor Local**
    - Representado por uma caixa pontilhada contendo componentes internos.
    - Conectado à rede do departamento.
    - Inclui:
        - **Back-End**: Implementado com NestJS e ExpressJS, responsável por serviços, HTTP, e repositórios.
        - **MongoDB**: Base de dados utilizada para armazenar informações do sistema.
    - Comunicação entre Back-End e MongoDB feita via JDBC.

6. **Rede Local**
    - Indica que todos os componentes estão conectados à mesma rede do departamento.
    - Comunicação entre componentes feita por requisições HTTP.

7. **Conexões e Comunicação**
    - Linhas indicando a interação e comunicação entre os usuários, administradores, e o servidor local.
    - Setas mostram o fluxo de dados e comandos através de requisições HTTP.

---
