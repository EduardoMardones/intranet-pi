// ======================================================
// COMPONENTE: CalendarGrid
// Ubicación: src/components/common/CalendarGrid.tsx
// Descripción: Cuadrícula principal del calendario
// ======================================================

import React from 'react';
import type { CalendarEvent } from '@/types/calendar';
import { CalendarCell } from './CalendarCell';
import { getCalendarDays,
  isCurrentMonth,
  isToday,
  isSameDay,
  getEventsForDate } from '@/utils/dateUtils';
// ======================================================
// INTERFACES
// ======================================================

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date | null;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  selectedDate,
  events,
  onDateClick,
  onEventClick
}) => {
  // Obtener todos los días que se mostrarán en el calendario
  const days = getCalendarDays(currentDate);

  // Nombres de los días de la semana
  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* ======================================================
          CABECERA CON DÍAS DE LA SEMANA
          ====================================================== */}
      <div className="grid grid-cols-7 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3]">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-3 text-center font-semibold text-white text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      {/* ======================================================
          CUADRÍCULA DE DÍAS
          ====================================================== */}
      <div className="grid grid-cols-7 auto-rows-fr">
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day, events);
          const isCurrentMonthDay = isCurrentMonth(day, currentDate);
          const isTodayDay = isToday(day);
          const isSelectedDay = selectedDate ? isSameDay(day, selectedDate) : false;

          return (
            <CalendarCell
              key={index}
              date={day}
              events={dayEvents}
              isCurrentMonth={isCurrentMonthDay}
              isToday={isTodayDay}
              isSelected={isSelectedDay}
              onDateClick={onDateClick}
              onEventClick={onEventClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;