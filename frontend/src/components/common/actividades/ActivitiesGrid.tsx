// ======================================================
// COMPONENTE: ActivitiesGrid
// Ubicación: src/components/common/ActivitiesGrid.tsx
// Descripción: Cuadrícula estilo Pinterest para las actividades
// ======================================================

'use client';

import React from 'react';
import type { Activity } from '@/types/activity';
import { ActivityCard } from './ActivityCard';

// ======================================================
// INTERFACES
// ======================================================

interface ActivitiesGridProps {
  activities: Activity[];
  isLoading?: boolean;
  isAdminView?: boolean;
}

// ======================================================
// COMPONENTE DE SKELETON (Loading state)
// ======================================================

const ActivityCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse">
    {/* Skeleton de imagen */}
    <div className="w-full h-48 bg-gray-200" />
    
    {/* Skeleton de contenido */}
    <div className="p-4 space-y-3">
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded w-4/5" />
      </div>
    </div>
  </div>
);

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const ActivitiesGrid: React.FC<ActivitiesGridProps> = ({
  activities,
  isLoading = false,
  isAdminView = false
}) => {
  // ======================================================
  // ESTADO DE CARGA
  // ======================================================
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <ActivityCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // ======================================================
  // ESTADO VACÍO
  // ======================================================
  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
          <span className="text-6xl">📭</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          No hay actividades programadas
        </h3>
        <p className="text-gray-600 text-center max-w-md">
          Por el momento no hay actividades disponibles. 
          ¡Vuelve pronto para ver las próximas novedades!
        </p>
      </div>
    );
  }

  // ======================================================
  // RENDERIZADO DE LA CUADRÍCULA
  // ======================================================
  return (
    <div className="w-full">
      {/* 
        Cuadrícula responsiva estilo Pinterest
        - 1 columna en móviles
        - 2 columnas en tablets (sm)
        - 3 columnas en laptops (lg)
        - 4 columnas en pantallas grandes (xl)
        
        El gap-6 proporciona espacio adecuado entre las tarjetas
        auto-rows-max permite que cada fila se ajuste a la altura del contenido
      */}
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4 
        gap-6
        auto-rows-max
      ">
        {activities.map((activity) => (
          <div 
            key={activity.id}
            className="animate-fadeIn"
          >
            <ActivityCard 
              activity={activity} 
              isAdminView={isAdminView}
            />
          </div>
        ))}
      </div>

      {/* ======================================================
          INDICADOR DE CANTIDAD DE ACTIVIDADES
          ====================================================== */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Mostrando <span className="font-semibold text-gray-700">{activities.length}</span> {activities.length === 1 ? 'actividad' : 'actividades'}
        </p>
      </div>

      {/* ======================================================
          NOTAS PARA IMPLEMENTACIÓN FUTURA
          ======================================================
          
          Funcionalidades para agregar:
          
          1. PAGINACIÓN:
          <div className="flex justify-center gap-2 mt-8">
            <button className="px-4 py-2 bg-gray-200 rounded">Anterior</button>
            <button className="px-4 py-2 bg-[#009DDC] text-white rounded">1</button>
            <button className="px-4 py-2 bg-gray-200 rounded">2</button>
            <button className="px-4 py-2 bg-gray-200 rounded">Siguiente</button>
          </div>
          
          2. BOTÓN "CARGAR MÁS":
          <div className="flex justify-center mt-8">
            <button className="px-6 py-3 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] text-white rounded-lg">
              Cargar más actividades
            </button>
          </div>
          
          3. SCROLL INFINITO:
          Implementar con IntersectionObserver para cargar automáticamente
          más actividades cuando el usuario llega al final de la página.
          
          4. FILTROS VISUALES:
          Añadir un componente de filtros arriba de la cuadrícula:
          <FilterBar onFilterChange={(type) => filterActivities(type)} />
      ====================================================== */}
    </div>
  );
};

export default ActivitiesGrid;