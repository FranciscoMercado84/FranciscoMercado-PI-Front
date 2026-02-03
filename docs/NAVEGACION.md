# Documentación de Navegación - Panadería Artesanal
## Sprint de Implementación de Navegación en React

---

## 📋 Tabla de Contenidos

1. [Arquitectura de Navegación](#arquitectura-de-navegación)
2. [Mapa de Rutas](#mapa-de-rutas)
3. [Layouts y Estructura](#layouts-y-estructura)
4. [Estados de Pantalla](#estados-de-pantalla)
5. [Rutas Protegidas](#rutas-protegidas)
6. [Correspondencia Figma → React](#correspondencia-figma--react)
7. [Decisiones Técnicas](#decisiones-técnicas)
8. [Checklist de Implementación](#checklist-de-implementación)

---

## 🏗️ Arquitectura de Navegación

### Estructura de Carpetas

```
src/
├── context/
│   └── AuthContext.tsx          # Gestión de autenticación
├── layouts/
│   ├── PublicLayout.tsx         # Layout para páginas públicas
│   ├── CustomerLayout.tsx       # Layout para área de clientes
│   └── AdminLayout.tsx          # Layout para área de administración
├── pages/
│   ├── public/                  # Páginas públicas (sin autenticación)
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── RecoverPage.tsx
│   ├── customer/                # Páginas de cliente (requiere autenticación)
│   │   ├── CatalogPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── OrdersPage.tsx
│   │   ├── OrderDetailPage.tsx
│   │   └── ProfilePage.tsx
│   ├── admin/                   # Páginas de administración (requiere rol admin)
│   │   ├── AdminLoginPage.tsx
│   │   ├── AdminDashboardPage.tsx
│   │   ├── AdminProductsPage.tsx
│   │   ├── AdminProductFormPage.tsx
│   │   ├── AdminOrdersPage.tsx
│   │   ├── AdminOrderDetailPage.tsx
│   │   ├── AdminReportsPage.tsx
│   │   └── AdminSettingsPage.tsx
│   ├── NotFoundPage.tsx         # Página 404
│   └── UnauthorizedPage.tsx     # Página de acceso denegado
├── components/
│   ├── common/
│   │   └── Navigation.tsx       # Componentes de navegación (CustomerNav, AdminNav)
│   └── states/
│       ├── LoadingState.tsx     # Estado de carga
│       ├── ErrorState.tsx       # Estado de error
│       ├── EmptyState.tsx       # Estado vacío
│       └── SuccessState.tsx     # Estado de éxito
└── router/
    ├── AppRouter.tsx            # Configuración principal de rutas
    └── ProtectedRoute.tsx       # Componente para rutas protegidas
```

---

## 🗺️ Mapa de Rutas

### Rutas Públicas (sin autenticación requerida)

| Ruta | Componente | Descripción | Figma Ref |
|------|-----------|-------------|-----------|
| `/` | LandingPage | Página de inicio con hero y CTA | HFLanding |
| `/login` | LoginPage | Inicio de sesión para clientes | HFLogin |
| `/register` | RegisterPage | Registro de nuevos usuarios | HFRegister |
| `/recover` | RecoverPage | Recuperación de contraseña | HFPasswordRecovery |
| `/admin/login` | AdminLoginPage | Inicio de sesión para administradores | HFAdminLogin |

### Rutas de Cliente (requiere autenticación)

| Ruta | Componente | Descripción | Estados | Figma Ref |
|------|-----------|-------------|---------|-----------|
| `/catalog` | CatalogPage | Catálogo de productos | Loading, Error | HFProductCatalog |
| `/product/:id` | ProductDetailPage | Detalle de producto | - | HFProductDetail |
| `/cart` | CartPage | Carrito de compras | Empty | HFCart / HFCartEmpty |
| `/checkout` | CheckoutPage | Proceso de pago | Success | HFCheckout |
| `/orders` | OrdersPage | Historial de pedidos | Loading, Empty | HFOrderHistory |
| `/order/:id` | OrderDetailPage | Detalle de pedido | - | HFOrderDetail |
| `/profile` | ProfilePage | Perfil de usuario | - | HFProfile |

### Rutas de Administración (requiere autenticación + rol admin)

| Ruta | Componente | Descripción | Estados | Figma Ref |
|------|-----------|-------------|---------|-----------|
| `/admin` | → `/admin/dashboard` | Redirección al dashboard | - | - |
| `/admin/dashboard` | AdminDashboardPage | Panel principal admin | Loading | HFAdminDashboard |
| `/admin/products` | AdminProductsPage | Lista de productos | Loading, Empty | HFAdminProducts |
| `/admin/products/new` | AdminProductFormPage | Crear producto | Success | HFAdminProductForm |
| `/admin/products/edit/:id` | AdminProductFormPage | Editar producto | Success | HFAdminProductForm |
| `/admin/orders` | AdminOrdersPage | Gestión de pedidos | Loading, Empty | HFAdminOrders |
| `/admin/orders/:id` | AdminOrderDetailPage | Detalle de pedido (admin) | - | HFAdminOrderDetail |
| `/admin/reports` | AdminReportsPage | Reportes y estadísticas | Loading | HFReports |
| `/admin/settings` | AdminSettingsPage | Configuración del sistema | - | HFAdminSettings |

### Rutas Especiales

| Ruta | Componente | Descripción | Cuándo se muestra |
|------|-----------|-------------|-------------------|
| `/unauthorized` | UnauthorizedPage | Acceso no autorizado | Usuario autenticado intenta acceder a ruta de admin sin permisos |
| `*` | NotFoundPage | Página no encontrada | Cualquier ruta no definida (404) |

---

## 📐 Layouts y Estructura

### PublicLayout
**Usado en:** Rutas públicas (`/`, `/login`, `/register`, `/recover`)

- Sin navegación persistente
- Fondo limpio con branding mínimo
- Cada página controla su propio diseño

### CustomerLayout
**Usado en:** Rutas de clientes autenticados

**Características:**
- **Header fijo** con:
  - Logo y nombre de la panadería
  - Navegación: Catálogo, Carrito, Mis Pedidos
  - Perfil de usuario y botón de logout
- **Contenedor principal** centrado (max-width: 1400px)
- **Componente:** `CustomerNav`

### AdminLayout
**Usado en:** Rutas de administración

**Características:**
- **Header oscuro** con:
  - Logo "Admin Panel"
  - Navegación: Dashboard, Productos, Pedidos, Reportes, Configuración
  - Botón de logout
- **Contenedor principal** más amplio (max-width: 1600px)
- **Componente:** `AdminNav`
- **Estilo diferenciado** para distinguir del área de clientes

---

## 🔄 Estados de Pantalla

Todas las pantallas clave implementan variaciones de estado según corresponda:

### LoadingState
**Componente:** `LoadingState.tsx`

**Usado en:**
- CatalogPage (carga de productos)
- OrdersPage (carga de pedidos)
- AdminDashboardPage (carga de métricas)
- AdminProductsPage (carga de productos)
- AdminOrdersPage (carga de pedidos)
- AdminReportsPage (generación de reportes)

**Props:**
- `message`: Texto personalizado (ej: "Cargando productos...")

### ErrorState
**Componente:** `ErrorState.tsx`

**Usado en:**
- CatalogPage (error al cargar productos)
- LoginPage (error de autenticación)

**Props:**
- `title`: Título del error
- `message`: Descripción del error
- `onRetry`: Función para reintentar

### EmptyState
**Componente:** `EmptyState.tsx`

**Usado en:**
- CartPage (carrito vacío → HFCartEmpty)
- OrdersPage (sin pedidos)
- AdminProductsPage (sin productos)
- AdminOrdersPage (sin pedidos)

**Props:**
- `title`: Título del estado vacío
- `message`: Descripción
- `actionLabel`: Texto del botón de acción
- `onAction`: Función al hacer clic
- `icon`: Ícono personalizado

### SuccessState
**Componente:** `SuccessState.tsx`

**Usado en:**
- CheckoutPage (pedido confirmado)
- AdminProductFormPage (producto creado/actualizado)

**Props:**
- `title`: Título de éxito
- `message`: Descripción
- `actionLabel`: Texto del botón de acción
- `onAction`: Función al hacer clic

---

## 🔒 Rutas Protegidas

### Sistema de Autenticación

**Contexto:** `AuthContext.tsx`

**Características:**
- Gestión de estado de usuario (autenticado/no autenticado)
- Diferenciación de roles (`customer` | `admin`)
- Persistencia en localStorage
- Login/logout simulado (ready para integrar API real)

### ProtectedRoute Component

**Archivo:** `ProtectedRoute.tsx`

**Lógica:**
1. **Si no está autenticado:**
   - Redirige a `/login` (rutas de cliente)
   - Redirige a `/admin/login` (rutas de admin)
   - Guarda la ubicación original para redirigir después del login

2. **Si está autenticado pero no es admin:**
   - Redirige a `/unauthorized` cuando intenta acceder a rutas admin

3. **Si está autenticado y tiene permisos:**
   - Renderiza el contenido protegido

**Uso:**
```tsx
// Proteger rutas de cliente
<ProtectedRoute>
  <CustomerLayout />
</ProtectedRoute>

// Proteger rutas de admin
<ProtectedRoute requireAdmin={true}>
  <AdminLayout />
</ProtectedRoute>
```

---

## 🎨 Correspondencia Figma → React

### Pantallas Públicas

| Pantalla Figma | Ruta React | Componente HF | Wrapper Page |
|----------------|------------|---------------|--------------|
| HFLanding | `/` | HFLanding | LandingPage |
| HFLogin | `/login` | HFLogin | LoginPage |
| HFRegister | `/register` | HFRegister | RegisterPage |
| HFPasswordRecovery | `/recover` | HFPasswordRecovery | RecoverPage |

### Pantallas de Cliente

| Pantalla Figma | Ruta React | Componente HF | Wrapper Page | Estados |
|----------------|------------|---------------|--------------|---------|
| HFProductCatalog | `/catalog` | HFProductCatalog | CatalogPage | Loading, Error |
| HFProductDetail | `/product/:id` | HFProductDetail | ProductDetailPage | - |
| HFCart | `/cart` | HFCart | CartPage | - |
| HFCartEmpty | `/cart` | HFCartEmpty | CartPage (empty) | Empty |
| HFCheckout | `/checkout` | HFCheckout | CheckoutPage | Success |
| HFOrderHistory | `/orders` | HFOrderHistory | OrdersPage | Loading, Empty |
| HFOrderDetail | `/order/:id` | HFOrderDetail | OrderDetailPage | - |
| HFProfile | `/profile` | HFProfile | ProfilePage | - |

### Pantallas de Administración

| Pantalla Figma | Ruta React | Componente HF | Wrapper Page | Estados |
|----------------|------------|---------------|--------------|---------|
| HFAdminLogin | `/admin/login` | HFAdminLogin | AdminLoginPage | - |
| HFAdminDashboard | `/admin/dashboard` | HFAdminDashboard | AdminDashboardPage | Loading |
| HFAdminProducts | `/admin/products` | HFAdminProducts | AdminProductsPage | Loading, Empty |
| HFAdminProductForm | `/admin/products/new` | HFAdminProductForm | AdminProductFormPage | Success |
| HFAdminProductForm | `/admin/products/edit/:id` | HFAdminProductForm | AdminProductFormPage | Success |
| HFAdminOrders | `/admin/orders` | HFAdminOrders | AdminOrdersPage | Loading, Empty |
| HFAdminOrderDetail | `/admin/orders/:id` | HFAdminOrderDetail | AdminOrderDetailPage | - |
| HFReports | `/admin/reports` | HFReports | AdminReportsPage | Loading |
| HFAdminSettings | `/admin/settings` | HFAdminSettings | AdminSettingsPage | - |

### Pantallas No en Figma (generadas para robustez)

| Descripción | Ruta React | Componente |
|-------------|------------|------------|
| Página 404 | `*` | NotFoundPage |
| Acceso denegado | `/unauthorized` | UnauthorizedPage |

---

## 🛠️ Decisiones Técnicas

### 1. React Router v6
**Razón:** Estándar de facto para navegación en React, excelente integración con TypeScript.

**Características usadas:**
- `<BrowserRouter>` para historial de navegación
- Rutas anidadas con `<Outlet />`
- `useNavigate()` para navegación programática
- `useParams()` para parámetros dinámicos
- `useLocation()` para obtener ubicación actual
- `<Navigate>` para redirecciones

### 2. Patrón de Wrapper Pages
**Razón:** Los componentes HF originales de Figma son "presentacionales" con navegación simulada mediante `onNavigate`. 

**Solución:** Cada componente HF se envuelve en una "Page" que:
- Gestiona la navegación real con React Router
- Maneja estados de carga/error
- Integra lógica de negocio (simulada por ahora)
- Facilita futura integración con API

**Ejemplo:**
```tsx
// CatalogPage.tsx - Wrapper
export const CatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  const handleNavigate = (screenId: string) => {
    navigate('/product/1'); // Navegación real
  };
  
  if (isLoading) return <LoadingState />;
  return <HFProductCatalog onNavigate={handleNavigate} />;
};
```

### 3. Layouts Reutilizables
**Razón:** Evitar duplicación de código en navegación y estructura.

**Beneficios:**
- Un solo lugar para modificar el header/footer
- Coherencia visual garantizada
- Fácil mantenimiento

### 4. Context API para Autenticación
**Razón:** Estado global accesible desde cualquier componente sin prop drilling.

**Alternativas consideradas:**
- Redux: Overkill para este caso
- Zustand: Más simple pero Context API es suficiente y nativo

### 5. Simulación de Datos
**Razón:** El sprint se enfoca en navegación, no en lógica de negocio.

**Implementación:**
- Timeouts para simular carga (`setTimeout`)
- Estados locales para datos mock
- Comentarios `// TODO: Integrar con API real`

---

## ✅ Checklist de Implementación

### Actividad 1 - Arquitectura de Rutas y Layouts

- [x] Definir mapa de rutas completo
- [x] Implementar React Router en el proyecto
- [x] Crear rutas públicas (login, registro, landing, recuperación)
- [x] Crear rutas privadas de cliente (catálogo, carrito, pedidos, perfil)
- [x] Crear rutas privadas de admin (dashboard, productos, pedidos, reportes, configuración)
- [x] Crear PublicLayout
- [x] Crear CustomerLayout con navegación
- [x] Crear AdminLayout con navegación diferenciada
- [x] Crear ruta 404 (NotFoundPage)
- [x] Crear ruta No autorizado (UnauthorizedPage)

### Actividad 2 - Flujo Navegable Completo

- [x] Implementar flujo: Landing → Login → Catálogo → Producto → Carrito → Checkout → Confirmación
- [x] Implementar flujo: Catálogo → Perfil
- [x] Implementar flujo: Catálogo → Mis Pedidos → Detalle de Pedido
- [x] Implementar flujo admin: Login → Dashboard → Productos → Formulario de Producto
- [x] Implementar flujo admin: Dashboard → Pedidos → Detalle de Pedido
- [x] Implementar flujo admin: Dashboard → Reportes
- [x] Implementar flujo admin: Dashboard → Configuración
- [x] Implementar navegación con botón Logout (cliente y admin)
- [x] Implementar breadcrumbs o navegación contextual en layouts

### Actividad 3 - Estados de Pantalla

- [x] Crear componente LoadingState
- [x] Crear componente ErrorState
- [x] Crear componente EmptyState
- [x] Crear componente SuccessState
- [x] Implementar Loading en: CatalogPage, OrdersPage, AdminDashboardPage, AdminProductsPage, AdminOrdersPage, AdminReportsPage
- [x] Implementar Error en: CatalogPage, LoginPage
- [x] Implementar Empty en: CartPage, OrdersPage, AdminProductsPage, AdminOrdersPage
- [x] Implementar Success en: CheckoutPage, AdminProductFormPage
- [x] Verificar que no existen rutas muertas

### Actividad 4 - Documentación

- [x] Crear tabla Ruta → Pantalla → Descripción → Figma
- [x] Documentar decisiones técnicas (layouts, rutas protegidas, estructura)
- [x] Documentar correspondencia Figma → Rutas
- [x] Crear checklist de pantallas implementadas y navegables
- [x] Documentar estados implementados por pantalla

---

## 🚀 Cómo Usar la Aplicación

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:3000`

### 3. Navegación como Cliente

1. Ir a `/` (Landing)
2. Hacer clic en "Iniciar sesión"
3. Completar formulario (cualquier email/password - es simulado)
4. Navegar por: Catálogo → Producto → Carrito → Checkout → Pedidos

### 4. Navegación como Admin

1. Ir a `/admin/login`
2. Completar formulario (email: admin@panaderia.com, password: cualquiera)
3. Navegar por: Dashboard → Productos → Pedidos → Reportes → Configuración

### 5. Probar Rutas Especiales

- Ir a una ruta inexistente (ej: `/asdfasdf`) → Ver 404
- Intentar acceder a `/admin/dashboard` sin autenticarse → Redirige a login
- Autenticarse como cliente e ir a `/admin/dashboard` → Ver página No autorizado

---

## 📝 Notas Finales

### Cobertura Completa ✅
Todas las pantallas definidas en Figma están implementadas y son navegables.

### Coherencia con Figma ✅
La estructura de navegación replica fielmente el prototipo de Figma.

### Rutas Protegidas ✅
Sistema de autenticación y autorización implementado con roles.

### Estados Implementados ✅
Loading, Error, Empty y Success implementados en pantallas clave.

### Robustez ✅
Manejo de 404, rutas muertas, y accesos no autorizados.

### Listo para Integración ✅
La estructura está preparada para conectar con APIs reales reemplazando los datos simulados.

---

## 📞 Contacto y Siguientes Pasos

### Siguientes Sprints Sugeridos

1. **Sprint de Integración con Backend**
   - Conectar con API real
   - Reemplazar datos mock con llamadas HTTP
   - Gestión de tokens JWT

2. **Sprint de Formularios y Validación**
   - Validación en formularios de login/registro
   - Validación en formularios de productos (admin)
   - Feedback visual de validación

3. **Sprint de Gestión de Estado Global**
   - Implementar carrito persistente
   - Gestión de pedidos en tiempo real
   - Optimización de renders

4. **Sprint de Testing**
   - Tests unitarios de componentes
   - Tests de integración de rutas
   - Tests E2E del flujo completo

---

**Documentación generada:** Enero 2026  
**Versión:** 1.0.0  
**Estado:** ✅ Implementación completa del Sprint de Navegación
