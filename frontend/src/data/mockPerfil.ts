// ======================================================
// DATOS SIMULADOS - Perfil de Usuario
// Ubicación: src/data/mockPerfil.ts
// ======================================================

import type { UserProfile, Activity, PersonalDocument, Notification, FeriadosStatus } from '../types/perfil';

/**
 * Perfil de usuario simulado
 */
export const mockUserProfile: UserProfile = {
  id: '1',
  nombre: 'María Elena',
  apellidos: 'González Rojas',
  rut: '12.345.678-9',
  email: 'maria.gonzalez@cesfam.cl',
  telefono: '+56 9 8765 4321',
  role: 'Directora',
  area: 'Dirección',
  cargo: 'Directora CESFAM',
  fechaIngreso: new Date('2020-03-15'),
  direccion: 'Av. Principal #1234, Santiago',
  fechaNacimiento: new Date('1985-07-20'),
  estadoCivil: 'Casada',
  contactoEmergencia: {
    nombre: 'Pedro González',
    telefono: '+56 9 8765 1111',
    relacion: 'Esposo'
  }
};

/**
 * Historial de actividades
 */
export const mockActivities: Activity[] = [
  {
    id: '1',
    tipo: 'capacitacion',
    titulo: 'Capacitación en Gestión de Crisis',
    descripcion: 'Participación en taller de manejo de situaciones críticas en salud pública',
    fecha: new Date('2025-11-15')
  },
  {
    id: '2',
    tipo: 'reconocimiento',
    titulo: 'Reconocimiento por Liderazgo',
    descripcion: 'Reconocimiento por excelencia en gestión durante el año 2024',
    fecha: new Date('2025-10-20')
  },
  {
    id: '3',
    tipo: 'evento',
    titulo: 'Participación en Jornada de Salud',
    descripcion: 'Asistencia a jornada de actualización en políticas de salud pública',
    fecha: new Date('2025-09-10')
  },
  {
    id: '4',
    tipo: 'evaluacion',
    titulo: 'Evaluación Anual de Desempeño',
    descripcion: 'Evaluación anual con calificación sobresaliente',
    fecha: new Date('2025-08-05')
  }
];

/**
 * Documentos personales
 */
export const mockDocuments: PersonalDocument[] = [
  {
    id: '1',
    tipo: 'contrato',
    nombre: 'Contrato_Trabajo_2024.pdf',
    fechaSubida: new Date('2024-01-10'),
    tamano: 2456789,
    urlDescarga: '#'
  },
  {
    id: '2',
    tipo: 'evaluacion',
    nombre: 'Evaluacion_Desempeno_2024.pdf',
    fechaSubida: new Date('2025-08-05'),
    tamano: 1234567,
    urlDescarga: '#'
  },
  {
    id: '3',
    tipo: 'certificado',
    nombre: 'Certificado_Liderazgo.pdf',
    fechaSubida: new Date('2025-11-15'),
    tamano: 987654,
    urlDescarga: '#'
  },
  {
    id: '4',
    tipo: 'licencia',
    nombre: 'Licencia_Medica_Oct_2025.pdf',
    fechaSubida: new Date('2025-10-12'),
    tamano: 1567890,
    urlDescarga: '#'
  }
];

/**
 * Notificaciones
 */
export const mockNotifications: Notification[] = [
  {
    id: '1',
    titulo: 'Nueva Circular Institucional',
    mensaje: 'Se ha publicado una nueva circular sobre protocolos de atención',
    fecha: new Date('2025-11-20T10:30:00'),
    leida: false,
    tipo: 'info'
  },
  {
    id: '2',
    titulo: 'Recordatorio: Reunión de Dirección',
    mensaje: 'Reunión programada para mañana a las 09:00 hrs',
    fecha: new Date('2025-11-19T15:00:00'),
    leida: false,
    tipo: 'warning'
  },
  {
    id: '3',
    titulo: 'Documento Aprobado',
    mensaje: 'Tu solicitud de feriados ha sido aprobada',
    fecha: new Date('2025-11-18T11:20:00'),
    leida: true,
    tipo: 'success'
  }
];

/**
 * Estado de feriados
 */
export const mockFeriadosStatus: FeriadosStatus = {
  diasDisponibles: 15,
  diasUsados: 10,
  diasPendientes: 5,
  periodoActual: '2025'
};

/**
 * Función para formatear el tamaño de archivo
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};