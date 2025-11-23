// ======================================================
// API SERVICES INDEX
// Ubicación: frontend/src/api/services/index.ts
// ======================================================

export * from './authService';
export * from './usuarioService';
export * from './solicitudesService';
export * from './actividadesService';
export * from './anunciosService';
export * from './documentosService';

// Exportar servicios de notificaciones, áreas y roles
export {
  notificacionesService,
  areasService,
  rolesService,
  type Notificacion,
  type Area,
  type Rol,
} from './otrosServices';
