import Carouselcn from "@/components/common/home/Carouselcn"
import { HomeCardSection } from "@/components/common/home/HomeCardSection"
import { Navbar } from "@/components/common/layout/Navbar"
import slide1 from "../components/images/cesfam_1.jpg"
import slide2 from "../components/images/cesfam_2.jpg"
import slide3 from "../components/images/cesfam_3.jpg"
import { UltimosDocumentos } from "@/components/common/home/UltimosDocumentos"
import Footer from "@/components/common/layout/Footer"

const mockDocumentos = [
  { id: 1, nombre: "Informe Mensual", categoria: "Reportes", fecha: "2025-10-05", size: "1.2 MB" },
  { id: 2, nombre: "Planificación 2026", categoria: "Planificación", fecha: "2025-09-30", size: "900 KB" },
  { id: 3, nombre: "Acta Reunión", categoria: "Actas", fecha: "2025-10-01", size: "600 KB" },
]

export default function HomePage() {
  const slides = [slide1, slide2, slide3]

  return (
    <>
      <div className="px-[200px]">
        <Navbar />

        <div className="pt-24 space-y-12">
          <h1 className="text-3xl font-bold mb-4">Bienvenida a la Homepage 🎉</h1>
          <p className="text-lg mb-6">
            Aquí irá el contenido de la página, con padding para que no quede debajo del navbar.
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-2 mt-8">Shadcn / Embla Carousel</h2>
            <div className="max-w-4xl h-64 mx-auto">
              <Carouselcn slides={slides} />
            </div>
          </div>
        </div>

        <HomeCardSection />
        <UltimosDocumentos documentos={mockDocumentos} />
      </div>

      <Footer /> {/* Footer fuera del div con padding */}
    </>
  )
}
