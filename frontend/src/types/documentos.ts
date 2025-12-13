export interface Documento {
  id: string;
  codigo_documento: string;
  titulo: string;
  descripcion?: string;
  tipo: 'circular' | 'protocolo' | 'formulario' | 'guia' | 'reglamento' | 'manual' | 'informe' | 'otro';
  tipo_display: string;
  categoria: string;
  categoria_nombre: string;
  storage_type: 'database' | 's3';
  nombre_archivo: string;
  extension: string;
  tamano: number;
  mime_type: string;
  archivo_url?: string;
  url_descarga: string;
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

export interface CategoriaDocumento {
  id: number;
  nombre: string;
  descripcion?: string;
  icono?: string;
  color?: string;
  orden?: number;
  activa?: boolean;
}