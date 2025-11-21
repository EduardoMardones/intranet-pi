// ======================================================
// USUARIOS SERVICE
// Ubicación: frontend/src/api/services/usuariosService.ts
// ======================================================

import { ApiClient } from '../client';

export interface Usuario {
  id: string;
  rut: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  nombre_completo: string;
  email: string;
  telefono: string;
  fecha_nacimiento?: string;
  direccion?: string;
  cargo: string;
  area: string;
  area_nombre: string;
  rol: string;
  rol_nombre: string;
  fecha_ingreso: string;
  es_jefe_de_area: boolean;
  contacto_emergencia_nombre?: string;
  contacto_emergencia_telefono?: string;
  contacto_emergencia_relacion?: string;
  dias_vacaciones_anuales: number;
  dias_vacaciones_disponibles: number;
  dias_vacaciones_usados: number;
  dias_administrativos_anuales: number;
  dias_administrativos_disponibles: number;
  dias_administrativos_usados: number;
  avatar?: string;
  tema_preferido?: string;
  is_active: boolean;
}

export interface DiasDisponibles {
  vacaciones: {
    total_anuales: number;
    disponibles: number;
    usados: number;
    porcentaje_usado: number;
  };
  administrativos: {
    total_anuales: number;
    disponibles: number;
    usados: number;
    porcentaje_usado: number;
  };
}

export interface CrearUsuarioData {
  rut: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  password: string;
  password_confirm: string;
  telefono: string;
  cargo: string;
  area: string;
  rol: string;
  fecha_ingreso: string;
  dias_vacaciones_anuales?: number;
  dias_administrativos_anuales?: number;
}

export const usuariosService = {
  /**
   * Listar todos los usuarios
   */
  async getAll(params?: {
    area?: string;
    rol?: string;
    is_active?: boolean;
    search?: string;
    page?: number;
  }): Promise<{ results: Usuario[]; count: number }> {
    return ApiClient.get('/usuarios/', params);
  },

  /**
   * Obtener usuario por ID
   */
  async getById(id: string): Promise<Usuario> {
    return ApiClient.get(`/usuarios/${id}/`);
  },

  /**
   * Crear nuevo usuario
   */
  async create(data: CrearUsuarioData): Promise<Usuario> {
    return ApiClient.post('/usuarios/', data);
  },

  /**
   * Actualizar usuario
   */
  async update(id: string, data: Partial<Usuario>): Promise<Usuario> {
    return ApiClient.patch(`/usuarios/${id}/`, data);
  },

  /**
   * Eliminar usuario
   */
  async delete(id: string): Promise<void> {
    return ApiClient.delete(`/usuarios/${id}/`);
  },

  /**
   * Obtener días disponibles
   */
  async getDiasDisponibles(id: string): Promise<DiasDisponibles> {
    return ApiClient.get(`/usuarios/${id}/dias_disponibles/`);
  },

  /**
   * Actualizar días disponibles (recalcular)
   */
  async actualizarDias(id: string): Promise<{ message: string; vacaciones_disponibles: number; administrativos_disponibles: number }> {
    return ApiClient.post(`/usuarios/${id}/actualizar_dias/`);
  },
};
