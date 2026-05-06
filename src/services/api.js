/**
 * Cliente HTTP para comunicación con la API del backend
 * Maneja autenticación JWT y operaciones CRUD
 */

class ApiClient {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/v1';
  }

  /**
   * Obtiene el token JWT del localStorage
   */
  getAuthToken() {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        return userData.token;
      } catch (error) {
        console.error('Error al parsear usuario del localStorage:', error);
        return null;
      }
    }
    return null;
  }

  /**
   * Crea headers por defecto con autenticación si existe token
   */
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  /**
   * Maneja la respuesta de la API
   */
  async handleResponse(response) {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const error = new Error(data.message || 'Error en la petición');
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  }

  /**
   * Método GET
   */
  async get(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(options.auth !== false),
        ...options,
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error(`Error en GET ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Método POST
   */
  async post(endpoint, body, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(options.auth !== false),
        body: JSON.stringify(body),
        ...options,
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error(`Error en POST ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Método PUT
   */
  async put(endpoint, body, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(options.auth !== false),
        body: JSON.stringify(body),
        ...options,
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error(`Error en PUT ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Método DELETE
   */
  async delete(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(options.auth !== false),
        ...options,
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error(`Error en DELETE ${endpoint}:`, error);
      throw error;
    }
  }
}

// Instancia única del cliente API
const apiClient = new ApiClient();

// ============================================================================
// SERVICIOS ESPECÍFICOS
// ============================================================================

/**
 * Servicio de autenticación
 */
export const authService = {
  /**
   * Iniciar sesión
   * @param {string} email - Correo del usuario
   * @param {string} password - Contraseña
   * @returns {Promise<{data: {user: object, access_token: string}}>}
   */
  async login(email, password) {
    return await apiClient.post('/auth/login', { email, password }, { auth: false });
  },

  /**
   * Registrar nuevo usuario
   * @param {object} userData - Datos del usuario (email, password, nombre, etc.)
   * @returns {Promise<{data: {user: object, access_token: string}}>}
   */
  async register(userData) {
    return await apiClient.post('/auth/register', userData, { auth: false });
  },

  /**
   * Obtener perfil del usuario autenticado
   * @returns {Promise<object>}
   */
  async getProfile() {
    return await apiClient.get('/auth/profile');
  },
};

/**
 * Servicio de productos
 */
export const productService = {
  /**
   * Obtener todos los productos
   * @param {object} params - Parámetros de búsqueda (filtros, paginación, etc.)
   * @returns {Promise<{data: Array}>}
   */
  async getAll(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/productos?${queryString}` : '/productos';
    return await apiClient.get(endpoint, { auth: false });
  },

  /**
   * Obtener productos más vendidos
   * @param {number} limit - Cantidad de productos a retornar
   * @returns {Promise<{data: Array}>}
   */
  async getBestSellers(limit = 4) {
    try {
      // Intentar obtener del endpoint de más vendidos si existe
      return await apiClient.get(`/productos/mas-vendidos?limit=${limit}`, { auth: false });
    } catch (error) {
      // Si no existe el endpoint, obtener todos y ordenar por ventas/stock
      const allProducts = await this.getAll();
      const products = Array.isArray(allProducts) ? allProducts : (allProducts.data || allProducts.productos || []);
      // Ordenar por ventas_totales o stock bajo (indicador de alta demanda)
      const sorted = [...products].sort((a, b) => {
        const ventasA = a.ventas_totales || a.ventas || 0;
        const ventasB = b.ventas_totales || b.ventas || 0;
        return ventasB - ventasA;
      });
      return sorted.slice(0, limit);
    }
  },

  /**
   * Obtener un producto por ID
   * @param {string} id - ID del producto
   * @returns {Promise<{data: object}>}
   */
  async getById(id) {
    return await apiClient.get(`/productos/${id}`, { auth: false });
  },

  /**
   * Crear un nuevo producto (admin)
   * @param {object} productData - Datos del producto
   * @returns {Promise<{data: object}>}
   */
  async create(productData) {
    return await apiClient.post('/productos', productData);
  },

  /**
   * Actualizar un producto (admin)
   * @param {string} id - ID del producto
   * @param {object} productData - Datos actualizados
   * @returns {Promise<{data: object}>}
   */
  async update(id, productData) {
    return await apiClient.put(`/productos/${id}`, productData);
  },

  /**
   * Eliminar un producto (admin)
   * @param {string} id - ID del producto
   * @returns {Promise<void>}
   */
  async delete(id) {
    return await apiClient.delete(`/productos/${id}`);
  },

  // ============== GESTIÓN DE INVENTARIO ==============

  /**
   * Obtener productos con stock bajo (admin)
   * @returns {Promise<{data: Array}>}
   */
  async getStockBajo() {
    return await apiClient.get('/productos/inventario/bajo-stock');
  },

  /**
   * Obtener productos agotados (admin)
   * @returns {Promise<{data: Array}>}
   */
  async getAgotados() {
    return await apiClient.get('/productos/inventario/agotados');
  },

  /**
   * Actualizar stock de un producto (admin)
   * @param {string} id - ID del producto
   * @param {string} operacion - 'agregar', 'reducir' o 'establecer'
   * @param {number} cantidad - Cantidad a modificar
   * @returns {Promise<{data: object}>}
   */
  async updateStock(id, operacion, cantidad) {
    return await apiClient.put(`/productos/${id}/stock`, { operacion, cantidad });
  },

  // ============== GESTIÓN DE IMÁGENES ==============

  /**
   * Subir imagen de un producto a Cloudinary (admin)
   * @param {string} id - ID del producto
   * @param {File} imageFile - Archivo de imagen
   * @returns {Promise<{data: {imagen_url: string, imagen_public_id: string}}>}
   */
  async uploadImage(id, imageFile) {
    const formData = new FormData();
    formData.append('imagen', imageFile);

    const token = apiClient.getAuthToken();
    const response = await fetch(`${apiClient.baseURL}/productos/${id}/imagen`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al subir imagen');
    }

    return await response.json();
  },

  /**
   * Eliminar imagen de un producto (admin)
   * @param {string} id - ID del producto
   * @returns {Promise<{data: {message: string}}>}
   */
  async deleteImage(id) {
    return await apiClient.delete(`/productos/${id}/imagen`);
  },
};

/**
 * Servicio de carrito de compras
 */
export const carritoService = {
  /**
   * Obtener el carrito del usuario actual
   * @returns {Promise<{data: object}>}
   */
  async get() {
    return await apiClient.get('/carrito');
  },

  /**
   * Agregar un producto al carrito
   * @param {string} productoId - ID del producto
   * @param {number} cantidad - Cantidad
   * @returns {Promise<{data: object}>}
   */
  async addItem(productoId, cantidad = 1) {
    return await apiClient.post('/carrito/items', { productoId, cantidad });
  },

  /**
   * Actualizar la cantidad de un producto en el carrito
   * @param {string} itemId - ID del item en el carrito
   * @param {number} cantidad - Nueva cantidad
   * @returns {Promise<{data: object}>}
   */
  async updateItem(itemId, cantidad) {
    return await apiClient.put(`/carrito/items/${itemId}`, { cantidad });
  },

  /**
   * Eliminar un producto del carrito
   * @param {string} itemId - ID del item en el carrito
   * @returns {Promise<void>}
   */
  async removeItem(itemId) {
    return await apiClient.delete(`/carrito/items/${itemId}`);
  },

  /**
   * Vaciar el carrito completo
   * @returns {Promise<void>}
   */
  async clear() {
    return await apiClient.delete('/carrito');
  },
};

/**
 * Servicio de pedidos
 */
export const pedidoService = {
  /**
   * Crear un nuevo pedido desde el carrito
   * @param {object} pedidoData - Datos del pedido (dirección, método de pago, etc.)
   * @returns {Promise<{data: object}>}
   */
  async create(pedidoData) {
    return await apiClient.post('/pedidos', pedidoData);
  },

  /**
   * Obtener los pedidos del usuario autenticado
   * @returns {Promise<{data: Array}>}
   */
  async getMisPedidos() {
    return await apiClient.get('/pedidos');
  },

  /**
   * Obtener un pedido por ID
   * @param {string} id - ID del pedido
   * @returns {Promise<{data: object}>}
   */
  async getById(id) {
    return await apiClient.get(`/pedidos/${id}`);
  },

  /**
   * Obtener todos los pedidos (admin)
   * @returns {Promise<{data: Array}>}
   */
  async getAllPedidos() {
    return await apiClient.get('/pedidos/admin/all');
  },

  /**
   * Actualizar estado de un pedido (admin)
   * @param {string} id - ID del pedido
   * @param {string} estado - Nuevo estado
   * @returns {Promise<{data: object}>}
   */
  async updateEstado(id, estado) {
    return await apiClient.put(`/pedidos/${id}/estado`, { estado });
  },

  /**
   * Obtener productos frecuentes del usuario basados en historial de pedidos
   * @param {number} limit - Cantidad de productos a retornar
   * @returns {Promise<Array>} - Array de productos con frecuencia
   */
  async getProductosFrecuentes(limit = 5) {
    try {
      const pedidos = await this.getMisPedidos();
      const pedidosList = Array.isArray(pedidos) ? pedidos : (pedidos.data || pedidos.pedidos || []);

      // Contar frecuencia de cada producto
      const productosCount = {};
      pedidosList.forEach(pedido => {
        const items = pedido.items || pedido.productos || [];
        items.forEach(item => {
          const id = item.producto_id || item.productoId || item.producto?._id || item.producto?.id;
          const nombre = item.nombre || item.producto?.nombre || item.name || item.producto?.name;
          const precio = item.precio || item.producto?.precio || item.price || item.producto?.price;
          const imagen = item.imagen || item.producto?.imagen_url || item.image || item.producto?.image;
          const cantidad = item.cantidad || item.quantity || 1;

          if (id) {
            if (!productosCount[id]) {
              productosCount[id] = {
                id,
                nombre,
                precio,
                imagen,
                frecuencia: 0,
                cantidadTotal: 0
              };
            }
            productosCount[id].frecuencia += 1;
            productosCount[id].cantidadTotal += cantidad;
          }
        });
      });

      // Ordenar por frecuencia y retornar los más pedidos
      const sorted = Object.values(productosCount)
        .sort((a, b) => b.frecuencia - a.frecuencia)
        .slice(0, limit);

      return sorted;
    } catch (error) {
      console.error('Error al obtener productos frecuentes:', error);
      return [];
    }
  },

  /**
   * Repetir un pedido anterior (añadir sus productos al carrito)
   * @param {string} pedidoId - ID del pedido a repetir
   * @returns {Promise<{success: boolean, itemsAdded: number}>}
   */
  async repetirPedido(pedidoId) {
    const pedido = await this.getById(pedidoId);
    const pedidoData = pedido.data || pedido;
    const items = pedidoData.items || pedidoData.productos || [];

    let itemsAdded = 0;
    for (const item of items) {
      const productoId = item.producto_id || item.productoId || item.producto?._id || item.producto?.id;
      const cantidad = item.cantidad || item.quantity || 1;

      if (productoId) {
        try {
          await carritoService.addItem(productoId, cantidad);
          itemsAdded++;
        } catch (error) {
          console.error(`Error al añadir producto ${productoId}:`, error);
        }
      }
    }

    return { success: itemsAdded > 0, itemsAdded };
  },
};

// Mantener compatibilidad con nombres anteriores
export const cartService = carritoService;
export const orderService = pedidoService;

/**
 * Servicio de reportes para el panel de administración
 */
export const reportService = {
  /**
   * Obtener estadísticas generales del dashboard
   * @param {string} periodo - Periodo de tiempo ('7d', '30d', '3m', '1y')
   * @returns {Promise<{ventas_totales: number, pedidos: number, clientes: number, ticket_promedio: number}>}
   */
  async getEstadisticas(periodo = '7d') {
    try {
      return await apiClient.get(`/reportes/estadisticas?periodo=${periodo}`);
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      // Retornar datos vacíos si el endpoint no existe
      return {
        ventas_totales: 0,
        pedidos: 0,
        clientes: 0,
        ticket_promedio: 0,
        cambio_ventas: '0%',
        cambio_pedidos: '0%',
        cambio_clientes: '0%',
        cambio_ticket: '0%'
      };
    }
  },

  /**
   * Obtener ventas por día
   * @param {string} periodo - Periodo de tiempo
   * @returns {Promise<Array<{dia: string, ventas: number}>>}
   */
  async getVentasPorDia(periodo = '7d') {
    try {
      return await apiClient.get(`/reportes/ventas-por-dia?periodo=${periodo}`);
    } catch (error) {
      console.error('Error al obtener ventas por día:', error);
      return [];
    }
  },

  /**
   * Obtener productos más vendidos
   * @param {number} limit - Cantidad de productos a retornar
   * @returns {Promise<Array<{nombre: string, ventas: number, ingresos: number}>>}
   */
  async getProductosMasVendidos(limit = 5) {
    try {
      return await apiClient.get(`/reportes/productos-mas-vendidos?limit=${limit}`);
    } catch (error) {
      console.error('Error al obtener productos más vendidos:', error);
      return [];
    }
  },

  /**
   * Obtener resumen de pedidos por estado
   * @returns {Promise<{pendientes: number, en_proceso: number, completados: number, cancelados: number}>}
   */
  async getResumenPedidos() {
    try {
      return await apiClient.get('/reportes/resumen-pedidos');
    } catch (error) {
      console.error('Error al obtener resumen de pedidos:', error);
      return { pendientes: 0, en_proceso: 0, completados: 0, cancelados: 0 };
    }
  },

  /**
   * Exportar reporte a CSV/Excel
   * @param {string} tipo - Tipo de reporte ('ventas', 'pedidos', 'productos')
   * @param {string} periodo - Periodo de tiempo
   */
  async exportarReporte(tipo, periodo = '7d') {
    try {
      const token = apiClient.getAuthToken();
      const response = await fetch(`${apiClient.baseURL}/reportes/exportar?tipo=${tipo}&periodo=${periodo}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Error al exportar');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reporte-${tipo}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al exportar reporte:', error);
      throw error;
    }
  }
};

export default apiClient;
