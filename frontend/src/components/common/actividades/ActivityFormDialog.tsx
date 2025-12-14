// ======================================================
// COMPONENTE: Diálogo de Formulario de Actividad
// Ubicación: src/components/common/ActivityFormDialog.tsx
// Descripción: Modal con formulario completo para crear/editar actividades
// ======================================================

import React, { useState, useEffect } from 'react';
import type { Activity, ActivityType } from '@/types/activity';
import { ACTIVITY_COLORS } from '@/types/activity';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Calendar, MapPin, FileText, Image, Clock, Tag, Upload } from 'lucide-react';

// ======================================================
// INTERFACES
// ======================================================

export interface ActivityFormData extends Omit<Activity, 'id'> {
  imageFile?: File | null;
  imageSource?: 'url' | 'file';
}

interface ActivityFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: ActivityFormData) => void;
  activity?: Activity | null; // Si existe, modo edición; si null, modo creación
}

// ======================================================
// DATOS DEL FORMULARIO
// ======================================================

const ACTIVITY_TYPES: { value: ActivityType; label: string; emoji: string }[] = [
  { value: 'gastronomica', label: 'Gastronómica', emoji: '🍽️' },
  { value: 'deportiva', label: 'Deportiva', emoji: '⚽' },
  { value: 'celebracion', label: 'Celebración', emoji: '🎉' },
  { value: 'comunitaria', label: 'Comunitaria', emoji: '🌱' },
  { value: 'cultural', label: 'Cultural', emoji: '🎭' },
  { value: 'capacitacion', label: 'Capacitación', emoji: '📚' },
  { value: 'otra', label: 'Otra', emoji: '📌' },
];

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const ActivityFormDialog: React.FC<ActivityFormDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  activity
}) => {
  // ======================================================
  // ESTADOS DEL FORMULARIO
  // ======================================================

  const [formData, setFormData] = useState<Omit<Activity, 'id'>>({
    title: '',
    description: '',
    date: new Date(),
    location: '',
    imageUrl: '',
    category: 'otra',
    type: 'otra'
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Omit<Activity, 'id'>, string>>>({});
  
  // Estados para manejo de imagen
  const [imageSource, setImageSource] = useState<'url' | 'file'>('url');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // ======================================================
  // EFECTOS
  // ======================================================

  /**
   * Carga los datos de la actividad en edición o resetea el formulario
   */
  useEffect(() => {
    if (isOpen) {
      if (activity) {
        // MODO EDICIÓN: cargar datos existentes
        const activityType = activity.category || activity.type || 'otra';
        setFormData({
          title: activity.title,
          description: activity.description,
          date: activity.date,
          location: activity.location,
          imageUrl: activity.imageUrl,
          type: activityType,
          category: activityType
        });
        // Si tiene URL, asumir que es URL
        if (activity.imageUrl) {
          setImageSource('url');
          setImagePreview('');
          setSelectedFile(null);
        }
      } else {
        // MODO CREACIÓN: resetear formulario
        setFormData({
          title: '',
          description: '',
          date: new Date(),
          location: '',
          imageUrl: '',
          type: 'otra',
          category: 'otra'
        });
        setImageSource('url');
        setImagePreview('');
        setSelectedFile(null);
      }
      setErrors({});
    }
  }, [isOpen, activity]);

  // ======================================================
  // HANDLERS
  // ======================================================

  /**
   * Maneja cambios en campos de texto
   */
  const handleChange = (field: keyof Omit<Activity, 'id'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo al comenzar a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  /**
   * Maneja cambio de fecha
   */
  const handleDateChange = (value: string) => {
    const date = new Date(value);
    setFormData(prev => ({ ...prev, date }));
    if (errors.date) {
      setErrors(prev => ({ ...prev, date: undefined }));
    }
  };

  /**
   * Maneja cambio de tipo de actividad
   */
  const handleTypeChange = (type: ActivityType) => {
    setFormData(prev => ({ ...prev, type, category: type }));
  };

  /**
   * Maneja el cambio de fuente de imagen (URL o Archivo)
   */
  const handleImageSourceChange = (source: 'url' | 'file') => {
    setImageSource(source);
    // Limpiar estados al cambiar de fuente
    if (source === 'url') {
      setSelectedFile(null);
      setImagePreview('');
    } else {
      setFormData(prev => ({ ...prev, imageUrl: '' }));
    }
    // Limpiar error de imagen
    if (errors.imageUrl) {
      setErrors(prev => ({ ...prev, imageUrl: undefined }));
    }
  };

  /**
   * Maneja la selección de archivo de imagen
   */
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, imageUrl: 'Por favor selecciona un archivo de imagen' }));
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, imageUrl: 'La imagen no debe superar 5MB' }));
        return;
      }

      setSelectedFile(file);
      
      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        // Guardar el base64 en formData para poder guardarlo
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);

      // Limpiar error
      if (errors.imageUrl) {
        setErrors(prev => ({ ...prev, imageUrl: undefined }));
      }
    }
  };

  /**
   * Valida el formulario
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Omit<Activity, 'id'>, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    } else if (formData.title.length < 5) {
      newErrors.title = 'El título debe tener al menos 5 caracteres';
    } else if (formData.title.length > 100) {
      newErrors.title = 'El título no puede exceder 100 caracteres';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    } else if (formData.description.length < 20) {
      newErrors.description = 'La descripción debe tener al menos 20 caracteres';
    } else if (formData.description.length > 500) {
      newErrors.description = 'La descripción no puede exceder 500 caracteres';
    }

    if (!formData.location?.trim()) {
      newErrors.location = 'La ubicación es obligatoria';
    }

    // Imagen es opcional, no hay validación necesaria

    if (formData.date < new Date(new Date().setHours(0, 0, 0, 0))) {
      newErrors.date = 'La fecha no puede ser anterior a hoy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Valida si una cadena es una URL válida
   */
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Enviar datos con archivo si existe
      const dataToSave: ActivityFormData = {
        ...formData,
        imageFile: selectedFile,
        imageSource: 'file',
      };
      onSave(dataToSave);
    }
  };

  /**
   * Formatea fecha para input datetime-local
   */
  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // ======================================================
  // RENDERIZADO
  // ======================================================

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            {activity ? (
              <>
                <FileText className="w-6 h-6 text-[#009DDC]" />
                Editar Actividad
              </>
            ) : (
              <>
                <Calendar className="w-6 h-6 text-[#009DDC]" />
                Nueva Actividad
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {activity
              ? 'Modifica los campos que desees actualizar de esta actividad.'
              : 'Completa los siguientes campos para crear una nueva actividad en el tablón.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* ======================================================
              TÍTULO
              ====================================================== */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-semibold">
              <FileText className="w-4 h-4 inline mr-1" />
              Título de la Actividad *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Ej: Almuerzo de Camaradería - Día del Funcionario"
              maxLength={100}
              aria-invalid={!!errors.title}
              className="text-base"
            />
            {errors.title && (
              <p className="text-sm text-red-600 font-medium">{errors.title}</p>
            )}
            <p className="text-xs text-gray-500">
              {formData.title.length}/100 caracteres
            </p>
          </div>

          {/* ======================================================
              DESCRIPCIÓN
              ====================================================== */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-semibold">
              <FileText className="w-4 h-4 inline mr-1" />
              Descripción *
            </Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe la actividad, su propósito y qué pueden esperar los participantes..."
              maxLength={500}
              rows={4}
              aria-invalid={!!errors.description}
              className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009DDC] focus:border-[#009DDC] outline-none resize-none"
            />
            {errors.description && (
              <p className="text-sm text-red-600 font-medium">{errors.description}</p>
            )}
            <p className="text-xs text-gray-500">
              {formData.description.length}/500 caracteres
            </p>
          </div>

          {/* ======================================================
              FECHA Y HORA
              ====================================================== */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-base font-semibold">
              <Clock className="w-4 h-4 inline mr-1" />
              Fecha y Hora *
            </Label>
            <Input
              id="date"
              type="datetime-local"
              value={formatDateForInput(formData.date)}
              onChange={(e) => handleDateChange(e.target.value)}
              aria-invalid={!!errors.date}
              className="text-base"
            />
            {errors.date && (
              <p className="text-sm text-red-600 font-medium">{errors.date}</p>
            )}
          </div>

          {/* ======================================================
              UBICACIÓN
              ====================================================== */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-base font-semibold">
              <MapPin className="w-4 h-4 inline mr-1" />
              Ubicación *
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Ej: Patio Central CESFAM"
              aria-invalid={!!errors.location}
              className="text-base"
            />
            {errors.location && (
              <p className="text-sm text-red-600 font-medium">{errors.location}</p>
            )}
          </div>

          {/* ======================================================
              IMAGEN DE LA ACTIVIDAD
              ====================================================== */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              <Image className="w-4 h-4 inline mr-1" />
              Imagen de la Actividad (Opcional)
            </Label>
            
            {/* Campo de archivo */}
            <div className="space-y-2">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="mb-1 text-sm text-gray-600 font-medium">
                      {selectedFile ? selectedFile.name : 'Haz clic para seleccionar una imagen'}
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF (máx. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </label>
              </div>

              {/* Vista previa */}
              {imagePreview && (
                <div className="mt-3 rounded-lg overflow-hidden border-2 border-gray-200">
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="w-full h-48 object-cover"
                  />
                  <div className="px-3 py-2 bg-gray-50 text-xs text-gray-600">
                    Vista previa de la imagen
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ======================================================
              TIPO DE ACTIVIDAD
              ====================================================== */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              <Tag className="w-4 h-4 inline mr-1" />
              Tipo de Actividad *
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ACTIVITY_TYPES.map((type) => {
                const colorConfig = ACTIVITY_COLORS[type.value];
                const isSelected = (formData.category || formData.type) === type.value;
                
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleTypeChange(type.value)}
                    className={`
                      p-4 rounded-lg border-2 transition-all font-medium text-sm
                      flex flex-col items-center justify-center gap-2
                      ${isSelected
                        ? `${colorConfig.bg} ${colorConfig.badge} border-current shadow-md scale-105`
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400 hover:shadow-sm'
                      }
                    `}
                  >
                    <span className="text-2xl">{type.emoji}</span>
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ======================================================
              SEPARADOR
              ====================================================== */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-xs text-gray-500 italic">
              * Campos obligatorios
            </p>
          </div>
        </form>

        {/* ======================================================
            FOOTER CON BOTONES DE ACCIÓN
            ====================================================== */}
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="min-w-[100px]"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="min-w-[100px] bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] hover:from-[#0088c4] hover:to-[#3de8d9]"
          >
            {activity ? 'Actualizar' : 'Crear Actividad'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};