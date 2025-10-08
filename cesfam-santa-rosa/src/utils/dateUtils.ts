// ======================================================
// UTILIDADES DE FECHAS - Sistema de Calendario
// Ubicación: src/utils/dateUtils.ts
// ======================================================

import type { CalendarEvent } from '@/types/calendar';

/**
 * Obtiene el primer día del mes
 */
export const getFirstDayOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Obtiene el último día del mes
 */
export const getLastDayOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Obtiene todos los días que se deben mostrar en el calendario
 * (incluyendo días del mes anterior y siguiente para completar las semanas)
 */
export const getCalendarDays = (date: Date): Date[] => {
  const firstDay = getFirstDayOfMonth(date);
  const lastDay = getLastDayOfMonth(date);
  
  // Día de la semana del primer día (0 = domingo, 1 = lunes, etc.)
  const firstDayOfWeek = firstDay.getDay();
  
  // Día de la semana del último día
  const lastDayOfWeek = lastDay.getDay();
  
  const days: Date[] = [];
  
  // Agregar días del mes anterior
  const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  for (let i = daysFromPrevMonth; i > 0; i--) {
    const day = new Date(firstDay);
    day.setDate(day.getDate() - i);
    days.push(day);
  }
  
  // Agregar días del mes actual
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(date.getFullYear(), date.getMonth(), i));
  }
  
  // Agregar días del mes siguiente
  const daysFromNextMonth = lastDayOfWeek === 0 ? 0 : 7 - lastDayOfWeek;
  for (let i = 1; i <= daysFromNextMonth; i++) {
    const day = new Date(lastDay);
    day.setDate(day.getDate() + i);
    days.push(day);
  }
  
  return days;
};

/**
 * Formatea una fecha a string YYYY-MM-DD
 */
export const formatDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Verifica si dos fechas son el mismo día
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Verifica si una fecha es hoy
 */
export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

/**
 * Verifica si una fecha está en el mes actual que se está viendo
 */
export const isCurrentMonth = (date: Date, currentMonth: Date): boolean => {
  return (
    date.getFullYear() === currentMonth.getFullYear() &&
    date.getMonth() === currentMonth.getMonth()
  );
};

/**
 * Obtiene los eventos de una fecha específica
 */
export const getEventsForDate = (date: Date, events: CalendarEvent[]): CalendarEvent[] => {
  const dateString = formatDateToString(date);
  return events.filter(event => event.fecha === dateString);
};

/**
 * Formatea el mes y año para mostrar en el header
 */
export const formatMonthYear = (date: Date): string => {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

/**
 * Obtiene el mes anterior
 */
export const getPreviousMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
};

/**
 * Obtiene el mes siguiente
 */
export const getNextMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
};

/**
 * Formatea una hora HH:mm a formato legible
 */
export const formatTime = (time: string): string => {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  return `${hours}:${minutes}`;
};

/**
 * Obtiene el nombre del día de la semana
 */
export const getDayName = (date: Date, short: boolean = false): string => {
  const days = short 
    ? ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    : ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return days[date.getDay()];
};