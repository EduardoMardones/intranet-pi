// ======================================================
// ANUNCIOS SERVICE
// Ubicación: frontend/src/api/services/anunciosService.ts
// ======================================================

import { ApiClient } from '../client';

export interface Anuncio {
  id: string;
  titulo: string;
  contenido: string;
  tipo: 'comunicado' | 'informativo' | 'urgente' | 'felicitacion';
  tipo_display: string;
  es_destacado: boolean;
  prioridad: number;
  fecha_publicacion: string;
  fecha_expiracion?: string;
  imagen?: string;
  para_todas_areas: boolean;
  areas_destinatarias?: string[];
  areas_destinatarias_nombres?: string[];
  activo: boolean;
  esta_vigente: boolean;
  creado_por: string;
  creado_por_nombre: string;
  creado_en: string;
}

export interface AdjuntoAnuncio {
  id: string;
  anuncio: string;
  archivo: string;
  nombre_archivo: string;
  tipo_archivo: string;
  tamano: number;
  subido_en: string;
}

export interface CrearAnuncioData {
  titulo: string;
  contenido: string;
  tipo: 'comunicado' | 'informativo' | 'urgente' | 'felicitacion';
  es_destacado?: boolean;
  prioridad?: number;
  fecha_publicacion: string;
  fecha_expiracion?: string;
  para_todas_areas?: boolean;
  areas_destinatarias?: string[];
}

export const anunciosService = {
  /**
   * Listar todos los anuncios
   */
  async getAll(params?: {
    tipo?: string;
    es_destacado?: boolean;
    activo?: boolean;
    search?: string;
    page?: number;
  }): Promise<{ results: Anuncio[]; count: number }> {
    return ApiClient.get('/anuncios/', params);
  },

  /**
   * Obtener anuncios vigentes
   */
  async getVigentes(): Promise<Anuncio[]> {
    return ApiClient.get('/anuncios/vigentes/');
  },

  /**
   * Obtener anuncio por ID
   */
  async getById(id: string): Promise<Anuncio> {
    return ApiClient.get(`/anuncios/${id}/`);
  },

  /**
   * Crear nuevo anuncio
   */
  async create(data: CrearAnuncioData): Promise<Anuncio> {
    return ApiClient.post('/anuncios/', data);
  },

  /**
   * Actualizar anuncio
   */
  async update(id: string, data: Partial<CrearAnuncioData>): Promise<Anuncio> {
    return ApiClient.patch(`/anuncios/${id}/`, data);
  },

  /**
   * Eliminar anuncio
   */
  async delete(id: string): Promise<void> {
    return ApiClient.delete(`/anuncios/${id}/`);
  },

  /**
   * Subir imagen para anuncio
   */
  async uploadImage(id: string, file: File): Promise<Anuncio> {
    return ApiClient.uploadFile(`/anuncios/${id}/`, file, 'imagen');
  },
};
