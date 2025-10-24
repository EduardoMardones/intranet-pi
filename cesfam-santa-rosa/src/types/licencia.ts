// ======================================================
// TIPOS Y INTERFACES - Gestión de Licencias Médicas
// Ubicación: src/types/licencia.ts
// ======================================================

/**
 * Tipos de archivo permitidos
 */
export type FileTypeAllowed = 'pdf' | 'jpeg' | 'jpg' | 'png';

/**
 * Estado de la licencia médica
 */
export type LicenciaStatus = 'pendiente' | 'aprobada' | 'rechazada' | 'vigente' | 'vencida';

/**
 * Interface principal de una licencia médica
 */
export interface LicenciaMedica {
  id: string;
  nombreArchivo: string;
  tipoArchivo: FileTypeAllowed;
  tamanoArchivo: number; // en bytes
  fechaSubida: Date;
  subidoPor: string; // nombre del usuario que subió
  cargoUsuario: string; // cargo del usuario
  urlArchivo: string; // URL del archivo (mock por ahora)
  empleadoNombre?: string; // nombre del empleado con licencia
  fechaInicio?: Date; // fecha de inicio de la licencia
  fechaTermino?: Date; // fecha de término
  diasLicencia?: number; // cantidad de días
  status?: LicenciaStatus;
  // Campos para escalabilidad futura
  // diagnostico?: string;
  // medicoTratante?: string;
  // observaciones?: string;
}

/**
 * Props para el componente FileUploader
 */
export interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  hasFiles: boolean;
}

/**
 * Props para el componente LicenciasTable
 */
export interface LicenciasTableProps {
  licencias: LicenciaMedica[];
  onView: (licencia: LicenciaMedica) => void;
  onDownload: (licencia: LicenciaMedica) => void;
  onDelete: (licenciaId: string) => void;
}

/**
 * Configuración de íconos y colores por tipo de archivo
 */
export const FILE_TYPE_CONFIG: Record<FileTypeAllowed, {
  icon: string;
  color: string;
  bgColor: string;
}> = {
  pdf: {
    icon: '📄',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  jpeg: {
    icon: '🖼️',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  jpg: {
    icon: '🖼️',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  png: {
    icon: '🖼️',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  }
};

/**
 * Configuración de estados de licencia
 */
export const STATUS_CONFIG: Record<LicenciaStatus, {
  label: string;
  badge: string;
}> = {
  pendiente: {
    label: 'Pendiente',
    badge: 'bg-yellow-100 text-yellow-700 border-yellow-300'
  },
  aprobada: {
    label: 'Aprobada',
    badge: 'bg-green-100 text-green-700 border-green-300'
  },
  rechazada: {
    label: 'Rechazada',
    badge: 'bg-red-100 text-red-700 border-red-300'
  },
  vigente: {
    label: 'Vigente',
    badge: 'bg-blue-100 text-blue-700 border-blue-300'
  },
  vencida: {
    label: 'Vencida',
    badge: 'bg-gray-100 text-gray-700 border-gray-300'
  }
};

/**
 * Tipos de archivo MIME permitidos
 */
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png'
];

/**
 * Extensiones permitidas
 */
export const ALLOWED_EXTENSIONS = ['.pdf', '.jpeg', '.jpg', '.png'];

/**
 * Tamaño máximo de archivo (10MB en bytes)
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024;