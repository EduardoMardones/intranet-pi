// ======================================================
// COMPONENTE: FileUploader
// Ubicación: src/components/common/FileUploader.tsx
// Descripción: Componente para subir licencias médicas
// ======================================================

'use client';

import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { UploadCloud, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/types/licencia';
import { formatFileSize } from '@/data/mockLicencias';

// ======================================================
// INTERFACES
// ======================================================

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  hasFiles: boolean;
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const FileUploader: React.FC<FileUploaderProps> = ({ 
  onFilesSelected, 
  hasFiles 
}) => {
  // ======================================================
  // ESTADOS
  // ======================================================

  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ======================================================
  // MANEJADORES DE EVENTOS
  // ======================================================

  const validateFiles = (files: FileList | File[]): { valid: File[]; errors: string[] } => {
    const valid: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach(file => {
      // Validar tipo de archivo
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        errors.push(`${file.name}: Tipo de archivo no permitido`);
        return;
      }

      // Validar tamaño
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: Archivo demasiado grande (máx. ${formatFileSize(MAX_FILE_SIZE)})`);
        return;
      }

      valid.push(file);
    });

    return { valid, errors };
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setError(null);
    setSuccessMessage(null);

    const { valid, errors } = validateFiles(files);

    if (errors.length > 0) {
      setError(errors.join(', '));
      setTimeout(() => setError(null), 5000);
    }

    if (valid.length > 0) {
      onFilesSelected(valid);
      setSuccessMessage(`${valid.length} archivo${valid.length > 1 ? 's' : ''} cargado${valid.length > 1 ? 's' : ''} correctamente`);
      setTimeout(() => setSuccessMessage(null), 3000);
    }

    // Limpiar input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // ======================================================
  // RENDERIZADO
  // ======================================================

  return (
    <Card className={`
      ${hasFiles ? 'p-6' : 'p-12'}
      border-2 border-dashed transition-all duration-300
      ${isDragging 
        ? 'border-[#009DDC] bg-blue-50 scale-[1.02]' 
        : error
          ? 'border-red-300 bg-red-50'
          : successMessage
            ? 'border-green-300 bg-green-50'
            : 'border-gray-300 hover:border-[#009DDC] hover:bg-gray-50'
      }
    `}>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex flex-col items-center justify-center text-center"
      >
        {/* Ícono principal */}
        <div className={`
          mb-6 p-6 rounded-full transition-all duration-300
          ${isDragging 
            ? 'bg-[#009DDC] scale-110' 
            : error
              ? 'bg-red-200'
              : successMessage
                ? 'bg-green-200'
                : 'bg-gradient-to-br from-[#009DDC] to-[#4DFFF3]'
          }
        `}>
          {error ? (
            <AlertCircle className="w-12 h-12 text-red-600" />
          ) : successMessage ? (
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          ) : (
            <UploadCloud className="w-12 h-12 text-white" />
          )}
        </div>

        {/* Título y descripción */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {error 
              ? 'Error al cargar archivos'
              : successMessage
                ? '¡Archivos cargados!'
                : isDragging
                  ? 'Suelta los archivos aquí'
                  : 'Sube las licencias médicas digitalizadas'
            }
          </h3>
          
          {error && (
            <p className="text-sm text-red-600 font-medium">
              {error}
            </p>
          )}
          
          {successMessage && (
            <p className="text-sm text-green-600 font-medium">
              {successMessage}
            </p>
          )}
          
          {!error && !successMessage && (
            <>
              <p className="text-gray-600 mb-2">
                Arrastra y suelta tus archivos aquí, o haz clic en el botón
              </p>
              <p className="text-sm text-gray-500">
                Formatos permitidos: <span className="font-semibold">PDF, JPEG, JPG, PNG</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Tamaño máximo: {formatFileSize(MAX_FILE_SIZE)} por archivo
              </p>
            </>
          )}
        </div>

        {/* Botón de selección */}
        <button
          onClick={handleButtonClick}
          className="
            px-8 py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-[#009DDC] to-[#4DFFF3]
            hover:shadow-lg hover:scale-105
            active:scale-95
            transition-all duration-200
            flex items-center gap-2
          "
        >
          <FileText className="w-5 h-5" />
          Seleccionar archivos
        </button>

        {/* Input oculto */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpeg,.jpg,.png"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        {/* Información adicional */}
        <div className="mt-6 text-xs text-gray-500">
          <p>💡 Puedes seleccionar múltiples archivos a la vez</p>
        </div>
      </div>
    </Card>
  );
};

export default FileUploader;