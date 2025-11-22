// ======================================================
// PÁGINA: Directorio CESFAM - CON PERMISOS
// Ubicación: src/pages/admin/DirectorioAdminPage.tsx
// Descripción: Vista unificada con control de permisos por rol
// ======================================================

'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/common/directorio/SearchBar';
import { FormularioFuncionario } from '@/components/common/directorio/Formulariofuncionario';
import type { Employee, AreaType, RoleType } from '@/types/employee';
import { ROLE_CONFIG, AREA_CONFIG } from '@/types/employee';
import { mockEmployees, searchEmployees } from '@/data/mockEmployees';
import { Users, Mail, Phone, Download, UserPlus, CheckCircle2, Edit, Trash2, Eye } from 'lucide-react';

// Layout
import { UnifiedNavbar } from '@/components/common/layout/UnifiedNavbar';
import Banner from '@/components/common/layout/Banner';
import bannerHome from "@/components/images/banner_images/BannerDirectorio.png";
import Footer from '@/components/common/layout/Footer';

// ✅ SISTEMA DE PERMISOS
import { useAuth } from '@/api/contexts/AuthContext';
import { PermissionGate } from '@/components/common/PermissionGate';

// ======================================================
// HELPER: Calcular permisos
// ======================================================
function useDirectorioPermisos() {
  const { user } = useAuth();
  
  const rolNombre = user?.rol_nombre?.toLowerCase() || '';
  const nivel = rolNombre.includes('direcci') && !rolNombre.includes('sub') ? 4
    : rolNombre.includes('subdirecci') ? 3
    : rolNombre.includes('jefe') || rolNombre.includes('jefa') ? 2
    : 1;
  
  return {
    nivel,
    puedeCrear: nivel >= 3,
    puedeEditar: nivel >= 3,
    puedeEliminar: nivel >= 4,
    esAdmin: nivel >= 3,
  };
}

// ======================================================
// FUNCIONES AUXILIARES
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

