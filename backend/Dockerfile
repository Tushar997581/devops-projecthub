FROM node:20-bookworm-slim

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