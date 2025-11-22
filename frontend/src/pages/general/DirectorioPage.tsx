// ======================================================
// PÁGINA PRINCIPAL: Directorio de Funcionarios CESFAM
// Ubicación: src/pages/DirectorioFuncionarios.tsx
// Descripción: Directorio profesional estilo tabla moderna
// ======================================================

'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import SearchBar from '@/components/common/directorio/SearchBar';
import type { Employee, AreaType, RoleType } from '@/types/employee';
import { ROLE_CONFIG, AREA_CONFIG } from '@/types/employee';
import { mockEmployees, searchEmployees } from '@/data/mockEmployees';
import { Users, Mail, Phone, Download } from 'lucide-react';
import { UnifiedNavbar } from '@/components/common/layout/UnifiedNavbar';
import Banner from '@/components/common/layout/Banner';
import bannerHome from "@/components/images/banner_images/BannerDirectorio.png"
import Footer from '@/components/common/layout/Footer';


// ======================================================
// FUNCIÓN PARA GENERAR INICIALES
// ======================================================

const getInitials = (nombre: string, apellidos: string): string => {
  const firstInitial = nombre.charAt(0).toUpperCase();
  const lastInitial = apellidos.charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
};

const getAvatarColor = (nombre: string): string => {
  const colors = [
    'bg-blue-500', 'bg-cyan-500', 'bg-teal-500', 'bg-green-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-violet-500'
  ];
  const charCode = nombre.charCodeAt(0);
  return colors[charCode % colors.length];
};

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const DirectorioPage: React.FC = () => {
  // ======================================================
  // ESTADOS
  // ======================================================

  const [employees] = useState<Employee[]>(mockEmployees);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<AreaType | 'all'>('all');
  const [selectedRole, setSelectedRole] = useState<RoleType | 'all'>('all');

  // ======================================================
  // DATOS PROCESADOS
  // ======================================================

  const filteredEmployees = useMemo(() => {
    let filtered = searchEmployees(employees, searchQuery);
    
    if (selectedArea !== 'all') {
      filtered = filtered.filter(e => e.area === selectedArea);
    }
    
    if (selectedRole !== 'all') {
      filtered = filtered.filter(e => e.role === selectedRole);
    }
    
    return filtered.sort((a, b) => 
      `${a.apellidos} ${a.nombre}`.localeCompare(`${b.apellidos} ${b.nombre}`)
    );
  }, [employees, searchQuery, selectedArea, selectedRole]);

  const stats = useMemo(() => {
    const uniqueAreas = new Set(employees.map(e => e.area)).size;
    const clinicalStaff = employees.filter(e => 
      ['medico', 'enfermero', 'matrona', 'odontologo', 'kinesiologo', 'nutricionista', 'psicologo'].includes(e.role)
    ).length;
    
    return {
      total: employees.length,
      areas: uniqueAreas,
      clinical: clinicalStaff,
      filtered: filteredEmployees.length
    };
  }, [employees, filteredEmployees]);

  // ======================================================
  // RENDERIZADO
  // ======================================================

  return (
    <>
      <UnifiedNavbar />
      <div className="h-15" /> {/* Este espacio ocupa la altura del Navbar */}

      <Banner
        imageSrc={bannerHome}
        title=""
        subtitle=""
        height="250px"
      />

      {/* Nuevo contenedor principal para el padding y ancho máximo, similar a ComunicadosOficiales */}
      <div className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 p-4 md:p-8">
        {/* Contenedor para el ancho máximo */}
        <div className="max-w-[1600px] mx-auto">
          {/* ======================================================
              HEADER COMPACTO (Ahora con rounded-xl y mb-6)
              ====================================================== */}
          <header className="bg-white shadow-lg  rounded-xl overflow-hidden mb-6"> {/* Añadido rounded-xl y mb-6 */}
            <div className="max-w-[1800px] mx-auto px-6 py-6"> {/* Ajustado a px-6 para mejor look */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] rounded-xl shadow-lg">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Directorio de Funcionarios
                    </h1>
                    <p className="text-sm text-gray-600">
                      {stats.total} funcionarios · {stats.areas} áreas
                    </p>
                  </div>
                </div>
                
                <button className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-[#009DDC] transition-colors">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Exportar</span>
                </button>
              </div>

              {/* Barra de búsqueda y filtros */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Buscar por nombre o email..."
                  />
                </div>
                
                <div className="flex gap-3">
                  {/* Filtro de Área */}
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value as AreaType | 'all')}
                    className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#009DDC] transition-colors text-sm font-medium"
                  >
                    <option value="all">Todas las áreas</option>
                    {Object.entries(AREA_CONFIG).map(([key, config]) => (
                      <option key={key} value={key}>
                        {config.icon} {config.label}
                      </option>
                    ))}
                  </select>

                  {/* Filtro de Rol */}
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as RoleType | 'all')}
                    className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#009DDC] transition-colors text-sm font-medium"
                  >
                    <option value="all">Todos los roles</option>
                    {Object.entries(ROLE_CONFIG).map(([key, config]) => (
                      <option key={key} value={key}>
                        {config.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contador de resultados */}
              {(searchQuery || selectedArea !== 'all' || selectedRole !== 'all') && (
                <div className="mt-4 text-sm text-gray-600">
                  Mostrando <span className="font-bold text-[#009DDC]">{stats.filtered}</span> de {stats.total} funcionarios
                </div>
              )}
            </div>
          </header>

          {/* ======================================================
              TABLA DE FUNCIONARIOS (Ahora dentro del contenedor con max-w)
              ====================================================== */}
          <main className="py-6"> {/* Eliminamos px-6 */}
            <Card className="overflow-hidden shadow-xl border-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Funcionario
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Rol
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Área / Departamento
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Contacto
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredEmployees.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center">
                            <Users className="w-16 h-16 text-gray-300 mb-4" />
                            <p className="text-gray-500 font-medium">No se encontraron funcionarios</p>
                            <p className="text-sm text-gray-400 mt-1">Intenta con otros términos de búsqueda</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredEmployees.map((employee, index) => {
                        const roleConfig = ROLE_CONFIG[employee.role];
                        const areaConfig = AREA_CONFIG[employee.area];
                        const initials = getInitials(employee.nombre, employee.apellidos);
                        const avatarColor = getAvatarColor(employee.nombre);

                        return (
                          <tr 
                            key={employee.id}
                            className="hover:bg-blue-50 transition-colors duration-150 animate-fadeIn"
                            style={{ animationDelay: `${index * 30}ms` }}
                          >
                            {/* COLUMNA: Funcionario */}
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                {/* Avatar */}
                                <div className="relative flex-shrink-0">
                                  {employee.avatar ? (
                                    <img
                                      src={employee.avatar}
                                      alt={`${employee.nombre} ${employee.apellidos}`}
                                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                                    />
                                  ) : (
                                    <div className={`
                                      w-12 h-12 rounded-full ${avatarColor}
                                      flex items-center justify-center
                                      border-2 border-white shadow-md
                                    `}>
                                      <span className="text-sm font-bold text-white">
                                        {initials}
                                      </span>
                                    </div>
                                  )}
                                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>

                                {/* Nombre */}
                                <div>
                                  <p className="text-sm font-bold text-gray-900">
                                    {employee.nombre} {employee.apellidos}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    ID: {employee.id}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* COLUMNA: Rol */}
                            <td className="px-6 py-4">
                              <span className={`
                                inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold
                                border ${roleConfig.badge}
                              `}>
                                {roleConfig.label}
                              </span>
                            </td>

                            {/* COLUMNA: Área */}
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{areaConfig.icon}</span>
                                <div>
                                  <p className={`text-sm font-semibold ${areaConfig.color}`}>
                                    {areaConfig.label}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* COLUMNA: Contacto */}
                            <td className="px-6 py-4">
                              <div className="space-y-1">
                                {/* Email */}
                                <a
                                  href={`mailto:${employee.email}`}
                                  className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#009DDC] transition-colors group"
                                >
                                  <Mail className="w-3.5 h-3.5 text-[#009DDC]" />
                                  <span className="group-hover:underline">{employee.email}</span>
                                </a>

                                {/* Teléfono/Extensión */}
                                {(employee.telefono || employee.extension) && (
                                  <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <Phone className="w-3.5 h-3.5 text-[#52FFB8]" />
                                    {employee.telefono && <span>{employee.telefono}</span>}
                                    {employee.extension && (
                                      <span className="text-gray-400">Ext. {employee.extension}</span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Información adicional */}
            {filteredEmployees.length > 0 && (
              <div className="mt-4 text-center text-sm text-gray-500">
                Mostrando todos los resultados ({filteredEmployees.length} {filteredEmployees.length === 1 ? 'funcionario' : 'funcionarios'})
              </div>
            )}
          </main>
        </div> {/* Cierre del div max-w-[1600px] */}
      </div> {/* Cierre del div p-4 md:p-8 */}
      <Footer />
    </>
  );
};