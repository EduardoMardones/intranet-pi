import React from "react"
import { Download } from "lucide-react"
import { documentosService } from "@/api/services/documentosService"

type FileDownloadProps = {
  fileName: string
  fileUrl?: string
  fileType?: string
  documentId?: string
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
      if (documentId) {
        // Descargar desde el backend usando el servicio
        const blob = await documentosService.download(documentId)
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } else if (fileUrl) {
        // URL directa del archivo
        const link = document.createElement('a')
        link.href = fileUrl
        link.download = fileName
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        // Mock data fallback
        let content: string
        let mimeType: string

        if (fileType.includes('pdf') || fileName.endsWith('.pdf')) {
          content = createMockPDF(fileName)
          mimeType = 'application/pdf'
        } else if (fileType.includes('image') || /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName)) {
          createMockImage(fileName)
          return
        } else if (fileType.includes('text') || fileName.endsWith('.txt')) {
          content = `Este es un documento de ejemplo: ${fileName}\n\nContenido generado automáticamente para demostración.`
          mimeType = 'text/plain'
        } else {
          content = `Contenido de ejemplo para: ${fileName}`
          mimeType = 'application/octet-stream'
        }

        const blob = new Blob([content], { type: mimeType })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Error al descargar archivo:', error)
      alert('Error al descargar el archivo. Por favor, intenta de nuevo.')
    }
  }

  return (
    <div 
      className={`cursor-pointer ${className}`} 
      title={`Descargar ${fileName}`}
      onClick={handleDownload}
    >
      <Download className={iconClassName} />
    </div>
  )
}

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
%%EOF`
}

const createMockImage = (fileName: string) => {
  const canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 600
  const ctx = canvas.getContext('2d')
  
  if (ctx) {
    ctx.fillStyle = '#f0f0f0'
    ctx.fillRect(0, 0, 800, 600)
    ctx.fillStyle = '#333'
    ctx.font = '24px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('Imagen de Ejemplo', 400, 280)
    ctx.font = '16px Arial'
    ctx.fillText(fileName, 400, 320)
  }
  
  canvas.toBlob((blob) => {
    if (blob) {
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    }
  })
}

export default FileDownload