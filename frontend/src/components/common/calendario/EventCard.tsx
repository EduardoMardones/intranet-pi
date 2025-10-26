// ======================================================
// COMPONENTE: EventCard
// Ubicación: src/components/common/EventCard.tsx
// Descripción: Tarjeta de evento individual mostrada en cada día
// ======================================================

import React from 'react';
import type { CalendarEvent } from '@/types/calendar';
import { EVENT_COLORS } from '@/types/calendar';
import { formatTime } from '@/utils/dateUtils';

// ======================================================
// INTERFACES
// ======================================================

interface EventCardProps {
  event: CalendarEvent;
  onClick: (event: CalendarEvent) => void;
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  // Obtener colores según el tipo de evento
  const colors = EVENT_COLORS[event.tipo];

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick(event);
      }}
      className={`
        ${colors.bg} ${colors.border} ${colors.text}
        px-2 py-1 mb-1 rounded border-l-4 cursor-pointer
        transition-all duration-200 hover:shadow-md hover:scale-[1.02]
        text-xs group
      `}
    >
      {/* Hora del evento */}
      {event.horaInicio && (
        <div className="font-semibold text-[10px] opacity-75">
          {formatTime(event.horaInicio)}
        </div>
      )}
      
      {/* Título del evento */}
      <div className="font-medium leading-tight truncate group-hover:text-clip">
        {event.titulo}
      </div>
    </div>
  );
};

export default EventCard;