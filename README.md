# Driver S3.
<p align="center">
  <img src="https://img.shields.io/static/v1?label=react&message=frontend&color=blue&style=for-the-badge&logo=REACT"/>
  <img src="https://img.shields.io/static/v1?label=express&message=framework&color=green&style=for-the-badge&logo=EXPRESS"/>
  <img src="https://img.shields.io/static/v1?label=typescript&message=backend&color=blue&style=for-the-badge&logo=TYPESCRIPT"/>
  <img src="https://img.shields.io/static/v1?label=nodejs&message=backend&color=green&style=for-the-badge&logo=node.js">
  <img src="https://img.shields.io/static/v1?label=cognito&message=autentication&color=purple&style=for-the-badge&logo=Amazon AWS"/>
  <img src="https://img.shields.io/static/v1?label=S3&message=storage&color=light-green&style=for-the-badge&logo=Amazon S3"/>
  
  
 
   <img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=RED&style=for-the-badge"/>
  
</p>

> Status do Projeto: :heavy_check_mark: :warning: Finalizado

### Tópicos 

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto)

:small_blue_diamond: [Funcionalidades](#funcionalidades)

:small_blue_diamond: [Pré-requisitos](#pré-requisitos)

:small_blue_diamond: [Como rodar a aplicação](#como-rodar-a-aplicação-arrow_forward)


## Descrição do projeto 

<p align="justify">
   O seguinte projeto foi desenvolvido durante um estudo de dados não estruturados usando o  Amazon S3.
</p>

## Funcionalidades

:heavy_check_mark: Login com o AWS Cognito

:heavy_check_mark: Validação de acesso via e-mail 

:heavy_check_mark: Criação de usuario com o AWS Cognito  

:heavy_check_mark: Recuperação de senha via e-mail

:heavy_check_mark: Upload de itens para um bucket S3

:heavy_check_mark: Download de um item do bucket S3   

:heavy_check_mark: Geração de link para compartilhamento de item do bucket S3 

:heavy_check_mark: Arquivamento de um item do bucket S3 

:heavy_check_mark: Recuperação de um item arquivado

:heavy_check_mark: Mandar item para a lixeira

:heavy_check_mark: Mandar Verificação do volume dos arquivos armazenados

## Pré-requisitos

:warning: [Node](https://nodejs.org/en/download/)

...


## Como rodar a aplicação ✨



No terminal, clone o projeto: 

```
git clone https://github.com/edsay12/Imersao-cloud.git
```
Apos isso, a pasta chamada backend e a pasta frontend devem ser abertas: 
```
1-) cd backend 
2-) cd frontend
```
em ambas as pastas, deve ser executado o seguinte comandos:

```
npm i 
```
Apos isso, na pasta backend deve ser criado o arquivo .env e dentro dele deve ser colocado as seguinte informações:

```
NODE_PORT= "Porta node de sua preferência"

COGNITO_SECRET= "Secret do cognito"
COGNITO_CID= "ClientId do cognito"

aws_access_key_id= "Chave de acesso Aws"
aws_secret_access_key= "Secret aws"
aws_session_token= "Token da seção"
```
Feito as configurações, Em ambas as pastas, deve ser executado o seguinte comandos:

```
npm i 
```
Pronto o aplicativo ja estara iniciando.
... 

📍 O codigo dese funcionar no:
```
http://localhost:5173
```



## Linguagens, dependencias e libs utilizadas :books:

- [React](https://pt-br.reactjs.org/docs/create-a-new-react-app.html)
- [React Toastify](https://www.npmjs.com/package/react-toastify)
- [React Chartjs2](https://react-chartjs-2.js.org/)
- [Multler](https://www.npmjs.com/package/multer)
- [Express](https://expressjs.com/pt-br/)
- [Aws Sdk](https://aws.amazon.com/pt/visualstudiocode/)



...



## Tarefas em aberto

Se for o caso, liste tarefas/funcionalidades que ainda precisam ser implementadas na sua aplicação

:memo: Adição de escolha na forma de armazenamento (armazenamento arquivo inteiro / armazenamento multparte)

:memo: Melhorar visual do app

:memo: Adicinar estrutura de pastas


## Relatorio do projeto 📟

- https://docs.google.com/document/d/1S9sC3tmEDC-ErYitlXrXmkUpEtWPKTs0o_lO4c4RGe0/edit#


## Desenvolvedores/Contribuintes :octocat:

| [<img src="https://avatars.githubusercontent.com/u/72822474?s=400&u=9ec5bffa52a85c17479d67b7bc04d6811d8a6c74&v=4" width=115><br><sub>Edvan Silva</sub>](https://github.com/edsay12) |  [<img src="https://avatars.githubusercontent.com/u/70728756?v=4" width=115><br><sub>Matheus Francisco</sub>](https://github.com/matheus-nbx52) |
| :---: | :---: |

## Licença 

The [MIT License]() (MIT)

Copyright :copyright: 2023 - DriveS3
