// ======================================================
// RECORDATORIOS SERVICE
// Ubicación: frontend/src/api/services/recordatoriosService.ts
// ======================================================

import { ApiClient } from '../client';

// ======================================================
// TIPOS
// ======================================================

export interface Recordatorio {
  id: string;
  usuario: string;
  texto: string;
  completado: boolean;
  creado_en: string;
  actualizado_en: string;
}

export interface CrearRecordatorioData {
  texto: string;
}

export interface ActualizarRecordatorioData {
  texto?: string;
  completado?: boolean;
}

// ======================================================
// SERVICIO
// ======================================================

export const recordatoriosService = {
  /**
   * Listar todos los recordatorios del usuario actual
   */
  async getAll(): Promise<Recordatorio[]> {
    const response = await ApiClient.get<Recordatorio[]>('/recordatorios/');
    return response;
  },

  /**
   * Obtener recordatorio por ID
   */
  async getById(id: string): Promise<Recordatorio> {
    const response = await ApiClient.get<Recordatorio>(`/recordatorios/${id}/`);
    return response;
  },

  /**
   * Crear nuevo recordatorio
   */
  async create(data: CrearRecordatorioData): Promise<Recordatorio> {
    const response = await ApiClient.post<Recordatorio>('/recordatorios/', data);
    return response;
  },

  /**
   * Actualizar recordatorio completo
   */
  async update(id: string, data: ActualizarRecordatorioData): Promise<Recordatorio> {
    const response = await ApiClient.put<Recordatorio>(`/recordatorios/${id}/`, data);
    return response;
  },

  /**
   * Actualizar recordatorio parcial
   */
  async patch(id: string, data: Partial<ActualizarRecordatorioData>): Promise<Recordatorio> {
    const response = await ApiClient.patch<Recordatorio>(`/recordatorios/${id}/`, data);
    return response;
  },

  /**
   * Eliminar recordatorio
   */
  async delete(id: string): Promise<void> {
    await ApiClient.delete(`/recordatorios/${id}/`);
  },

  /**
   * Alternar estado completado de un recordatorio
   */
  async toggleCompletado(id: string): Promise<Recordatorio> {
    const response = await ApiClient.patch<Recordatorio>(
      `/recordatorios/${id}/toggle_completado/`
    );
    return response;
  },
};