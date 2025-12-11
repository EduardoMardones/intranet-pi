// ======================================================
// COMPONENTE: FormularioComunicado - VERSIÓN COMPLETA
// Ubicación: src/components/common/anuncios/FormularioComunicado.tsx
// Descripción: Formulario completo para crear/editar comunicados oficiales
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
import type { Announcement, AnnouncementCategory } from '@/types/announcement';
import type { VisibilidadRoles } from '@/api/services/anunciosService';
import { 
  Megaphone, FileText, Calendar, Paperclip, Loader2, 
  Users, Shield, Image as ImageIcon, X, Upload 
} from 'lucide-react';
import { areaService } from '@/api';

// ======================================================
// TIPOS
// ======================================================

interface Area {
  id: string;
  nombre: string;
}

export interface FormularioComunicadoData {
  title: string;
  description: string;
  category: AnnouncementCategory;
  visibilidad_roles: VisibilidadRoles;
  para_todas_areas: boolean;
  areas_destinatarias: string[];
  fecha_publicacion?: Date;
  fecha_expiracion?: Date;
  imagen?: File;
  adjuntos?: File[];
}

interface FormularioComunicadoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (comunicado: FormularioComunicadoData) => void;
  comunicadoEditar?: Announcement;
}

interface FormErrors {
  title?: string;
  content?: string;
  fecha_expiracion?: string;
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
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [areas, setAreas] = useState<Area[]>([]);
  
  const [formData, setFormData] = useState<FormularioComunicadoData>({
    title: '',
    description: '',
    category: 'general',
    visibilidad_roles: 'funcionarios_y_jefatura',
    para_todas_areas: true,
    areas_destinatarias: [],
    fecha_publicacion: new Date(),
    fecha_expiracion: undefined,
    imagen: undefined,
    adjuntos: [],
  });

  const [imagenPreview, setImagenPreview] = useState<string | null>(null);

  // ======================================================
  // EFECTOS
  // ======================================================

  useEffect(() => {
    if (open) {
      cargarAreas();
    }
  }, [open]);

  useEffect(() => {
    if (comunicadoEditar) {
      setFormData({
        title: comunicadoEditar.title,
        description: comunicadoEditar.description,
        category: comunicadoEditar.category || 'general',
        visibilidad_roles: 'funcionarios_y_jefatura',
        para_todas_areas: true,
        areas_destinatarias: [],
        fecha_publicacion: comunicadoEditar.publicationDate,
        fecha_expiracion: undefined,
        imagen: undefined,
        adjuntos: [],
      });
    } else {
      resetForm();
    }
    setErrors({});
    setImagenPreview(null);
  }, [comunicadoEditar, open]);

  // ======================================================
  // FUNCIONES
  // ======================================================

  const cargarAreas = async () => {
    try {
      setLoadingAreas(true);
      const areasData = await areaService.getAll();
      setAreas(areasData);
    } catch (err) {
      console.error('Error al cargar áreas:', err);
    } finally {
      setLoadingAreas(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'general',
      visibilidad_roles: 'funcionarios_y_jefatura',
      para_todas_areas: true,
      areas_destinatarias: [],
      fecha_publicacion: new Date(),
      fecha_expiracion: undefined,
      imagen: undefined,
      adjuntos: [],
    });
    setImagenPreview(null);
  };

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

    if (formData.fecha_expiracion && formData.fecha_publicacion) {
      if (formData.fecha_expiracion <= formData.fecha_publicacion) {
        newErrors.fecha_expiracion = 'La fecha de expiración debe ser posterior a la de publicación';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ======================================================
  // MANEJADORES
  // ======================================================

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAreaToggle = (areaId: string) => {
    setFormData((prev) => {
      const isSelected = prev.areas_destinatarias.includes(areaId);
      return {
        ...prev,
        areas_destinatarias: isSelected
          ? prev.areas_destinatarias.filter(id => id !== areaId)
          : [...prev.areas_destinatarias, areaId],
      };
    });
  };

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo y tamaño
      if (!file.type.startsWith('image/')) {
        alert('Por favor seleccione una imagen válida');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        alert('La imagen no debe superar los 5MB');
        return;
      }

      setFormData(prev => ({ ...prev, imagen: file }));
      
      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdjuntosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validar tamaño total
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > 10 * 1024 * 1024) { // 10MB total
      alert('El tamaño total de los archivos no debe superar los 10MB');
      return;
    }

    setFormData(prev => ({ ...prev, adjuntos: files }));
  };

