// ======================================================
// SERVICIO: RolService
// Ubicación: frontend/src/api/services/rolService.ts
// Descripción: Gestión de roles del sistema
// ======================================================

import axios from '../axios'; // ✅ USAR AXIOS CONFIGURADO

// ======================================================
// TIPOS
// ======================================================

export interface Rol {
  id: string;
  nombre: string;
  descripcion: string;
  nivel: 1 | 2 | 3 | 4;  // 1=Funcionario, 2=Jefatura, 3=Subdirección, 4=Dirección
  
  // Permisos
  puede_crear_usuarios: boolean;
  puede_eliminar_contenido: boolean;
  puede_aprobar_solicitudes: boolean;
  puede_subir_documentos: boolean;
  puede_crear_actividades: boolean;
  puede_crear_anuncios: boolean;
  puede_gestionar_licencias: boolean;
  puede_ver_reportes: boolean;
  puede_editar_calendario: boolean;
  
  // Auditoría
  creado_en: string;
  actualizado_en: string;
}

export interface CrearRolDTO {
  nombre: string;
  descripcion?: string;
  nivel: 1 | 2 | 3 | 4;
  
  // Permisos (todos opcionales, default false)
  puede_crear_usuarios?: boolean;
  puede_eliminar_contenido?: boolean;
  puede_aprobar_solicitudes?: boolean;
  puede_subir_documentos?: boolean;
  puede_crear_actividades?: boolean;
  puede_crear_anuncios?: boolean;
  puede_gestionar_licencias?: boolean;
  puede_ver_reportes?: boolean;
  puede_editar_calendario?: boolean;
}

// ======================================================
// SERVICIO
// ======================================================

class RolService {
  private readonly baseURL = '/roles'; // ✅ Ruta relativa

  /**
   * Obtener todos los roles
   */
  async getAll(): Promise<Rol[]> {
    const response = await axios.get(`${this.baseURL}/`);
    return response.data;
  }

  /**
   * Obtener rol por ID
   */
  async getById(id: string): Promise<Rol> {
    const response = await axios.get(`${this.baseURL}/${id}/`);
    return response.data;
  }

  /**
   * Crear nuevo rol
   */
  async create(data: CrearRolDTO): Promise<Rol> {
    const response = await axios.post(`${this.baseURL}/`, data);
    return response.data;
  }

  /**
   * Actualizar rol
   */
  async update(id: string, data: Partial<CrearRolDTO>): Promise<Rol> {
    const response = await axios.put(`${this.baseURL}/${id}/`, data);
    return response.data;
  }

  /**
   * Eliminar rol
   */
  async delete(id: string): Promise<void> {
    await axios.delete(`${this.baseURL}/${id}/`);
  }

  /**
   * Obtener roles por nivel
   */
  async getByNivel(nivel: 1 | 2 | 3 | 4): Promise<Rol[]> {
    const roles = await this.getAll();
    return roles.filter(rol => rol.nivel === nivel);
  }

  /**
   * Obtener roles de jefatura o superior (nivel >= 2)
   */
  async getRolesJefatura(): Promise<Rol[]> {
    const roles = await this.getAll();
    return roles.filter(rol => rol.nivel >= 2);
  }

  /**
   * Obtener roles de dirección (nivel >= 3)
   */
  async getRolesDireccion(): Promise<Rol[]> {
    const roles = await this.getAll();
    return roles.filter(rol => rol.nivel >= 3);
  }
}

// ======================================================
// EXPORT
// ======================================================

export const rolService = new RolService();
export default rolService;