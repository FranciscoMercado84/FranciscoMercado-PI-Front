# 🗺️ Mapa de Rutas - Diagrama Visual

```
📱 PANADERÍA ARTESANAL - SISTEMA DE NAVEGACIÓN
===============================================

┌─────────────────────────────────────────────────────────────┐
│                    RUTAS PÚBLICAS (Sin Auth)                 │
└─────────────────────────────────────────────────────────────┘

    /                          Landing Page
    ├── /login                 Login Cliente
    ├── /register              Registro
    └── /recover               Recuperar Contraseña


┌─────────────────────────────────────────────────────────────┐
│              RUTAS DE CLIENTE (Require Auth)                 │
└─────────────────────────────────────────────────────────────┘

    /catalog                   Catálogo de Productos
    │
    ├── /product/:id           Detalle de Producto
    │
    ├── /cart                  Carrito de Compras
    │   └── [Estado: Empty]    → Si el carrito está vacío
    │
    ├── /checkout              Proceso de Pago
    │   └── [Estado: Success]  → Confirmación de pedido
    │
    ├── /orders                Historial de Pedidos
    │   ├── [Estado: Loading]  → Cargando pedidos
    │   ├── [Estado: Empty]    → Sin pedidos
    │   └── /order/:id         → Detalle de Pedido
    │
    └── /profile               Perfil de Usuario


┌─────────────────────────────────────────────────────────────┐
│                ÁREA DE ADMINISTRACIÓN                        │
└─────────────────────────────────────────────────────────────┘

    /admin/login               Login Admin (Público)
    │
    └── /admin                 → Redirige a /admin/dashboard
        │
        ├── /admin/dashboard          Dashboard Principal
        │   └── [Estado: Loading]     → Cargando métricas
        │
        ├── /admin/products           Gestión de Productos
        │   ├── [Estado: Loading]     → Cargando productos
        │   ├── [Estado: Empty]       → Sin productos
        │   ├── /new                  → Crear Producto
        │   └── /edit/:id             → Editar Producto
        │       └── [Estado: Success] → Producto guardado
        │
        ├── /admin/orders             Gestión de Pedidos
        │   ├── [Estado: Loading]     → Cargando pedidos
        │   ├── [Estado: Empty]       → Sin pedidos
        │   └── /:id                  → Detalle de Pedido
        │
        ├── /admin/reports            Reportes
        │   └── [Estado: Loading]     → Generando reportes
        │
        └── /admin/settings           Configuración


┌─────────────────────────────────────────────────────────────┐
│                   RUTAS ESPECIALES                           │
└─────────────────────────────────────────────────────────────┘

    /unauthorized              Acceso No Autorizado (403)
    /*                         Página No Encontrada (404)


═══════════════════════════════════════════════════════════════
                        FLUJOS PRINCIPALES
═══════════════════════════════════════════════════════════════

🛒 FLUJO DE COMPRA (Cliente)
─────────────────────────────
    Landing → Login → Catálogo → Producto → Carrito 
    → Checkout → [Success] → Pedidos → Detalle


👤 FLUJO DE GESTIÓN (Admin)
─────────────────────────────
    Admin Login → Dashboard → Productos → Nuevo Producto 
    → [Success] → Lista de Productos


📊 FLUJO DE REPORTES (Admin)
─────────────────────────────
    Dashboard → Reportes → [Loading] → Vista de Reportes


⚙️ FLUJO DE CONFIGURACIÓN (Admin)
──────────────────────────────────
    Dashboard → Settings → Configurar Sistema


═══════════════════════════════════════════════════════════════
                     PROTECCIÓN DE RUTAS
═══════════════════════════════════════════════════════════════

┌──────────────────┬──────────────────┬─────────────────────┐
│      Ruta        │  Autenticación   │        Rol          │
├──────────────────┼──────────────────┼─────────────────────┤
│ Públicas         │ ❌ No requerida  │ Cualquiera          │
│ /catalog, etc.   │ ✅ Requerida     │ Customer (o Admin)  │
│ /admin/*         │ ✅ Requerida     │ Admin únicamente    │
└──────────────────┴──────────────────┴─────────────────────┘

Comportamiento:
• Sin auth → Redirige a /login (o /admin/login)
• Auth sin rol admin → Redirige a /unauthorized (rutas admin)
• Auth con permisos → Acceso permitido ✅


═══════════════════════════════════════════════════════════════
                      LAYOUTS UTILIZADOS
═══════════════════════════════════════════════════════════════

📄 PublicLayout
   → Rutas: /, /login, /register, /recover
   → Sin navegación persistente
   → Diseño minimalista

🏪 CustomerLayout
   → Rutas: /catalog, /cart, /orders, /profile, etc.
   → Header con navegación de cliente
   → Logo, menú, perfil, logout

⚙️ AdminLayout
   → Rutas: /admin/*
   → Header oscuro con navegación de admin
   → Dashboard, productos, pedidos, reportes, config


═══════════════════════════════════════════════════════════════
                    ESTADOS IMPLEMENTADOS
═══════════════════════════════════════════════════════════════

⏳ LoadingState
   Usado en: Catálogo, Pedidos, Dashboard, Productos (Admin),
             Pedidos (Admin), Reportes

❌ ErrorState
   Usado en: Catálogo, Login (si falla autenticación)

📭 EmptyState
   Usado en: Carrito vacío, Sin pedidos, Sin productos (Admin),
             Sin pedidos (Admin)

✅ SuccessState
   Usado en: Checkout confirmado, Producto creado/actualizado


═══════════════════════════════════════════════════════════════
             CORRESPONDENCIA FIGMA → REACT
═══════════════════════════════════════════════════════════════

Componente Figma          │ Ruta React           │ Wrapper Page
──────────────────────────┼──────────────────────┼───────────────────
HFLanding                 │ /                    │ LandingPage
HFLogin                   │ /login               │ LoginPage
HFRegister                │ /register            │ RegisterPage
HFPasswordRecovery        │ /recover             │ RecoverPage
HFProductCatalog          │ /catalog             │ CatalogPage
HFProductDetail           │ /product/:id         │ ProductDetailPage
HFCart                    │ /cart                │ CartPage
HFCartEmpty               │ /cart (empty)        │ CartPage
HFCheckout                │ /checkout            │ CheckoutPage
HFOrderHistory            │ /orders              │ OrdersPage
HFOrderDetail             │ /order/:id           │ OrderDetailPage
HFProfile                 │ /profile             │ ProfilePage
HFAdminLogin              │ /admin/login         │ AdminLoginPage
HFAdminDashboard          │ /admin/dashboard     │ AdminDashboardPage
HFAdminProducts           │ /admin/products      │ AdminProductsPage
HFAdminProductForm        │ /admin/products/new  │ AdminProductFormPage
HFAdminOrders             │ /admin/orders        │ AdminOrdersPage
HFAdminOrderDetail        │ /admin/orders/:id    │ AdminOrderDetailPage
HFReports                 │ /admin/reports       │ AdminReportsPage
HFAdminSettings           │ /admin/settings      │ AdminSettingsPage

Total: 20+ pantallas de Figma → 20+ rutas React ✅


═══════════════════════════════════════════════════════════════
                      ARCHIVOS CLAVE
═══════════════════════════════════════════════════════════════

📂 Configuración de Rutas:
   src/router/AppRouter.tsx         → Configuración central
   src/router/ProtectedRoute.tsx    → Lógica de protección

📂 Contextos:
   src/context/AuthContext.tsx      → Gestión de autenticación

📂 Layouts:
   src/layouts/PublicLayout.tsx     → Layout público
   src/layouts/CustomerLayout.tsx   → Layout de cliente
   src/layouts/AdminLayout.tsx      → Layout de admin

📂 Navegación:
   src/components/common/Navigation.tsx → CustomerNav, AdminNav

📂 Estados:
   src/components/states/LoadingState.tsx
   src/components/states/ErrorState.tsx
   src/components/states/EmptyState.tsx
   src/components/states/SuccessState.tsx

📂 Páginas Especiales:
   src/pages/NotFoundPage.tsx       → 404
   src/pages/UnauthorizedPage.tsx   → 403

```
