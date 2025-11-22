// ======================================================
// PÁGINA: Calendario Administrativo CESFAM - CON PERMISOS
// Ubicación: src/pages/admin/CalendarioAdminPage.tsx
// Descripción: Vista administrativa con control de permisos por rol
// ======================================================

'use client';

import React, { useState, useMemo } from 'react';
import { CalendarHeader } from '@/components/common/calendario/CalendarHeader';
import { CalendarGrid } from '@/components/common/calendario/CalendarGrid';
import { EventModal } from '@/components/common/calendario/EventModal';
import { SelectTypeModal } from '@/components/common/calendario/SelectTypeModal';
import { ActividadFormWrapper } from '@/components/common/calendario/ActividadFormWrapper';
import { AnuncioFormWrapper } from '@/components/common/calendario/AnuncioFormWrapper';
import { DeleteConfirmModal } from '@/components/common/calendario/DeleteConfirmModal';
import type { CalendarEvent } from '@/types/calendar';
import type { Activity } from '@/types/activity';
import type { Announcement } from '@/types/announcement';
import { mockEvents } from '@/data/mockEvents';
import { getPreviousMonth, getNextMonth } from '@/utils/dateUtils';
import { Shield, Plus } from 'lucide-react';

// Layout
import { UnifiedNavbar } from '@/components/common/layout/UnifiedNavbar';
import Footer from '@/components/common/layout/Footer';
import Banner from '@/components/common/layout/Banner';
import bannerHome from "@/components/images/banner_images/BannerCalendario.png";

// ✅ SISTEMA DE PERMISOS
import { useAuth } from '@/api/contexts/AuthContext';
import { PermissionGate } from '@/components/common/PermissionGate';

