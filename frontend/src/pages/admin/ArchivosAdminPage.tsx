// ======================================================
// PÁGINA: Gestión de Archivos - Panel Administrativo
// Ubicación: src/pages/admin/ArchivosAdminPage.tsx
// Descripción: CRUD completo para gestión de archivos del repositorio
// ======================================================

import React from 'react';
import UnifiedNavbar from '@/components/common/layout/UnifiedNavbar';
import Footer from '@/components/common/layout/Footer';
import { DocumentosAdminTable } from '@/components/common/repositorio/DocumentosAdminTable';
import BannerArchivos from '@/components/images/banners_finales/BannerArchivos';

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
      <BannerArchivos></BannerArchivos>
      
      {/* Contenido Principal */}
      <div className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          {/* Header Container */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            {/* Título y Descripción */}
            <div className="flex items-start gap-4">
              
              
              <div className="flex-1">
                
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