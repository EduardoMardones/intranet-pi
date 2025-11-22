// ======================================================
// PÁGINA: Gestión de Archivos - Panel Administrativo
// Ubicación: src/pages/admin/ArchivosAdminPage.tsx
// Descripción: CRUD completo para gestión de archivos del repositorio
// ======================================================

import React, { useState } from 'react';
import { UnifiedNavbar } from '@/components/common/layout/UnifiedNavbar';
import Footer from '@/components/common/layout/Footer';
import Banner from '@/components/common/layout/Banner';
import { FileUploaderArchivos } from '@/components/common/repositorio/FileUploaderArchivos';
import { 
  Edit2, 
  Trash2, 
  Download, 
  Eye, 
  FileText,
  Image,
  Video,
  File,
  Search,
  Filter
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import bannerArchivos from "@/components/images/banner_images/BannerArchivos.png";
// ✅ SISTEMA DE PERMISOS
import { useAuth } from '@/api/contexts/AuthContext';
import { PermissionGate } from '@/components/common/PermissionGate';

// ======================================================
// TIPOS E INTERFACES
// ======================================================

interface Archivo {
  id: string;
  tipo: 'PDF' | 'Imagen' | 'Video' | 'Documento';
  nombre: string;
  fechaSubida: Date;
  tamaño: number; // en bytes
  subidoPor: string;
  url?: string;
}


function useArchivosPermisos() {
  const { user } = useAuth();
  
  const rolNombre = user?.rol_nombre?.toLowerCase() || '';
  const nivel = rolNombre.includes('direcci') && !rolNombre.includes('sub') ? 4
    : rolNombre.includes('subdirecci') ? 3
    : rolNombre.includes('jefe') || rolNombre.includes('jefa') ? 2
    : 1;
  
  return {
    nivel,
    puedeSubir: nivel >= 3,       // Subdirección y Dirección
    puedeEditar: nivel >= 3,      // Subdirección y Dirección  
    puedeEliminar: nivel >= 4,    // Solo Dirección
    esAdmin: nivel >= 3,
  };
}

// ======================================================
// DATOS MOCK
// ======================================================

const generarArchivosMock = (): Archivo[] => {
  const tipos: Array<'PDF' | 'Imagen' | 'Video' | 'Documento'> = ['PDF', 'Imagen', 'Video', 'Documento'];
  
  return Array.from({ length: 15 }, (_, i) => ({
    id: `FILE${(i + 1).toString().padStart(3, '0')}`,
    tipo: tipos[Math.floor(Math.random() * tipos.length)],
    nombre: `Archivo_${i + 1}`,
    fechaSubida: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    tamaño: Math.floor(Math.random() * 5000000) + 100000, // entre 100KB y 5MB
    subidoPor: 'Admin Sistema'
  }));
};

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const ArchivosAdminPage: React.FC = () => {
  // ======================================================
  // ESTADOS
  // ======================================================
  const permisos = useArchivosPermisos();
  const [archivos, setArchivos] = useState<Archivo[]>(generarArchivosMock());
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [archivoEditando, setArchivoEditando] = useState<Archivo | null>(null);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [archivoAEliminar, setArchivoAEliminar] = useState<Archivo | null>(null);

  // ======================================================
  // FUNCIONES AUXILIARES
  // ======================================================

  const formatearTamaño = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatearFecha = (fecha: Date): string => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getIconoTipo = (tipo: string) => {
    switch (tipo) {
      case 'PDF':
        return <FileText className="h-5 w-5 text-red-600" />;
      case 'Imagen':
        return <Image className="h-5 w-5 text-blue-600" />;
      case 'Video':
        return <Video className="h-5 w-5 text-purple-600" />;
      default:
        return <File className="h-5 w-5 text-gray-600" />;
    }
  };

  const getBadgeTipo = (tipo: string) => {
    const colores: Record<string, string> = {
      'PDF': 'bg-red-100 text-red-700 border-red-300',
      'Imagen': 'bg-blue-100 text-blue-700 border-blue-300',
      'Video': 'bg-purple-100 text-purple-700 border-purple-300',
      'Documento': 'bg-gray-100 text-gray-700 border-gray-300'
    };
    return colores[tipo] || colores['Documento'];
  };

  // ======================================================
  // MANEJADORES DE EVENTOS - CRUD
  // ======================================================

  // CREATE - Agregar nuevos archivos
  const handleFilesSelected = (files: File[]) => {
    const nuevosArchivos: Archivo[] = files.map((file, index) => {
      let tipo: 'PDF' | 'Imagen' | 'Video' | 'Documento' = 'Documento';
      
      if (file.type.includes('pdf')) tipo = 'PDF';
      else if (file.type.includes('image')) tipo = 'Imagen';
      else if (file.type.includes('video')) tipo = 'Video';

      return {
        id: `FILE${(archivos.length + index + 1).toString().padStart(3, '0')}`,
        tipo,
        nombre: file.name.replace(/\.[^/.]+$/, ''), // Quitar extensión
        fechaSubida: new Date(),
        tamaño: file.size,
        subidoPor: 'Usuario Actual',
        url: URL.createObjectURL(file)
      };
    });

    setArchivos([...nuevosArchivos, ...archivos]);
  };

  // READ - Filtrar archivos
  const archivosFiltrados = archivos.filter(archivo => {
    const cumpleBusqueda = archivo.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                          archivo.id.toLowerCase().includes(busqueda.toLowerCase());
    const cumpleTipo = filtroTipo === 'todos' || archivo.tipo === filtroTipo;
    return cumpleBusqueda && cumpleTipo;
  });

  // UPDATE - Editar archivo
  const handleIniciarEdicion = (archivo: Archivo) => {
    setArchivoEditando({ ...archivo });
    setMostrarModalEditar(true);
  };

  const handleGuardarEdicion = () => {
    if (!archivoEditando) return;

    setArchivos(prev => prev.map(a => 
      a.id === archivoEditando.id ? archivoEditando : a
    ));
    setMostrarModalEditar(false);
    setArchivoEditando(null);
  };

  // DELETE - Eliminar archivo
  const handleIniciarEliminacion = (archivo: Archivo) => {
    setArchivoAEliminar(archivo);
    setMostrarModalEliminar(true);
  };

  const handleConfirmarEliminacion = () => {
    if (!archivoAEliminar) return;

    setArchivos(prev => prev.filter(a => a.id !== archivoAEliminar.id));
    setMostrarModalEliminar(false);
    setArchivoAEliminar(null);
  };

  // Otras acciones
  const handleDescargar = (archivo: Archivo) => {
    console.log('Descargar:', archivo);
    alert(`Descargando: ${archivo.nombre}`);
  };

  const handleVer = (archivo: Archivo) => {
    console.log('Ver:', archivo);
    alert(`Ver archivo: ${archivo.nombre}`);
  };

  // ======================================================
  // RENDERIZADO
  // ======================================================

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <UnifiedNavbar />
      <div className="h-16" />

      <Banner
        imageSrc={bannerArchivos}
        title=""
        subtitle=""
        height="250px"
      />

      <div className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {permisos.esAdmin ? 'Gestión de Archivos' : 'Repositorio de Archivos'}
              </h1>
              <p className="text-gray-600">
                {permisos.esAdmin 
                  ? 'Administra el repositorio de documentos del CESFAM'
                  : 'Consulta y descarga documentos del CESFAM'
                }
              </p>
          </div>

          {/* ✅ FileUploader solo con permisos */}
          <PermissionGate 
            customCheck={(p) => p.nivel >= 3}
            fallback={
              <div className="mb-6 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
                <p className="text-blue-900 text-center">
                  📁 <strong>Repositorio de Archivos</strong> - Solo puedes ver y descargar archivos
                </p>
              </div>
            }
          >
            <div className="mb-6">
              <FileUploaderArchivos
                onFilesSelected={handleFilesSelected}
                hasFiles={archivos.length > 0}
              />
            </div>
          </PermissionGate>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Archivos</p>
                  <p className="text-2xl font-bold text-gray-900">{archivos.length}</p>
                </div>
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">PDFs</p>
                  <p className="text-2xl font-bold text-red-600">
                    {archivos.filter(a => a.tipo === 'PDF').length}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-red-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Imágenes</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {archivos.filter(a => a.tipo === 'Imagen').length}
                  </p>
                </div>
                <Image className="h-8 w-8 text-blue-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Videos</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {archivos.filter(a => a.tipo === 'Video').length}
                  </p>
                </div>
                <Video className="h-8 w-8 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Barra de búsqueda y filtros */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Búsqueda */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o ID..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Filtro por tipo */}
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todos">Todos los tipos</option>
                  <option value="PDF">PDF</option>
                  <option value="Imagen">Imágenes</option>
                  <option value="Video">Videos</option>
                  <option value="Documento">Documentos</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tabla de archivos */}
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
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha Subida
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tamaño
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subido Por
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {archivosFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                        <p>No se encontraron archivos</p>
                      </td>
                    </tr>
                  ) : (
                    archivosFiltrados.map((archivo) => (
                      <tr key={archivo.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {archivo.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getIconoTipo(archivo.tipo)}
                            <Badge className={getBadgeTipo(archivo.tipo)}>
                              {archivo.tipo}
                            </Badge>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {archivo.nombre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatearFecha(archivo.fechaSubida)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatearTamaño(archivo.tamaño)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {archivo.subidoPor}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleVer(archivo)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Ver"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDescargar(archivo)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Descargar"
                            >
                              <Download className="h-4 w-4" />
                            </button>
                            {/* ✅ Botón Editar - Solo Subdirección y Dirección */}
                              <PermissionGate customCheck={(p) => p.nivel >= 3}>
                                <button
                                  onClick={() => handleIniciarEdicion(archivo)}
                                  className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                  title="Editar"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </button>
                              </PermissionGate>

                              {/* ✅ Botón Eliminar - Solo Dirección */}
                              <PermissionGate customCheck={(p) => p.nivel >= 4}>
                                <button
                                  onClick={() => handleIniciarEliminacion(archivo)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Eliminar"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </PermissionGate>
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
          <div className="mt-4 text-sm text-gray-600">
            Mostrando {archivosFiltrados.length} de {archivos.length} archivo(s)
          </div>
        </div>
      </div>

      {/* Modal de Edición */}
      {mostrarModalEditar && archivoEditando && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Editar Archivo
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del archivo
                </label>
                <input
                  type="text"
                  value={archivoEditando.nombre}
                  onChange={(e) => setArchivoEditando({
                    ...archivoEditando,
                    nombre: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo
                </label>
                <select
                  value={archivoEditando.tipo}
                  onChange={(e) => setArchivoEditando({
                    ...archivoEditando,
                    tipo: e.target.value as Archivo['tipo']
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="PDF">PDF</option>
                  <option value="Imagen">Imagen</option>
                  <option value="Video">Video</option>
                  <option value="Documento">Documento</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => {
                  setMostrarModalEditar(false);
                  setArchivoEditando(null);
                }}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleGuardarEdicion}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Guardar Cambios
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Eliminación */}
      {mostrarModalEliminar && archivoAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirmar Eliminación
            </h3>

            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar el archivo <strong>{archivoAEliminar.nombre}</strong>?
              Esta acción no se puede deshacer.
            </p>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setMostrarModalEliminar(false);
                  setArchivoAEliminar(null);
                }}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleConfirmarEliminacion}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ArchivosAdminPage;