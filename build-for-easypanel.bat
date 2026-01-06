@echo off
echo 🏗️  Construyendo Pet Health Hub para EasyPanel...

REM Limpiar builds anteriores
echo 🧹 Limpiando builds anteriores...
if exist dist rmdir /s /q dist

REM Instalar dependencias del frontend
echo 📦 Instalando dependencias del frontend...
npm install

REM Construir el frontend
echo 🔨 Construyendo frontend...
npm run build

REM Verificar que el build se creó correctamente
if not exist dist (
    echo ❌ Error: El directorio dist no se creó
    exit /b 1
)

echo ✅ Build completado exitosamente!
echo 📁 Archivos generados en ./dist/
dir dist

echo.
echo 🐳 Ahora puedes usar Dockerfile.simple en EasyPanel
echo    o subir los cambios a Git y usar el Dockerfile principal