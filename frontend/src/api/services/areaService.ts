// ======================================================
// SERVICIO: AreaService
// Ubicación: frontend/src/api/services/areaService.ts
// Descripción: Gestión de áreas/departamentos del CESFAM
// ======================================================

import axios from '../axios'; // ✅ USAR AXIOS CONFIGURADO

// ======================================================
// TIPOS
// ======================================================

export interface Area {
  id: string;
  nombre: string;
  codigo: string;  // Ej: MED-001
  descripcion: string;
  color: string;   // Hex color
  icono: string;   // Emoji o nombre de icono
  
  // Jefe del área
  jefe: string | null;  // UUID del usuario jefe
  jefe_nombre: string | null;
  
  // Estadísticas
  total_funcionarios: number;
  
  // Estado
  activa: boolean;
  
  // Auditoría
  creada_en: string;
  actualizada_en: string;
}

export interface CrearAreaDTO {
  nombre: string;
  codigo: string;
  descripcion?: string;
  color?: string;
  icono?: string;
  jefe?: string | null;  // ✅ Permitir null
  activa?: boolean;
}

// ======================================================
// SERVICIO
// ======================================================

class AreaService {
  private readonly baseURL = '/areas'; // ✅ Ruta relativa

  /**
   * Obtener todas las áreas
   */
  async getAll(params?: { activa?: boolean }): Promise<Area[]> {
    const response = await axios.get(`${this.baseURL}/`, { params });
    return response.data;
  }

  /**
   * Obtener área por ID
   */
  async getById(id: string): Promise<Area> {
    const response = await axios.get(`${this.baseURL}/${id}/`);
    return response.data;
  }

  /**
   * Crear nueva área
   */
  async create(data: CrearAreaDTO): Promise<Area> {
    const response = await axios.post(`${this.baseURL}/`, data);
    return response.data;
  }

  /**
   * Actualizar área
   */
  async update(id: string, data: Partial<CrearAreaDTO>): Promise<Area> {
    const response = await axios.put(`${this.baseURL}/${id}/`, data);
    return response.data;
  }

  /**
   * Eliminar área
   */
  async delete(id: string): Promise<void> {
    await axios.delete(`${this.baseURL}/${id}/`);
  }

  /**
   * Obtener funcionarios de un área
   */
  async getFuncionarios(id: string): Promise<any[]> {
    const response = await axios.get(`${this.baseURL}/${id}/funcionarios/`);
    return response.data;
  }

  /**
   * Obtener solo áreas activas
   */
  async getActivas(): Promise<Area[]> {
    return this.getAll({ activa: true });
  }

  /**
   * Desactivar área
   */
  async desactivar(id: string): Promise<Area> {
    return this.update(id, { activa: false });
  }

  /**
   * Activar área
   */
  async activar(id: string): Promise<Area> {
    return this.update(id, { activa: true });
  }

  /**
   * Asignar jefe a un área
   */
  async asignarJefe(areaId: string, usuarioId: string): Promise<Area> {
    return this.update(areaId, { jefe: usuarioId });
  }

  /**
   * Remover jefe de un área
   */
  async removerJefe(areaId: string): Promise<Area> {
    return this.update(areaId, { jefe: null }); // ✅ Ahora funciona con null
  }
}

// ======================================================
// EXPORT
// ======================================================

export const areaService = new AreaService();
export default areaService;