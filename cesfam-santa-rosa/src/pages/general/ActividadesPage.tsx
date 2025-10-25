// ======================================================
// PÁGINA PRINCIPAL: Tablero de Actividades CESFAM
// Ubicación: src/pages/TableroActividades.tsx
// Descripción: Vista principal del tablón de convivencia y novedades
// ======================================================

'use client';

import React, { useState, useMemo } from 'react';
import { ActivitiesGrid } from '@/components/common/actividades/ActivitiesGrid';
import type { Activity } from '@/types/activity';
import { mockActivities, sortActivitiesByDate } from '@/data/mockActivities';
import { Sparkles, Users, Calendar } from 'lucide-react';
import { Navbar } from '@/components/common/layout/Navbar';
import Footer from '@/components/common/layout/Footer';
import Banner from '@/components/common/layout/Banner';
import bannerHome from "@/components/images/banner_images/BannerActividades.png"



// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const ActividadesPage: React.FC = () => {
  // ======================================================
  // ESTADOS
  // ======================================================

  const [activities] = useState<Activity[]>(mockActivities);
  const [isLoading] = useState<boolean>(false);
  const [isAdminView] = useState<boolean>(false);

  // ======================================================
  // DATOS PROCESADOS
  // ======================================================

  const sortedActivities = useMemo(() => {
    return sortActivitiesByDate(activities);
  }, [activities]);

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
      <Navbar />
      <div className="h-16" /> {/* Este espacio ocupa la altura del Navbar. Ajusté h-15 a h-16 para consistencia. */}

      <Banner
        imageSrc={bannerHome}
        title=""
        subtitle=""
        height="250px"
      />

      {/* Nuevo contenedor principal para el padding y ancho máximo */}
      {/* Aplicamos el degradado del body aquí, y el padding */}
      <div className="flex-1 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 p-4 md:p-8">
        {/* Contenedor para el ancho máximo (similar al calendario) */}
        <div className="max-w-[1600px] mx-auto"> 
          
          {/* ======================================================
              HEADER DEL TABLERO (Ahora sin padding ni max-w propios)
              ====================================================== */}
          <header className="bg-white shadow-lg border-b-4 border-[#009DDC] rounded-xl overflow-hidden mb-6"> {/* Añadido rounded-xl y mb-6 para estética */}
            <div className="py-8 px-6"> {/* Ajustado a px-6 para un look consistente */}
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
                {/* ... (tu código comentado para el botón) ... */}
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
              {/* ... (tu código comentado para filtros) ... */}
            </div>
          </header>

          {/* ======================================================
              CONTENIDO PRINCIPAL - CUADRÍCULA DE ACTIVIDADES (Ahora sin padding ni max-w propios)
              ====================================================== */}
          <main className="py-8 px-6"> {/* Eliminamos max-w y ajustamos padding lateral */}
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
          
        </div> {/* Cierre del div max-w-[1600px] */}
      </div> {/* Cierre del div p-4 md:p-8 */}

      {/* ======================================================
          FOOTER
          ====================================================== */}
      <Footer />

      {/* ... (notas para desarrollo futuro sin cambios) ... */}
    </>
  );
};

// ======================================================
// EXPORT
// ======================================================
export default ActividadesPage;