# 🚀 Guía de Despliegue - Pet Health Hub

## EasyPanel

### Opción 1: Dockerfile Principal (Recomendado)
El Dockerfile principal ahora usa archivos pre-construidos y no hace build.

**Configuración en EasyPanel:**
1. Repositorio: `https://github.com/daveymena/app-mascotas.git`
2. Dockerfile: `Dockerfile` (por defecto)
3. Puerto: `3001`

**Variables de entorno requeridas:**
```
NODE_ENV=production
PORT=3001
```

### Opción 2: Dockerfile Simple (Alternativo)
Si prefieres usar el Dockerfile simple:

**Configuración en EasyPanel:**
1. Repositorio: `https://github.com/daveymena/app-mascotas.git`
2. Dockerfile: `Dockerfile.simple`
3. Puerto: `3001`

## Verificación del Despliegue

Una vez desplegado, verifica que funciona:

1. **Health Check**: `GET /api/health`
2. **Frontend**: Accede a la URL principal
3. **API**: `GET /api/pets` debería devolver datos de prueba

## Estructura del Proyecto

```
/app
├── dist/           # Frontend construido (React + Vite)
├── server/         # Backend (Node.js + Express)
│   ├── src/
│   │   └── index.js    # Servidor principal
│   └── prisma/         # Base de datos (Prisma)
└── uploads/        # Archivos subidos
```

## Endpoints Disponibles

### API Endpoints
- `GET /api/health` - Health check
- `GET /api/pets` - Listar mascotas
- `POST /api/pets` - Crear mascota
- `GET /api/appointments` - Listar citas
- `POST /api/appointments` - Crear cita
- `GET /api/vaccines` - Listar vacunas
- `POST /api/vaccines` - Crear vacuna
- `GET /api/dewormings` - Listar desparasitaciones
- `POST /api/dewormings` - Crear desparasitación
- `GET /api/allergies` - Listar alergias
- `POST /api/allergies` - Crear alergia

### Frontend
- `/*` - Aplicación React (SPA)

## Troubleshooting

### Error: "npm run build failed"
- Usa `Dockerfile.simple` en lugar del principal
- Los archivos están pre-construidos en `/dist`

### Error: "Cannot find module"
- Verifica que las dependencias del servidor se instalaron
- Revisa los logs del contenedor

### Error: "Port already in use"
- Verifica que el puerto 3001 esté disponible
- Cambia la variable PORT si es necesario