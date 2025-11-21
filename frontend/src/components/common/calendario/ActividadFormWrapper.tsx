// ======================================================
// COMPONENTE: Wrapper de Formulario de Actividad para Calendario
// Ubicación: src/components/common/calendario/ActividadFormWrapper.tsx
// Descripción: Wrapper que adapta ActivityFormDialog para usar en calendario
// ======================================================

import React from 'react';
import { ActivityFormDialog } from '@/components/common/actividades/ActivityFormDialog';
import type { Activity } from '@/types/activity';

interface ActividadFormWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: Omit<Activity, 'id'>) => void;
  initialDate?: Date | null;
  activity?: Activity | null;
}

export const ActividadFormWrapper: React.FC<ActividadFormWrapperProps> = ({
  isOpen,
  onClose,
  onSave,
  initialDate,
  activity
}) => {
  // Si hay fecha inicial y no hay actividad (modo crear), crear actividad temporal con esa fecha
  const activityWithDate = React.useMemo(() => {
    if (activity) {
      return activity;
    }
    
    if (initialDate) {
      // Crear actividad temporal con la fecha seleccionada
      return {
        id: '',
        title: '',
        description: '',
        date: initialDate,
        location: '',
        imageUrl: '',
        type: 'otra' as const
      };
    }
    
    return null;
  }, [activity, initialDate]);
  
  return (
    <ActivityFormDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      activity={activityWithDate}
    />
  );
};

export default ActividadFormWrapper;