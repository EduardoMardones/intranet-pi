// ======================================================
// DOCUMENTOS SERVICE
// Ubicación: frontend/src/api/services/documentosService.ts
// ======================================================

import { ApiClient } from '../client';

export interface Documento {
  id: string;
  codigo_documento: string;
  titulo: string;
  descripcion?: string;
  tipo: 'circular' | 'memorandum' | 'resolucion' | 'protocolo' | 'manual' | 'otro';
  tipo_display: string;
  categoria: string;
  categoria_nombre: string;
  archivo: string;
  extension: string;
  tamano: number;
  version: string;
  fecha_vigencia: string;
  fecha_expiracion?: string;
  publico: boolean;
  areas_con_acceso?: string[];
  areas_con_acceso_nombres?: string[];
  descargas: number;
  visualizaciones: number;
  activo: boolean;
  esta_vigente: boolean;
  subido_por: string;
  subido_por_nombre: string;
  subido_en: string;
}

export interface CategoriaDocumento {
  id: string;
  nombre: string;
  descripcion?: string;
  icono?: string;
  color?: string;
  orden: number;
  activa: boolean;
}

export interface CrearDocumentoData {
  titulo: string;
  descripcion?: string;
  tipo: 'circular' | 'memorandum' | 'resolucion' | 'protocolo' | 'manual' | 'otro';
  categoria: string;
  version?: string;
  fecha_vigencia: string;
  fecha_expiracion?: string;
  publico?: boolean;
  areas_con_acceso?: string[];
}

export const documentosService = {
  /**
   * Listar todos los documentos
   */
  async getAll(params?: {
    tipo?: string;
    categoria?: string;
    publico?: boolean;
    activo?: boolean;
    search?: string;
    page?: number;
  }): Promise<{ results: Documento[]; count: number }> {
    return ApiClient.get('/documentos/', params);
  },

  /**
   * Obtener documento por ID
   */
  async getById(id: string): Promise<Documento> {
    return ApiClient.get(`/documentos/${id}/`);
  },

  /**
   * Crear nuevo documento
   */
  async create(data: CrearDocumentoData): Promise<Documento> {
    return ApiClient.post('/documentos/', data);
  },

  /**
   * Actualizar documento
   */
  async update(id: string, data: Partial<CrearDocumentoData>): Promise<Documento> {
    return ApiClient.patch(`/documentos/${id}/`, data);
  },

  /**
   * Eliminar documento
   */
  async delete(id: string): Promise<void> {
    return ApiClient.delete(`/documentos/${id}/`);
  },

  /**
   * Subir archivo de documento
   */
  async uploadFile(id: string, file: File): Promise<Documento> {
    return ApiClient.uploadFile(`/documentos/${id}/`, file, 'archivo');
  },

  /**
   * Registrar descarga
   */
  async registrarDescarga(id: string): Promise<{ message: string }> {
    return ApiClient.post(`/documentos/${id}/descargar/`);
  },

  /**
   * Registrar visualización
   */
  async registrarVisualizacion(id: string): Promise<{ message: string }> {
    return ApiClient.post(`/documentos/${id}/visualizar/`);
  },

  /**
   * Listar categorías
   */
  async getCategorias(): Promise<CategoriaDocumento[]> {
    return ApiClient.get('/categorias-documento/');
  },
};
