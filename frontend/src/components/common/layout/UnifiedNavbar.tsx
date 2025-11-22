// ======================================================
// UNIFIED NAVBAR - Navbar dinámico basado en permisos
// Ubicación: src/components/common/layout/UnifiedNavbar.tsx
// ======================================================

import React from "react";
import { Link } from "react-router-dom";
import { FaClinicMedical } from "react-icons/fa";
import { PerfilIconButton } from "../buttons/PerfilIconButton";
import { useAuth } from "@/api/contexts/AuthContext";
import { usePermissions } from "@/hooks/userPermissions";
export const UnifiedNavbar: React.FC = () => {
  const { user } = useAuth();
  const permisos = usePermissions();

  // Datos del usuario para el avatar
  const userAvatarUrl = user?.avatar;
  const userInitials = user 
    ? `${user.nombre.charAt(0)}${user.apellido_paterno.charAt(0)}`
    : "U";
  const userName = user?.nombre_completo || "Usuario";

  return (
    <div className="fixed top-0 left-0 w-full h-16 shadow flex items-center justify-between px-6 z-50 bg-white">
      {/* Logo a la izquierda */}
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-full bg-[#009DDC]">
          <FaClinicMedical className="text-white text-2xl" />
        </div>
        <span className="font-semibold text-lg text-gray-700">CESFAM Intranet</span>
      </div>

      {/* Navegación Dinámica */}
      <nav className="flex gap-8">
        {/* ==================== INICIO - TODOS ==================== */}
        <Link
          to="/home"
          className="text-gray-700 font-semibold text-lg hover:text-orange-500 transition"
        >
          Inicio
        </Link>

        {/* ==================== SOLICITUDES - Funcionarios y Jefaturas ==================== */}
        {(permisos.esFuncionario || permisos.esJefatura) && (
          <Link
            to="/vacaciones"
            className="text-gray-700 font-semibold text-lg hover:text-blue-500 transition"
          >
            Mis Solicitudes
          </Link>
        )}

        {/* ==================== APROBACIONES - Jefatura, Subdirección y Dirección ==================== */}
        {permisos.puedeAprobarSolicitudes && (
          <Link
            to="/aprobaciones"
            className="text-gray-700 font-semibold text-lg hover:text-blue-600 transition"
          >
            Aprobaciones
          </Link>
        )}

        {/* ==================== ARCHIVOS - TODOS ==================== */}
        <Link
          to="/repositorio"
          className="text-gray-700 font-semibold text-lg hover:text-yellow-500 transition"
        >
          Archivos
        </Link>

        {/* ==================== ANUNCIOS - TODOS ==================== */}
        <Link
          to="/anuncios"
          className="text-gray-700 font-semibold text-lg hover:text-red-500 transition"
        >
          Anuncios
        </Link>

        {/* ==================== ACTIVIDADES - TODOS ==================== */}
        <Link
          to="/actividades"
          className="text-gray-700 font-semibold text-lg hover:text-purple-500 transition"
        >
          Actividades
        </Link>

        {/* ==================== CALENDARIO - TODOS ==================== */}
        <Link
          to="/calendario"
          className="text-gray-700 font-semibold text-lg hover:text-green-500 transition"
        >
          Calendario
        </Link>

        {/* ==================== DIRECTORIO - TODOS ==================== */}
        <Link
          to="/directorio"
          className="text-gray-700 font-semibold text-lg hover:text-pink-500 transition"
        >
          Directorio
        </Link>

        {/* ==================== LICENCIAS MÉDICAS - Solo Subdirección y Dirección ==================== */}
        {permisos.puedeGestionarLicencias && (
          <Link
            to="/licencias"
            className="text-gray-700 font-semibold text-lg hover:text-indigo-500 transition"
          >
            Licencias
          </Link>
        )}

        {/* ==================== CREAR USUARIO - Solo Dirección ==================== */}
        {permisos.puedeCrearUsuarios && (
          <Link
            to="/crear-usuario"
            className="text-gray-700 font-semibold text-lg hover:text-cyan-500 transition"
          >
            Usuarios
          </Link>
        )}

        {/* ==================== SOPORTE - TODOS ==================== */}
        <Link
          to="/soporte"
          className="text-gray-700 font-semibold text-lg hover:text-gray-500 transition"
        >
          Soporte
        </Link>
      </nav>

      {/* Botón de perfil */}
      <PerfilIconButton
        userName={userName}
        userInitials={userInitials}
        userAvatarUrl={userAvatarUrl}
      />
    </div>
  );
};

export default UnifiedNavbar;