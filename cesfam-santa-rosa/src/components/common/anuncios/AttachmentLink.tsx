// ======================================================
// COMPONENTE: AttachmentLink
// Ubicación: src/components/common/AttachmentLink.tsx
// Descripción: Enlace de descarga para documentos adjuntos
// ======================================================

'use client';

import React from 'react';
import type { Attachment } from '@/types/announcement';
import { FILE_TYPE_CONFIG } from '@/types/announcement';
import { 
  FileText, 
  FileSpreadsheet, 
  Image as ImageIcon, 
  File,
  Download 
} from 'lucide-react';

// ======================================================
// INTERFACES
// ======================================================

interface AttachmentLinkProps {
  attachment: Attachment;
}

// ======================================================
// FUNCIÓN PARA OBTENER EL ÍCONO SEGÚN TIPO DE ARCHIVO
// ======================================================

const getFileIcon = (fileType: Attachment['fileType']) => {
  const iconProps = { className: 'w-5 h-5' };
  
  switch (fileType) {
    case 'pdf':
    case 'doc':
      return <FileText {...iconProps} />;
    case 'xls':
      return <FileSpreadsheet {...iconProps} />;
    case 'img':
      return <ImageIcon {...iconProps} />;
    default:
      return <File {...iconProps} />;
  }
};

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const AttachmentLink: React.FC<AttachmentLinkProps> = ({ attachment }) => {
  const config = FILE_TYPE_CONFIG[attachment.fileType];

  const handleDownload = (e: React.MouseEvent) => {
    // Prevenir navegación por defecto si es un placeholder
    if (attachment.fileUrl === '#') {
      e.preventDefault();
      console.log('Descargando:', attachment.fileName);
      // En producción, aquí se implementaría la lógica de descarga real
      alert(`Descarga simulada: ${attachment.fileName}`);
    }
  };

  return (
    <a
      href={attachment.fileUrl}
      onClick={handleDownload}
      download={attachment.fileName}
      className={`
        flex items-center gap-3 p-3 rounded-lg border-2 border-dashed
        ${config.bgColor} border-gray-300
        hover:border-[#009DDC] hover:shadow-md
        transition-all duration-200 group
      `}
    >
      {/* Ícono del tipo de archivo */}
      <div className={`
        flex-shrink-0 w-12 h-12 rounded-lg 
        flex items-center justify-center
        ${config.color} bg-white shadow-sm
        group-hover:scale-110 transition-transform duration-200
      `}>
        {getFileIcon(attachment.fileType)}
      </div>

      {/* Información del archivo */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-[#009DDC] transition-colors">
          {attachment.fileName}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`
            text-xs font-bold px-2 py-0.5 rounded
            ${config.color} ${config.bgColor} border border-current
          `}>
            {config.label}
          </span>
          {attachment.fileSize && (
            <span className="text-xs text-gray-500">
              {attachment.fileSize}
            </span>
          )}
        </div>
      </div>

      {/* Ícono de descarga */}
      <div className={`
        flex-shrink-0 w-8 h-8 rounded-full
        bg-white shadow-sm
        flex items-center justify-center
        ${config.color}
        group-hover:bg-[#009DDC] group-hover:text-white
        transition-all duration-200
      `}>
        <Download className="w-4 h-4" />
      </div>
    </a>
  );
};

export default AttachmentLink;