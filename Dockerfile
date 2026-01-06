# Dockerfile para EasyPanel - Versión robusta
FROM node:18-alpine

# Instalar dependencias del sistema
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++ \
    git \
    curl

WORKDIR /app

# Copiar package.json del frontend
COPY package*.json ./

# Limpiar cache de npm y instalar dependencias del frontend
RUN npm cache clean --force && \
    npm install --verbose

# Copiar package.json del backend
COPY server/package*.json ./server/

# Instalar dependencias del backend
WORKDIR /app/server
RUN npm cache clean --force && \
    npm install --verbose

# Volver al directorio principal
WORKDIR /app

# Copiar el resto del código
COPY . .

# Verificar que los archivos necesarios existen
RUN ls -la && \
    ls -la src/ && \
    cat package.json | grep "build"

# Build del frontend con más información de debug
RUN npm run build --verbose

# Generar Prisma client
WORKDIR /app/server
RUN npx prisma generate --verbose

# Volver al directorio principal y verificar build
WORKDIR /app
RUN ls -la dist/

# Crear directorio para uploads
RUN mkdir -p uploads

# Exponer puerto
EXPOSE 3001

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3001

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3001/api/health || exit 1

# Comando de inicio
CMD ["node", "server/src/index.js"]