// ======================================================
// DATOS SIMULADOS - Licencias Médicas
// Ubicación: src/data/mockLicencias.ts
// ======================================================

import type { LicenciaMedica } from '../types/licencia';

/**
 * Licencias médicas simuladas
 * En producción, estos datos vendrán de una API
 */
export const mockLicencias: LicenciaMedica[] = [
  {
    id: '1',
    nombreArchivo: 'licencia_maria_gonzalez_2025_01.pdf',
    tipoArchivo: 'pdf',
    tamanoArchivo: 2458624, // ~2.3 MB
    fechaSubida: new Date('2025-11-15T09:30:00'),
    subidoPor: 'Carlos Muñoz Parra',
    cargoUsuario: 'Subdirector Administrativo',
    urlArchivo: '#',
    empleadoNombre: 'María González Rojas',
    fechaInicio: new Date('2025-11-10'),
    fechaTermino: new Date('2025-11-17'),
    diasLicencia: 7,
    status: 'vigente'
  },
  {
    id: '2',
    nombreArchivo: 'licencia_roberto_fernandez_2025_10.pdf',
    tipoArchivo: 'pdf',
    tamanoArchivo: 1856789,
    fechaSubida: new Date('2025-11-12T14:20:00'),
    subidoPor: 'Ana Silva Morales',
    cargoUsuario: 'Subdirectora Médica',
    urlArchivo: '#',
    empleadoNombre: 'Roberto Fernández López',
    fechaInicio: new Date('2025-10-28'),
    fechaTermino: new Date('2025-11-05'),
    diasLicencia: 8,
    status: 'vencida'
  },
  {
    id: '3',
    nombreArchivo: 'licencia_carolina_perez_2025_11.jpeg',
    tipoArchivo: 'jpeg',
    tamanoArchivo: 3245678,
    fechaSubida: new Date('2025-11-18T11:45:00'),
    subidoPor: 'Carlos Muñoz Parra',
    cargoUsuario: 'Subdirector Administrativo',
    urlArchivo: '#',
    empleadoNombre: 'Carolina Pérez Gutiérrez',
    fechaInicio: new Date('2025-11-18'),
    fechaTermino: new Date('2025-11-22'),
    diasLicencia: 4,
    status: 'vigente'
  },
  {
    id: '4',
    nombreArchivo: 'licencia_luis_torres_2025_10.pdf',
    tipoArchivo: 'pdf',
    tamanoArchivo: 1967543,
    fechaSubida: new Date('2025-11-08T10:15:00'),
    subidoPor: 'Ana Silva Morales',
    cargoUsuario: 'Subdirectora Médica',
    urlArchivo: '#',
    empleadoNombre: 'Luis Torres Vargas',
    fechaInicio: new Date('2025-11-01'),
    fechaTermino: new Date('2025-11-07'),
    diasLicencia: 6,
    status: 'vencida'
  },
  {
    id: '5',
    nombreArchivo: 'licencia_claudia_rojas_2025_11.png',
    tipoArchivo: 'png',
    tamanoArchivo: 4123456,
    fechaSubida: new Date('2025-11-20T16:30:00'),
    subidoPor: 'Carlos Muñoz Parra',
    cargoUsuario: 'Subdirector Administrativo',
    urlArchivo: '#',
    empleadoNombre: 'Claudia Rojas Sepúlveda',
    fechaInicio: new Date('2025-11-20'),
    fechaTermino: new Date('2025-12-02'),
    diasLicencia: 12,
    status: 'vigente'
  }
];

/**
 * Función para formatear el tamaño del archivo
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Función para validar tipo de archivo
 */
export const isValidFileType = (file: File): boolean => {
  const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  return validTypes.includes(file.type);
};

/**
 * Función para obtener la extensión del archivo
 */
export const getFileExtension = (fileName: string): string => {
  return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
};