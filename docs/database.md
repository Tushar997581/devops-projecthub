# Database Setup

## Start PostgreSQL with Docker Compose

```bash
docker compose up -d postgres
```

## Run Prisma migrations

```bash
npm --workspace backend run prisma:migrate
```

## Seed the database

```bash
npm --workspace backend run prisma:seed
```

## Verify the tables

```bash
docker compose exec postgres psql -U postgres -d devops_projecthub -c "\dt"
```

## Default admin user

- Email: admin@projecthub.com
- Password: Admin@123
