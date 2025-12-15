// ======================================================
// UNIFIED NAVBAR - Navbar dinámico basado en permisos
// Ubicación: src/components/common/layout/UnifiedNavbar.tsx
// ======================================================

import React from "react";
import { Link } from "react-router-dom";
import { PerfilIconButton } from "../buttons/PerfilIconButton";
import { useAuth } from "@/api/contexts/AuthContext";
import { usePermissions } from "@/hooks/userPermissions";
import cesfamLogo from '@/components/images/cesfamsta.png';

export const UnifiedNavbar: React.FC = () => {
  const { user } = useAuth();
  const permisos = usePermissions();

  // Datos del usuario para el avatar
  const userAvatarUrl = user?.avatar;
  const userInitials = user 
    ? `${user.nombre.charAt(0)}${user.apellido_paterno.charAt(0)}`
    : "U";
  
  // Nombre completo para el tooltip/alt
  const userNameComplete = user?.nombre_completo || "Usuario";

  // Datos para mostrar texto (Nombre + Apellido y Cargo)
  const userDisplayName = user ? `${user.nombre} ${user.apellido_paterno}` : "Usuario";
  const userJobTitle = user?.cargo || "Funcionario";

  return (
    <div className="fixed top-0 left-0 w-full h-16 shadow flex items-center justify-between px-6 z-50 bg-white">
      
      {/* =========================================================
          LOGO A LA IZQUIERDA
      ========================================================= */}
      <Link to="/home" className="flex items-center gap-3 group select-none">
        {/* Imagen del Logo */}
        <img 
          src={cesfamLogo} 
          alt="Logo CESFAM" 
          className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Texto separado */}
        <div className="font-semibold text-lg text-gray-700 flex gap-1.5">
          <span className="transition-colors duration-300 group-hover:text-[#F19106]">
            CESFAM
          </span>
          <span className="transition-colors duration-300 group-hover:text-[#95C122]">
            Intranet
          </span>
        </div>
      </Link>

      {/* =========================================================
          NAVEGACIÓN CENTRAL
      ========================================================= */}
      <nav className="flex gap-8">
        <Link to="/home" className="text-gray-700 font-semibold text-lg hover:text-orange-500 transition">
          Inicio
        </Link>

        {(permisos.esFuncionario || permisos.esJefatura) && (
          <Link to="/vacaciones" className="text-gray-700 font-semibold text-lg hover:text-blue-500 transition">
            Mis Solicitudes
          </Link>
        )}

        {permisos.puedeAprobarSolicitudes && (
          <Link to="/aprobaciones" className="text-gray-700 font-semibold text-lg hover:text-blue-600 transition">
            Aprobaciones
          </Link>
        )}

        <Link to="/repositorio" className="text-gray-700 font-semibold text-lg hover:text-yellow-500 transition">
          Archivos
        </Link>

        <Link to="/anuncios" className="text-gray-700 font-semibold text-lg hover:text-red-500 transition">
          Anuncios
        </Link>

        <Link to="/actividades" className="text-gray-700 font-semibold text-lg hover:text-purple-500 transition">
          Actividades
        </Link>

        <Link to="/calendario" className="text-gray-700 font-semibold text-lg hover:text-green-500 transition">
          Calendario
        </Link>

        <Link to="/directorio" className="text-gray-700 font-semibold text-lg hover:text-pink-500 transition">
          Directorio
        </Link>

        {permisos.puedeGestionarLicencias && (
          <Link to="/licencias" className="text-gray-700 font-semibold text-lg hover:text-indigo-500 transition">
            Licencias
          </Link>
        )}

        <Link to="/soporte" className="text-gray-700 font-semibold text-lg hover:text-gray-500 transition">
          Soporte
        </Link>
      </nav>

      {/* =========================================================
          SECCIÓN DERECHA: DATOS DE USUARIO + AVATAR
      ========================================================= */}
      <div className="flex items-center gap-3">
        {/* Texto con Nombre y Cargo (Solo visible si hay usuario) */}
        {user && (
          <div className="flex flex-col items-end mr-1">
            {/* Nombre en Negrita */}
            <span className="text-sm font-bold text-gray-700 leading-tight">
              {userDisplayName}
            </span>
            {/* Cargo en letra normal y un poco más pequeña/gris */}
            <span className="text-xs text-gray-500 font-normal">
              {userJobTitle}
            </span>
          </div>
        )}

        {/* Botón de perfil */}
        <PerfilIconButton
          userName={userNameComplete}
          userInitials={userInitials}
          userAvatarUrl={userAvatarUrl}
        />
      </div>

    </div>
  );
};

export default UnifiedNavbar;