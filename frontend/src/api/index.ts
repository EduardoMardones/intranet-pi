// ======================================================
// API INDEX - Exportaciones centralizadas
// Ubicación: frontend/src/api/index.ts
// ======================================================

// Servicios de autenticación
export { authService } from './services/authService';

// Servicios de usuarios y organización
export { usuarioService } from './services/usuarioService';
export { rolService } from './services/rolService';
export { areaService } from './services/areaService';

// Servicios de solicitudes
export { solicitudService } from './services/solicitudService';

// TODO: Agregar cuando se implementen
// export { documentoService } from './services/documentoService';
// export { anuncioService } from './services/anuncioService';
// export { actividadService } from './services/actividadService';
// export { licenciaService } from './services/licenciaService';
// export { notificacionService } from './services/notificacionService';

// Re-exportar tipos comunes
export type { Usuario, CrearUsuarioDTO, ActualizarUsuarioDTO } from './services/usuarioService';
export type { Rol, CrearRolDTO } from './services/rolService';
export type { Area, CrearAreaDTO } from './services/areaService';
export type { 
  Solicitud, 
  CrearSolicitudDTO, 
  TipoSolicitud, 
  EstadoSolicitud,
  EstadisticasSolicitudes 
} from './services/solicitudService';