// ======================================================
// COMPONENTE: EventFormModal
// Ubicación: src/components/common/EventFormModal.tsx
// Descripción: Modal con formulario para crear/editar eventos
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
import type { EventFormData, EventFormModalProps } from '@/types/calendarAdmin';
import { validateEventForm } from '@/types/calendarAdmin';
import type { EventType } from '@/types/calendar';
import { Calendar, Clock, MapPin, User, FileText, Tag } from 'lucide-react';

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const EventFormModal: React.FC<EventFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode
}) => {
  // ======================================================
  // ESTADO DEL FORMULARIO
  // ======================================================

  const [formData, setFormData] = useState<EventFormData>({
    titulo: '',
    fecha: '',
    horaInicio: '',
    horaFin: '',
    descripcion: '',
    ubicacion: '',
    tipo: 'reunion',
    organizador: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EventFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ======================================================
  // EFECTOS
  // ======================================================

  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData({
        titulo: initialData.titulo,
        fecha: initialData.fecha,
        horaInicio: initialData.horaInicio || '',
        horaFin: initialData.horaFin || '',
        descripcion: initialData.descripcion,
        ubicacion: initialData.ubicacion || '',
        tipo: initialData.tipo,
        organizador: initialData.organizador || ''
      });
    } else {
      // Reset form for create mode
      setFormData({
        titulo: '',
        fecha: '',
        horaInicio: '',
        horaFin: '',
        descripcion: '',
        ubicacion: '',
        tipo: 'reunion',
        organizador: ''
      });
    }
    setErrors({});
  }, [initialData, mode, isOpen]);

  // ======================================================
  // MANEJADORES
  // ======================================================

  const handleChange = (field: keyof EventFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo al escribir
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar formulario
    const validationErrors = validateEventForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error al guardar evento:', error);
      setErrors({ titulo: 'Error al guardar el evento' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ======================================================
  // RENDERIZADO
  // ======================================================

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 -mx-6 -mt-6 px-6 py-4 mb-4 border-b-2 border-blue-200">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? '➕ Crear Nuevo Evento' : '✏️ Editar Evento'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 px-2">
          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="titulo" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FileText className="w-4 h-4 text-[#009DDC]" />
              Título del Evento *
            </Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => handleChange('titulo', e.target.value)}
              placeholder="Ej: Reunión Médica Mensual"
              className={errors.titulo ? 'border-red-500' : ''}
            />
            {errors.titulo && (
              <p className="text-sm text-red-500">{errors.titulo}</p>
            )}
          </div>

          {/* Fecha y Horas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fecha" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Calendar className="w-4 h-4 text-[#009DDC]" />
                Fecha *
              </Label>
              <Input
                id="fecha"
                type="date"
                value={formData.fecha}
                onChange={(e) => handleChange('fecha', e.target.value)}
                className={errors.fecha ? 'border-red-500' : ''}
              />
              {errors.fecha && (
                <p className="text-sm text-red-500">{errors.fecha}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="horaInicio" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Clock className="w-4 h-4 text-[#52FFB8]" />
                Hora Inicio *
              </Label>
              <Input
                id="horaInicio"
                type="time"
                value={formData.horaInicio}
                onChange={(e) => handleChange('horaInicio', e.target.value)}
                className={errors.horaInicio ? 'border-red-500' : ''}
              />
              {errors.horaInicio && (
                <p className="text-sm text-red-500">{errors.horaInicio}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="horaFin" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Clock className="w-4 h-4 text-[#52FFB8]" />
                Hora Fin *
              </Label>
              <Input
                id="horaFin"
                type="time"
                value={formData.horaFin}
                onChange={(e) => handleChange('horaFin', e.target.value)}
                className={errors.horaFin ? 'border-red-500' : ''}
              />
              {errors.horaFin && (
                <p className="text-sm text-red-500">{errors.horaFin}</p>
              )}
            </div>
          </div>

          {/* Tipo de Evento */}
          <div className="space-y-2">
            <Label htmlFor="tipo" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Tag className="w-4 h-4 text-[#CDC7E5]" />
              Tipo de Evento *
            </Label>
            <select
              id="tipo"
              value={formData.tipo}
              onChange={(e) => handleChange('tipo', e.target.value as EventType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009DDC]"
            >
              <option value="reunion">📋 Reunión</option>
              <option value="capacitacion">📚 Capacitación</option>
              <option value="feriado">🏖️ Feriado</option>
              <option value="otro">📌 Otro</option>
            </select>
          </div>

          {/* Ubicación */}
          <div className="space-y-2">
            <Label htmlFor="ubicacion" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <MapPin className="w-4 h-4 text-[#4DFFF3]" />
              Ubicación *
            </Label>
            <Input
              id="ubicacion"
              value={formData.ubicacion}
              onChange={(e) => handleChange('ubicacion', e.target.value)}
              placeholder="Ej: Sala de Reuniones Principal"
              className={errors.ubicacion ? 'border-red-500' : ''}
            />
            {errors.ubicacion && (
              <p className="text-sm text-red-500">{errors.ubicacion}</p>
            )}
          </div>

          {/* Organizador */}
          <div className="space-y-2">
            <Label htmlFor="organizador" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <User className="w-4 h-4 text-[#009DDC]" />
              Organizador *
            </Label>
            <Input
              id="organizador"
              value={formData.organizador}
              onChange={(e) => handleChange('organizador', e.target.value)}
              placeholder="Ej: Dr. Juan Pérez"
              className={errors.organizador ? 'border-red-500' : ''}
            />
            {errors.organizador && (
              <p className="text-sm text-red-500">{errors.organizador}</p>
            )}
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="descripcion" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FileText className="w-4 h-4 text-[#009DDC]" />
              Descripción *
            </Label>
            <textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => handleChange('descripcion', e.target.value)}
              placeholder="Describe el evento en detalle..."
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#009DDC] ${
                errors.descripcion ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.descripcion && (
              <p className="text-sm text-red-500">{errors.descripcion}</p>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] hover:shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : mode === 'create' ? 'Crear Evento' : 'Guardar Cambios'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventFormModal;