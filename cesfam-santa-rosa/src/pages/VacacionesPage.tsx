import React from "react"
import { VacacionesTable } from "@/components/common/vacaciones/VacacionesTable"
import { CardSection } from "@/components/common/vacaciones/VacacionesCardSection"
import { Navbar } from "@/components/common/layout/Navbar"
import Footer from "@/components/common/layout/Footer"
import Banner from '@/components/common/layout/Banner';
import bannerHome from "@/components/images/banner_images/banner_home.png"



const VacacionesPage: React.FC = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="h-16" /> {/* Este espacio ocupa la altura del Navbar */}
    <Banner
        imageSrc={bannerHome}
        title="Bienvenido"
        subtitle="Te estábamos esperando!"
        height="250px"
      />
    <div className="flex-1 px-[200px]">  {/* 🟢 esta línea tiene el cambio */}      
      

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