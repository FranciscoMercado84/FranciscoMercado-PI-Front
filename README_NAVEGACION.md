# 🥖 Panadería Artesanal - Sistema de Pedidos Online

> Sistema completo de pedidos online con navegación funcional, autenticación y gestión de productos/pedidos.

## 📋 Descripción del Proyecto

Aplicación React desarrollada con JavaScript y Vite que implementa un sistema completo de comercio electrónico para una panadería artesanal. El proyecto incluye:

- ✅ **Navegación completa** con React Router
- ✅ **Autenticación y autorización** (roles: cliente/admin)
- ✅ **Layouts diferenciados** (público/cliente/admin)
- ✅ **Estados de UI** (loading/error/empty/success)
- ✅ **Rutas protegidas** por autenticación y rol
- ✅ **Diseño basado en Figma** con componentes de alta fidelidad

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18.x o superior
- npm 9.x o superior

### Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd panaderia-frontend

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev

# 4. Abrir en el navegador
# La aplicación se abrirá automáticamente en http://localhost:3000
```

### Scripts Disponibles

```bash
npm run dev      # Ejecutar servidor de desarrollo
npm run build    # Compilar para producción
npm run preview  # Previsualizar build de producción
```

## 🗺️ Estructura del Proyecto

```
panaderia-frontend/
├── src/                          # Código fuente de la aplicación
│   ├── context/                  # Contextos de React (AuthContext)
│   ├── layouts/                  # Layouts reutilizables
│   │   ├── PublicLayout.jsx
│   │   ├── CustomerLayout.jsx
│   │   └── AdminLayout.jsx
│   ├── pages/                    # Páginas de la aplicación
│   │   ├── public/              # Páginas públicas
│   │   ├── customer/            # Páginas de cliente
│   │   └── admin/               # Páginas de administración
│   ├── components/               # Componentes reutilizables
│   │   ├── common/              # Navegación, header, footer
│   │   └── states/              # Estados de UI
│   ├── router/                   # Configuración de rutas
│   ├── App.jsx                   # Componente principal
│   └── index.jsx                # Punto de entrada
├── components/                   # Componentes de Figma (HF)
├── styles/                       # Estilos globales
├── docs/                         # Documentación
│   └── NAVEGACION.md            # Doc. completa de navegación
├── index.html
├── vite.config.js
└── package.json
```

## 🔐 Flujos de Usuario

### Flujo de Cliente

```
1. Landing (/) 
   → Login (/login)
   → Catálogo (/catalog)
   → Detalle de Producto (/product/:id)
   → Carrito (/cart)
   → Checkout (/checkout)
   → Confirmación (success state)
   → Mis Pedidos (/orders)
   → Detalle de Pedido (/order/:id)
   → Perfil (/profile)
```

### Flujo de Administrador

```
1. Admin Login (/admin/login)
   → Dashboard (/admin/dashboard)
   → Productos (/admin/products)
   → Crear/Editar Producto (/admin/products/new o /edit/:id)
   → Gestión de Pedidos (/admin/orders)
   → Detalle de Pedido (/admin/orders/:id)
   → Reportes (/admin/reports)
   → Configuración (/admin/settings)
