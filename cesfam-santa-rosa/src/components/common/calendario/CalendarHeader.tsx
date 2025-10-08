// ======================================================
// COMPONENTE: CalendarHeader
// Ubicación: src/components/ui/CalendarHeader.tsx
// Descripción: Cabecera del calendario con navegación y controles
// ======================================================

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, Plus } from 'lucide-react';
import { formatMonthYear } from '../../../utils/dateUtils';

// ======================================================
// INTERFACES
// ======================================================

interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  showAddButton?: boolean; // Para futura funcionalidad administrativa
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onToday,
  showAddButton = false // Por defecto oculto para vista de funcionario
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* ======================================================
            SECCIÓN IZQUIERDA: TÍTULO Y MES/AÑO
            ====================================================== */}
        <div className="flex items-center gap-4">
          {/* Icono del calendario */}
          <div className="p-3 bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] rounded-xl">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          
          {/* Título y mes actual */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Calendario Institucional
            </h1>
            <p className="text-sm text-gray-500">
              CESFAM - Centro de Salud Familiar
            </p>
          </div>
        </div>

        {/* ======================================================
            SECCIÓN DERECHA: CONTROLES DE NAVEGACIÓN
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
              BOTÓN AGREGAR EVENTO (SOLO PARA ADMINISTRADORES)
              ====================================================== */}
          {showAddButton && (
            <Button
              className="bg-[#009DDC] hover:bg-[#0088c4] text-white font-medium"
              onClick={() => {
                // Funcionalidad futura para agregar eventos
                console.log('Agregar evento - Próximamente');
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Evento
            </Button>
          )}
        </div>
      </div>

      {/* ======================================================
          LEYENDA DE TIPOS DE EVENTOS
          ====================================================== */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-400 rounded"></div>
            <span className="text-sm text-gray-600">Reuniones</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-400 rounded"></div>
            <span className="text-sm text-gray-600">Capacitaciones</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-400 rounded"></div>
            <span className="text-sm text-gray-600">Feriados</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span className="text-sm text-gray-600">Otros</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;