// ======================================================
// COMPONENTE: FormularioUsuarioCompleto
// Ubicación: src/components/common/usuarios/FormularioUsuarioCompleto.tsx
// Descripción: Formulario unificado para crear/editar usuarios
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { 
  FormularioUsuarioProps, 
  CrearUsuarioDTO, 
  EditarUsuarioDTO,
  UsuarioFormErrors,
  Rol,
  Area
} from '@/types/usuario';
import { validarRUT, formatearRUT } from '@/types/usuario';
import { 
  UserPlus, 
  Loader2, 
  Mail, 
  Phone, 
  User, 
  Building2,
  Calendar,
  MapPin,
  AlertCircle,
  Lock,
  Users,
  Briefcase,
  Contact
} from 'lucide-react';

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const FormularioUsuarioCompleto: React.FC<FormularioUsuarioProps> = ({
  open,
  onOpenChange,
  onSubmit,
  usuarioEditar,
  modo = 'crear',
}) => {
  // ======================================================
  // ESTADOS
  // ======================================================

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<UsuarioFormErrors>({});
  const [roles, setRoles] = useState<Rol[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  
  const [formData, setFormData] = useState<CrearUsuarioDTO | EditarUsuarioDTO>({
    rut: usuarioEditar?.rut || '',
    nombre: usuarioEditar?.nombre || '',
    apellido_paterno: usuarioEditar?.apellido_paterno || '',
    apellido_materno: usuarioEditar?.apellido_materno || '',
    email: usuarioEditar?.email || '',
    password: '',
    cargo: usuarioEditar?.cargo || '',
    area: usuarioEditar?.area || '',
    rol: usuarioEditar?.rol || '',
    fecha_ingreso: usuarioEditar?.fecha_ingreso || new Date().toISOString().split('T')[0],
    telefono: usuarioEditar?.telefono || '',
    fecha_nacimiento: usuarioEditar?.fecha_nacimiento || '',
    direccion: usuarioEditar?.direccion || '',
    contacto_emergencia_nombre: usuarioEditar?.contacto_emergencia_nombre || '',
    contacto_emergencia_telefono: usuarioEditar?.contacto_emergencia_telefono || '',
    contacto_emergencia_relacion: usuarioEditar?.contacto_emergencia_relacion || '',
    es_jefe_de_area: usuarioEditar?.es_jefe_de_area || false,
  });

  // ======================================================
  // EFECTOS
  // ======================================================

  useEffect(() => {
    if (open) {
      cargarRolesYAreas();
      
      if (usuarioEditar) {
        setFormData({
          rut: usuarioEditar.rut,
          nombre: usuarioEditar.nombre,
          apellido_paterno: usuarioEditar.apellido_paterno,
          apellido_materno: usuarioEditar.apellido_materno,
          email: usuarioEditar.email,
          password: '',
          cargo: usuarioEditar.cargo,
          area: usuarioEditar.area,
          rol: usuarioEditar.rol,
          fecha_ingreso: usuarioEditar.fecha_ingreso,
          telefono: usuarioEditar.telefono || '',
          fecha_nacimiento: usuarioEditar.fecha_nacimiento || '',
          direccion: usuarioEditar.direccion || '',
          contacto_emergencia_nombre: usuarioEditar.contacto_emergencia_nombre || '',
          contacto_emergencia_telefono: usuarioEditar.contacto_emergencia_telefono || '',
          contacto_emergencia_relacion: usuarioEditar.contacto_emergencia_relacion || '',
          es_jefe_de_area: usuarioEditar.es_jefe_de_area,
        });
      } else {
        resetForm();
      }
      setErrors({});
    }
  }, [open, usuarioEditar]);

  // ======================================================
  // FUNCIONES AUXILIARES
  // ======================================================

  const cargarRolesYAreas = async () => {
    // TODO: Reemplazar con llamadas reales al backend
    // Por ahora, datos mock
    setRoles([
      { id: '1', nombre: 'Dirección', nivel: 4 },
      { id: '2', nombre: 'Subdirección', nivel: 3 },
      { id: '3', nombre: 'Jefatura', nivel: 2 },
      { id: '4', nombre: 'Funcionario', nivel: 1 },
    ]);

    setAreas([
      { id: '1', nombre: 'Medicina General', codigo: 'MED-001', color: '#3B82F6', icono: '🩺', activa: true },
      { id: '2', nombre: 'Enfermería', codigo: 'ENF-001', color: '#10B981', icono: '🩹', activa: true },
      { id: '3', nombre: 'Odontología', codigo: 'ODO-001', color: '#6366F1', icono: '🦷', activa: true },
      { id: '4', nombre: 'Administración', codigo: 'ADM-001', color: '#6B7280', icono: '🏢', activa: true },
    ]);
  };

  const resetForm = () => {
    setFormData({
      rut: '',
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      email: '',
      password: '',
      cargo: '',
      area: '',
      rol: '',
      fecha_ingreso: new Date().toISOString().split('T')[0],
      telefono: '',
      fecha_nacimiento: '',
      direccion: '',
      contacto_emergencia_nombre: '',
      contacto_emergencia_telefono: '',
      contacto_emergencia_relacion: '',
      es_jefe_de_area: false,
    });
  };

  // ======================================================
  // VALIDACIÓN
  // ======================================================

  const validarFormulario = (): boolean => {
    const newErrors: UsuarioFormErrors = {};

    // RUT
    if (!formData.rut.trim()) {
      newErrors.rut = 'El RUT es obligatorio';
    } else if (!validarRUT(formData.rut)) {
      newErrors.rut = 'RUT inválido. Formato: XX.XXX.XXX-X';
    }

    // Nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    // Apellido Paterno
    if (!formData.apellido_paterno.trim()) {
      newErrors.apellido_paterno = 'El apellido paterno es obligatorio';
    }

    // Apellido Materno
    if (!formData.apellido_materno.trim()) {
      newErrors.apellido_materno = 'El apellido materno es obligatorio';
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Password (solo obligatorio al crear)
    if (modo === 'crear' && !formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password && formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    // Cargo
    if (!formData.cargo.trim()) {
      newErrors.cargo = 'El cargo es obligatorio';
    }

    // Área
    if (!formData.area) {
      newErrors.area = 'El área es obligatoria';
    }

    // Rol
    if (!formData.rol) {
      newErrors.rol = 'El rol es obligatorio';
    }

    // Fecha de ingreso
    if (!formData.fecha_ingreso) {
      newErrors.fecha_ingreso = 'La fecha de ingreso es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ======================================================
  // MANEJADORES
  // ======================================================

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Limpiar error del campo
    if (errors[field as keyof UsuarioFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Formatear RUT automáticamente
    if (field === 'rut' && typeof value === 'string') {
      const formatted = formatearRUT(value);
      if (formatted !== value) {
        setFormData((prev) => ({ ...prev, rut: formatted }));
      }
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

      onSubmit(formData);
      resetForm();
      setErrors({});
      onOpenChange(false);
    } catch (error) {
      console.error('Error al guardar usuario:', error);
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
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 -mx-6 -mt-6 px-6 py-4 mb-6 border-b-2 border-blue-200">
          <DialogTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
            {modo === 'crear' ? (
              <>
                <UserPlus className="w-6 h-6 text-[#009DDC]" />
                Crear Nuevo Funcionario
              </>
            ) : (
              <>
                <User className="w-6 h-6 text-[#009DDC]" />
                Editar Funcionario
              </>
            )}
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Complete la información del funcionario. Los campos marcados con * son obligatorios.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 px-2">
          
          {/* ======================================================
              SECCIÓN 1: IDENTIFICACIÓN
              ====================================================== */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-200">
              <User className="w-5 h-5 text-[#009DDC]" />
              Identificación Personal
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* RUT */}
              <div>
                <Label htmlFor="rut" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  RUT <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="rut"
                  value={formData.rut}
                  onChange={(e) => handleInputChange('rut', e.target.value)}
                  placeholder="12.345.678-9"
                  className={errors.rut ? 'border-red-500' : ''}
                  disabled={loading || modo === 'editar'}
                />
                {errors.rut && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.rut}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Mail className="w-4 h-4 text-[#4DFFF3]" />
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="juan.perez@cesfam.cl"
                  className={errors.email ? 'border-red-500' : ''}
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Nombre */}
              <div>
                <Label htmlFor="nombre" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  Nombre <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  placeholder="Juan"
                  className={errors.nombre ? 'border-red-500' : ''}
                  disabled={loading}
                />
                {errors.nombre && (
                  <p className="text-xs text-red-500 mt-1">{errors.nombre}</p>
                )}
              </div>

              {/* Apellido Paterno */}
              <div>
                <Label htmlFor="apellido_paterno" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  Apellido Paterno <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="apellido_paterno"
                  value={formData.apellido_paterno}
                  onChange={(e) => handleInputChange('apellido_paterno', e.target.value)}
                  placeholder="Pérez"
                  className={errors.apellido_paterno ? 'border-red-500' : ''}
                  disabled={loading}
                />
                {errors.apellido_paterno && (
                  <p className="text-xs text-red-500 mt-1">{errors.apellido_paterno}</p>
                )}
              </div>

              {/* Apellido Materno */}
              <div>
                <Label htmlFor="apellido_materno" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  Apellido Materno <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="apellido_materno"
                  value={formData.apellido_materno}
                  onChange={(e) => handleInputChange('apellido_materno', e.target.value)}
                  placeholder="González"
                  className={errors.apellido_materno ? 'border-red-500' : ''}
                  disabled={loading}
                />
                {errors.apellido_materno && (
                  <p className="text-xs text-red-500 mt-1">{errors.apellido_materno}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Lock className="w-4 h-4 text-[#52FFB8]" />
                  Contraseña {modo === 'crear' && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder={modo === 'crear' ? 'Mínimo 8 caracteres' : 'Dejar vacío para no cambiar'}
                  className={errors.password ? 'border-red-500' : ''}
                  disabled={loading}
                />
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}
              </div>
            </div>
          </div>

          {/* ======================================================
              SECCIÓN 2: INFORMACIÓN PROFESIONAL
              ====================================================== */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-200">
              <Briefcase className="w-5 h-5 text-[#009DDC]" />
              Información Profesional
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cargo */}
              <div>
                <Label htmlFor="cargo" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  Cargo <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cargo"
                  value={formData.cargo}
                  onChange={(e) => handleInputChange('cargo', e.target.value)}
                  placeholder="Ej: Médico General"
                  className={errors.cargo ? 'border-red-500' : ''}
                  disabled={loading}
                />
                {errors.cargo && (
                  <p className="text-xs text-red-500 mt-1">{errors.cargo}</p>
                )}
              </div>

              {/* Fecha de Ingreso */}
              <div>
                <Label htmlFor="fecha_ingreso" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Calendar className="w-4 h-4 text-[#4DFFF3]" />
                  Fecha de Ingreso <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fecha_ingreso"
                  type="date"
                  value={formData.fecha_ingreso}
                  onChange={(e) => handleInputChange('fecha_ingreso', e.target.value)}
                  className={errors.fecha_ingreso ? 'border-red-500' : ''}
                  disabled={loading}
                />
                {errors.fecha_ingreso && (
                  <p className="text-xs text-red-500 mt-1">{errors.fecha_ingreso}</p>
                )}
              </div>

              {/* Área */}
              <div>
                <Label htmlFor="area" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Building2 className="w-4 h-4 text-[#52FFB8]" />
                  Área/Departamento <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.area}
                  onValueChange={(value) => handleInputChange('area', value)}
                  disabled={loading}
                >
                  <SelectTrigger className={errors.area ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecciona un área" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area.id} value={area.id}>
                        {area.icono} {area.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.area && (
                  <p className="text-xs text-red-500 mt-1">{errors.area}</p>
                )}
              </div>

              {/* Rol */}
              <div>
                <Label htmlFor="rol" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Users className="w-4 h-4 text-[#009DDC]" />
                  Rol <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.rol}
                  onValueChange={(value) => handleInputChange('rol', value)}
                  disabled={loading}
                >
                  <SelectTrigger className={errors.rol ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((rol) => (
                      <SelectItem key={rol.id} value={rol.id}>
                        {rol.nombre} (Nivel {rol.nivel})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.rol && (
                  <p className="text-xs text-red-500 mt-1">{errors.rol}</p>
                )}
              </div>
            </div>
          </div>

          {/* ======================================================
              SECCIÓN 3: CONTACTO
              ====================================================== */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-200">
              <Phone className="w-5 h-5 text-[#009DDC]" />
              Información de Contacto
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Teléfono */}
              <div>
                <Label htmlFor="telefono" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Phone className="w-4 h-4 text-[#52FFB8]" />
                  Teléfono
                </Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  placeholder="+56912345678"
                  disabled={loading}
                />
              </div>

              {/* Fecha de Nacimiento */}
              <div>
                <Label htmlFor="fecha_nacimiento" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Calendar className="w-4 h-4 text-[#4DFFF3]" />
                  Fecha de Nacimiento
                </Label>
                <Input
                  id="fecha_nacimiento"
                  type="date"
                  value={formData.fecha_nacimiento}
                  onChange={(e) => handleInputChange('fecha_nacimiento', e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Dirección */}
              <div className="md:col-span-2">
                <Label htmlFor="direccion" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <MapPin className="w-4 h-4 text-[#009DDC]" />
                  Dirección
                </Label>
                <Textarea
                  id="direccion"
                  value={formData.direccion}
                  onChange={(e) => handleInputChange('direccion', e.target.value)}
                  placeholder="Av. Siempre Viva 742, Springfield"
                  rows={2}
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* ======================================================
              SECCIÓN 4: CONTACTO DE EMERGENCIA
              ====================================================== */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-200">
              <Contact className="w-5 h-5 text-[#009DDC]" />
              Contacto de Emergencia
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Nombre */}
              <div>
                <Label htmlFor="contacto_emergencia_nombre" className="text-sm font-semibold text-gray-700">
                  Nombre Completo
                </Label>
                <Input
                  id="contacto_emergencia_nombre"
                  value={formData.contacto_emergencia_nombre}
                  onChange={(e) => handleInputChange('contacto_emergencia_nombre', e.target.value)}
                  placeholder="María González"
                  disabled={loading}
                />
              </div>

              {/* Teléfono */}
              <div>
                <Label htmlFor="contacto_emergencia_telefono" className="text-sm font-semibold text-gray-700">
                  Teléfono
                </Label>
                <Input
                  id="contacto_emergencia_telefono"
                  value={formData.contacto_emergencia_telefono}
                  onChange={(e) => handleInputChange('contacto_emergencia_telefono', e.target.value)}
                  placeholder="+56987654321"
                  disabled={loading}
                />
              </div>

              {/* Relación */}
              <div>
                <Label htmlFor="contacto_emergencia_relacion" className="text-sm font-semibold text-gray-700">
                  Relación
                </Label>
                <Input
                  id="contacto_emergencia_relacion"
                  value={formData.contacto_emergencia_relacion}
                  onChange={(e) => handleInputChange('contacto_emergencia_relacion', e.target.value)}
                  placeholder="Madre, Esposa, Hermano..."
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* ======================================================
              BOTONES
              ====================================================== */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
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
                  {modo === 'crear' ? 'Creando...' : 'Guardando...'}
                </>
              ) : (
                <>
                  {modo === 'crear' ? (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Crear Funcionario
                    </>
                  ) : (
                    <>
                      <User className="w-4 h-4 mr-2" />
                      Guardar Cambios
                    </>
                  )}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormularioUsuarioCompleto;