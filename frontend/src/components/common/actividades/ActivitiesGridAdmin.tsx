// ======================================================
// COMPONENTE: Grilla de Actividades con Controles Admin
// Ubicación: src/components/common/ActivitiesGridAdmin.tsx
// Descripción: Grid responsivo con tarjetas que incluyen botones de editar/eliminar
// ======================================================

import React from 'react';
import { ActivityCardAdmin } from './ActivityCardAdmin';
import type { Activity } from '@/types/activity';
import { Loader2 } from 'lucide-react';

// ======================================================
// INTERFACES
// ======================================================

interface ActivitiesGridAdminProps {
  activities: Activity[];
  isLoading?: boolean;
  onEdit: (activity: Activity) => void;
  onDelete: (activityId: string) => void;
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const ActivitiesGridAdmin: React.FC<ActivitiesGridAdminProps> = ({
  activities,
  isLoading = false,
  onEdit,
  onDelete
}) => {
  // ======================================================
  // ESTADO DE CARGA
  // ======================================================
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-[#009DDC] animate-spin" />
        <p className="mt-4 text-gray-600 font-medium">Cargando actividades...</p>
      </div>
    );
  }

  // ======================================================
  // ESTADO VACÍO
  // ======================================================
  
  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-md border-2 border-dashed border-gray-300">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">
          No hay actividades registradas
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          Comienza creando la primera actividad usando el botón <br />
          <span className="font-semibold">"Nueva Actividad"</span> en la parte superior
        </p>
      </div>
    );
  }

  // ======================================================
  // RENDERIZADO DE GRILLA
  // ======================================================
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {activities.map((activity) => (
        <ActivityCardAdmin
          key={activity.id}
          activity={activity}
          onEdit={() => onEdit(activity)}
          onDelete={() => onDelete(activity.id)}
        />
      ))}
    </div>
  );
};