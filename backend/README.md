# Kyowa Backend

API NestJS com Clean Architecture e MongoDB (Mongoose).

## Stack

- NestJS 10
- Mongoose (`users`: name, email, phone)
- Camadas: `controllers` → `usecases` → `repositories` → `entities`

## Configuração

```bash
cp .env.example .env
npm install
```

Variáveis:

| Variável      | Descrição                          |
|---------------|------------------------------------|
| `PORT`        | Porta HTTP (padrão: 3000)          |
| `MONGODB_URI` | URI do MongoDB                     |

## Executar

```bash
npm run start:dev
```

Base URL: `http://localhost:3000/api`

## Endpoints — Users

| Método | Rota           | Descrição        |
|--------|----------------|------------------|
| POST   | `/api/users`   | Criar usuário    |
| GET    | `/api/users`   | Listar usuários  |
| GET    | `/api/users/:id` | Buscar por ID  |
| PATCH  | `/api/users/:id` | Atualizar      |
| DELETE | `/api/users/:id` | Remover        |
