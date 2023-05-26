# Projeto CRUD Professor - Aluno

### Informações
  - Esse projeto consiste em um CRUD de criação de uma tabela Professor, que se relaciona com uma tabela Aluno
## Tecnologias
- JavaScript
- Prisma
- Banco de Dados SQlite
- Express


## Getting Started
## 1. Faça o clone do projeto e instale as dependencias
`git clone <http_do_projeto> `
## 2. Gere o banco de dados
`npx prisma migrate dev --name init `
## 3. Dependencias
`npm i nodemon `
## 4. Coloque o servidor no ar
`npm run dev` </br>
O server agora está rodando no `http://localhost:8080`


## Routes Alunos
#### GET
`http://localhost:8080/1/alunos`
#### PUT
`http://localhost:8080/1/alunos/2`
#### POST
`http://localhost:8080/criarAluno`
#### DELETE
`http://localhost:8080/1/2`
