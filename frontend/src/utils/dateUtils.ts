// ======================================================
// UTILIDADES DE FECHAS - Sistema Completo
// Ubicación: src/utils/dateUtils.ts
// Incluye: Funciones de Calendario + Funciones para Admin
// ======================================================

import type { CalendarEvent } from '@/types/calendar';

// ======================================================
// FUNCIONES DE CALENDARIO (EXISTENTES)
// ======================================================

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

// ======================================================
// FUNCIONES ADICIONALES PARA PANEL ADMINISTRATIVO
// (Agregadas para el sistema de actividades)
// ======================================================

/**
 * Formatea una fecha para mostrar en las tarjetas de actividad
 * @param date - Fecha a formatear
 * @returns String formateado (Ej: "Viernes 25 de Octubre, 2025 - 12:30")
 */
export const formatActivityDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  const formatted = date.toLocaleDateString('es-CL', options);
  
  // Capitalizar primera letra
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

/**
 * Formatea una fecha de manera corta
 * @param date - Fecha a formatear
 * @returns String formateado (Ej: "25/10/2025")
 */
export const formatShortDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};

/**
 * Formatea solo la hora de una fecha (Date object)
 * @param date - Fecha a formatear
 * @returns String formateado (Ej: "12:30")
 */
export const formatTimeFromDate = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${hours}:${minutes}`;
};

/**
 * Calcula cuántos días faltan para una fecha
 * @param date - Fecha objetivo
 * @returns Número de días (negativo si ya pasó)
 */
export const getDaysUntil = (date: Date): number => {
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

/**
 * Retorna un texto relativo sobre cuándo ocurre una fecha
 * @param date - Fecha a evaluar
 * @returns String descriptivo (Ej: "En 3 días", "Mañana", "Hoy", "Hace 2 días")
 */
export const getRelativeDateText = (date: Date): string => {
  const days = getDaysUntil(date);
  
  if (days === 0) return 'Hoy';
  if (days === 1) return 'Mañana';
  if (days === -1) return 'Ayer';
  if (days > 1 && days <= 7) return `En ${days} días`;
  if (days > 7 && days <= 30) return `En ${Math.ceil(days / 7)} semanas`;
  if (days < -1 && days >= -7) return `Hace ${Math.abs(days)} días`;
  if (days < -7) return `Hace ${Math.ceil(Math.abs(days) / 7)} semanas`;
  
  return formatShortDate(date);
};

/**
 * Verifica si una fecha es del mes actual
 * @param date - Fecha a verificar
 * @returns true si es del mes actual
 */
export const isThisMonth = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Verifica si una fecha ya pasó
 * @param date - Fecha a verificar
 * @returns true si ya pasó
 */
export const isPast = (date: Date): boolean => {
  return date < new Date();
};

/**
 * Verifica si una fecha es futura
 * @param date - Fecha a verificar
 * @returns true si es futura
 */
export const isFuture = (date: Date): boolean => {
  return date > new Date();
};