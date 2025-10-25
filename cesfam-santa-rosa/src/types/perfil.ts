// ======================================================
// TIPOS Y INTERFACES - Perfil de Usuario
// Ubicación: src/types/perfil.ts
// ======================================================

/**
 * Tipo de actividad del usuario
 */
export type ActivityType = 
  | 'capacitacion'
  | 'evento'
  | 'reconocimiento'
  | 'evaluacion'
  | 'otro';

/**
 * Tipo de documento personal
 */
export type DocumentType = 
  | 'licencia'
  | 'certificado'
  | 'evaluacion'
  | 'contrato'
  | 'otro';

/**
 * Interface principal del usuario
 */
export interface UserProfile {
  id: string;
  nombre: string;
  apellidos: string;
  rut: string;
  email: string;
  telefono: string;
  role: string;
  area: string;
  avatar?: string;
  cargo: string;
  fechaIngreso: Date;
  // Información adicional
  direccion?: string;
  fechaNacimiento?: Date;
  estadoCivil?: string;
  contactoEmergencia?: ContactoEmergencia;
}

/**
 * Contacto de emergencia
 */
export interface ContactoEmergencia {
  nombre: string;
  telefono: string;
  relacion: string;
}

/**
 * Actividad del usuario
 */
export interface Activity {
  id: string;
  tipo: ActivityType;
  titulo: string;
  descripcion: string;
  fecha: Date;
  icono?: string;
}

/**
 * Documento personal
 */
export interface PersonalDocument {
  id: string;
  tipo: DocumentType;
  nombre: string;
  fechaSubida: Date;
  tamano: number;
  urlDescarga: string;
}

/**
 * Notificación del usuario
 */
export interface Notification {
  id: string;
  titulo: string;
  mensaje: string;
  fecha: Date;
  leida: boolean;
  tipo: 'info' | 'warning' | 'success' | 'error';
}

/**
 * Estado de feriados
 */
export interface FeriadosStatus {
  diasDisponibles: number;
  diasUsados: number;
  diasPendientes: number;
  periodoActual: string;
}

/**
 * Configuración de colores por tipo de actividad
 */
export const ACTIVITY_COLORS: Record<ActivityType, {
  bg: string;
  text: string;
  icon: string;
}> = {
  capacitacion: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    icon: '📚'
  },
  evento: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    icon: '🎉'
  },
  reconocimiento: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    icon: '🏆'
  },
  evaluacion: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    icon: '📊'
  },
  otro: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    icon: '📌'
  }
};

/**
 * Configuración de colores por tipo de documento
 */
export const DOCUMENT_COLORS: Record<DocumentType, {
  color: string;
  icon: string;
}> = {
  licencia: {
    color: 'text-red-600',
    icon: '📄'
  },
  certificado: {
    color: 'text-blue-600',
    icon: '🎓'
  },
  evaluacion: {
    color: 'text-green-600',
    icon: '📈'
  },
  contrato: {
    color: 'text-purple-600',
    icon: '📝'
  },
  otro: {
    color: 'text-gray-600',
    icon: '📎'
  }
};