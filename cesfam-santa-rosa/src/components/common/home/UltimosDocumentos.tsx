// src/components/common/home/UltimosDocumentos.tsx
import React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { FileText, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Documento {
  id: string | number
  nombre: string
  categoria: string
  fecha: string | Date
  size: string
}

interface UltimosDocumentosProps {
  documentos: Documento[]
  titulo?: string
  descripcion?: string
}

export const UltimosDocumentos: React.FC<UltimosDocumentosProps> = ({
  documentos,
  titulo = "Documentos Recientes",
  descripcion = "Últimos documentos publicados",
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-xl">
          <FileText className="h-5 w-5 text-green-600" />
          <span>{titulo}</span>
        </CardTitle>
        <CardDescription>{descripcion}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {documentos.map(doc => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3 flex-1">
                <FileText className="h-8 w-8 text-gray-400" />
                <div>
                  <h4 className="font-bold text-gray-900">{doc.nombre}</h4>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Badge variant="outline" className="text-xs">{doc.categoria}</Badge>
                    <span>•</span>
                    <span>{new Date(doc.fecha).toLocaleDateString("es-CL")}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
