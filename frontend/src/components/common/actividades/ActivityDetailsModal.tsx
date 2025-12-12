// ======================================================
// COMPONENTE: ActivityDetailsModal
// Ubicación: src/components/common/actividades/ActivityDetailsModal.tsx
// Descripción: Modal que muestra todos los detalles de una actividad
// ======================================================

'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Activity } from '@/types/activity';
import { ACTIVITY_COLORS } from '@/types/activity';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock
} from 'lucide-react';

// ======================================================
// INTERFACES
// ======================================================

interface ActivityDetailsModalProps {
  activity: Activity | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ======================================================
// FUNCIONES HELPER
// ======================================================

const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('es-CL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const formatTimeOnly = (isoString: string): string => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const isActivityActive = (date: Date): boolean => {
  return date > new Date();
};

const getDaysUntil = (date: Date): number => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({
  activity,
  open,
  onOpenChange,
}) => {
  if (!activity) return null;

  const activityType = activity.category || activity.type || 'otra';
  const colorConfig = ACTIVITY_COLORS[activityType];
  const isActive = isActivityActive(activity.date);
  const daysUntil = getDaysUntil(activity.date);
  const imageUrl = activity.image || activity.imageUrl;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className={`p-2 rounded-lg ${colorConfig.bg}`}>
              <span className="text-2xl">{colorConfig.label.split(' ')[0]}</span>
            </div>
            {activity.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* ======================================================
              IMAGEN DE LA ACTIVIDAD
              ====================================================== */}
          {imageUrl && (
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <img
                src={imageUrl}
                alt={activity.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* ======================================================
              BADGE DE CATEGORÍA
              ====================================================== */}
          <div className="flex items-center gap-2">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${colorConfig.badge}`}>
              {colorConfig.label}
            </span>
          </div>

          {/* ======================================================
              INFORMACIÓN PRINCIPAL
              ====================================================== */}
          <div className="space-y-4">
            {/* Fecha y hora */}
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#009DDC] mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-700">Fecha y hora</p>
                <p className="text-base text-gray-900">{formatDateTime(activity.date)}</p>
                {activity.startTime && activity.endTime && (
                  <p className="text-sm text-gray-600 mt-1">
                    Desde {formatTimeOnly(activity.startTime)} hasta {formatTimeOnly(activity.endTime)}
                  </p>
                )}
              </div>
            </div>

            {/* Ubicación */}
            {activity.location && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#009DDC] mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-700">Ubicación</p>
                  <p className="text-base text-gray-900">{activity.location}</p>
                </div>
              </div>
            )}

            {/* Cupos */}
            {activity.maxAttendees && (
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-[#009DDC] mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-700">Participantes</p>
                  <p className="text-base text-gray-900">
                    {activity.currentAttendees || 0} / {activity.maxAttendees} inscritos
                  </p>
                  {activity.currentAttendees !== undefined && activity.maxAttendees && (
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min((activity.currentAttendees / activity.maxAttendees) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Vigencia */}
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#009DDC] mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-700">Estado</p>
                {isActive ? (
                  <div className="flex items-center gap-2 mt-1">
                    {daysUntil > 0 ? (
                      <>
                        <span className="text-green-600 font-semibold">Próxima</span>
                        <span className="text-gray-600">• Faltan {daysUntil} día{daysUntil !== 1 ? 's' : ''}</span>
                      </>
                    ) : daysUntil === 0 ? (
                      <span className="text-orange-600 font-semibold">¡Hoy!</span>
                    ) : (
                      <span className="text-orange-600 font-semibold">En proceso</span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-500 font-semibold">Finalizada</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ======================================================
              DESCRIPCIÓN
              ====================================================== */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Descripción</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {activity.description || 'Sin descripción'}
              </p>
            </div>
          </div>

          {/* ======================================================
              FOOTER CON ESTADO
              ====================================================== */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                }`}></span>
                {isActive ? 'Actividad Vigente' : 'Actividad Finalizada'}
              </span>
              <span>ID: {activity.id.substring(0, 8)}</span>
            </div>
          </div>

          {/* ======================================================
              BOTÓN CERRAR
              ====================================================== */}
          <div className="flex justify-end pt-2">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="border-gray-300 hover:border-[#009DDC]"
            >
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityDetailsModal;