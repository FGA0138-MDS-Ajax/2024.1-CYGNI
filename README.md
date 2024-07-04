
# AGIS

Este repositório contém o projeto AGIS desenvolvido com Node.js, React, TypeScript e Electron. Neste arquivo README, você encontrará um guia passo a passo para executar o projeto em seu ambiente local.

## Sobre o projeto

O AGIS é uma aplicação desktop de gestão de recursos humanos, que visa fornecer todas as funcionalidades desejadas pelo cliente, como a geração de relatórios e geração de campanhas - calendário que mostra quem está apto a trabalhar no dia e mês.

##### Autores:

<!-- Tabela com os nomes e fotos-->
| <a href="https://github.com/Dridr1"><img src="https://avatars.githubusercontent.com/u/72324924?v=4" width="150" ></img></a> | <a href="https://github.com/ailujana"><img src="https://avatars.githubusercontent.com/u/107697177?v=4" width="150"></img></a> | <a href="https://github.com/Tutzs"><img src="https://avatars.githubusercontent.com/u/110691207?s=400&u=0f285ace4b3188bb274e2531ead3691d7161656a&v=4" width="150"></img></a> | <a href="https://github.com/caua08"><img src="https://avatars.githubusercontent.com/u/97673403?v=4" width="150"></img></a> | <a href="https://github.com/iancostag"><img src="https://avatars.githubusercontent.com/u/146049457?v=4" width="150"></img></a> |<a href="https://github.com/junioramaral22"><img src="https://avatars.githubusercontent.com/u/106130191?v=4" width="150"></img></a> | <a href="https://github.com/pedroluizfo"><img src="https://avatars.githubusercontent.com/u/101995982?v=4" width="150"></img></a>| <a href="https://github.com/SrFokse"><img src="https://avatars.githubusercontent.com/u/123479505?v=4" width="150"></img></a> |
|----------|:------:|:------:|:------:|:------:|:------:|:------:|:------:|
|[Adriano Fonseca](https://github.com/Dridr1)|  [Ana Julia](https://github.com/ailujana) | [Arthur Sousa](https://github.com/Tutzs) | [Caua Araujo](https://github.com/caua08) | [Ian Costa](https://github.com/iancostag) |[Necivaldo Amaral](https://github.com/junioramaral22) |[Pedro Luiz](https://github.com/pedroluizfo) | [Weverton Rodrigues](https://github.com/SrFokse) |

## Pré-requisitos

Antes de começar, verifique se você possui as seguintes ferramentas instaladas em sua máquina:

- Node.js (versão 20 ou superior)
- npm (gerenciador de pacotes do Node.js)
- Docker 

## Passo 1: Clonar o repositório

Comece clonando este repositório em uma pasta da sua máquina local. Abra o terminal e execute o seguinte comando:

```bash
git clone https://github.com/FGA0138-MDS-Ajax/2024.1-CYGNI.git
```

Isso criará uma cópia local do repositório em seu ambiente.

## Passo 2: Instalar dependências

Navegue até o diretório raiz do projeto e execute os seguintes comandos para instalar as dependências do Node.js:

```bash
cd 2024.1-CYGNI\back
npm i
cd ..
cd front
npm i
```

Esse comando irá ler o arquivo `package.json` e instalar todas as dependências necessárias para o projeto.

## Passo 3: Configurar variáveis de ambiente

O projeto exige algumas variáveis de ambiente para funcionar corretamente. Verifique se existe um arquivo `.env.example` na pasta `back` do projeto. Faça uma cópia desse arquivo e renomeie-o para `.env`. Em seguida, atualize as variáveis de ambiente de acordo com as configurações do seu ambiente local.

## Passo 4: Iniciar o servidor

Para iniciar o servidor Node.js, execute o seguinte comando no powershell:

```bash
cd back
docker compose up --build
```

Isso iniciará o servidor e você poderá acessá-lo através da sua máquina no endereço `http://localhost:80`.

## Passo 5: Iniciar o Docker 

O projeto roda localmente no Docker. Após executar o comando anterior, acesse o contêiner do backend e banco de dados, em MongoDB 6.0 (mongodb:6.0). Navegue até o banco de dados (em "Exec") e execute os seguintes comandos para criar um administrador:

```bash
docker exec mongodb mongosh —username agisagent 
Agis@2024
db.administradors.insertOne({login: "SeuNome", senha: "HashdeSuaSenha", privilegios:true, email: "seuemail@gmail.com"});
db.administradors.find()
```

A última linha de código serve para conferir se seu cadastro foi um sucesso ou não.

## Passo 6: Rodar o Front-end

```bash
cd front
npm run dev
```

Com esses passos, você poderá acessar o AGIS e aproveitar suas funcionalidades.

## Passo Extra: Hashear sua senha

Para transformar sua senha em hash, siga os passos abaixo:

1. **Crie uma nova pasta:**
   - Crie uma pasta chamada `bcrypt` na sua máquina.

2. **Crie um arquivo `index.js`:**
   - Dentro da pasta `bcrypt`, crie um arquivo chamado `index.js` e cole o seguinte código:

   ```javascript
   import * as bcrypt from "bcrypt";

   const senha = "suaSenha";

   const hasher = async () => {
       const hash = await bcrypt.hash(senha, 16);
       console.log(hash);
   };

   hasher();

3. **Instale as dependências:**
   - Abra o PowerShell, navegue até a pasta `bcrypt` e execute os seguintes comandos:

   ```bash
   npm init -y
   npm install bcrypt
   node index.js
   ```
   Esses comandos irão inicializar um novo projeto Node.js, instalar o pacote bcrypt e executar o código para gerar o hash da senha. O hash será exibido no console.

---

### Licença

Esse projeto está sob licença: [MIT](LICENSE).

---

### Modelo

Esse README foi feito seguindo o [template](https://github.com/DiasEllen26/template-readme)

---