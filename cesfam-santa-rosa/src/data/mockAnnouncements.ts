// ======================================================
// DATOS SIMULADOS - Comunicados Oficiales CESFAM
// Ubicación: src/data/mockAnnouncements.ts
// ======================================================

import type { Announcement } from '@/types/announcement';

/**
 * Comunicados oficiales simulados
 * En producción, estos datos vendrán de una API
 */
export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Actualización del Protocolo de Atención de Urgencias',
    publicationDate: new Date('2025-11-20T10:00:00'),
    description: 'Se informa a todo el personal que a partir del 1 de diciembre de 2025 entrará en vigencia el nuevo protocolo de atención de urgencias médicas. Este protocolo ha sido actualizado conforme a las nuevas directrices del MINSAL y busca optimizar los tiempos de respuesta y mejorar la calidad de atención. Es obligatorio para todo el personal médico y de enfermería revisar el documento adjunto y asistir a la capacitación programada.',
    category: 'normativa',
    attachments: [
      {
        fileName: 'Protocolo_Urgencias_2025.pdf',
        fileUrl: '#',
        fileType: 'pdf',
        fileSize: '3.2 MB'
      },
      {
        fileName: 'Flujograma_Atencion.pdf',
        fileUrl: '#',
        fileType: 'pdf',
        fileSize: '1.5 MB'
      }
    ]
  },
  {
    id: '2',
    title: 'Cierre Administrativo - Feriado Nacional',
    publicationDate: new Date('2025-11-18T14:30:00'),
    description: 'Se recuerda a todo el personal que el día 1° de noviembre (Día de Todos los Santos) el CESFAM permanecerá cerrado por feriado nacional. El servicio de urgencias funcionará con guardia mínima. Las atenciones programadas serán reagendadas automáticamente. Se solicita confirmar disponibilidad para la guardia con jefatura antes del 28 de octubre.',
    category: 'administrativa',
    attachments: [
      {
        fileName: 'Calendario_Feriados_2025.pdf',
        fileUrl: '#',
        fileType: 'pdf',
        fileSize: '890 KB'
      }
    ]
  },
  {
    id: '3',
    title: 'URGENTE: Actualización Sistema de Fichas Electrónicas',
    publicationDate: new Date('2025-11-15T09:00:00'),
    description: 'ATENCIÓN: El sistema de fichas electrónicas estará en mantenimiento el día SÁBADO 16 de noviembre entre las 08:00 y 14:00 horas. Durante este período NO se podrá acceder al sistema. Se recomienda planificar las atenciones y descargar información necesaria con anticipación. El sistema de respaldo manual estará disponible en secretaría. Disculpen las molestias.',
    category: 'urgente',
    attachments: [
      {
        fileName: 'Instructivo_Respaldo_Manual.pdf',
        fileUrl: '#',
        fileType: 'pdf',
        fileSize: '1.1 MB'
      },
      {
        fileName: 'Formulario_Ficha_Manual.doc',
        fileUrl: '#',
        fileType: 'doc',
        fileSize: '450 KB'
      }
    ]
  },
  {
    id: '4',
    title: 'Nueva Política de Uso de Recursos Institucionales',
    publicationDate: new Date('2025-11-10T11:00:00'),
    description: 'Se comunica a todo el personal la implementación de la nueva política de uso responsable de recursos institucionales. Esta política establece lineamientos claros sobre el uso de equipos computacionales, internet, teléfonos, material de oficina y otros recursos del CESFAM. Su cumplimiento es obligatorio y será monitoreado. Se solicita leer detenidamente el documento adjunto y firmar el compromiso de conocimiento en RRHH.',
    category: 'normativa',
    attachments: [
      {
        fileName: 'Politica_Recursos_Institucionales.pdf',
        fileUrl: '#',
        fileType: 'pdf',
        fileSize: '2.8 MB'
      },
      {
        fileName: 'Formulario_Compromiso.pdf',
        fileUrl: '#',
        fileType: 'pdf',
        fileSize: '350 KB'
      }
    ]
  },
  {
    id: '5',
    title: 'Resultados Encuesta de Satisfacción Laboral 2025',
    publicationDate: new Date('2025-11-05T16:00:00'),
    description: 'Agradecemos la participación de todos los funcionarios en la Encuesta de Satisfacción Laboral 2025. Adjuntamos el informe con los resultados generales y las principales conclusiones. En base a estos resultados, se implementarán acciones de mejora que serán comunicadas próximamente. Su opinión es fundamental para seguir mejorando nuestro ambiente laboral.',
    category: 'informativa',
    attachments: [
      {
        fileName: 'Resultados_Encuesta_2025.pdf',
        fileUrl: '#',
        fileType: 'pdf',
        fileSize: '4.5 MB'
      },
      {
        fileName: 'Graficos_Estadisticos.xls',
        fileUrl: '#',
        fileType: 'xls',
        fileSize: '1.8 MB'
      }
    ]
  },
  {
    id: '6',
    title: 'Convocatoria Comité de Calidad - Noviembre 2025',
    publicationDate: new Date('2025-11-01T10:30:00'),
    description: 'Se convoca a los miembros del Comité de Calidad a reunión ordinaria el día JUEVES 7 de noviembre a las 15:00 horas en la Sala de Reuniones Principal. Temas a tratar: revisión de indicadores de calidad del trimestre, análisis de eventos adversos reportados, y planificación de auditorías internas del próximo período. Se solicita confirmar asistencia.',
    category: 'general',
    attachments: []
  },
  {
    id: '7',
    title: 'Modificación Horarios de Atención - Período Estival',
    publicationDate: new Date('2025-10-28T13:00:00'),
    description: 'Se informa que durante el período estival (diciembre a marzo), el CESFAM modificará sus horarios de atención al público. La atención será de lunes a viernes de 08:00 a 16:00 horas. Los días sábados no habrá atención excepto urgencias. Esta modificación busca optimizar recursos durante el período de vacaciones del personal. Adjuntamos la planilla de turnos y distribución de personal.',
    category: 'administrativa',
    attachments: [
      {
        fileName: 'Horarios_Verano_2025.pdf',
        fileUrl: '#',
        fileType: 'pdf',
        fileSize: '720 KB'
      },
      {
        fileName: 'Planilla_Turnos.xls',
        fileUrl: '#',
        fileType: 'xls',
        fileSize: '980 KB'
      }
    ]
  }
];

/**
 * Función auxiliar para ordenar comunicados por fecha (más reciente primero)
 */
export const sortAnnouncementsByDate = (announcements: Announcement[]): Announcement[] => {
  return [...announcements].sort((a, b) => 
    b.publicationDate.getTime() - a.publicationDate.getTime()
  );
};

/**
 * Función auxiliar para filtrar comunicados por categoría
 * (Para implementación futura)
 */
export const filterAnnouncementsByCategory = (
  announcements: Announcement[],
  category: Announcement['category']
): Announcement[] => {
  return announcements.filter(announcement => announcement.category === category);
};