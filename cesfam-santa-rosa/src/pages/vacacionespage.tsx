import React from "react"
import { VacacionesTable } from "@/components/common/tablas/VacacionesTable"
import { CardSection } from "@/components/common/vacaciones/CardSection"

const VacacionesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-[60px]">
    <h1 className="text-2xl font-bold text-cyan-600 mb-4">Solicitudes de Vacaciones</h1>

        <CardSection></CardSection>
      {/* Contenedor de contenido */}
      <main className="p-6">
        <VacacionesTable />
      </main>
    </div>
  )
}

export default VacacionesPage