import React from "react"
import { VacacionesTable } from "@/components/common/vacaciones/VacacionesTable"
import { CardSection } from "@/components/common/vacaciones/VacacionesCardSection"
import { Navbar } from "@/components/common/layout/Navbar"
import Footer from "@/components/common/layout/Footer"

const VacacionesPage: React.FC = () => {
  return (
    <div>
    <div className="min-h-screen bg-gray-50 px-[60px]">
      <Navbar></Navbar>
    <h1 className="text-2xl font-bold text-cyan-600 mb-4">Solicitudes de Vacaciones</h1>

        <CardSection></CardSection>
      {/* Contenedor de contenido */}
      <main className="p-6">
        <VacacionesTable />
      </main>
      
    </div>
    <Footer></Footer>
    </div>
  )
}

export default VacacionesPage