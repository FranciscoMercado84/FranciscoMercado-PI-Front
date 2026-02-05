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
   * @returns {Promise<{user: object, access_token: string}>}
   */
  async login(email, password) {
    return await apiClient.post('/auth/login', { email, password }, { auth: false });
  },

  /**
   * Registrar nuevo usuario
   * @param {object} userData - Datos del usuario (email, password, nombre, etc.)
   * @returns {Promise<{user: object, access_token: string}>}
   */
  async register(userData) {
    return await apiClient.post('/auth/register', userData, { auth: false });
  },
};

/**
 * Servicio de productos
 */
export const productService = {
  /**
   * Obtener todos los productos
   * @param {object} params - Parámetros de búsqueda (filtros, paginación, etc.)
   * @returns {Promise<Array>}
   */
  async getAll(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';
    return await apiClient.get(endpoint, { auth: false });
  },

  /**
   * Obtener un producto por ID
   * @param {string} id - ID del producto
   * @returns {Promise<object>}
   */
  async getById(id) {
    return await apiClient.get(`/products/${id}`, { auth: false });
  },

  /**
   * Crear un nuevo producto (admin)
   * @param {object} productData - Datos del producto
   * @returns {Promise<object>}
   */
  async create(productData) {
    return await apiClient.post('/products', productData);
  },

  /**
   * Actualizar un producto (admin)
   * @param {string} id - ID del producto
   * @param {object} productData - Datos actualizados
   * @returns {Promise<object>}
   */
  async update(id, productData) {
    return await apiClient.put(`/products/${id}`, productData);
  },

  /**
   * Eliminar un producto (admin)
   * @param {string} id - ID del producto
   * @returns {Promise<void>}
   */
  async delete(id) {
    return await apiClient.delete(`/products/${id}`);
  },
};

/**
 * Servicio de carrito de compras
 */
export const cartService = {
  /**
   * Obtener el carrito del usuario actual
   * @returns {Promise<object>}
   */
  async get() {
    return await apiClient.get('/cart');
  },

  /**
   * Agregar un producto al carrito
   * @param {string} productId - ID del producto
   * @param {number} quantity - Cantidad
   * @returns {Promise<object>}
   */
  async add(productId, quantity = 1) {
    return await apiClient.post('/cart/items', { productId, quantity });
  },

  /**
   * Actualizar la cantidad de un producto en el carrito
   * @param {string} itemId - ID del item en el carrito
   * @param {number} quantity - Nueva cantidad
   * @returns {Promise<object>}
   */
  async update(itemId, quantity) {
    return await apiClient.put(`/cart/items/${itemId}`, { quantity });
  },

  /**
   * Eliminar un producto del carrito
   * @param {string} itemId - ID del item en el carrito
   * @returns {Promise<void>}
   */
  async remove(itemId) {
    return await apiClient.delete(`/cart/items/${itemId}`);
  },

  /**
   * Vaciar el carrito completo
   * @returns {Promise<void>}
   */
  async clear() {
    return await apiClient.delete('/cart');
  },
};

/**
 * Servicio de órdenes
 */
export const orderService = {
  /**
   * Crear una nueva orden
   * @param {object} orderData - Datos de la orden (dirección, método de pago, etc.)
   * @returns {Promise<object>}
   */
  async create(orderData) {
    return await apiClient.post('/orders', orderData);
  },

  /**
   * Obtener todas las órdenes del usuario
   * @returns {Promise<Array>}
   */
  async getAll() {
    return await apiClient.get('/orders');
  },

  /**
   * Obtener una orden por ID
   * @param {string} id - ID de la orden
   * @returns {Promise<object>}
   */
  async getById(id) {
    return await apiClient.get(`/orders/${id}`);
  },

  /**
   * Cancelar una orden
   * @param {string} id - ID de la orden
   * @returns {Promise<object>}
   */
  async cancel(id) {
    return await apiClient.put(`/orders/${id}/cancel`);
  },

  /**
   * Actualizar estado de una orden (admin)
   * @param {string} id - ID de la orden
   * @param {string} status - Nuevo estado
   * @returns {Promise<object>}
   */
  async updateStatus(id, status) {
    return await apiClient.put(`/orders/${id}/status`, { status });
  },
};

export default apiClient;
