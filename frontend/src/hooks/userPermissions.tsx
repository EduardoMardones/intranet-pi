// frontend/src/hooks/usePermissions.ts

import { useAuth } from '@/api/contexts/AuthContext';

export interface Permisos {
  // Nivel del rol
  nivel: number;
  
  // Permisos generales
  esDirector: boolean;
  esSubdirector: boolean;
  esJefatura: boolean;
  esFuncionario: boolean;
  
  // Permisos específicos del backend
  puedeCrearUsuarios: boolean;
  puedeEliminarContenido: boolean;
  puedeAprobarSolicitudes: boolean;
  puedeSubirDocumentos: boolean;
  puedeCrearActividades: boolean;
  puedeCrearAnuncios: boolean;
  puedeGestionarLicencias: boolean;
  puedeVerReportes: boolean;
  puedeEditarCalendario: boolean;
  
  // Funciones de utilidad
  puedeAprobarSolicitud: (solicitudAreaId: string) => boolean;
  puedeEditarContenido: (creadorId: string) => boolean;
  puedeVerContenidoDeArea: (areaId: string) => boolean;
}

export function usePermissions(): Permisos {
  const { user } = useAuth();

  if (!user) {
    // Permisos por defecto (ninguno)
    return {
      nivel: 0,
      esDirector: false,
      esSubdirector: false,
      esJefatura: false,
      esFuncionario: false,
      puedeCrearUsuarios: false,
      puedeEliminarContenido: false,
      puedeAprobarSolicitudes: false,
      puedeSubirDocumentos: false,
      puedeCrearActividades: false,
      puedeCrearAnuncios: false,
      puedeGestionarLicencias: false,
      puedeVerReportes: false,
      puedeEditarCalendario: false,
      puedeAprobarSolicitud: () => false,
      puedeEditarContenido: () => false,
      puedeVerContenidoDeArea: () => false,
    };
  }

  // Obtener datos del rol desde el backend
  // Estos campos vienen del modelo Rol en el backend
  const nivel = user.rol_nivel || 1; // Asumir funcionario si no está definido
  
  const esDirector = nivel === 4;
  const esSubdirector = nivel === 3;
  const esJefatura = nivel === 2;
  const esFuncionario = nivel === 1;

  return {
    nivel,
    esDirector,
    esSubdirector,
    esJefatura,
    esFuncionario,
    
    // Permisos específicos del backend
    // Estos vienen del modelo Rol
    puedeCrearUsuarios: user.rol_puede_crear_usuarios || false,
    puedeEliminarContenido: user.rol_puede_eliminar_contenido || false,
    puedeAprobarSolicitudes: user.rol_puede_aprobar_solicitudes || false,
    puedeSubirDocumentos: user.rol_puede_subir_documentos || false,
    puedeCrearActividades: user.rol_puede_crear_actividades || false,
    puedeCrearAnuncios: user.rol_puede_crear_anuncios || false,
    puedeVerReportes: user.rol_puede_ver_reportes || false,
    puedeEditarCalendario: user.rol_puede_editar_calendario || false,
    
    // Solo Subdirección puede gestionar licencias médicas
    // Dirección NO puede gestionar licencias
    puedeGestionarLicencias: esSubdirector, 


    // Funciones de utilidad
    puedeAprobarSolicitud: (solicitudAreaId: string) => {
      if (esDirector || esSubdirector) return true;
      if (esJefatura) return solicitudAreaId === user.area;
      return false;
    },
    
    puedeEditarContenido: (creadorId: string) => {
      // Dirección y Subdirección pueden editar cualquier contenido
      if (esDirector || esSubdirector) return true;
      // El creador siempre puede editar su propio contenido
      return creadorId === user.id;
    },
    
    puedeVerContenidoDeArea: (areaId: string) => {
      if (esDirector || esSubdirector) return true;
      return areaId === user.area;
    },
  };
}