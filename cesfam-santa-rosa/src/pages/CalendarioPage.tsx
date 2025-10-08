// ======================================================
// PÁGINA PRINCIPAL: Calendario Institucional CESFAM
// Ubicación: src/pages/Calendario.tsx
// Descripción: Vista principal que ensambla todos los componentes del calendario
// ======================================================

import React, { useState } from 'react';
import CalendarHeader from '@/components/common/calendario/CalendarHeader';
import CalendarGrid from '@/components/common/calendario/CalendarGrid';
import { EventModal } from '../components/common/calendario/EventModal';
import type { CalendarEvent } from '../types/calendar';
import { mockEvents } from '../data/mockEvents';
import { getPreviousMonth, getNextMonth } from '../utils/dateUtils';
import { Navbar } from '@/components/common/layout/Navbar';
import Footer from '@/components/common/layout/Footer';

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

const CalendarioPage: React.FC = () => {
  // ======================================================
  // ESTADOS
  // ======================================================

  // Fecha actual que se está visualizando en el calendario
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  
  // Fecha seleccionada por el usuario
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Evento seleccionado para mostrar en el modal
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  
  // Estado del modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // Eventos del calendario (en producción vendrían de una API)
  const [events] = useState<CalendarEvent[]>(mockEvents);

  // ======================================================
  // MANEJADORES DE NAVEGACIÓN
  // ======================================================

  /**
   * Navega al mes anterior
   */
  const handlePreviousMonth = () => {
    setCurrentDate(getPreviousMonth(currentDate));
    setSelectedDate(null);
  };

  /**
   * Navega al mes siguiente
   */
  const handleNextMonth = () => {
    setCurrentDate(getNextMonth(currentDate));
    setSelectedDate(null);
  };

  /**
   * Vuelve al mes actual (hoy)
   */
  const handleToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // ======================================================
  // MANEJADORES DE EVENTOS
  // ======================================================

  /**
   * Maneja el clic en una fecha del calendario
   */
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  /**
   * Maneja el clic en un evento específico
   */
  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  /**
   * Cierra el modal de detalles del evento
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // ======================================================
  // RENDERIZADO
  // ======================================================

  return (
    <>
    {/* Navbar */}
      <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 p-4 md:p-8">
      {/* Contenedor principal con ancho máximo */}
      <div className="max-w-[1600px] mx-auto">
        
        {/* ======================================================
            CABECERA DEL CALENDARIO
            ====================================================== */}
        <CalendarHeader
          currentDate={currentDate}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
          showAddButton={false} // false = Vista Funcionario, true = Vista Admin
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
            PIE DE PÁGINA INFORMATIVO
            ====================================================== */}
        
      </div>

      {/* ======================================================
          NOTAS PARA DESARROLLO FUTURO - FUNCIONALIDAD ADMINISTRATIVA
          ======================================================
          
          Para habilitar funcionalidades administrativas:
          
          1. Cambiar showAddButton={true} en CalendarHeader
          
          2. Implementar sistema de roles/permisos:
             - Crear contexto de autenticación
             - Verificar rol del usuario (admin/funcionario)
             - Mostrar/ocultar botones según permisos
          
          3. Agregar formulario de creación de eventos:
             - Crear componente EventForm.tsx
             - Implementar validaciones
             - Conectar con API backend
          
          4. Implementar acciones CRUD:
             - POST /api/events (crear)
             - PUT /api/events/:id (editar)
             - DELETE /api/events/:id (eliminar)
          
          5. Agregar confirmaciones:
             - Dialog de confirmación para eliminar
             - Toast notifications para feedback
          
          6. Implementar filtros adicionales:
             - Por tipo de evento
             - Por organizador
             - Búsqueda de eventos
          
          Ejemplo de estructura con permisos:
          
          const { user } = useAuth();
          const isAdmin = user?.role === 'admin';
          
          <CalendarHeader 
            showAddButton={isAdmin}
            ...
          />
          
          En EventModal, mostrar botones solo si isAdmin:
          
          {isAdmin && (
            <div className="flex gap-3">
              <Button onClick={() => handleEdit(event)}>Editar</Button>
              <Button onClick={() => handleDelete(event)}>Eliminar</Button>
            </div>
          )}
      ====================================================== */}
    </div>
    <Footer></Footer>
    </>
  );
};

// ======================================================
// EXPORT
// ======================================================

export default CalendarioPage;