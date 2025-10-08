// ======================================================
// COMPONENTE: CalendarCell
// Ubicación: src/components/common/CalendarCell.tsx
// Descripción: Celda individual del calendario que representa un día
// ======================================================

import React from 'react';
import type { CalendarEvent } from '@/types/calendar';
import { EventCard } from './EventCard';

// ======================================================
// INTERFACES
// ======================================================

interface CalendarCellProps {
  date: Date;
  events: CalendarEvent[];
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const CalendarCell: React.FC<CalendarCellProps> = ({
  date,
  events,
  isCurrentMonth,
  isToday,
  isSelected,
  onDateClick,
  onEventClick
}) => {
  // Límite de eventos a mostrar antes de mostrar "+X más"
  const MAX_VISIBLE_EVENTS = 3;
  const visibleEvents = events.slice(0, MAX_VISIBLE_EVENTS);
  const remainingEvents = events.length - MAX_VISIBLE_EVENTS;

  return (
    <div
      onClick={() => onDateClick(date)}
      className={`
        min-h-[100px] p-2 border border-gray-200 bg-white
        cursor-pointer transition-all duration-200
        hover:bg-gray-50 hover:shadow-lg
        ${!isCurrentMonth ? 'opacity-40 bg-gray-50' : ''}
        ${isSelected ? 'ring-2 ring-[#009DDC] ring-inset' : ''}
      `}
    >
      {/* ======================================================
          NÚMERO DEL DÍA
          ====================================================== */}
      <div className="flex justify-between items-start mb-2">
        <span
          className={`
            inline-flex items-center justify-center
            w-7 h-7 rounded-full text-sm font-semibold
            transition-colors duration-200
            ${isToday 
              ? 'bg-[#009DDC] text-white' 
              : isCurrentMonth 
                ? 'text-gray-700 hover:bg-gray-200' 
                : 'text-gray-400'
            }
          `}
        >
          {date.getDate()}
        </span>
        
        {/* Indicador de cantidad de eventos */}
        {events.length > 0 && (
          <span className="text-[10px] text-gray-500 font-medium">
            {events.length} evento{events.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* ======================================================
          LISTA DE EVENTOS
          ====================================================== */}
      <div className="space-y-1">
        {visibleEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={onEventClick}
          />
        ))}
        
        {/* Indicador de eventos adicionales */}
        {remainingEvents > 0 && (
          <div className="text-xs text-gray-500 font-medium pl-2 py-1">
            +{remainingEvents} más
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarCell;