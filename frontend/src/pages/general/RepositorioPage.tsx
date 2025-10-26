import { RepositorioTable } from "@/components/common/repositorio/RepositorioTable"
import React from "react"
import { Navbar } from "@/components/common/layout/Navbar"
import RepositorioHeader from "@/components/common/repositorio/RepositorioHeader"
import Footer from "@/components/common/layout/Footer"
import Banner from '@/components/common/layout/Banner';
import bannerHome from "@/components/images/banner_images/BannerArchivos.png"



export const RepositorioPage: React.FC = () => {
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
      <div className="flex-1 min-h-screen bg-gray-50 p-4 md:p-8"> {/* Usa p-4 md:p-8 como en CalendarioPage */}
        <div className="max-w-[1600px] mx-auto"> {/* Contenedor para el ancho máximo y centrado */}
          <RepositorioHeader />

          <main className="">
            <RepositorioTable />
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}