  const handleRemoveImagen = () => {
    setFormData(prev => ({ ...prev, imagen: undefined }));
    setImagenPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      onSubmit(formData);

      resetForm();
      setErrors({});
      onOpenChange(false);
    } catch (error) {
      console.error('Error al guardar comunicado:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    setErrors({});
    onOpenChange(false);
  };

  // ======================================================
  // RENDERIZADO
  // ======================================================

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white">
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

          {/* Fila: Categoría y Visibilidad por Roles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
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

            {/* Visibilidad por Roles */}
            <div className="space-y-2">
              <Label htmlFor="visibilidad_roles" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Shield className="w-4 h-4 text-purple-600" />
                ¿Quién puede ver este anuncio? <span className="text-red-500">*</span>
              </Label>
              <select
                id="visibilidad_roles"
                value={formData.visibilidad_roles}
                onChange={(e) => handleInputChange('visibilidad_roles', e.target.value as VisibilidadRoles)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#009DDC] transition-colors text-sm"
                disabled={loading}
              >
                <option value="funcionarios_y_jefatura">👥 Funcionarios y Jefatura</option>
                <option value="solo_funcionarios">👤 Solo Funcionarios</option>
                <option value="solo_jefatura">👔 Solo Jefatura</option>
                <option value="solo_direccion">🔒 Solo Dirección y Subdirección</option>
              </select>
              <p className="text-xs text-gray-500">
                💡 Dirección y Subdirección siempre pueden ver todos los anuncios
              </p>
            </div>
          </div>

          {/* Visibilidad por Áreas */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Users className="w-4 h-4 text-green-600" />
              ¿Para qué áreas es este anuncio?
            </Label>
            
            {/* Toggle Todas las Áreas */}
            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                id="para_todas_areas"
                checked={formData.para_todas_areas}
                onChange={(e) => handleInputChange('para_todas_areas', e.target.checked)}
                className="w-4 h-4 text-[#009DDC] rounded focus:ring-[#009DDC]"
                disabled={loading}
              />
              <Label htmlFor="para_todas_areas" className="text-sm font-medium text-gray-700 cursor-pointer">
                Todas las áreas
              </Label>
            </div>

            {/* Selector de Áreas (solo si no es para todas) */}
            {!formData.para_todas_areas && (
              <div className="border-2 border-gray-200 rounded-lg p-4 max-h-48 overflow-y-auto">
                {loadingAreas ? (
                  <p className="text-sm text-gray-500 text-center py-4">Cargando áreas...</p>
                ) : areas.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">No hay áreas disponibles</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {areas.map((area) => (
                      <div key={area.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`area-${area.id}`}
                          checked={formData.areas_destinatarias.includes(area.id)}
                          onChange={() => handleAreaToggle(area.id)}
                          className="w-4 h-4 text-[#009DDC] rounded focus:ring-[#009DDC]"
                          disabled={loading}
                        />
                        <Label htmlFor={`area-${area.id}`} className="text-sm text-gray-700 cursor-pointer">
                          {area.nombre}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Fecha de Publicación */}
            <div className="space-y-2">
              <Label htmlFor="fecha_publicacion" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Calendar className="w-4 h-4 text-blue-600" />
                Fecha de Publicación
              </Label>
              <Input
                id="fecha_publicacion"
                type="datetime-local"
                value={formData.fecha_publicacion 
                  ? new Date(formData.fecha_publicacion.getTime() - formData.fecha_publicacion.getTimezoneOffset() * 60000)
                      .toISOString().slice(0, 16)
                  : ''
                }
                onChange={(e) => handleInputChange('fecha_publicacion', new Date(e.target.value))}
                disabled={loading}
              />
            </div>

            {/* Fecha de Expiración */}
            <div className="space-y-2">
              <Label htmlFor="fecha_expiracion" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Calendar className="w-4 h-4 text-red-600" />
                Fecha de Expiración (Opcional)
              </Label>
              <Input
                id="fecha_expiracion"
                type="datetime-local"
                value={formData.fecha_expiracion 
                  ? new Date(formData.fecha_expiracion.getTime() - formData.fecha_expiracion.getTimezoneOffset() * 60000)
                      .toISOString().slice(0, 16)
                  : ''
                }
                onChange={(e) => handleInputChange('fecha_expiracion', e.target.value ? new Date(e.target.value) : undefined)}
                className={errors.fecha_expiracion ? 'border-red-500' : ''}
                disabled={loading}
              />
              {errors.fecha_expiracion && (
                <p className="text-xs text-red-500">{errors.fecha_expiracion}</p>
              )}
            </div>
          </div>

          {/* Contenido */}
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
              rows={8}
              className={errors.content ? 'border-red-500' : ''}
              disabled={loading}
            />
            {errors.content && (
              <p className="text-xs text-red-500">{errors.content}</p>
            )}
          </div>

          {/* Imagen del Anuncio */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <ImageIcon className="w-4 h-4 text-purple-600" />
              Imagen del Anuncio (Opcional)
            </Label>
            
            {imagenPreview ? (
              <div className="relative">
                <img 
                  src={imagenPreview} 
                  alt="Preview" 
                  className="w-full max-h-48 object-cover rounded-lg border-2 border-gray-200"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={handleRemoveImagen}
                  className="absolute top-2 right-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  id="imagen"
                  accept="image/*"
                  onChange={handleImagenChange}
                  className="hidden"
                  disabled={loading}
                />
                <Label
                  htmlFor="imagen"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Haga clic para subir una imagen</span>
                  <span className="text-xs text-gray-400 mt-1">PNG, JPG - Máx. 5MB</span>
                </Label>
              </div>
            )}
          </div>

          {/* Archivos Adjuntos */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Paperclip className="w-4 h-4 text-[#52FFB8]" />
              Documentos Adjuntos (Opcional)
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                id="adjuntos"
                multiple
                onChange={handleAdjuntosChange}
                className="hidden"
                disabled={loading}
              />
              <Label
                htmlFor="adjuntos"
                className="flex flex-col items-center cursor-pointer"
              >
                <Paperclip className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  {formData.adjuntos && formData.adjuntos.length > 0
                    ? `${formData.adjuntos.length} archivo(s) seleccionado(s)`
                    : 'Haga clic para agregar archivos'
                  }
                </span>
                <span className="text-xs text-gray-400 mt-1">PDF, DOC, XLS - Máx. 10MB total</span>
              </Label>
              
              {formData.adjuntos && formData.adjuntos.length > 0 && (
                <div className="mt-3 space-y-1">
                  {formData.adjuntos.map((file, index) => (
                    <div key={index} className="text-xs text-gray-600 flex items-center gap-2">
                      <Paperclip className="w-3 h-3" />
                      {file.name} ({(file.size / 1024).toFixed(1)} KB)
                    </div>
                  ))}
                </div>
              )}
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