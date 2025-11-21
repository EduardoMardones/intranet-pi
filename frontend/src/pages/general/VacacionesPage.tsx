import React from "react"
import { VacacionesTable } from "@/components/common/vacaciones/VacacionesTable"
import { CardSection } from "@/components/common/vacaciones/VacacionesCardSection"
import { Navbar } from "@/components/common/layout/Navbar"
import Footer from "@/components/common/layout/Footer"
import Banner from '@/components/common/layout/Banner';
import bannerHome from "@/components/images/banner_images/BannerSolicitudes.png"
import { CalendarDays, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VacacionesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="h-16" />
      <Banner
        imageSrc={bannerHome}
        title=""
        subtitle=""
        height="250px"
      />

      <div className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">

          {/* HEADER DE SOLICITUDES */}
          <header className="bg-white shadow-xl rounded-xl overflow-hidden mb-6">
            <div className="py-8 px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] rounded-xl">
                    <CalendarDays className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                      Solicitudes de Vacaciones
                    </h1>
                    <p className="text-sm text-gray-500">
                      Gestión centralizada de tus días de descanso
                    </p>
                  </div>
                </div>

                {/* BOTÓN NUEVA SOLICITUD */}
                <button
                  onClick={() => navigate('/solicitardias')}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  <Plus className="w-5 h-5" />
                  Nueva Solicitud
                </button>
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