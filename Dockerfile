FROM node:24-alpine AS build
WORKDIR /app

# Copia apenas o package se ele existir para inicializar
COPY package*.json ./
RUN npm install

COPY . .

# COMENTE ESTAS LINHAS ABAIXO POR ENQUANTO:
# RUN npm run build

# FROM nginx:stable-alpine AS runtime
# COPY --from=build /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]