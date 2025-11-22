// ======================================================
// CALENDARIO PAGE - VERSIÓN SIMPLE CON PERMISOS
// Ubicación: src/pages/general/CalendarioPage.tsx
// ======================================================

import React, { useState } from 'react';
import CalendarHeader from '@/components/common/calendario/CalendarHeader';
import CalendarGrid from '@/components/common/calendario/CalendarGrid';
import { EventModal } from '@/components/common/calendario/EventModal';
import type { CalendarEvent } from '@/types/calendar';
import { mockEvents } from '@/data/mockEvents';
import { getPreviousMonth, getNextMonth } from '@/utils/dateUtils';
import { UnifiedNavbar } from '@/components/common/layout/UnifiedNavbar';
import Footer from '@/components/common/layout/Footer';
import Banner from '@/components/common/layout/Banner';
import bannerHome from "@/components/images/banner_images/BannerCalendario.png";

// ✅ Sistema de permisos
import { useAuth } from '@/api/contexts/AuthContext';

// ======================================================
// FUNCIÓN HELPER PARA PERMISOS
// ======================================================
function useCalendarioPermisos() {
  const { user } = useAuth();
  
  // Determinar nivel basado en el rol
  const rolNombre = user?.rol_nombre?.toLowerCase() || '';
  const nivel = rolNombre.includes('direcci') && !rolNombre.includes('sub') ? 4
    : rolNombre.includes('subdirecci') ? 3
    : rolNombre.includes('jefe') || rolNombre.includes('jefa') ? 2
    : 1;
  
  return {
    puedeEditar: nivel >= 3, // Subdirección y Dirección
    puedeEliminar: nivel >= 4, // Solo Dirección
  };
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

const CalendarioPage: React.FC = () => {
  // Permisos
  const permisos = useCalendarioPermisos();

  // Estados
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [events] = useState<CalendarEvent[]>(mockEvents);

  // Manejadores de navegación
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

  // Manejadores de eventos
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
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

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          
          {/* ======================================================
              INFO DE PERMISOS (Temporal - para debug)
              ====================================================== */}
          {import.meta.env.DEV && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Tus permisos:</strong> 
                {permisos.puedeEditar ? ' ✅ Puede editar' : ' ❌ Solo lectura'}
                {permisos.puedeEliminar ? ' ✅ Puede eliminar' : ''}
              </p>
            </div>
          )}

          {/* ======================================================
              CABECERA DEL CALENDARIO
              ====================================================== */}
          <CalendarHeader
            currentDate={currentDate}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
            onToday={handleToday}
            showAddButton={permisos.puedeEditar}
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
              MODAL DE DETALLES DEL EVENTO
              ====================================================== */}
          <EventModal
            event={selectedEvent}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />

          {/* ======================================================
              MENSAJE PARA USUARIOS SIN PERMISOS
              ====================================================== */}
          {!permisos.puedeEditar && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ℹ️ Estás en modo de solo lectura. Si necesitas crear o editar eventos, 
                contacta a tu jefatura o dirección.
              </p>
            </div>
          )}

        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default CalendarioPage;