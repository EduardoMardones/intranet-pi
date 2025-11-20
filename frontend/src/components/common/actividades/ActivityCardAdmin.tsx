// ======================================================
// COMPONENTE: Tarjeta de Actividad con Controles Admin
// Ubicación: src/components/common/ActivityCardAdmin.tsx
// Descripción: Card individual con botones de editar y eliminar
// ======================================================

import React from 'react';
import type { Activity } from '@/types/activity';
import { ACTIVITY_COLORS } from '@/types/activity';
import { formatActivityDate } from '@/utils/dateUtils';
import { Calendar, MapPin, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ======================================================
// INTERFACES
// ======================================================

interface ActivityCardAdminProps {
  activity: Activity;
  onEdit: () => void;
  onDelete: () => void;
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const ActivityCardAdmin: React.FC<ActivityCardAdminProps> = ({
  activity,
  onEdit,
  onDelete
}) => {
  // Obtener configuración de colores según el tipo de actividad
  const colorConfig = ACTIVITY_COLORS[activity.type];

  // Determinar si la actividad ya pasó
  const isPastActivity = activity.date < new Date();

  return (
    <article 
      className={`
        group relative bg-white rounded-xl shadow-md hover:shadow-2xl 
        transition-all duration-300 overflow-hidden border-2 border-gray-100
        hover:border-[#009DDC] hover:-translate-y-1
        ${isPastActivity ? 'opacity-75' : ''}
      `}
    >
      {/* ======================================================
          IMAGEN DE LA ACTIVIDAD
          ====================================================== */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={activity.imageUrl}
          alt={activity.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Badge de tipo de actividad */}
        <div className="absolute top-3 left-3">
          <span className={`
            px-3 py-1 rounded-full text-xs font-semibold border-2
            backdrop-blur-sm bg-white/90
            ${colorConfig.badge}
          `}>
            {colorConfig.label}
          </span>
        </div>

        {/* Indicador de actividad pasada */}
        {isPastActivity && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold border-2 bg-gray-500/90 text-white border-gray-600">
              🕒 Finalizada
            </span>
          </div>
        )}

        {/* Botones de acción flotantes */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            size="icon-sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="bg-white/95 hover:bg-blue-100 shadow-lg backdrop-blur-sm"
            title="Editar actividad"
          >
            <Edit className="w-4 h-4 text-blue-600" />
          </Button>
          
          <Button
            size="icon-sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="bg-white/95 hover:bg-red-100 shadow-lg backdrop-blur-sm"
            title="Eliminar actividad"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      </div>

      {/* ======================================================
          CONTENIDO DE LA TARJETA
          ====================================================== */}
      <div className="p-5">
        {/* Título */}
        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 leading-tight">
          {activity.title}
        </h3>

        {/* Fecha */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Calendar className="w-4 h-4 text-[#009DDC] shrink-0" />
          <time className="font-medium">
            {formatActivityDate(activity.date)}
          </time>
        </div>

        {/* Ubicación */}
        <div className="flex items-start gap-2 text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4 text-[#52FFB8] shrink-0 mt-0.5" />
          <span className="line-clamp-1">{activity.location}</span>
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-700 line-clamp-3 mb-4 leading-relaxed">
          {activity.description}
        </p>

        {/* Separador */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          {/* Botones de acción (versión móvil/siempre visible) */}
          <div className="flex gap-2 md:hidden">
            <Button
              size="sm"
              variant="outline"
              onClick={onEdit}
              className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              <Edit className="w-4 h-4" />
              Editar
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={onDelete}
              className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </Button>
          </div>

          {/* Metadata adicional (versión desktop) */}
          <div className="hidden md:flex items-center justify-between text-xs text-gray-500">
            <span className="font-medium">ID: {activity.id}</span>
            <div className="flex gap-2">
              <button
                onClick={onEdit}
                className="px-2 py-1 rounded hover:bg-blue-50 text-blue-600 transition-colors"
                title="Editar"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onDelete}
                className="px-2 py-1 rounded hover:bg-red-50 text-red-600 transition-colors"
                title="Eliminar"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          BORDE INFERIOR CON COLOR DE CATEGORÍA
          ====================================================== */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-1 ${colorConfig.bg}`}
        aria-hidden="true"
      />
    </article>
  );
};