// ======================================================
// NOTIFICACIONES SERVICE
// Ubicación: frontend/src/api/services/notificacionesService.ts
// ======================================================

import { ApiClient } from '../client';

export interface Notificacion {
  id: string;
  usuario: string;
  tipo: 'solicitud' | 'aprobacion' | 'rechazo' | 'actividad' | 'anuncio' | 'documento' | 'sistema';
  tipo_display: string;
  titulo: string;
  mensaje: string;
  url?: string;
  icono?: string;
  leida: boolean;
  fecha_leida?: string;
  creada_en: string;
}

export const notificacionesService = {
  /**
   * Listar todas las notificaciones del usuario actual
   */
  async getAll(params?: {
    tipo?: string;
    leida?: boolean;
    page?: number;
  }): Promise<{ results: Notificacion[]; count: number }> {
    return ApiClient.get('/notificaciones/', params);
  },

  /**
   * Obtener notificaciones no leídas
   */
  async getNoLeidas(): Promise<Notificacion[]> {
    return ApiClient.get('/notificaciones/no_leidas/');
  },

  /**
   * Marcar notificación como leída
   */
  async marcarLeida(id: string): Promise<{ message: string }> {
    return ApiClient.post(`/notificaciones/${id}/marcar_leida/`);
  },

  /**
   * Marcar todas las notificaciones como leídas
   */
  async marcarTodasLeidas(): Promise<{ message: string }> {
    return ApiClient.post('/notificaciones/marcar_todas_leidas/');
  },
};

// ======================================================
// AREAS SERVICE
// Ubicación: frontend/src/api/services/areasService.ts
// ======================================================

export interface Area {
  id: string;
  nombre: string;
  codigo: string;
  descripcion?: string;
  color?: string;
  icono?: string;
  jefe?: string;
  jefe_nombre?: string;
  total_funcionarios: number;
  activa: boolean;
  creada_en: string;
}

export const areasService = {
  /**
   * Listar todas las áreas
   */
  async getAll(): Promise<Area[]> {
    const response = await ApiClient.get<{ results: Area[] }>('/areas/');
    return response.results || response as any;
  },

  /**
   * Obtener área por ID
   */
  async getById(id: string): Promise<Area> {
    return ApiClient.get(`/areas/${id}/`);
  },

  /**
   * Obtener funcionarios de un área
   */
  async getFuncionarios(id: string): Promise<any[]> {
    return ApiClient.get(`/areas/${id}/funcionarios/`);
  },
};

// ======================================================
// ROLES SERVICE
// Ubicación: frontend/src/api/services/rolesService.ts
// ======================================================

export interface Rol {
  id: string;
  nombre: string;
  descripcion?: string;
  nivel: number;
  puede_crear_usuarios: boolean;
  puede_eliminar_contenido: boolean;
  puede_aprobar_solicitudes: boolean;
  puede_subir_documentos: boolean;
  puede_crear_actividades: boolean;
  puede_crear_anuncios: boolean;
  puede_gestionar_licencias: boolean;
  puede_ver_reportes: boolean;
  puede_editar_calendario: boolean;
}

export const rolesService = {
  /**
   * Listar todos los roles
   */
  async getAll(): Promise<Rol[]> {
    const response = await ApiClient.get<{ results: Rol[] }>('/roles/');
    return response.results || response as any;
  },

  /**
   * Obtener rol por ID
   */
  async getById(id: string): Promise<Rol> {
    return ApiClient.get(`/roles/${id}/`);
  },
};
