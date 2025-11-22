// ======================================================
// PÁGINA: Solicitar Días Administrativos/Vacaciones
// Ubicación: src/pages/general/SolicitarDiasPage.tsx
// Descripción: Formulario para solicitar días administrativos o vacaciones
// ======================================================

'use client';

import React, { useState } from 'react';
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
  Download,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/common/multiusos/textarea';

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
// DATOS SIMULADOS DEL USUARIO (En producción vendrá del contexto/sesión)
// ======================================================

const USUARIO_ACTUAL = {
  nombre: 'María Fernanda González',
  rut: '18.456.789-2',
  area: 'Enfermería',
  cargo: 'Enfermera',
  telefono: '+56 9 8765 4321',
  email: 'mfgonzalez@cesfam.cl',
  // Días disponibles
  diasVacacionesDisponibles: 15,
  diasAdministrativosDisponibles: 4, // Ya usó 2 de 6
  diasVacacionesUsados: 10,
  diasAdministrativosUsados: 2
};

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const SolicitarDiasPage: React.FC = () => {
  // ======================================================
  // ESTADOS
  // ======================================================

  const [formData, setFormData] = useState<SolicitudFormData>({
    nombreSolicitante: USUARIO_ACTUAL.nombre,
    rutSolicitante: USUARIO_ACTUAL.rut,
    area: USUARIO_ACTUAL.area,
    cargoSolicitante: USUARIO_ACTUAL.cargo,
    tipoSolicitud: 'vacaciones',
    fechaInicio: '',
    fechaTermino: '',
    cantidadDias: 0,
    motivo: '',
    telefonoContacto: USUARIO_ACTUAL.telefono
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Estados de días disponibles
  const [diasDisponibles, setDiasDisponibles] = useState({
    vacaciones: USUARIO_ACTUAL.diasVacacionesDisponibles,
    diasAdministrativos: USUARIO_ACTUAL.diasAdministrativosDisponibles
  });

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
      
      if (inicio > termino) {
        newErrors.fechaTermino = 'La fecha de término debe ser posterior a la fecha de inicio';
      }

      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      
      if (inicio < hoy) {
        newErrors.fechaInicio = 'La fecha de inicio no puede ser anterior a hoy';
      }
    }

    if (formData.cantidadDias === 0) {
      newErrors.cantidadDias = 'Debe solicitar al menos 1 día';
    }

    // Validar según tipo de solicitud
    if (formData.tipoSolicitud === 'dia_administrativo') {
      if (formData.cantidadDias > 6) {
        newErrors.cantidadDias = 'Los días administrativos tienen un máximo de 6 días por año';
      }
      if (formData.cantidadDias > diasDisponibles.diasAdministrativos) {
        newErrors.cantidadDias = `Solo tienes ${diasDisponibles.diasAdministrativos} días administrativos disponibles`;
      }
    } else if (formData.tipoSolicitud === 'vacaciones') {
      if (formData.cantidadDias > diasDisponibles.vacaciones) {
        newErrors.cantidadDias = `Solo tienes ${diasDisponibles.vacaciones} días de vacaciones disponibles`;
      }
    }

    if (!formData.motivo || formData.motivo.trim().length < 10) {
      newErrors.motivo = 'El motivo debe tener al menos 10 caracteres';
    }

    if (!formData.telefonoContacto) {
      newErrors.telefonoContacto = 'El teléfono de contacto es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ======================================================
  // MANEJADORES
  // ======================================================

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
      // Simulación de envío (en producción: POST a /api/solicitudes/)
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('📝 Solicitud enviada:', formData);
      
      // TODO: En producción
      // const response = await fetch('/api/solicitudes/', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();

      setSubmitSuccess(true);
      
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

    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      setErrors({ submit: 'Error al enviar la solicitud. Por favor intente nuevamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ======================================================
  // RENDERIZADO
  // ======================================================

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
                          Usados: {USUARIO_ACTUAL.diasVacacionesUsados}
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
                          Usados: {USUARIO_ACTUAL.diasAdministrativosUsados}/6
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
                        <span className="text-base">ℹ️</span>
                        <span>
                          {formData.fechaInicio && formData.fechaTermino ? (
                            <>Basado en las fechas seleccionadas (excluye fines de semana)</>
                          ) : (
                            <>Selecciona las fechas o ajusta manualmente con el deslizador</>
                          )}
                        </span>
                      </div>
                    </div>

                    {errors.cantidadDias && (
                      <p className="text-sm text-red-600 mt-3 font-semibold">{errors.cantidadDias}</p>
                    )}
                  </div>

                  {/* TELÉFONO DE CONTACTO */}
                  <div>
                    <Label htmlFor="telefonoContacto" className="text-base font-semibold">
                      Teléfono de Contacto *
                    </Label>
                    <Input
                      id="telefonoContacto"
                      type="tel"
                      value={formData.telefonoContacto}
                      onChange={(e) => handleChange('telefonoContacto', e.target.value)}
                      placeholder="+56 9 XXXX XXXX"
                      className="mt-2"
                    />
                    {errors.telefonoContacto && (
                      <p className="text-sm text-red-600 mt-1">{errors.telefonoContacto}</p>
                    )}
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
                      placeholder="Describe brevemente el motivo de tu solicitud..."
                      rows={4}
                      maxLength={500}
                      className="mt-2"
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.motivo && (
                        <p className="text-sm text-red-600">{errors.motivo}</p>
                      )}
                      <p className="text-xs text-gray-500 ml-auto">
                        {formData.motivo.length}/500 caracteres
                      </p>
                    </div>
                  </div>

                  {/* ERROR DE SUBMIT */}
                  {errors.submit && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <p className="text-sm text-red-700">{errors.submit}</p>
                      </div>
                    </div>
                  )}

                  {/* BOTONES */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting || submitSuccess}
                      className="flex-1 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] hover:opacity-90 text-white font-semibold py-6 text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Enviar Solicitud
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* ======================================================
                COLUMNA DERECHA: INFORMACIÓN Y AYUDA
                ====================================================== */}
            <div className="space-y-6">
              
              {/* INFO: PROCESO DE APROBACIÓN */}
              <div className="bg-white shadow-lg rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  📋 Proceso de Aprobación
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Jefatura Directa</p>
                      <p className="text-xs text-gray-600">
                        Tu jefe directo revisa y aprueba/rechaza
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Dirección</p>
                      <p className="text-xs text-gray-600">
                        La dirección hace la aprobación final
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Documento PDF</p>
                      <p className="text-xs text-gray-600">
                        Descarga el documento oficial aprobado
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* INFO: RECORDATORIOS */}
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-yellow-900 mb-3">
                  💡 Recordatorios Importantes
                </h3>
                <ul className="space-y-2 text-sm text-yellow-800">
                  <li className="flex gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>Las solicitudes deben hacerse con al menos 15 días de anticipación</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>Días administrativos: máximo 6 días por año calendario</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>Recibirás notificación por correo en cada etapa</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>Puedes ver el estado de tus solicitudes en "Mis Solicitudes"</span>
                  </li>
                </ul>
              </div>

              {/* AYUDA */}
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  ❓ ¿Necesitas Ayuda?
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Si tienes dudas sobre el proceso o problemas técnicos, contacta a:
                </p>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-gray-900">
                    📧 recursoshumanos@cesfam.cl
                  </p>
                  <p className="font-semibold text-gray-900">
                    📞 +56 2 XXXX XXXX
                  </p>
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