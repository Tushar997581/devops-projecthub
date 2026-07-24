# DevOps ProjectHub

DevOps ProjectHub is a production-ready monorepo for a modern project management platform. It is designed to evolve into a Dockerized, Terraform-managed, Jenkins-driven deployment on AWS.

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Axios
- React Hook Form
- Zod
- TanStack Query

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt
- Helmet
- CORS
- Morgan
- dotenv
- Express Validator

### DevOps
- Docker
- Docker Compose
- Nginx
- Terraform
- Jenkins

## Folder Structure

```text
devops-projecthub/
├── frontend/
├── backend/
├── infrastructure/
│   ├── terraform/
│   └── jenkins/
├── nginx/
├── docker-compose.yml
├── .gitignore
├── README.md
└── docs/
```

## Installation

```bash
npm install
```

## Local Development

```bash
npm run dev:frontend
npm run dev:backend
```

## Docker

```bash
docker compose up --build
```

## Future AWS Deployment

The project includes infrastructure placeholders for Terraform and Jenkins so AWS deployment automation can be added next.
