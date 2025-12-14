// ======================================================
// ACTIVIDADES ADAPTER
// Ubicación: frontend/src/utils/actividadesAdapter.ts
// Convierte entre el formato del backend y el formato del frontend
// ======================================================

import type { Actividad, TipoActividad } from '@/api/services/actividadesService';
import type { Activity, ActivityCategory } from '@/types/activity';

// ======================================================
// MAPEO DE TIPOS
// ======================================================

const tipoToCategory: Record<TipoActividad, ActivityCategory> = {
  'gastronomica': 'gastronomica',
  'deportiva': 'deportiva',
  'celebracion': 'celebracion',
  'comunitaria': 'comunitaria',
  'cultural': 'cultural',
  'capacitacion': 'capacitacion',
  'otra': 'otra'
};

const categoryToTipo: Record<ActivityCategory, TipoActividad> = {
  'gastronomica': 'gastronomica',
  'deportiva': 'deportiva',
  'celebracion': 'celebracion',
  'comunitaria': 'comunitaria',
  'cultural': 'cultural',
  'capacitacion': 'capacitacion',
  'otra': 'otra'
};

// ======================================================
// FUNCIONES DE CONVERSIÓN
// ======================================================

/**
 * Convierte una actividad del backend al formato frontend
 */
export function actividadToActivity(actividad: Actividad): Activity {
  const mappedCategory = tipoToCategory[actividad.tipo] || 'otra';
  
  return {
    id: actividad.id,
    title: actividad.titulo,
    description: actividad.descripcion,
    category: mappedCategory,
    type: mappedCategory, // Mantener por compatibilidad
    date: new Date(actividad.fecha_inicio),
    startTime: actividad.fecha_inicio,
    endTime: actividad.fecha_termino,
    location: actividad.ubicacion || '',
    image: actividad.imagen || undefined,
    imageUrl: actividad.imagen || undefined, // Alias para compatibilidad
    maxAttendees: actividad.cupo_maximo || undefined,
    currentAttendees: actividad.total_inscritos,
    color: actividad.color,
  };
}

/**
 * Convierte múltiples actividades del backend al formato frontend
 */
export function actividadesToActivities(actividades: Actividad[]): Activity[] {
  return actividades.map(actividadToActivity);
}

/**
 * Convierte categoría frontend a tipo backend
 */
export function categoryToBackendTipo(category: ActivityCategory): TipoActividad {
  return categoryToTipo[category];
}

/**
 * Convierte una fecha al formato string del backend (ISO)
 */
export function dateToBackendString(date: Date): string {
  return date.toISOString();
}