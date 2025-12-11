// ======================================================
// COMPONENTE: FileUploader
// Ubicación: src/components/common/FileUploader.tsx
// Descripción: Botón para abrir el modal de carga de licencias médicas
// ======================================================

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';

// ======================================================
// INTERFACES
// ======================================================

interface FileUploaderProps {
  onOpenModal: () => void;
  hasFiles: boolean;
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const FileUploader: React.FC<FileUploaderProps> = ({ 
  onOpenModal
}) => {
  return (
    <div className="flex justify-start mb-6">
      <Button
        onClick={onOpenModal}
        className="
          px-6 py-6 text-lg font-semibold
          bg-gradient-to-r from-[#009DDC] to-[#4DFFF3]
          hover:shadow-lg hover:scale-105
          active:scale-95
          transition-all duration-200
          flex items-center gap-3
        "
      >
        <div className="p-2 bg-white/20 rounded-lg">
          <Plus className="w-6 h-6" />
        </div>
        <span>Nueva Licencia Médica</span>
        <FileText className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default FileUploader;