import React from "react"
import { Download } from "lucide-react"

type FileDownloadProps = {
  fileName: string
  fileUrl?: string // URL del archivo real
  fileType?: string // Tipo MIME del archivo
  documentId?: string // ID del documento para descargar desde el backend
  className?: string
  iconClassName?: string
}

const FileDownload: React.FC<FileDownloadProps> = ({ 
  fileName,
  fileUrl,
  fileType = 'application/pdf',
  documentId,
  className = "",
  iconClassName = "text-blue-600 w-6 h-6 cursor-pointer hover:text-blue-800 transition-colors"
}) => {
  const handleDownload = async () => {
    try {
      if (fileUrl) {
        // Caso 1: Tenemos una URL directa del archivo
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (documentId) {
        // Caso 2: Tenemos ID del documento, descargar desde backend
        try {
          const response = await fetch(`/api/documentos/${documentId}/descargar/`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });

          if (!response.ok) {
            throw new Error('Error al descargar el archivo');
          }

          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error('Error descargando desde backend:', error);
          // Fallback: abrir en nueva pestaña
          window.open(`/api/documentos/${documentId}/`, '_blank');
        }
      } else {
        // Caso 3: Mock data - crear un archivo de ejemplo según el tipo
        let content: string;
        let mimeType: string;

        if (fileType.includes('pdf') || fileName.endsWith('.pdf')) {
          // Crear un PDF simple
          content = createMockPDF(fileName);
          mimeType = 'application/pdf';
        } else if (fileType.includes('image') || /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName)) {
          // Para imágenes, crear un canvas simple
          createMockImage(fileName);
          return;
        } else if (fileType.includes('text') || fileName.endsWith('.txt')) {
          // Crear un archivo de texto
          content = `Este es un documento de ejemplo: ${fileName}\n\nContenido generado automáticamente para demostración.`;
          mimeType = 'text/plain';
        } else {
          // Archivo genérico
          content = `Contenido de ejemplo para: ${fileName}`;
          mimeType = 'application/octet-stream';
        }

        const blob = new Blob([content], { type: mimeType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error al descargar archivo:', error);
    }
  }

  return (
    <div 
      className={`cursor-pointer ${className}`} 
      title={`Descargar ${fileName}`}
      onClick={handleDownload}
    >
      <Download
        className={iconClassName}
      />
    </div>
  )
}

/**
 * Crea un PDF de ejemplo simple
 */
const createMockPDF = (fileName: string): string => {
  return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
>>
>>
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj
4 0 obj
<<
/Length 120
>>
stream
BT
/F1 18 Tf
50 750 Td
(Documento de Ejemplo) Tj
0 -30 Td
/F1 12 Tf
(Archivo: ${fileName}) Tj
0 -20 Td
(Este es un documento generado para demostracion) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000317 00000 n
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
485
%%EOF`;
}

/**
 * Crea y descarga una imagen de ejemplo
 */
const createMockImage = (fileName: string) => {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Fondo
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, 800, 600);
    
    // Texto
    ctx.fillStyle = '#333';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Imagen de Ejemplo', 400, 280);
    ctx.font = '16px Arial';
    ctx.fillText(fileName, 400, 320);
  }
  
  canvas.toBlob((blob) => {
    if (blob) {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  });
}

export default FileDownload