```

## 🎯 Características Implementadas

### ✅ Navegación Completa
- React Router v6 con rutas anidadas
- Navegación programática
- Parámetros dinámicos (`:id`)
- Historial de navegación

### ✅ Autenticación y Autorización
- Context API para gestión de estado
- Roles: `customer` y `admin`
- Rutas protegidas con redirección automática
- Persistencia de sesión (localStorage)
- Login/logout funcional

### ✅ Layouts Diferenciados
- **PublicLayout**: Páginas públicas sin navegación
- **CustomerLayout**: Header con navegación de cliente
- **AdminLayout**: Header oscuro con navegación de admin

### ✅ Estados de UI
- **LoadingState**: Indicador de carga con spinner
- **ErrorState**: Mensaje de error con botón de reintento
- **EmptyState**: Estado vacío con acción sugerida
- **SuccessState**: Confirmación de acción exitosa

### ✅ Rutas Especiales
- **404 NotFound**: Página no encontrada
- **Unauthorized**: Acceso denegado (sin permisos)

## 🔑 Credenciales de Prueba

### Cliente
```
Email: cualquier-email@example.com
Password: cualquier-contraseña
```

### Administrador
```
Email: admin@panaderia.com
Password: cualquier-contraseña
```

> **Nota:** La autenticación es simulada. Cualquier email/password funciona. El rol se determina en la página de login.

## 📱 Páginas Implementadas

### Área Pública (21 rutas totales)
- ✅ Landing Page
- ✅ Login
- ✅ Registro
- ✅ Recuperación de contraseña
- ✅ Admin Login

### Área de Cliente (7 rutas)
- ✅ Catálogo de productos
- ✅ Detalle de producto
- ✅ Carrito de compras
- ✅ Proceso de checkout
- ✅ Historial de pedidos
- ✅ Detalle de pedido
- ✅ Perfil de usuario

### Área de Administración (8 rutas)
- ✅ Dashboard
- ✅ Gestión de productos
- ✅ Formulario de producto (crear/editar)
- ✅ Gestión de pedidos
- ✅ Detalle de pedido (admin)
- ✅ Reportes y estadísticas
- ✅ Configuración del sistema
- ✅ Gestión de categorías/horarios

### Páginas Especiales (2 rutas)
- ✅ 404 Not Found
- ✅ Unauthorized (acceso denegado)

## 🎨 Correspondencia con Figma

Todas las pantallas implementadas corresponden 1:1 con los diseños de Figma:

- HFLanding → `/`
- HFLogin → `/login`
- HFRegister → `/register`
- HFProductCatalog → `/catalog`
- HFCart/HFCartEmpty → `/cart`
- HFCheckout → `/checkout`
- HFAdminDashboard → `/admin/dashboard`
- HFAdminProducts → `/admin/products`
- ... y 25+ pantallas más

Ver documentación completa en [`docs/NAVEGACION.md`](docs/NAVEGACION.md)

## 📚 Documentación Completa

Para información detallada sobre:
- Arquitectura de navegación
- Mapa completo de rutas
- Decisiones técnicas
- Estados implementados
- Correspondencia Figma → React

Consulta: **[docs/NAVEGACION.md](docs/NAVEGACION.md)**

## 🛠️ Tecnologías Utilizadas

- **React** 18.2 - Librería de UI
- **JavaScript** ES6+ - Lenguaje de programación
- **Vite** 5.0 - Build tool y dev server
- **React Router** 6.21 - Navegación
- **Lucide React** - Iconos
- **CSS Variables** - Sistema de diseño

## 🧪 Testing

```bash
# Probar navegación básica
1. Ir a http://localhost:3000
2. Hacer clic en "Iniciar sesión"
3. Ingresar cualquier email/password
4. Verificar redirección al catálogo
5. Navegar entre secciones

# Probar rutas protegidas
1. Copiar URL del catálogo
2. Hacer logout
3. Pegar la URL → Debe redirigir a login

# Probar área de admin
1. Ir a /admin/login
2. Completar formulario
3. Verificar acceso al dashboard
4. Intentar acceder como cliente → Ver "No autorizado"

# Probar página 404
1. Ir a /ruta-inexistente
2. Verificar página 404 con opciones de navegación
```

## 🚧 Próximos Pasos (Futuros Sprints)

1. **Integración con Backend**
   - API REST para productos/pedidos
   - Autenticación JWT
   - Gestión de imágenes

2. **Validación de Formularios**
   - React Hook Form
   - Validación en tiempo real
   - Mensajes de error descriptivos

3. **Gestión de Estado Avanzada**
   - Context para carrito persistente
   - Optimización de renders
   - Cache de datos

4. **Testing Automatizado**
   - Tests unitarios (Vitest)
   - Tests de integración
   - Tests E2E (Playwright)

## 📄 Licencia

ISC

## 👤 Autor

Proyecto Intermodular - Panadería Artesanal

---

**¿Necesitas ayuda?** Revisa la documentación en [`docs/NAVEGACION.md`](docs/NAVEGACION.md) o abre un issue.
