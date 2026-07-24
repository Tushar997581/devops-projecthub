FROM node:20-alpine AS build
WORKDIR /app
COPY package.json ./
COPY frontend/package*.json ./frontend/
COPY frontend ./frontend
RUN npm install
RUN npm --workspace frontend run build

FROM nginx:1.27-alpine
COPY --from=build /app/frontend/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
