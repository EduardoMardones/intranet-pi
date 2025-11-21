// ======================================================
// PERFIL ICON BUTTON - CORREGIDO CON LOGOUT FUNCIONAL
// Ubicación: src/components/common/buttons/PerfilIconButton.tsx
// ======================================================

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/api/contexts/AuthContext";

interface PerfilIconButtonProps {
  userName?: string;
  userInitials?: string;
  userAvatarUrl?: string;
}

export const PerfilIconButton: React.FC<PerfilIconButtonProps> = ({
  userName: propUserName,
  userInitials: propUserInitials,
  userAvatarUrl: propUserAvatarUrl,
}) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Usar datos del usuario autenticado si están disponibles, sino usar props
  const fullName = user?.nombre_completo || propUserName || "Usuario";
  const email = user?.email || "";
  const initials = user 
    ? `${user.nombre.charAt(0)}${user.apellido_paterno.charAt(0)}`
    : propUserInitials || "U";
  const avatarUrl = user?.avatar || propUserAvatarUrl;

  const handleLogout = async () => {
    try {
      console.log("🚪 Cerrando sesión...");
      
      // Ejecutar logout del contexto
      await logout();
      
      // Redirigir al login
      navigate("/login", { replace: true });
      
      console.log("✅ Sesión cerrada, redirigiendo...");
    } catch (error) {
      console.error("❌ Error al cerrar sesión:", error);
      // Aún así, intentar redirigir
      navigate("/login", { replace: true });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none rounded-full ring-2 ring-transparent hover:ring-[#009DDC] transition-all">
          <Avatar className="w-10 h-10 cursor-pointer">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={fullName} />
            ) : (
              <AvatarFallback className="font-bold bg-[#009DDC] text-white">
                {initials}
              </AvatarFallback>
            )}
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
            {user?.cargo && (
              <p className="text-xs leading-none text-muted-foreground mt-1">
                {user.cargo}
              </p>
            )}
            {user?.area_nombre && (
              <p className="text-xs leading-none text-muted-foreground">
                {user.area_nombre}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/perfil">
            Perfil de Usuario
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout} 
          className="text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
        >
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};