// ======================================================
// PÁGINA: Gestión de Archivos - Panel Administrativo
// Ubicación: src/pages/admin/ArchivosAdminPage.tsx
// Descripción: CRUD completo para gestión de archivos del repositorio
// ======================================================

import React from 'react';
import UnifiedNavbar from '@/components/common/layout/UnifiedNavbar';
import Footer from '@/components/common/layout/Footer';
import Banner from '@/components/common/layout/Banner';
import { DocumentosAdminTable } from '@/components/common/repositorio/DocumentosAdminTable';
import bannerArchivos from "@/components/images/banner_images/BannerArchivos.png";

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

const ArchivosAdminPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <UnifiedNavbar />
      <div className="h-16" />

      {/* Banner */}
      <Banner
        imageSrc={bannerArchivos}
        title=""
        subtitle=""
        height="250px"
      />
      
      {/* Contenido Principal */}
      <div className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          {/* Header Container */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            {/* Título y Descripción */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#009DDC] to-[#4DFFF3]">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Repositorio de Documentos
                </h1>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Accede y gestiona documentos institucionales del CESFAM como circulares, protocolos, 
                  formularios y guías. Visualiza y descarga los archivos necesarios para tu trabajo.
                </p>
              </div>
            </div>
          </div>

          {/* Tabla de Documentos */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <DocumentosAdminTable />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ArchivosAdminPage;