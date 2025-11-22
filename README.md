# Pizzaria Backend

Sistema backend para gerenciamento de pizzaria.

## 🚀 Tecnologias

- Node.js
- Express
- PostgreSQL
- Docker
- Docker Compose

## 📋 Pré-requisitos

- Docker
- Docker Compose
- Node.js (para desenvolvimento local)

## 🐳 Rodando com Docker

### Clonar o repositório

```bash
git clone <[url-do-repositorio](https://github.com/charlesonline/react_pizzaria_backend.git)>
cd pizzaria/backend
```

### Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgresql://user:password@db:5432/pizzaria
JWT_SECRET=seu-secret-aqui
PORT=3333
```

### Iniciar os containers

```bash
docker-compose up -d
```

### Parar os containers

```bash
docker-compose down
```

## 💻 Desenvolvimento Local

### Instalar dependências

```bash
npm install
```

### Executar migrações

```bash
npm run migrate
```

### Iniciar servidor de desenvolvimento

```bash
npm run dev
```

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm start` - Inicia servidor em produção
- `npm test` - Executa testes

## 🔗 Endpoints da API

A documentação completa da API está disponível em `/api/docs` após iniciar o servidor.

## 📄 Licença

Este projeto está sob a licença MIT.