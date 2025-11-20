// ======================================================
// COMPONENTE: Navbar para Administradores
// Ubicación: src/components/common/layout/NavbarAdmin.tsx
// Descripción: Navbar con rutas específicas para usuarios admin
// ======================================================

import React from "react";
import { Link } from "react-router-dom";
import { FaClinicMedical } from "react-icons/fa";
import { PerfilIconButton } from "../buttons/PerfilIconButton";
import { mockUserProfile } from "@/data/mockPerfil";

export const NavbarAdmin: React.FC = () => {
  // Obtener datos del usuario (en producción vendrían del contexto de autenticación)
  const userAvatarUrl = mockUserProfile.avatar;
  const userInitials = `${mockUserProfile.nombre.charAt(0)}${mockUserProfile.apellidos.charAt(0)}`;
  const userName = `${mockUserProfile.nombre} ${mockUserProfile.apellidos}`;

  return (
    <div className="fixed top-0 left-0 w-full h-16 shadow flex items-center justify-between px-6 z-50 bg-white">
      {/* Logo a la izquierda */}
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-full bg-[#009DDC]">
          <FaClinicMedical className="text-white text-2xl" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-lg text-gray-700">CESFAM Intranet</span>
          <span className="text-xs text-purple-600 font-medium">👔 Panel Admin</span>
        </div>
      </div>

      {/* Navegación */}
      <div className="flex gap-8">
        <Link
          to="/home"
          className="text-gray-700 font-semibold text-base hover:text-orange-500 transition"
        >
          Inicio
        </Link>
        <Link
          to="/aprobacionesadmin"
          className="text-gray-700 font-semibold text-base hover:text-blue-500 transition"
        >
          Aprobaciones
        </Link>
        <Link
          to="/archivosadmin"
          className="text-gray-700 font-semibold text-base hover:text-yellow-500 transition"
        >
          Gestión Archivos
        </Link>
        <Link
          to="/anunciosadmin"
          className="text-gray-700 font-semibold text-base hover:text-red-500 transition"
        >
          Anuncios
        </Link>
        <Link
          to="/actividadesadmin"
          className="text-gray-700 font-semibold text-base hover:text-purple-500 transition"
        >
          Actividades
        </Link>
        <Link
          to="/calendarioadmin"
          className="text-gray-700 font-semibold text-base hover:text-green-500 transition"
        >
          Calendario
        </Link>
        <Link
          to="/directorioadmin"
          className="text-gray-700 font-semibold text-base hover:text-pink-500 transition"
        >
          Directorio
        </Link>
        <Link
          to="/crearusuarioadmin"
          className="text-gray-700 font-semibold text-base hover:text-indigo-500 transition"
        >
          Usuarios
        </Link>
        <Link
          to="/licencias"
          className="text-gray-700 font-semibold text-base hover:text-teal-500 transition"
        >
          Licencias
        </Link>
      </div>

      {/* Botón de perfil */}
      <PerfilIconButton
        userName={userName}
        userInitials={userInitials}
        userAvatarUrl={userAvatarUrl}
      />
    </div>
  );
};