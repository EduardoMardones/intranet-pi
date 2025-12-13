import { ApiClient } from '../client';

export interface CategoriaDocumento {
  id: number;
  nombre: string;
  descripcion?: string;
  icono?: string;
  color?: string;
  orden?: number;
  activa?: boolean;
}

export const categoriasService = {
  async getAll(): Promise<CategoriaDocumento[]> {
    const response = await ApiClient.get('/categorias-documento/') as any;
    return Array.isArray(response) ? response : response.results || [];
  },

  async create(data: { nombre: string; descripcion?: string }): Promise<CategoriaDocumento> {
    return ApiClient.post('/categorias-documento/', data);
  },

  async update(id: number, data: Partial<CategoriaDocumento>): Promise<CategoriaDocumento> {
    return ApiClient.patch(`/categorias-documento/${id}/`, data);
  },

  async delete(id: number): Promise<void> {
    return ApiClient.delete(`/categorias-documento/${id}/`);
  },
};