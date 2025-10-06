import { RepositorioTable } from "@/components/common/repositorio/RepositorioTable"
import React from "react"
import { Navbar } from "@/components/common/layout/Navbar"
import Footer from "@/components/common/layout/Footer"

export const RepositorioPage: React.FC = () => {
  return (
    <div>
    <div className="min-h-screen bg-gray-50 px-[60px]">
      <Navbar></Navbar>
    <h1 className="text-2xl font-bold text-cyan-600 mb-4">Solicitudes de Vacaciones</h1>

      {/* Contenedor de contenido */}
      <main className="p-6">
        <RepositorioTable />
      </main>
    </div>
    <Footer></Footer>
    </div>
  )
}

