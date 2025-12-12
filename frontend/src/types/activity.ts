// ======================================================
// TIPOS Y INTERFACES - Tablero de Actividades CESFAM
// Ubicación: src/types/activity.ts
// ======================================================

/**
 * Tipo de actividad institucional
 */
export type ActivityType = 
  | 'gastronomica' 
  | 'deportiva' 
  | 'celebracion' 
  | 'comunitaria'
  | 'cultural'
  | 'capacitacion'
  | 'otra';

export type ActivityCategory = ActivityType;

/**
 * Interface principal de una actividad/novedad
 */
export interface Activity {
  id: string;
  imageUrl?: string; // URL de imagen representativa (opcional)
  title: string;
  date: Date; // Fecha y hora del evento
  startTime?: string; // Hora de inicio ISO
  endTime?: string; // Hora de término ISO
  description: string;
  location?: string; // Opcional
  type?: ActivityType; // Tipo antiguo (mantener compatibilidad)
  category?: ActivityCategory; // Categoría nueva
  maxAttendees?: number;
  currentAttendees?: number;
  color?: string;
  // Campos para escalabilidad futura
  // isVisibleAdminActions?: boolean; // Para mostrar botones de admin
  // gallery?: string[]; // Array de URLs para galería de fotos
  // interested?: number; // Contador de "Me interesa"
  image?: string; // URL de imagen del backend
}

/**
 * Props para el componente ActivityCard
 */
export interface ActivityCardProps {
  activity: Activity;
  isAdminView?: boolean; // Para futura vista administrativa
  onEdit?: (activity: Activity) => void; // Funcionalidad futura
  onDelete?: (activityId: string) => void; // Funcionalidad futura
  onInterest?: (activityId: string) => void; // Funcionalidad futura
}

/**
 * Props para el componente ActivitiesGrid
 */
export interface ActivitiesGridProps {
  activities: Activity[];
  isLoading?: boolean;
  isAdminView?: boolean;
}

/**
 * Colores y estilos por tipo de actividad
 */
export const ACTIVITY_COLORS: Record<ActivityType, { 
  bg: string; 
  badge: string; 
  text: string;
  label: string;
}> = {
  gastronomica: {
    bg: 'bg-orange-50',
    badge: 'bg-orange-100 text-orange-700 border-orange-300',
    text: 'text-orange-700',
    label: '🍽️ Gastronómica'
  },
  deportiva: {
    bg: 'bg-blue-50',
    badge: 'bg-blue-100 text-blue-700 border-blue-300',
    text: 'text-blue-700',
    label: '⚽ Deportiva'
  },
  celebracion: {
    bg: 'bg-purple-50',
    badge: 'bg-purple-100 text-purple-700 border-purple-300',
    text: 'text-purple-700',
    label: '🎉 Celebración'
  },
  comunitaria: {
    bg: 'bg-green-50',
    badge: 'bg-green-100 text-green-700 border-green-300',
    text: 'text-green-700',
    label: '🌱 Comunitaria'
  },
  cultural: {
    bg: 'bg-pink-50',
    badge: 'bg-pink-100 text-pink-700 border-pink-300',
    text: 'text-pink-700',
    label: '🎭 Cultural'
  },
  capacitacion: {
    bg: 'bg-cyan-50',
    badge: 'bg-cyan-100 text-cyan-700 border-cyan-300',
    text: 'text-cyan-700',
    label: '📚 Capacitación'
  },
  otra: {
    bg: 'bg-gray-50',
    badge: 'bg-gray-100 text-gray-700 border-gray-300',
    text: 'text-gray-700',
    label: '📌 Otra'
  }
};