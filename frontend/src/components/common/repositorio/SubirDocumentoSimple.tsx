import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { documentosService, type CategoriaDocumento } from '@/api/services/documentosService'
import { Upload, Loader2, X, FileText, AlertCircle, UploadCloud } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface SubirDocumentoSimpleProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

// Tipos permitidos
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'video/mp4',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
]

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

export function SubirDocumentoSimple({ open, onOpenChange, onSuccess }: SubirDocumentoSimpleProps) {
  const [loading, setLoading] = useState(false)
  const [categorias, setCategorias] = useState<CategoriaDocumento[]>([])
  const [archivos, setArchivos] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    titulo: '',
    tipo: 'circular' as const,
    categoria: '',
  })

  useEffect(() => {
    if (open) {
      cargarCategorias()
    }
  }, [open])

  const cargarCategorias = async () => {
    try {
      const cats = await documentosService.getCategorias()
      setCategorias(cats.filter(c => c.activa))
    } catch (error) {
      console.error('Error al cargar categorías:', error)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return 'Tipo de archivo no permitido'
    }
    if (file.size > MAX_FILE_SIZE) {
      return `Archivo demasiado grande (máx. ${formatFileSize(MAX_FILE_SIZE)})`
    }
    return null
  }

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return

    setError(null)
    const nuevosArchivos: File[] = []
    
    Array.from(files).forEach(file => {
      const error = validateFile(file)
      if (error) {
        setError(error)
      } else {
        nuevosArchivos.push(file)
      }
    })

    if (nuevosArchivos.length > 0) {
      setArchivos(prev => [...prev, ...nuevosArchivos])
      
      // Auto-llenar título si está vacío y es el primer archivo
      if (!formData.titulo && nuevosArchivos[0]) {
        const nombreSinExtension = nuevosArchivos[0].name.replace(/\.[^/.]+$/, '')
        setFormData(prev => ({ ...prev, titulo: nombreSinExtension }))
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const eliminarArchivo = (index: number) => {
    setArchivos(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (archivos.length === 0) {
      setError('Por favor selecciona al menos un archivo')
      return
    }

    if (!formData.categoria) {
      setError('Por favor selecciona una categoría')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Subir cada archivo
      for (const archivo of archivos) {
        await documentosService.create({
          titulo: formData.titulo || archivo.name.replace(/\.[^/.]+$/, ''),
          tipo: formData.tipo,
          categoria: formData.categoria,
          fecha_vigencia: new Date().toISOString().split('T')[0],
          publico: true, // Siempre público
          archivo,
        })
      }
      
      // Resetear formulario
      setFormData({
        titulo: '',
        tipo: 'circular',
        categoria: '',
      })
      setArchivos([])
      
      onSuccess()
      onOpenChange(false)
    } catch (error) {
      console.error('Error al subir documentos:', error)
      setError('Error al subir los documentos. Por favor, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Subir Documentos</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Área de Drag & Drop */}
          <Card 
            className={`
              p-8 border-2 border-dashed transition-all cursor-pointer
              ${isDragging 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-400'
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`
                p-4 rounded-full mb-4
                ${isDragging ? 'bg-blue-500' : 'bg-gradient-to-br from-blue-500 to-cyan-400'}
              `}>
                <UploadCloud className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-lg font-semibold mb-2">
                {isDragging ? 'Suelta los archivos aquí' : 'Arrastra archivos o haz clic'}
              </h3>
              
              <p className="text-sm text-gray-600 mb-2">
                PDF, Imágenes, Videos, Documentos Office
              </p>
              
              <p className="text-xs text-gray-400">
                Máximo {formatFileSize(MAX_FILE_SIZE)} por archivo
              </p>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.jpeg,.jpg,.png,.gif,.mp4,.doc,.docx,.xls,.xlsx,.txt"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </Card>

          {/* Archivos seleccionados */}
          {archivos.length > 0 && (
            <div className="space-y-2">
              <Label>Archivos seleccionados ({archivos.length})</Label>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {archivos.map((archivo, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 flex-1">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{archivo.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(archivo.size)}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => eliminarArchivo(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Título (opcional si hay un solo archivo) */}
          <div className="space-y-2">
            <Label htmlFor="titulo">
              Título {archivos.length > 1 ? '(se usará el nombre del archivo si está vacío)' : ''}
            </Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
              placeholder="Título del documento (opcional)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Tipo */}
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo *</Label>
              <Select
                value={formData.tipo}
                onValueChange={(value: any) => setFormData(prev => ({ ...prev, tipo: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="circular">Circular</SelectItem>
                  <SelectItem value="protocolo">Protocolo</SelectItem>
                  <SelectItem value="formulario">Formulario</SelectItem>
                  <SelectItem value="guia">Guía</SelectItem>
                  <SelectItem value="reglamento">Reglamento</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="informe">Informe</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Categoría */}
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoría *</Label>
              <Select
                value={formData.categoria}
                onValueChange={(value) => setFormData(prev => ({ ...prev, categoria: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.icono} {cat.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading || archivos.length === 0}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Subiendo...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Subir {archivos.length > 1 ? `${archivos.length} archivos` : 'archivo'}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}