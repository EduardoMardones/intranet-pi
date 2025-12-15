// ======================================================
// COMPONENTE: CalendarHeader
// Ubicación: src/components/ui/CalendarHeader.tsx
// Descripción: Cabecera del calendario con navegación y controles
// ======================================================

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, Plus } from 'lucide-react';
import { formatMonthYear } from '@/utils/dateUtils';

// ======================================================
// INTERFACES
// ======================================================

interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  showAddButton?: boolean;
  onAddEvent?: () => void;
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onToday,
  showAddButton = false
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* ======================================================
            SECCIÓN IZQUIERDA: LEYENDA DE TIPOS DE EVENTOS
            (Ahora al mismo nivel que la navegación)
            ====================================================== */}
        <div className="flex items-center gap-4">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-400 rounded"></div>
              <span className="text-sm text-gray-600">Actividades</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-400 rounded"></div>
              <span className="text-sm text-gray-600">Anuncios</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-400 rounded"></div>
              <span className="text-sm text-gray-600">Feriados</span>
            </div>
          </div>
        </div>

        {/* ======================================================
            SECCIÓN DERECHA: CONTROLES DE NAVEGACIÓN Y MES
            ====================================================== */}
        <div className="flex items-center gap-3">
          {/* Botón "Hoy" */}
          <Button
            onClick={onToday}
            variant="outline"
            className="font-medium hover:bg-gray-100"
          >
            Hoy
          </Button>

          {/* Controles de mes anterior/siguiente */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <Button
              onClick={onPreviousMonth}
              variant="ghost"
              size="icon"
              className="h-9 w-9 hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Mes y año actual */}
            <div className="px-4 min-w-[180px] text-center">
              <span className="font-semibold text-gray-800 text-lg">
                {formatMonthYear(currentDate)}
              </span>
            </div>

            <Button
              onClick={onNextMonth}
              variant="ghost"
              size="icon"
              className="h-9 w-9 hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* ======================================================
              BOTÓN AGREGAR EVENTO
              ====================================================== */}
          {showAddButton && (
            <Button
              className="bg-[#009DDC] hover:bg-[#0088c4] text-white font-medium"
              onClick={() => {
                console.log('Agregar evento - Próximamente');
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Evento
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;