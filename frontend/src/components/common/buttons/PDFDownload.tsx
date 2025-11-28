import React from "react"
import { Download } from "lucide-react"

type PDFDownloadProps = {
  fileName?: string
  fileUrl?: string // URL del archivo real
  documentId?: string // ID del documento para descargar desde el backend
}

const PDFDownload: React.FC<PDFDownloadProps> = ({ 
  fileName = "documento.pdf",
  fileUrl,
  documentId
}) => {
  const handleDownload = async () => {
    try {
      if (fileUrl) {
        // Caso 1: Tenemos una URL directa del archivo
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (documentId) {
        // Caso 2: Tenemos ID del documento, descargar desde backend
        // TODO: Implementar cuando se conecte con el backend real
        window.open(`/api/documentos/${documentId}/descargar/`, '_blank');
      } else {
        // Caso 3: Mock data - crear un PDF de ejemplo
        // Crear un blob con contenido de ejemplo
        const pdfContent = `%PDF-1.4
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
/Length 55
>>
stream
BT
/F1 24 Tf
100 700 Td
(Documento de Ejemplo) Tj
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
420
%%EOF`;

        const blob = new Blob([pdfContent], { type: 'application/pdf' });
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
      className="cursor-pointer" 
      title={`Descargar ${fileName}`}
      onClick={handleDownload}
    >
      <Download
        className="text-red-600 w-6 h-6 hover:text-red-800 transition-colors"
      />
    </div>
  )
}

export default PDFDownload