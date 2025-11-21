// ======================================================
// TIPOS COMPARTIDOS
// Ubicación: frontend/src/types/index.ts
// ======================================================

// ======================================================
// USUARIO
// ======================================================

export interface Usuario {
  id: string;
  rut: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  nombre_completo: string;
  email: string;
  telefono?: string;
  fecha_nacimiento?: string;
  direccion?: string;
  cargo: string;
  area: string;
  area_nombre: string;
  rol: string;
  rol_nombre: string;
  fecha_ingreso: string;
  es_jefe_de_area: boolean;
  contacto_emergencia_nombre?: string;
  contacto_emergencia_telefono?: string;
  contacto_emergencia_relacion?: string;
  dias_vacaciones_anuales: number;
  dias_vacaciones_disponibles: number;
  dias_vacaciones_usados: number;
  dias_administrativos_anuales: number;
  dias_administrativos_disponibles: number;
  dias_administrativos_usados: number;
  avatar?: string;
  tema_preferido?: string;
  is_active: boolean;
  creado_en?: string;
  actualizado_en?: string;
  ultimo_acceso?: string;
}

// ======================================================
// ROL
// ======================================================

export interface Rol {
  id: string;
  nombre: string;
  descripcion?: string;
  nivel: number;
  puede_crear_usuarios: boolean;
  puede_eliminar_contenido: boolean;
  puede_aprobar_solicitudes: boolean;
  puede_subir_documentos: boolean;
  puede_crear_actividades: boolean;
  puede_crear_anuncios: boolean;
  puede_gestionar_licencias: boolean;
  puede_ver_reportes: boolean;
  puede_editar_calendario: boolean;
}

// ======================================================
// ÁREA
// ======================================================

export interface Area {
  id: string;
  nombre: string;
  codigo: string;
  descripcion?: string;
  color?: string;
  icono?: string;
  jefe?: string;
  jefe_nombre?: string;
  total_funcionarios?: number;
  activa: boolean;
  creada_en?: string;
  actualizada_en?: string;
}

// ======================================================
// SOLICITUD
// ======================================================

export interface Solicitud {
  id: string;
  numero_solicitud: string;
  usuario: string;
  usuario_nombre: string;
  area_nombre: string;
  tipo: 'vacaciones' | 'dia_administrativo';
  tipo_display: string;
  fecha_inicio: string;
  fecha_termino: string;
  cantidad_dias: number;
  motivo: string;
  telefono_contacto: string;
  estado: string;
  estado_display: string;
  fecha_solicitud: string;
  aprobada_por_jefatura?: boolean;
  jefatura_aprobador?: string;
  jefatura_nombre?: string;
  fecha_aprobacion_jefatura?: string;
  comentarios_jefatura?: string;
  aprobada_por_direccion?: boolean;
  direccion_aprobador?: string;
  direccion_nombre?: string;
  fecha_aprobacion_direccion?: string;
  comentarios_direccion?: string;
  pdf_generado: boolean;
  url_pdf?: string;
}

// ======================================================
// ACTIVIDAD
// ======================================================

export interface Actividad {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: 'reunion' | 'capacitacion' | 'evento' | 'celebracion' | 'otro';
  tipo_display: string;
  fecha_inicio: string;
  fecha_termino: string;
  todo_el_dia: boolean;
  ubicacion?: string;
  color?: string;
  imagen?: string;
  para_todas_areas: boolean;
  areas_participantes?: string[];
  areas_participantes_nombres?: string[];
  cupo_maximo?: number;
  total_inscritos: number;
  tiene_cupos: boolean;
  activa: boolean;
  creado_por: string;
  creado_por_nombre: string;
  creado_en: string;
}

// ======================================================
// ANUNCIO
// ======================================================

export interface Anuncio {
  id: string;
  titulo: string;
  contenido: string;
  tipo: 'comunicado' | 'informativo' | 'urgente' | 'felicitacion';
  tipo_display: string;
  es_destacado: boolean;
  prioridad: number;
  fecha_publicacion: string;
  fecha_expiracion?: string;
  imagen?: string;
  para_todas_areas: boolean;
  areas_destinatarias?: string[];
  areas_destinatarias_nombres?: string[];
  activo: boolean;
  esta_vigente: boolean;
  creado_por: string;
  creado_por_nombre: string;
  creado_en: string;
}

// ======================================================
// DOCUMENTO
// ======================================================

export interface Documento {
  id: string;
  codigo_documento: string;
  titulo: string;
  descripcion?: string;
  tipo: 'circular' | 'memorandum' | 'resolucion' | 'protocolo' | 'manual' | 'otro';
  tipo_display: string;
  categoria: string;
  categoria_nombre: string;
  archivo: string;
  extension: string;
  tamano: number;
  version: string;
  fecha_vigencia: string;
  fecha_expiracion?: string;
  publico: boolean;
  areas_con_acceso?: string[];
  areas_con_acceso_nombres?: string[];
  descargas: number;
  visualizaciones: number;
  activo: boolean;
  esta_vigente: boolean;
  subido_por: string;
  subido_por_nombre: string;
  subido_en: string;
}

// ======================================================
// NOTIFICACIÓN
// ======================================================

export interface Notificacion {
  id: string;
  usuario: string;
  tipo: 'solicitud' | 'aprobacion' | 'rechazo' | 'actividad' | 'anuncio' | 'documento' | 'sistema';
  tipo_display: string;
  titulo: string;
  mensaje: string;
  url?: string;
  icono?: string;
  leida: boolean;
  fecha_leida?: string;
  creada_en: string;
}

// ======================================================
// RESPUESTA PAGINADA
// ======================================================

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}