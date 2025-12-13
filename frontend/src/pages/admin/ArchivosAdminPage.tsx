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
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Repositorio de Documentos
            </h1>
            <p className="text-gray-600">
              Gestiona los documentos institucionales del CESFAM
            </p>
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