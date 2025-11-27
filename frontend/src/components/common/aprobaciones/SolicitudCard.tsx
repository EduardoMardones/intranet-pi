// ======================================================
// COMPONENTE: Tarjeta de Solicitud
// Ubicación: src/components/common/aprobaciones/SolicitudCard.tsx
// Descripción: Card individual para cada solicitud de vacaciones/días administrativos
// ======================================================

import React, { useState } from 'react';
import { 
  Calendar, 
  User, 
  Briefcase, 
  Mail, 
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  FileText,
  FileDown
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { SolicitudVacaciones } from '@/types/solicitud';
import { ESTADO_CONFIG, TIPO_SOLICITUD_CONFIG } from '@/types/solicitud';
import { solicitudService } from '@/api/services/solicitudService';

interface SolicitudCardProps {
  solicitud: SolicitudVacaciones;
  onAprobar: (id: string, comentarios?: string) => void;
  onRechazar: (id: string, comentarios?: string) => void;
  userRole: 'admin' | 'jefatura';
}

export const SolicitudCard: React.FC<SolicitudCardProps> = ({
  solicitud,
  onAprobar,
  onRechazar,
  userRole
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<'aprobar' | 'rechazar'>('aprobar');
  const [comentarios, setComentarios] = useState('');
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  const estadoConfig = ESTADO_CONFIG[solicitud.estado];
  const tipoConfig = TIPO_SOLICITUD_CONFIG[solicitud.tipo];

  // Determinar si el usuario puede aprobar/rechazar esta solicitud
  const puedeActuar = () => {
    if (userRole === 'admin') {
      return solicitud.estado === 'pendiente_administracion' || 
             solicitud.estado === 'aprobada_jefatura';
    }
    if (userRole === 'jefatura') {
      return solicitud.estado === 'pendiente_jefatura';
    }
    return false;
  };

  const handleAction = (action: 'aprobar' | 'rechazar') => {
    setModalAction(action);
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    if (modalAction === 'aprobar') {
      onAprobar(solicitud.id, comentarios);
    } else {
      onRechazar(solicitud.id, comentarios);
    }
    setShowModal(false);
    setComentarios('');
  };

  const handleDescargarPDF = async () => {
    try {
      setDownloadingPDF(true);
      
      // Descargar el PDF
      const pdfBlob = await solicitudService.descargarPDF(solicitud.id);
      
      // Crear URL temporal para el blob
      const url = window.URL.createObjectURL(pdfBlob);
      
      // Crear elemento <a> temporal para descargar
      const link = document.createElement('a');
      link.href = url;
      link.download = `solicitud_${solicitud.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Limpiar
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar PDF:', error);
      // Descarga silenciosa - sin alert
    } finally {
      setDownloadingPDF(false);
    }
  };

  const formatearFecha = (fecha: Date) => {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                   'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    
    const d = new Date(fecha);
    const dia = d.getDate();
    const mes = meses[d.getMonth()];
    const año = d.getFullYear();
    
    return `${dia} de ${mes}, ${año}`;
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {solicitud.usuario.nombre} {solicitud.usuario.apellidos}
                </h3>
                <Badge className={tipoConfig.badge}>
                  {tipoConfig.icon} {tipoConfig.label}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{solicitud.usuario.rut}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>{solicitud.usuario.cargo} - {solicitud.usuario.area}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{solicitud.usuario.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Solicitado: {formatearFecha(solicitud.fechaSolicitud)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <Badge className={estadoConfig.badge}>
                {estadoConfig.icon} {estadoConfig.label}
              </Badge>
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                {expanded ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Información principal */}
        <div className="p-4 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Fecha de Inicio</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <p className="text-sm font-semibold text-gray-900">
                  {formatearFecha(solicitud.fechaInicio)}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Fecha de Término</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <p className="text-sm font-semibold text-gray-900">
                  {formatearFecha(solicitud.fechaTermino)}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Días Solicitados</p>
              <p className="text-2xl font-bold text-blue-600">
                {solicitud.diasSolicitados}
              </p>
            </div>
          </div>

          {solicitud.motivo && (
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-1">Motivo</p>
              <p className="text-sm text-gray-700 bg-white p-3 rounded border border-gray-200">
                {solicitud.motivo}
              </p>
            </div>
          )}
        </div>

        {/* Detalles expandidos */}
        {expanded && (
          <div className="p-4 border-t border-gray-200 space-y-4">
            {/* Información de días */}
            {solicitud.diasDisponibles !== undefined && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Estado de Días
                </h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-600">Disponibles</p>
                    <p className="text-lg font-bold text-blue-600">
                      {solicitud.diasDisponibles}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Usados</p>
                    <p className="text-lg font-bold text-gray-600">
                      {solicitud.diasUsados}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Después de aprobación</p>
                    <p className="text-lg font-bold text-orange-600">
                      {(solicitud.diasDisponibles || 0) - solicitud.diasSolicitados}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Historial de aprobaciones */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-900">
                Historial de Aprobaciones
              </h4>
              
              {/* Aprobación Jefatura */}
              {solicitud.aprobacionJefatura ? (
                <div className={`p-3 rounded-lg border ${
                  solicitud.aprobacionJefatura.accion === 'aprobada' 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-start gap-2">
                    {solicitud.aprobacionJefatura.accion === 'aprobada' ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        Jefatura - {solicitud.aprobacionJefatura.nombreAprobador}
                      </p>
                      <p className="text-xs text-gray-600">
                        {formatearFecha(solicitud.aprobacionJefatura.fecha)}
                      </p>
                      {solicitud.aprobacionJefatura.comentarios && (
                        <p className="text-sm text-gray-700 mt-2">
                          "{solicitud.aprobacionJefatura.comentarios}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-lg border border-yellow-200 bg-yellow-50">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <p className="text-sm text-gray-700">
                      Pendiente de aprobación por jefatura
                    </p>
                  </div>
                </div>
              )}

              {/* Aprobación Administración */}
              {solicitud.aprobacionAdministracion ? (
                <div className={`p-3 rounded-lg border ${
                  solicitud.aprobacionAdministracion.accion === 'aprobada' 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-start gap-2">
                    {solicitud.aprobacionAdministracion.accion === 'aprobada' ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        Administración - {solicitud.aprobacionAdministracion.nombreAprobador}
                      </p>
                      <p className="text-xs text-gray-600">
                        {formatearFecha(solicitud.aprobacionAdministracion.fecha)}
                      </p>
                      {solicitud.aprobacionAdministracion.comentarios && (
                        <p className="text-sm text-gray-700 mt-2">
                          "{solicitud.aprobacionAdministracion.comentarios}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : solicitud.aprobacionJefatura?.accion === 'aprobada' ? (
                <div className="p-3 rounded-lg border border-orange-200 bg-orange-50">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <p className="text-sm text-gray-700">
                      Pendiente de aprobación por administración
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {/* Botones de acción */}
        {puedeActuar() && (
          <div className="p-4 bg-gray-50 border-t border-gray-200 flex gap-3">
            <Button
              onClick={() => handleAction('rechazar')}
              variant="outline"
              className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Rechazar
            </Button>
            <Button
              onClick={() => handleAction('aprobar')}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Aprobar
            </Button>
          </div>
        )}

        {/* Botón de descarga de PDF para solicitudes aprobadas */}
        {solicitud.estado === 'aprobada' && (
          <div className="p-4 bg-green-50 border-t border-green-200 flex gap-3">
            <Button
              onClick={handleDescargarPDF}
              disabled={downloadingPDF}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <FileDown className="h-4 w-4 mr-2" />
              {downloadingPDF ? 'Descargando...' : 'Descargar Solicitud en PDF'}
            </Button>
          </div>
        )}
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {modalAction === 'aprobar' ? 'Aprobar Solicitud' : 'Rechazar Solicitud'}
            </h3>
            
            <p className="text-sm text-gray-600 mb-4">
              {modalAction === 'aprobar' 
                ? '¿Estás seguro de aprobar esta solicitud?' 
                : '¿Estás seguro de rechazar esta solicitud?'}
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentarios {modalAction === 'rechazar' && '(requerido)'}
              </label>
              <textarea
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Agrega un comentario..."
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setShowModal(false);
                  setComentarios('');
                }}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleConfirmAction}
                disabled={modalAction === 'rechazar' && !comentarios.trim()}
                className={`flex-1 ${
                  modalAction === 'aprobar' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                } text-white`}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};