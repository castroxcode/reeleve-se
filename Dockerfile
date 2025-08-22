# Etapa 1: Build da aplicação com Vite
FROM node:18-alpine AS build

# Diretório de trabalho
WORKDIR /app

# Copiar package.json e lockfile
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código do projeto
COPY . .

# Rodar o build (gera a pasta dist/)
RUN npm run build

# Etapa 2: Servir os arquivos com Nginx
FROM nginx:alpine

# Remover arquivos padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar o build do Vite para a pasta do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar config opcional do nginx (se quiser SPA routing)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta
EXPOSE 80

# Rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
