// ======================================================
// API INDEX - Exportación principal
// Ubicación: frontend/src/api/index.ts
// ======================================================

// Configuración y cliente
export { API_BASE_URL, buildUrl, getAuthHeaders } from './config';
export { ApiClient } from './client';

// Servicios
export * from './services';

// Re-exportar servicios principales para acceso directo
export {
  authService,
  usuariosService,
  solicitudesService,
  actividadesService,
  anunciosService,
  documentosService,
  notificacionesService,
  areasService,
  rolesService,
} from './services';
