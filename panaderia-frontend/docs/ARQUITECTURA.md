# Arquitectura de Navegación - Panadería Frontend

## 📐 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                         App.jsx                              │
│                           │                                  │
│                      AppRouter                               │
│                           │                                  │
│                    BrowserRouter                             │
│                           │                                  │
│                     AuthProvider                             │
│                           │                                  │
│                        Routes                                │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   PUBLIC ROUTES      CUSTOMER ROUTES      ADMIN ROUTES
        │                   │                   │
┌───────▼──────┐   ┌────────▼────────┐  ┌──────▼──────┐
│PublicLayout  │   │CustomerLayout   │  │AdminLayout  │
├──────────────┤   ├─────────────────┤  ├─────────────┤
│ • Landing    │   │ HFHeader        │  │ Sidebar     │
│ • Login      │   │   (sticky)      │  │ Header      │
│ • Register   │   │ ↓               │  │ ↓           │
│ • Recover    │   │ <Outlet />      │  │ <Outlet />  │
│              │   │ ↓               │  │             │
│              │   │ HFFooter        │  │             │
└──────────────┘   └─────────────────┘  └─────────────┘
```

## 🗂️ Estructura de Carpetas

```
panaderia-frontend/
├── src/
│   ├── App.jsx                    # Punto de entrada
│   │
│   ├── router/
│   │   ├── AppRouter.jsx          # Configuración de rutas (22 rutas)
│   │   └── ProtectedRoute.jsx     # HOC para rutas protegidas
│   │
│   ├── layouts/
│   │   ├── PublicLayout.jsx       # Layout sin navegación
│   │   ├── CustomerLayout.jsx     # Header + Footer + Outlet
│   │   └── AdminLayout.jsx        # Sidebar + Header + Outlet
│   │
│   ├── pages/
│   │   ├── public/                # 8 páginas públicas
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── RecoverPage.jsx
│   │   │
│   │   ├── customer/              # 7 páginas cliente
│   │   │   ├── CatalogPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── OrdersPage.jsx
│   │   │   ├── OrderDetailPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   │
│   │   ├── admin/                 # 9 páginas admin
│   │   │   ├── AdminLoginPage.jsx
│   │   │   ├── AdminDashboardPage.jsx
│   │   │   ├── AdminProductsPage.jsx
│   │   │   ├── AdminProductFormPage.jsx
│   │   │   ├── AdminOrdersPage.jsx
│   │   │   ├── AdminOrderDetailPage.jsx
│   │   │   ├── AdminReportsPage.jsx
│   │   │   └── AdminSettingsPage.jsx
│   │   │
│   │   ├── NotFoundPage.jsx       # 404
│   │   └── UnauthorizedPage.jsx   # 403
│   │
│   ├── context/
│   │   └── AuthContext.jsx        # Estado global autenticación
│   │
│   └── components/
│       ├── states/                # Estados de UI
│       │   ├── LoadingState.jsx
│       │   ├── EmptyState.jsx
│       │   └── ErrorState.jsx
│       │
│       └── design-system/
│           └── high-fidelity/     # 25+ componentes Figma
│               ├── HFHeader.jsx
│               ├── HFFooter.jsx
│               ├── HFLanding.jsx
│               ├── HFCart.jsx
│               ├── HFCheckout.jsx
│               ├── HFOrderDetail.jsx
│               ├── HFAdminDashboard.jsx
│               ├── HFAdminProducts.jsx
│               ├── HFAdminOrders.jsx
│               └── ...
│
├── docs/
│   ├── NAVEGACION.md             # Este documento (completo)
│   └── ARQUITECTURA.md           # Decisiones técnicas
│
└── package.json
```

## 🎯 Patrones de Diseño Implementados

### 1. Container/Presentational Pattern

**Páginas (Containers):**
- Manejan lógica de negocio
- Gestionan estado local
- Implementan navegación con React Router
- Pasan datos y callbacks a componentes HF

**Componentes HF (Presentational):**
- Solo renderizado UI
- Reciben datos vía props
- Emiten eventos vía callbacks (`onNavigate`)
- Sin conocimiento de React Router

### 2. Protected Routes (HOC Pattern)

```jsx
// ProtectedRoute.jsx
export const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <LoadingState />;
  if (!user) return <Navigate to="/login" />;
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};
```

### 3. Layout Pattern

```jsx
// CustomerLayout.jsx
export const CustomerLayout = () => {
  return (
    <>
      <HFHeader {...props} />
      <Outlet />  {/* Rutas hijas se renderizan aquí */}
      <HFFooter {...props} />
    </>
  );
};
```

### 4. Context API para Autenticación

```jsx
// AuthContext.jsx
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Persistencia con localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    // Simulated API call
    const userData = { id: 1, email: credentials.email, role: 'customer' };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

## 🔄 Flujo de Datos

### Navegación en Componentes HF

