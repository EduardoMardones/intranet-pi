// ======================================================
// PÁGINA PRINCIPAL: Comunicados Oficiales CESFAM
// Ubicación: src/pages/ComunicadosOficiales.tsx
// Descripción: Canal oficial único de comunicación institucional
// ======================================================

'use client';

import React, { useState, useMemo } from 'react';
import { AnnouncementList } from '@/components/common/anuncios/AnnouncementList';
import type { Announcement } from '@/types/announcement';
import { mockAnnouncements, sortAnnouncementsByDate } from '@/data/mockAnnouncements';
import { Megaphone, Shield, FileCheck, AlertCircle } from 'lucide-react';
import { Navbar } from '@/components/common/layout/Navbar';
import Footer from '@/components/common/layout/Footer';
import bannerHome from "@/components/images/banner_images/BannerAnuncios.png"
import Banner from "@/components/common/layout/Banner";


// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const AnunciosPage: React.FC = () => {
  // ... (estados y manejadores sin cambios) ...
  const [announcements] = useState<Announcement[]>(mockAnnouncements);
  const [isLoading] = useState<boolean>(false);
  const [isAdminView] = useState<boolean>(false);

  const sortedAnnouncements = useMemo(() => {
    return sortAnnouncementsByDate(announcements);
  }, [announcements]);

  const stats = useMemo(() => {
    const totalAttachments = announcements.reduce(
      (sum, announcement) => sum + (announcement.attachments?.length || 0),
      0
    );

    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const recentAnnouncements = announcements.filter(
      announcement => announcement.publicationDate >= lastWeek
    );

    return {
      total: announcements.length,
      recent: recentAnnouncements.length,
      attachments: totalAttachments
    };
  }, [announcements]);

  // ======================================================
  // RENDERIZADO
  // ======================================================

  return (
    <>
      <Navbar />
      <div className="h-16" /> {/* Este espacio ocupa la altura del Navbar */}
      <Banner
        imageSrc={bannerHome}
        title=""
        subtitle=""
        height="250px"
      />

      {/* Nuevo contenedor principal para el padding y ancho máximo */}
      {/* Aplicamos el degradado del body aquí, y el padding */}
      <div className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 p-4 md:p-8">
        {/* Contenedor para el ancho máximo (similar al calendario) */}
        <div className="max-w-[1600px] mx-auto"> 
          
          {/* ======================================================
              HEADER DEL TABLERO (Ahora sin padding ni max-w propios)
              ====================================================== */}
          <header className="bg-white shadow-xl border-b-4 border-[#009DDC] rounded-xl overflow-hidden mb-6"> {/* Añadido rounded-xl y mb-6 para estética */}
            <div className="py-8 px-6"> {/* Ajustado a px-6 para mejor look dentro del contenedor redondeado */}
              {/* Título principal */}
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-4">
                  {/* Ícono decorativo */}
                  <div className="p-4 bg-gradient-to-br from-[#009DDC] to-[#0088c4] rounded-2xl shadow-lg">
                    <Megaphone className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Título y subtítulo */}
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-2">
                      📢 Comunicados Oficiales
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Canal único de información institucional verificada
                    </p>
                  </div>
                </div>

                {/* ======================================================
                    BOTÓN PARA VISTA ADMINISTRATIVA (FUTURO)
                    ====================================================== */}
                {/* ... (tu código comentado para el botón) ... */}
              </div>

              {/* ======================================================
                  BANNER INFORMATIVO
                  ====================================================== */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-[#009DDC] rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-[#009DDC] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Canal Oficial Verificado
                    </h3>
                    <p className="text-sm text-gray-700">
                      Esta es la fuente única y oficial de comunicación institucional del CESFAM. 
                      Toda la información publicada aquí ha sido verificada y autorizada por la Dirección.
                    </p>
                  </div>
                </div>
              </div>

              {/* ======================================================
                  ESTADÍSTICAS DEL TABLERO
                  ====================================================== */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Total de comunicados */}
                <div className="bg-white rounded-xl p-4 border-2 border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FileCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        Total Comunicados
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.total}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Comunicados recientes */}
                <div className="bg-white rounded-xl p-4 border-2 border-green-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <AlertCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        Última Semana
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.recent}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Total de documentos */}
                <div className="bg-white rounded-xl p-4 border-2 border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Megaphone className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        Documentos Adjuntos
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.attachments}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* ======================================================
              CONTENIDO PRINCIPAL - LISTA DE COMUNICADOS (Ahora sin padding ni max-w propios)
              ====================================================== */}
          <main className="py-8"> {/* Eliminamos px-4 md:px-8 */}
            {/* Instrucciones para el usuario */}
            <div className="mb-6 bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-400">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <strong>Importante:</strong> Te recomendamos revisar regularmente 
                  este tablero para mantenerte informado sobre las novedades y cambios 
                  institucionales. Los comunicados están ordenados del más reciente al más antiguo.
                </div>
              </div>
            </div>

            {/* Lista de comunicados */}
            <AnnouncementList
              announcements={sortedAnnouncements}
              isLoading={isLoading}
              isAdminView={isAdminView}
            />
          </main>
          
        </div> {/* Cierre del div max-w-[1600px] */}
      </div> {/* Cierre del div p-4 md:p-8 */}

      {/* ======================================================
          FOOTER
          ====================================================== */}
      <Footer />

      {/* ... (notas para desarrollo futuro sin cambios) ... */}
    </>
  );
};

// ======================================================
// EXPORT
// ======================================================
export default AnunciosPage;