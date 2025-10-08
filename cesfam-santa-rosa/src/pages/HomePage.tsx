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
      // En tu componente de página, por ejemplo HomePage o algún layout

  <div className="relative w-full h-[400px] pt-120px" >  {/* Ajusta altura según necesidad */}
    <img
      src={bannerHome}
      alt="Banner principal"
      className="object-cover object-[center_-40px] w-full h-full"
    />

    {/* Opcional: capa superpuesta (overlay) */}
    <div className="absolute inset-0 bg-black opacity-10"></div>
    {/* Contenido sobre el banner */}
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
  <h1 className="text-cyan-500 text-4xl font-bold">Bienvenido</h1>
  <h1 className="text-cyan-500 text-4xl font-bold">Te estábamos esperando!</h1>
</div>

    
  </div>


      {/* Fondo azul claro levemente plomo */}
      <div
        className="flex-1 px-[200px] pt-16 min-h-screen"
        style={{ backgroundColor: "#E6EEF3" }}  // 🟢 cambio hecho aquí
      >
        <Carouselcn slides={slides} />
        <h1 className="text-3xl font-bold mb-4">Bienvenida a la Homepage 🎉</h1>
        <p className="text-lg mb-6">
          Aquí irá el contenido de la página, con padding lateral.
        </p>

        <HomeCardSection />
        <div className="flex justify-between items-start w-full">
          <UltimosDocumentos documentos={mockDocumentos} />
          <Calendar31 />
        </div>
      </div>

      <Footer />
    </>
  )
}