export const DirectorioAdminPage: React.FC = () => {
  const permisos = useDirectorioPermisos();

  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<AreaType | 'all'>('all');
  const [selectedRole, setSelectedRole] = useState<RoleType | 'all'>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });
  const [empleadoEditar, setEmpleadoEditar] = useState<Employee | undefined>();

  const filteredEmployees = useMemo(() => {
    let filtered = searchEmployees(employees, searchQuery);
    if (selectedArea !== 'all') filtered = filtered.filter(e => e.area === selectedArea);
    if (selectedRole !== 'all') filtered = filtered.filter(e => e.role === selectedRole);
    return filtered.sort((a, b) => `${a.apellidos} ${a.nombre}`.localeCompare(`${b.apellidos} ${b.nombre}`));
  }, [employees, searchQuery, selectedArea, selectedRole]);

  const stats = useMemo(() => {
    const uniqueAreas = new Set(employees.map(e => e.area)).size;
    const clinicalStaff = employees.filter(e => 
      ['medico', 'enfermero', 'matrona', 'odontologo', 'kinesiologo', 'nutricionista', 'psicologo'].includes(e.role)
    ).length;
    return { total: employees.length, areas: uniqueAreas, clinical: clinicalStaff, filtered: filteredEmployees.length };
  }, [employees, filteredEmployees]);

  const mostrarMensajeExito = (title: string, description: string) => {
    setSuccessMessage({ title, description });
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleAgregarFuncionario = (nuevoFuncionario: Omit<Employee, 'id'>) => {
    const nuevoId = `EMP${(employees.length + 1).toString().padStart(3, '0')}`;
    setEmployees((prev) => [...prev, { id: nuevoId, ...nuevoFuncionario }]);
    mostrarMensajeExito('¡Funcionario agregado!', 'El funcionario ha sido registrado exitosamente');
  };

  const handleEditarClick = (employee: Employee) => {
    setEmpleadoEditar(employee);
    setDialogOpen(true);
  };

  const handleGuardarEdicion = (funcionarioEditado: Omit<Employee, 'id'>) => {
    if (!empleadoEditar) return;
    setEmployees((prev) => prev.map((emp) => emp.id === empleadoEditar.id ? { ...funcionarioEditado, id: empleadoEditar.id } : emp));
    mostrarMensajeExito('¡Datos editados!', 'Los cambios han sido guardados');
    setEmpleadoEditar(undefined);
  };

  const handleEliminar = (employee: Employee) => {
    if (window.confirm(`¿Eliminar a ${employee.nombre} ${employee.apellidos}?`)) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== employee.id));
      mostrarMensajeExito('¡Funcionario eliminado!', 'El funcionario ha sido eliminado');
    }
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) setEmpleadoEditar(undefined);
  };

  return (
    <>
      <UnifiedNavbar />
      <div className="h-15" />
      <Banner imageSrc={bannerHome} title="" subtitle="" height="250px" />

      {showSuccessMessage && (
        <div className="fixed top-24 right-4 z-50 animate-in slide-in-from-top-2">
          <div className="bg-white border-2 border-[#52FFB8] rounded-xl shadow-lg p-4 flex items-center gap-3">
            <div className="p-2 bg-[#52FFB8]/20 rounded-lg"><CheckCircle2 className="w-5 h-5 text-[#52FFB8]" /></div>
            <div>
              <p className="font-semibold text-gray-900">{successMessage.title}</p>
              <p className="text-sm text-gray-600">{successMessage.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          <header className="bg-white shadow-lg rounded-xl overflow-hidden mb-6">
            <div className="max-w-[1800px] mx-auto px-6 py-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl shadow-lg ${permisos.esAdmin ? 'bg-gradient-to-br from-[#009DDC] to-[#4DFFF3]' : 'bg-gradient-to-br from-gray-400 to-gray-500'}`}>
                    {permisos.esAdmin ? <Users className="w-7 h-7 text-white" /> : <Eye className="w-7 h-7 text-white" />}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Directorio de Funcionarios</h1>
                    <p className="text-sm text-gray-600">{stats.total} funcionarios · {stats.areas} áreas{permisos.esAdmin ? ' · Panel Admin' : ' · Consulta'}</p>
                  </div>
                </div>
                
                <PermissionGate customCheck={(p) => p.nivel >= 3}>
                  <div className="flex gap-3">
                    <Button onClick={() => { setEmpleadoEditar(undefined); setDialogOpen(true); }} className="bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] hover:opacity-90 shadow-md">
                      <UserPlus className="w-4 h-4 mr-2" />Agregar Funcionario
                    </Button>
                    <Button variant="outline" className="border-2 border-gray-200 hover:border-[#009DDC]">
                      <Download className="w-4 h-4 mr-2" />Exportar
                    </Button>
                  </div>
                </PermissionGate>
              </div>

              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Buscar por nombre o email..." />
                </div>
                <div className="flex gap-3">
                  <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value as AreaType | 'all')} className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#009DDC] transition-colors text-sm font-medium">
                    <option value="all">Todas las áreas</option>
                    {Object.entries(AREA_CONFIG).map(([key, config]) => (
                      <option key={key} value={key}>{config.label}</option>
                    ))}
                  </select>
                  <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value as RoleType | 'all')} className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#009DDC] transition-colors text-sm font-medium">
                    <option value="all">Todos los roles</option>
                    {Object.entries(ROLE_CONFIG).map(([key, config]) => (
                      <option key={key} value={key}>{config.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-l-4 border-blue-400">
                  <div className="flex items-center justify-between">
                    <div><p className="text-sm text-gray-600 font-medium">Total Funcionarios</p><p className="text-2xl font-bold text-gray-900">{stats.total}</p></div>
                    <Users className="w-8 h-8 text-blue-600 opacity-50" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-4 border-l-4 border-cyan-400">
                  <div className="flex items-center justify-between">
                    <div><p className="text-sm text-gray-600 font-medium">Personal Clínico</p><p className="text-2xl font-bold text-gray-900">{stats.clinical}</p></div>
                    <Users className="w-8 h-8 text-cyan-600 opacity-50" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-l-4 border-green-400">
                  <div className="flex items-center justify-between">
                    <div><p className="text-sm text-gray-600 font-medium">Resultados Filtrados</p><p className="text-2xl font-bold text-gray-900">{stats.filtered}</p></div>
                    <Users className="w-8 h-8 text-green-600 opacity-50" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <Card key={employee.id} className="bg-white hover:shadow-lg transition-all duration-300 border-2 border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-full ${getAvatarColor(employee.nombre)} flex items-center justify-center text-white text-xl font-bold shadow-md`}>
                      {getInitials(employee.nombre, employee.apellidos)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{employee.nombre} {employee.apellidos}</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700`}>
                        {ROLE_CONFIG[employee.role]?.label} {ROLE_CONFIG[employee.role]?.label}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600"><Mail className="w-4 h-4 text-blue-500" /><span className="truncate">{employee.email}</span></div>
                    <div className="flex items-center gap-2 text-sm text-gray-600"><Phone className="w-4 h-4 text-green-500" /><span>{employee.telefono}</span></div>
                  </div>
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-700`}>
                      {AREA_CONFIG[employee.area]?.label}
                    </span>
                  </div>
                  <PermissionGate customCheck={(p) => p.nivel >= 3}>
                    <div className="flex gap-2 pt-4 border-t-2 border-gray-100">
                      <Button size="sm" variant="outline" onClick={() => handleEditarClick(employee)} className="flex-1 border-blue-200 hover:border-blue-400 hover:bg-blue-50">
                        <Edit className="w-4 h-4 mr-1" />Editar
                      </Button>
                      <PermissionGate customCheck={(p) => p.nivel >= 4}>
                        <Button size="sm" variant="outline" onClick={() => handleEliminar(employee)} className="border-red-200 hover:border-red-400 hover:bg-red-50 text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </PermissionGate>
                    </div>
                  </PermissionGate>
                </div>
              </Card>
            ))}
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No se encontraron funcionarios</p>
              <p className="text-gray-400 text-sm">Intenta ajustar los filtros de búsqueda</p>
            </div>
          )}
        </div>
      </div>

      <Footer />

      <PermissionGate customCheck={(p) => p.nivel >= 3}>
        <FormularioFuncionario open={dialogOpen} onOpenChange={handleDialogClose} onSubmit={empleadoEditar ? handleGuardarEdicion : handleAgregarFuncionario} empleadoEditar={empleadoEditar} />
      </PermissionGate>
    </>
  );
};

export default DirectorioAdminPage;