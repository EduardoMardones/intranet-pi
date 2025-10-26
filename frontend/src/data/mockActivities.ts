// ======================================================
// DATOS SIMULADOS - Actividades del Tablero CESFAM
// Ubicación: src/data/mockActivities.ts
// ======================================================

import type { Activity } from '@/types/activity';

/**
 * Actividades simuladas para el tablero
 * En producción, estos datos vendrán de una API
 * 
 * Las imágenes usan Lorem Picsum con seeds específicos para consistencia
 * Formato: https://picsum.photos/seed/{seed}/{width}/{height}
 */
export const mockActivities: Activity[] = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/seed/cesfam-food1/600/400',
    title: 'Almuerzo de Camaradería - Día del Funcionario',
    date: new Date('2025-10-25T12:30:00'),
    description: 'Celebremos juntos el Día del Funcionario Público con un delicioso almuerzo preparado por nuestro equipo. Será un momento especial para compartir, agradecer y fortalecer los lazos de compañerismo.',
    location: 'Patio Central CESFAM',
    type: 'gastronomica'
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/seed/cesfam-sport1/600/500',
    title: 'Torneo de Fútbol Inter-Departamentos',
    date: new Date('2025-10-28T15:00:00'),
    description: 'Únete al emocionante torneo de fútbol donde los diferentes departamentos competirán en un ambiente de sana competencia y diversión. ¡Trae tu mejor actitud deportiva!',
    location: 'Cancha Municipal',
    type: 'deportiva'
  },
  {
    id: '3',
    imageUrl: 'https://picsum.photos/seed/cesfam-birthday/600/450',
    title: 'Celebración Cumpleaños del Mes',
    date: new Date('2025-10-30T16:00:00'),
    description: 'Compartamos juntos celebrando los cumpleaños de octubre. Habrá torta, café y un momento especial para cada uno de los cumpleañeros del mes.',
    location: 'Sala de Reuniones Principal',
    type: 'celebracion'
  },
  {
    id: '4',
    imageUrl: 'https://picsum.photos/seed/cesfam-green1/600/400',
    title: 'Jornada de Limpieza Comunitaria',
    date: new Date('2025-11-02T09:00:00'),
    description: 'Participemos activamente en el cuidado de nuestro entorno. Jornada de limpieza y embellecimiento de las áreas verdes del CESFAM y sus alrededores.',
    location: 'Perímetro CESFAM',
    type: 'comunitaria'
  },
  {
    id: '5',
    imageUrl: 'https://picsum.photos/seed/cesfam-coffee/600/350',
    title: 'Café Literario del CESFAM',
    date: new Date('2025-11-05T17:30:00'),
    description: 'Espacio de encuentro para compartir lecturas, reflexiones y un buen café. Trae tu libro favorito o simplemente ven a escuchar las experiencias de tus compañeros.',
    location: 'Biblioteca del Centro',
    type: 'otra'
  },
  {
    id: '6',
    imageUrl: 'https://picsum.photos/seed/cesfam-yoga/600/450',
    title: 'Clase de Yoga y Mindfulness',
    date: new Date('2025-11-08T18:00:00'),
    description: 'Sesión de yoga y técnicas de relajación para todo el personal. Una oportunidad para cuidar nuestra salud mental y física después de la jornada laboral.',
    location: 'Sala Multiuso',
    type: 'deportiva'
  },
  {
    id: '7',
    imageUrl: 'https://picsum.photos/seed/cesfam-xmas/600/400',
    title: 'Preparación Fiesta de Fin de Año',
    date: new Date('2025-11-12T15:00:00'),
    description: 'Primera reunión del comité organizador de la fiesta de fin de año. Necesitamos tu creatividad e ideas para hacer de esta celebración un evento memorable.',
    location: 'Oficina de Recursos Humanos',
    type: 'celebracion'
  },
  {
    id: '8',
    imageUrl: 'https://picsum.photos/seed/cesfam-empanada/600/500',
    title: 'Concurso de Empanadas Caseras',
    date: new Date('2025-11-15T12:00:00'),
    description: '¡Demuestra tus habilidades culinarias! Concurso de empanadas donde todos podrán participar como jueces. Habrá premios para las categorías: más original, más sabrosa y mejor presentación.',
    location: 'Comedor del Personal',
    type: 'gastronomica'
  },
  {
    id: '9',
    imageUrl: 'https://picsum.photos/seed/cesfam-garden/600/450',
    title: 'Taller de Huerto Urbano',
    date: new Date('2025-11-18T16:30:00'),
    description: 'Aprende técnicas de cultivo sustentable y participa en la creación del huerto institucional. Una iniciativa para promover la alimentación saludable y el cuidado del medio ambiente.',
    location: 'Terraza del Edificio',
    type: 'comunitaria'
  },
  {
    id: '10',
    imageUrl: 'https://picsum.photos/seed/cesfam-run/600/400',
    title: 'Caminata Saludable por la Ciudad',
    date: new Date('2025-11-22T08:00:00'),
    description: 'Ruta recreativa de 5km por los principales parques de la ciudad. Actividad familiar donde pueden participar funcionarios y sus familias. Incluye hidratación y frutas.',
    location: 'Punto de encuentro: Plaza Principal',
    type: 'deportiva'
  }
];

/**
 * Función auxiliar para ordenar actividades por fecha (más reciente primero)
 */
export const sortActivitiesByDate = (activities: Activity[]): Activity[] => {
  return [...activities].sort((a, b) => b.date.getTime() - a.date.getTime());
};

/**
 * Función auxiliar para filtrar actividades por tipo
 * (Para implementación futura de filtros)
 */
export const filterActivitiesByType = (
  activities: Activity[], 
  type: Activity['type']
): Activity[] => {
  return activities.filter(activity => activity.type === type);
};