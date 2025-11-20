// ======================================================
// TIPOS EXTENDIDOS - Calendario Administrativo
// Ubicación: src/types/calendarAdmin.ts
// ======================================================

import type { CalendarEvent, EventType } from './calendar';

/**
 * Datos del formulario para crear/editar eventos
 */
export interface EventFormData {
  titulo: string;
  fecha: string; // YYYY-MM-DD
  horaInicio: string; // HH:mm
  horaFin: string; // HH:mm
  descripcion: string;
  ubicacion: string;
  tipo: EventType;
  organizador: string;
}

/**
 * Props para el modal de formulario de eventos
 */
export interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: EventFormData) => void;
  initialData?: CalendarEvent | null;
  mode: 'create' | 'edit';
}

/**
 * Props para el modal de confirmación de eliminación
 */
export interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  eventTitle: string;
}

/**
 * Estado del formulario de eventos
 */
export interface EventFormState {
  data: EventFormData;
  errors: Partial<Record<keyof EventFormData, string>>;
  isSubmitting: boolean;
}

/**
 * Validación de campos del formulario
 */
export const validateEventForm = (data: EventFormData): Partial<Record<keyof EventFormData, string>> => {
  const errors: Partial<Record<keyof EventFormData, string>> = {};

  if (!data.titulo.trim()) {
    errors.titulo = 'El título es obligatorio';
  } else if (data.titulo.length < 5) {
    errors.titulo = 'El título debe tener al menos 5 caracteres';
  }

  if (!data.fecha) {
    errors.fecha = 'La fecha es obligatoria';
  }

  if (!data.horaInicio) {
    errors.horaInicio = 'La hora de inicio es obligatoria';
  }

  if (!data.horaFin) {
    errors.horaFin = 'La hora de fin es obligatoria';
  }

  if (data.horaInicio && data.horaFin && data.horaInicio >= data.horaFin) {
    errors.horaFin = 'La hora de fin debe ser posterior a la hora de inicio';
  }

  if (!data.descripcion.trim()) {
    errors.descripcion = 'La descripción es obligatoria';
  } else if (data.descripcion.length < 10) {
    errors.descripcion = 'La descripción debe tener al menos 10 caracteres';
  }

  if (!data.ubicacion.trim()) {
    errors.ubicacion = 'La ubicación es obligatoria';
  }

  if (!data.organizador.trim()) {
    errors.organizador = 'El organizador es obligatorio';
  }

  return errors;
};