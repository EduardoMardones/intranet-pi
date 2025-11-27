// ======================================================
// SERVICIO: SolicitudService
// Ubicación: frontend/src/api/services/solicitudService.ts
// Descripción: Gestión de solicitudes de vacaciones y días administrativos
// ======================================================

import axios from '../axios';

// ======================================================
// TIPOS
// ======================================================

// ✅ Tipos que coinciden con el backend Django
export type TipoSolicitud = 'vacaciones' | 'dia_administrativo';
export type EstadoSolicitud = 
  | 'pendiente_jefatura'
  | 'aprobada_jefatura'
  | 'rechazada_jefatura'
  | 'pendiente_direccion'
  | 'aprobada'
  | 'rechazada_direccion'
  | 'cancelada';

export interface Solicitud {
  id: string;
  
  // Relaciones
  usuario: string;  // UUID
  usuario_nombre: string;
  usuario_email: string;
  usuario_cargo: string;
  usuario_area: string;
  
  // Aprobaciones (retrocompatibilidad)
  aprobador: string | null;
  aprobador_nombre: string | null;
  
  // Información de la solicitud
  tipo: TipoSolicitud;
  fecha_inicio: string;      // YYYY-MM-DD
  fecha_termino: string;     // YYYY-MM-DD (backend usa fecha_termino)
  cantidad_dias: number;     // Backend usa cantidad_dias, no dias_solicitados
  motivo: string;
  telefono_contacto: string; // Campo obligatorio en backend
  
  // Estado
  estado: EstadoSolicitud;
  fecha_aprobacion: string | null;
  comentario_aprobacion: string | null;
  
  // Aprobación de Jefatura
  jefatura_aprobador_nombre: string | null;
  jefatura_fecha_aprobacion: string | null;
  jefatura_comentarios: string | null;
  
  // Aprobación de Dirección
  direccion_aprobador_nombre: string | null;
  direccion_fecha_aprobacion: string | null;
  direccion_comentarios: string | null;
  
  // Adjuntos/PDF
  pdf_generado: boolean;
  url_pdf: string;
  
  // Auditoría
  creada_en: string;
  actualizada_en: string;
}

export interface CrearSolicitudDTO {
  tipo: TipoSolicitud;           // 'vacaciones' | 'dia_administrativo'
  fecha_inicio: string;          // YYYY-MM-DD
  fecha_termino: string;         // YYYY-MM-DD (backend usa fecha_termino, no fecha_fin)
  cantidad_dias: number;         // Obligatorio
  motivo: string;                // Obligatorio
  telefono_contacto: string;     // Obligatorio
  archivo_adjunto?: File;        // Opcional - Para subir archivo
}

export interface AprobarRechazarDTO {
  aprobar: boolean;              // true para aprobar, false para rechazar
  comentarios?: string;          // Comentarios opcionales
}

export interface EstadisticasSolicitudes {
  total: number;
  pendientes: number;
  aprobadas: number;
  rechazadas: number;
  vacaciones_usadas: number;
  administrativos_usados: number;
  vacaciones_disponibles: number;
  administrativos_disponibles: number;
}

// ======================================================
// SERVICIO
// ======================================================

class SolicitudService {
  private readonly baseURL = '/solicitudes';

  /**
   * Obtener todas las solicitudes (admin)
   */
  async getAll(params?: {
    usuario?: string;
    tipo?: TipoSolicitud;
    estado?: EstadoSolicitud;
    fecha_inicio?: string;
    fecha_fin?: string;
  }): Promise<Solicitud[]> {
    const response = await axios.get(`${this.baseURL}/`, { params });
    return response.data;
  }

  /**
   * Obtener solicitud por ID
   */
  async getById(id: string): Promise<Solicitud> {
    const response = await axios.get(`${this.baseURL}/${id}/`);
    return response.data;
  }

  /**
   * Obtener mis solicitudes (usuario actual)
   */
  async getMisSolicitudes(params?: {
    tipo?: TipoSolicitud;
    estado?: EstadoSolicitud;
  }): Promise<Solicitud[]> {
    const response = await axios.get(`${this.baseURL}/mis_solicitudes/`, { params });
    return response.data;
  }

