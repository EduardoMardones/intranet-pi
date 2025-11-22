// ======================================================
// AUTH SERVICE
// Ubicación: frontend/src/api/services/authService.ts
// ======================================================

import { ApiClient } from '../client';


export interface LoginCredentials {
  rut: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    id: string;
    rut: string;
    nombre_completo: string;
    email: string;
    rol: string;
    area: string;
  };
}

export interface Usuario {
  // ==================== IDENTIFICACIÓN ====================
  id: string;
  rut: string;
  
  // ==================== DATOS PERSONALES ====================
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  nombre_completo: string;
  email: string;
  telefono?: string;
  fecha_nacimiento?: string;
  direccion?: string;
  
  // ==================== INFORMACIÓN PROFESIONAL ====================
  cargo: string;
  area: string;
  area_nombre: string;
  rol: string;
  rol_nombre: string;
  fecha_ingreso?: string;
  es_jefe_de_area: boolean;
  
  // ==================== CONTACTO DE EMERGENCIA ====================
  contacto_emergencia_nombre?: string;
  contacto_emergencia_telefono?: string;
  contacto_emergencia_relacion?: string;
  
  // ==================== DÍAS DISPONIBLES ====================
  dias_vacaciones_anuales: number;
  dias_vacaciones_disponibles: number;
  dias_vacaciones_usados: number;
  dias_administrativos_anuales: number;
  dias_administrativos_disponibles: number;
  dias_administrativos_usados: number;
  
  // ==================== AVATAR Y ESTADO ====================
  avatar?: string;
  is_active: boolean;
  
  // ==================== PERMISOS DEL ROL ====================
  rol_nivel?: number;
  rol_puede_crear_usuarios?: boolean;
  rol_puede_eliminar_contenido?: boolean;
  rol_puede_aprobar_solicitudes?: boolean;
  rol_puede_subir_documentos?: boolean;
  rol_puede_crear_actividades?: boolean;
  rol_puede_crear_anuncios?: boolean;
  rol_puede_gestionar_licencias?: boolean;
  rol_puede_ver_reportes?: boolean;
  rol_puede_editar_calendario?: boolean;
  
  // ==================== AUDITORÍA (OPCIONAL) ====================
  creado_en?: string;
  actualizado_en?: string;
  ultimo_acceso?: string;
}

export const authService = {
  /**
   * Iniciar sesión
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await ApiClient.post<AuthResponse>('/auth/login/', credentials);
    
    // Guardar tokens en localStorage
    if (response.access) {
      localStorage.setItem('auth_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    try {
      await ApiClient.post('/auth/logout/');
    } finally {
      // Limpiar localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  },

  /**
   * Obtener usuario actual
   */
  async getCurrentUser(): Promise<Usuario> {
    return ApiClient.get<Usuario>('/usuarios/me/');
  },

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },

  /**
   * Obtener usuario del localStorage
   */
  getStoredUser(): any {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Refrescar token
   */
  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await ApiClient.post<{ access: string }>('/auth/refresh/', {
      refresh: refreshToken,
    });
    
    localStorage.setItem('auth_token', response.access);
    return response.access;
  },
};