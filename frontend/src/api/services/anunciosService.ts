// ======================================================
// ANUNCIOS SERVICE
// Ubicación: frontend/src/api/services/anunciosService.ts
// ======================================================

import { ApiClient } from '../client';

// ======================================================
// TIPOS - Coinciden exactamente con el backend
// ======================================================

export type TipoAnuncio = 'informativo' | 'urgente' | 'recordatorio' | 'felicitacion' | 'normativa' | 'administrativa';

export type VisibilidadRoles = 'solo_funcionarios' | 'solo_jefatura' | 'funcionarios_y_jefatura' | 'solo_direccion';

export interface Anuncio {
  id: string;
  titulo: string;
  contenido: string;
  tipo: TipoAnuncio;
  tipo_display: string;
  fecha_publicacion: string;
  fecha_expiracion?: string | null;
  es_destacado: boolean;
  prioridad: number;
  imagen?: string | null;
  para_todas_areas: boolean;
  areas_destinatarias?: string[];
  areas_destinatarias_nombres?: string[];
  visibilidad_roles: VisibilidadRoles;
  visibilidad_roles_display: string;
  activo: boolean;
  esta_vigente: boolean;
  creado_por: string;
  creado_por_nombre: string;
  creado_en: string;
  actualizado_en?: string;
  adjuntos?: AdjuntoAnuncio[];
}

export interface AdjuntoAnuncio {
  id: string;
  anuncio: string;
  nombre_archivo: string;
  archivo: string;
  tipo_archivo: string;
  tamano: number;
  subido_en: string;
}

export interface CrearAnuncioData {
  titulo: string;
  contenido: string;
  tipo: TipoAnuncio;
  fecha_publicacion?: string;
  fecha_expiracion?: string | null;
  es_destacado?: boolean;
  prioridad?: number;
  para_todas_areas?: boolean;
  areas_destinatarias?: string[];
  visibilidad_roles?: VisibilidadRoles;
  activo?: boolean;
}

export interface ActualizarAnuncioData {
  titulo?: string;
  contenido?: string;
  tipo?: TipoAnuncio;
  fecha_publicacion?: string;
  fecha_expiracion?: string | null;
  es_destacado?: boolean;
  prioridad?: number;
  para_todas_areas?: boolean;
  areas_destinatarias?: string[];
  visibilidad_roles?: VisibilidadRoles;
  activo?: boolean;
}

// ======================================================
// SERVICIO
// ======================================================

export const anunciosService = {
  /**
   * Listar todos los anuncios
   */
  async getAll(params?: {
    tipo?: string;
    es_destacado?: boolean;
    activo?: boolean;
    search?: string;
  }): Promise<Anuncio[]> {
    const response = await ApiClient.get<Anuncio[]>('/anuncios/', params);
    return response;
  },

  /**
   * Obtener anuncios vigentes
   */
  async getVigentes(): Promise<Anuncio[]> {
    const response = await ApiClient.get<Anuncio[]>('/anuncios/vigentes/');
    return response;
  },

  /**
   * Obtener anuncio por ID
   */
  async getById(id: string): Promise<Anuncio> {
    const response = await ApiClient.get<Anuncio>(`/anuncios/${id}/`);
    return response;
  },

  /**
   * Crear nuevo anuncio
   */
  async create(data: CrearAnuncioData): Promise<Anuncio> {
    const response = await ApiClient.post<Anuncio>('/anuncios/', data);
    return response;
  },

  /**
   * Actualizar anuncio completo
   */
  async update(id: string, data: ActualizarAnuncioData): Promise<Anuncio> {
    const response = await ApiClient.put<Anuncio>(`/anuncios/${id}/`, data);
    return response;
  },

  /**
   * Actualizar anuncio parcial
   */
  async patch(id: string, data: Partial<ActualizarAnuncioData>): Promise<Anuncio> {
    const response = await ApiClient.patch<Anuncio>(`/anuncios/${id}/`, data);
    return response;
  },

  /**
   * Eliminar anuncio
   */
  async delete(id: string): Promise<void> {
    await ApiClient.delete(`/anuncios/${id}/`);
  },

  /**
   * Subir imagen para anuncio
   */
  async uploadImage(id: string, file: File): Promise<Anuncio> {
    const formData = new FormData();
    formData.append('imagen', file);
    
    const response = await ApiClient.patchFormData<Anuncio>(
      `/anuncios/${id}/`,
      formData
    );
    return response;
  },

  /**
   * Subir archivo adjunto a un anuncio
   */
  async uploadAdjunto(anuncioId: string, file: File): Promise<AdjuntoAnuncio> {
    const formData = new FormData();
    formData.append('archivo', file);
    
    const response = await ApiClient.postFormData<AdjuntoAnuncio>(
      `/anuncios/${anuncioId}/subir_adjunto/`,
      formData
    );
    return response;
  },

  /**
   * Crear anuncio con imagen
   */
  async createWithImage(data: CrearAnuncioData, imagen?: File): Promise<Anuncio> {
    // Primero crear el anuncio
    const anuncio = await this.create(data);
    
    // Si hay imagen, subirla
    if (imagen) {
      return await this.uploadImage(anuncio.id, imagen);
    }
    
    return anuncio;
  },
};