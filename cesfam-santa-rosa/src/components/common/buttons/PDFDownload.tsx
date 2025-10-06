import React from "react"
import { Download } from "lucide-react"

type PDFDownloadProps = {
  fileName?: string
}

const PDFDownload: React.FC<PDFDownloadProps> = ({ fileName = "solicitud.pdf" }) => {
  const handleDownload = () => {
    alert(`Descargando ${fileName}`)
  }

  return (
    <Download
      className="text-red-600 w-6 h-6 cursor-pointer hover:text-red-800 transition-colors"
      onClick={handleDownload}
     
    />
  )
}

export default PDFDownload
