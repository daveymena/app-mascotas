# Dockerfile principal - Versión que NO hace build del frontend
FROM node:18-alpine

# Instalar dependencias básicas
RUN apk add --no-cache libc6-compat curl

WORKDIR /app

# Copiar archivos del servidor
COPY server/package*.json ./server/
COPY server/src/ ./server/src/
COPY server/prisma/ ./server/prisma/

# Instalar dependencias del servidor solamente
WORKDIR /app/server
RUN npm install --only=production

# Generar Prisma client
RUN npx prisma generate

# Copiar archivos estáticos del frontend (pre-construidos)
WORKDIR /app
COPY dist/ ./dist/

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