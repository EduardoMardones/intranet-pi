// ======================================================
// PÁGINA: Directorio CESFAM - INTEGRADO CON BACKEND
// Ubicación: src/pages/admin/DirectorioAdminPage.tsx
// Descripción: Vista unificada con datos reales de PostgreSQL
// ======================================================

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/common/directorio/SearchBar';
import { FormularioUsuarioCompleto } from '@/components/common/usuarios/FormularioUsuarioCompleto';
import { Users, Mail, Phone, Download, UserPlus, CheckCircle2, Edit, Trash2, Eye, Loader2, AlertCircle } from 'lucide-react';

// Layout
import { UnifiedNavbar } from '@/components/common/layout/UnifiedNavbar';
import Banner from '@/components/common/layout/Banner';
import bannerHome from "@/components/images/banner_images/BannerDirectorio.png";
import Footer from '@/components/common/layout/Footer';

// ✅ IMPORTAR SERVICIOS Y TIPOS REALES
import { usuarioService } from '@/api';
import type { Usuario, CrearUsuarioDTO, ActualizarUsuarioDTO } from '@/api/services/usuarioService';

// Sistema de permisos
import { useAuth } from '@/api/contexts/AuthContext';
import { PermissionGate } from '@/components/common/PermissionGate';

// ======================================================
// HELPER: Calcular permisos
// ======================================================
function useDirectorioPermisos() {
  const { user } = useAuth();
  
  const nivel = user?.rol_nivel || 1;
  
  return {
    nivel,
    puedeCrear: nivel >= 3,       // Subdirección y Dirección
    puedeEditar: nivel >= 3,      // Subdirección y Dirección
    puedeEliminar: nivel >= 3,    // Subdirección y Dirección
    esAdmin: nivel >= 3,
  };
}

// ======================================================
// FUNCIONES AUXILIARES
// ======================================================

const getInitials = (nombreCompleto: string): string => {
  const parts = nombreCompleto.split(' ');
  if (parts.length >= 2) {
    return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
  }
  return nombreCompleto.substring(0, 2).toUpperCase();
};

