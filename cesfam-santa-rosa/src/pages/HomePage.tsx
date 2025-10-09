import Carouselcn from "@/components/common/home/Carouselcn"
import { HomeCardSection } from "@/components/common/home/HomeCardSection"
import { Navbar } from "@/components/common/layout/Navbar"
import slide1 from "../components/images/cesfam_1.jpg"
import slide2 from "../components/images/cesfam_2.jpg"
import slide3 from "../components/images/cesfam_3.jpg"
import { UltimosDocumentos } from "@/components/common/home/UltimosDocumentos"
import Footer from "@/components/common/layout/Footer"
import { Calendar31 } from "@/components/common/calendario/Calendar31"
import bannerHome from "@/components/images/banner_images/banner_home.png"
import Banner from "@/components/common/layout/Banner";




const mockDocumentos = [
  { id: 1, nombre: "Informe Mensual", categoria: "Reportes", fecha: "2025-10-05", size: "1.2 MB" },
  { id: 2, nombre: "Planificación 2026", categoria: "Planificación", fecha: "2025-09-30", size: "900 KB" },
  { id: 3, nombre: "Acta Reunión", categoria: "Actas", fecha: "2025-10-01", size: "600 KB" },
]

export default function HomePage() {
  const slides = [slide1, slide2, slide3]

  return (
    <>
      <Navbar />
      <div className="h-15" /> {/* Este espacio ocupa la altura del Navbar */}


      <Banner
        imageSrc={bannerHome}
        title="Bienvenido"
        subtitle="Te estábamos esperando!"
        height="400px"
      />


      {/* Fondo azul claro levemente plomo */}
      <div
        className="flex-1 px-[200px] pt-1 min-h-screen"
        style={{ backgroundColor: "#E6EEF3" }}  // 🟢 cambio hecho aquí
      >        
      <HomeCardSection />

        <Carouselcn slides={slides} />
        <h1 className="text-3xl font-bold mb-4">Bienvenida a la Homepage 🎉</h1>
        <p className="text-lg mb-6">
          Aquí irá el contenido de la página, con padding lateral.
        </p>

        <div className="flex justify-between items-start w-full">
          <UltimosDocumentos documentos={mockDocumentos} />
          <Calendar31 />
        </div>
      </div>

      <Footer />
    </>
  )
}
