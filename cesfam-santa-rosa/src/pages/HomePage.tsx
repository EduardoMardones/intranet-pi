import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Carouselcn from "@/components/common/home/Carouselcn";
import { FaRegClipboard, FaRegFolder, FaBullhorn, FaRegCalendarAlt, FaClinicMedical } from "react-icons/fa";
import { HomeCardSection } from "@/components/common/home/HomeCardSection";

import slide1 from "../components/images/cesfam_1.jpg";
import slide2 from "../components/images/cesfam_2.jpg";
import slide3 from "../components/images/cesfam_3.jpg";

export default function HomePage() {
  const slides = [slide1, slide2, slide3];

  return (
    <div className="px-4">
      {/* === NAVBAR COMBINADO === */}
      <div
        className="fixed top-0 left-0 w-full h-16 shadow flex items-center justify-between px-6 z-50 bg-white"
      >
        {/* Logo / Ícono a la izquierda */}
        <div className="flex items-center gap-2">
          <div
            className="p-2 rounded-full"
            style={{ backgroundColor: "#009DDC" }}
          >
            <FaClinicMedical className="text-white text-2xl" />
          </div>
          <span className="font-semibold text-lg text-gray-700">CESFAM Intranet</span>
        </div>

        {/* Opciones centrales del navbar */}
        <div className="flex gap-8">
          <button className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition">
            <FaRegClipboard className="text-xl" />
            <span className="text-xs">Solicitudes</span>
          </button>

          <button className="flex flex-col items-center text-gray-600 hover:text-yellow-500 transition">
            <FaRegFolder className="text-xl" />
            <span className="text-xs">Archivos</span>
          </button>

          <button className="flex flex-col items-center text-gray-600 hover:text-red-500 transition">
            <FaBullhorn className="text-xl" />
            <span className="text-xs">Anuncios</span>
          </button>

          <button className="flex flex-col items-center text-gray-600 hover:text-green-500 transition">
            <FaRegCalendarAlt className="text-xl" />
            <span className="text-xs">Eventos</span>
          </button>
        </div>

        {/* Avatar a la derecha */}
        <Avatar>
          <AvatarImage src="/ruta/a/tu/avatar.jpg" alt="Perfil" />
          <AvatarFallback
            className="font-bold"
            style={{ backgroundColor: "#009DDC", color: "#fff" }}
          >
            BV
          </AvatarFallback>
        </Avatar>
      </div>

      {/* === CONTENIDO === */}
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
      
      <HomeCardSection></HomeCardSection>
      
    </div>
  );
}
