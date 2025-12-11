// ======================================================
// PÁGINA: Anuncios CESFAM - CON BACKEND REAL
// Ubicación: src/pages/admin/AnunciosAdminPage.tsx
// Descripción: Vista unificada con control de permisos y datos reales
// ======================================================

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { FormularioComunicado, type FormularioComunicadoData } from '@/components/common/anuncios/FormularioComunicado';
import type { Announcement, AnnouncementCategory } from '@/types/announcement';
import { sortAnnouncementsByDate } from '@/data/mockAnnouncements';
import { 
  Megaphone, Shield, FileCheck, AlertCircle, Plus, 
  CheckCircle2, Edit, Trash2, Filter, Download, Eye 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Layout
import { UnifiedNavbar } from '@/components/common/layout/UnifiedNavbar';
import Footer from '@/components/common/layout/Footer';
import bannerHome from "@/components/images/banner_images/BannerAnuncios.png";
import Banner from "@/components/common/layout/Banner";

// ✅ SISTEMA DE PERMISOS
import { useAuth } from '@/api/contexts/AuthContext';
import { PermissionGate } from '@/components/common/PermissionGate';

// ✅ SERVICIO DE BACKEND
import { anunciosService } from '@/api/services/anunciosService';
import type { Anuncio, CrearAnuncioData, TipoAnuncio } from '@/api/services/anunciosService';

// ✅ ADAPTADOR
import { anunciosToAnnouncements, anuncioToAnnouncement, categoryToBackendTipo, dateToBackendString } from '@/utils/anunciosAdapter';

// ======================================================
// HELPER: Calcular permisos
// ======================================================
function useAnunciosPermisos() {
  const { user } = useAuth();
  
  const rolNombre = user?.rol_nombre?.toLowerCase() || '';
  const nivel = rolNombre.includes('direcci') && !rolNombre.includes('sub') ? 4
    : rolNombre.includes('subdirecci') ? 3
    : rolNombre.includes('jefe') || rolNombre.includes('jefa') ? 2
    : 1;
  
  return {
    nivel,
    puedeCrear: nivel >= 3,       // Subdirección y Dirección
    puedeEditar: nivel >= 3,      // Subdirección y Dirección
    puedeEliminar: nivel >= 3,    // Subdirección y Dirección
    esAdmin: nivel >= 3,
  };
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const AnunciosAdminPage: React.FC = () => {
  // ✅ Permisos
  const permisos = useAnunciosPermisos();

  // ======================================================
  // ESTADOS
  // ======================================================

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });
  const [comunicadoEditar, setComunicadoEditar] = useState<Announcement | undefined>();
  const [filterCategory, setFilterCategory] = useState<AnnouncementCategory | 'all'>('all');

  // ======================================================
  // EFECTOS - CARGA DE DATOS
  // ======================================================

  useEffect(() => {
    cargarAnuncios();
  }, []);

  // ======================================================
  // FUNCIONES DE BACKEND
  // ======================================================

  /**
   * Carga los anuncios desde el backend
   */
  const cargarAnuncios = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await anunciosService.getAll({ activo: true });
      const anunciosConvertidos = anunciosToAnnouncements(data);
      setAnnouncements(anunciosConvertidos);
    } catch (err) {
      console.error('Error al cargar anuncios:', err);
      setError('Error al cargar los anuncios. Por favor, intente nuevamente.');
      setAnnouncements([]); // Lista vacía en caso de error
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // DATOS PROCESADOS
  // ======================================================

  const sortedAnnouncements = useMemo(() => {
    let filtered = announcements;
    if (filterCategory !== 'all') {
      filtered = filtered.filter(a => a.category === filterCategory);
    }
    return sortAnnouncementsByDate(filtered);
  }, [announcements, filterCategory]);

  const stats = useMemo(() => {
    const totalAttachments = announcements.reduce(
      (sum, announcement) => sum + (announcement.attachments?.length || 0),
      0
    );
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const recentAnnouncements = announcements.filter(
      announcement => announcement.publicationDate >= lastWeek
    );
    const urgentCount = announcements.filter(
      a => a.category === 'urgente'
    ).length;

    return {
      total: announcements.length,
      recent: recentAnnouncements.length,
      attachments: totalAttachments,
      urgent: urgentCount
    };
  }, [announcements]);

  // ======================================================
  // MANEJADORES - CON BACKEND
  // ======================================================

  const mostrarMensajeExito = (title: string, description: string) => {
    setSuccessMessage({ title, description });
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleAgregarComunicado = async (formData: FormularioComunicadoData) => {
    try {
      // Convertir del formato frontend al backend
      const datosBackend: CrearAnuncioData = {
        titulo: formData.title,
        contenido: formData.description,
        tipo: categoryToBackendTipo(formData.category || 'general'),
        fecha_publicacion: formData.fecha_publicacion 
          ? dateToBackendString(formData.fecha_publicacion)
          : dateToBackendString(new Date()),
        fecha_expiracion: formData.fecha_expiracion 
          ? dateToBackendString(formData.fecha_expiracion)
          : null,
        es_destacado: false,
        prioridad: 1,
        para_todas_areas: formData.para_todas_areas,
        areas_destinatarias: formData.para_todas_areas ? [] : formData.areas_destinatarias,
        visibilidad_roles: formData.visibilidad_roles,
        activo: true,
      };

      // Crear en el backend
      const anuncioCreado = await anunciosService.create(datosBackend);
      
      // Subir imagen si existe
      if (formData.imagen) {
        await anunciosService.uploadImage(anuncioCreado.id, formData.imagen);
      }
      
      // TODO: Subir adjuntos si existen
      // if (formData.adjuntos && formData.adjuntos.length > 0) {
      //   for (const adjunto of formData.adjuntos) {
      //     await adjuntosService.upload(anuncioCreado.id, adjunto);
      //   }
      // }
      
      // Convertir al formato frontend y agregar a la lista
      const anuncioConvertido = anuncioToAnnouncement(anuncioCreado);
      setAnnouncements((prev) => [anuncioConvertido, ...prev]);
      
      mostrarMensajeExito('¡Comunicado publicado!', 'El comunicado ha sido publicado exitosamente');
    } catch (err) {
      console.error('Error al crear anuncio:', err);
      alert('Error al crear el comunicado. Por favor, intente nuevamente.');
    }
  };

  const handleEditarClick = (announcement: Announcement) => {
    setComunicadoEditar(announcement);
    setDialogOpen(true);
  };

  const handleGuardarEdicion = async (formData: FormularioComunicadoData) => {
    if (!comunicadoEditar) return;
    
    try {
      // Convertir del formato frontend al backend
      const datosBackend = {
        titulo: formData.title,
        contenido: formData.description,
        tipo: categoryToBackendTipo(formData.category || 'general') as TipoAnuncio,
        fecha_publicacion: formData.fecha_publicacion 
          ? dateToBackendString(formData.fecha_publicacion)
          : undefined,
        fecha_expiracion: formData.fecha_expiracion 
          ? dateToBackendString(formData.fecha_expiracion)
          : null,
        para_todas_areas: formData.para_todas_areas,
        areas_destinatarias: formData.para_todas_areas ? [] : formData.areas_destinatarias,
        visibilidad_roles: formData.visibilidad_roles,
      };

      // Actualizar en el backend
      const anuncioActualizado = await anunciosService.patch(comunicadoEditar.id, datosBackend);
      
      // Subir imagen si existe
      if (formData.imagen) {
        await anunciosService.uploadImage(anuncioActualizado.id, formData.imagen);
      }
      
      // Convertir al formato frontend y actualizar en la lista
      const anuncioConvertido = anuncioToAnnouncement(anuncioActualizado);
      setAnnouncements((prev) =>
        prev.map((comm) => (comm.id === comunicadoEditar.id ? anuncioConvertido : comm))
      );
      
      mostrarMensajeExito('¡Comunicado editado exitosamente!', 'El comunicado ha sido editado exitosamente');
      setComunicadoEditar(undefined);
    } catch (err) {
      console.error('Error al editar anuncio:', err);
      alert('Error al editar el comunicado. Por favor, intente nuevamente.');
    }
  };

  const handleEliminar = async (announcement: Announcement) => {
    const confirmar = window.confirm(`¿Está seguro que desea eliminar el comunicado "${announcement.title}"?`);
    if (confirmar) {
      try {
        // Eliminar en el backend
        await anunciosService.delete(announcement.id);
        
        // Eliminar de la lista local
        setAnnouncements((prev) => prev.filter((comm) => comm.id !== announcement.id));
        
        mostrarMensajeExito('¡Comunicado eliminado exitosamente!', 'El comunicado ha sido eliminado exitosamente');
      } catch (err) {
        console.error('Error al eliminar anuncio:', err);
        alert('Error al eliminar el comunicado. Por favor, intente nuevamente.');
      }
    }
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setComunicadoEditar(undefined);
    }
  };

  const handleExportar = () => {
    alert('Funcionalidad de exportación próximamente');
  };

  // ======================================================
  // HELPERS DE CATEGORÍA
  // ======================================================

  const getCategoryColor = (category: AnnouncementCategory) => {
  const colors: Record<AnnouncementCategory, string> = {
    general: 'bg-blue-100 text-blue-800 border-blue-300',
    urgente: 'bg-red-100 text-red-800 border-red-300',
    informativa: 'bg-green-100 text-green-800 border-green-300',
    normativa: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    administrativa: 'bg-gray-100 text-gray-800 border-gray-300',
  };
  return colors[category] || colors.general;
};

const getCategoryLabel = (category: AnnouncementCategory) => {
  const labels: Record<AnnouncementCategory, string> = {
    general: 'General',
    urgente: 'Urgente',
    informativa: 'Informativa',
    normativa: 'Normativa',
    administrativa: 'Administrativa',
  };
  return labels[category] || category;
};

  // ======================================================
  // RENDERIZADO
  // ======================================================

  return (
    <>
      <UnifiedNavbar />
      <div className="h-16" /> 

      <Banner
        imageSrc={bannerHome}
        title=""
        subtitle=""
        height="250px"
      />

      {/* Mensaje flotante de éxito */}
      {showSuccessMessage && (
        <div className="fixed top-24 right-4 z-50 animate-in slide-in-from-top-2">
          <div className="bg-white border-2 border-[#52FFB8] rounded-xl shadow-lg p-4 flex items-center gap-3">
            <div className="p-2 bg-[#52FFB8]/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-[#52FFB8]" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{successMessage.title}</p>
              <p className="text-sm text-gray-600">{successMessage.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          
          {/* ======================================================
              ESTADO DE CARGA
              ====================================================== */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#009DDC] mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando anuncios...</p>
              </div>
            </div>
          )}

          {/* ======================================================
              ESTADO DE ERROR
              ====================================================== */}
          {error && !loading && (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Error al cargar</h3>
                  <p className="text-sm text-gray-700">{error}</p>
                  <Button
                    onClick={cargarAnuncios}
                    className="mt-3 bg-red-600 hover:bg-red-700 text-white"
                    size="sm"
                  >
                    Reintentar
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================
              CONTENIDO PRINCIPAL
              ====================================================== */}
          {!loading && !error && (
            <>
          
          {/* ======================================================
              HEADER
              ====================================================== */}
          <header className="bg-white shadow-xl rounded-xl overflow-hidden mb-6">
            <div className="py-8 px-6">
              
              {/* Título y Botones */}
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-[#009DDC] to-[#0088c4] rounded-xl shadow-md">
                    <Megaphone className="w-6 h-6 text-white" />
                  </div>
                  
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                      {permisos.esAdmin ? 'Gestión de Comunicados' : 'Comunicados Oficiales'}
                    </h1>
                    <p className="text-gray-600 mt-1 text-sm">
                      {permisos.esAdmin 
                        ? 'Panel Administrativo · Vista de Edición'
                        : 'Anuncios e información oficial del CESFAM'
                      }
                    </p>
                  </div>
                </div>

                {/* ✅ Botones Admin (Solo con permisos) */}
                <PermissionGate customCheck={(p) => p.nivel >= 3}>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        setComunicadoEditar(undefined);
                        setDialogOpen(true);
                      }}
                      className="bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] hover:opacity-90 shadow-md text-gray-900 font-medium"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Publicar Nuevo
                    </Button>

                    <Button
                      variant="outline"
                      onClick={handleExportar}
                      className="border-2 border-gray-200 hover:border-[#009DDC]"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Exportar
                    </Button>
                  </div>
                </PermissionGate>
              </div>

              {/* Banner de estado */}
              <PermissionGate 
                customCheck={(p) => p.nivel >= 3}
                fallback={
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Eye className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Modo Lectura</h3>
                        <p className="text-sm text-gray-700">
                          Estás viendo los comunicados oficiales del CESFAM.
                        </p>
                      </div>
                    </div>
                  </div>
                }
              >
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Modo Administrador</h3>
                      <p className="text-sm text-gray-700">
                        Los cambios realizados aquí se reflejan inmediatamente en la página pública.
                      </p>
                    </div>
                  </div>
                </div>
              </PermissionGate>

              {/* Estadísticas */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 border-2 border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FileCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Total</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border-2 border-green-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <AlertCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Recientes</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.recent}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border-2 border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Megaphone className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Urgentes</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.urgent}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border-2 border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <FileCheck className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Archivos</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.attachments}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filtros */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 text-gray-700">
                  <Filter className="w-4 h-4" />
                  <span className="font-medium text-sm">Filtrar:</span>
                </div>
                
                  {(['all', 'general', 'urgente', 'informativa', 'normativa', 'administrativa'] as const).map((cat) => (                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filterCategory === cat
                        ? 'bg-[#009DDC] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat === 'all' ? 'Todos' : getCategoryLabel(cat as AnnouncementCategory)}
                  </button>
                ))}
              </div>

            </div>
          </header>

          {/* ======================================================
              LISTA DE ANUNCIOS
              ====================================================== */}
          <div className="space-y-4">
            {sortedAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Categoría */}
                    {announcement.category && (
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mb-3 ${getCategoryColor(announcement.category)}`}>
                        {getCategoryLabel(announcement.category)}
                      </span>
                    )}
                    {/* Título */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {announcement.title}
                    </h3>

                    {/* Descripción */}
                    <p className="text-gray-600 mb-3 leading-relaxed">
                      {announcement.description}
                    </p>

                    {/* Fecha */}
                    <p className="text-sm text-gray-500">
                      Publicado el {announcement.publicationDate.toLocaleDateString('es-CL')}
                    </p>

                    {/* Archivos adjuntos */}
                    {announcement.attachments && announcement.attachments.length > 0 && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-blue-600">
                        <FileCheck className="w-4 h-4" />
                        <span>{announcement.attachments.length} archivo(s) adjunto(s)</span>
                      </div>
                    )}
                  </div>

                  {/* ✅ Botones Admin (Solo con permisos) */}
                  <PermissionGate customCheck={(p) => p.nivel >= 3}>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditarClick(announcement)}
                        className="border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      {/* ✅ Botón Eliminar (Subdirección y Dirección) */}
                      <PermissionGate customCheck={(p) => p.nivel >= 3}>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEliminar(announcement)}
                          className="border-red-200 hover:border-red-400 hover:bg-red-50 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </PermissionGate>
                    </div>
                  </PermissionGate>
                </div>
              </div>
            ))}
          </div>

          {/* Fin del condicional !loading && !error */}
          </>
          )}

        </div>
      </div>

      <Footer />

      {/* ✅ Formulario (Solo para usuarios con permisos) */}
      <PermissionGate customCheck={(p) => p.nivel >= 3}>
        <FormularioComunicado
          open={dialogOpen}
          onOpenChange={handleDialogClose}
          onSubmit={comunicadoEditar ? handleGuardarEdicion : handleAgregarComunicado}
          comunicadoEditar={comunicadoEditar}
        />
      </PermissionGate>
    </>
  );
};

export default AnunciosAdminPage;