const getAvatarColor = (nombre: string): string => {
  const colors = [
    'bg-blue-500', 'bg-cyan-500', 'bg-teal-500', 'bg-green-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-violet-500'
  ];
  // ✅ Validar que nombre existe y no está vacío
  if (!nombre || nombre.length === 0) {
    return colors[0]; // Color por defecto
  }
  const charCode = nombre.charCodeAt(0);
  return colors[charCode % colors.length];
};

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const DirectorioAdminPage: React.FC = () => {
  const permisos = useDirectorioPermisos();

  // ✅ ESTADOS CON DATOS REALES
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });
  const [empleadoEditar, setEmpleadoEditar] = useState<Usuario | undefined>();

  // ✅ CARGAR USUARIOS DESDE EL BACKEND
  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔄 Cargando usuarios desde el backend...');
      const data = await usuarioService.getActivos();
      console.log('✅ Usuarios cargados:', data.length);
      setUsuarios(data);
    } catch (error: any) {
      console.error('❌ Error al cargar usuarios:', error);
      setError('No se pudieron cargar los usuarios. Intenta recargar la página.');
      mostrarMensajeError('Error', 'No se pudieron cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  // ✅ FILTROS CON DATOS REALES
  const filteredEmployees = useMemo(() => {
    let result = usuarios;

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(usuario => 
        usuario.nombre_completo.toLowerCase().includes(query) ||
        usuario.rut.toLowerCase().includes(query) ||
        usuario.email.toLowerCase().includes(query) ||
        usuario.cargo.toLowerCase().includes(query)
      );
    }

    // Filtrar por área
    if (selectedArea !== 'all') {
      result = result.filter(usuario => usuario.area === selectedArea);
    }

    // Filtrar por rol
    if (selectedRole !== 'all') {
      result = result.filter(usuario => usuario.rol === selectedRole);
    }

    // Ordenar alfabéticamente
    return result.sort((a, b) => 
      a.nombre_completo.localeCompare(b.nombre_completo)
    );
  }, [usuarios, searchQuery, selectedArea, selectedRole]);

  // ✅ ESTADÍSTICAS CON DATOS REALES
  const stats = useMemo(() => {
    const uniqueAreas = new Set(usuarios.map(u => u.area)).size;
    const clinicalStaff = usuarios.filter(u => 
      u.cargo.toLowerCase().includes('médico') ||
      u.cargo.toLowerCase().includes('enferm') ||
      u.cargo.toLowerCase().includes('matrona') ||
      u.cargo.toLowerCase().includes('odontólogo') ||
      u.cargo.toLowerCase().includes('kinesiólogo') ||
      u.cargo.toLowerCase().includes('nutricionista') ||
      u.cargo.toLowerCase().includes('psicólogo')
    ).length;
    
    return { 
      total: usuarios.length, 
      areas: uniqueAreas, 
      clinical: clinicalStaff, 
      filtered: filteredEmployees.length 
    };
  }, [usuarios, filteredEmployees]);

  // ✅ OBTENER ÁREAS Y ROLES ÚNICOS PARA LOS FILTROS
  const uniqueAreas = useMemo(() => {
    const areasMap = new Map<string, string>();
    usuarios.forEach(u => {
      if (u.area && u.area_nombre) {
        areasMap.set(u.area, u.area_nombre);
      }
    });
    return Array.from(areasMap.entries()).map(([id, nombre]) => ({ id, nombre }));
  }, [usuarios]);

  const uniqueRoles = useMemo(() => {
    const rolesMap = new Map<string, string>();
    usuarios.forEach(u => {
      if (u.rol && u.rol_nombre) {
        rolesMap.set(u.rol, u.rol_nombre);
      }
    });
    return Array.from(rolesMap.entries()).map(([id, nombre]) => ({ id, nombre }));
  }, [usuarios]);

  // ✅ MENSAJES
  const mostrarMensajeExito = (title: string, description: string) => {
    setSuccessMessage({ title, description });
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const mostrarMensajeError = (title: string, description: string) => {
    setSuccessMessage({ title, description });
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 4000);
  };

  // ✅ HANDLERS CON INTEGRACIÓN BACKEND

  const handleAgregarFuncionario = async (nuevoUsuario: CrearUsuarioDTO | ActualizarUsuarioDTO) => {
    try {
      console.log('💾 Creando usuario:', nuevoUsuario);
      
      const usuarioCreado = await usuarioService.create(nuevoUsuario as CrearUsuarioDTO);
      
      console.log('✅ Usuario creado:', usuarioCreado);
      mostrarMensajeExito('¡Funcionario agregado!', 'El funcionario ha sido registrado exitosamente');
      
      // Recargar lista de usuarios
      cargarUsuarios();
      
    } catch (error: any) {
      console.error('❌ Error al crear usuario:', error);
      const errorMsg = error.response?.data?.message || 
                       error.response?.data?.rut?.[0] ||
                       error.response?.data?.email?.[0] ||
                       'No se pudo crear el usuario';
      mostrarMensajeError('Error al crear', errorMsg);
      throw error; // Re-lanzar para que el formulario lo maneje
    }
  };

  const handleEditarClick = (usuario: Usuario) => {
    setEmpleadoEditar(usuario);
    setDialogOpen(true);
  };

  const handleGuardarEdicion = async (usuarioEditado: CrearUsuarioDTO | ActualizarUsuarioDTO) => {
    if (!empleadoEditar) return;
    
    try {
      console.log('💾 Actualizando usuario:', usuarioEditado);
      
      await usuarioService.update(empleadoEditar.id, usuarioEditado as ActualizarUsuarioDTO);
      
      console.log('✅ Usuario actualizado');
      mostrarMensajeExito('¡Datos editados!', 'Los cambios han sido guardados exitosamente');
      
      // Recargar lista y cerrar modal
      cargarUsuarios();
      setEmpleadoEditar(undefined);
      
    } catch (error: any) {
      console.error('❌ Error al editar usuario:', error);
      const errorMsg = error.response?.data?.message || 
                       error.response?.data?.email?.[0] ||
                       'No se pudo actualizar el usuario';
      mostrarMensajeError('Error al actualizar', errorMsg);
      throw error;
    }
  };

  const handleEliminar = async (usuario: Usuario) => {
    if (!window.confirm(`¿Desactivar a ${usuario.nombre_completo}?\n\nEsto no eliminará al usuario, solo lo desactivará.`)) {
      return;
    }

    try {
      await usuarioService.deactivate(usuario.id);
      mostrarMensajeExito('¡Usuario desactivado!', 'El funcionario ha sido desactivado');
      cargarUsuarios();
    } catch (error) {
      console.error('❌ Error al desactivar usuario:', error);
      mostrarMensajeError('Error', 'No se pudo desactivar el usuario');
    }
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) setEmpleadoEditar(undefined);
  };

  // ======================================================
  // RENDERIZADO
  // ======================================================

  return (
    <>
      <UnifiedNavbar />
      <div className="h-15" />
      <Banner imageSrc={bannerHome} title="" subtitle="" height="250px" />

      {/* Mensaje de éxito/error */}
      {showSuccessMessage && (
        <div className="fixed top-24 right-4 z-50 animate-in slide-in-from-top-2">
          <div className={`bg-white border-2 rounded-xl shadow-lg p-4 flex items-center gap-3 ${
            successMessage.title.toLowerCase().includes('error') 
              ? 'border-red-500' 
              : 'border-[#52FFB8]'
          }`}>
            <div className={`p-2 rounded-lg ${
              successMessage.title.toLowerCase().includes('error')
                ? 'bg-red-100'
                : 'bg-[#52FFB8]/20'
            }`}>
              {successMessage.title.toLowerCase().includes('error') ? (
                <AlertCircle className="w-5 h-5 text-red-500" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-[#52FFB8]" />
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{successMessage.title}</p>
              <p className="text-sm text-gray-600">{successMessage.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Header */}
          <header className="bg-white shadow-lg rounded-xl overflow-hidden mb-6">
            <div className="max-w-[1800px] mx-auto px-6 py-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl shadow-lg ${
                    permisos.esAdmin 
                      ? 'bg-gradient-to-br from-[#009DDC] to-[#4DFFF3]' 
                      : 'bg-gradient-to-br from-gray-400 to-gray-500'
                  }`}>
                    {permisos.esAdmin ? (
                      <Users className="w-7 h-7 text-white" />
                    ) : (
                      <Eye className="w-7 h-7 text-white" />
                    )}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Directorio de Funcionarios</h1>
                    <p className="text-sm text-gray-600">
                      {loading ? 'Cargando...' : `${stats.total} funcionarios · ${stats.areas} áreas`}
                      {permisos.esAdmin ? ' · Panel Admin' : ' · Consulta'}
                    </p>
                  </div>
                </div>
                
                <PermissionGate customCheck={(p) => p.nivel >= 3}>
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => { setEmpleadoEditar(undefined); setDialogOpen(true); }} 
                      className="bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] hover:opacity-90 shadow-md"
                      disabled={loading}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Agregar Funcionario
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-2 border-gray-200 hover:border-[#009DDC]"
                      disabled={loading}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Exportar
                    </Button>
                  </div>
                </PermissionGate>
              </div>

              {/* Barra de búsqueda y filtros */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <SearchBar 
                    value={searchQuery} 
                    onChange={setSearchQuery} 
                    placeholder="Buscar por nombre, RUT, email o cargo..." 
                  />
                </div>
                <div className="flex gap-3">
                  <select 
                    value={selectedArea} 
                    onChange={(e) => setSelectedArea(e.target.value)} 
                    className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#009DDC] transition-colors text-sm font-medium"
                    disabled={loading}
                  >
                    <option value="all">Todas las áreas</option>
                    {uniqueAreas.map((area) => (
                      <option key={area.id} value={area.id}>{area.nombre}</option>
                    ))}
                  </select>
                  <select 
                    value={selectedRole} 
                    onChange={(e) => setSelectedRole(e.target.value)} 
                    className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#009DDC] transition-colors text-sm font-medium"
                    disabled={loading}
                  >
                    <option value="all">Todos los roles</option>
                    {uniqueRoles.map((rol) => (
                      <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Estadísticas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-l-4 border-blue-400">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Total Funcionarios</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600 opacity-50" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-4 border-l-4 border-cyan-400">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Personal Clínico</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.clinical}</p>
                    </div>
                    <Users className="w-8 h-8 text-cyan-600 opacity-50" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-l-4 border-green-400">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Resultados Filtrados</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.filtered}</p>
                    </div>
                    <Users className="w-8 h-8 text-green-600 opacity-50" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Contenido principal */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Cargando funcionarios...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <p className="text-red-600 text-lg font-semibold mb-2">Error al cargar</p>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={cargarUsuarios} className="bg-blue-500 hover:bg-blue-600">
                Reintentar
              </Button>
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-semibold">No se encontraron funcionarios</p>
              <p className="text-gray-400 text-sm">Intenta ajustar los filtros de búsqueda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((usuario) => (
                <Card 
                  key={usuario.id} 
                  className="bg-white hover:shadow-lg transition-all duration-300 border-2 border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      {usuario.avatar ? (
                        <img 
                          src={usuario.avatar} 
                          alt={usuario.nombre_completo}
                          className="w-16 h-16 rounded-full object-cover shadow-md"
                        />
                      ) : (
                        <div className={`w-16 h-16 rounded-full ${getAvatarColor(usuario.nombre_completo)} flex items-center justify-center text-white text-xl font-bold shadow-md`}>
                          {getInitials(usuario.nombre_completo)}
                          </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          {usuario.nombre_completo}
                        </h3>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                          {usuario.rol_nombre}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-medium text-gray-700">{usuario.cargo}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <span className="truncate">{usuario.email}</span>
                      </div>
                      {usuario.telefono && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-green-500" />
                          <span>{usuario.telefono}</span>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-700">
                        {usuario.area_nombre}
                      </span>
                    </div>

                    <PermissionGate customCheck={(p) => p.nivel >= 3}>
                      <div className="flex gap-2 pt-4 border-t-2 border-gray-100">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleEditarClick(usuario)} 
                          className="flex-1 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                        <PermissionGate customCheck={(p) => p.nivel >= 3}>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleEliminar(usuario)} 
                            className="border-red-200 hover:border-red-400 hover:bg-red-50 text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </PermissionGate>
                      </div>
                    </PermissionGate>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Formulario de usuario */}
      <PermissionGate customCheck={(p) => p.nivel >= 3}>
        <FormularioUsuarioCompleto 
          open={dialogOpen} 
          onOpenChange={handleDialogClose} 
          onSubmit={empleadoEditar ? handleGuardarEdicion : handleAgregarFuncionario} 
          usuarioEditar={empleadoEditar} 
          modo={empleadoEditar ? 'editar' : 'crear'}
        />
      </PermissionGate>
    </>
  );
};

export default DirectorioAdminPage;