# 🐾 Pet Health Hub

**Sistema completo de gestión de salud para mascotas con modelo de monetización integrado**

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

## 🚀 Características Principales

### 📱 **Funcionalidades Core**
- ✅ **Gestión de Mascotas**: Registro completo con fotos, datos médicos y microchip
- ✅ **Citas Veterinarias**: Programación y seguimiento de citas médicas
- ✅ **Control de Vacunas**: Historial y recordatorios automáticos
- ✅ **Desparasitaciones**: Registro de tratamientos y próximas dosis
- ✅ **Alergias**: Gestión de alergias y sensibilidades
- ✅ **Historial Médico**: Registro completo de la salud de cada mascota

### 💰 **Sistema de Monetización**
- ✅ **Modelo Freemium**: Plan gratuito con limitaciones
- ✅ **Plan Premium**: $9.99/mes - Funcionalidades avanzadas
- ✅ **Plan Profesional**: $19.99/mes - Para veterinarios y criadores
- ✅ **Sistema de Anuncios**: Integración sutil para usuarios gratuitos
- ✅ **Pagos con Stripe**: Sistema de suscripciones completo

### 🎨 **Tecnologías**
- **Frontend**: React 18, TypeScript, Tailwind CSS, ShadCN/UI
- **Backend**: Node.js, Express, Prisma ORM
- **Base de Datos**: PostgreSQL
- **Autenticación**: JWT
- **Pagos**: Stripe
- **Despliegue**: Docker, Nginx

## 📊 Proyección de Ingresos

| Año | Usuarios | Conversión | Ingresos Mensuales | Ingresos Anuales |
|-----|----------|------------|-------------------|------------------|
| 1   | 10,000   | 5%         | ~$7,000          | ~$84,000         |
| 2   | 50,000   | 7%         | ~$43,000         | ~$516,000        |

## 🛠 Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- PostgreSQL 15+
- Docker (opcional)

### 1. Clonar el Repositorio
```bash
git clone https://github.com/daveymena/app-mascotas.git
cd app-mascotas
```

### 2. Configurar Variables de Entorno
```bash
# Copiar archivo de ejemplo
cp server/.env.example server/.env

# Editar variables de entorno
# DATABASE_URL, JWT_SECRET, STRIPE_KEYS, etc.
```

### 3. Instalación con Docker (Recomendado)
```bash
# Hacer ejecutable el script de despliegue
chmod +x deploy.sh

# Ejecutar despliegue completo
./deploy.sh
```

### 4. Instalación Manual

#### Backend
```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

#### Frontend
```bash
npm install
npm run dev
```

## 🚀 Despliegue en Producción

### Opción 1: Docker Compose (Recomendado)
```bash
# Configurar variables de entorno
cp server/.env.example .env

# Ejecutar en producción
docker-compose up -d
```

### Opción 2: Servicios Cloud

#### Vercel (Frontend)
```bash
npm run build
vercel --prod
```

#### Railway/Render (Backend)
```bash
# Configurar variables de entorno en el dashboard
# Conectar repositorio
# Deploy automático
```

## 📁 Estructura del Proyecto

```
pet-health-hub/
├── 📱 Frontend (React)
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/         # Páginas de la aplicación
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Utilidades y configuración
│   │   └── types/         # Tipos de TypeScript
│   ├── public/            # Archivos estáticos
│   └── package.json
│
├── 🖥 Backend (Node.js)
│   ├── server/
│   │   ├── src/
│   │   │   ├── controllers/  # Controladores de rutas
│   │   │   ├── middleware/   # Middleware personalizado
│   │   │   ├── routes/       # Definición de rutas
│   │   │   └── config/       # Configuración
│   │   ├── prisma/           # Esquema de base de datos
│   │   └── package.json
│
├── 🐳 DevOps
│   ├── Dockerfile           # Imagen de Docker
│   ├── docker-compose.yml   # Orquestación
│   ├── nginx.conf          # Configuración de proxy
│   └── deploy.sh           # Script de despliegue
│
└── 📚 Documentación
    ├── README.md
    └── MONETIZATION_GUIDE.md
```

## 🎯 Planes de Suscripción

### 🆓 Plan Gratuito
- Hasta 2 mascotas
- Funciones básicas
- Con anuncios
- Soporte por email

### 👑 Plan Premium ($9.99/mes)
- Mascotas ilimitadas
- Sin anuncios
- Recordatorios automáticos
- Exportar a PDF
- Soporte prioritario

### 💼 Plan Profesional ($19.99/mes)
- Todo lo de Premium
- Gestión de múltiples clientes
- API personalizada
- Reportes avanzados
- Soporte 24/7

## 🔧 Configuración de Desarrollo

### Variables de Entorno Requeridas
```env
# Base de datos
DATABASE_URL="postgresql://user:pass@localhost:5432/pethealthhub"

# JWT
JWT_SECRET="your-secret-key"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email
SENDGRID_API_KEY="SG...."
```

### Scripts Disponibles

#### Frontend
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Linting
```

#### Backend
```bash
npm run dev          # Servidor con nodemon
npm run start        # Servidor de producción
npm run prisma:generate  # Generar cliente Prisma
npm run prisma:migrate   # Ejecutar migraciones
```

## 🧪 Testing

```bash
# Frontend
npm run test

# Backend
cd server && npm run test

# E2E
npm run test:e2e
```

## 📈 Métricas y Analytics

- **Google Analytics**: Seguimiento de usuarios
- **Stripe Dashboard**: Métricas de pagos
- **Custom Analytics**: KPIs específicos del negocio

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

- 📧 Email: support@pethealthhub.com
- 💬 Discord: [Pet Health Hub Community](https://discord.gg/pethealthhub)
- 📖 Documentación: [docs.pethealthhub.com](https://docs.pethealthhub.com)

## 🎉 Roadmap

### Q1 2024
- [ ] App móvil (React Native)
- [ ] Integración con clínicas veterinarias
- [ ] API pública
- [ ] Sistema de notificaciones push

### Q2 2024
- [ ] IA para recomendaciones de salud
- [ ] Telemedicina básica
- [ ] Marketplace de productos
- [ ] Programa de afiliados

### Q3 2024
- [ ] Expansión internacional
- [ ] Integración con wearables para mascotas
- [ ] Análisis predictivo de salud
- [ ] White-label para clínicas

---

**Desarrollado con ❤️ para el bienestar de nuestras mascotas**

[![Deploy](https://img.shields.io/badge/Deploy-Ready-green.svg)](https://github.com/daveymena/app-mascotas)
[![Monetization](https://img.shields.io/badge/Monetization-Integrated-gold.svg)](./MONETIZATION_GUIDE.md)