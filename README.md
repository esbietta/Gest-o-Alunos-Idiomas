# Gestão de Alunos de Idiomas - API REST

API REST completa para gerenciamento de alunos e cursos de idiomas, com autenticação JWT, documentação Swagger e arquitetura em camadas (routes, controllers, service, model, middleware). Os dados são armazenados em banco de dados em memória.

## Sumário
- [Descrição](#descrição)
- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
- [Como executar](#como-executar)
- [Autenticação](#autenticação)
- [Documentação Swagger](#documentação-swagger)

## Descrição
Esta API permite o cadastro, autenticação e gerenciamento de alunos e cursos de idiomas, com regras de negócio para perfis de aluno e professor. O sistema foi desenvolvido em Node.js com Express, seguindo boas práticas de separação de camadas e autenticação JWT.

## Funcionalidades

### 1️⃣ Registro de Usuários (Professor/Aluno)

User Story:

Como usuário (aluno ou professor)
Eu quero me registrar no sistema
Para que eu possa acessar e utilizar as funcionalidades de gestão de cursos e alunos

Regras de Negócio:

- O e-mail deve ser único (não pode haver dois usuários com o mesmo e-mail).

- O campo tipo de usuário deve ser obrigatório e aceitar apenas os valores: "aluno" ou "professor".

- A senha deve ter no mínimo 8 caracteres.

- O sistema deve validar todos os campos obrigatórios antes de concluir o registro.

- Apenas professores podem criar e gerenciar cursos.

- Um token JWT deve ser gerado após o registro bem-sucedido.


### 2️⃣ Login de Usuários (Professor/Aluno)

User Story:

Como usuário (aluno ou professor)
Eu quero fazer login no sistema
Para que eu possa acessar os recursos conforme o meu perfil

Regras de Negócio:

- O login deve exigir e-mail e senha válidos.

- Se o e-mail ou a senha estiver incorreto, o sistema deve retornar erro 401 - Unauthorized.

- Após 3 tentativas de login incorretas, o sistema debe bloquear temporalmente o acesso por 15 minutos.

- O sistema deve manter o sessão ativa por tempo limitado (ex: 30 minutos de inatividade)

- Após o login bem-sucedido, o sistema deve gerar e retornar um token JWT com a função do usuário (aluno/professor).

 - O token deve ser obrigatório para acessar qualquer endpoint protegido (cursos, alunos, etc.).


Tokens expirados devem ser invalidados automaticamente.


### 3️⃣ Gestão de Cursos de Idiomas

User Story:

Como professor
Eu quero criar, atualizar e listar cursos de idiomas
Para que os alunos possam se inscrever e participar desses cursos

Regras de Negócio:

- Apenas usuários com perfil de professor podem criar, editar ou excluir cursos.

 - Cada curso deve conter os campos: nome, idioma, nível e descrição.

 - Não pode haver dois cursos com o mesmo nome e idioma.

- Professores podem listar apenas os cursos que criaram.

- Alunos podem visualizar todos os cursos disponíveis.

 - Cursos não podem ser deletados se houver alunos matriculados.


### 4️⃣ Listar Alunos

User Story:

Como professor
Eu quero listar todos os alunos cadastrados e seus respectivos cursos
Para que eu possa acompanhar o progresso e as matrículas dos alunos

Regras de Negócio:

- Apenas professores podem visualizar a lista completa de alunos.

- Cada aluno deve estar associado a pelo menos um curso.

- Os alunos devem poder visualizar apenas o próprio perfil e curso.

- Professores podem filtrar alunos por curso ou idioma.


 - A resposta deve exibir: nome do aluno, curso, idioma e status da matrícula.

## Arquitetura

O projeto está dividido nas seguintes camadas:
- **routes**: definição dos endpoints da API
- **controllers**: lógica de controle e validação das requisições
- **service**: regras de negócio e manipulação dos dados
- **model**: modelos e dados em memória
- **middleware**: autenticação JWT
- **recursos**: documentação Swagger

### Endpoints principais
- `POST /api/auth/register` — Registro de usuário
- `POST /api/auth/login` — Login de usuário
- `POST /api/cursos` — Criar curso (professor)
- `GET /api/cursos` — Listar cursos
- `GET /api/alunos` — Listar alunos (professor)
- `GET /api/alunos/perfil` — Visualizar perfil do aluno

## Como executar

1. Instale as dependências:
	```bash
	npm install
	```
2. Inicie o servidor:
	```bash
	node src/app.js
	```
3. Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Autenticação

Utilize o endpoint `/api/auth/login` para obter um token JWT. Inclua o token no header `Authorization: Bearer <token>` para acessar os endpoints protegidos.

- O token expira em 1 hora.
- Endpoints protegidos retornam 401 caso o token seja inválido ou expirado.
- Apenas professores podem acessar a listagem de alunos e criar cursos.

## Documentação Swagger

A documentação completa dos endpoints, modelos de resposta e códigos de erro está disponível em `/api-docs` e no arquivo `recursos/swagger.json`.