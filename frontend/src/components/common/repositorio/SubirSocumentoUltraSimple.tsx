import React, { useState, useRef } from 'react'
import { X, Upload, FileText, Image, Film, Check, AlertCircle } from 'lucide-react'
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { documentosService } from '@/api/services/documentosService'
import { categoriasService } from '@/api/services/categoriasService'
import type { CategoriaDocumento } from '@/types/documentos'

interface ArchivoPreview {
  file: File
  preview: string
  tipoDetectado: 'pdf' | 'imagen' | 'video' | 'otro'
}

// Categorías disponibles (se crearán automáticamente si no existen)
const CATEGORIAS_DISPONIBLES = [
  { value: 'circular', label: 'Circular' },
  { value: 'protocolo', label: 'Protocolo' },
  { value: 'formulario', label: 'Formulario' },
  { value: 'guia', label: 'Guía' },
  { value: 'procedimiento', label: 'Procedimiento' },
  { value: 'otro', label: 'Otro' },
]

interface SubirDocumentoUltraSimpleProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onSuccess?: () => void
  onDocumentoSubido?: () => void
}

export const SubirDocumentoUltraSimple: React.FC<SubirDocumentoUltraSimpleProps> = ({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  onSuccess,
  onDocumentoSubido,
}) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen
  const setOpen = isControlled ? (controlledOnOpenChange || (() => {})) : setInternalOpen
  const [archivos, setArchivos] = useState<ArchivoPreview[]>([])
  const [categoria, setCategoria] = useState<string>('')
  const [titulo, setTitulo] = useState<string>('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string>('')
  const [exito, setExito] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Detectar tipo de archivo
  const detectarTipoArchivo = (file: File): 'pdf' | 'imagen' | 'video' | 'otro' => {
    const type = file.type.toLowerCase()
    if (type === 'application/pdf') return 'pdf'
    if (type.startsWith('image/')) return 'imagen'
    if (type.startsWith('video/')) return 'video'
    return 'otro'
  }

  // Manejar selección de archivos
  const manejarArchivos = (files: FileList | null) => {
    if (!files) return

    const nuevosArchivos: ArchivoPreview[] = []
    Array.from(files).forEach((file) => {
      const tipoDetectado = detectarTipoArchivo(file)
      nuevosArchivos.push({
        file,
        preview: URL.createObjectURL(file),
        tipoDetectado,
      })
    })

    setArchivos((prev) => [...prev, ...nuevosArchivos])
    setError('')

    // Auto-llenar título si está vacío y solo hay un archivo
    if (!titulo && nuevosArchivos.length === 1) {
      const nombreSinExtension = nuevosArchivos[0].file.name.replace(/\.[^/.]+$/, '')
      setTitulo(nombreSinExtension)
    }
  }

  // Drag & Drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    manejarArchivos(e.dataTransfer.files)
  }

  // Eliminar archivo de la lista
  const eliminarArchivo = (index: number) => {
    setArchivos((prev) => {
      URL.revokeObjectURL(prev[index].preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  // Obtener o crear categoría
  const obtenerOCrearCategoria = async (nombreCategoria: string): Promise<number> => {
    try {
      // Primero intentar obtener todas las categorías
      const categorias = await categoriasService.getAll()
      
      // Buscar si ya existe (comparación case-insensitive)
      const categoriaExistente = categorias.find(
        (cat: CategoriaDocumento) => cat.nombre.toLowerCase() === nombreCategoria.toLowerCase()
      )

      if (categoriaExistente) {
        return categoriaExistente.id
      }

      // Si no existe, crearla
      const nuevaCategoria = await categoriasService.create({
        nombre: nombreCategoria,
        descripcion: `Categoría ${nombreCategoria}`,
      })

      return nuevaCategoria.id
    } catch (error) {
      console.error('Error al obtener/crear categoría:', error)
      throw new Error('No se pudo procesar la categoría')
    }
  }

  // Subir documentos
  const subirDocumentos = async () => {
    if (archivos.length === 0) {
      setError('Debes seleccionar al menos un archivo')
      return
    }

    if (!categoria) {
      setError('Debes seleccionar una categoría')
      return
    }

    setCargando(true)
    setError('')

    try {
      // Obtener o crear la categoría
      const categoriaId = await obtenerOCrearCategoria(categoria)

      // Subir cada archivo
      for (let i = 0; i < archivos.length; i++) {
        const archivo = archivos[i]
        
        // Determinar título: usar el campo título si hay un solo archivo, 
        // o el nombre del archivo si hay múltiples
        const tituloFinal = archivos.length === 1 && titulo
          ? titulo
          : archivo.file.name.replace(/\.[^/.]+$/, '')

        await documentosService.create({
          archivo: archivo.file,
          titulo: tituloFinal,
          descripcion: tituloFinal,
          tipo: categoria as any,
          categoria: categoriaId.toString(),
          fecha_vigencia: new Date().toISOString().split('T')[0],
          publico: true
        })
      }

      setExito(true)
      
      // Limpiar formulario después de 1.5 segundos
      setTimeout(() => {
        setArchivos([])
        setTitulo('')
        setCategoria('')
        setExito(false)
        setOpen(false)
        
        // Notificar al componente padre
        if (onSuccess) {
          onSuccess()
        }
        if (onDocumentoSubido) {
          onDocumentoSubido()
        }
      }, 1500)
    } catch (err) {
      console.error('Error al subir documentos:', err)
      setError('Error al subir los documentos. Por favor, intenta nuevamente.')
    } finally {
      setCargando(false)
    }
  }

  // Limpiar previews al cerrar
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      archivos.forEach((archivo) => URL.revokeObjectURL(archivo.preview))
      setArchivos([])
      setTitulo('')
      setCategoria('')
      setError('')
      setExito(false)
    }
    setOpen(newOpen)
  }

  // Obtener ícono según tipo de archivo
  const obtenerIcono = (tipo: string) => {
    switch (tipo) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />
      case 'imagen':
        return <Image className="h-8 w-8 text-blue-500" />
      case 'video':
        return <Film className="h-8 w-8 text-purple-500" />
      default:
        return <FileText className="h-8 w-8 text-gray-500" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {!isControlled && (
        <DialogTrigger asChild>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Subir Documento
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Subir Nuevo Documento</DialogTitle>
          <DialogDescription>
            Arrastra archivos aquí o haz clic para seleccionar
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Área de drag & drop */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              Arrastra archivos aquí o haz clic para seleccionar
            </p>
            <p className="text-xs text-gray-500">
              Soporta PDF, imágenes y videos
            </p>
            <input
              ref={inputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => manejarArchivos(e.target.files)}
              accept=".pdf,image/*,video/*"
            />
          </div>

          {/* Preview de archivos seleccionados */}
          {archivos.length > 0 && (
            <div className="space-y-2">
              <Label>Archivos seleccionados ({archivos.length})</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {archivos.map((archivo, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {obtenerIcono(archivo.tipoDetectado)}
                      <div className="text-sm">
                        <p className="font-medium">{archivo.file.name}</p>
                        <p className="text-gray-500">
                          {(archivo.file.size / 1024 / 1024).toFixed(2)} MB • {archivo.tipoDetectado}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => eliminarArchivo(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Título (opcional si hay un solo archivo) */}
          {archivos.length === 1 && (
            <div className="space-y-2">
              <Label htmlFor="titulo">
                Título (opcional, se usa el nombre del archivo si está vacío)
              </Label>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ej: Circular de vacaciones 2025"
              />
            </div>
          )}

          {/* Categoría */}
          <div className="space-y-2">
            <Label htmlFor="categoria">Categoría *</Label>
            <Select value={categoria} onValueChange={setCategoria}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIAS_DISPONIBLES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mensajes de error/éxito */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {exito && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              <Check className="h-4 w-4" />
              ¡Documentos subidos exitosamente!
            </div>
          )}

          {/* Botones */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={cargando}
            >
              Cancelar
            </Button>
            <Button onClick={subirDocumentos} disabled={cargando}>
              {cargando ? 'Subiendo...' : 'Subir Documentos'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}