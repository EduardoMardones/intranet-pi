// ======================================================
// PÁGINA ADMIN: Aprobar/Rechazar Solicitudes
// Ubicación: src/pages/admin/AprobacionesAdminPage.tsx
// Descripción: Panel para gestionar solicitudes pendientes
// ======================================================

'use client';

import React, { useState, useEffect } from 'react';
import { UnifiedNavbar } from '@/components/common/layout/UnifiedNavbar';
import Footer from '@/components/common/layout/Footer';
import BannerAprobaciones from '@/components/images/banners_finales/BannerAprobaciones';
import {
  CalendarDays,
  CheckCircle,
  XCircle,
  Clock,
  User,
  FileText,
  Download,
  Filter,
  AlertCircle,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/common/multiusos/textarea';
import { useAuth } from '@/api/contexts/AuthContext';
import { solicitudService } from '@/api';
import type { Solicitud, TipoSolicitud } from '@/api';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// ======================================================
// UTILIDADES
// ======================================================

const formatearFecha = (fecha: string): string => {
  return new Date(fecha).toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

const getTipoBadge = (tipo: TipoSolicitud) => {
  return tipo === 'vacaciones' ? (
    <Badge className="bg-blue-100 text-blue-800 border-blue-200 border">
      Vacaciones
    </Badge>
  ) : (
    <Badge className="bg-purple-100 text-purple-800 border-purple-200 border">
      Días Administrativos
    </Badge>
  );
};

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case 'pendiente_jefatura':
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 border flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Pendiente Jefatura
        </Badge>
      );
    case 'pendiente_direccion':
    case 'aprobada_jefatura':
      return (
        <Badge className="bg-orange-100 text-orange-800 border-orange-200 border flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Pendiente Dirección
        </Badge>
      );
    case 'aprobada':
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200 border flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Aprobada
        </Badge>
      );
    case 'rechazada_jefatura':
      return (
        <Badge className="bg-red-100 text-red-800 border-red-200 border flex items-center gap-1">
          <XCircle className="w-3 h-3" />
          Rechazada (Jefatura)
        </Badge>
      );
    case 'rechazada_direccion':
      return (
        <Badge className="bg-red-100 text-red-800 border-red-200 border flex items-center gap-1">
          <XCircle className="w-3 h-3" />
          Rechazada (Dirección)
        </Badge>
      );
    case 'cancelada':
      return (
        <Badge className="bg-gray-100 text-gray-800 border-gray-200 border flex items-center gap-1">
          <XCircle className="w-3 h-3" />
          Cancelada
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 border-gray-200 border flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {estado}
        </Badge>
      );
  }
};

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const AprobacionesAdminPage: React.FC = () => {
  const { user } = useAuth();

  // Estados
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [filteredSolicitudes, setFilteredSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  // Vista actual: 'pendientes' | 'mis_aprobaciones' | 'historial_completo'
  const [vistaActual, setVistaActual] = useState<'pendientes' | 'mis_aprobaciones' | 'historial_completo'>('pendientes');

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'aprobar' | 'rechazar'>('aprobar');
  const [selectedSolicitud, setSelectedSolicitud] = useState<Solicitud | null>(null);
  const [comentario, setComentario] = useState('');
  const [processing, setProcessing] = useState(false);

  // Filtros
  const [filtroTipo, setFiltroTipo] = useState<TipoSolicitud | 'TODOS'>('TODOS');
  const [filtroArea, setFiltroArea] = useState<string>('TODOS');

  // ======================================================
  // EFECTOS
  // ======================================================

  useEffect(() => {
    if (user?.id) {
      cargarSolicitudes();
    }
  }, [user, vistaActual]);

  useEffect(() => {
    aplicarFiltros();
  }, [solicitudes, filtroTipo, filtroArea]);

  // ======================================================
  // FUNCIONES
  // ======================================================

  const cargarSolicitudes = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError('');
      
      let data: Solicitud[];
      
      // Cargar según la vista actual
      if (vistaActual === 'pendientes') {
        data = await solicitudService.getPendientes();
      } else if (vistaActual === 'mis_aprobaciones') {
        data = await solicitudService.getMisAprobaciones();
      } else {
        data = await solicitudService.getHistorialCompleto();
      }
      
      // Para vista pendientes, aplicar filtros
      if (vistaActual === 'pendientes') {
        const isDireccion = user.rol_nombre && (
          user.rol_nombre.toLowerCase().includes('dirección') || 
          user.rol_nombre.toLowerCase().includes('direccion') ||
          user.rol_nombre.toLowerCase().includes('subdirección') ||
          user.rol_nombre.toLowerCase().includes('subdireccion')
        );

        let solicitudesFiltradas = data;
        
        if (isDireccion) {
          // Dirección/Subdirección solo ve solicitudes en estado pendiente_direccion
          solicitudesFiltradas = data.filter(s => 
          s.estado === 'pendiente_direccion' || s.estado === 'aprobada_jefatura'
        );
        } else {
          // Jefatura solo ve solicitudes en estado pendiente_jefatura de su área
          solicitudesFiltradas = data.filter(s => {
            // Si es jefe de área, solo ve solicitudes de su área
            if (user.es_jefe_de_area) {
              return s.estado === 'pendiente_jefatura' && s.usuario_area === user.area_nombre;
            }
            // Si no es jefe pero tiene permisos, ve todas las pendientes de jefatura
            return s.estado === 'pendiente_jefatura';
          });
        }
        
        // Ordenar por fecha de creación (más antigua primero)
        const ordenadas = solicitudesFiltradas.sort((a, b) => 
          new Date(a.creada_en).getTime() - new Date(b.creada_en).getTime()
        );
        setSolicitudes(ordenadas);
      } else {
        // Para vistas de historial, ordenar por fecha descendente (más reciente primero)
        const ordenadas = data.sort((a, b) => 
          new Date(b.creada_en).getTime() - new Date(a.creada_en).getTime()
        );
        setSolicitudes(ordenadas);
      }
    } catch (err: any) {
      console.error('Error al cargar solicitudes:', err);
      setError('No se pudieron cargar las solicitudes. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const aplicarFiltros = () => {
    let resultado = [...solicitudes];

    if (filtroTipo !== 'TODOS') {
      resultado = resultado.filter(s => s.tipo === filtroTipo);
    }

    if (filtroArea !== 'TODOS') {
      resultado = resultado.filter(s => s.usuario_area === filtroArea);
    }

    setFilteredSolicitudes(resultado);
  };

  const abrirModal = (solicitud: Solicitud, tipo: 'aprobar' | 'rechazar') => {
    setSelectedSolicitud(solicitud);
    setModalType(tipo);
    setComentario('');
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setSelectedSolicitud(null);
    setComentario('');
  };

  const handleAprobar = async () => {
    if (!selectedSolicitud || !user) return;

    setProcessing(true);

    try {
      await solicitudService.aprobar(
        selectedSolicitud.id, 
        {
          aprobar: true,
          comentarios: comentario.trim() || undefined
        },
        user.rol_nombre  // ✅ Pasar el rol para determinar el endpoint correcto
      );

      setSuccessMessage(`Solicitud de ${selectedSolicitud.usuario_nombre} aprobada exitosamente`);
      await cargarSolicitudes();
      cerrarModal();

      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err: any) {
      console.error('Error al aprobar solicitud:', err);
      const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Error al aprobar la solicitud';
      setError(errorMsg);
      setTimeout(() => setError(''), 5000);
    } finally {
      setProcessing(false);
    }
  };

  const handleRechazar = async () => {
    if (!selectedSolicitud || !user) return;

    if (!comentario.trim()) {
      setError('Debes proporcionar un motivo para rechazar la solicitud');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setProcessing(true);

    try {
      await solicitudService.rechazar(
        selectedSolicitud.id, 
        {
          comentarios: comentario.trim()
        },
        user.rol_nombre  // ✅ Pasar el rol para determinar el endpoint correcto
      );

      setSuccessMessage(`Solicitud de ${selectedSolicitud.usuario_nombre} rechazada`);
      await cargarSolicitudes();
      cerrarModal();

      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err: any) {
      console.error('Error al rechazar solicitud:', err);
      const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Error al rechazar la solicitud';
      setError(errorMsg);
      setTimeout(() => setError(''), 5000);
    } finally {
      setProcessing(false);
    }
  };

  // ======================================================
  // ÁREAS ÚNICAS (para filtro)
  // ======================================================

  const areasUnicas = Array.from(new Set(solicitudes.map(s => s.usuario_area)));

  // ======================================================
  // RENDER
  // ======================================================

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <UnifiedNavbar />
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <p className="text-gray-500">Debes iniciar sesión</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Verificar permisos
  if (!user.rol_puede_aprobar_solicitudes) {
    return (
      <div className="min-h-screen bg-gray-50">
        <UnifiedNavbar />
        <BannerAprobaciones></BannerAprobaciones>
        <div className="flex items-center justify-center h-[calc(100vh-300px)]">
          <Alert className="max-w-md bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              No tienes permisos para aprobar solicitudes.
            </AlertDescription>
          </Alert>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedNavbar />
      <div className="h-16" />
      <BannerAprobaciones></BannerAprobaciones>
      <div className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          {/* Header Container */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <div className="flex items-start gap-4">
              
              
              <div className="flex-1">
                
                <p className="text-sm text-gray-600 leading-relaxed">
                  Gestiona y aprueba solicitudes de vacaciones y días administrativos del personal del CESFAM.
                  Revisa los detalles y toma decisiones informadas sobre cada petición.
                </p>
              </div>
            </div>
          </div>

          {/* Mensajes */}
          {successMessage && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                {successMessage}
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="mb-6 bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Totales</p>
                  <p className="text-3xl font-bold text-gray-800">{solicitudes.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <CalendarDays className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Vacaciones</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {solicitudes.filter(s => s.tipo === 'vacaciones').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Días Admin.</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {solicitudes.filter(s => s.tipo === 'dia_administrativo').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de Vista */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-gray-700">Ver:</span>
              
              <Button
                onClick={() => setVistaActual('pendientes')}
                variant={vistaActual === 'pendientes' ? 'default' : 'outline'}
                className={vistaActual === 'pendientes' ? 'bg-[#009DDC] hover:bg-[#0088c4]' : ''}
              >
                <Clock className="w-4 h-4 mr-2" />
                Pendientes
              </Button>
              
              <Button
                onClick={() => setVistaActual('mis_aprobaciones')}
                variant={vistaActual === 'mis_aprobaciones' ? 'default' : 'outline'}
                className={vistaActual === 'mis_aprobaciones' ? 'bg-[#009DDC] hover:bg-[#0088c4]' : ''}
              >
                <User className="w-4 h-4 mr-2" />
                Mis Aprobaciones
              </Button>
              
              {user?.rol_nivel && user.rol_nivel >= 3 && (
                <Button
                  onClick={() => setVistaActual('historial_completo')}
                  variant={vistaActual === 'historial_completo' ? 'default' : 'outline'}
                  className={vistaActual === 'historial_completo' ? 'bg-[#009DDC] hover:bg-[#0088c4]' : ''}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Historial Completo
                </Button>
              )}
            </div>
          </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-semibold text-gray-700">Filtros:</span>
            </div>

            <Select value={filtroTipo} onValueChange={(value: any) => setFiltroTipo(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TODOS">Todos los tipos</SelectItem>
                <SelectItem value="VACACIONES">Vacaciones</SelectItem>
                <SelectItem value="ADMINISTRATIVO">Días Admin.</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filtroArea} onValueChange={setFiltroArea}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Área" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TODOS">Todas las áreas</SelectItem>
                {areasUnicas.map(area => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="ml-auto text-sm text-gray-500">
              {filteredSolicitudes.length} solicitud(es)
            </div>
          </div>
        </div>

        {/* Lista de solicitudes */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#52FFB8]"></div>
            <p className="text-gray-500 mt-4">Cargando solicitudes...</p>
          </div>
        ) : filteredSolicitudes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {solicitudes.length === 0 
                ? (user && (user.rol_nombre.toLowerCase().includes('dirección') || user.rol_nombre.toLowerCase().includes('direccion'))
                    ? 'No hay solicitudes pendientes de aprobación por dirección'
                    : 'No hay solicitudes pendientes de aprobación por jefatura')
                : 'No hay solicitudes que coincidan con los filtros'}
            </p>
            {solicitudes.length === 0 && user && !user.rol_nombre.toLowerCase().includes('dirección') && !user.rol_nombre.toLowerCase().includes('direccion') && (
              <p className="text-sm text-gray-400 mt-2">
                Las solicitudes aparecerán aquí cuando estén en estado <strong>pendiente_jefatura</strong>
              </p>
            )}
            {solicitudes.length === 0 && user && (user.rol_nombre.toLowerCase().includes('dirección') || user.rol_nombre.toLowerCase().includes('direccion')) && (
              <p className="text-sm text-gray-400 mt-2">
                Las solicitudes aparecerán aquí cuando ya hayan sido aprobadas por jefatura
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSolicitudes.map((solicitud) => (
              <div key={solicitud.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${
                      solicitud.tipo === 'vacaciones' ? 'bg-blue-50' : 'bg-purple-50'
                    }`}>
                      <CalendarDays className={`w-6 h-6 ${
                        solicitud.tipo === 'vacaciones' ? 'text-blue-500' : 'text-purple-500'
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {getTipoBadge(solicitud.tipo)}
                        {getEstadoBadge(solicitud.estado)}
                      </div>
                      <p className="text-sm text-gray-500">
                        Solicitado el {formatearFecha(solicitud.creada_en)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Información del solicitante */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-gray-400" />
                    <p className="text-xs text-gray-500 font-semibold">SOLICITANTE</p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Nombre</p>
                      <p className="font-semibold text-gray-800">{solicitud.usuario_nombre}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Cargo</p>
                      <p className="font-semibold text-gray-800">{solicitud.usuario_cargo}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Área</p>
                      <p className="font-semibold text-gray-800">{solicitud.usuario_area}</p>
                    </div>
                  </div>
                </div>

                {/* Detalles de la solicitud */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Período Solicitado</p>
                      <p className="font-semibold text-gray-800">
                        {formatearFecha(solicitud.fecha_inicio)}
                      </p>
                      <p className="font-semibold text-gray-800">
                        hasta {formatearFecha(solicitud.fecha_termino)}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {solicitud.cantidad_dias} día(s) hábil(es)
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">Motivo</p>
                      <p className="text-sm text-gray-700">{solicitud.motivo}</p>
                    </div>
                  </div>
                </div>

                {/* Aprobadores */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-gray-400" />
                    <p className="text-xs text-gray-500 font-semibold">APROBACIONES</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    {/* Aprobador Jefatura */}
                    <div>
                      <p className="text-gray-500">Aprobación Jefatura</p>
                      {solicitud.jefatura_aprobador_nombre ? (
                        <>
                          <p className="font-semibold text-gray-800">{solicitud.jefatura_aprobador_nombre}</p>
                          {solicitud.jefatura_fecha_aprobacion && (
                            <p className="text-xs text-gray-500">
                              {formatearFecha(solicitud.jefatura_fecha_aprobacion)}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="font-semibold text-gray-500 italic">Pendiente</p>
                      )}
                    </div>

                    {/* Aprobador Dirección */}
                    <div>
                      <p className="text-gray-500">Aprobación Dirección</p>
                      {solicitud.direccion_aprobador_nombre ? (
                        <>
                          <p className="font-semibold text-gray-800">{solicitud.direccion_aprobador_nombre}</p>
                          {solicitud.direccion_fecha_aprobacion && (
                            <p className="text-xs text-gray-500">
                              {formatearFecha(solicitud.direccion_fecha_aprobacion)}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="font-semibold text-gray-500 italic">Pendiente</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* PDF generado */}
                {solicitud.pdf_generado && solicitud.url_pdf && (
                  <div className="mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(solicitud.url_pdf, '_blank')}
                      className="text-[#52FFB8] hover:bg-[#52FFB8] hover:text-gray-900"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Ver PDF de solicitud
                    </Button>
                  </div>
                )}

                {/* Acciones - Solo en vista pendientes */}
                {vistaActual === 'pendientes' && (
                  <div className="flex gap-3 pt-4 border-t">
                    <Button
                      onClick={() => abrirModal(solicitud, 'aprobar')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Aprobar
                    </Button>

                    <Button
                      onClick={() => abrirModal(solicitud, 'rechazar')}
                      variant="outline"
                      className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Rechazar
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      {/* Modal de confirmación */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modalType === 'aprobar' ? 'Aprobar Solicitud' : 'Rechazar Solicitud'}
            </DialogTitle>
            <DialogDescription>
              {selectedSolicitud && (
                <>
                  Solicitud de <strong>{selectedSolicitud.usuario_nombre}</strong>
                  <br />
                  {selectedSolicitud.tipo === 'vacaciones' ? 'Vacaciones' : 'Días Administrativos'}
                  {' '}del {formatearFecha(selectedSolicitud.fecha_inicio)} al{' '}
                  {formatearFecha(selectedSolicitud.fecha_termino)}
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Label className="text-gray-700 font-semibold mb-2 block">
              Comentario {modalType === 'rechazar' ? '(Obligatorio)' : '(Opcional)'}
            </Label>
            <Textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder={
                modalType === 'aprobar'
                  ? 'Agrega un comentario adicional (opcional)'
                  : 'Explica el motivo del rechazo'
              }
              rows={4}
              className={modalType === 'rechazar' && !comentario.trim() ? 'border-red-500' : ''}
            />
            {modalType === 'rechazar' && !comentario.trim() && (
              <p className="text-xs text-red-500 mt-1">
                Debes proporcionar un motivo para rechazar
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={cerrarModal}
              disabled={processing}
            >
              Cancelar
            </Button>

            <Button
              onClick={modalType === 'aprobar' ? handleAprobar : handleRechazar}
              disabled={processing || (modalType === 'rechazar' && !comentario.trim())}
              className={
                modalType === 'aprobar'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              }
            >
              {processing ? (
                'Procesando...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {modalType === 'aprobar' ? 'Aprobar' : 'Rechazar'}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AprobacionesAdminPage;