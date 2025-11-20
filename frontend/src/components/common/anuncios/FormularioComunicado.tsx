// ======================================================
// COMPONENTE: FormularioComunicado
// Ubicación: src/components/common/FormularioComunicado.tsx
// Descripción: Formulario para crear/editar comunicados oficiales
// ======================================================

'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/common/multiusos/textarea';
import type { Announcement, AnnouncementCategory, Attachment } from '@/types/announcement';
import { Megaphone, FileText, Calendar, Paperclip, Loader2 } from 'lucide-react';

// ======================================================
// TIPOS
// ======================================================

interface FormularioComunicadoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (comunicado: Omit<Announcement, 'id' | 'publicationDate'>) => void;
  comunicadoEditar?: Announcement;
}

interface FormErrors {
  title?: string;
  content?: string;
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const FormularioComunicado: React.FC<FormularioComunicadoProps> = ({
  open,
  onOpenChange,
  onSubmit,
  comunicadoEditar,
}) => {
  // ======================================================
  // ESTADOS
  // ======================================================

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: AnnouncementCategory;
    attachments: Attachment[];
  }>({
    title: comunicadoEditar?.title || '',
    description: comunicadoEditar?.description || '',
    category: comunicadoEditar?.category || 'general',
    attachments: comunicadoEditar?.attachments || [],
  });

  // ======================================================
  // EFECTOS
  // ======================================================

  useEffect(() => {
    if (comunicadoEditar) {
      setFormData({
        title: comunicadoEditar.title,
        description: comunicadoEditar.description,
        category: comunicadoEditar.category || 'general',
        attachments: comunicadoEditar.attachments || [],
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'general',
        attachments: [],
      });
    }
    setErrors({});
  }, [comunicadoEditar, open]);

  // ======================================================
  // VALIDACIÓN
  // ======================================================

  const validarFormulario = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    }

    if (!formData.description.trim()) {
      newErrors.content = 'El contenido es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ======================================================
  // MANEJADORES
  // ======================================================

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        attachments: formData.attachments.length > 0 ? formData.attachments : undefined,
      });

      setFormData({
        title: '',
        description: '',
        category: 'general',
        attachments: [],
      });
      setErrors({});
      onOpenChange(false);
    } catch (error) {
      console.error('Error al guardar comunicado:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      category: 'general',
      attachments: [],
    });
    setErrors({});
    onOpenChange(false);
  };

  // ======================================================
  // RENDERIZADO
  // ======================================================

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 -mx-6 -mt-6 px-6 py-4 mb-6 border-b-2 border-blue-200">
          <DialogTitle className="text-lg font-bold text-gray-900">
            {comunicadoEditar ? '✏️ Editar Comunicado' : '📢 Publicar Nuevo Comunicado'}
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Complete la información del comunicado oficial. Los campos marcados con * son obligatorios.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 px-2">
          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FileText className="w-4 h-4 text-[#009DDC]" />
              Título del Comunicado <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Ej: Cambio de Horario de Atención"
              className={errors.title ? 'border-red-500' : ''}
              disabled={loading}
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Categoría */}
          <div className="space-y-2">
            <Label htmlFor="category" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Calendar className="w-4 h-4 text-[#4DFFF3]" />
              Categoría <span className="text-red-500">*</span>
            </Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value as AnnouncementCategory)}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#009DDC] transition-colors text-sm"
              disabled={loading}
            >
              <option value="general">📋 General</option>
              <option value="urgente">🚨 Urgente</option>
              <option value="normativa">📜 Normativa</option>
              <option value="administrativa">🏢 Administrativa</option>
              <option value="informativa">📰 Informativa</option>
            </select>
          </div>

          {/* Descripción/Contenido */}
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FileText className="w-4 h-4 text-[#009DDC]" />
              Contenido del Comunicado <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Escriba aquí el contenido completo del comunicado..."
              rows={10}
              className={errors.content ? 'border-red-500' : ''}
              disabled={loading}
            />
            {errors.content && (
              <p className="text-xs text-red-500">{errors.content}</p>
            )}
            <p className="text-xs text-gray-500">
              💡 Sea claro y conciso. Este mensaje será visible para todos los funcionarios.
            </p>
          </div>

          {/* Adjuntos (placeholder - funcionalidad futura) */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Paperclip className="w-4 h-4 text-[#52FFB8]" />
              Documentos Adjuntos (Opcional)
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Funcionalidad de carga de archivos próximamente
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PDF, DOC, XLS - Máx. 10MB
              </p>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] hover:shadow-lg transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Publicando...
                </>
              ) : (
                <>
                  <Megaphone className="w-4 h-4 mr-2" />
                  {comunicadoEditar ? 'Guardar Cambios' : 'Publicar Comunicado'}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormularioComunicado;