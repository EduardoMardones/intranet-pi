// ======================================================
// PÁGINA: Calendario CESFAM - SOLO LECTURA
// Ubicación: src/pages/admin/CalendarioAdminPage.tsx
// ======================================================

'use client';

import React, { useState, useEffect } from 'react';
import { CalendarHeader } from '@/components/common/calendario/CalendarHeader';
import { CalendarGrid } from '@/components/common/calendario/CalendarGrid';
import { EventModal } from '@/components/common/calendario/EventModal';
import type { CalendarEvent } from '@/types/calendar';
import { getPreviousMonth, getNextMonth } from '@/utils/dateUtils';
import { ExternalLink } from 'lucide-react';

// Layout
import { UnifiedNavbar } from '@/components/common/layout/UnifiedNavbar';
import Footer from '@/components/common/layout/Footer';
import Banner from '@/components/common/layout/Banner';
import bannerHome from "@/components/images/banner_images/BannerCalendario.png";

// Servicios
import { useAuth } from '@/api/contexts/AuthContext';
import { anunciosService, actividadesService } from '@/api/services';
import type { Anuncio } from '@/api/services/anunciosService';
import type { Actividad } from '@/api/services/actividadesService';

// ======================================================
// CONVERSORES
// ======================================================

function anuncioToCalendarEvent(anuncio: Anuncio): CalendarEvent {
  return {
    id: parseInt(anuncio.id) || 0,
    fecha: new Date(anuncio.fecha_publicacion).toISOString().split('T')[0],
    titulo: anuncio.titulo,
    descripcion: anuncio.contenido,
    tipo: 'anuncio', // Naranja
    organizador: anuncio.creado_por_nombre || 'Sistema',
  };
}

