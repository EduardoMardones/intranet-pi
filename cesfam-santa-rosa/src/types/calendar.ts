// ======================================================
// TIPOS Y INTERFACES - Sistema de Calendario CESFAM
// Ubicación: src/types/calendar.ts
// ======================================================

/**
 * Tipo de evento institucional
 */
export type EventType = 'reunion' | 'capacitacion' | 'feriado' | 'otro';

/**
 * Interface principal de un evento del calendario
 */
export interface CalendarEvent {
  id: number;
  fecha: string; // formato: YYYY-MM-DD
  titulo: string;
  descripcion: string;
  tipo: EventType;
  horaInicio?: string; // formato: HH:mm
  horaFin?: string; // formato: HH:mm
  ubicacion?: string;
  organizador?: string;
}

/**
 * Interface para el estado del calendario
 */
export interface CalendarState {
  currentDate: Date;
  selectedDate: Date | null;
  selectedEvent: CalendarEvent | null;
  viewMode: 'month' | 'week';
}

/**
 * Props para componentes del calendario
 */
export interface CalendarCellProps {
  date: Date;
  events: CalendarEvent[];
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export interface EventCardProps {
  event: CalendarEvent;
  onClick: (event: CalendarEvent) => void;
}

export interface EventModalProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Colores por tipo de evento
 */
export const EVENT_COLORS: Record<EventType, { bg: string; border: string; text: string }> = {
  reunion: {
    bg: 'bg-blue-100',
    border: 'border-blue-400',
    text: 'text-blue-700'
  },
  capacitacion: {
    bg: 'bg-purple-100',
    border: 'border-purple-400',
    text: 'text-purple-700'
  },
  feriado: {
    bg: 'bg-green-100',
    border: 'border-green-400',
    text: 'text-green-700'
  },
  otro: {
    bg: 'bg-gray-100',
    border: 'border-gray-400',
    text: 'text-gray-700'
  }
};