---
sidebar_position: 10
sidebar_label: "Branch Strategy"
---

# Branch Strategy

Um Brach Strategy é um conjunto de práticas e estratégias para manter um repositório organizado e separar bem os lançamentos e funcionalidades desenvolvidas simultaneamente pela equipe.<br/>
Para o AGIS, iremos adotar as seguintes estrategias de branches para manter todo o fluxo de desenvolvimento em conjunto nos trilhos:

### Main

A branch principal, nela ficará o código com a última Release finalizada. É de onde iremos tirar a build atual do projeto.<br/>
Por questões de segurança, essa branch permanecessá **PROTEGIDA** de commits diretamente, sendo possível adicionar novos conteúdos a ela **EXCLUSIVAMENTE** por meio de pull requests!

### Release/Sprint[número da sprint atual]

Na branch de Release ficará a próxima Release com as funcionalidades escolhidas para a Sprint atual. Assim como na main, ela será protegida de commits diretos, sendo possível adicionar novos conteúdos somente por meio de pull requests.

### Feature/US[número da user story]-[TítuloEmPascalCase]

Essa será a branch de trabalho de cada user story, essas serão as únicas branches sem qualquer proteção contra commits diretos. É importante ressaltar que, para manter todo o histórico de trabalho devidamente organizado, seja realizada a prática de commits constantes e **SEMÂNTICOS**!<br/>
Na seguinte documentação constam mais detalhes sobre commits semânticos: [www.conventionalcommits.org/](https://www.conventionalcommits.org/en/v1.0.0/#specification) <br/>

## Fluxo de trabalho com o branch strategy

### No repositório local

Com as nossas branches devidamente especificadas, é hora de ver na prática como vai ficar esse fluxo de trabalho na prática!

Ao começo de cada sprint uma nova branch de Release será criada. Para ter essa branch no seu repositório remoto basta executar no seu git bash, terminal ou Power Shell o comando `git pull`<br/>
Ele irá atualizar o seu repositório local com todas as novas mudanças feitas ao repositório remoto — inclusive com novas branches.<br/>
Com a branch de Release em seu repositório local, mude para ela com o comando `git checkout Release/Sprint[n]` e crie uma nova branch a partir dela com o comando `git checkout -b Feature/US[n]-[TituloEmPascalCase]`<br/>
Sempre que implementar um novo código relevante lembre-se de realizar um commit. Para isso, adicione os arquivos (relacionados a essa nova implementação) com o comando `git add [caminho do arquivo]` e logo em seguida faça um novo commit com o comando `git commit -m "<tipo>: descrição EM TERCEIRA PESSOA"`.<br/>
ao final do seu tempo trabalhando no projeto, lembre-se de enviar seus commits para o repositório remoto. Na primeira vez será necessário definir uma upstream, para isso, basta usar o comando `git push --set-upstream origin [sua branch aqui :)]`. Com isso feito, nas próximas vezes será necessário somente o comando `git push`!

Resumo dos comandos em ordem:
- (main) `git checkout Release/Sprint[n]`
- (Release/Sprint[n]) `git checkout -b Feature/US[n]-[TítuloEmPascalCase]`
- (Feature/US[n]-[TítuloEmPascalCase]) - `git add [caminho dos arquivos relacionados]`
- (Feature/US[n]-[TítuloEmPascalCase]) - `git commit -m "<tipo>: descrição EM TERCEIRA PESSOA"`
- (Feature/US[n]-[TítuloEmPascalCase]) - `git push --set-upstream origin [sua linda Branch :)]` OU `git push`

Ok, mudanças enviadas para o repositório remoto no GitHub, mas e agora? Bom, agora partiremos para o processo de Pull Request!~

### No repositório remoto (nosso github :))

Após enviar seu código para o github você irá abrir um novo Pull Request para unir a sua branch à branch de Release! Importante frisar que é para **A BRANCH DE RELEASE**! Muito cuidado para não abrir o PR diretamente para a main!

Ao abrir o Pull Request você irá se deparar com o seguinte questionário na descrição dele:
```
## O que tem nesse PR?
- [x] Uma nova Feature
- [ ] Refatoração de uma Feature já existente
- [ ] Atualização da documentação

## Issue
- [ ] Possui uma Issue relacionada? 
Qual?

## Checklist antes de enviar PR
- [ ] Fiz uma revisão do meu código
- [ ] Se for uma feature com código, realizei os testes necessários
- [x] Faz parte de uma atualização do produto
```

Preencha marcando com o "x" como os que estão marcados no exemplo acima e pronto! Abra o seu PR e aguarde a revisão de pelo menos 2 pessoas para que o merge seja feito.