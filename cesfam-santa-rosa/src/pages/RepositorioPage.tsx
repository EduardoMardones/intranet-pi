import { RepositorioTable } from "@/components/common/repositorio/RepositorioTable"
import React from "react"
import { Navbar } from "@/components/common/layout/Navbar"
import Footer from "@/components/common/layout/Footer"

export const RepositorioPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar fija */}
      <Navbar />

      {/* Contenido principal con padding superior igual a la altura del navbar */}
      <div className="flex-1 px-[60px] pt-20"> 
        <h1 className="text-2xl font-bold text-cyan-600 mb-4">
          Repositorio de Documentos
        </h1>

        <main className="p-6">
          <RepositorioTable />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
