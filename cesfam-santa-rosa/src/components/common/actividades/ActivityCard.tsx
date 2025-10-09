// ======================================================
// COMPONENTE: ActivityCard
// Ubicación: src/components/common/ActivityCard.tsx
// Descripción: Tarjeta individual de actividad estilo Pinterest
// ======================================================

'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { Activity } from '@/types/activity';
import { ACTIVITY_COLORS } from '@/types/activity';
import { Calendar, MapPin } from 'lucide-react';

// ======================================================
// INTERFACES
// ======================================================

interface ActivityCardProps {
  activity: Activity;
  isAdminView?: boolean; // Para futura funcionalidad administrativa
}

// ======================================================
// FUNCIONES AUXILIARES
// ======================================================

/**
 * Formatea la fecha para mostrar en la card
 */
const formatActivityDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('es-ES', options);
};

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const ActivityCard: React.FC<ActivityCardProps> = ({ 
  activity, 
  isAdminView = false 
}) => {
  // Obtener colores según el tipo de actividad
  const colors = ACTIVITY_COLORS[activity.type];

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group border-0">
      {/* ======================================================
          IMAGEN DE LA ACTIVIDAD
          ====================================================== */}
      <div className="relative overflow-hidden">
        <img
          src={activity.imageUrl}
          alt={activity.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Badge del tipo de actividad */}
        <div className="absolute top-3 right-3">
          <span className={`
            ${colors.badge}
            px-3 py-1 rounded-full text-xs font-semibold
            border backdrop-blur-sm bg-opacity-90
            shadow-lg
          `}>
            {colors.label}
          </span>
        </div>

        {/* Overlay gradiente para mejor legibilidad */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* ======================================================
          CONTENIDO DE LA CARD
          ====================================================== */}
      <CardContent className={`p-4 ${colors.bg} transition-colors`}>
        {/* Título de la actividad */}
        <h3 className="text-lg font-bold text-gray-800 mb-3 leading-tight line-clamp-2 group-hover:text-[#009DDC] transition-colors">
          {activity.title}
        </h3>

        {/* Fecha */}
        <div className="flex items-start gap-2 mb-2 text-sm">
          <Calendar className="w-4 h-4 text-[#009DDC] mt-0.5 flex-shrink-0" />
          <span className="text-gray-600 font-medium">
            {formatActivityDate(activity.date)}
          </span>
        </div>

        {/* Ubicación */}
        <div className="flex items-start gap-2 mb-3 text-sm">
          <MapPin className="w-4 h-4 text-[#52FFB8] mt-0.5 flex-shrink-0" />
          <span className="text-gray-600 font-medium">
            {activity.location}
          </span>
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 mb-4">
          {activity.description}
        </p>

        {/* ======================================================
            ÁREA PARA FUTURAS FUNCIONALIDADES
            ====================================================== */}
        {/* 
        Espacio reservado para implementaciones futuras:
        
        1. Botón "Me interesa" (para funcionarios):
        <button className="w-full py-2 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] text-white rounded-lg">
          ❤️ Me interesa
        </button>
        
        2. Contador de interesados:
        <div className="text-xs text-gray-500">
          👥 {activity.interested} personas interesadas
        </div>
        
        3. Botones de administración (solo si isAdminView):
        {isAdminView && (
          <div className="flex gap-2 mt-3">
            <button className="flex-1 py-2 bg-blue-500 text-white rounded">
              ✏️ Editar
            </button>
            <button className="flex-1 py-2 bg-red-500 text-white rounded">
              🗑️ Eliminar
            </button>
          </div>
        )}
        
        4. Botón "Ver más detalles" o "Ver galería":
        <button className="text-[#009DDC] text-sm font-semibold hover:underline">
          Ver más detalles →
        </button>
        */}

        {/* Indicador visual de hover */}
        <div className="mt-3 pt-3 border-t border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-xs text-center text-[#009DDC] font-semibold">
            Haz clic para ver más detalles
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;