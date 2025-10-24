// src/components/common/navbar/Navbar.tsx
import React from "react"
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaClinicMedical } from "react-icons/fa"

export const Navbar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-16 shadow flex items-center justify-between px-6 z-50 bg-white">
      {/* Logo a la izquierda */}
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-full bg-[#009DDC]">
          <FaClinicMedical className="text-white text-2xl" />
        </div>
        <span className="font-semibold text-lg text-gray-700">CESFAM Intranet</span>
      </div>

      {/* Navegación */}
      <div className="flex gap-12">
        <Link
          to="/"
          className="text-gray-700 font-semibold text-lg hover:text-orange-500 transition"
        >
          Inicio
        </Link>
        <Link
          to="/vacaciones"
          className="text-gray-700 font-semibold text-lg hover:text-blue-500 transition"
        >
          Solicitudes
        </Link>
        <Link
          to="/repositorio"
          className="text-gray-700 font-semibold text-lg hover:text-yellow-500 transition"
        >
          Archivos
        </Link>
        <Link
          to="/anuncios"
          className="text-gray-700 font-semibold text-lg hover:text-red-500 transition"
        >
          Anuncios
        </Link>
        <Link
          to="/actividades"
          className="text-gray-700 font-semibold text-lg hover:text-purple-500 transition"
        >
          Actividades
        </Link>
        <Link
          to="/calendario"
          className="text-gray-700 font-semibold text-lg hover:text-green-500 transition"
        >
          Calendario
        </Link>
         <Link
          to="/directorio"
          className="text-gray-700 font-semibold text-lg hover:text-pink-500 transition"
        >
          Directorio
        </Link>
        <button className="text-gray-700 font-semibold text-lg hover:gray-500 transition">
          Soporte
        </button>
      </div>

      {/* Avatar a la derecha */}
      <Avatar>
        <AvatarImage src="/ruta/a/tu/avatar.jpg" alt="Perfil" />
        <AvatarFallback className="font-bold bg-[#009DDC] text-white">
          BV
        </AvatarFallback>
      </Avatar>
      
    </div>
    
  )
}
