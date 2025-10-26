// ======================================================
// TIPOS Y INTERFACES - Directorio de Funcionarios CESFAM
// Ubicación: src/types/employee.ts
// ======================================================

/**
 * Tipos de roles institucionales
 */
export type RoleType = 
  | 'medico'
  | 'enfermero'
  | 'tecnico_enfermeria'
  | 'matrona'
  | 'odontologo'
  | 'kinesiologo'
  | 'nutricionista'
  | 'psicologo'
  | 'administrativo'
  | 'direccion'
  | 'subdireccion';

/**
 * Áreas o departamentos del CESFAM
 */
export type AreaType =
  | 'direccion'
  | 'subdireccion_administrativa'
  | 'subdireccion_medica'
  | 'enfermeria'
  | 'medicina'
  | 'odontologia'
  | 'kinesiologia'
  | 'nutricion'
  | 'salud_mental'
  | 'maternidad'
  | 'administracion'
  | 'informatica';

/**
 * Interface principal de un funcionario
 */
export interface Employee {
  id: string;
  nombre: string;
  apellidos: string;
  role: RoleType;
  area: AreaType;
  email: string;
  telefono?: string;
  extension?: string;
  avatar?: string; // URL de la foto (opcional)
  // Campos para escalabilidad futura
  // especialidad?: string;
  // horario?: string;
  // disponible?: boolean;
}

/**
 * Props para el componente FuncionarioCard
 */
export interface FuncionarioCardProps {
  employee: Employee;
}

/**
 * Props para el componente AreaSection
 */
export interface AreaSectionProps {
  area: AreaType;
  employees: Employee[];
}

/**
 * Configuración de colores por rol
 */
export const ROLE_CONFIG: Record<RoleType, {
  badge: string;
  label: string;
}> = {
  medico: {
    badge: 'bg-blue-100 text-blue-700 border-blue-300',
    label: 'Médico/a'
  },
  enfermero: {
    badge: 'bg-cyan-100 text-cyan-700 border-cyan-300',
    label: 'Enfermero/a'
  },
  tecnico_enfermeria: {
    badge: 'bg-teal-100 text-teal-700 border-teal-300',
    label: 'Técnico Enfermería'
  },
  matrona: {
    badge: 'bg-pink-100 text-pink-700 border-pink-300',
    label: 'Matrona'
  },
  odontologo: {
    badge: 'bg-indigo-100 text-indigo-700 border-indigo-300',
    label: 'Odontólogo/a'
  },
  kinesiologo: {
    badge: 'bg-purple-100 text-purple-700 border-purple-300',
    label: 'Kinesiólogo/a'
  },
  nutricionista: {
    badge: 'bg-green-100 text-green-700 border-green-300',
    label: 'Nutricionista'
  },
  psicologo: {
    badge: 'bg-violet-100 text-violet-700 border-violet-300',
    label: 'Psicólogo/a'
  },
  administrativo: {
    badge: 'bg-gray-100 text-gray-700 border-gray-300',
    label: 'Administrativo/a'
  },
  direccion: {
    badge: 'bg-[#009DDC] text-white border-[#0088c4]',
    label: 'Director/a'
  },
  subdireccion: {
    badge: 'bg-[#4DFFF3] text-gray-800 border-[#009DDC]',
    label: 'Subdirector/a'
  }
};

/**
 * Configuración de áreas/departamentos
 */
export const AREA_CONFIG: Record<AreaType, {
  label: string;
  icon: string;
  color: string;
}> = {
  direccion: {
    label: 'Dirección',
    icon: '👔',
    color: 'text-blue-600'
  },
  subdireccion_administrativa: {
    label: 'Subdirección Administrativa',
    icon: '📋',
    color: 'text-cyan-600'
  },
  subdireccion_medica: {
    label: 'Subdirección Médica',
    icon: '⚕️',
    color: 'text-blue-600'
  },
  enfermeria: {
    label: 'Enfermería',
    icon: '💉',
    color: 'text-cyan-600'
  },
  medicina: {
    label: 'Medicina General',
    icon: '🩺',
    color: 'text-blue-600'
  },
  odontologia: {
    label: 'Odontología',
    icon: '🦷',
    color: 'text-indigo-600'
  },
  kinesiologia: {
    label: 'Kinesiología',
    icon: '🏃',
    color: 'text-purple-600'
  },
  nutricion: {
    label: 'Nutrición',
    icon: '🥗',
    color: 'text-green-600'
  },
  salud_mental: {
    label: 'Salud Mental',
    icon: '🧠',
    color: 'text-violet-600'
  },
  maternidad: {
    label: 'Maternidad',
    icon: '👶',
    color: 'text-pink-600'
  },
  administracion: {
    label: 'Administración',
    icon: '📊',
    color: 'text-gray-600'
  },
  informatica: {
    label: 'Informática',
    icon: '💻',
    color: 'text-blue-600'
  }
};