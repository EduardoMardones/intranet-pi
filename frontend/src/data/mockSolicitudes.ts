// ======================================================
// DATOS MOCK - Solicitudes de Vacaciones y Días Administrativos
// Ubicación: src/data/mockSolicitudes.ts
// ======================================================

import type{ SolicitudVacaciones } from '../types/solicitud';

export const mockSolicitudes: SolicitudVacaciones[] = [
  {
    id: '1',
    tipo: 'vacaciones',
    usuario: {
      id: 'u1',
      rut: '12.345.678-9',
      nombre: 'María',
      apellidos: 'González Pérez',
      area: 'Enfermería',
      cargo: 'Enfermera',
      email: 'maria.gonzalez@cesfam.cl'
    },
    fechaInicio: new Date('2025-12-15'),
    fechaTermino: new Date('2025-12-22'),
    diasSolicitados: 6,
    motivo: 'Vacaciones de fin de año para descanso familiar',
    estado: 'pendiente_jefatura',
    fechaSolicitud: new Date('2025-11-18'),
    diasDisponibles: 15,
    diasUsados: 9,
    createdAt: new Date('2025-11-18T09:30:00'),
    updatedAt: new Date('2025-11-18T09:30:00')
  },
  {
    id: '2',
    tipo: 'dia_administrativo',
    usuario: {
      id: 'u2',
      rut: '13.456.789-0',
      nombre: 'Carlos',
      apellidos: 'Rojas Silva',
      area: 'Administración',
      cargo: 'Asistente Administrativo',
      email: 'carlos.rojas@cesfam.cl'
    },
    fechaInicio: new Date('2025-11-25'),
    fechaTermino: new Date('2025-11-25'),
    diasSolicitados: 1,
    motivo: 'Trámites personales urgentes',
    estado: 'aprobada_jefatura',
    fechaSolicitud: new Date('2025-11-15'),
    aprobacionJefatura: {
      nivel: 'jefatura',
      aprobadoPor: 'j1',
      nombreAprobador: 'Ana Torres',
      fecha: new Date('2025-11-16T14:20:00'),
      comentarios: 'Aprobado, coordinación con equipo realizada',
      accion: 'aprobada'
    },
    diasDisponibles: 3,
    diasUsados: 2,
    createdAt: new Date('2025-11-15T10:15:00'),
    updatedAt: new Date('2025-11-16T14:20:00')
  },
  {
    id: '3',
    tipo: 'vacaciones',
    usuario: {
      id: 'u3',
      rut: '14.567.890-1',
      nombre: 'Luis',
      apellidos: 'Martínez Castro',
      area: 'Medicina',
      cargo: 'Médico General',
      email: 'luis.martinez@cesfam.cl'
    },
    fechaInicio: new Date('2025-12-01'),
    fechaTermino: new Date('2025-12-15'),
    diasSolicitados: 11,
    motivo: 'Vacaciones programadas de fin de año',
    estado: 'aprobada',
    fechaSolicitud: new Date('2025-10-20'),
    aprobacionJefatura: {
      nivel: 'jefatura',
      aprobadoPor: 'j2',
      nombreAprobador: 'Dr. Pedro Soto',
      fecha: new Date('2025-10-21T11:00:00'),
      comentarios: 'Aprobado, reemplazo coordinado',
      accion: 'aprobada'
    },
    aprobacionAdministracion: {
      nivel: 'administracion',
      aprobadoPor: 'a1',
      nombreAprobador: 'Director Juan Valenzuela',
      fecha: new Date('2025-10-22T09:15:00'),
      comentarios: 'Aprobado definitivamente',
      accion: 'aprobada'
    },
    diasDisponibles: 15,
    diasUsados: 4,
    createdAt: new Date('2025-10-20T16:30:00'),
    updatedAt: new Date('2025-10-22T09:15:00')
  },
  {
    id: '4',
    tipo: 'vacaciones',
    usuario: {
      id: 'u4',
      rut: '15.678.901-2',
      nombre: 'Patricia',
      apellidos: 'Hernández Muñoz',
      area: 'Odontología',
      cargo: 'Odontóloga',
      email: 'patricia.hernandez@cesfam.cl'
    },
    fechaInicio: new Date('2025-11-28'),
    fechaTermino: new Date('2025-12-05'),
    diasSolicitados: 6,
    motivo: 'Viaje familiar programado',
    estado: 'rechazada_jefatura',
    fechaSolicitud: new Date('2025-11-10'),
    aprobacionJefatura: {
      nivel: 'jefatura',
      aprobadoPor: 'j3',
      nombreAprobador: 'Dra. Carmen López',
      fecha: new Date('2025-11-12T10:30:00'),
      comentarios: 'No es posible aprobar en estas fechas debido a alta demanda de pacientes y falta de reemplazo disponible',
      accion: 'rechazada'
    },
    diasDisponibles: 12,
    diasUsados: 3,
    createdAt: new Date('2025-11-10T14:45:00'),
    updatedAt: new Date('2025-11-12T10:30:00')
  },
  {
    id: '5',
    tipo: 'dia_administrativo',
    usuario: {
      id: 'u5',
      rut: '16.789.012-3',
      nombre: 'Roberto',
      apellidos: 'Fernández Díaz',
      area: 'Kinesiología',
      cargo: 'Kinesiólogo',
      email: 'roberto.fernandez@cesfam.cl'
    },
    fechaInicio: new Date('2025-11-22'),
    fechaTermino: new Date('2025-11-22'),
    diasSolicitados: 1,
    motivo: 'Consulta médica personal',
    estado: 'pendiente_jefatura',
    fechaSolicitud: new Date('2025-11-19'),
    diasDisponibles: 4,
    diasUsados: 1,
    createdAt: new Date('2025-11-19T08:00:00'),
    updatedAt: new Date('2025-11-19T08:00:00')
  },
  {
    id: '6',
    tipo: 'vacaciones',
    usuario: {
      id: 'u6',
      rut: '17.890.123-4',
      nombre: 'Isabel',
      apellidos: 'Vargas Morales',
      area: 'Nutrición',
      cargo: 'Nutricionista',
      email: 'isabel.vargas@cesfam.cl'
    },
    fechaInicio: new Date('2025-12-20'),
    fechaTermino: new Date('2026-01-03'),
    diasSolicitados: 11,
    motivo: 'Vacaciones de fiestas de fin de año',
    estado: 'pendiente_administracion',
    fechaSolicitud: new Date('2025-11-05'),
    aprobacionJefatura: {
      nivel: 'jefatura',
      aprobadoPor: 'j4',
      nombreAprobador: 'Jefa Daniela Ruiz',
      fecha: new Date('2025-11-06T15:40:00'),
      comentarios: 'Aprobado por jefatura, coordinación realizada con equipo',
      accion: 'aprobada'
    },
    diasDisponibles: 15,
    diasUsados: 4,
    createdAt: new Date('2025-11-05T11:20:00'),
    updatedAt: new Date('2025-11-06T15:40:00')
  },
  {
    id: '7',
    tipo: 'dia_administrativo',
    usuario: {
      id: 'u7',
      rut: '18.901.234-5',
      nombre: 'Andrés',
      apellidos: 'Soto Pizarro',
      area: 'Administración',
      cargo: 'Encargado de Bodega',
      email: 'andres.soto@cesfam.cl'
    },
    fechaInicio: new Date('2025-11-24'),
    fechaTermino: new Date('2025-11-24'),
    diasSolicitados: 1,
    motivo: 'Trámites bancarios',
    estado: 'aprobada_jefatura',
    fechaSolicitud: new Date('2025-11-17'),
    aprobacionJefatura: {
      nivel: 'jefatura',
      aprobadoPor: 'j1',
      nombreAprobador: 'Ana Torres',
      fecha: new Date('2025-11-18T09:00:00'),
      comentarios: 'Aprobado',
      accion: 'aprobada'
    },
    diasDisponibles: 5,
    diasUsados: 0,
    createdAt: new Date('2025-11-17T13:30:00'),
    updatedAt: new Date('2025-11-18T09:00:00')
  },
  {
    id: '8',
    tipo: 'vacaciones',
    usuario: {
      id: 'u8',
      rut: '19.012.345-6',
      nombre: 'Carolina',
      apellidos: 'Ramírez Flores',
      area: 'Salud Mental',
      cargo: 'Psicóloga',
      email: 'carolina.ramirez@cesfam.cl'
    },
    fechaInicio: new Date('2026-01-06'),
    fechaTermino: new Date('2026-01-17'),
    diasSolicitados: 10,
    motivo: 'Vacaciones de verano',
    estado: 'pendiente_jefatura',
    fechaSolicitud: new Date('2025-11-20'),
    diasDisponibles: 14,
    diasUsados: 4,
    createdAt: new Date('2025-11-20T10:00:00'),
    updatedAt: new Date('2025-11-20T10:00:00')
  },
  {
    id: '9',
    tipo: 'vacaciones',
    usuario: {
      id: 'u9',
      rut: '20.123.456-7',
      nombre: 'Fernando',
      apellidos: 'Núñez Gutiérrez',
      area: 'Enfermería',
      cargo: 'Técnico en Enfermería',
      email: 'fernando.nunez@cesfam.cl'
    },
    fechaInicio: new Date('2025-12-02'),
    fechaTermino: new Date('2025-12-09'),
    diasSolicitados: 6,
    motivo: 'Asuntos personales',
    estado: 'rechazada_administracion',
    fechaSolicitud: new Date('2025-11-01'),
    aprobacionJefatura: {
      nivel: 'jefatura',
      aprobadoPor: 'j5',
      nombreAprobador: 'Enfermera Jefe Rosa Medina',
      fecha: new Date('2025-11-02T14:00:00'),
      comentarios: 'Aprobado por jefatura',
      accion: 'aprobada'
    },
    aprobacionAdministracion: {
      nivel: 'administracion',
      aprobadoPor: 'a1',
      nombreAprobador: 'Director Juan Valenzuela',
      fecha: new Date('2025-11-04T10:30:00'),
      comentarios: 'No se puede aprobar debido a necesidades operacionales en esas fechas',
      accion: 'rechazada'
    },
    diasDisponibles: 10,
    diasUsados: 5,
    createdAt: new Date('2025-11-01T16:20:00'),
    updatedAt: new Date('2025-11-04T10:30:00')
  },
  {
    id: '10',
    tipo: 'dia_administrativo',
    usuario: {
      id: 'u10',
      rut: '21.234.567-8',
      nombre: 'Mónica',
      apellidos: 'Castro Bravo',
      area: 'Maternidad',
      cargo: 'Matrona',
      email: 'monica.castro@cesfam.cl'
    },
    fechaInicio: new Date('2025-11-26'),
    fechaTermino: new Date('2025-11-26'),
    diasSolicitados: 1,
    motivo: 'Trámite notarial urgente',
    estado: 'pendiente_administracion',
    fechaSolicitud: new Date('2025-11-18'),
    aprobacionJefatura: {
      nivel: 'jefatura',
      aprobadoPor: 'j6',
      nombreAprobador: 'Matrona Coordinadora Elena Vidal',
      fecha: new Date('2025-11-19T11:15:00'),
      comentarios: 'Aprobado, cobertura asegurada',
      accion: 'aprobada'
    },
    diasDisponibles: 4,
    diasUsados: 1,
    createdAt: new Date('2025-11-18T15:00:00'),
    updatedAt: new Date('2025-11-19T11:15:00')
  }
];

/**
 * Función para filtrar solicitudes según el rol del usuario
 */
export const filtrarSolicitudesPorRol = (
  solicitudes: SolicitudVacaciones[],
  userRole: 'admin' | 'jefatura',
  userArea?: string
): SolicitudVacaciones[] => {
  if (userRole === 'admin') {
    return solicitudes;
  }
  
  // Para jefatura, solo mostrar solicitudes de su área
  if (userRole === 'jefatura' && userArea) {
    return solicitudes.filter(s => s.usuario.area === userArea);
  }
  
  return [];
};

/**
 * Función para obtener solicitudes pendientes según el rol
 */
export const obtenerSolicitudesPendientes = (
  solicitudes: SolicitudVacaciones[],
  userRole: 'admin' | 'jefatura'
): SolicitudVacaciones[] => {
  if (userRole === 'admin') {
    return solicitudes.filter(s => 
      s.estado === 'pendiente_administracion' || 
      s.estado === 'aprobada_jefatura'
    );
  }
  
  if (userRole === 'jefatura') {
    return solicitudes.filter(s => 
      s.estado === 'pendiente_jefatura'
    );
  }
  
  return [];
};