```
┌──────────────┐
│  CartPage    │ (Container)
└──────┬───────┘
       │ 1. Define handleNavigate
       │ 2. Pasa onNavigate prop
       ▼
┌──────────────┐
│   HFCart     │ (Presentational)
└──────┬───────┘
       │ 3. Usuario hace clic
       │ 4. Llama onNavigate('checkout')
       ▼
┌──────────────┐
│ handleNavigate│
└──────┬───────┘
       │ 5. Mapea 'checkout' → '/checkout'
       │ 6. navigate('/checkout')
       ▼
┌──────────────┐
│React Router  │
└──────┬───────┘
       │ 7. Renderiza CheckoutPage
       ▼
┌──────────────┐
│ CheckoutPage │
└──────────────┘
```

### Autenticación y Rutas Protegidas

```
Usuario intenta acceder a /checkout
       │
       ▼
┌──────────────────┐
│ ProtectedRoute   │
└────────┬─────────┘
         │ 1. useAuth() → obtiene user, isLoading
         │
         ├─ isLoading = true → <LoadingState />
         │
         ├─ user = null → <Navigate to="/login" />
         │
         ├─ requireAdmin && user.role !== 'admin'
         │  → <Navigate to="/unauthorized" />
         │
         └─ Autorizado → {children}
                           │
                           ▼
                    ┌──────────────┐
                    │CustomerLayout│
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │CheckoutPage  │
                    └──────────────┘
```

## 🔑 Decisiones Técnicas Clave

### 1. ¿Por qué React Router v6?
- **Requerimiento del módulo**
- API más limpia que v5 (rutas como JSX, no config objects)
- Mejor TypeScript support (aunque usamos JS)
- Rutas anidadas más intuitivas con `<Outlet />`

### 2. ¿Por qué Context API en lugar de Redux?
- **Alcance:** Solo autenticación, no state management complejo
- **Simplicidad:** Menos boilerplate
- **Performance:** Suficiente para este caso de uso
- **Mantenibilidad:** Más fácil de entender para el equipo

### 3. ¿Por qué localStorage para persistencia?
- **Simplicidad:** API nativa del browser
- **Sincronía:** Lectura/escritura inmediata
- **Alcance:** Suficiente para demo/prototipo
- **Limitación conocida:** No es seguro para tokens reales (usar httpOnly cookies en producción)

### 4. ¿Por qué separar páginas de componentes HF?
- **Separación de responsabilidades:** Lógica vs. presentación
- **Reutilización:** Componentes HF pueden usarse en diferentes páginas
- **Testing:** Más fácil testear componentes sin lógica de navegación
- **Mantenimiento:** Cambios en Figma solo afectan componentes HF

### 5. ¿Por qué tres layouts diferentes?
- **PublicLayout:** Sin distracciones para login/registro
- **CustomerLayout:** Navegación completa para experiencia de compra
- **AdminLayout:** Herramientas administrativas siempre visibles
- **Optimización:** Cada layout carga solo lo necesario

### 6. ¿Por qué simulación de loading states?
- **Realismo:** Simular comportamiento real de API
- **UX:** Feedback visual al usuario
- **Testing:** Verificar que estados intermedios funcionan
- **Preparación:** Código listo para integrar API real

## 📊 Métricas del Proyecto

### Estadísticas de Navegación
- **Total de rutas:** 22
- **Rutas públicas:** 8
- **Rutas protegidas cliente:** 3
- **Rutas protegidas admin:** 9
- **Rutas especiales:** 2 (404, Unauthorized)

### Estadísticas de Componentes
- **Layouts:** 3
- **Páginas:** 24
- **Componentes HF:** 25+
- **Componentes de estado:** 3 (Loading, Empty, Error)

### Cobertura de Estados UI
- **Loading:** 4 páginas (admin)
- **Empty:** 3 contextos (cart, products, orders)
- **Error:** Componente genérico reutilizable
- **Success:** 2 contextos (checkout, orders)

## 🚀 Mejoras Futuras (Fuera de Alcance del Sprint)

### Navegación
- [ ] Breadcrumbs en páginas de admin
- [ ] Historial de navegación (back button)
- [ ] Deep linking con query params
- [ ] Navegación con teclado (accessibility)

### Autenticación
- [ ] Refresh tokens
- [ ] Sesión con timeout automático
- [ ] Remember me checkbox
- [ ] SSO / OAuth

### Rendimiento
- [ ] Code splitting por ruta
- [ ] Lazy loading de componentes
- [ ] Prefetching de rutas probables
- [ ] Service Worker para offline

### UX
- [ ] Transiciones entre páginas
- [ ] Progress indicators en multi-step forms
- [ ] Confirmación antes de salir de formularios
- [ ] Toast notifications

## 📚 Referencias

- [React Router v6 Docs](https://reactrouter.com/en/main)
- [React Context API](https://react.dev/reference/react/useContext)
- [Protected Routes Pattern](https://ui.dev/react-router-protected-routes-authentication)
- [Layout Pattern](https://reactrouter.com/en/main/components/outlet)

---

**Última actualización:** 22 de enero de 2026  
**Versión:** 1.0
