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
  // ======================================================
  // ESTADOS
  // ======================================================

  // Comunicados cargados desde datos mock (en producción vendrá de API)
  const [announcements] = useState<Announcement[]>(mockAnnouncements);
  
  // Estado de carga (útil para cuando se conecte con API)
  const [isLoading] = useState<boolean>(false);
  
  // Vista de administrador (false para funcionario, true para admin)
  const [isAdminView] = useState<boolean>(false);

  // ======================================================
  // DATOS PROCESADOS
  // ======================================================

  /**
   * Comunicados ordenados por fecha (más reciente primero)
   */
  const sortedAnnouncements = useMemo(() => {
    return sortAnnouncementsByDate(announcements);
  }, [announcements]);

  /**
   * Estadísticas para mostrar en el header
   */
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">

    <Navbar></Navbar>
    <div className="h-15" /> {/* Este espacio ocupa la altura del Navbar */}


      <Banner
        imageSrc={bannerHome}
        title=""
        subtitle=""
        height="250px"
      />
      {/* ======================================================
          HEADER DEL TABLERO
          ====================================================== */}
      <header className="bg-white shadow-xl border-b-4 border-[#009DDC]">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
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
            {/* 
            Solo visible para Dirección/Subdirección:
            
            {isAdminView && (
              <button className="px-6 py-3 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Publicar Comunicado
              </button>
            )}
            */}
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
          CONTENIDO PRINCIPAL - LISTA DE COMUNICADOS
          ====================================================== */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-8">
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

      {/* ======================================================
          FOOTER
          ====================================================== */}
      <Footer></Footer>

      {/* ======================================================
          NOTAS PARA DESARROLLO FUTURO
          ======================================================
          
          FUNCIONALIDADES A IMPLEMENTAR:
          
          1. SISTEMA DE FILTROS:
             - Filtrar por categoría (general, normativa, urgente, etc.)
             - Filtrar por fecha (últimos 7 días, último mes, etc.)
             - Filtrar por presencia de adjuntos
          
          2. BÚSQUEDA:
             - Barra de búsqueda en el header
             - Búsqueda por título y contenido
             - Resaltado de coincidencias
          
          3. NOTIFICACIONES:
             - Notificar a funcionarios cuando hay nuevo comunicado
             - Badge de "Nuevo" en comunicados recientes
             - Email automático para comunicados urgentes
          
          4. SISTEMA DE LECTURA:
             - Marcar comunicados como leídos
             - Contador de comunicados no leídos
             - Estado visual (leído/no leído)
          
          5. VISTA ADMINISTRATIVA:
             - Botón "Publicar Comunicado" en header
             - Formulario de creación/edición con editor rico
             - Upload de archivos adjuntos
             - Preview antes de publicar
             - Botones de editar/eliminar en cada card
             - Sistema de permisos por rol
          
          6. ARCHIVO DE COMUNICADOS:
             - Vista de comunicados archivados
             - Funcionalidad de archivar/desarchivar
             - Búsqueda en archivo histórico
          
          7. ESTADÍSTICAS DETALLADAS:
             - Dashboard con métricas de visualización
             - Comunicados más vistos
             - Documentos más descargados
          
          8. EXPORTACIÓN:
             - Exportar lista de comunicados a PDF
             - Exportar comunicado individual
             - Generar reporte mensual
          
          Ejemplo de conexión con API:
          
          useEffect(() => {
            const fetchAnnouncements = async () => {
              setIsLoading(true);
              try {
                const response = await fetch('/api/announcements');
                const data = await response.json();
                setAnnouncements(data.map(a => ({
                  ...a,
                  publicationDate: new Date(a.publicationDate)
                })));
              } catch (error) {
                console.error('Error loading announcements:', error);
              } finally {
                setIsLoading(false);
              }
            };
            
            fetchAnnouncements();
          }, []);
          
          Ejemplo de formulario para crear comunicado:
          
          const handleCreateAnnouncement = async (formData) => {
            const response = await fetch('/api/announcements', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData)
            });
            
            if (response.ok) {
              // Recargar lista de comunicados
              fetchAnnouncements();
              // Mostrar mensaje de éxito
              toast.success('Comunicado publicado exitosamente');
            }
          };
      ====================================================== */}
    </div>
    </>
  );
};

// ======================================================
// EXPORT
// ======================================================

