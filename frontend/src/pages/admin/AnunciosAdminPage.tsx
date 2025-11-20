// ======================================================
// PÁGINA ADMINISTRATIVA: Comunicados Oficiales CESFAM
// Ubicación: src/pages/ComunicadosOficialesAdmin.tsx
// Descripción: Panel administrativo con estética pública
// ======================================================

'use client';

import React, { useState, useMemo } from 'react';
import { FormularioComunicado } from '@/components/common/anuncios/FormularioComunicado';
import type { Announcement, AnnouncementCategory } from '@/types/announcement';
import { mockAnnouncements, sortAnnouncementsByDate } from '@/data/mockAnnouncements';
import { 
  Megaphone, Shield, FileCheck, AlertCircle, Plus, 
  CheckCircle2, Edit, Trash2, Filter, Download 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Importaciones de Layout (Igual que en la página pública)
import { NavbarAdmin } from '@/components/common/layout/NavbarAdmin';
import Footer from '@/components/common/layout/Footer';
import bannerHome from "@/components/images/banner_images/BannerAnuncios.png";
import Banner from "@/components/common/layout/Banner";

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const AnunciosAdminPage: React.FC = () => {
  // ======================================================
  // ESTADOS (Sin cambios)
  // ======================================================

  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });
  const [comunicadoEditar, setComunicadoEditar] = useState<Announcement | undefined>();
  const [filterCategory, setFilterCategory] = useState<AnnouncementCategory | 'all'>('all');

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
  // MANEJADORES (Sin cambios)
  // ======================================================

  const mostrarMensajeExito = (title: string, description: string) => {
    setSuccessMessage({ title, description });
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleAgregarComunicado = (nuevoComunicado: Omit<Announcement, 'id' | 'publicationDate'>) => {
    const nuevoId = `ANN${(announcements.length + 1).toString().padStart(3, '0')}`;
    const comunicadoCompleto: Announcement = {
      id: nuevoId,
      ...nuevoComunicado,
      publicationDate: new Date(),
    };
    setAnnouncements((prev) => [comunicadoCompleto, ...prev]);
    mostrarMensajeExito('¡Comunicado publicado!', 'El comunicado ha sido publicado exitosamente');
  };

  const handleEditarClick = (announcement: Announcement) => {
    setComunicadoEditar(announcement);
    setDialogOpen(true);
  };

  const handleGuardarEdicion = (comunicadoEditado: Omit<Announcement, 'id' | 'publicationDate'>) => {
    if (!comunicadoEditar) return;
    setAnnouncements((prev) =>
      prev.map((comm) =>
        comm.id === comunicadoEditar.id
          ? { ...comunicadoEditado, id: comunicadoEditar.id, publicationDate: comunicadoEditar.publicationDate }
          : comm
      )
    );
    mostrarMensajeExito('¡Comunicado editado exitosamente!', 'El comunicado ha sido editado exitosamente');
    setComunicadoEditar(undefined);
  };

  const handleEliminar = (announcement: Announcement) => {
    const confirmar = window.confirm(`¿Está seguro que desea eliminar el comunicado "${announcement.title}"?`);
    if (confirmar) {
      setAnnouncements((prev) => prev.filter((comm) => comm.id !== announcement.id));
      mostrarMensajeExito('¡Comunicado eliminado exitosamente!', 'El comunicado ha sido eliminado exitosamente');
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
  // RENDERIZADO (Estructura actualizada a estilo Público)
  // ======================================================

  return (
    <>
      {/* 1. Navbar Global */}
      <NavbarAdmin />
      <div className="h-16" /> 

      {/* 2. Banner idéntico a la pública */}
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

      {/* 3. Contenedor Principal (Estética idéntica a AnunciosPage) */}
      <div className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          
          {/* HEADER DE LA TARJETA (Contenedor blanco redondeado) */}
          <header className="bg-white shadow-xl rounded-xl overflow-hidden mb-6">
            <div className="py-8 px-6">
              
              {/* Título y Botones de Admin */}
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-[#009DDC] to-[#0088c4] rounded-xl shadow-md">
                    <Megaphone className="w-6 h-6 text-white" />
                  </div>
                  
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                      Gestión de Comunicados
                    </h1>
                    <p className="text-gray-600 mt-1 text-sm">
                      Panel Administrativo · Vista de Edición
                    </p>
                  </div>
                </div>

                {/* Botones de acción (Admin) */}
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
              </div>

              {/* Banner de Advertencia Admin (Estilo integrado) */}
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

              {/* Estadísticas (Grid ajustado) */}
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
                      <p className="text-sm text-gray-600 font-medium">Adjuntos</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.attachments}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border-2 border-red-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-100 rounded-lg">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Urgentes</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.urgent}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filtros (Mantenemos la funcionalidad admin pero con estilo limpio) */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as AnnouncementCategory | 'all')}
                  className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#009DDC] transition-colors text-sm font-medium"
                >
                  <option value="all">Todas las categorías</option>
                  <option value="general">📋 General</option>
                  <option value="urgente">🚨 Urgente</option>
                  <option value="normativa">📜 Normativa</option>
                  <option value="administrativa">🏢 Administrativa</option>
                  <option value="informativa">📰 Informativa</option>
                </select>
                
                {filterCategory !== 'all' && (
                  <span className="text-sm text-gray-600 ml-auto">
                    Filtrando: <span className="font-bold text-[#009DDC]">{sortedAnnouncements.length}</span> resultados
                  </span>
                )}
              </div>
            </div>
          </header>

          {/* LISTA DE COMUNICADOS (Dentro del layout público) */}
          <main className="py-4 space-y-4">
            {sortedAnnouncements.map((announcement) => (
              <div key={announcement.id} className="relative group">
                {/* Card del comunicado (Diseño idéntico al público pero con acciones) */}
                <div className="bg-white rounded-xl shadow-md border-2 border-gray-100 hover:border-[#009DDC] transition-all p-6">
                  
                  {/* Botones de acción Admin (Flotantes y más estilizados) */}
                  <div className="absolute top-6 right-6 flex gap-2 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditarClick(announcement)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEliminar(announcement)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Contenido del comunicado */}
                  <div className="flex items-start gap-5 pr-24"> {/* pr-24 para dejar espacio a botones */}
                    
                    {/* Icono Categoria */}
                    <div className={`
                      p-4 rounded-xl flex-shrink-0
                      ${announcement.category === 'urgente' ? 'bg-red-50' : 
                        announcement.category === 'normativa' ? 'bg-purple-50' : 
                        announcement.category === 'informativa' ? 'bg-green-50' :
                        announcement.category === 'administrativa' ? 'bg-orange-50' : 'bg-blue-50'}
                    `}>
                      <Megaphone className={`
                        w-6 h-6
                        ${announcement.category === 'urgente' ? 'text-red-600' : 
                          announcement.category === 'normativa' ? 'text-purple-600' : 
                          announcement.category === 'informativa' ? 'text-green-600' :
                          announcement.category === 'administrativa' ? 'text-orange-600' : 'text-blue-600'}
                      `} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`
                          px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide
                          ${announcement.category === 'urgente' ? 'bg-red-100 text-red-700' : 
                            announcement.category === 'normativa' ? 'bg-purple-100 text-purple-700' : 
                            announcement.category === 'informativa' ? 'bg-green-100 text-green-700' :
                            announcement.category === 'administrativa' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}
                        `}>
                          {announcement.category}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500 font-medium">
                           ID: {announcement.id}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                        {announcement.title}
                      </h3>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1.5">
                          📅 {announcement.publicationDate.toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        {announcement.attachments && announcement.attachments.length > 0 && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <span className="flex items-center gap-1.5">
                              📎 {announcement.attachments.length} adjunto{announcement.attachments.length > 1 ? 's' : ''}
                            </span>
                          </>
                        )}
                      </div>

                      <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                        {announcement.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {sortedAnnouncements.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-200">
                <Megaphone className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No hay comunicados</h3>
                <p className="text-gray-500">Intenta cambiar los filtros o crea uno nuevo</p>
              </div>
            )}
          </main>

        </div>
      </div>

      {/* 4. Footer Global */}
      <Footer />

      {/* MODAL DE FORMULARIO (Funcionalidad intacta) */}
      <FormularioComunicado
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        onSubmit={comunicadoEditar ? handleGuardarEdicion : handleAgregarComunicado}
        comunicadoEditar={comunicadoEditar}
      />
    </>
  );
};