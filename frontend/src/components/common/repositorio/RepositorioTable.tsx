import { useState, useEffect } from 'react'
import GenericTable from '../tablas/GenericTable'
import FileDownload from '../buttons/FileDownload'
import VerSolicitud from '../buttons/VerSolicitud'
import { FileText, Image as ImageIcon, Video, FileType, Loader2 } from 'lucide-react'
import { documentosService, type Documento } from '@/api/services/documentosService'

export function RepositorioTable() {
  const [documentos, setDocumentos] = useState<Documento[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    cargarDocumentos()
  }, [])

  const cargarDocumentos = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await documentosService.getAll({ activo: true })
      console.log('Respuesta de la API (RepositorioTable):', response) // Debug
      
      // Manejar diferentes formatos de respuesta
      if (response && response.results) {
        setDocumentos(response.results)
      } else if (Array.isArray(response)) {
        setDocumentos(response)
      } else {
        console.warn('Formato de respuesta inesperado:', response)
        setDocumentos([])
      }
    } catch (err) {
      console.error('Error al cargar documentos:', err)
      setError('Error al cargar los documentos')
      setDocumentos([]) // Asegurar que sea array vacío
    } finally {
      setLoading(false)
    }
  }

  const headers = [
    "Código",
    "Tipo",
    "Nombre",
    "Fecha Subida",
    "Tamaño",
    "Acciones"
  ]

  const getIconoPorExtension = (extension: string) => {
    const ext = extension.toLowerCase()
    if (ext === 'pdf') return <FileText className="w-4 h-4 text-red-600" />
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return <ImageIcon className="w-4 h-4 text-blue-600" />
    if (['mp4', 'avi', 'mov', 'wmv'].includes(ext)) return <Video className="w-4 h-4 text-purple-600" />
    return <FileType className="w-4 h-4 text-green-600" />
  }

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2">Cargando documentos...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        {error}
      </div>
    )
  }

  const data = documentos.map((doc) => ({
    Código: doc.codigo_documento,
    Tipo: (
      <div className="flex items-center gap-2">
        {getIconoPorExtension(doc.extension)}
        <span>{doc.tipo_display}</span>
      </div>
    ),
    Nombre: doc.nombre_archivo,
    "Fecha Subida": formatDate(doc.subido_en),
    Tamaño: formatBytes(doc.tamano),
    Acciones: (
      <div className="flex gap-2 justify-center">
        <VerSolicitud id={doc.id} />
        <FileDownload 
          documentId={doc.id}
          fileName={doc.nombre_archivo}
          fileType={doc.mime_type}
        />
      </div>
    )
  }))

  return <GenericTable headers={headers} data={data} />
}