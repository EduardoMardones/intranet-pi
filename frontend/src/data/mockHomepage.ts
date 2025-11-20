// ======================================================
// DATOS SIMULADOS - Homepage
// Ubicación: src/data/mockHomepage.ts
// ======================================================

import type { QuickAccess, Reminder, Notification, FeaturedEmployee } from '../types/homepage';

/**
 * Accesos rápidos a módulos principales
 */
export const mockQuickAccess: QuickAccess[] = [
  {
    id: '1',
    title: 'Calendario',
    icon: '📅',
    route: '/calendario',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: '2',
    title: 'Comunicados',
    icon: '📢',
    route: '/comunicados',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    id: '3',
    title: 'Actividades',
    icon: '🎉',
    route: '/actividades',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    id: '4',
    title: 'Directorio',
    icon: '👥',
    route: '/directorio',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50'
  },
  {
    id: '5',
    title: 'Licencias',
    icon: '📄',
    route: '/licencias',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    id: '6',
    title: 'Mi Perfil',
    icon: '⚙️',
    route: '/perfil',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50'
  }
];

/**
 * Recordatorios personales
 */
export const mockReminders: Reminder[] = [
  {
    id: '1',
    title: 'Reunión de equipo médico',
    dueDate: new Date('2025-10-26T10:00:00'),
    priority: 'high',
    completed: false
  },
  {
    id: '2',
    title: 'Entregar informe mensual',
    dueDate: new Date('2025-10-28T17:00:00'),
    priority: 'medium',
    completed: false
  },
  {
    id: '3',
    title: 'Capacitación RCP',
    dueDate: new Date('2025-10-25T14:00:00'),
    priority: 'high',
    completed: true
  },
  {
    id: '4',
    title: 'Revisar protocolos actualizados',
    dueDate: new Date('2025-10-30T09:00:00'),
    priority: 'low',
    completed: false
  }
];

/**
 * Notificaciones del sistema
 */
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Nuevo comunicado oficial',
    message: 'Se ha publicado el protocolo actualizado de urgencias',
    date: new Date('2025-10-25T09:30:00'),
    type: 'info',
    read: false
  },
  {
    id: '2',
    title: 'Mantenimiento programado',
    message: 'El sistema estará en mantenimiento el sábado de 08:00 a 14:00',
    date: new Date('2025-10-24T14:20:00'),
    type: 'warning',
    read: false
  },
  {
    id: '3',
    title: 'Licencia aprobada',
    message: 'Tu solicitud de licencia administrativa ha sido aprobada',
    date: new Date('2025-10-23T11:15:00'),
    type: 'success',
    read: true
  }
];

/**
 * Funcionarios destacados del mes
 */
export const mockFeaturedEmployees: FeaturedEmployee[] = [
  {
    id: '1',
    nombre: 'Carolina',
    apellidos: 'Pérez Gutiérrez',
    area: 'Enfermería',
    logro: 'Excelencia en atención al paciente'
  },
  {
    id: '2',
    nombre: 'Roberto',
    apellidos: 'Fernández López',
    area: 'Medicina General',
    logro: 'Innovación en procesos clínicos'
  },
  {
    id: '3',
    nombre: 'Claudia',
    apellidos: 'Rojas Sepúlveda',
    area: 'Maternidad',
    logro: 'Compromiso y dedicación destacada'
  }
];

/**
 * Obtener saludo según la hora del día
 */
export const getGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 12) return '¡Buenos días';
  if (hour < 19) return '¡Buenas tardes';
  return '¡Buenas noches';
};

/**
 * Formatear fecha en español
 */
export const formatFullDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return date.toLocaleDateString('es-ES', options);
};