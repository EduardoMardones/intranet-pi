// ======================================================
// COMPONENTE: LicenciaUploadModal
// Ubicación: src/components/common/licencias/LicenciaUploadModal.tsx
// Descripción: Modal para subir licencias médicas con formulario completo
// ======================================================

'use client';

import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  X,
  Calendar
} from 'lucide-react';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/types/licencia';
import { formatFileSize } from '@/data/mockLicencias';

// ======================================================
// INTERFACES
// ======================================================

export interface LicenciaFormData {
  empleadoId: string;
  empleadoNombre: string;
  fechaInicio: string;
  fechaTermino: string;
  archivo: File | null;
}

interface LicenciaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LicenciaFormData) => void;
  empleados: Array<{ id: string; nombre_completo: string }>;
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const LicenciaUploadModal: React.FC<LicenciaUploadModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  empleados
}) => {
  // ======================================================
  // ESTADOS
  // ======================================================

  const [formData, setFormData] = useState<LicenciaFormData>({
    empleadoId: '',
    empleadoNombre: '',
    fechaInicio: '',
    fechaTermino: '',
    archivo: null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ======================================================
  // VALIDACIONES
  // ======================================================

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return 'Tipo de archivo no permitido. Solo PDF, JPEG, JPG o PNG.';
    }

    if (file.size > MAX_FILE_SIZE) {
      return `Archivo demasiado grande. Máximo ${formatFileSize(MAX_FILE_SIZE)}.`;
    }

    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.empleadoId) {
      newErrors.empleadoId = 'Debe seleccionar un empleado';
    }

    if (!formData.fechaInicio) {
      newErrors.fechaInicio = 'Debe ingresar la fecha de inicio';
    }

    if (!formData.fechaTermino) {
      newErrors.fechaTermino = 'Debe ingresar la fecha de término';
    }

    if (formData.fechaInicio && formData.fechaTermino) {
      if (new Date(formData.fechaTermino) < new Date(formData.fechaInicio)) {
        newErrors.fechaTermino = 'La fecha de término debe ser posterior a la de inicio';
      }
    }

    if (!formData.archivo) {
      newErrors.archivo = 'Debe cargar el archivo de la licencia';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ======================================================
  // MANEJADORES DE EVENTOS
  // ======================================================

  const handleEmpleadoChange = (value: string) => {
    const empleado = empleados.find(e => e.id === value);
    setFormData({
      ...formData,
      empleadoId: value,
      empleadoNombre: empleado?.nombre_completo || ''
    });
    if (errors.empleadoId) {
      setErrors({ ...errors, empleadoId: '' });
    }
  };

  const handleFechaChange = (field: 'fechaInicio' | 'fechaTermino', value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleFileSelect = (file: File | null) => {
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      setFileError(error);
      setTimeout(() => setFileError(null), 5000);
      return;
    }

    setFormData({
      ...formData,
      archivo: file
    });
    setFileError(null);
    if (errors.archivo) {
      setErrors({ ...errors, archivo: '' });
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

    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFormData({
      ...formData,
      archivo: null
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      empleadoId: '',
      empleadoNombre: '',
      fechaInicio: '',
      fechaTermino: '',
      archivo: null
    });
    setErrors({});
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  // ======================================================
  // RENDERIZADO
  // ======================================================

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            Cargar Nueva Licencia Médica
          </DialogTitle>
          <DialogDescription>
            Complete todos los campos para registrar una licencia médica en el sistema
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Selección de Empleado */}
          <div className="space-y-2">
            <Label htmlFor="empleado" className="text-sm font-semibold text-gray-700">
              Empleado <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.empleadoId}
              onValueChange={handleEmpleadoChange}
            >
              <SelectTrigger 
                className={`w-full ${errors.empleadoId ? 'border-red-500' : ''}`}
              >
                <SelectValue placeholder="Seleccione un empleado" />
              </SelectTrigger>
              <SelectContent>
                {empleados.map((empleado) => (
                  <SelectItem key={empleado.id} value={empleado.id}>
                    {empleado.nombre_completo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.empleadoId && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.empleadoId}
              </p>
            )}
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fecha Inicio */}
            <div className="space-y-2">
              <Label htmlFor="fechaInicio" className="text-sm font-semibold text-gray-700">
                Fecha de Inicio <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="fechaInicio"
                  type="date"
                  value={formData.fechaInicio}
                  onChange={(e) => handleFechaChange('fechaInicio', e.target.value)}
                  className={`w-full ${errors.fechaInicio ? 'border-red-500' : ''}`}
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              {errors.fechaInicio && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.fechaInicio}
                </p>
              )}
            </div>

            {/* Fecha Término */}
            <div className="space-y-2">
              <Label htmlFor="fechaTermino" className="text-sm font-semibold text-gray-700">
                Fecha de Término <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="fechaTermino"
                  type="date"
                  value={formData.fechaTermino}
                  onChange={(e) => handleFechaChange('fechaTermino', e.target.value)}
                  className={`w-full ${errors.fechaTermino ? 'border-red-500' : ''}`}
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              {errors.fechaTermino && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.fechaTermino}
                </p>
              )}
            </div>
          </div>

          {/* Zona de carga de archivo */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Archivo de Licencia <span className="text-red-500">*</span>
            </Label>

            {formData.archivo ? (
              // Archivo cargado - Vista previa
              <div className="border-2 border-green-300 bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {formData.archivo.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatFileSize(formData.archivo.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveFile}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                    type="button"
                  >
                    <X className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
            ) : (
              // Zona de carga
              <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`
                  border-2 border-dashed rounded-lg p-8 transition-all duration-300
                  ${isDragging 
                    ? 'border-[#009DDC] bg-blue-50' 
                    : fileError
                      ? 'border-red-300 bg-red-50'
                      : errors.archivo
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 hover:border-[#009DDC] hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`
                    mb-4 p-4 rounded-full
                    ${fileError || errors.archivo
                      ? 'bg-red-200'
                      : isDragging
                        ? 'bg-[#009DDC]'
                        : 'bg-gradient-to-br from-[#009DDC] to-[#4DFFF3]'
                    }
                  `}>
                    {fileError || errors.archivo ? (
                      <AlertCircle className="w-8 h-8 text-red-600" />
                    ) : (
                      <UploadCloud className="w-8 h-8 text-white" />
                    )}
                  </div>

                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {isDragging
                      ? 'Suelta el archivo aquí'
                      : 'Arrastra o selecciona el archivo'
                    }
                  </h4>

                  <p className="text-sm text-gray-600 mb-4">
                    Formatos permitidos: PDF, JPEG, JPG, PNG
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Tamaño máximo: {formatFileSize(MAX_FILE_SIZE)}
                  </p>

                  <Button
                    type="button"
                    onClick={handleButtonClick}
                    className="bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] hover:shadow-lg"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Seleccionar archivo
                  </Button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpeg,.jpg,.png"
                    onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </div>
              </div>
            )}

            {(fileError || errors.archivo) && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {fileError || errors.archivo}
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] hover:shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Cargar Licencia
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LicenciaUploadModal;