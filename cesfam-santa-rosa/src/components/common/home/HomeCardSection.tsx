// src/components/common/home/HomeCardSection.tsx
import React from "react"
import { HomeCard } from "./HomeCard"
import { 
  FaRegClipboard, 
  FaRegFolder, 
  FaBullhorn, 
  FaBirthdayCake,
  FaRegCalendarAlt, 
  FaQuestionCircle 
} from "react-icons/fa"

export const HomeCardSection: React.FC = () => {
  return (
    <div className="mt-20 mb-16 px-4">
      <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
      <div className="flex flex-wrap justify-center gap-6 p-4">
        <HomeCard
          title="Solicitudes"
          icon={FaRegClipboard}
          bgColor="bg-blue-400"
          textColor="text-white"
          iconColor="text-white"
        />
        <HomeCard
          title="Archivos"
          icon={FaRegFolder}
          bgColor="bg-yellow-400"
          textColor="text-white"
          iconColor="text-white"
        />
        <HomeCard
          title="Anuncios"
          icon={FaBullhorn}
          bgColor="bg-red-400"
          textColor="text-white"
          iconColor="text-white"
        />
        <HomeCard
          title="Eventos"
          icon={FaBirthdayCake} // ícono de celebración
          bgColor="bg-purple-400"
          textColor="text-white"
          iconColor="text-white"
        />
        <HomeCard
          title="Calendario"
          icon={FaRegCalendarAlt}
          bgColor="bg-green-400"
          textColor="text-white"
          iconColor="text-white"
        />
        <HomeCard
          title="Soporte"
          icon={FaQuestionCircle}
          bgColor="bg-pink-400"
          textColor="text-white"
          iconColor="text-white"
        />
      </div>
    </div>
  )
}
