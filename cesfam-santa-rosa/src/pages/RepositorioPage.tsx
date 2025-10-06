import { RepositorioTable } from "@/components/common/repositorio/RepositorioTable"
import React from "react"

export const RepositorioPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-[60px]">
    <h1 className="text-2xl font-bold text-cyan-600 mb-4">Solicitudes de Vacaciones</h1>

      {/* Contenedor de contenido */}
      <main className="p-6">
        <RepositorioTable />
      </main>
    </div>
  )
}

