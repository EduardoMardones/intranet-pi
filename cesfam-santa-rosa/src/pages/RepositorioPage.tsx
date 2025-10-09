import { RepositorioTable } from "@/components/common/repositorio/RepositorioTable"
import React from "react"
import { Navbar } from "@/components/common/layout/Navbar"
import Footer from "@/components/common/layout/Footer"
import Banner from '@/components/common/layout/Banner';
import bannerHome from "@/components/images/banner_images/banner_home.png"



export const RepositorioPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar fija */}
      <Navbar />
      <div className="h-16" /> {/* Este espacio ocupa la altura del Navbar */}

      <Banner
        imageSrc={bannerHome}
        title="Bienvenido"
        subtitle="Te estábamos esperando!"
        height="250px"
      />
      {/* Contenido principal con padding superior igual a la altura del navbar */}
      <div className="flex-1 px-[200px] "> 
        <h1 className="text-2xl font-bold text-cyan-600 mb-4">
          Repositorio de Documentos
        </h1>

        <main className="">
          <RepositorioTable />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
