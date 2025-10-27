// ======================================================
// COMPONENTE: RepositorioHeader
// Ubicación: src/components/common/repositorio/RepositorioHeader.tsx
// Descripción: Cabecera para la página de Repositorio de Documentos
// ======================================================

import React from 'react';
import { FolderOpen } from 'lucide-react'; // Icono para documentos

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const RepositorioHeader: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* ======================================================
            SECCIÓN IZQUIERDA: TÍTULO Y DESCRIPCIÓN
            ====================================================== */}
        <div className="flex items-center gap-4">
          {/* Icono de carpeta */}
          <div className="p-3 bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] rounded-xl">
            <FolderOpen className="w-6 h-6 text-white" />
          </div>
          
          {/* Título y descripción */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Repositorio de Documentos
            </h1>
            <p className="text-sm text-gray-500">
              Accede y gestiona los archivos institucionales
            </p>
            
            
          </div>
        </div>

        {/* ======================================================
            SECCIÓN DERECHA: Podrías añadir botones aquí si los necesitas en el futuro
            ====================================================== */}
        <div className="flex items-center gap-3">
          {/* Por ahora, esta sección puede estar vacía o contener elementos placeholder */}
          {/* Por ejemplo, un botón para "Subir Documento" si aplica */}
          {/*
          <Button
            className="bg-[#009DDC] hover:bg-[#0088c4] text-white font-medium"
            onClick={() => console.log('Subir Documento')}
          >
            <UploadCloud className="w-4 h-4 mr-2" />
            Subir Documento
          </Button>
          */}
        </div>
      </div>
    </div>
  );
};

export default RepositorioHeader;