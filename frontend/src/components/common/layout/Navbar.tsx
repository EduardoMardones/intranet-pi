import React from "react";
import { Link } from "react-router-dom";
import { FaClinicMedical } from "react-icons/fa";
import { PerfilIconButton } from "../buttons/PerfilIconButton";
import { mockUserProfile } from "@/data/mockPerfil"; // Importa mockUserProfile

export const Navbar: React.FC = () => {
  // Aquí puedes obtener la URL del avatar y las iniciales del usuario loggeado.
  // Por ahora, usaremos los datos mock. En una app real, vendrían de tu estado de autenticación.
  const userAvatarUrl = mockUserProfile.avatar; // 'mockUserProfile.avatar' puede ser undefined si no hay foto
  const userInitials = `${mockUserProfile.nombre.charAt(0)}${mockUserProfile.apellidos.charAt(0)}`;
  const userName = `${mockUserProfile.nombre} ${mockUserProfile.apellidos}`;

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
          to="/home"
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

      {/* Reemplaza el Avatar existente con PerfilIconButton */}
      <PerfilIconButton
        userName={userName}
        userInitials={userInitials}
        userAvatarUrl={userAvatarUrl} // Pasa la URL del avatar aquí
      />
    </div>
  );
};