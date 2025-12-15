// ======================================================
// MINI CALENDARIO - HOMEPAGE
// Ubicación: src/components/common/calendario/MiniCalendario.tsx
// ======================================================

import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/cardgenerica/cardsn';
import { useAuth } from '@/api/contexts/AuthContext';
import { anunciosService, actividadesService } from '@/api/services';
import type { CalendarEvent } from '@/types/calendar';
import type { Anuncio } from '@/api/services/anunciosService';
import type { Actividad } from '@/api/services/actividadesService';
import { useNavigate } from 'react-router-dom';

// ======================================================
// CONVERSORES (Reutilizados de CalendarioAdminPage)
// ======================================================

function anuncioToCalendarEvent(anuncio: Anuncio): CalendarEvent {
  return {
    id: parseInt(anuncio.id) || 0,
    fecha: new Date(anuncio.fecha_publicacion).toISOString().split('T')[0],
    titulo: anuncio.titulo,
    descripcion: anuncio.contenido,
    tipo: 'anuncio',
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

export const MiniCalendario: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const monthName = currentDate.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' });

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
      const response = await fetch('https://api.boostr.cl/holidays.json');
      
      if (!response.ok) {
        console.warn(`⚠️ Error al cargar feriados:`, response.status);
        return [];
      }
      
      const result = await response.json();
      
      if (result.status !== 'success' || !result.data) {
        return [];
      }
      
      const feriados = result.data;
      
      return feriados.map((feriado: any, index: number) => ({
        id: 900000 + index,
        fecha: feriado.date,
        titulo: feriado.title,
        descripcion: feriado.inalienable 
          ? `Feriado ${feriado.type} (Irrenunciable)` 
          : `Feriado ${feriado.type}`,
        tipo: 'feriado' as const,
      }));
    } catch (error) {
      console.error('❌ Error al cargar feriados:', error);
      return [];
    }
  };

  const cargarEventos = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const [feriados, anunciosData, actividadesData] = await Promise.all([
        cargarFeriados(),
        anunciosService.getVigentes(),
        actividadesService.getAll({ activa: true }),
      ]);
      
      // Filtrar anuncios según permisos del usuario
      const anunciosFiltrados = anunciosData.filter((anuncio: Anuncio) => {
        if (anuncio.para_todas_areas) return true;
        if (anuncio.areas_destinatarias?.includes(user.area_nombre || '')) return true;
        
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
      
      const eventosAnuncios = anunciosFiltrados.map(anuncioToCalendarEvent);
      const eventosActividades = actividadesData.map(actividadToCalendarEvent);
      
      setEvents([...eventosAnuncios, ...eventosActividades, ...feriados]);
    } catch (error) {
      console.error('Error al cargar eventos:', error);
      // En caso de error, establecer array vacío en lugar de dejar cargando
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // GENERAR DÍAS DEL MES (LUNES A DOMINGO)
  // ======================================================

  const getMiniCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    // Ajustar para que Lunes sea el primer día (0 = Domingo, necesitamos 1 = Lunes)
    // Si firstDay es 0 (Domingo), debemos agregar 6 espacios vacíos
    // Si firstDay es 1 (Lunes), no agregamos espacios
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    // Agregar espacios vacíos antes del primer día del mes
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null);
    }

    // Agregar los días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  // ======================================================
  // OBTENER EVENTOS DE UN DÍA ESPECÍFICO
  // ======================================================

  const getEventsForDay = (day: number | null): CalendarEvent[] => {
    if (!day) return [];
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];
    
    return events.filter(event => event.fecha === dateStr);
  };

  // ======================================================
  // OBTENER COLORES POR TIPO DE EVENTO
  // ======================================================

  const getEventColor = (tipo: string): string => {
    switch (tipo) {
      case 'feriado':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'anuncio':
        return 'bg-orange-100 border-orange-400 text-orange-700';
      case 'reunion':
        return 'bg-blue-100 border-blue-400 text-blue-700';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-700';
    }
  };

  // ======================================================
  // FORMATEAR HORA
  // ======================================================

  const formatTime = (time: string | undefined): string => {
    if (!time) return '';
    // Si viene en formato HH:mm, retornarlo directamente
    if (time.match(/^\d{2}:\d{2}$/)) return time;
    // Si no, intentar parsearlo
    return time.slice(0, 5);
  };

  // ======================================================
  // NAVEGACIÓN AL CALENDARIO COMPLETO
  // ======================================================

  const handleCalendarClick = () => {
    navigate('/calendario');
  };

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <Card className="shadow-md border-0 bg-white overflow-hidden">
      <CardHeader className="p-0">
        <div 
          className="bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] px-6 py-4 flex justify-between items-center cursor-pointer hover:opacity-90 transition-opacity"
          onClick={handleCalendarClick}
          title="Ir al calendario completo"
        >
          <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            {monthName}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#009DDC]"></div>
          </div>
        ) : (
          <>
            {/* Cabecera con días de la semana: L-M-M-J-V-S-D */}
            <div className="grid grid-cols-7 gap-2 text-center mb-2">
              {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                <div key={i} className="text-xs font-bold text-slate-400 uppercase">
                  {day}
                </div>
              ))}
            </div>

            {/* Grid de días */}
            <div className="grid grid-cols-7 gap-2">
              {getMiniCalendar().map((day, i) => {
                const dayEvents = getEventsForDay(day);
                const isToday = day === currentDate.getDate();
                const MAX_VISIBLE_EVENTS = 2; // Máximo de eventos visibles por celda
                const visibleEvents = dayEvents.slice(0, MAX_VISIBLE_EVENTS);
                const remainingCount = dayEvents.length - MAX_VISIBLE_EVENTS;
                
                return (
                  <div
                    key={i}
                    className={`
                      min-h-[80px] rounded-lg border transition-all
                      ${!day ? 'invisible' : 'border-slate-200 bg-white hover:border-[#009DDC] hover:shadow-md'}
                      ${isToday ? 'border-[#009DDC] border-2' : ''}
                      ${selectedDate === day && !isToday ? 'ring-2 ring-[#009DDC] ring-offset-1' : ''}
                    `}
                  >
                    {day && (
                      <div className="p-1">
                        {/* Número del día */}
                        <button
                          onClick={() => setSelectedDate(day)}
                          className={`
                            w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center mb-1
                            ${isToday
                              ? 'bg-[#009DDC] text-white'
                              : 'text-slate-700 hover:bg-slate-100'}
                          `}
                        >
                          {day}
                        </button>

                        {/* Lista de eventos */}
                        <div className="space-y-0.5">
                          {visibleEvents.map((event) => (
                            <div
                              key={event.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate('/calendario');
                              }}
                              className={`
                                ${getEventColor(event.tipo)}
                                px-1 py-0.5 rounded border-l-2 cursor-pointer
                                transition-all hover:shadow-sm
                                text-[9px] leading-tight
                              `}
                              title={`${event.titulo}${event.horaInicio ? ' - ' + formatTime(event.horaInicio) : ''}`}
                            >
                              {/* Hora si existe */}
                              {event.horaInicio && (
                                <div className="font-semibold text-[8px] opacity-75">
                                  {formatTime(event.horaInicio)}
                                </div>
                              )}
                              
                              {/* Título truncado */}
                              <div className="font-medium truncate">
                                {event.titulo.length > 12 ? event.titulo.slice(0, 12) + '...' : event.titulo}
                              </div>
                            </div>
                          ))}
                          
                          {/* Indicador de eventos adicionales */}
                          {remainingCount > 0 && (
                            <div 
                              className="text-[8px] text-slate-500 font-medium pl-1 cursor-pointer hover:text-[#009DDC]"
                              onClick={() => navigate('/calendario')}
                              title={`${remainingCount} evento(s) más`}
                            >
                              +{remainingCount} más
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Leyenda */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex flex-wrap gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="text-slate-600">Anuncios</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-slate-600">Actividades</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-slate-600">Feriados</span>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MiniCalendario;