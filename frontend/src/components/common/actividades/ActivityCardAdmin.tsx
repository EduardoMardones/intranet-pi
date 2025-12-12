// ======================================================
// COMPONENTE: Tarjeta de Actividad con Controles Admin
// Ubicación: src/components/common/ActivityCardAdmin.tsx
// Descripción: Card individual con botones de editar y eliminar
// ======================================================

import React from 'react';
import type { Activity } from '@/types/activity';
import { ACTIVITY_COLORS } from '@/types/activity';
import { formatActivityDate } from '@/utils/dateUtils';
import { Calendar, MapPin, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ======================================================
// INTERFACES
// ======================================================

interface ActivityCardAdminProps {
  activity: Activity;
  onEdit: () => void;
  onDelete: () => void;
  onViewDetails?: () => void;
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const ActivityCardAdmin: React.FC<ActivityCardAdminProps> = ({
  activity,
  onEdit,
  onDelete,
  onViewDetails
}) => {
  // Obtener configuración de colores según el tipo de actividad
  // Usar category si existe, sino type, sino 'otra' como fallback
  const activityType = activity.category || activity.type || 'otra';
  const colorConfig = ACTIVITY_COLORS[activityType];

  // Determinar si la actividad ya pasó
  const isPastActivity = activity.date < new Date();

  // URL de imagen con fallback
  const imageUrl = activity.image || activity.imageUrl;

  return (
    <article 
      onClick={onViewDetails}
      className={`
        group relative bg-white rounded-xl shadow-md hover:shadow-2xl 
        transition-all duration-300 overflow-hidden border-2 border-gray-100
        hover:border-[#009DDC] hover:-translate-y-1 cursor-pointer
        ${isPastActivity ? 'opacity-75' : ''}
      `}
    >
      {/* ======================================================
          IMAGEN DE LA ACTIVIDAD
          ====================================================== */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-400 via-purple-400 to-cyan-400">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={activity.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-6xl">
            {colorConfig.label.split(' ')[0]}
          </div>
        )}
        
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
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails?.();
              }}
              className="flex-1 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] hover:shadow-lg transition-all text-white"
            >
              <Eye className="w-4 h-4 mr-1" />
              Detalles
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              <Edit className="w-4 h-4" />
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Metadata adicional (versión desktop) */}
          <div className="hidden md:flex items-center justify-between text-xs text-gray-500">
            <span className="font-medium">ID: {activity.id.substring(0, 8)}</span>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails?.();
                }}
                className="px-2 py-1 rounded hover:bg-cyan-50 text-cyan-600 transition-colors"
                title="Ver detalles"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="px-2 py-1 rounded hover:bg-blue-50 text-blue-600 transition-colors"
                title="Editar"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
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