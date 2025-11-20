// ======================================================
// PÁGINA: Gestión de Aprobaciones de Vacaciones y Días Administrativos
// Ubicación: src/pages/admin/AprobacionesAdminPage.tsx
// Descripción: Sistema de aprobación dual (jefatura + administración)
// ======================================================

import React, { useState, useMemo } from 'react';
import { NavbarAdmin } from '@/components/common/layout/NavbarAdmin';
import Footer from '@/components/common/layout/Footer';
import Banner from '@/components/common/layout/Banner';
import { SolicitudCard } from '@/components/common/aprobaciones/SolicitudCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Filter,
  Search,
  TrendingUp,
  Users,
  Calendar,
  FileText,
  Download
} from 'lucide-react';
import type{ 
  SolicitudVacaciones, 
  EstadoSolicitud,
  TipoSolicitud,
  ESTADO_CONFIG 
} from '@/types/solicitud';
import { 
  mockSolicitudes, 
  filtrarSolicitudesPorRol,
  obtenerSolicitudesPendientes 
} from '@/data/mockSolicitudes';
import bannerSolicitudes from "@/components/images/banner_images/BannerSolicitudes.png";

// ======================================================
// INTERFAZ DE PROPS Y TIPOS
// ======================================================

type VistaActual = 'pendientes' | 'aprobadas' | 'rechazadas' | 'todas';

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const AprobacionesAdminPage: React.FC = () => {
  // ======================================================
  // ESTADOS
  // ======================================================

  // Simulación de rol de usuario (en producción vendría del contexto de autenticación)
  const [userRole] = useState<'admin' | 'jefatura'>('admin'); // Cambiar a 'jefatura' para probar ese rol
  const [userArea] = useState<string>('Enfermería'); // Área del usuario si es jefatura

  const [solicitudes, setSolicitudes] = useState<SolicitudVacaciones[]>(mockSolicitudes);
  const [vistaActual, setVistaActual] = useState<VistaActual>('pendientes');
  const [filtroTipo, setFiltroTipo] = useState<TipoSolicitud | 'todas'>('todas');
  const [filtroArea, setFiltroArea] = useState<string>('todas');
  const [busqueda, setBusqueda] = useState<string>('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // ======================================================
  // DATOS FILTRADOS
  // ======================================================

  // Filtrar solicitudes según rol del usuario
  const solicitudesPorRol = useMemo(() => {
    return filtrarSolicitudesPorRol(solicitudes, userRole, userArea);
  }, [solicitudes, userRole, userArea]);

  // Obtener áreas únicas para el filtro
  const areasDisponibles = useMemo(() => {
    const areas = new Set(solicitudesPorRol.map(s => s.usuario.area));
    return Array.from(areas).sort();
  }, [solicitudesPorRol]);

  // Aplicar filtros
  const solicitudesFiltradas = useMemo(() => {
    let resultado = [...solicitudesPorRol];

    // Filtrar por vista actual
    switch (vistaActual) {
      case 'pendientes':
        resultado = obtenerSolicitudesPendientes(resultado, userRole);
        break;
      case 'aprobadas':
        resultado = resultado.filter(s => s.estado === 'aprobada');
        break;
      case 'rechazadas':
        resultado = resultado.filter(s => 
          s.estado === 'rechazada_jefatura' || 
          s.estado === 'rechazada_administracion'
        );
        break;
      // 'todas' no filtra
    }

    // Filtrar por tipo
    if (filtroTipo !== 'todas') {
      resultado = resultado.filter(s => s.tipo === filtroTipo);
    }

    // Filtrar por área
    if (filtroArea !== 'todas') {
      resultado = resultado.filter(s => s.usuario.area === filtroArea);
    }

    // Filtrar por búsqueda
    if (busqueda.trim()) {
      const termino = busqueda.toLowerCase();
      resultado = resultado.filter(s => 
        s.usuario.nombre.toLowerCase().includes(termino) ||
        s.usuario.apellidos.toLowerCase().includes(termino) ||
        s.usuario.rut.includes(termino) ||
        s.usuario.area.toLowerCase().includes(termino)
      );
    }

    // Ordenar por fecha de solicitud (más recientes primero)
    resultado.sort((a, b) => 
      new Date(b.fechaSolicitud).getTime() - new Date(a.fechaSolicitud).getTime()
    );

    return resultado;
  }, [solicitudesPorRol, vistaActual, filtroTipo, filtroArea, busqueda, userRole]);

  // ======================================================
  // ESTADÍSTICAS
  // ======================================================

  const estadisticas = useMemo(() => {
    const pendientes = obtenerSolicitudesPendientes(solicitudesPorRol, userRole);
    
    return {
      total: solicitudesPorRol.length,
      pendientes: pendientes.length,
      aprobadas: solicitudesPorRol.filter(s => s.estado === 'aprobada').length,
      rechazadas: solicitudesPorRol.filter(s => 
        s.estado === 'rechazada_jefatura' || 
        s.estado === 'rechazada_administracion'
      ).length,
      porArea: areasDisponibles.reduce((acc, area) => {
        acc[area] = solicitudesPorRol.filter(s => s.usuario.area === area).length;
        return acc;
      }, {} as Record<string, number>)
    };
  }, [solicitudesPorRol, userRole, areasDisponibles]);

  // ======================================================
  // MANEJADORES DE EVENTOS
  // ======================================================

  const handleAprobar = (id: string, comentarios?: string) => {
    setSolicitudes(prev => prev.map(s => {
      if (s.id === id) {
        const nuevoEstado: EstadoSolicitud = 
          userRole === 'jefatura' 
            ? 'aprobada_jefatura' 
            : 'aprobada';

        const aprobacion = {
          nivel: userRole === 'jefatura' ? 'jefatura' as const : 'administracion' as const,
          aprobadoPor: 'user123', // En producción vendría del contexto
          nombreAprobador: userRole === 'admin' ? 'Director Juan Valenzuela' : 'Jefe de Área',
          fecha: new Date(),
          comentarios: comentarios || '',
          accion: 'aprobada' as const
        };

        return {
          ...s,
          estado: nuevoEstado,
          ...(userRole === 'jefatura' 
            ? { aprobacionJefatura: aprobacion }
            : { aprobacionAdministracion: aprobacion }
          ),
          updatedAt: new Date()
        };
      }
      return s;
    }));

    // Aquí iría la llamada a la API en producción
    console.log(`Solicitud ${id} aprobada por ${userRole}`, comentarios);
  };

  const handleRechazar = (id: string, comentarios?: string) => {
    setSolicitudes(prev => prev.map(s => {
      if (s.id === id) {
        const nuevoEstado: EstadoSolicitud = 
          userRole === 'jefatura' 
            ? 'rechazada_jefatura' 
            : 'rechazada_administracion';

        const aprobacion = {
          nivel: userRole === 'jefatura' ? 'jefatura' as const : 'administracion' as const,
          aprobadoPor: 'user123',
          nombreAprobador: userRole === 'admin' ? 'Director Juan Valenzuela' : 'Jefe de Área',
          fecha: new Date(),
          comentarios: comentarios || '',
          accion: 'rechazada' as const
        };

        return {
          ...s,
          estado: nuevoEstado,
          ...(userRole === 'jefatura' 
            ? { aprobacionJefatura: aprobacion }
            : { aprobacionAdministracion: aprobacion }
          ),
          updatedAt: new Date()
        };
      }
      return s;
    }));

    console.log(`Solicitud ${id} rechazada por ${userRole}`, comentarios);
  };

  const handleExportar = () => {
    // En producción: generar archivo Excel o PDF con las solicitudes filtradas
    console.log('Exportando solicitudes:', solicitudesFiltradas);
    alert('Función de exportación en desarrollo');
  };

  // ======================================================
  // RENDERIZADO
  // ======================================================

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavbarAdmin />
      <Banner 
        title="" 
        subtitle={
          userRole === 'admin' 
            ? "" 
            : ``
        }
        imageSrc={bannerSolicitudes}
      />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Badge de Rol */}
        <div className="mb-6">
          <Badge className={
            userRole === 'admin' 
              ? 'bg-purple-100 text-purple-700 border-purple-300 text-sm px-4 py-2'
              : 'bg-blue-100 text-blue-700 border-blue-300 text-sm px-4 py-2'
          }>
            {userRole === 'admin' ? '👔 Rol: Administrador' : '📋 Rol: Jefatura'}
            {userRole === 'jefatura' && ` - ${userArea}`}
          </Badge>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Solicitudes</p>
                <p className="text-3xl font-bold text-gray-900">{estadisticas.total}</p>
              </div>
              <FileText className="h-10 w-10 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-yellow-200 bg-yellow-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pendientes</p>
                <p className="text-3xl font-bold text-yellow-600">{estadisticas.pendientes}</p>
              </div>
              <Clock className="h-10 w-10 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-green-200 bg-green-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Aprobadas</p>
                <p className="text-3xl font-bold text-green-600">{estadisticas.aprobadas}</p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-red-200 bg-red-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Rechazadas</p>
                <p className="text-3xl font-bold text-red-600">{estadisticas.rechazadas}</p>
              </div>
              <XCircle className="h-10 w-10 text-red-500" />
            </div>
          </div>
        </div>

        {/* Pestañas de Vista */}
        <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-200">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setVistaActual('pendientes')}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                vistaActual === 'pendientes'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Pendientes</span>
                <Badge className="bg-yellow-100 text-yellow-700">
                  {estadisticas.pendientes}
                </Badge>
              </div>
            </button>

            <button
              onClick={() => setVistaActual('aprobadas')}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                vistaActual === 'aprobadas'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Aprobadas</span>
                <Badge className="bg-green-100 text-green-700">
                  {estadisticas.aprobadas}
                </Badge>
              </div>
            </button>

            <button
              onClick={() => setVistaActual('rechazadas')}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                vistaActual === 'rechazadas'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                <span>Rechazadas</span>
                <Badge className="bg-red-100 text-red-700">
                  {estadisticas.rechazadas}
                </Badge>
              </div>
            </button>

            <button
              onClick={() => setVistaActual('todas')}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                vistaActual === 'todas'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Todas</span>
                <Badge className="bg-gray-100 text-gray-700">
                  {estadisticas.total}
                </Badge>
              </div>
            </button>
          </div>

          {/* Barra de Búsqueda y Filtros */}
          <div className="p-4 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Búsqueda */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, RUT o área..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Botones de acción */}
              <div className="flex gap-2">
                <Button
                  onClick={() => setMostrarFiltros(!mostrarFiltros)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filtros
                </Button>
                <Button
                  onClick={handleExportar}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </div>

            {/* Panel de Filtros */}
            {mostrarFiltros && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                {/* Filtro por tipo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Solicitud
                  </label>
                  <select
                    value={filtroTipo}
                    onChange={(e) => setFiltroTipo(e.target.value as TipoSolicitud | 'todas')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="todas">Todas</option>
                    <option value="vacaciones">Vacaciones</option>
                    <option value="dia_administrativo">Días Administrativos</option>
                  </select>
                </div>

                {/* Filtro por área (solo para admin) */}
                {userRole === 'admin' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Área
                    </label>
                    <select
                      value={filtroArea}
                      onChange={(e) => setFiltroArea(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="todas">Todas las áreas</option>
                      {areasDisponibles.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Lista de Solicitudes */}
        <div className="space-y-4">
          {solicitudesFiltradas.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No hay solicitudes
              </h3>
              <p className="text-gray-600">
                No se encontraron solicitudes con los filtros seleccionados
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Mostrando <span className="font-semibold">{solicitudesFiltradas.length}</span> solicitud(es)
                </p>
              </div>

              {solicitudesFiltradas.map(solicitud => (
                <SolicitudCard
                  key={solicitud.id}
                  solicitud={solicitud}
                  onAprobar={handleAprobar}
                  onRechazar={handleRechazar}
                  userRole={userRole}
                />
              ))}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AprobacionesAdminPage;