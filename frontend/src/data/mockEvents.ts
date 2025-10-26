// ======================================================
// DATOS SIMULADOS - Eventos del Calendario CESFAM
// Ubicación: src/data/mockEvents.ts
// ======================================================

import type { CalendarEvent } from '../types/calendar';

/**
 * Eventos simulados para el calendario institucional
 * En producción, estos datos vendrán de una API
 */
export const mockEvents: CalendarEvent[] = [
  {
    id: 1,
    fecha: '2025-10-15',
    titulo: 'Reunión Médica Mensual',
    descripcion: 'Revisión mensual de casos clínicos complejos y actualización de protocolos de atención.',
    tipo: 'reunion',
    horaInicio: '09:00',
    horaFin: '11:00',
    ubicacion: 'Sala de Reuniones Principal',
    organizador: 'Dr. Juan Pérez'
  },
  {
    id: 2,
    fecha: '2025-10-20',
    titulo: 'Capacitación Software Médico',
    descripcion: 'Uso de nuevo software de fichas médicas electrónicas y sistema de agendamiento.',
    tipo: 'capacitacion',
    horaInicio: '14:00',
    horaFin: '17:00',
    ubicacion: 'Sala de Capacitación',
    organizador: 'Dpto. de Informática'
  },
  {
    id: 3,
    fecha: '2025-10-12',
    titulo: 'Día del Respeto a la Diversidad',
    descripcion: 'Feriado nacional - CESFAM cerrado',
    tipo: 'feriado',
    horaInicio: '00:00',
    horaFin: '23:59'
  },
  {
    id: 4,
    fecha: '2025-10-22',
    titulo: 'Jornada de Vacunación',
    descripcion: 'Campaña especial de vacunación contra la influenza para adultos mayores.',
    tipo: 'otro',
    horaInicio: '08:00',
    horaFin: '16:00',
    ubicacion: 'Hall Principal',
    organizador: 'Enfermería'
  },
  {
    id: 5,
    fecha: '2025-10-25',
    titulo: 'Capacitación RCP',
    descripcion: 'Curso de reanimación cardiopulmonar básica y avanzada para todo el personal.',
    tipo: 'capacitacion',
    horaInicio: '10:00',
    horaFin: '13:00',
    ubicacion: 'Auditorio',
    organizador: 'SAMU'
  },
  {
    id: 6,
    fecha: '2025-10-28',
    titulo: 'Reunión Administrativa',
    descripcion: 'Revisión de presupuesto trimestral y planificación de compras de insumos médicos.',
    tipo: 'reunion',
    horaInicio: '15:00',
    horaFin: '17:00',
    ubicacion: 'Oficina Dirección',
    organizador: 'Dirección CESFAM'
  },
  {
    id: 7,
    fecha: '2025-10-08',
    titulo: 'Control de Calidad',
    descripcion: 'Auditoría interna de procesos de atención y revisión de indicadores de salud.',
    tipo: 'reunion',
    horaInicio: '09:00',
    horaFin: '12:00',
    ubicacion: 'Sala de Reuniones',
    organizador: 'Calidad'
  },
  {
    id: 8,
    fecha: '2025-10-18',
    titulo: 'Taller de Salud Mental',
    descripcion: 'Capacitación en detección temprana de problemas de salud mental en atención primaria.',
    tipo: 'capacitacion',
    horaInicio: '14:30',
    horaFin: '17:30',
    ubicacion: 'Auditorio',
    organizador: 'Salud Mental'
  },
  {
    id: 9,
    fecha: '2025-10-31',
    titulo: 'Día de las Iglesias Evangélicas',
    descripcion: 'Feriado nacional - CESFAM cerrado',
    tipo: 'feriado',
    horaInicio: '00:00',
    horaFin: '23:59'
  },
  {
    id: 10,
    fecha: '2025-11-01',
    titulo: 'Día de Todos los Santos',
    descripcion: 'Feriado nacional - CESFAM cerrado',
    tipo: 'feriado',
    horaInicio: '00:00',
    horaFin: '23:59'
  }
];