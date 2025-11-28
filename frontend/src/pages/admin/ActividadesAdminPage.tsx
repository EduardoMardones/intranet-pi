// ======================================================
// PÁGINA: Actividades CESFAM - CON PERMISOS
// Ubicación: src/pages/admin/ActividadesAdminPage.tsx
// Descripción: Vista unificada con control de permisos por rol
// ======================================================

'use client';

import React, { useState, useMemo } from 'react';
import { UnifiedNavbar } from '@/components/common/layout/UnifiedNavbar';
import Footer from '@/components/common/layout/Footer';
import Banner from '@/components/common/layout/Banner';
import bannerHome from "@/components/images/banner_images/BannerActividades.png";

import { ActivitiesGridAdmin } from '@/components/common/actividades/ActivitiesGridAdmin';
import { ActivityFormDialog } from '@/components/common/actividades/ActivityFormDialog';
import type { Activity } from '@/types/activity';
import { mockActivities, sortActivitiesByDate } from '@/data/mockActivities';
import { Sparkles, Users, Calendar, Plus, Shield, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/common/actividades/Toast';

// ✅ SISTEMA DE PERMISOS
import { useAuth } from '@/api/contexts/AuthContext';
import { PermissionGate } from '@/components/common/PermissionGate';

// ======================================================
// HELPER: Calcular permisos
// ======================================================
function useActividadesPermisos() {
  const { user } = useAuth();
  
  const rolNombre = user?.rol_nombre?.toLowerCase() || '';
  const nivel = rolNombre.includes('direcci') && !rolNombre.includes('sub') ? 4
    : rolNombre.includes('subdirecci') ? 3
    : rolNombre.includes('jefe') || rolNombre.includes('jefa') ? 2
    : 1;
  
  return {
    nivel,
    puedeCrear: nivel >= 3,       // Subdirección y Dirección
    puedeEditar: nivel >= 3,      // Subdirección y Dirección
    puedeEliminar: nivel >= 3,    // Subdirección y Dirección
    esAdmin: nivel >= 3,
  };
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const ActividadesAdminPage: React.FC = () => {
  // ✅ Permisos
  const permisos = useActividadesPermisos();
  
  // ======================================================
  // HOOKS & ESTADOS
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
  // HANDLERS
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

      <div className="flex-1 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          
          {/* ======================================================
              HEADER - Condicional según permisos
              ====================================================== */}
          <header className="bg-white shadow-lg rounded-xl overflow-hidden mb-6">
            <div className="py-8 px-6">
              
              {/* Título y Botón */}
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-4">
                  {/* Icono condicional */}
                  <div className={`p-3 rounded-xl ${
                    permisos.esAdmin 
                      ? 'bg-gradient-to-br from-[#009DDC] to-[#4DFFF3]' 
                      : 'bg-gradient-to-br from-gray-400 to-gray-500'
                  }`}>
                    {permisos.esAdmin ? (
                      <Shield className="w-6 h-6 text-white" />
                    ) : (
                      <Eye className="w-6 h-6 text-white" />
                    )}
                  </div>
                  
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                      {permisos.esAdmin ? 'Panel Administrativo' : 'Tablón'} - Actividades CESFAM
                    </h1>
                    <p className="text-sm text-gray-500">
                      {permisos.esAdmin 
                        ? 'Gestión de actividades, celebraciones y novedades'
                        : 'Actividades, celebraciones y novedades del equipo'
                      }
                    </p>
                  </div>
                </div>

                {/* ✅ Botón Crear (Solo con permisos) */}
                <PermissionGate customCheck={(p) => p.nivel >= 3}>
                  <Button
                    onClick={handleCreateNew}
                    size="lg"
                    className="bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] hover:from-[#0088c4] hover:to-[#3de8d9] text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Nueva Actividad
                  </Button>
                </PermissionGate>
              </div>

              {/* Estadísticas */}
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
              
              {/* Badge condicional */}
              <PermissionGate 
                customCheck={(p) => p.nivel >= 3}
                fallback={
                  <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-700">
                      Modo Solo Lectura
                    </span>
                  </div>
                }
              >
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                  <Shield className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-semibold text-amber-700">
                    Modo Edición Activado
                  </span>
                </div>
              </PermissionGate>

            </div>
          </header>

          {/* ======================================================
              CONTENIDO PRINCIPAL
              ====================================================== */}
          <main className="py-8 px-6">
            
            {/* Mensaje informativo */}
            <PermissionGate 
              customCheck={(p) => p.nivel >= 3}
              fallback={
                <div className="mb-8 bg-white rounded-xl shadow-sm border-l-4 border-blue-500 p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    Actividades del Equipo
                  </h2>
                  <p className="text-gray-600">
                    Aquí puedes ver todas las actividades, celebraciones y eventos del CESFAM.
                  </p>
                </div>
              }
            >
              <div className="mb-8 bg-white rounded-xl shadow-sm border-l-4 border-[#009DDC] p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#009DDC]" />
                  Gestión de Actividades
                </h2>
                <p className="text-gray-600">
                  Utiliza los controles en cada tarjeta para editar o eliminar contenido. Los cambios se reflejarán inmediatamente.
                </p>
              </div>
            </PermissionGate>

            {/* ✅ Grid con permisos condicionales */}
            <ActivitiesGridAdmin
              activities={sortedActivities}
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </main>
        </div>
      </div>

      <Footer />

      {/* ✅ Diálogo solo para usuarios con permisos */}
      <PermissionGate customCheck={(p) => p.nivel >= 3}>
        <ActivityFormDialog
          isOpen={isDialogOpen}
          onClose={handleCancel}
          onSave={handleSave}
          activity={editingActivity}
        />
      </PermissionGate>
    </>
  );
};

export default ActividadesAdminPage;