function actividadToCalendarEvent(actividad: Actividad): CalendarEvent {
  return {
    id: parseInt(actividad.id) || 0,
    fecha: new Date(actividad.fecha_inicio).toISOString().split('T')[0],
    titulo: actividad.titulo,
    descripcion: actividad.descripcion || '',
    tipo: 'reunion',
    ubicacion: actividad.ubicacion,
    horaInicio: actividad.fecha_inicio ? new Date(actividad.fecha_inicio).toTimeString().slice(0, 5) : undefined,
  };
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const CalendarioAdminPage: React.FC = () => {
  const { user } = useAuth();

  // Estados
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [eventType, setEventType] = useState<'anuncio' | 'actividad' | 'feriado' | null>(null);

  // ======================================================
  // CARGAR EVENTOS
  // ======================================================

  useEffect(() => {
    if (user) {
      cargarEventos();
    }
  }, [user]);

  const cargarFeriados = async (): Promise<CalendarEvent[]> => {
    try {
      console.log(`📅 Cargando feriados desde boostr.cl...`);
      const response = await fetch('https://api.boostr.cl/holidays.json');
      
      if (!response.ok) {
        console.warn(`⚠️ Error al cargar feriados:`, response.status);
        return [];
      }
      
      const result = await response.json();
      
      if (result.status !== 'success' || !result.data) {
        console.warn('⚠️ Respuesta inesperada de la API de feriados');
        return [];
      }
      
      const feriados = result.data;
      console.log(`✅ ${feriados.length} feriados cargados`);
      
      const feriadosConvertidos = feriados.map((feriado: any, index: number) => ({
        id: 900000 + index, // ID único para feriados
        fecha: feriado.date,
        titulo: feriado.title,
        descripcion: feriado.inalienable 
          ? `Feriado ${feriado.type} (Irrenunciable)` 
          : `Feriado ${feriado.type}`,
        tipo: 'feriado' as const,
        // organizador omitido intencionalmente para feriados
      }));
      
      console.log(`🎯 Primer feriado:`, feriadosConvertidos[0]);
      return feriadosConvertidos;
    } catch (error) {
      console.error('❌ Error al cargar feriados:', error);
      return [];
    }
  };

  const cargarEventos = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // ======================================================
      // CARGAR TODO EN PARALELO PARA MAYOR VELOCIDAD
      // ======================================================
      const [feriados, anunciosData, actividadesData] = await Promise.all([
        cargarFeriados(),
        anunciosService.getVigentes(),
        actividadesService.getAll({ activa: true }),
      ]);
      
      console.log(`📊 Eventos cargados - Feriados: ${feriados.length}, Anuncios: ${anunciosData.length}, Actividades: ${actividadesData.length}`);
      
      // Filtrar anuncios según permisos del usuario
      const anunciosFiltrados = anunciosData.filter((anuncio: Anuncio) => {
        // Si es para todas las áreas
        if (anuncio.para_todas_areas) return true;
        
        // Si es para el área del usuario
        if (anuncio.areas_destinatarias?.includes(user.area_nombre || '')) return true;
        
        // Filtrar por visibilidad de roles
        const userRolNivel = user.rol_nivel || 1;
        
        switch (anuncio.visibilidad_roles) {
          case 'solo_funcionarios':
            return userRolNivel === 1;
          case 'solo_jefatura':
            return userRolNivel === 2;
          case 'funcionarios_y_jefatura':
            return userRolNivel <= 2;
          case 'solo_direccion':
            return userRolNivel >= 3;
          default:
            return true;
        }
      });
      
      // ======================================================
      // CONVERTIR A EVENTOS DE CALENDARIO
      // ======================================================
      const eventosAnuncios = anunciosFiltrados.map(anuncioToCalendarEvent);
      const eventosActividades = actividadesData.map(actividadToCalendarEvent);
      
      console.log(`🎨 Eventos finales - Anuncios: ${eventosAnuncios.length}, Actividades: ${eventosActividades.length}, Feriados: ${feriados.length}`);
      
      setEvents([...eventosAnuncios, ...eventosActividades, ...feriados]);
    } catch (error) {
      console.error('Error al cargar eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // NAVEGACIÓN
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
  // EVENTOS
  // ======================================================

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsViewModalOpen(true);
    
    // Determinar tipo basado en el evento
    if (event.tipo === 'feriado') {
      setEventType('feriado');
    } else if (event.organizador && event.organizador !== 'Sistema') {
      setEventType('anuncio');
    } else {
      setEventType('actividad');
    }
  };

  // ======================================================
  // NAVEGACIÓN A VISTAS DE EDICIÓN
  // ======================================================

  const handleGoToEdit = () => {
    if (eventType === 'feriado') {
      // Los feriados no se pueden editar
      return;
    }
    
    if (eventType === 'anuncio') {
      window.location.href = '/admin/anuncios';
    } else {
      window.location.href = '/admin/actividades';
    }
  };

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedNavbar />
      <div className="h-16" />
      <Banner title="" imageSrc={bannerHome} height="250px" />

      <div className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          

          {/* Calendario */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#009DDC]"></div>
              <p className="text-gray-500 mt-4">Cargando calendario...</p>
            </div>
          ) : (
            <>
              <CalendarHeader
                currentDate={currentDate}
                onPreviousMonth={handlePreviousMonth}
                onNextMonth={handleNextMonth}
                onToday={handleToday}
              />
              <CalendarGrid
                currentDate={currentDate}
                selectedDate={selectedDate}
                events={events}
                onDateClick={handleDateClick}
                onEventClick={handleEventClick}
              />

              {/* Leyenda */}
              <div className="mt-6 flex items-center gap-6 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-orange-400"></div>
                  <span className="text-sm text-gray-600">Anuncios</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-400"></div>
                  <span className="text-sm text-gray-600">Actividades</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-400"></div>
                  <span className="text-sm text-gray-600">Feriados</span>
              </div>
            </div>
          </>
        )}
        </div>
      </div>

      <Footer />

      {/* Modal de vista (solo lectura) */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedEvent(null);
            setEventType(null);
          }}
        />
      )}

      {/* Botón flotante para ir a editar (solo anuncios y actividades) */}
      {isViewModalOpen && selectedEvent && eventType !== 'feriado' && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={handleGoToEdit}
            className="flex items-center gap-2 px-6 py-3 bg-[#009DDC] text-white rounded-full shadow-lg hover:bg-[#0088c4] transition-all hover:scale-105"
          >
            <ExternalLink className="w-5 h-5" />
            Ir a {eventType === 'anuncio' ? 'Anuncios' : 'Actividades'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CalendarioAdminPage;