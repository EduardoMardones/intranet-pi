// ======================================================
// COMPONENTE: VacacionesTable - Estilo ArchivosPage
// Ubicación: src/components/common/vacaciones/VacacionesTable.tsx
// Descripción: Tabla de solicitudes con estilo moderno
// ======================================================

import { useState, useMemo, useEffect } from 'react';
import { StateColorButton } from './StateColorButton';
import PDFDownload from '../buttons/PDFDownload';
import VerSolicitud from '../buttons/VerSolicitud';
import { Search, Filter, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
// ✅ NUEVO: Imports del backend
import { solicitudService } from '@/api';
import type { Solicitud, EstadoSolicitud, TipoSolicitud } from '@/api';

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export function VacacionesTable() {
  // ✅ NUEVO: Estado para solicitudes del backend
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');

  // ✅ NUEVO: Cargar solicitudes desde el backend
  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const cargarSolicitudes = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await solicitudService.getMisSolicitudes();
      // Ordenar por fecha de creación (más reciente primero)
      const ordenadas = data.sort((a, b) => 
        new Date(b.creada_en).getTime() - new Date(a.creada_en).getTime()
      );
      setSolicitudes(ordenadas);
    } catch (err) {
      console.error('Error al cargar solicitudes:', err);
      setError('No se pudieron cargar las solicitudes');
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // FILTROS
  // ======================================================

  const solicitudesFiltradas = useMemo(() => {
    return solicitudes.filter(sol => {
      const cumpleBusqueda = 
        sol.id.toLowerCase().includes(busqueda.toLowerCase()) ||
        sol.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
        (sol.aprobador_nombre && sol.aprobador_nombre.toLowerCase().includes(busqueda.toLowerCase()));
      
      const cumpleTipo = filtroTipo === 'todos' || sol.tipo === filtroTipo;
      const cumpleEstado = filtroEstado === 'todos' || sol.estado === filtroEstado;
      
      return cumpleBusqueda && cumpleTipo && cumpleEstado;
    });
  }, [solicitudes, busqueda, filtroTipo, filtroEstado]);

  // ======================================================
  // HELPERS
  // ======================================================

  const getBadgeTipo = (tipo: TipoSolicitud) => {
    return tipo === 'vacaciones' 
      ? 'bg-blue-100 text-blue-700 border-blue-300'
      : 'bg-purple-100 text-purple-700 border-purple-300';
  };

  const formatearFecha = (fecha: string): string => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatearPeriodo = (inicio: string, fin: string): string => {
    return `${formatearFecha(inicio)} - ${formatearFecha(fin)}`;
  };

  // Mapear estados del backend a los del componente
  const mapearEstado = (estado: EstadoSolicitud): string => {
    const mapeo: Record<EstadoSolicitud, string> = {
      'pendiente_jefatura': 'Pendiente',
      'aprobada_jefatura': 'Aprobado Jefatura',
      'rechazada_jefatura': 'Rechazado',
      'pendiente_direccion': 'Pendiente Dirección',
      'aprobada': 'Aprobado',
      'rechazada_direccion': 'Rechazado',
      'cancelada': 'Cancelado'
    };
    return mapeo[estado] || estado;
  };

  // Mapear tipo del backend a los del componente
  const mapearTipo = (tipo: TipoSolicitud): string => {
    return tipo === 'vacaciones' ? 'Vacaciones' : 'Días Admin.';
  };

  // ======================================================
  // RENDERIZADO
  // ======================================================

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-500">Cargando solicitudes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-red-200 p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <FileText className="h-12 w-12 text-red-300 mb-4" />
          <p className="text-red-600 font-semibold mb-2">Error al cargar solicitudes</p>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={cargarSolicitudes}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Barra de búsqueda y filtros */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por ID, tipo o jefatura..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filtros */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todos">Todos los tipos</option>
              <option value="VACACIONES">Vacaciones</option>
              <option value="ADMINISTRATIVO">Días Administrativos</option>
            </select>

            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todos">Todos los estados</option>
              <option value="PENDIENTE">Pendiente</option>
              <option value="APROBADA">Aprobado</option>
              <option value="RECHAZADA">Rechazado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Periodo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Días
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jefatura
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dirección
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Solicitud
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {solicitudesFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <p>No se encontraron solicitudes</p>
                  </td>
                </tr>
              ) : (
                solicitudesFiltradas.map((sol) => (
                  <tr key={sol.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {sol.id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getBadgeTipo(sol.tipo)}>
                        {mapearTipo(sol.tipo)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatearPeriodo(sol.fecha_inicio, sol.fecha_termino)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {sol.cantidad_dias} días
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StateColorButton estado={mapearEstado(sol.estado)} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sol.aprobador_nombre || 'Pendiente'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sol.usuario_area}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatearFecha(sol.creada_en)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {/* Ver solicitud - TODO: Implementar modal */}}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Ver detalles"
                        >
                          <VerSolicitud id={sol.id} />
                        </button>
                        {sol.estado === 'aprobada' && sol.url_pdf && (
                          <button
                            onClick={() => window.open(sol.url_pdf, '_blank')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Descargar archivo"
                          >
                            <PDFDownload fileName={`${sol.id}.pdf`} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Información de resultados */}
      <div className="text-sm text-gray-600">
        Mostrando {solicitudesFiltradas.length} de {solicitudes.length} solicitud(es)
      </div>
    </div>
  );
}

export default VacacionesTable;