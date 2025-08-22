# Etapa 1 - Build do Vite
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Definir variáveis no momento do buil

RUN npm run build

# Etapa 2 - Servidor de produção
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY server.mjs .

EXPOSE 80

CMD ["node", "server.mjs"]
