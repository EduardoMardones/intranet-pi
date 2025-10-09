// ======================================================
// COMPONENTE: AnnouncementList
// Ubicación: src/components/common/AnnouncementList.tsx
// Descripción: Lista vertical de comunicados oficiales
// ======================================================

'use client';

import React from 'react';
import type { Announcement } from '@/types/announcement';
import { AnnouncementCard } from './AnnouncementCard';
import { FileSearch, Loader2 } from 'lucide-react';

// ======================================================
// INTERFACES
// ======================================================

interface AnnouncementListProps {
  announcements: Announcement[];
  isLoading?: boolean;
  isAdminView?: boolean;
}

// ======================================================
// COMPONENTE DE SKELETON (Loading state)
// ======================================================

const AnnouncementSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl border-l-4 border-l-gray-300 shadow-lg overflow-hidden animate-pulse">
    {/* Header skeleton */}
    <div className="bg-gray-100 p-6">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
    
    {/* Content skeleton */}
    <div className="p-6 space-y-3">
      <div className="h-4 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
    </div>
  </div>
);

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const AnnouncementList: React.FC<AnnouncementListProps> = ({
  announcements,
  isLoading = false,
  isAdminView = false
}) => {
  // ======================================================
  // ESTADO DE CARGA
  // ======================================================
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 text-[#009DDC] animate-spin" />
          <span className="ml-3 text-gray-600 font-medium">
            Cargando comunicados oficiales...
          </span>
        </div>
        {Array.from({ length: 3 }).map((_, index) => (
          <AnnouncementSkeleton key={index} />
        ))}
      </div>
    );
  }

  // ======================================================
  // ESTADO VACÍO
  // ======================================================
  if (announcements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        {/* Ícono decorativo */}
        <div className="w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-blue-100 to-gray-100 flex items-center justify-center">
          <FileSearch className="w-16 h-16 text-gray-400" />
        </div>

        {/* Mensaje */}
        <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          No hay comunicados oficiales
        </h3>
        <p className="text-gray-600 text-center max-w-md mb-6">
          Por el momento no hay comunicados publicados. 
          Los nuevos comunicados aparecerán aquí cuando sean emitidos por la Dirección.
        </p>

        {/* Información adicional */}
        <div className="bg-blue-50 border-l-4 border-[#009DDC] p-4 rounded-lg max-w-md">
          <p className="text-sm text-gray-700">
            <strong className="text-[#009DDC]">Nota:</strong> Los comunicados oficiales 
            son el canal único y verificado para información institucional importante.
          </p>
        </div>
      </div>
    );
  }

  // ======================================================
  // RENDERIZADO DE LA LISTA
  // ======================================================
  return (
    <div className="space-y-6">
      {/* Contador de comunicados */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4 border-l-4 border-l-[#009DDC]">
        <div>
          <p className="text-sm font-medium text-gray-600">
            Total de Comunicados Oficiales
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {announcements.length}
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] flex items-center justify-center">
          <span className="text-2xl">📢</span>
        </div>
      </div>

      {/* Lista de comunicados */}
      {announcements.map((announcement, index) => (
        <div
          key={announcement.id}
          className="animate-fadeIn"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <AnnouncementCard
            announcement={announcement}
            isAdminView={isAdminView}
          />
        </div>
      ))}

      {/* ======================================================
          NOTAS PARA IMPLEMENTACIÓN FUTURA
          ======================================================
          
          FUNCIONALIDADES A IMPLEMENTAR:
          
          1. PAGINACIÓN:
          <div className="flex justify-center gap-2 mt-8">
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              ← Anterior
            </button>
            <span className="px-4 py-2">Página 1 de 3</span>
            <button className="px-4 py-2 bg-[#009DDC] text-white rounded hover:bg-[#0088c4]">
              Siguiente →
            </button>
          </div>
          
          2. BOTÓN "CARGAR MÁS":
          <div className="flex justify-center mt-8">
            <button className="px-6 py-3 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              Cargar más comunicados
            </button>
          </div>
          
          3. FILTROS POR CATEGORÍA:
          Agregar barra de filtros encima de la lista
          
          4. BÚSQUEDA:
          Campo de búsqueda para filtrar por título o contenido
          
          5. MARCADO COMO LEÍDO:
          Sistema para marcar comunicados como leídos/no leídos
      ====================================================== */}

      {/* Mensaje al final de la lista */}
      <div className="text-center py-6 text-sm text-gray-500">
        <p>Has visto todos los comunicados oficiales</p>
      </div>
    </div>
  );
};

export default AnnouncementList;