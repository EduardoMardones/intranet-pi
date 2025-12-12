// ======================================================
// ACTIVIDADES SERVICE
// Ubicación: frontend/src/api/services/actividadesService.ts
// ======================================================

import { ApiClient } from '../client';

// ======================================================
// TIPOS
// ======================================================

export type TipoActividad = 'gastronomica' | 'deportiva' | 'celebracion' | 'comunitaria' | 'cultural' | 'capacitacion' | 'otra';

export interface Actividad {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: TipoActividad;
  tipo_display: string;
  fecha_inicio: string;
  fecha_termino: string;
  todo_el_dia: boolean;
  ubicacion: string;
  color: string;
  imagen?: string | null;
  para_todas_areas: boolean;
  areas_participantes?: string[];
  areas_participantes_nombres?: string[];
  cupo_maximo?: number | null;
  total_inscritos: number;
  tiene_cupos: boolean;
  activa: boolean;
  creado_por: string;
  creado_por_nombre: string;
  creado_en: string;
  actualizado_en?: string;
  inscritos_list?: InscripcionActividad[];
}

export interface InscripcionActividad {
  id: string;
  actividad: string;
  usuario: string;
  usuario_nombre: string;
  fecha_inscripcion: string;
  asistio?: boolean | null;
}

export interface CrearActividadData {
  titulo: string;
  descripcion: string;
  tipo: TipoActividad;
  fecha_inicio: string;
  fecha_termino: string;
  todo_el_dia?: boolean;
  ubicacion?: string;
  color?: string;
  para_todas_areas?: boolean;
  areas_participantes?: string[];
  cupo_maximo?: number | null;
}

export interface ActualizarActividadData {
  titulo?: string;
  descripcion?: string;
  tipo?: TipoActividad;
  fecha_inicio?: string;
  fecha_termino?: string;
  todo_el_dia?: boolean;
  ubicacion?: string;
  color?: string;
  para_todas_areas?: boolean;
  areas_participantes?: string[];
  cupo_maximo?: number | null;
  activa?: boolean;
}

// ======================================================
// SERVICIO
// ======================================================

export const actividadesService = {
  /**
   * Listar todas las actividades
   */
  async getAll(params?: {
    tipo?: string;
    activa?: boolean;
    para_todas_areas?: boolean;
    search?: string;
  }): Promise<Actividad[]> {
    const response = await ApiClient.get<Actividad[]>('/actividades/', params);
    return response;
  },

  /**
   * Obtener actividad por ID
   */
  async getById(id: string): Promise<Actividad> {
    const response = await ApiClient.get<Actividad>(`/actividades/${id}/`);
    return response;
  },

  /**
   * Crear nueva actividad
   */
  async create(data: CrearActividadData): Promise<Actividad> {
    const response = await ApiClient.post<Actividad>('/actividades/', data);
    return response;
  },

  /**
   * Actualizar actividad completa
   */
  async update(id: string, data: ActualizarActividadData): Promise<Actividad> {
    const response = await ApiClient.put<Actividad>(`/actividades/${id}/`, data);
    return response;
  },

  /**
   * Actualizar actividad parcial
   */
  async patch(id: string, data: Partial<ActualizarActividadData>): Promise<Actividad> {
    const response = await ApiClient.patch<Actividad>(`/actividades/${id}/`, data);
    return response;
  },

  /**
   * Eliminar actividad
   */
  async delete(id: string): Promise<void> {
    await ApiClient.delete(`/actividades/${id}/`);
  },

  /**
   * Inscribirse en una actividad
   */
  async inscribirse(id: string): Promise<{ message: string; inscripcion_id: string }> {
    const response = await ApiClient.post<{ message: string; inscripcion_id: string }>(
      `/actividades/${id}/inscribirse/`,
      {}
    );
    return response;
  },

  /**
   * Desinscribirse de una actividad
   */
  async desinscribirse(id: string): Promise<{ message: string }> {
    const response = await ApiClient.delete<{ message: string }>(
      `/actividades/${id}/desinscribirse/`
    );
    return response;
  },

  /**
   * Subir imagen para actividad
   */
  async uploadImage(id: string, file: File): Promise<Actividad> {
    const formData = new FormData();
    formData.append('imagen', file);
    
    const response = await ApiClient.patchFormData<Actividad>(
      `/actividades/${id}/`,
      formData
    );
    return response;
  },
};