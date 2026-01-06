#!/bin/bash

# Script de despliegue para Pet Health Hub
set -e

echo "🚀 Iniciando despliegue de Pet Health Hub..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para logging
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

# Verificar que Docker esté instalado
if ! command -v docker &> /dev/null; then
    error "Docker no está instalado. Por favor instala Docker primero."
fi

if ! command -v docker-compose &> /dev/null; then
    error "Docker Compose no está instalado. Por favor instala Docker Compose primero."
fi

# Verificar variables de entorno
if [ ! -f .env ]; then
    warning "Archivo .env no encontrado. Copiando desde .env.example..."
    cp server/.env.example .env
    echo "⚠️  Por favor configura las variables de entorno en .env antes de continuar."
    exit 1
fi

# Crear directorios necesarios
log "Creando directorios necesarios..."
mkdir -p uploads
mkdir -p ssl
mkdir -p logs

# Build de la aplicación
log "Construyendo la aplicación..."
docker-compose build --no-cache

# Ejecutar migraciones de base de datos
log "Ejecutando migraciones de base de datos..."
docker-compose run --rm app npx prisma migrate deploy

# Generar cliente de Prisma
log "Generando cliente de Prisma..."
docker-compose run --rm app npx prisma generate

# Iniciar servicios
log "Iniciando servicios..."
docker-compose up -d

# Verificar que los servicios estén funcionando
log "Verificando servicios..."
sleep 10

if docker-compose ps | grep -q "Up"; then
    log "✅ Servicios iniciados correctamente"
else
    error "❌ Error al iniciar servicios"
fi

# Mostrar logs
log "Mostrando logs de la aplicación..."
docker-compose logs --tail=50 app

log "🎉 Despliegue completado exitosamente!"
log "📱 La aplicación está disponible en: http://localhost"
log "📊 Para ver logs: docker-compose logs -f"
log "🛑 Para detener: docker-compose down"

# Información adicional
echo ""
echo "📋 Comandos útiles:"
echo "  - Ver logs: docker-compose logs -f [servicio]"
echo "  - Reiniciar: docker-compose restart [servicio]"
echo "  - Actualizar: git pull && docker-compose build && docker-compose up -d"
echo "  - Backup DB: docker-compose exec postgres pg_dump -U postgres pethealthhub > backup.sql"