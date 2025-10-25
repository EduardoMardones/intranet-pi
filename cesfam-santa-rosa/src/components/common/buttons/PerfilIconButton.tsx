import React, { useState, useEffect, useRef } from "react";
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
import { mockUserProfile } from "@/data/mockPerfil"; // Asume que la info del usuario se carga de aquí o de un contexto global

interface PerfilIconButtonProps {
  // Puedes pasar la información del usuario como props si no usas un contexto global
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
  // Usaremos un estado local para el avatar si se cambia en el perfil
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(propUserAvatarUrl);
  const [initials, setInitials] = useState<string>(
    propUserInitials || getInitials(mockUserProfile.nombre, mockUserProfile.apellidos)
  );
  const [fullName, setFullName] = useState<string>(
    propUserName || `${mockUserProfile.nombre} ${mockUserProfile.apellidos}`
  );

  // Efecto para actualizar el estado del avatar si las props cambian (ej. desde el perfil)
  useEffect(() => {
    setAvatarUrl(propUserAvatarUrl);
  }, [propUserAvatarUrl]);

  useEffect(() => {
    setInitials(propUserInitials || getInitials(mockUserProfile.nombre, mockUserProfile.apellidos));
  }, [propUserInitials]);

  useEffect(() => {
    setFullName(propUserName || `${mockUserProfile.nombre} ${mockUserProfile.apellidos}`);
  }, [propUserName]);


  // Función para obtener las iniciales del nombre completo
  function getInitials(nombre: string, apellidos: string): string {
    return `${nombre.charAt(0)}${apellidos.charAt(0)}`;
  }

  const handleLogout = () => {
    // Aquí iría tu lógica para cerrar sesión (limpiar tokens, etc.)
    console.log("Cerrando sesión...");
    navigate("/login"); // Redirige al LoginPage
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
              {mockUserProfile.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/perfil">
            Perfil de Usuario
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:bg-red-50 hover:text-red-700">
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};