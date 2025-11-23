// ======================================================
// COMPONENTE: VacacionesTable - Estilo ArchivosPage
// Ubicación: src/components/common/vacaciones/VacacionesTable.tsx
// Descripción: Tabla de solicitudes con estilo moderno
// ======================================================

import React, { useState, useMemo } from 'react';
import { StateColorButton } from './StateColorButton';
import PDFDownload from '../buttons/PDFDownload';
import VerSolicitud from '../buttons/VerSolicitud';
import { Search, Filter, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// ======================================================
// TIPOS
// ======================================================

interface Solicitud {
  ID: string;
  Tipo: string;
  Periodo: string;
  Días: number;
  EstadoGeneral: string;
  Jefatura: string;
  Dirección: string;
  FechaSolicitud: string;
}

// ======================================================
// DATOS MOCK
// ======================================================

const generarSolicitudesMock = (): Solicitud[] => {
  const solicitudes: Solicitud[] = [
    {
      ID: "VAC001",
      Tipo: "Vacaciones",
      Periodo: "22/10/2025 - 25/10/2025",
      Días: 4,
      EstadoGeneral: "Aprobado",
      Jefatura: "María Torres",
      Dirección: "Recursos Humanos",
      FechaSolicitud: "15/10/2025"
    },
    {
      ID: "VAC002",
      Tipo: "Vacaciones",
      Periodo: "05/11/2025 - 09/11/2025",
      Días: 5,
      EstadoGeneral: "Pendiente",
      Jefatura: "Carlos Rivas",
      Dirección: "Finanzas",
      FechaSolicitud: "01/11/2025"
    },
    {
      ID: "VAC003",
      Tipo: "Días Admin.",
      Periodo: "10/12/2025 - 12/12/2025",
      Días: 3,
      EstadoGeneral: "Rechazado",
      Jefatura: "Laura Pino",
      Dirección: "Operaciones",
      FechaSolicitud: "09/12/2025"
    }
  ];

  // Generar 12 solicitudes adicionales
  const estados = ["Aprobado", "Pendiente", "Rechazado"];
  
  for (let i = 0; i < 12; i++) {
    const id = `VAC${(i + 4).toString().padStart(3, "0")}`;
    const dias = Math.floor(Math.random() * 5) + 3;
    const startDate = new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 25) + 1);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + dias);
    
    const formatDate = (d: Date) => 
      `${d.getDate().toString().padStart(2,"0")}/${(d.getMonth()+1).toString().padStart(2,"0")}/${d.getFullYear()}`;
    
    solicitudes.push({
      ID: id,
      Tipo: Math.random() > 0.5 ? "Vacaciones" : "Días Admin.",
      Periodo: `${formatDate(startDate)} - ${formatDate(endDate)}`,
      Días: dias,
      EstadoGeneral: estados[Math.floor(Math.random() * estados.length)],
      Jefatura: `Jefatura ${i + 1}`,
      Dirección: `Departamento ${i + 1}`,
      FechaSolicitud: formatDate(new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 25) + 1))
    });
  }

  return solicitudes;
};

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export function VacacionesTable() {
  const [solicitudes] = useState<Solicitud[]>(generarSolicitudesMock());
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');

  // ======================================================
  // FILTROS
  // ======================================================

  const solicitudesFiltradas = useMemo(() => {
    return solicitudes.filter(sol => {
      const cumpleBusqueda = 
        sol.ID.toLowerCase().includes(busqueda.toLowerCase()) ||
        sol.Tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
        sol.Jefatura.toLowerCase().includes(busqueda.toLowerCase());
      
      const cumpleTipo = filtroTipo === 'todos' || sol.Tipo === filtroTipo;
      const cumpleEstado = filtroEstado === 'todos' || sol.EstadoGeneral === filtroEstado;
      
      return cumpleBusqueda && cumpleTipo && cumpleEstado;
    });
  }, [solicitudes, busqueda, filtroTipo, filtroEstado]);

  // ======================================================
  // HELPERS
  // ======================================================

  const getBadgeTipo = (tipo: string) => {
    return tipo === 'Vacaciones' 
      ? 'bg-blue-100 text-blue-700 border-blue-300'
      : 'bg-purple-100 text-purple-700 border-purple-300';
  };

  // ======================================================
  // RENDERIZADO
  // ======================================================

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
              <option value="Vacaciones">Vacaciones</option>
              <option value="Días Admin.">Días Administrativos</option>
            </select>

            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todos">Todos los estados</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Rechazado">Rechazado</option>
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
                  <tr key={sol.ID} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {sol.ID}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getBadgeTipo(sol.Tipo)}>
                        {sol.Tipo}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {sol.Periodo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {sol.Días} días
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StateColorButton estado={sol.EstadoGeneral} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sol.Jefatura}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sol.Dirección}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sol.FechaSolicitud}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {/* Ver solicitud */}}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Ver detalles"
                        >
                          <VerSolicitud id={sol.ID} />
                        </button>
                        {sol.EstadoGeneral === 'Aprobado' && (
                          <button
                            onClick={() => {/* Descargar PDF */}}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Descargar PDF"
                          >
                            <PDFDownload fileName={`${sol.ID}.pdf`} />
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