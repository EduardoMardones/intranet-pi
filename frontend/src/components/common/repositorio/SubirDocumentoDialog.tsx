import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { documentosService, type CategoriaDocumento } from '@/api/services/documentosService'
import { Upload, Loader2, FileText } from 'lucide-react'

interface SubirDocumentoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function SubirDocumentoDialog({ open, onOpenChange, onSuccess }: SubirDocumentoDialogProps) {
  const [loading, setLoading] = useState(false)
  const [categorias, setCategorias] = useState<CategoriaDocumento[]>([])
  const [archivo, setArchivo] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    tipo: 'circular' as const,
    categoria: '',
    version: '1.0',
    fecha_vigencia: new Date().toISOString().split('T')[0],
    fecha_expiracion: '',
    publico: true,
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setArchivo(file)
      
      // Auto-llenar título si está vacío
      if (!formData.titulo) {
        const nombreSinExtension = file.name.replace(/\.[^/.]+$/, '')
        setFormData(prev => ({ ...prev, titulo: nombreSinExtension }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!archivo) {
      alert('Por favor selecciona un archivo')
      return
    }

    if (!formData.categoria) {
      alert('Por favor selecciona una categoría')
      return
    }

    setLoading(true)
    try {
      await documentosService.create({
        ...formData,
        archivo,
      })
      
      // Resetear formulario
      setFormData({
        titulo: '',
        descripcion: '',
        tipo: 'circular',
        categoria: '',
        version: '1.0',
        fecha_vigencia: new Date().toISOString().split('T')[0],
        fecha_expiracion: '',
        publico: true,
      })
      setArchivo(null)
      
      onSuccess()
      onOpenChange(false)
    } catch (error) {
      console.error('Error al subir documento:', error)
      alert('Error al subir el documento. Por favor, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Subir Nuevo Documento</DialogTitle>
          <DialogDescription>
            Completa la información del documento y selecciona el archivo a subir
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Archivo */}
          <div className="space-y-2">
            <Label htmlFor="archivo">Archivo *</Label>
            <div className="flex items-center gap-2">
              <Input
                id="archivo"
                type="file"
                onChange={handleFileChange}
                required
                className="flex-1"
              />
              {archivo && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>{(archivo.size / 1024).toFixed(2)} KB</span>
                </div>
              )}
            </div>
          </div>

          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="titulo">Título *</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
              required
              placeholder="Título del documento"
            />
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
              placeholder="Descripción del documento"
              rows={3}
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
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Versión */}
            <div className="space-y-2">
              <Label htmlFor="version">Versión</Label>
              <Input
                id="version"
                value={formData.version}
                onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                placeholder="1.0"
              />
            </div>

            {/* Fecha Vigencia */}
            <div className="space-y-2">
              <Label htmlFor="fecha_vigencia">Fecha de Vigencia *</Label>
              <Input
                id="fecha_vigencia"
                type="date"
                value={formData.fecha_vigencia}
                onChange={(e) => setFormData(prev => ({ ...prev, fecha_vigencia: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Fecha Expiración */}
          <div className="space-y-2">
            <Label htmlFor="fecha_expiracion">Fecha de Expiración (opcional)</Label>
            <Input
              id="fecha_expiracion"
              type="date"
              value={formData.fecha_expiracion}
              onChange={(e) => setFormData(prev => ({ ...prev, fecha_expiracion: e.target.value }))}
            />
          </div>

          {/* Público */}
          <div className="flex items-center space-x-2">
            <input
              id="publico"
              type="checkbox"
              checked={formData.publico}
              onChange={(e) => setFormData(prev => ({ ...prev, publico: e.target.checked }))}
              className="w-4 h-4"
            />
            <Label htmlFor="publico" className="cursor-pointer">
              Documento público (visible para todos los usuarios)
            </Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Subiendo...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Subir Documento
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}