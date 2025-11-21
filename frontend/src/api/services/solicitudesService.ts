// ======================================================
// SOLICITUDES SERVICE
// Ubicación: frontend/src/api/services/solicitudesService.ts
// ======================================================

import { ApiClient } from '../client';

export interface Solicitud {
  id: string;
  numero_solicitud: string;
  usuario: string;
  usuario_nombre: string;
  area_nombre: string;
  tipo: 'vacaciones' | 'dia_administrativo';
  tipo_display: string;
  fecha_inicio: string;
  fecha_termino: string;
  cantidad_dias: number;
  motivo: string;
  telefono_contacto: string;
  estado: string;
  estado_display: string;
  fecha_solicitud: string;
  aprobada_por_jefatura?: boolean;
  jefatura_aprobador?: string;
  jefatura_nombre?: string;
  fecha_aprobacion_jefatura?: string;
  comentarios_jefatura?: string;
  aprobada_por_direccion?: boolean;
  direccion_aprobador?: string;
  direccion_nombre?: string;
  fecha_aprobacion_direccion?: string;
  comentarios_direccion?: string;
  pdf_generado: boolean;
  url_pdf?: string;
}

export interface CrearSolicitudData {
  tipo: 'vacaciones' | 'dia_administrativo';
  fecha_inicio: string;
  fecha_termino: string;
  cantidad_dias: number;
  motivo: string;
  telefono_contacto: string;
}

export interface AprobarSolicitudData {
  aprobar: boolean;
  comentarios?: string;
}

export const solicitudesService = {
  /**
   * Listar todas las solicitudes
   */
  async getAll(params?: {
    tipo?: string;
    estado?: string;
    search?: string;
    page?: number;
  }): Promise<{ results: Solicitud[]; count: number }> {
    return ApiClient.get('/solicitudes/', params);
  },

  /**
   * Obtener solicitud por ID
   */
  async getById(id: string): Promise<Solicitud> {
    return ApiClient.get(`/solicitudes/${id}/`);
  },

  /**
   * Crear nueva solicitud
   */
  async create(data: CrearSolicitudData): Promise<Solicitud> {
    return ApiClient.post('/solicitudes/', data);
  },

  /**
   * Actualizar solicitud
   */
  async update(id: string, data: Partial<CrearSolicitudData>): Promise<Solicitud> {
    return ApiClient.patch(`/solicitudes/${id}/`, data);
  },

  /**
   * Eliminar solicitud
   */
  async delete(id: string): Promise<void> {
    return ApiClient.delete(`/solicitudes/${id}/`);
  },

  /**
   * Obtener mis solicitudes
   */
  async getMySolicitudes(): Promise<Solicitud[]> {
    const response = await ApiClient.get<Solicitud[]>('/solicitudes/mis_solicitudes/');
    return response;
  },

  /**
   * Obtener solicitudes pendientes
   */
  async getPendientes(): Promise<Solicitud[]> {
    const response = await ApiClient.get<Solicitud[]>('/solicitudes/pendientes/');
    return response;
  },

  /**
   * Aprobar/Rechazar como jefatura
   */
  async aprobarJefatura(id: string, data: AprobarSolicitudData): Promise<{ message: string; nuevo_estado: string }> {
    return ApiClient.post(`/solicitudes/${id}/aprobar_jefatura/`, data);
  },

  /**
   * Aprobar/Rechazar como dirección
   */
  async aprobarDireccion(id: string, data: AprobarSolicitudData): Promise<{ message: string; nuevo_estado: string }> {
    return ApiClient.post(`/solicitudes/${id}/aprobar_direccion/`, data);
  },
};
