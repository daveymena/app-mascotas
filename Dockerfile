# Dockerfile optimizado para EasyPanel
FROM node:18-alpine

# Instalar dependencias del sistema necesarias
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++ \
    git

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY server/package*.json ./server/

# Instalar dependencias del frontend
RUN npm install

# Instalar dependencias del backend
WORKDIR /app/server
RUN npm install

# Volver al directorio principal
WORKDIR /app

# Copiar todo el código fuente
COPY . .

# Build del frontend
RUN npm run build

# Generar Prisma client
WORKDIR /app/server
RUN npx prisma generate

# Volver al directorio principal
WORKDIR /app

# Crear directorio para uploads
RUN mkdir -p uploads

# Exponer puerto
EXPOSE 3001

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3001

# Comando de inicio
CMD ["node", "server/src/index.js"]