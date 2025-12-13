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
  tipo: 'circular' | 'protocolo' | 'formulario' | 'guia' | 'reglamento' | 'manual' | 'informe' | 'otro';
  tipo_display: string;
  categoria: string;
  categoria_nombre: string;
  storage_type: 'database' | 's3';
  nombre_archivo: string;
  extension: string;
  tamano: number;
  mime_type: string;
  archivo_url?: string;
  url_descarga: string;
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
  tipo: 'circular' | 'protocolo' | 'formulario' | 'guia' | 'reglamento' | 'manual' | 'informe' | 'otro';
  categoria: string;
  version?: string;
  fecha_vigencia: string;
  fecha_expiracion?: string;
  publico?: boolean;
  areas_con_acceso?: string[];
  archivo: File;
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
   * Crear nuevo documento con archivo
   */
  async create(data: CrearDocumentoData): Promise<Documento> {
    console.log('📤 Creando documento:', data);
    console.log('📄 Tipo de archivo:', data.archivo instanceof File ? 'File' : typeof data.archivo);
    console.log('📦 Archivo:', data.archivo);
    
    const formData = new FormData();
    
    formData.append('titulo', data.titulo);
    if (data.descripcion) formData.append('descripcion', data.descripcion);
    formData.append('tipo', data.tipo);
    formData.append('categoria', data.categoria);
    if (data.version) formData.append('version', data.version);
    formData.append('fecha_vigencia', data.fecha_vigencia);
    if (data.fecha_expiracion) formData.append('fecha_expiracion', data.fecha_expiracion);
    formData.append('publico', String(data.publico ?? true));
    if (data.areas_con_acceso) {
      data.areas_con_acceso.forEach(area => formData.append('areas_con_acceso', area));
    }
    formData.append('archivo', data.archivo);
    
    console.log('📮 FormData entries:');
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value instanceof File ? `File(${value.name}, ${value.size} bytes)` : value);
    }
    
    return ApiClient.postFormData('/documentos/', formData);
  },

  /**
   * Actualizar documento
   */
  async update(id: string, data: Partial<CrearDocumentoData>): Promise<Documento> {
    const formData = new FormData();
    
    if (data.titulo) formData.append('titulo', data.titulo);
    if (data.descripcion) formData.append('descripcion', data.descripcion);
    if (data.tipo) formData.append('tipo', data.tipo);
    if (data.categoria) formData.append('categoria', data.categoria);
    if (data.version) formData.append('version', data.version);
    if (data.fecha_vigencia) formData.append('fecha_vigencia', data.fecha_vigencia);
    if (data.fecha_expiracion) formData.append('fecha_expiracion', data.fecha_expiracion);
    if (data.publico !== undefined) formData.append('publico', String(data.publico));
    if (data.areas_con_acceso) {
      data.areas_con_acceso.forEach(area => formData.append('areas_con_acceso', area));
    }
    if (data.archivo) formData.append('archivo', data.archivo);
    
    return ApiClient.patchFormData(`/documentos/${id}/`, formData);
  },

  /**
   * Eliminar documento
   */
  async delete(id: string): Promise<void> {
    return ApiClient.delete(`/documentos/${id}/`);
  },

  /**
   * Descargar archivo
   */
  async download(id: string): Promise<Blob> {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}/documentos/${id}/download/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Error al descargar el archivo');
    }
    
    return response.blob();
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