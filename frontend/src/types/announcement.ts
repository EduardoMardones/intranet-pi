// ======================================================
// TIPOS Y INTERFACES - Comunicados Oficiales CESFAM
// Ubicación: src/types/announcement.ts
// ======================================================

/**
 * Tipos de archivos adjuntos soportados
 */
export type FileType = 'pdf' | 'doc' | 'xls' | 'img' | 'other';

/**
 * Roles autorizados para crear/editar comunicados
 * (Para implementación futura)
 */
export type AuthorRole = 'direccion' | 'subdireccion';

/**
 * Categoría del comunicado
 * (Para implementación futura de filtros)
 */
export type AnnouncementCategory = 
  | 'general'
  | 'normativa'
  | 'urgente'
  | 'informativa'
  | 'administrativa';

/**
 * Interface de un documento adjunto
 */
export interface Attachment {
  fileName: string;
  fileUrl: string; // URL del documento
  fileType: FileType;
  fileSize?: string; // Ej: "2.5 MB"
}

/**
 * Interface principal de un comunicado oficial
 */
export interface Announcement {
  id: string;
  title: string;
  publicationDate: Date;
  expirationDate?: Date | null;
  description: string;
  attachments?: Attachment[];
  category?: AnnouncementCategory;
  authorName?: string;
  visibilidadRoles?: string;
  visibilidadRolesDisplay?: string;
  paraTodasAreas?: boolean;
  areasDestinatarias?: string[];
  // Campos para escalabilidad futura
  // authorRole?: AuthorRole;
  // lastEditedDate?: Date;
  // isPinned?: boolean; // Para fijar comunicados importantes
  // views?: number; // Contador de visualizaciones
}

/**
 * Props para el componente AnnouncementCard
 */
export interface AnnouncementCardProps {
  announcement: Announcement;
  isAdminView?: boolean;
  onEdit?: (announcement: Announcement) => void;
  onDelete?: (announcementId: string) => void;
}

/**
 * Props para el componente AnnouncementList
 */
export interface AnnouncementListProps {
  announcements: Announcement[];
  isLoading?: boolean;
  isAdminView?: boolean;
}

/**
 * Props para el componente AttachmentLink
 */
export interface AttachmentLinkProps {
  attachment: Attachment;
}

/**
 * Configuración de íconos y colores por tipo de archivo
 */
export const FILE_TYPE_CONFIG: Record<FileType, {
  color: string;
  bgColor: string;
  label: string;
}> = {
  pdf: {
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    label: 'PDF'
  },
  doc: {
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    label: 'DOC'
  },
  xls: {
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    label: 'XLS'
  },
  img: {
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    label: 'IMG'
  },
  other: {
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    label: 'ARCHIVO'
  }
};

/**
 * Configuración de estilos por categoría
 */
export const CATEGORY_CONFIG: Record<AnnouncementCategory, {
  badge: string;
  icon: string;
  label: string;
}> = {
  general: {
    badge: 'bg-blue-100 text-blue-700 border-blue-300',
    icon: '📋',
    label: 'General'
  },
  normativa: {
    badge: 'bg-purple-100 text-purple-700 border-purple-300',
    icon: '⚖️',
    label: 'Normativa'
  },
  urgente: {
    badge: 'bg-red-100 text-red-700 border-red-300',
    icon: '🚨',
    label: 'Urgente'
  },
  informativa: {
    badge: 'bg-cyan-100 text-cyan-700 border-cyan-300',
    icon: 'ℹ️',
    label: 'Informativa'
  },
  administrativa: {
    badge: 'bg-gray-100 text-gray-700 border-gray-300',
    icon: '📎',
    label: 'Administrativa'
  }
};