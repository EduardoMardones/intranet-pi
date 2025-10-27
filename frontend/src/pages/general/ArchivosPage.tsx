import { RepositorioTable } from "@/components/common/repositorio/RepositorioTable"
import React from "react"
import { Navbar } from "@/components/common/layout/Navbar"
import RepositorioHeader from "@/components/common/repositorio/RepositorioHeader"
import Footer from "@/components/common/layout/Footer"
import Banner from '@/components/common/layout/Banner';
import bannerHome from "@/components/images/banner_images/BannerArchivos.png"



export const ArchivosPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar fija */}
      <Navbar />
      <div className="h-16" /> {/* Este espacio ocupa la altura del Navbar */}

      <Banner
        imageSrc={bannerHome}
        title=""
        subtitle=""
        height="250px"
      />
      
      {/* Nuevo contenedor principal para aplicar el padding y ancho máximo */}
      {/* AQUÍ ES DONDE APLICAMOS EL GRADIENTE Y AJUSTAMOS LA ALTURA MÍNIMA */}
      <div className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 p-4 md:p-8"> {/* Aplica el degradado aquí */}
        <div className="max-w-[1600px] mx-auto"> {/* Contenedor para el ancho máximo y centrado */}
          <RepositorioHeader />

          <main className="py-6"> {/* Agregué py-6 para tener un padding vertical similar al main de VacacionesPage */}
            <RepositorioTable />
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}