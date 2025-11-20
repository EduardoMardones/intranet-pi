// ======================================================
// COMPONENTE: FormularioFuncionario
// Ubicación: src/components/common/FormularioFuncionario.tsx
// Descripción: Formulario para crear/editar funcionarios
// ======================================================

'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Employee, AreaType, RoleType } from '@/types/employee';
import { ROLE_CONFIG, AREA_CONFIG } from '@/types/employee';
import { UserPlus, Loader2, Mail, Phone, User, Users } from 'lucide-react';

// ======================================================
// TIPOS
// ======================================================

interface FormularioFuncionarioProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (funcionario: Omit<Employee, 'id'>) => void;
  empleadoEditar?: Employee;
}

interface FormErrors {
  nombre?: string;
  apellidos?: string;
  email?: string;
  role?: string;
  area?: string;
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const FormularioFuncionario: React.FC<FormularioFuncionarioProps> = ({
  open,
  onOpenChange,
  onSubmit,
  empleadoEditar,
}) => {
  // ======================================================
  // ESTADOS
  // ======================================================

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [formData, setFormData] = useState({
    nombre: empleadoEditar?.nombre || '',
    apellidos: empleadoEditar?.apellidos || '',
    email: empleadoEditar?.email || '',
    telefono: empleadoEditar?.telefono || '',
    extension: empleadoEditar?.extension || '',
    role: empleadoEditar?.role || ('' as RoleType),
    area: empleadoEditar?.area || ('' as AreaType),
    avatar: empleadoEditar?.avatar || '',
  });

  // ======================================================
  // VALIDACIÓN
  // ======================================================

  const validarFormulario = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData.apellidos.trim()) {
      newErrors.apellidos = 'Los apellidos son obligatorios';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.role) {
      newErrors.role = 'El rol es obligatorio';
    }

    if (!formData.area) {
      newErrors.area = 'El área es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ======================================================
  // MANEJADORES
  // ======================================================

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpiar error del campo al escribir
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
      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSubmit({
        nombre: formData.nombre.trim(),
        apellidos: formData.apellidos.trim(),
        email: formData.email.trim().toLowerCase(),
        telefono: formData.telefono.trim() || undefined,
        extension: formData.extension.trim() || undefined,
        role: formData.role,
        area: formData.area,
        avatar: formData.avatar.trim() || undefined,
      });

      // Resetear formulario
      setFormData({
        nombre: '',
        apellidos: '',
        email: '',
        telefono: '',
        extension: '',
        role: '' as RoleType,
        area: '' as AreaType,
        avatar: '',
      });
      setErrors({});
      onOpenChange(false);
    } catch (error) {
      console.error('Error al guardar funcionario:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      extension: '',
      role: '' as RoleType,
      area: '' as AreaType,
      avatar: '',
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
            {empleadoEditar ? '✏️ Editar Funcionario' : '➕ Agregar Nuevo Funcionario'}
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Complete los datos del funcionario. Los campos marcados con * son obligatorios.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 px-2">
          {/* ======================================================
              INFORMACIÓN PERSONAL
              ====================================================== */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombre */}
              <div className="space-y-2">
                <Label htmlFor="nombre" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <User className="w-4 h-4 text-[#009DDC]" />
                  Nombre <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  placeholder="Ej: Juan"
                  className={errors.nombre ? 'border-red-500' : ''}
                  disabled={loading}
                />
                {errors.nombre && (
                  <p className="text-xs text-red-500">{errors.nombre}</p>
                )}
              </div>

              {/* Apellidos */}
              <div className="space-y-2">
                <Label htmlFor="apellidos" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <User className="w-4 h-4 text-[#009DDC]" />
                  Apellidos <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="apellidos"
                  value={formData.apellidos}
                  onChange={(e) => handleInputChange('apellidos', e.target.value)}
                  placeholder="Ej: Pérez González"
                  className={errors.apellidos ? 'border-red-500' : ''}
                  disabled={loading}
                />
                {errors.apellidos && (
                  <p className="text-xs text-red-500">{errors.apellidos}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Mail className="w-4 h-4 text-[#4DFFF3]" />
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="ejemplo@cesfam.cl"
                className={errors.email ? 'border-red-500' : ''}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          {/* ======================================================
              ROL Y ÁREA
              ====================================================== */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Rol */}
              <div className="space-y-2">
                <Label htmlFor="role" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <UserPlus className="w-4 h-4 text-[#52FFB8]" />
                  Rol <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange('role', value)}
                  disabled={loading}
                >
                  <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Seleccione un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ROLE_CONFIG).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-xs text-red-500">{errors.role}</p>
                )}
              </div>

              {/* Área */}
              <div className="space-y-2">
                <Label htmlFor="area" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Users className="w-4 h-4 text-[#CDC7E5]" />
                  Área <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.area}
                  onValueChange={(value) => handleInputChange('area', value)}
                  disabled={loading}
                >
                  <SelectTrigger className={errors.area ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Seleccione un área" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(AREA_CONFIG).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        {config.icon} {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.area && (
                  <p className="text-xs text-red-500">{errors.area}</p>
                )}
              </div>
            </div>
          </div>

          {/* ======================================================
              INFORMACIÓN DE CONTACTO
              ====================================================== */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Teléfono */}
              <div className="space-y-2">
                <Label htmlFor="telefono" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Phone className="w-4 h-4 text-[#52FFB8]" />
                  Teléfono
                </Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  placeholder="+56 9 1234 5678"
                  disabled={loading}
                />
              </div>

              {/* Extensión */}
              <div className="space-y-2">
                <Label htmlFor="extension" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Phone className="w-4 h-4 text-[#4DFFF3]" />
                  Extensión
                </Label>
                <Input
                  id="extension"
                  value={formData.extension}
                  onChange={(e) => handleInputChange('extension', e.target.value)}
                  placeholder="Ej: 101"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Avatar URL (opcional) */}
            <div className="space-y-2">
              <Label htmlFor="avatar" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <UserPlus className="w-4 h-4 text-[#009DDC]" />
                URL de Avatar (opcional)
              </Label>
              <Input
                id="avatar"
                value={formData.avatar}
                onChange={(e) => handleInputChange('avatar', e.target.value)}
                placeholder="https://ejemplo.com/avatar.jpg"
                disabled={loading}
              />
              <p className="text-xs text-gray-500">
                💡 Si no proporciona una imagen, se generará un avatar con las iniciales
              </p>
            </div>
          </div>

          {/* ======================================================
              BOTONES DE ACCIÓN
              ====================================================== */}
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
                  Guardando...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  {empleadoEditar ? 'Guardar Cambios' : 'Crear Funcionario'}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormularioFuncionario;