// ======================================================
// TIPOS Y INTERFACES - Solicitudes de Vacaciones y Días Administrativos
// Ubicación: src/types/solicitud.ts
// ======================================================

/**
 * Tipo de solicitud
 */
export type TipoSolicitud = 'vacaciones' | 'dia_administrativo';

/**
 * Estado de la solicitud
 */
export type EstadoSolicitud = 
  | 'pendiente_jefatura'      // Esperando aprobación de jefatura
  | 'aprobada_jefatura'       // Aprobada por jefatura, pendiente admin
  | 'rechazada_jefatura'      // Rechazada por jefatura
  | 'pendiente_administracion' // Esperando aprobación de administración
  | 'aprobada'                // Aprobada completamente
  | 'rechazada_administracion' // Rechazada por administración
  | 'cancelada';              // Cancelada por el usuario

/**
 * Interface para aprobación
 */
export interface Aprobacion {
  nivel: 'jefatura' | 'administracion';
  aprobadoPor: string;
  nombreAprobador: string;
  fecha: Date;
  comentarios?: string;
  accion: 'aprobada' | 'rechazada';
}

/**
 * Interface principal de una solicitud
 */
export interface SolicitudVacaciones {
  id: string;
  tipo: TipoSolicitud;
  usuario: {
    id: string;
    rut: string;
    nombre: string;
    apellidos: string;
    area: string;
    cargo: string;
    email: string;
  };
  fechaInicio: Date;
  fechaTermino: Date;
  diasSolicitados: number;
  motivo?: string;
  estado: EstadoSolicitud;
  fechaSolicitud: Date;
  
  // Aprobaciones
  aprobacionJefatura?: Aprobacion;
  aprobacionAdministracion?: Aprobacion;
  
  // Información adicional
  diasDisponibles?: number;
  diasUsados?: number;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interface para crear una solicitud
 */
export interface CrearSolicitudData {
  tipo: TipoSolicitud;
  fechaInicio: Date;
  fechaTermino: Date;
  diasSolicitados: number;
  motivo?: string;
}

/**
 * Interface para aprobar/rechazar una solicitud
 */
export interface AccionSolicitudData {
  solicitudId: string;
  accion: 'aprobar' | 'rechazar';
  comentarios?: string;
  nivel: 'jefatura' | 'administracion';
}

/**
 * Props para componentes de solicitudes
 */
export interface SolicitudCardProps {
  solicitud: SolicitudVacaciones;
  onAprobar: (id: string, comentarios?: string) => void;
  onRechazar: (id: string, comentarios?: string) => void;
  onVerDetalle: (solicitud: SolicitudVacaciones) => void;
  userRole: 'admin' | 'jefatura';
}

/**
 * Configuración de colores por estado
 */
export const ESTADO_CONFIG: Record<EstadoSolicitud, {
  label: string;
  badge: string;
  icon: string;
  descripcion: string;
}> = {
  pendiente_jefatura: {
    label: 'Pendiente Jefatura',
    badge: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    icon: '⏳',
    descripcion: 'Esperando aprobación de jefatura'
  },
  aprobada_jefatura: {
    label: 'Aprobada por Jefatura',
    badge: 'bg-blue-100 text-blue-700 border-blue-300',
    icon: '✓',
    descripcion: 'Aprobada por jefatura, pendiente de administración'
  },
  rechazada_jefatura: {
    label: 'Rechazada por Jefatura',
    badge: 'bg-red-100 text-red-700 border-red-300',
    icon: '✗',
    descripcion: 'Rechazada por jefatura'
  },
  pendiente_administracion: {
    label: 'Pendiente Administración',
    badge: 'bg-orange-100 text-orange-700 border-orange-300',
    icon: '⏳',
    descripcion: 'Esperando aprobación de administración'
  },
  aprobada: {
    label: 'Aprobada',
    badge: 'bg-green-100 text-green-700 border-green-300',
    icon: '✓✓',
    descripcion: 'Aprobada completamente'
  },
  rechazada_administracion: {
    label: 'Rechazada por Administración',
    badge: 'bg-red-100 text-red-700 border-red-300',
    icon: '✗',
    descripcion: 'Rechazada por administración'
  },
  cancelada: {
    label: 'Cancelada',
    badge: 'bg-gray-100 text-gray-700 border-gray-300',
    icon: '⊘',
    descripcion: 'Cancelada por el usuario'
  }
};

/**
 * Configuración de tipos de solicitud
 */
export const TIPO_SOLICITUD_CONFIG: Record<TipoSolicitud, {
  label: string;
  badge: string;
  icon: string;
}> = {
  vacaciones: {
    label: 'Vacaciones',
    badge: 'bg-blue-100 text-blue-700 border-blue-300',
    icon: '🏖️'
  },
  dia_administrativo: {
    label: 'Día Administrativo',
    badge: 'bg-purple-100 text-purple-700 border-purple-300',
    icon: '📋'
  }
};

/**
 * Filtros disponibles para las solicitudes
 */
export interface FiltrosSolicitudes {
  estado?: EstadoSolicitud[];
  tipo?: TipoSolicitud[];
  area?: string[];
  fechaDesde?: Date;
  fechaHasta?: Date;
  busqueda?: string;
}

/**
 * Estadísticas de solicitudes
 */
export interface EstadisticasSolicitudes {
  total: number;
  pendientesJefatura: number;
  pendientesAdministracion: number;
  aprobadas: number;
  rechazadas: number;
  porArea: Record<string, number>;
}