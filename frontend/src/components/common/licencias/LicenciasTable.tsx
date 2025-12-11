// ======================================================
// COMPONENTE: LicenciasTable
// Ubicación: src/components/common/LicenciasTable.tsx
// Descripción: Tabla de licencias médicas cargadas
// ======================================================

'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import type { LicenciaMedica } from '@/types/licencia';
import { FILE_TYPE_CONFIG, STATUS_CONFIG, calcularEstadoLicencia } from '@/types/licencia';
import { formatFileSize } from '@/data/mockLicencias';
import { Eye, Download, Trash2, Calendar, User, Briefcase } from 'lucide-react';

// ======================================================
// INTERFACES
// ======================================================

interface LicenciasTableProps {
  licencias: LicenciaMedica[];
  onView: (licencia: LicenciaMedica) => void;
  onDownload: (licencia: LicenciaMedica) => void;
  onDelete: (licenciaId: string) => void;
}

// ======================================================
// FUNCIONES AUXILIARES
// ======================================================

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatDateSimple = (date: Date): string => {
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const LicenciasTable: React.FC<LicenciasTableProps> = ({
  licencias,
  onView,
  onDownload,
  onDelete
}) => {
  if (licencias.length === 0) return null;

  return (
    <Card className="overflow-hidden shadow-xl border-0">
      {/* Header de la tabla */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b-2 border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          📋 Licencias Médicas Cargadas
          <span className="text-sm font-normal text-gray-600">
            ({licencias.length} {licencias.length === 1 ? 'registro' : 'registros'})
          </span>
        </h2>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Archivo
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Empleado
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Período
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Subido por
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Fecha de subida
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {licencias.map((licencia, index) => {
              const fileConfig = FILE_TYPE_CONFIG[licencia.tipoArchivo];
              
              // ✅ CALCULAR ESTADO AUTOMÁTICAMENTE BASADO EN FECHA DE TÉRMINO
              const estadoActual = licencia.fechaTermino 
                ? calcularEstadoLicencia(licencia.fechaTermino)
                : 'vencida'; // Por defecto vencida si no hay fecha
              
              const statusConfig = STATUS_CONFIG[estadoActual];

              return (
                <tr 
                  key={licencia.id}
                  className="hover:bg-blue-50 transition-colors duration-150 animate-fadeIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* COLUMNA: Archivo */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-10 h-10 rounded-lg ${fileConfig.bgColor}
                        flex items-center justify-center flex-shrink-0
                      `}>
                        <span className="text-xl">{fileConfig.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate max-w-xs">
                          {licencia.nombreArchivo}
                        </p>
                        <p className="text-xs text-gray-500">
                          {licencia.tipoArchivo.toUpperCase()} · {formatFileSize(licencia.tamanoArchivo)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* COLUMNA: Empleado */}
                  <td className="px-6 py-4">
                    {licencia.empleadoNombre ? (
                      <div className="flex items-start gap-2">
                        <User className="w-4 h-4 text-[#009DDC] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {licencia.empleadoNombre}
                          </p>
                          {licencia.diasLicencia && (
                            <p className="text-xs text-gray-500">
                              {licencia.diasLicencia} {licencia.diasLicencia === 1 ? 'día' : 'días'}
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>

                  {/* COLUMNA: Período */}
                  <td className="px-6 py-4">
                    {licencia.fechaInicio && licencia.fechaTermino ? (
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-[#52FFB8] mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-gray-600">
                          <div>{formatDateSimple(licencia.fechaInicio)}</div>
                          <div className="text-gray-400">al</div>
                          <div>{formatDateSimple(licencia.fechaTermino)}</div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>

                  {/* COLUMNA: Estado */}
                  <td className="px-6 py-4">
                    <span className={`
                      inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                      border ${statusConfig.badge}
                    `}>
                      {statusConfig.label}
                    </span>
                  </td>

                  {/* COLUMNA: Subido por */}
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2">
                      <Briefcase className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {licencia.subidoPor}
                        </p>
                        <p className="text-xs text-gray-500">
                          {licencia.cargoUsuario}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* COLUMNA: Fecha de subida */}
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-600">
                      {formatDate(licencia.fechaSubida)}
                    </p>
                  </td>

                  {/* COLUMNA: Acciones */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* Botón Ver */}
                      <button
                        onClick={() => onView(licencia)}
                        className="
                          p-2 rounded-lg
                          text-blue-600 hover:bg-blue-50
                          transition-colors duration-200
                          group
                        "
                        title="Ver archivo"
                      >
                        <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>

                      {/* Botón Descargar */}
                      <button
                        onClick={() => onDownload(licencia)}
                        className="
                          p-2 rounded-lg
                          text-green-600 hover:bg-green-50
                          transition-colors duration-200
                          group
                        "
                        title="Descargar archivo"
                      >
                        <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>

                      {/* Botón Eliminar */}
                      <button
                        onClick={() => {
                          if (confirm('¿Estás seguro de eliminar esta licencia?')) {
                            onDelete(licencia.id);
                          }
                        }}
                        className="
                          p-2 rounded-lg
                          text-red-600 hover:bg-red-50
                          transition-colors duration-200
                          group
                        "
                        title="Eliminar archivo"
                      >
                        <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default LicenciasTable;