// ======================================================
// SERVICIO: UsuarioService
// Ubicación: frontend/src/api/services/usuarioService.ts
// Descripción: Gestión completa de usuarios (CRUD + extras)
// ======================================================

import axios from '../axios'; // ✅ USAR AXIOS CONFIGURADO

// ======================================================
// TIPOS (basados en el serializer de Django)
// ======================================================

export interface Usuario {
  // Identificación
  id: string;
  rut: string;
  
  // Datos personales
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  nombre_completo: string;
  email: string;
  telefono?: string;
  fecha_nacimiento?: string;
  direccion?: string;
  
  // Información profesional
  cargo: string;
  area: string;  // UUID
  area_nombre: string;
  rol: string;   // UUID
  rol_nombre: string;
  fecha_ingreso: string;
  es_jefe_de_area: boolean;
  
  // Contacto de emergencia
  contacto_emergencia_nombre?: string;
  contacto_emergencia_telefono?: string;
  contacto_emergencia_relacion?: string;
  
  // Días disponibles
  dias_vacaciones_anuales: number;
  dias_vacaciones_disponibles: number;
  dias_vacaciones_usados: number;
  dias_administrativos_anuales: number;
  dias_administrativos_disponibles: number;
  dias_administrativos_usados: number;
  
  // Avatar y preferencias
  avatar?: string;
  tema_preferido: 'light' | 'dark';
  
  // Estado
  is_active: boolean;
  
  // Auditoría
  creado_en: string;
  actualizado_en: string;
  ultimo_acceso?: string;
  
  // ✅ PERMISOS DEL ROL (desde serializer)
  rol_nivel: number;
  rol_puede_crear_usuarios: boolean;
  rol_puede_eliminar_contenido: boolean;
  rol_puede_aprobar_solicitudes: boolean;
  rol_puede_subir_documentos: boolean;
  rol_puede_crear_actividades: boolean;
  rol_puede_crear_anuncios: boolean;
  rol_puede_gestionar_licencias: boolean;
  rol_puede_ver_reportes: boolean;
  rol_puede_editar_calendario: boolean;
}

export interface CrearUsuarioDTO {
  // OBLIGATORIOS
  rut: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  password: string;
  password_confirm?: string; // ✅ Confirmación de contraseña
  cargo: string;
  area: string;  // UUID
  rol: string;   // UUID
  fecha_ingreso: string;
  
  // OPCIONALES - Contacto
  telefono?: string;
  fecha_nacimiento?: string;
  direccion?: string;
  
  // OPCIONALES - Emergencia
  contacto_emergencia_nombre?: string;
  contacto_emergencia_telefono?: string;
  contacto_emergencia_relacion?: string;
  
  // OPCIONALES - Otros
  es_jefe_de_area?: boolean;
  tema_preferido?: 'light' | 'dark';
}

export interface ActualizarUsuarioDTO {
  // Todos opcionales excepto lo que se quiera cambiar
  rut?: string;
  nombre?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  email?: string;
  password?: string;  // Solo si se quiere cambiar
  password_confirm?: string; // ✅ Confirmación de contraseña
  cargo?: string;
  area?: string;
  rol?: string;
  fecha_ingreso?: string;
  telefono?: string;
  fecha_nacimiento?: string;
  direccion?: string;
  contacto_emergencia_nombre?: string;
  contacto_emergencia_telefono?: string;
  contacto_emergencia_relacion?: string;
  es_jefe_de_area?: boolean;
  is_active?: boolean;
  tema_preferido?: 'light' | 'dark';
}

export interface DiasDisponibles {
  vacaciones_disponibles: number;
  vacaciones_usados: number;
  vacaciones_anuales: number;
  administrativos_disponibles: number;
  administrativos_usados: number;
  administrativos_anuales: number;
}

// ======================================================
// SERVICIO
// ======================================================

class UsuarioService {
  private readonly baseURL = '/usuarios'; // ✅ Ruta relativa, axios ya tiene el baseURL

  /**
   * Obtener todos los usuarios
   */
  async getAll(params?: {
    area?: string;
    rol?: string;
    is_active?: boolean;
    search?: string;
  }): Promise<Usuario[]> {
    const response = await axios.get(`${this.baseURL}/`, { params });
    return response.data;
  }

  /**
   * Obtener usuario por ID
   */
  async getById(id: string): Promise<Usuario> {
    const response = await axios.get(`${this.baseURL}/${id}/`);
    return response.data;
  }

  /**
   * Obtener usuario actual (me)
   */
  async getCurrentUser(): Promise<Usuario> {
    const response = await axios.get(`${this.baseURL}/me/`);
    return response.data;
  }

  /**
   * Crear nuevo usuario
   */
  async create(data: CrearUsuarioDTO): Promise<Usuario> {
    const response = await axios.post(`${this.baseURL}/`, data);
    return response.data;
  }

  /**
   * Actualizar usuario completo
   */
  async update(id: string, data: ActualizarUsuarioDTO): Promise<Usuario> {
    const response = await axios.put(`${this.baseURL}/${id}/`, data);
    return response.data;
  }

  /**
   * Actualizar usuario parcial
   */
  async patch(id: string, data: Partial<ActualizarUsuarioDTO>): Promise<Usuario> {
    const response = await axios.patch(`${this.baseURL}/${id}/`, data);
    return response.data;
  }

  /**
   * Eliminar usuario (soft delete: is_active = false)
   */
  async delete(id: string): Promise<void> {
    await axios.delete(`${this.baseURL}/${id}/`);
  }

  /**
   * Desactivar usuario (alternativa a delete)
   */
  async deactivate(id: string): Promise<Usuario> {
    return this.patch(id, { is_active: false });
  }

  /**
   * Activar usuario
   */
  async activate(id: string): Promise<Usuario> {
    return this.patch(id, { is_active: true });
  }

  /**
   * Obtener días disponibles de un usuario
   */
  async getDiasDisponibles(id: string): Promise<DiasDisponibles> {
    const response = await axios.get(`${this.baseURL}/${id}/dias_disponibles/`);
    return response.data;
  }

  /**
   * Recalcular días disponibles
   */
  async recalcularDias(id: string): Promise<DiasDisponibles> {
    const response = await axios.post(`${this.baseURL}/${id}/actualizar_dias/`);
    return response.data;
  }

  /**
   * Subir avatar
   */
  async uploadAvatar(id: string, file: File): Promise<Usuario> {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await axios.patch(
      `${this.baseURL}/${id}/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  /**
   * Buscar usuarios por término
   */
  async search(query: string): Promise<Usuario[]> {
    return this.getAll({ search: query });
  }

  /**
   * Obtener usuarios por área
   */
  async getByArea(areaId: string): Promise<Usuario[]> {
    return this.getAll({ area: areaId });
  }

  /**
   * Obtener usuarios por rol
   */
  async getByRol(rolId: string): Promise<Usuario[]> {
    return this.getAll({ rol: rolId });
  }

  /**
   * Obtener solo usuarios activos
   */
  async getActivos(): Promise<Usuario[]> {
    return this.getAll({ is_active: true });
  }
}

// ======================================================
// EXPORT
// ======================================================

export const usuarioService = new UsuarioService();
export default usuarioService;