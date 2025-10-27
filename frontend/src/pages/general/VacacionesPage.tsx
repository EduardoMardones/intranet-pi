import React from "react"
import { VacacionesTable } from "@/components/common/vacaciones/VacacionesTable"
import { CardSection } from "@/components/common/vacaciones/VacacionesCardSection"
import { Navbar } from "@/components/common/layout/Navbar"
import Footer from "@/components/common/layout/Footer"
import Banner from '@/components/common/layout/Banner';
import bannerHome from "@/components/images/banner_images/BannerSolicitudes.png"
import { CalendarDays } from "lucide-react"; // Importamos el ícono para el header

const VacacionesPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="h-16" /> {/* Este espacio ocupa la altura del Navbar */}
      <Banner
        imageSrc={bannerHome}
        title=""
        subtitle=""
        height="250px"
      />

      {/* Nuevo contenedor principal para el padding y ancho máximo */}
      <div className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 p-4 md:p-8">
        {/* Contenedor para el ancho máximo */}
        <div className="max-w-[1600px] mx-auto">

          {/* ======================================================
              HEADER DE SOLICITUDES (Nuevo, similar a los anteriores)
              ====================================================== */}
          <header className="bg-white shadow-xl border-b-4 border-[#009DDC] rounded-xl overflow-hidden mb-6">
            <div className="py-8 px-6">
              <div className="flex items-center gap-4">
                {/* Ícono decorativo */}
                <div className="p-3 bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] rounded-xl">
                  <CalendarDays className="w-6 h-6 text-white" />
                </div>

                {/* Título y subtítulo */}
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Solicitudes de Vacaciones
                  </h1>
                   <p className="text-sm text-gray-500">
                    Gestión centralizada de tus días de descanso
                  </p>
                  
                </div>
              </div>
            </div>
          </header>

          {/* Sección de tarjetas de resumen (CardSection) */}
          <section className="mb-6"> {/* Añadimos un margen inferior para separar de la tabla */}
            <CardSection />
          </section>

          {/* Contenedor de contenido principal (tabla) */}
          <main className="py-6"> {/* Ajustado a py-6 para consistencia */}
            <VacacionesTable />
          </main>

        </div> {/* Cierre del div max-w-[1600px] */}
      </div> {/* Cierre del div p-4 md:p-8 */}

      <Footer />
    </>
  )
}

export default VacacionesPage