@echo off
echo ==========================================
echo   Instalador de Pet Health Hub (Fix SSL)
echo ==========================================

echo [1/5] Desactivando verificacion SSL estricta de NPM...
call npm config set strict-ssl false

echo.
echo [2/5] Instalando dependencias del Backend (Server)...
cd server
call npm install
call npm install -D ts-node typescript @types/node @types/express
if %ERRORLEVEL% NEQ 0 (
    echo Error instalando backend. Revise su conexion.
    pause
    exit /b
)
cd ..

echo.
echo [3/5] Instalando dependencias del Frontend...
call npm install --legacy-peer-deps
if %ERRORLEVEL% NEQ 0 (
    echo Error instalando frontend. Revise su conexion.
    pause
    exit /b
)

echo.
echo [4/5] Generando cliente de Base de Datos...
cd server
call npx prisma generate
cd ..

echo.
echo ==========================================
echo   Instalacion Completada!
echo ==========================================
echo.
echo Para iniciar la app:
echo 1. Abra una terminal en 'server' y ejecute: npm run dev
echo 2. Abra otra terminal en la raiz y ejecute: npm run dev
echo.
pause
