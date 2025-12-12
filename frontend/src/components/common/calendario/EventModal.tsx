// ======================================================
// COMPONENTE: EventModal
// Ubicación: src/components/ui/EventModal.tsx
// Descripción: Modal para mostrar detalles completos del evento
// ======================================================

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { CalendarEvent } from '@/types/calendar';
import { EVENT_COLORS } from '@/types/calendar';
import { formatTime } from '@/utils/dateUtils';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

// ======================================================
// INTERFACES - EXPORTADAS
// ======================================================

export interface EventModalProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
  isAdminView?: boolean;
  onEdit?: (event: CalendarEvent) => void;
  onDelete?: (event: CalendarEvent) => void;
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const EventModal: React.FC<EventModalProps> = ({
  event,
  isOpen,
  onClose,
  isAdminView = false,
  onEdit,
  onDelete
}) => {
  if (!event) return null;

  // Obtener colores según el tipo de evento
  const colors = EVENT_COLORS[event.tipo];

  // Formatear la fecha de manera legible
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString + 'T00:00:00');
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('es-ES', options);
  };

  // Obtener el nombre del tipo de evento
  const getEventTypeName = (type: string): string => {
    const types: Record<string, string> = {
      reunion: 'Reunión',
      capacitacion: 'Capacitación',
      feriado: 'Feriado',
      otro: 'Otro'
    };
    return types[type] || 'Evento';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white">
        {/* ======================================================
            CABECERA CON COLOR DEL TIPO DE EVENTO
            ====================================================== */}
        <div className={`${colors.bg} p-6 border-l-8 ${colors.border}`}>
          <DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <DialogTitle className={`text-2xl font-bold ${colors.text} mb-2`}>
                  {event.titulo}
                </DialogTitle>
                <DialogDescription className={`${colors.text} opacity-75 text-base`}>
                  {event.descripcion}
                </DialogDescription>
              </div>
              
              {/* Badge del tipo de evento */}
              <div className={`
                px-3 py-1 rounded-full text-xs font-semibold
                ${colors.text} bg-white shadow-sm
              `}>
                {getEventTypeName(event.tipo)}
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* ======================================================
            CONTENIDO DEL MODAL - DETALLES DEL EVENTO
            ====================================================== */}
        <div className="p-6 space-y-4 bg-white">
          {/* Fecha */}
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${colors.bg}`}>
              <Calendar className={`w-5 h-5 ${colors.text}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Fecha</p>
              <p className="text-base font-semibold text-gray-800">
                {formatDate(event.fecha)}
              </p>
            </div>
          </div>

          {/* Horario */}
          {event.horaInicio && event.horaFin && (
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${colors.bg}`}>
                <Clock className={`w-5 h-5 ${colors.text}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Horario</p>
                <p className="text-base font-semibold text-gray-800">
                  {formatTime(event.horaInicio)} - {formatTime(event.horaFin)}
                </p>
              </div>
            </div>
          )}

          {/* Ubicación */}
          {event.ubicacion && (
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${colors.bg}`}>
                <MapPin className={`w-5 h-5 ${colors.text}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Ubicación</p>
                <p className="text-base font-semibold text-gray-800">
                  {event.ubicacion}
                </p>
              </div>
            </div>
          )}

          {/* Organizador */}
          {event.organizador && (
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${colors.bg}`}>
                <User className={`w-5 h-5 ${colors.text}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Organizador</p>
                <p className="text-base font-semibold text-gray-800">
                  {event.organizador}
                </p>
              </div>
            </div>
          )}

          {/* ======================================================
              BOTONES DE ADMINISTRACIÓN
              ====================================================== */}
          {isAdminView && onEdit && onDelete && (
            <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
              <button 
                onClick={() => onEdit(event)}
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                ✏️ Editar Evento
              </button>
              <button 
                onClick={() => onDelete(event)}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                🗑️ Eliminar
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;