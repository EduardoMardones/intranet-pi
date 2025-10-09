// ======================================================
// COMPONENTE: AnnouncementCard
// Ubicación: src/components/common/AnnouncementCard.tsx
// Descripción: Tarjeta de comunicado oficial individual
// ======================================================

'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { Announcement } from '@/types/announcement';
import { CATEGORY_CONFIG } from '@/types/announcement';
import { AttachmentLink } from './AttachmentLink';
import { Calendar, Paperclip } from 'lucide-react';

// ======================================================
// INTERFACES
// ======================================================

interface AnnouncementCardProps {
  announcement: Announcement;
  isAdminView?: boolean;
}

// ======================================================
// FUNCIONES AUXILIARES
// ======================================================

/**
 * Formatea la fecha de publicación
 */
const formatPublicationDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('es-ES', options);
};

/**
 * Calcula hace cuánto tiempo fue publicado
 */
const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Hoy';
  if (diffInDays === 1) return 'Ayer';
  if (diffInDays < 7) return `Hace ${diffInDays} días`;
  if (diffInDays < 30) return `Hace ${Math.floor(diffInDays / 7)} semanas`;
  return `Hace ${Math.floor(diffInDays / 30)} meses`;
};

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  announcement,
  isAdminView = false
}) => {
  const categoryConfig = announcement.category 
    ? CATEGORY_CONFIG[announcement.category]
    : null;

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-l-[#009DDC]">
      {/* ======================================================
          CABECERA DE LA CARD
          ====================================================== */}
      <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 pb-4">
        <div className="flex items-start justify-between gap-4">
          {/* Título y fecha */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2">
              {announcement.title}
            </h3>
            
            {/* Fecha de publicación */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-[#009DDC]" />
              <span className="font-medium">
                {formatPublicationDate(announcement.publicationDate)}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                ({getTimeAgo(announcement.publicationDate)})
              </span>
            </div>
          </div>

          {/* Badge de categoría */}
          {categoryConfig && (
            <div className={`
              px-3 py-1.5 rounded-full text-xs font-semibold
              border ${categoryConfig.badge}
              flex items-center gap-1 flex-shrink-0
            `}>
              <span>{categoryConfig.icon}</span>
              <span>{categoryConfig.label}</span>
            </div>
          )}
        </div>
      </CardHeader>

      {/* ======================================================
          CONTENIDO DE LA CARD
          ====================================================== */}
      <CardContent className="pt-6">
        {/* Descripción del comunicado */}
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {announcement.description}
          </p>
        </div>

        {/* ======================================================
            DOCUMENTOS ADJUNTOS
            ====================================================== */}
        {announcement.attachments && announcement.attachments.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            {/* Encabezado de adjuntos */}
            <div className="flex items-center gap-2 mb-4">
              <Paperclip className="w-5 h-5 text-[#009DDC]" />
              <h4 className="font-semibold text-gray-800">
                Documentos Adjuntos ({announcement.attachments.length})
              </h4>
            </div>

            {/* Lista de adjuntos */}
            <div className="space-y-3">
              {announcement.attachments.map((attachment, index) => (
                <AttachmentLink
                  key={`${announcement.id}-attachment-${index}`}
                  attachment={attachment}
                />
              ))}
            </div>
          </div>
        )}

        {/* ======================================================
            ÁREA PARA FUTURAS FUNCIONALIDADES ADMINISTRATIVAS
            ====================================================== */}
        {/* 
        Solo visible para administradores:
        
        {isAdminView && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex gap-3">
              <button 
                className="flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                onClick={() => handleEdit(announcement)}
              >
                <Edit className="w-4 h-4" />
                Editar
              </button>
              <button 
                className="flex-1 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                onClick={() => handleDelete(announcement.id)}
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </button>
            </div>
          </div>
        )}
        */}

        {/* Indicador de comunicado oficial */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Comunicado Oficial Verificado
            </span>
            <span>ID: {announcement.id}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;