// ======================================================
// HELPER: Calcular permisos
// ======================================================
function useCalendarioPermisos() {
  const { user } = useAuth();
  
  const rolNombre = user?.rol_nombre?.toLowerCase() || '';
  const nivel = rolNombre.includes('direcci') && !rolNombre.includes('sub') ? 4
    : rolNombre.includes('subdirecci') ? 3
    : rolNombre.includes('jefe') || rolNombre.includes('jefa') ? 2
    : 1;
  
  return {
    nivel,
    puedeEditar: nivel >= 3,      // Subdirección y Dirección
    puedeEliminar: nivel >= 4,    // Solo Dirección
    esAdmin: nivel >= 3,          // Para mostrar panel admin
  };
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const CalendarioAdminPage: React.FC = () => {
  // ✅ Permisos
  const permisos = useCalendarioPermisos();

  // ======================================================
  // ESTADOS
  // ======================================================

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [eventToDelete, setEventToDelete] = useState<CalendarEvent | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  
  // Modales
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isSelectTypeModalOpen, setIsSelectTypeModalOpen] = useState<boolean>(false);
  const [isActividadFormOpen, setIsActividadFormOpen] = useState<boolean>(false);
  const [isAnuncioFormOpen, setIsAnuncioFormOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  // ======================================================
  // MANEJADORES DE NAVEGACIÓN
  // ======================================================

  const handlePreviousMonth = () => {
    setCurrentDate(getPreviousMonth(currentDate));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(getNextMonth(currentDate));
    setSelectedDate(null);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // ======================================================
  // MANEJADORES DE EVENTOS
  // ======================================================

  const handleDateClick = (date: Date) => {
    // ✅ Solo abrir modal si tiene permisos para crear
    if (permisos.puedeEditar) {
      setSelectedDate(date);
      setIsSelectTypeModalOpen(true);
    } else {
      // Usuario sin permisos solo selecciona la fecha
      setSelectedDate(date);
    }
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedEvent(null);
  };

  // ======================================================
  // MANEJADORES CRUD (Solo para usuarios con permisos)
  // ======================================================

  const handleCreateEvent = () => {
    setSelectedDate(new Date());
    setSelectedEvent(null);
    setIsSelectTypeModalOpen(true);
  };

  const handleSelectActividad = () => {
    setIsSelectTypeModalOpen(false);
    setIsActividadFormOpen(true);
  };

  const handleSelectAnuncio = () => {
    setIsSelectTypeModalOpen(false);
    setIsAnuncioFormOpen(true);
  };

  const handleSaveActividad = (actividadData: Omit<Activity, 'id'>) => {
    const newId = (events.length + 1).toString();
    
    const newEvent: CalendarEvent = {
      id: parseInt(newId),
      fecha: actividadData.date.toISOString().split('T')[0],
      titulo: actividadData.title,
      descripcion: actividadData.description,
      tipo: 'otro',
      horaInicio: actividadData.date.toTimeString().slice(0, 5),
      horaFin: '',
      ubicacion: actividadData.location,
      organizador: 'Sistema'
    };

    setEvents([...events, newEvent]);
    setIsActividadFormOpen(false);
    setSelectedDate(null);
    
    console.log('✅ Actividad creada:', actividadData);
  };

  const handleSaveAnuncio = (anuncioData: Omit<Announcement, 'id' | 'publicationDate'>) => {
    const newId = (events.length + 1).toString();
    
    const newEvent: CalendarEvent = {
      id: parseInt(newId),
      fecha: selectedDate?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
      titulo: anuncioData.title,
      descripcion: anuncioData.description,
      tipo: 'otro',
      horaInicio: '00:00',
      horaFin: '23:59',
      organizador: 'Dirección'
    };

    setEvents([...events, newEvent]);
    setIsAnuncioFormOpen(false);
    setSelectedDate(null);
    
    console.log('✅ Anuncio creado:', anuncioData);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsViewModalOpen(false);
    setIsActividadFormOpen(true);
  };

  const handleDeleteClick = (event: CalendarEvent) => {
    setEventToDelete(event);
    setIsViewModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (eventToDelete) {
      setEvents(events.filter(event => event.id !== eventToDelete.id));
      setEventToDelete(null);
    }
  };

  // ======================================================
  // ESTADÍSTICAS
  // ======================================================
  const stats = useMemo(() => {
    const now = new Date();
    const upcomingEvents = events.filter(event => new Date(event.fecha) >= now);
    return {
      total: events.length,
      upcoming: upcomingEvents.length,
      thisMonth: events.filter(event => {
        const eventDate = new Date(event.fecha);
        return eventDate.getMonth() === now.getMonth() &&
               eventDate.getFullYear() === now.getFullYear();
      }).length
    };
  }, [events]);

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

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          
          {/* ======================================================
              PANEL ADMINISTRATIVO (Solo con permisos)
              ====================================================== */}
          <PermissionGate 
            customCheck={(p) => p.nivel >= 3}
            fallback={
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  📅 <strong>Modo Vista:</strong> Puedes ver eventos pero no crear o modificar.
                </p>
              </div>
            }
          >
            <div className="mb-8 space-y-6">
              
              {/* Barra de herramientas admin */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                <div className="flex items-center gap-3 text-blue-800">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Panel de Gestión</h2>
                    <p className="text-sm text-gray-500">
                      {permisos.nivel === 4 ? 'Dirección' : 'Subdirección'} - Modo Administrador
                    </p>
                  </div>
                </div>

                {/* ✅ Botón Crear (Solo con permisos de edición) */}
                <button
                  onClick={handleCreateEvent}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  <Plus className="w-5 h-5" />
                  Crear Nuevo Evento
                </button>
              </div>

              {/* Estadísticas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500 flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Total Eventos</span>
                  <span className="text-2xl font-bold text-gray-900">{stats.total}</span>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500 flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Próximos</span>
                  <span className="text-2xl font-bold text-gray-900">{stats.upcoming}</span>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-500 flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Este Mes</span>
                  <span className="text-2xl font-bold text-gray-900">{stats.thisMonth}</span>
                </div>
              </div>
            </div>
          </PermissionGate>

          {/* ======================================================
              CALENDARIO
              ====================================================== */}
          <CalendarHeader
            currentDate={currentDate}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
            onToday={handleToday}
            showAddButton={false} 
          />

          <CalendarGrid
            currentDate={currentDate}
            selectedDate={selectedDate}
            events={events}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />

          {/* ======================================================
              MODAL DE VISTA DE EVENTO
              Con botones condicionales según permisos
              ====================================================== */}
          <EventModal
            event={selectedEvent}
            isOpen={isViewModalOpen}
            onClose={handleCloseViewModal}
            isAdminView={permisos.puedeEditar} // ✅ Solo mostrar botones si puede editar
            onEdit={permisos.puedeEditar ? handleEditEvent : undefined}
            onDelete={permisos.puedeEliminar ? handleDeleteClick : undefined}
          />

          {/* ======================================================
              MODALES DE CREACIÓN/EDICIÓN
              Solo se renderizan si tiene permisos
              ====================================================== */}
          <PermissionGate customCheck={(p) => p.nivel >= 3}>
            <SelectTypeModal
              isOpen={isSelectTypeModalOpen}
              onClose={() => {
                setIsSelectTypeModalOpen(false);
                setSelectedDate(null);
              }}
              onSelectActividad={handleSelectActividad}
              onSelectAnuncio={handleSelectAnuncio}
              selectedDate={selectedDate}
            />

            <ActividadFormWrapper
              isOpen={isActividadFormOpen}
              onClose={() => {
                setIsActividadFormOpen(false);
                setSelectedDate(null);
              }}
              onSave={handleSaveActividad}
              initialDate={selectedDate}
            />

            <AnuncioFormWrapper
              isOpen={isAnuncioFormOpen}
              onClose={() => {
                setIsAnuncioFormOpen(false);
                setSelectedDate(null);
              }}
              onSave={handleSaveAnuncio}
              initialDate={selectedDate}
            />
          </PermissionGate>

          {/* ✅ Modal de eliminación solo para Dirección */}
          <PermissionGate customCheck={(p) => p.nivel >= 4}>
            <DeleteConfirmModal
              isOpen={isDeleteModalOpen}
              onClose={() => {
                setIsDeleteModalOpen(false);
                setEventToDelete(null);
              }}
              onConfirm={handleConfirmDelete}
              eventTitle={eventToDelete?.titulo || ''}
            />
          </PermissionGate>

        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default CalendarioAdminPage;