// ======================================================
// PÁGINA: Actividades CESFAM - CON PERMISOS
// Ubicación: src/pages/admin/ActividadesAdminPage.tsx
// Descripción: Vista unificada con control de permisos por rol
// ======================================================

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { UnifiedNavbar } from '@/components/common/layout/UnifiedNavbar';
import Footer from '@/components/common/layout/Footer';
import BannerLudicos from '@/components/images/banners_finales/BannerLudicos';

import { ActivitiesGridAdmin } from '@/components/common/actividades/ActivitiesGridAdmin';
import { ActivityFormDialog } from '@/components/common/actividades/ActivityFormDialog';
import type { ActivityFormData } from '@/components/common/actividades/ActivityFormDialog';
import { ActivityDetailsModal } from '@/components/common/actividades/ActivityDetailsModal';
import type { Activity } from '@/types/activity';
import { sortActivitiesByDate } from '@/data/mockActivities';
import { Sparkles, Users, Calendar, Plus, Shield, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/common/actividades/Toast';

// ✅ SISTEMA DE PERMISOS
import { useAuth } from '@/api/contexts/AuthContext';
import { PermissionGate } from '@/components/common/PermissionGate';

// ✅ SERVICIO DE BACKEND
import { actividadesService } from '@/api/services/actividadesService';
import type { CrearActividadData, TipoActividad } from '@/api/services/actividadesService';

// ✅ ADAPTADOR
import { actividadesToActivities, actividadToActivity, categoryToBackendTipo, dateToBackendString } from '@/utils/actividadesAdapter';

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
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);

  // ======================================================
  // EFECTOS - CARGA DE DATOS
  // ======================================================

  useEffect(() => {
    cargarActividades();
  }, []);

  // ======================================================
  // FUNCIONES DE BACKEND
  // ======================================================

  /**
   * Carga las actividades desde el backend
   */
  const cargarActividades = async () => {
    try {
      setLoading(true);
      const data = await actividadesService.getAll({ activa: true });
      const actividadesConvertidas = actividadesToActivities(data);
      setActivities(actividadesConvertidas);
    } catch (err) {
      console.error('Error al cargar actividades:', err);
      setActivities([]);
      toast.error('Error al cargar las actividades');
    } finally {
      setLoading(false);
    }
  };

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

  const handleViewDetails = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsDetailsModalOpen(true);
  };

  const handleSave = async (activityData: ActivityFormData) => {
    try {
      if (editingActivity) {
        // Editar actividad existente
        const datosBackend = {
          titulo: activityData.title,
          descripcion: activityData.description,
          tipo: categoryToBackendTipo(activityData.category || 'otra') as TipoActividad,
          fecha_inicio: dateToBackendString(activityData.date),
          fecha_termino: activityData.endTime ? dateToBackendString(new Date(activityData.endTime)) : dateToBackendString(activityData.date),
          ubicacion: activityData.location || '',
          color: activityData.color || '#3B82F6',
          cupo_maximo: activityData.maxAttendees || null,
        };

        let actividadActualizada = await actividadesService.patch(editingActivity.id, datosBackend);
        
        // Subir imagen si existe
        if (activityData.imageFile) {
          actividadActualizada = await actividadesService.uploadImage(editingActivity.id, activityData.imageFile);
        }
        
        const actividadConvertida = actividadToActivity(actividadActualizada);
        
        setActivities(prev => 
          prev.map(act => act.id === editingActivity.id ? actividadConvertida : act)
        );
        toast.success('✅ Actividad actualizada correctamente');
      } else {
        // Crear nueva actividad
        const datosBackend: CrearActividadData = {
          titulo: activityData.title,
          descripcion: activityData.description,
          tipo: categoryToBackendTipo(activityData.category || 'otra'),
          fecha_inicio: dateToBackendString(activityData.date),
          fecha_termino: activityData.endTime ? dateToBackendString(new Date(activityData.endTime)) : dateToBackendString(activityData.date),
          ubicacion: activityData.location || '',
          color: activityData.color || '#3B82F6',
          cupo_maximo: activityData.maxAttendees || null,
          para_todas_areas: true,
        };

        console.log('📝 Datos a enviar al backend:', datosBackend);
        
        let actividadCreada = await actividadesService.create(datosBackend);
        
        console.log('✅ Actividad creada:', actividadCreada);
        
        // Subir imagen si existe
        if (activityData.imageFile) {
          actividadCreada = await actividadesService.uploadImage(actividadCreada.id, activityData.imageFile);
        }
        
        const actividadConvertida = actividadToActivity(actividadCreada);
        
        console.log('🔄 Actividad convertida:', actividadConvertida);
        console.log('🎯 Category:', actividadConvertida.category);
        console.log('🎯 Type del backend:', actividadCreada.tipo);
        
        setActivities(prev => [actividadConvertida, ...prev]);
        toast.success('✨ Actividad creada exitosamente');
      }
      setIsDialogOpen(false);
      setEditingActivity(null);
    } catch (err) {
      console.error('❌ Error completo al guardar actividad:', err);
      console.error('❌ Detalles del error:', JSON.stringify(err, null, 2));
      toast.error('❌ Error al guardar la actividad');
    }
  };

  const handleDelete = async (activityId: string) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta actividad?');
    if (confirmed) {
      try {
        await actividadesService.delete(activityId);
        setActivities(prev => prev.filter(act => act.id !== activityId));
        toast.success('🗑️ Actividad eliminada correctamente');
      } catch (err) {
        console.error('Error al eliminar actividad:', err);
        toast.error('❌ Error al eliminar la actividad');
      }
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

      <BannerLudicos></BannerLudicos>

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
                      ? '' 
                      : ''
                  }`}>
                    
                  </div>
                  
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
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
              isLoading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewDetails={handleViewDetails}
            />
          </main>
        </div>
      </div>

      <Footer />

      {/* ✅ Modal de detalles - Disponible para todos */}
      <ActivityDetailsModal
        activity={selectedActivity}
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
      />

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