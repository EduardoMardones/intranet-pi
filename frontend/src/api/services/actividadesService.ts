// ======================================================
// ACTIVIDADES SERVICE
// Ubicación: frontend/src/api/services/actividadesService.ts
// ======================================================

import { ApiClient } from '../client';

export interface Actividad {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: 'reunion' | 'capacitacion' | 'evento' | 'celebracion' | 'otro';
  tipo_display: string;
  fecha_inicio: string;
  fecha_termino: string;
  todo_el_dia: boolean;
  ubicacion?: string;
  color?: string;
  imagen?: string;
  para_todas_areas: boolean;
  areas_participantes?: string[];
  areas_participantes_nombres?: string[];
  cupo_maximo?: number;
  total_inscritos: number;
  tiene_cupos: boolean;
  activa: boolean;
  creado_por: string;
  creado_por_nombre: string;
  creado_en: string;
}

export interface InscripcionActividad {
  id: string;
  actividad: string;
  usuario: string;
  usuario_nombre: string;
  fecha_inscripcion: string;
  asistio: boolean;
}

export interface CrearActividadData {
  titulo: string;
  descripcion: string;
  tipo: 'reunion' | 'capacitacion' | 'evento' | 'celebracion' | 'otro';
  fecha_inicio: string;
  fecha_termino: string;
  todo_el_dia?: boolean;
  ubicacion?: string;
  color?: string;
  para_todas_areas?: boolean;
  areas_participantes?: string[];
  cupo_maximo?: number;
}

export const actividadesService = {
  /**
   * Listar todas las actividades
   */
  async getAll(params?: {
    tipo?: string;
    activa?: boolean;
    search?: string;
    page?: number;
  }): Promise<{ results: Actividad[]; count: number }> {
    return ApiClient.get('/actividades/', params);
  },

  /**
   * Obtener actividad por ID
   */
  async getById(id: string): Promise<Actividad> {
    return ApiClient.get(`/actividades/${id}/`);
  },

  /**
   * Crear nueva actividad
   */
  async create(data: CrearActividadData): Promise<Actividad> {
    return ApiClient.post('/actividades/', data);
  },

  /**
   * Actualizar actividad
   */
  async update(id: string, data: Partial<CrearActividadData>): Promise<Actividad> {
    return ApiClient.patch(`/actividades/${id}/`, data);
  },

  /**
   * Eliminar actividad
   */
  async delete(id: string): Promise<void> {
    return ApiClient.delete(`/actividades/${id}/`);
  },

  /**
   * Inscribirse en una actividad
   */
  async inscribirse(id: string): Promise<{ message: string; inscripcion_id: string }> {
    return ApiClient.post(`/actividades/${id}/inscribirse/`);
  },

  /**
   * Desinscribirse de una actividad
   */
  async desinscribirse(id: string): Promise<{ message: string }> {
    return ApiClient.delete(`/actividades/${id}/desinscribirse/`);
  },

  /**
   * Subir imagen para actividad
   */
  async uploadImage(id: string, file: File): Promise<Actividad> {
    return ApiClient.uploadFile(`/actividades/${id}/`, file, 'imagen');
  },
};
