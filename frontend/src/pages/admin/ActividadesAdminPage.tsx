// ======================================================
// PÁGINA ADMINISTRATIVA: Tablero de Actividades CESFAM
// Ubicación: src/pages/TableroActividadesAdmin.tsx
// ======================================================

'use client';

import React, { useState, useMemo } from 'react';
// Importamos los componentes de layout que faltaban
import { Navbar } from '@/components/common/layout/Navbar';
import Footer from '@/components/common/layout/Footer';
import Banner from '@/components/common/layout/Banner';
import bannerHome from "@/components/images/banner_images/BannerActividades.png";

// Componentes lógicos
import { ActivitiesGridAdmin } from '@/components/common/actividades/ActivitiesGridAdmin';
import { ActivityFormDialog } from '@/components/common/actividades/ActivityFormDialog';
import type { Activity } from '@/types/activity';
import { mockActivities, sortActivitiesByDate } from '@/data/mockActivities';
import { Sparkles, Users, Calendar, Plus, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/common/actividades/Toast';

export const ActividadesAdminPage: React.FC = () => {
  // ======================================================
  // HOOKS & ESTADOS (Lógica original intacta)
  // ======================================================
  const toast = useToast();
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [isLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

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
  // HANDLERS (Lógica original intacta)
  // ======================================================
  const handleCreateNew = () => {
    setEditingActivity(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setIsDialogOpen(true);
  };

  const handleSave = (activityData: Omit<Activity, 'id'>) => {
    if (editingActivity) {
      setActivities(prev => 
        prev.map(act => act.id === editingActivity.id ? { ...activityData, id: editingActivity.id } : act)
      );
      toast.success('✅ Actividad actualizada correctamente');
    } else {
      const newActivity: Activity = {
        ...activityData,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };
      setActivities(prev => [newActivity, ...prev]);
      toast.success('✨ Actividad creada exitosamente');
    }
    setIsDialogOpen(false);
    setEditingActivity(null);
  };

  const handleDelete = (activityId: string) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta actividad?');
    if (confirmed) {
      setActivities(prev => prev.filter(act => act.id !== activityId));
      toast.success('🗑️ Actividad eliminada correctamente');
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setEditingActivity(null);
  };

  // ======================================================
  // RENDERIZADO (ESTÉTICA UNIFICADA)
  // ======================================================

  return (
    <>
      {/* 1. Navbar igual que la página pública */}
      <Navbar />
      <div className="h-16" /> 

      {/* 2. Banner igual que la página pública */}
      <Banner
        imageSrc={bannerHome}
        title=""
        subtitle=""
        height="250px"
      />

      {/* 3. Contenedor Principal con el mismo degradado y padding */}
      <div className="flex-1 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Header estilo Card (Copiado de ActividadesPage pero con botones Admin) */}
          <header className="bg-white shadow-lg rounded-xl overflow-hidden mb-6">
            <div className="py-8 px-6">
              
              {/* Título y Botón de Crear */}
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-4">
                  {/* Icono Admin (Mantenido para diferenciar contexto) */}
                  <div className="p-3 bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] rounded-xl">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                      Panel Administrativo - Tablón CESFAM
                    </h1>
                    <p className="text-sm text-gray-500">
                      Gestión de actividades, celebraciones y novedades
                    </p>
                  </div>
                </div>

                {/* Botón de Acción Principal (Admin) */}
                <Button
                  onClick={handleCreateNew}
                  size="lg"
                  className="bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] hover:from-[#0088c4] hover:to-[#3de8d9] text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Nueva Actividad
                </Button>
              </div>

              {/* Estadísticas (Misma estética que la pública) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              
              {/* Badge informativo de Admin */}
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                <Shield className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-semibold text-amber-700">
                  Modo Edición Activado
                </span>
              </div>

            </div>
          </header>

          {/* Contenido Principal */}
          <main className="py-8 px-6">
            {/* Mensaje informativo Admin */}
            <div className="mb-8 bg-white rounded-xl shadow-sm border-l-4 border-[#009DDC] p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#009DDC]" />
                Gestión de Actividades
              </h2>
              <p className="text-gray-600">
                Utiliza los controles en cada tarjeta para editar o eliminar contenido. Los cambios se reflejarán inmediatamente en la vista pública.
              </p>
            </div>

            {/* Usamos ActivitiesGridAdmin para mantener los botones de editar/borrar */}
            <ActivitiesGridAdmin
              activities={sortedActivities}
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </main>
        </div>
      </div>

      {/* 4. Footer igual que la página pública */}
      <Footer />

      {/* Diálogo de Edición/Creación (Invisible hasta que se activa) */}
      <ActivityFormDialog
        isOpen={isDialogOpen}
        onClose={handleCancel}
        onSave={handleSave}
        activity={editingActivity}
      />
    </>
  );
};