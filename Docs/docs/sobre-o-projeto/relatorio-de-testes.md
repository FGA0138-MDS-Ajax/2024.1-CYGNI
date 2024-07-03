---
sidebar_position: 11
sidebar_label: "Relatorio de Testes"
---

# Relatório de Testes: Serviços e Controladores da Aplicação

## 1. `AdministradoresService` caso de teste

### Objetivo
Testar as funcionalidades principais do serviço de administradores, incluindo a criação de administradores, login, busca por todos os administradores e busca por ID.

### Resultados

- **Definição do Serviço:**
  - Teste: `deve estar definido`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço `AdministradoresService` está definido corretamente.

- **Criação de Administradores:**
  - Teste: `deve criar um novo Administrador`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço está criando um novo administrador corretamente.

- **Busca de Todos os Administradores:**
  - Teste: `deve retornar um array com todos os administradores`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço retorna uma lista de todos os administradores.

- **Login de Administrador:**
  - Teste: `deve retornar um token JWT para credenciais de login válidas`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço retorna um token JWT para credenciais válidas.
  - Teste: `deve retornar erro de restrição para credenciais inválidas`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço lança uma exceção para credenciais inválidas.

- **Busca de Administrador por ID:**
  - Teste: `deve retornar um administrador por ID`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço retorna um administrador para um ID válido.
  - Teste: `deve retornar BadRequestException para um ID inválido`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço lança uma exceção para um ID inválido.

## 2. `EmailController` caso de teste

### Objetivo
Testar as funcionalidades principais do controlador de e-mails.

### Resultados

- **Definição do Controlador:**
  - Teste: `deve estar definido`
  - Resultado: Sucesso
  - Descrição: Verifica se o controlador `EmailController` está definido corretamente.

## 3. `UsuariosService` caso de teste

### Objetivo
Testar as funcionalidades principais do serviço de usuários, incluindo a criação, busca, atualização e remoção de usuários.

### Resultados

- **Definição do Serviço:**
  - Teste: `deve estar definido`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço `UsuariosService` está definido corretamente.

- **Criação de Usuários:**
  - Teste: `deve criar um novo usuário`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço está criando um novo usuário.
  - Teste: `deve retornar um erro caso a criação falhe`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço lança uma exceção quando a criação falha.

- **Busca de Todos os Usuários:**
  - Teste: `deve retornar um array com todos os usuários`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço retorna uma lista de todos os usuários.

- **Busca de Usuário por Nome, Matrícula ou ID:**
  - Teste: `deve retornar um usuário por id`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço retorna um usuário pelo ID.
  - Teste: `deve retornar um usuário por nomeCompleto`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço retorna um usuário pelo nome completo.
  - Teste: `deve retornar um usuário por matricula`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço retorna um usuário pela matrícula.
  - Teste: `should throw a BadRequestException if no parameters are provided`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço lança uma exceção quando nenhum parâmetro é fornecido.
  - Teste: `should throw an InternalServerErrorException if findById fails`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço lança uma exceção interna do servidor quando a busca por ID falha.

- **Atualização de Usuários:**
  - Teste: `deve atualizar o usuário por id`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço atualiza um usuário pelo ID.
  - Teste: `deve retonar NotFoundException se o usuário nao for encontrado`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço lança uma exceção quando o usuário não é encontrado.
  - Teste: `deve retonar InternalServerErrorException para outros erros`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço lança uma exceção interna do servidor para outros erros.
  - Teste: `deve atualizar o usuário por nomeCompleto`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço atualiza um usuário pelo nome completo.
  - Teste: `deve atualizar o usuário por matricula`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço atualiza um usuário pela matrícula.
  - Teste: `deve retonar BadRequestException if no parameters are provided`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço lança uma exceção quando nenhum parâmetro é fornecido.

- **Remoção de Usuários:**
  - Teste: `deve remover um usuário por id`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço remove um usuário pelo ID.
  - Teste: `deve retornar NotFoundException se o usuário nao for encontrado por id`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço lança uma exceção quando o usuário não é encontrado pelo ID.
  - Teste: `deve remover um usuário por nomeCompleto`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço remove um usuário pelo nome completo.
  - Teste: `deve remover um usuário por matricula`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço remove um usuário pela matrícula.
  - Teste: `deve retornar BadRequestException se nenhum parâmetro for fornecido`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço lança uma exceção quando nenhum parâmetro é fornecido.
  - Teste: `deve retornar InternalServerErrorException para outros erros`
  - Resultado: Sucesso
  - Descrição: Verifica se o serviço lança uma exceção interna do servidor para outros erros.

## Conclusão

Todos os testes foram executados com sucesso, validando as funcionalidades principais dos serviços e controladores na aplicação. As exceções e erros foram tratados corretamente, garantindo a robustez e a confiabilidade dos serviços testados.
