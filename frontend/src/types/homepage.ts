// ======================================================
// TIPOS Y INTERFACES - Homepage Intranet CESFAM
// Ubicación: src/types/homepage.ts
// ======================================================

/**
 * Interface para accesos rápidos
 */
export interface QuickAccess {
  id: string;
  title: string;
  icon: string;
  route: string;
  color: string;
  bgColor: string;
}

/**
 * Interface para recordatorios personales
 */
export interface Reminder {
  id: string;
  title: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

/**
 * Interface para notificaciones
 */
export interface Notification {
  id: string;
  title: string;
  message: string;
  date: Date;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
}

/**
 * Interface para funcionario destacado
 */
export interface FeaturedEmployee {
  id: string;
  nombre: string;
  apellidos: string;
  area: string;
  avatar?: string;
  logro: string;
}

/**
 * Interface para estadísticas del dashboard
 */
export interface DashboardStats {
  proximosEventos: number;
  comunicadosNuevos: number;
  tareasPendientes: number;
  licenciasVigentes: number;
}

/**
 * Configuración de prioridades
 */
export const PRIORITY_CONFIG = {
  low: {
    label: 'Baja',
    color: 'text-gray-600',
    bg: 'bg-gray-100',
    badge: 'bg-gray-100 text-gray-700 border-gray-300'
  },
  medium: {
    label: 'Media',
    color: 'text-yellow-600',
    bg: 'bg-yellow-100',
    badge: 'bg-yellow-100 text-yellow-700 border-yellow-300'
  },
  high: {
    label: 'Alta',
    color: 'text-red-600',
    bg: 'bg-red-100',
    badge: 'bg-red-100 text-red-700 border-red-300'
  }
};

/**
 * Configuración de tipos de notificación
 */
export const NOTIFICATION_CONFIG = {
  info: {
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    icon: 'ℹ️'
  },
  warning: {
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    icon: '⚠️'
  },
  success: {
    color: 'text-green-600',
    bg: 'bg-green-50',
    icon: '✅'
  },
  error: {
    color: 'text-red-600',
    bg: 'bg-red-50',
    icon: '❌'
  }
};