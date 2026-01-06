# Multi-stage build para optimizar el tamaño
FROM node:18-alpine AS base

# Instalar dependencias necesarias
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY server/package*.json ./server/

# Instalar dependencias
RUN npm ci --only=production && npm cache clean --force
RUN cd server && npm ci --only=production && npm cache clean --force

# Build stage para el frontend
FROM base AS frontend-builder
WORKDIR /app
COPY . .
RUN npm run build

# Build stage para el backend
FROM base AS backend-builder
WORKDIR /app/server
COPY server/ .
RUN npx prisma generate

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos necesarios
COPY --from=frontend-builder /app/dist ./frontend/dist
COPY --from=backend-builder /app/server ./server
COPY --from=backend-builder /app/server/node_modules ./server/node_modules

# Configurar permisos
USER nextjs

# Exponer puerto
EXPOSE 3001

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3001

# Comando de inicio
CMD ["node", "server/src/index.js"]