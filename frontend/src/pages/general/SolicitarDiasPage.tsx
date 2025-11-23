// ======================================================
// PÁGINA: Solicitar Días Administrativos/Vacaciones
// Ubicación: src/pages/general/SolicitarDiasPage.tsx
// Descripción: Formulario para solicitar días administrativos o vacaciones
// ======================================================

'use client';

import React, { useState, useEffect } from 'react';
import { UnifiedNavbar } from '@/components/common/layout/UnifiedNavbar';
import Footer from '@/components/common/layout/Footer';
import Banner from '@/components/common/layout/Banner';
import bannerSolicitudes from '@/components/images/banner_images/BannerSolicitudes.png';
import { 
  CalendarDays, 
  User, 
  Briefcase, 
  Calendar, 
  FileText,
  CheckCircle,
  AlertCircle,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/common/multiusos/textarea';
// ✅ NUEVO: Imports del backend
import { useAuth } from '@/api/contexts/AuthContext';
import { solicitudService, usuarioService } from '@/api';

// ======================================================
// TIPOS
// ======================================================

import type { TipoSolicitud } from '@/types/solicitud';

interface SolicitudFormData {
  nombreSolicitante: string;
  rutSolicitante: string;
  area: string;
  cargoSolicitante: string;
  tipoSolicitud: TipoSolicitud;
  fechaInicio: string;
  fechaTermino: string;
  cantidadDias: number;
  motivo: string;
  telefonoContacto: string;
}

interface FormErrors {
  [key: string]: string;
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const SolicitarDiasPage: React.FC = () => {
  // ✅ NUEVO: Hook de autenticación
  const { user } = useAuth();

  // ✅ NUEVO: Estado para días desde el backend
  const [diasInfo, setDiasInfo] = useState({
    vacaciones_disponibles: 0,
    vacaciones_usados: 0,
    administrativos_disponibles: 0,
    administrativos_usados: 0
  });

  // ======================================================
  // ESTADOS
  // ======================================================

  const [formData, setFormData] = useState<SolicitudFormData>({
    nombreSolicitante: user?.nombre_completo || '',
    rutSolicitante: user?.rut || '',
    area: user?.area_nombre || '',
    cargoSolicitante: user?.cargo || '',
    tipoSolicitud: 'vacaciones',
    fechaInicio: '',
    fechaTermino: '',
    cantidadDias: 0,
    motivo: '',
    telefonoContacto: user?.telefono || ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Estados de días disponibles
  const [diasDisponibles, setDiasDisponibles] = useState({
    vacaciones: 0,
    diasAdministrativos: 0
  });

  // ✅ NUEVO: Cargar días disponibles desde el backend
  useEffect(() => {
    if (user?.id) {
      cargarDiasDisponibles();
      // Actualizar datos del formulario cuando user cambie
      setFormData(prev => ({
        ...prev,
        nombreSolicitante: user.nombre_completo,
        rutSolicitante: user.rut,
        area: user.area_nombre,
        cargoSolicitante: user.cargo,
        telefonoContacto: user.telefono || ''
      }));
    }
  }, [user]);

  const cargarDiasDisponibles = async () => {
    if (!user?.id) return;
    try {
      const dias = await usuarioService.getDiasDisponibles(user.id);
      setDiasInfo(dias);
      setDiasDisponibles({
        vacaciones: dias.vacaciones_disponibles,
        diasAdministrativos: dias.administrativos_disponibles
      });
    } catch (error) {
      console.error('Error al cargar días:', error);
    }
  };

  // ======================================================
  // FUNCIONES AUXILIARES
  // ======================================================

  /**
   * Calcula la cantidad de días entre dos fechas (excluyendo fines de semana)
   */
  const calcularDiasHabiles = (inicio: string, termino: string): number => {
    if (!inicio || !termino) return 0;
    
    const fechaInicio = new Date(inicio);
    const fechaTermino = new Date(termino);
    
    if (fechaInicio > fechaTermino) return 0;
    
    let dias = 0;
    const actual = new Date(fechaInicio);
    
    while (actual <= fechaTermino) {
      const diaSemana = actual.getDay();
      // 0 = Domingo, 6 = Sábado
      if (diaSemana !== 0 && diaSemana !== 6) {
        dias++;
      }
      actual.setDate(actual.getDate() + 1);
    }
    
    return dias;
  };

  /**
   * Valida el formulario
   */
  const validarFormulario = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fechaInicio) {
      newErrors.fechaInicio = 'La fecha de inicio es obligatoria';
    }

    if (!formData.fechaTermino) {
      newErrors.fechaTermino = 'La fecha de término es obligatoria';
    }

    if (formData.fechaInicio && formData.fechaTermino) {
      const inicio = new Date(formData.fechaInicio);
      const termino = new Date(formData.fechaTermino);
      
      if (termino < inicio) {
        newErrors.fechaTermino = 'La fecha de término debe ser posterior a la fecha de inicio';
      }

      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      
      if (inicio < hoy) {
        newErrors.fechaInicio = 'La fecha de inicio no puede ser anterior a hoy';
      }
    }

    if (formData.cantidadDias === 0) {
      newErrors.cantidadDias = 'Debes solicitar al menos 1 día';
    }

    const diasMax = formData.tipoSolicitud === 'vacaciones' 
      ? diasDisponibles.vacaciones 
      : diasDisponibles.diasAdministrativos;

    if (formData.cantidadDias > diasMax) {
      newErrors.cantidadDias = `No puedes solicitar más de ${diasMax} días (disponibles)`;
    }

    if (!formData.motivo.trim()) {
      newErrors.motivo = 'El motivo es obligatorio';
    } else if (formData.motivo.trim().length < 10) {
      newErrors.motivo = 'El motivo debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof SolicitudFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error del campo
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Calcular días automáticamente cuando cambian las fechas
    if (field === 'fechaInicio' || field === 'fechaTermino') {
      const inicio = field === 'fechaInicio' ? value : formData.fechaInicio;
      const termino = field === 'fechaTermino' ? value : formData.fechaTermino;
      
      if (inicio && termino) {
        const dias = calcularDiasHabiles(inicio, termino);
        setFormData(prev => ({ ...prev, cantidadDias: dias }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // ✅ LLAMADA REAL AL BACKEND - con los campos correctos
      await solicitudService.create({
        tipo: formData.tipoSolicitud === 'vacaciones' ? 'vacaciones' : 'dia_administrativo',
        fecha_inicio: formData.fechaInicio,
        fecha_termino: formData.fechaTermino, // ✅ Cambio de fecha_fin a fecha_termino
        cantidad_dias: formData.cantidadDias,  // ✅ Campo agregado
        motivo: formData.motivo,
        telefono_contacto: formData.telefonoContacto // ✅ Campo agregado
      });

      console.log('✅ Solicitud creada exitosamente');
      
      setSubmitSuccess(true);
      
      // Recargar días disponibles
      await cargarDiasDisponibles();
      
      // Reset form después de 3 segundos
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          ...formData,
          fechaInicio: '',
          fechaTermino: '',
          cantidadDias: 0,
          motivo: ''
        });
      }, 3000);

    } catch (error: any) {
      console.error('❌ Error al enviar solicitud:', error);
      setErrors({ submit: error.response?.data?.message || 'Error al enviar la solicitud. Por favor intente nuevamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ======================================================
  // RENDERIZADO
  // ======================================================

  if (!user) {
    return (
      <>
        <UnifiedNavbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Debes iniciar sesión para solicitar días</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <UnifiedNavbar />
      <div className="h-16" />
      
      <Banner
        imageSrc={bannerSolicitudes}
        title=""
        subtitle=""
        height="250px"
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-[1200px] mx-auto">

          {/* ======================================================
              HEADER
              ====================================================== */}
          <header className="bg-white shadow-xl rounded-xl overflow-hidden mb-6">
            <div className="py-8 px-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] rounded-xl">
                  <CalendarDays className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Solicitar Días Libres
                  </h1>
                  <p className="text-sm text-gray-500">
                    Vacaciones o días administrativos - Proceso de aprobación automático
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* ======================================================
              MENSAJE DE ÉXITO
              ====================================================== */}
          {submitSuccess && (
            <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-xl p-6 animate-in fade-in slide-in-from-top duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-800">
                    ¡Solicitud enviada exitosamente!
                  </h3>
                  <p className="text-sm text-green-700">
                    Tu jefatura directa y la dirección han sido notificadas por correo electrónico.
                    Recibirás una notificación cuando sea procesada.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* MENSAJE DE ERROR */}
          {errors.submit && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-800">
                    Error al enviar solicitud
                  </h3>
                  <p className="text-sm text-red-700">
                    {errors.submit}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* ======================================================
                COLUMNA IZQUIERDA: FORMULARIO
                ====================================================== */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow-xl rounded-xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* TIPO DE SOLICITUD */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">
                      <FileText className="w-4 h-4 inline mr-2" />
                      Tipo de Solicitud *
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleChange('tipoSolicitud', 'vacaciones')}
                        className={`p-4 border-2 rounded-xl transition-all ${
                          formData.tipoSolicitud === 'vacaciones'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            formData.tipoSolicitud === 'vacaciones'
                              ? 'bg-blue-100'
                              : 'bg-gray-100'
                          }`}>
                            <CalendarDays className={`w-5 h-5 ${
                              formData.tipoSolicitud === 'vacaciones'
                                ? 'text-blue-600'
                                : 'text-gray-600'
                            }`} />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-gray-900">Vacaciones</p>
                            <p className="text-xs text-gray-500">Días de descanso según contrato</p>
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleChange('tipoSolicitud', 'dia_administrativo')}
                        className={`p-4 border-2 rounded-xl transition-all ${
                          formData.tipoSolicitud === 'dia_administrativo'
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            formData.tipoSolicitud === 'dia_administrativo'
                              ? 'bg-purple-100'
                              : 'bg-gray-100'
                          }`}>
                            <Briefcase className={`w-5 h-5 ${
                              formData.tipoSolicitud === 'dia_administrativo'
                                ? 'text-purple-600'
                                : 'text-gray-600'
                            }`} />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-gray-900">Días Administrativos</p>
                            <p className="text-xs text-gray-500">Máximo 6 días por año</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* DATOS DEL SOLICITANTE (PRELLENADOS) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        <User className="w-3 h-3 inline mr-1" />
                        Nombre Completo
                      </Label>
                      <Input
                        value={formData.nombreSolicitante}
                        disabled
                        className="mt-1 bg-white"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        RUT
                      </Label>
                      <Input
                        value={formData.rutSolicitante}
                        disabled
                        className="mt-1 bg-white"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Área
                      </Label>
                      <Input
                        value={formData.area}
                        disabled
                        className="mt-1 bg-white"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Cargo
                      </Label>
                      <Input
                        value={formData.cargoSolicitante}
                        disabled
                        className="mt-1 bg-white"
                      />
                    </div>
                  </div>

                  {/* FECHAS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fechaInicio" className="text-base font-semibold">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Fecha de Inicio *
                      </Label>
                      <Input
                        id="fechaInicio"
                        type="date"
                        value={formData.fechaInicio}
                        onChange={(e) => handleChange('fechaInicio', e.target.value)}
                        className="mt-2"
                        min={new Date().toISOString().split('T')[0]}
                      />
                      {errors.fechaInicio && (
                        <p className="text-sm text-red-600 mt-1">{errors.fechaInicio}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="fechaTermino" className="text-base font-semibold">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Fecha de Término *
                      </Label>
                      <Input
                        id="fechaTermino"
                        type="date"
                        value={formData.fechaTermino}
                        onChange={(e) => handleChange('fechaTermino', e.target.value)}
                        className="mt-2"
                        min={formData.fechaInicio || new Date().toISOString().split('T')[0]}
                      />
                      {errors.fechaTermino && (
                        <p className="text-sm text-red-600 mt-1">{errors.fechaTermino}</p>
                      )}
                    </div>
                  </div>

                  {/* INDICADOR DE DÍAS DISPONIBLES */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Vacaciones Disponibles */}
                    <div className={`p-4 rounded-xl border-2 ${
                      formData.tipoSolicitud === 'vacaciones'
                        ? 'bg-blue-50 border-blue-300'
                        : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">
                          🏖️ Vacaciones
                        </span>
                        <span className="text-xs text-gray-500">
                          Usados: {diasInfo.vacaciones_usados}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-blue-600">
                          {diasDisponibles.vacaciones}
                        </span>
                        <span className="text-sm text-gray-600">
                          días disponibles
                        </span>
                      </div>
                    </div>

                    {/* Días Administrativos Disponibles */}
                    <div className={`p-4 rounded-xl border-2 ${
                      formData.tipoSolicitud === 'dia_administrativo'
                        ? 'bg-purple-50 border-purple-300'
                        : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">
                          📋 Días Admin
                        </span>
                        <span className="text-xs text-gray-500">
                          Usados: {diasInfo.administrativos_usados}/6
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-purple-600">
                          {diasDisponibles.diasAdministrativos}
                        </span>
                        <span className="text-sm text-gray-600">
                          días disponibles
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CANTIDAD DE DÍAS CON SLIDER */}
                  <div className={`border-2 rounded-xl p-6 ${
                    formData.tipoSolicitud === 'vacaciones'
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-purple-50 border-purple-300'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-base font-semibold text-gray-900">
                        Días Hábiles a Solicitar
                      </Label>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600">
                          {formData.cantidadDias}
                        </div>
                        <div className="text-xs text-gray-600">
                          días hábiles
                        </div>
                      </div>
                    </div>

                    {/* SLIDER */}
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="0"
                        max={
                          formData.tipoSolicitud === 'vacaciones'
                            ? diasDisponibles.vacaciones
                            : diasDisponibles.diasAdministrativos
                        }
                        value={formData.cantidadDias}
                        onChange={(e) => handleChange('cantidadDias', parseInt(e.target.value))}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, 
                            ${formData.tipoSolicitud === 'vacaciones' ? '#3B82F6' : '#A855F7'} 0%, 
                            ${formData.tipoSolicitud === 'vacaciones' ? '#3B82F6' : '#A855F7'} ${
                            ((formData.cantidadDias / (formData.tipoSolicitud === 'vacaciones' 
                              ? diasDisponibles.vacaciones 
                              : diasDisponibles.diasAdministrativos)) * 100)
                          }%, 
                            #E5E7EB ${
                            ((formData.cantidadDias / (formData.tipoSolicitud === 'vacaciones' 
                              ? diasDisponibles.vacaciones 
                              : diasDisponibles.diasAdministrativos)) * 100)
                          }%, 
                            #E5E7EB 100%)`
                        }}
                      />
                      
                      {/* Indicadores de límites */}
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>0 días</span>
                        <span className="font-semibold">
                          Máximo: {
                            formData.tipoSolicitud === 'vacaciones'
                              ? diasDisponibles.vacaciones
                              : diasDisponibles.diasAdministrativos
                          } días
                        </span>
                      </div>

                      {/* Información adicional */}
                      <div className="flex items-center gap-2 text-xs text-gray-600 bg-white p-2 rounded">
                        <AlertCircle className="w-4 h-4" />
                        <span>
                          Solo se cuentan días hábiles (lunes a viernes).
                          Los fines de semana y festivos no se consideran.
                        </span>
                      </div>

                      {errors.cantidadDias && (
                        <p className="text-sm text-red-600">{errors.cantidadDias}</p>
                      )}
                    </div>
                  </div>

                  {/* MOTIVO */}
                  <div>
                    <Label htmlFor="motivo" className="text-base font-semibold">
                      <FileText className="w-4 h-4 inline mr-2" />
                      Motivo de la Solicitud *
                    </Label>
                    <Textarea
                      id="motivo"
                      value={formData.motivo}
                      onChange={(e) => handleChange('motivo', e.target.value)}
                      placeholder="Describe brevemente el motivo de tu solicitud (mínimo 10 caracteres)"
                      rows={4}
                      className="mt-2"
                    />
                    {errors.motivo && (
                      <p className="text-sm text-red-600 mt-1">{errors.motivo}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.motivo.length}/200 caracteres
                    </p>
                  </div>

                  {/* BOTONES */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] hover:opacity-90 text-white font-semibold py-3 text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Enviar Solicitud
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          fechaInicio: '',
                          fechaTermino: '',
                          cantidadDias: 0,
                          motivo: ''
                        });
                        setErrors({});
                      }}
                      className="px-8"
                      disabled={isSubmitting}
                    >
                      Limpiar
                    </Button>
                  </div>

                </form>
              </div>
            </div>

            {/* ======================================================
                COLUMNA DERECHA: INFORMACIÓN Y AYUDA
                ====================================================== */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                
                {/* Card: Información Importante */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      Información Importante
                    </h3>
                  </div>
                  
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>
                        Las solicitudes deben enviarse con al menos 
                        <strong className="text-blue-700"> 15 días de anticipación</strong> 
                        para vacaciones.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>
                        Los días administrativos requieren 
                        <strong className="text-blue-700"> 48 horas</strong> de anticipación.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>
                        Recibirás una notificación por correo electrónico cuando tu solicitud sea revisada.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>
                        Los días festivos y fines de semana no se cuentan como días hábiles.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Card: Proceso de Aprobación */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      Proceso de Aprobación
                    </h3>
                  </div>
                  
                  <ol className="space-y-4">
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div className="text-sm text-gray-700">
                        <strong>Envío de Solicitud</strong>
                        <p className="text-gray-600 mt-1">
                          Tu solicitud se envía automáticamente a tu jefatura directa.
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div className="text-sm text-gray-700">
                        <strong>Revisión Jefatura</strong>
                        <p className="text-gray-600 mt-1">
                          Tu jefe(a) revisa y aprueba/rechaza la solicitud.
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div className="text-sm text-gray-700">
                        <strong>Notificación</strong>
                        <p className="text-gray-600 mt-1">
                          Recibes un correo con la decisión y comentarios.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>

                {/* Card: Ayuda */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <FileText className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      ¿Necesitas Ayuda?
                    </h3>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-4">
                    Si tienes dudas sobre el proceso de solicitud o necesitas asistencia, 
                    contacta a Recursos Humanos:
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2 text-gray-700">
                      <span className="font-semibold">📧 Email:</span>
                      <a href="mailto:rrhh@cesfam.cl" className="text-blue-600 hover:underline">
                        rrhh@cesfam.cl
                      </a>
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                      <span className="font-semibold">📞 Teléfono:</span>
                      <a href="tel:+56223456789" className="text-blue-600 hover:underline">
                        +56 2 2345 6789
                      </a>
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                      <span className="font-semibold">🕒 Horario:</span>
                      <span>Lunes a Viernes, 9:00 - 18:00</span>
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SolicitarDiasPage;