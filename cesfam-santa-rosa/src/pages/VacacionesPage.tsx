import React from "react"
import { VacacionesTable } from "@/components/common/vacaciones/VacacionesTable"
import { CardSection } from "@/components/common/vacaciones/VacacionesCardSection"
import { Navbar } from "@/components/common/layout/Navbar"
import Footer from "@/components/common/layout/Footer"

const VacacionesPage: React.FC = () => {
  return (
    <div>
    <div className="flex-1 px-[200px] pt-20">  {/* 🟢 esta línea tiene el cambio */}      <Navbar></Navbar>
    <h1 className="text-2xl font-bold text-cyan-600 mb-4">Solicitudes de Vacaciones</h1>

        <CardSection></CardSection>

      {/* Contenedor de contenido */}
      <main className="">
        <VacacionesTable />
      </main>
      
    </div>
    <Footer></Footer>
    </div>
  )
}

export default VacacionesPage