FROM node:20-bookworm-slim

RUN apt-get update && \
    apt-get install -y openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json ./
COPY backend/package*.json ./backend/
COPY backend ./backend

RUN npm install

WORKDIR /app/backend

RUN npm run prisma:generate
RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]