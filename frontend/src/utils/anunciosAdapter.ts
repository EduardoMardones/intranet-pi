// ======================================================
// ADAPTADOR: Anuncios Backend <-> Frontend
// Ubicación: frontend/src/utils/anunciosAdapter.ts
// Descripción: Convierte entre el formato del backend y el formato del frontend
// ======================================================

import type { Anuncio, TipoAnuncio } from '@/api/services/anunciosService';
import type { Announcement, AnnouncementCategory, Attachment } from '@/types/announcement';

// ======================================================
// MAPEO DE TIPOS
// ======================================================

/**
 * Mapea los tipos del backend a las categorías del frontend
 */
const tipoToCategory: Record<TipoAnuncio, AnnouncementCategory> = {
  'informativo': 'informativa',
  'urgente': 'urgente',
  'recordatorio': 'general',
  'felicitacion': 'general',
  'normativa': 'normativa',
  'administrativa': 'administrativa',
};

/**
 * Mapea las categorías del frontend a los tipos del backend
 */
const categoryToTipo: Record<AnnouncementCategory, TipoAnuncio> = {
  'general': 'informativo',
  'normativa': 'normativa',
  'urgente': 'urgente',
  'informativa': 'informativo',
  'administrativa': 'administrativa',
};

// ======================================================
// FUNCIONES DE CONVERSIÓN
// ======================================================

/**
 * Convierte un anuncio del backend al formato del frontend
 */
export function anuncioToAnnouncement(anuncio: Anuncio): Announcement {
  const attachments: Attachment[] = [];
  
  // Convertir adjuntos si existen
  if (anuncio.adjuntos && anuncio.adjuntos.length > 0) {
    anuncio.adjuntos.forEach(adjunto => {
      const fileType = getFileType(adjunto.tipo_archivo);
      attachments.push({
        fileName: adjunto.nombre_archivo,
        fileUrl: adjunto.archivo,
        fileType: fileType,
        fileSize: formatFileSize(adjunto.tamano),
      });
    });
  }

  return {
    id: anuncio.id,
    title: anuncio.titulo,
    description: anuncio.contenido,
    publicationDate: new Date(anuncio.fecha_publicacion),
    category: tipoToCategory[anuncio.tipo],
    attachments: attachments.length > 0 ? attachments : undefined,
  };
}

/**
 * Convierte un array de anuncios del backend al formato del frontend
 */
export function anunciosToAnnouncements(anuncios: Anuncio[]): Announcement[] {
  return anuncios.map(anuncioToAnnouncement);
}

/**
 * Convierte una categoría del frontend al tipo del backend
 */
export function categoryToBackendTipo(category: AnnouncementCategory): TipoAnuncio {
  return categoryToTipo[category];
}

// ======================================================
// FUNCIONES AUXILIARES
// ======================================================

/**
 * Determina el tipo de archivo basándose en la extensión o tipo MIME
 */
function getFileType(tipoArchivo: string): 'pdf' | 'doc' | 'xls' | 'img' | 'other' {
  const tipo = tipoArchivo.toLowerCase();
  
  if (tipo.includes('pdf')) return 'pdf';
  if (tipo.includes('doc') || tipo.includes('word')) return 'doc';
  if (tipo.includes('xls') || tipo.includes('excel') || tipo.includes('sheet')) return 'xls';
  if (tipo.includes('image') || tipo.includes('png') || tipo.includes('jpg') || tipo.includes('jpeg')) return 'img';
  
  return 'other';
}

/**
 * Formatea el tamaño del archivo en bytes a formato legible
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Convierte una fecha del frontend al formato del backend (ISO string)
 */
export function dateToBackendString(date: Date): string {
  return date.toISOString();
}