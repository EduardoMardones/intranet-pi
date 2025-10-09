// ======================================================
// PÁGINA PRINCIPAL: Tablero de Actividades CESFAM
// Ubicación: src/pages/TableroActividades.tsx
// Descripción: Vista principal del tablón de convivencia y novedades
// ======================================================

'use client';

import React, { useState, useMemo } from 'react';
import { ActivitiesGrid } from '@/components/common/actividades/ActivitiesGrid';
import type { Activity } from '../types/activity';
import { mockActivities, sortActivitiesByDate } from '../data/mockActivities';
import { Sparkles, Users, Calendar } from 'lucide-react';
import { Navbar } from '@/components/common/layout/Navbar';
import Footer from '@/components/common/layout/Footer';
import Banner from '@/components/common/layout/Banner';
import bannerHome from "@/components/images/banner_images/banner_home.png"



// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const ActividadesPage: React.FC = () => {
  // ======================================================
  // ESTADOS
  // ======================================================

  // Actividades cargadas desde datos mock (en producción vendrá de API)
  const [activities] = useState<Activity[]>(mockActivities);
  
  // Estado de carga (útil para cuando se conecte con API)
  const [isLoading] = useState<boolean>(false);
  
  // Vista de administrador (false para funcionario, true para admin)
  const [isAdminView] = useState<boolean>(false);

  // ======================================================
  // DATOS PROCESADOS
  // ======================================================

  /**
   * Actividades ordenadas por fecha (más reciente primero)
   * useMemo optimiza el rendimiento evitando recalcular en cada render
   */
  const sortedActivities = useMemo(() => {
    return sortActivitiesByDate(activities);
  }, [activities]);

  /**
   * Estadísticas para mostrar en el header
   */
  const stats = useMemo(() => {
    const now = new Date();
    const upcomingActivities = activities.filter(activity => activity.date > now);
    
    return {
      total: activities.length,
      upcoming: upcomingActivities.length,
      thisMonth: activities.filter(activity => 
        activity.date.getMonth() === now.getMonth() &&
        activity.date.getFullYear() === now.getFullYear()
      ).length
    };
  }, [activities]);

  // ======================================================
  // RENDERIZADO
  // ======================================================

  return (

    <>
    <Navbar></Navbar>
    <div className="h-15" /> {/* Este espacio ocupa la altura del Navbar */}

     <Banner
        imageSrc={bannerHome}
        title="Bienvenido"
        subtitle="Te estábamos esperando!"
        height="250px"
      />

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      
      {/* ======================================================
          HEADER DEL TABLERO
          ====================================================== */}
      <header className="bg-white shadow-lg border-b-4 border-[#009DDC]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8">
          {/* Título principal */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-4">
              {/* Icono decorativo */}
              <div className="p-4 bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] rounded-2xl shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              
              {/* Título y subtítulo */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-2">
                  🎉 Tablón de Convivencia CESFAM
                </h1>
                <p className="text-gray-600 mt-1">
                  Actividades, celebraciones y novedades de nuestra comunidad
                </p>
              </div>
            </div>

            {/* ======================================================
                BOTÓN PARA VISTA ADMINISTRATIVA (FUTURO)
                ====================================================== */}
            {/* 
            Solo visible para administradores:
            
            {isAdminView && (
              <button className="px-6 py-3 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                ➕ Nueva Actividad
              </button>
            )}
            */}
          </div>

          {/* ======================================================
              ESTADÍSTICAS DEL TABLERO
              ====================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total de actividades */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-l-4 border-blue-400">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total de Actividades</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                </div>
              </div>
            </div>

            {/* Actividades próximas */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border-l-4 border-purple-400">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Próximas Actividades</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.upcoming}</p>
                </div>
              </div>
            </div>

            {/* Actividades del mes */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-l-4 border-green-400">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Este Mes</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.thisMonth}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================
              ÁREA PARA FILTROS (IMPLEMENTACIÓN FUTURA)
              ====================================================== */}
          {/* 
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-[#009DDC] transition-colors">
              🍽️ Gastronómicas
            </button>
            <button className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-[#009DDC] transition-colors">
              ⚽ Deportivas
            </button>
            <button className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-[#009DDC] transition-colors">
              🎉 Celebraciones
            </button>
            <button className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-[#009DDC] transition-colors">
              🌱 Comunitarias
            </button>
            <button className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-[#009DDC] transition-colors">
              📌 Todas
            </button>
          </div>
          */}
        </div>
      </header>

      {/* ======================================================
          CONTENIDO PRINCIPAL - CUADRÍCULA DE ACTIVIDADES
          ====================================================== */}
      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-8">
        {/* Mensaje motivacional */}
        <div className="mb-8 text-center">
          <p className="text-lg text-gray-700">
            ✨ <span className="font-semibold">¡Únete a nuestras actividades!</span> ✨
          </p>
          <p className="text-gray-600 mt-1">
            Participa, comparte y fortalece los lazos con tu equipo de trabajo
          </p>
        </div>

        {/* Cuadrícula de actividades */}
        <ActivitiesGrid
          activities={sortedActivities}
          isLoading={isLoading}
          isAdminView={isAdminView}
        />
      </main>

      {/* ======================================================
          FOOTER
          ====================================================== */}
      <Footer></Footer>

      {/* ======================================================
          NOTAS PARA DESARROLLO FUTURO
          ======================================================
          
          FUNCIONALIDADES A IMPLEMENTAR:
          
          1. SISTEMA DE FILTROS:
             - Crear componente FilterBar.tsx
             - Implementar filtrado por tipo de actividad
             - Agregar búsqueda por texto
             - Filtro por fecha (próximas, pasadas, rango)
          
          2. BÚSQUEDA:
             - Barra de búsqueda en el header
             - Búsqueda por título, descripción o ubicación
             - Resaltado de coincidencias
          
          3. SISTEMA DE "ME INTERESA":
             - Agregar contador en cada ActivityCard
             - Backend para registrar interesados
             - Notificaciones de recordatorio
          
          4. VISTA DETALLADA:
             - Modal o página dedicada con todos los detalles
             - Galería de fotos
             - Lista de participantes
             - Comentarios o preguntas
          
          5. VISTA ADMINISTRATIVA:
             - Botón "Nueva Actividad" en header
             - Formulario de creación/edición
             - Botones de editar/eliminar en cada card
             - Sistema de permisos por rol
          
          6. NOTIFICACIONES:
             - Recordatorios de actividades próximas
             - Notificaciones de nuevas actividades
             - Alertas de cambios en actividades
          
          7. CALENDARIO INTEGRADO:
             - Vista de calendario con las actividades
             - Sincronización con Google Calendar
             - Exportar eventos a .ics
          
          8. OPTIMIZACIONES:
             - Lazy loading de imágenes
             - Paginación o scroll infinito
             - Cache de datos
             - Service Worker para offline
          
          Ejemplo de conexión con API:
          
          useEffect(() => {
            const fetchActivities = async () => {
              setIsLoading(true);
              try {
                const response = await fetch('/api/activities');
                const data = await response.json();
                setActivities(data);
              } catch (error) {
                console.error('Error loading activities:', error);
              } finally {
                setIsLoading(false);
              }
            };
            
            fetchActivities();
          }, []);
      ====================================================== */}
    </div>
    </>
  );
};

// ======================================================
// EXPORT
// ======================================================

