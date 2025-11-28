import GenericTable from '../tablas/GenericTable'
import FileDownload from '../buttons/FileDownload'
import VerSolicitud from '../buttons/VerSolicitud'
import { FileText, Image as ImageIcon, Video, FileType } from 'lucide-react'

export function RepositorioTable() {
  const headers = [
    "ID",
    "Tipo",
    "Nombre",
    "Fecha Subida",
    "Tamaño",
    "Acciones"
  ]

  const tipos = ["PDF", "Imagen", "Video", "Documento"]

  const data = Array.from({ length: 15 }, (_, i) => {
    const id = `FILE${(i + 1).toString().padStart(3, '0')}`
    const tipoRandom = tipos[Math.floor(Math.random() * tipos.length)]
    const sizeRandom = `${Math.floor(Math.random() * 900 + 100)} KB`
    const fecha = new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    const formatDate = (d: Date) => `${d.getDate().toString().padStart(2,"0")}/${(d.getMonth()+1).toString().padStart(2,"0")}/${d.getFullYear()}`

    // Determinar extensión y nombre según el tipo
    let extension = '';
    let fileName = '';
    let fileType = '';
    
    switch(tipoRandom) {
      case 'PDF':
        extension = '.pdf';
        fileName = `documento_${i + 1}.pdf`;
        fileType = 'application/pdf';
        break;
      case 'Imagen':
        const imgExts = ['.jpg', '.png', '.gif'];
        extension = imgExts[Math.floor(Math.random() * imgExts.length)];
        fileName = `imagen_${i + 1}${extension}`;
        fileType = 'image/jpeg';
        break;
      case 'Video':
        extension = '.mp4';
        fileName = `video_${i + 1}.mp4`;
        fileType = 'video/mp4';
        break;
      case 'Documento':
        const docExts = ['.docx', '.xlsx', '.txt'];
        extension = docExts[Math.floor(Math.random() * docExts.length)];
        fileName = `documento_${i + 1}${extension}`;
        fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
    }

    return {
      ID: id,
      Tipo: (
        <div className="flex items-center gap-2">
          {tipoRandom === 'PDF' && <FileText className="w-4 h-4 text-red-600" />}
          {tipoRandom === 'Imagen' && <ImageIcon className="w-4 h-4 text-blue-600" />}
          {tipoRandom === 'Video' && <Video className="w-4 h-4 text-purple-600" />}
          {tipoRandom === 'Documento' && <FileType className="w-4 h-4 text-green-600" />}
          <span>{tipoRandom}</span>
        </div>
      ),
      Nombre: fileName,
      "Fecha Subida": formatDate(fecha),
      Tamaño: sizeRandom,
      Acciones: (
        <div className="flex gap-2 justify-center">
          <VerSolicitud id={id} />
          <FileDownload 
            fileName={fileName}
            fileType={fileType}
          />
        </div>
      )
    }
  })

  return <GenericTable headers={headers} data={data} />
}