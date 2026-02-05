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
};

// Mantener compatibilidad con nombres anteriores
export const cartService = carritoService;
export const orderService = pedidoService;

export default apiClient;
