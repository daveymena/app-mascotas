#!/bin/bash

echo "🏗️  Construyendo Pet Health Hub para EasyPanel..."

# Limpiar builds anteriores
echo "🧹 Limpiando builds anteriores..."
rm -rf dist/

# Instalar dependencias del frontend
echo "📦 Instalando dependencias del frontend..."
npm install

# Construir el frontend
echo "🔨 Construyendo frontend..."
npm run build

# Verificar que el build se creó correctamente
if [ ! -d "dist" ]; then
    echo "❌ Error: El directorio dist no se creó"
    exit 1
fi

echo "✅ Build completado exitosamente!"
echo "📁 Archivos generados en ./dist/"
ls -la dist/

echo ""
echo "🐳 Ahora puedes usar Dockerfile.simple en EasyPanel"
echo "   o subir los cambios a Git y usar el Dockerfile principal"