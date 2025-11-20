// ======================================================
// PÁGINA: Calendario Administrativo CESFAM
// Ubicación: src/pages/CalendarioAdmin.tsx
// Descripción: Vista administrativa con estética unificada
// ======================================================

'use client';

import React, { useState, useMemo } from 'react';
import { CalendarHeader } from '@/components/common/calendario/CalendarHeader';
import { CalendarGrid } from '@/components/common/calendario/CalendarGrid';
import { EventModal } from '@/components/common/calendario/EventModal';
import { EventFormModal } from '@/components/common/calendario/EventFormModal';
import { DeleteConfirmModal } from '@/components/common/calendario/DeleteConfirmModal';
import type { CalendarEvent } from '@/types/calendar';
import type { EventFormData } from '@/types/calendarAdmin';
import { mockEvents } from '@/data/mockEvents';
import { getPreviousMonth, getNextMonth } from '@/utils/dateUtils';
import { Plus, Shield } from 'lucide-react';

// Importaciones de Layout (Igual que la página pública)
import { NavbarAdmin } from '@/components/common/layout/NavbarAdmin';
import Footer from '@/components/common/layout/Footer';
import Banner from '@/components/common/layout/Banner';
import bannerHome from "@/components/images/banner_images/BannerCalendario.png";

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const CalendarioAdminPage: React.FC = () => {
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
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

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
    setSelectedDate(date);
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
  // MANEJADORES CRUD
  // ======================================================

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setFormMode('create');
    setIsFormModalOpen(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setFormMode('edit');
    setIsViewModalOpen(false);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (event: CalendarEvent) => {
    setEventToDelete(event);
    setIsViewModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEvent = (formData: EventFormData) => {
    if (formMode === 'create') {
      const newEvent: CalendarEvent = {
        id: Date.now(),
        titulo: formData.titulo,
        fecha: formData.fecha,
        horaInicio: formData.horaInicio,
        horaFin: formData.horaFin,
        descripcion: formData.descripcion,
        ubicacion: formData.ubicacion,
        tipo: formData.tipo,
        organizador: formData.organizador
      };
      setEvents([...events, newEvent]);
    } else {
      if (selectedEvent) {
        const updatedEvents = events.map(event =>
          event.id === selectedEvent.id
            ? { ...event, ...formData } // Spread simplificado para actualizar
            : event
        );
        setEvents(updatedEvents);
      }
    }
    setIsFormModalOpen(false);
    setSelectedEvent(null);
  };

  const handleConfirmDelete = () => {
    if (eventToDelete) {
      setEvents(events.filter(event => event.id !== eventToDelete.id));
      setEventToDelete(null);
    }
  };

  // ======================================================
  // DATOS PROCESADOS (Estadísticas)
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
      {/* 1. Navbar y Banner igual que la página pública */}
      <NavbarAdmin />
      <div className="h-16" /> 
      
      <Banner
        imageSrc={bannerHome}
        title=""
        subtitle=""
        height="250px"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          
          {/* BARRA DE HERRAMIENTAS DE ADMIN */}
          {/* Aquí colocamos el botón funcional y las estadísticas de forma estética */}
          <div className="mb-8 space-y-6">
            
            {/* Fila superior: Indicador Admin y Botón Crear */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-blue-100">
              <div className="flex items-center gap-3 text-blue-800">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Panel de Gestión</h2>
                  <p className="text-sm text-gray-500">Modo Administrador Activo</p>
                </div>
              </div>

              {/* ESTE ES EL BOTÓN QUE FUNCIONA */}
              <button
                onClick={handleCreateEvent}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                Crear Nuevo Evento
              </button>
            </div>

            {/* Fila de estadísticas (Mantenemos esto porque es útil para admin, pero con estilo limpio) */}
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

          {/* ======================================================
              HEADER DEL CALENDARIO 
              IMPORTANTE: showAddButton={false} para eliminar el botón roto interno
              ====================================================== */}
          <CalendarHeader
            currentDate={currentDate}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
            onToday={handleToday}
            showAddButton={false} 
          />

          {/* ======================================================
              CUADRÍCULA DEL CALENDARIO
              ====================================================== */}
          <CalendarGrid
            currentDate={currentDate}
            selectedDate={selectedDate}
            events={events}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />

          {/* ======================================================
              MODALES (CRUD)
              ====================================================== */}
          
          {/* Modal de Ver (con opciones admin activadas) */}
          <EventModal
            event={selectedEvent}
            isOpen={isViewModalOpen}
            onClose={handleCloseViewModal}
            isAdminView={true}
            onEdit={handleEditEvent}
            onDelete={handleDeleteClick}
          />

          {/* Modal de Formulario (Crear/Editar) */}
          <EventFormModal
            isOpen={isFormModalOpen}
            onClose={() => {
              setIsFormModalOpen(false);
              setSelectedEvent(null);
            }}
            onSave={handleSaveEvent}
            initialData={selectedEvent}
            mode={formMode}
          />

          {/* Modal de Confirmar Eliminación */}
          <DeleteConfirmModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setEventToDelete(null);
            }}
            onConfirm={handleConfirmDelete}
            eventTitle={eventToDelete?.titulo || ''}
          />

        </div>
      </div>
      
      {/* Footer igual que la página pública */}
      <Footer />
    </>
  );
};

export default CalendarioAdminPage;