  /**
   * Crear nueva solicitud
   */
  async create(data: CrearSolicitudDTO): Promise<Solicitud> {
    // Si hay archivo adjunto, usar FormData
    if (data.archivo_adjunto) {
      const formData = new FormData();
      formData.append('tipo', data.tipo);
      formData.append('fecha_inicio', data.fecha_inicio);
      formData.append('fecha_termino', data.fecha_termino);  // ✅ Corregido
      formData.append('cantidad_dias', data.cantidad_dias.toString());  // ✅ Agregado
      formData.append('motivo', data.motivo);
      formData.append('telefono_contacto', data.telefono_contacto);  // ✅ Agregado
      formData.append('archivo_adjunto', data.archivo_adjunto);

      const response = await axios.post(`${this.baseURL}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    }

    // Sin archivo adjunto
    const response = await axios.post(`${this.baseURL}/`, data);
    return response.data;
  }

  /**
   * Aprobar solicitud como jefatura
   */
  async aprobarJefatura(id: string, data: AprobarRechazarDTO): Promise<Solicitud> {
    const response = await axios.post(`${this.baseURL}/${id}/aprobar_jefatura/`, data);
    return response.data;
  }

  /**
   * Aprobar solicitud como dirección
   */
  async aprobarDireccion(id: string, data: AprobarRechazarDTO): Promise<Solicitud> {
    const response = await axios.post(`${this.baseURL}/${id}/aprobar_direccion/`, data);
    return response.data;
  }

  /**
   * Método genérico de aprobación que detecta automáticamente el nivel según el usuario
   * @param id - ID de la solicitud
   * @param data - Datos de aprobación
   * @param userRole - Nombre del rol del usuario ('Jefatura', 'Dirección', 'Subdirección', etc.)
   */
  async aprobar(
    id: string, 
    data: AprobarRechazarDTO,
    userRole?: string
  ): Promise<Solicitud> {
    // Determinar endpoint según el rol
    const isDireccion = userRole && (
      userRole.toLowerCase().includes('dirección') || 
      userRole.toLowerCase().includes('direccion') ||
      userRole.toLowerCase().includes('subdirección') ||
      userRole.toLowerCase().includes('subdireccion')
    );

    if (isDireccion) {
      return this.aprobarDireccion(id, data);
    } else {
      return this.aprobarJefatura(id, data);
    }
  }

  /**
   * Rechazar solicitud (genérico - detecta automáticamente el nivel)
   */
  async rechazar(
    id: string, 
    data: Omit<AprobarRechazarDTO, 'aprobar'> & { comentarios: string },
    userRole?: string
  ): Promise<Solicitud> {
    // Rechazar es aprobar con aprobar: false
    return this.aprobar(id, { aprobar: false, ...data }, userRole);
  }

  /**
   * Cancelar solicitud (usuario)
   */
  async cancelar(id: string): Promise<Solicitud> {
    const response = await axios.post(`${this.baseURL}/${id}/cancelar/`);
    return response.data;
  }

  /**
   * Obtener solicitudes pendientes (para aprobar)
   */
  async getPendientes(): Promise<Solicitud[]> {
    const response = await axios.get(`${this.baseURL}/pendientes/`);
    return response.data;
  }

  /**
   * Obtener estadísticas de solicitudes del usuario actual
   */
  async getEstadisticas(): Promise<EstadisticasSolicitudes> {
    const response = await axios.get(`${this.baseURL}/estadisticas/`);
    return response.data;
  }

  /**
   * Calcular días entre dos fechas (excluyendo fines de semana)
   */
  calcularDiasHabiles(fechaInicio: string, fechaFin: string): number {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    let dias = 0;

    for (let d = new Date(inicio); d <= fin; d.setDate(d.getDate() + 1)) {
      const diaSemana = d.getDay();
      // 0 = Domingo, 6 = Sábado
      if (diaSemana !== 0 && diaSemana !== 6) {
        dias++;
      }
    }

    return dias;
  }

  /**
   * Validar que las fechas no se superpongan con otras solicitudes
   */
  async validarFechas(fechaInicio: string, fechaTermino: string): Promise<{
    valido: boolean;
    mensaje?: string;
  }> {
    try {
      const response = await axios.post(`${this.baseURL}/validar_fechas/`, {
        fecha_inicio: fechaInicio,
        fecha_termino: fechaTermino,  // ✅ Corregido
      });
      return response.data;
    } catch (error: any) {
      return {
        valido: false,
        mensaje: error.response?.data?.message || 'Error al validar fechas',
      };
    }
  }

  /**
   * Descargar archivo adjunto
   */
  getArchivoUrl(archivoPath: string): string {
    return `${axios.defaults.baseURL}${archivoPath}`;
  }

  /**
   * Descargar PDF de solicitud aprobada
   */
  async descargarPDF(id: string): Promise<Blob> {
    const response = await axios.get(`${this.baseURL}/${id}/descargar_pdf/`, {
      responseType: 'blob',
    });
    return response.data;
  }

  /**
   * Obtener URL para descargar PDF de solicitud aprobada
   */
  getPDFUrl(id: string): string {
    return `${axios.defaults.baseURL}${this.baseURL}/${id}/descargar_pdf/`;
  }
}

// ======================================================
// EXPORT
// ======================================================

export const solicitudService = new SolicitudService();
export default solicitudService;