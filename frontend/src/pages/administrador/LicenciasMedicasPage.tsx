// ======================================================
// PÁGINA PRINCIPAL: Gestión de Licencias Médicas
// Ubicación: src/pages/LicenciasMedicas.tsx
// Descripción: Sistema de gestión de licencias médicas digitalizadas
// ======================================================

'use client';

import React, { useState } from 'react';
import { FileUploader } from '@/components/common/licencias/FileUploader';
import { LicenciasTable } from '@/components/common/licencias/LicenciasTable';
import type { LicenciaMedica } from '@/types/licencia';
import { mockLicencias } from '@/data/mockLicencias';
import { FileText, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { Navbar } from '@/components/common/layout/Navbar';
import Footer from '@/components/common/layout/Footer';
import Banner from '@/components/common/layout/Banner';
import bannerHome from "@/components/images/banner_images/BannerActividades.png"

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const LicenciasMedicasPage: React.FC = () => {
  // ======================================================
  // ESTADOS
  // ======================================================

  const [licencias, setLicencias] = useState<LicenciaMedica[]>(mockLicencias);

  // ======================================================
  // MANEJADORES DE EVENTOS
  // ======================================================

  /**
   * Maneja la selección de nuevos archivos
   */
  const handleFilesSelected = (files: File[]) => {
    const nuevasLicencias: LicenciaMedica[] = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      nombreArchivo: file.name,
      tipoArchivo: file.type.includes('pdf') ? 'pdf' : 
                   file.type.includes('jpeg') ? 'jpeg' :
                   file.type.includes('jpg') ? 'jpg' : 'png',
      tamanoArchivo: file.size,
      fechaSubida: new Date(),
      subidoPor: 'Usuario Actual', // En producción vendría del contexto de autenticación
      cargoUsuario: 'Subdirector/a',
      urlArchivo: URL.createObjectURL(file), // URL temporal para preview
      status: 'pendiente'
    }));

    setLicencias([...nuevasLicencias, ...licencias]);
  };

  /**
   * Ver archivo (abrir en modal o nueva pestaña)
   */
  const handleView = (licencia: LicenciaMedica) => {
    console.log('Ver licencia:', licencia);
    // En producción: abrir modal con preview o abrir en nueva pestaña
    window.open(licencia.urlArchivo, '_blank');
  };

  /**
   * Descargar archivo
   */
  const handleDownload = (licencia: LicenciaMedica) => {
    console.log('Descargar licencia:', licencia);
    // En producción: descargar desde servidor
    const link = document.createElement('a');
    link.href = licencia.urlArchivo;
    link.download = licencia.nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * Eliminar licencia
   */
  const handleDelete = (licenciaId: string) => {
    setLicencias(licencias.filter(l => l.id !== licenciaId));
    console.log('Licencia eliminada:', licenciaId);
  };

  // ======================================================
  // ESTADÍSTICAS
  // ======================================================

  const stats = {
    total: licencias.length,
    vigentes: licencias.filter(l => l.status === 'vigente').length,
    vencidas: licencias.filter(l => l.status === 'vencida').length,
    pendientes: licencias.filter(l => l.status === 'pendiente').length
  };

  // ======================================================
  // RENDERIZADO
  // ======================================================

  return (
    <>
    <Navbar></Navbar>
    <div className="h-15" /> {/* Este espacio ocupa la altura del Navbar */}

     <Banner
        imageSrc={bannerHome}
        title=""
        subtitle=""
        height="250px"
      />
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      {/* ======================================================
          HEADER
          ====================================================== */}
      <header className="bg-white shadow-lg border-b-4 border-[#009DDC]">
        <div className="max-w-[1800px] mx-auto px-6 py-8">
          {/* Título principal */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] rounded-2xl shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Gestión de Licencias Médicas
                </h1>
                <p className="text-gray-600 mt-1">
                  Repositorio digital de licencias del personal
                </p>
              </div>
            </div>

            {/* Badge de acceso */}
            <div className="bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] text-white px-4 py-2 rounded-lg">
              <p className="text-xs font-semibold">🔒 Acceso Administrativo</p>
            </div>
          </div>

          {/* ======================================================
              ESTADÍSTICAS
              ====================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total de licencias */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-l-4 border-blue-500">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Total Licencias
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total}
                  </p>
                </div>
              </div>
            </div>

            {/* Licencias vigentes */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-l-4 border-green-500">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Vigentes
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.vigentes}
                  </p>
                </div>
              </div>
            </div>

            {/* Licencias vencidas */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border-l-4 border-gray-500">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Clock className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Vencidas
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.vencidas}
                  </p>
                </div>
              </div>
            </div>

            {/* Licencias pendientes */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border-l-4 border-yellow-500">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Pendientes
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.pendientes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ======================================================
          CONTENIDO PRINCIPAL
          ====================================================== */}
      <main className="max-w-[1800px] mx-auto px-6 py-8 space-y-8">
        {/* Nota informativa */}
        <div className="bg-blue-50 border-l-4 border-[#009DDC] rounded-lg p-4">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-[#009DDC] flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-semibold mb-1">Información importante:</p>
              <p>
                Este módulo está diseñado exclusivamente para <strong>Dirección y Subdirecciones</strong>. 
                Todos los archivos subidos se almacenan de forma segura y solo son accesibles 
                para personal administrativo autorizado.
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================
            COMPONENTE DE CARGA
            ====================================================== */}
        <FileUploader
          onFilesSelected={handleFilesSelected}
          hasFiles={licencias.length > 0}
        />

        {/* ======================================================
            TABLA DE LICENCIAS
            ====================================================== */}
        <LicenciasTable
          licencias={licencias}
          onView={handleView}
          onDownload={handleDownload}
          onDelete={handleDelete}
        />

        {/* Estado vacío cuando no hay licencias */}
        {licencias.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-blue-100 to-gray-100 flex items-center justify-center">
              <FileText className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No hay licencias cargadas
            </h3>
            <p className="text-gray-600 text-center max-w-md">
              Comienza subiendo las licencias médicas digitalizadas del personal 
              utilizando el área de carga superior.
            </p>
          </div>
        )}
      </main>

      

      {/* ======================================================
          NOTAS PARA DESARROLLO FUTURO
          ======================================================
          
          FUNCIONALIDADES A IMPLEMENTAR:
          
          1. INTEGRACIÓN CON BACKEND:
             - Upload real de archivos a servidor/cloud storage
             - Gestión de permisos por rol de usuario
             - Logs de auditoría (quién subió/descargó/eliminó)
          
          2. BÚSQUEDA Y FILTROS:
             - Búsqueda por nombre de empleado
             - Filtro por estado (vigente, vencida, pendiente)
             - Filtro por rango de fechas
             - Filtro por tipo de archivo
          
          3. VISTA PREVIA DE ARCHIVOS:
             - Modal con preview de PDFs
             - Galería de imágenes
             - Zoom y navegación entre archivos
          
          4. NOTIFICACIONES:
             - Alertas cuando una licencia está por vencer
             - Notificación de nuevas licencias cargadas
             - Recordatorios de licencias pendientes de revisión
          
          5. VALIDACIONES ADICIONALES:
             - Verificar que el nombre del archivo siga un estándar
             - Detección automática de datos desde el PDF (OCR)
             - Validación de fechas coherentes
          
          6. EXPORTACIÓN Y REPORTES:
             - Exportar lista a Excel
             - Generar reporte mensual de licencias
             - Estadísticas de ausentismo
          
          7. SEGURIDAD:
             - Encriptación de archivos sensibles
             - Watermark en documentos
             - Control de versiones de archivos
             - Backup automático
          
          8. OPTIMIZACIONES:
             - Compresión de imágenes
             - Conversión automática a PDF
             - Almacenamiento en CDN
             - Carga lazy de archivos grandes
          
          Ejemplo de conexión con API:
          
          const handleUpload = async (files: File[]) => {
            const formData = new FormData();
            files.forEach(file => formData.append('files', file));
            
            const response = await fetch('/api/licencias/upload', {
              method: 'POST',
              body: formData
            });
            
            if (response.ok) {
              const newLicencias = await response.json();
              setLicencias([...newLicencias, ...licencias]);
            }
          };
      ====================================================== */}
    </div>
    <Footer></Footer>
    </>
  );
};

// ======================================================
// EXPORT
// ======================================================

