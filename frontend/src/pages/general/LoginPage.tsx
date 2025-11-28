// ==========================
// Página: Login
// Ubicación: src/pages/login.tsx
// Descripción: Vista principal de inicio de sesión con layout de dos columnas
// ==========================

import React from 'react';
import LoginForm from '@/components/common/login/LoginForm';
import medicinaGeneralImg from '@/components/images/medicina-general.jpg'; 
import cesfamLogo from '@/components/images/cesfamsta.png';



// ==========================
// Componente Principal
// ==========================

const LoginPage: React.FC = () => {

  // ==========================
  // Renderizado del Componente
  // ==========================

  return (
    <div className="min-h-screen flex">
      {/* ==========================
          Columna Izquierda: Formulario
          ========================== */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="w-full max-w-md">
          {/* Logo o Título del Sistema */}
          <div className="text-center mb-8">
            {/* NUEVO LOGO CON IMAGEN */}
            <div className="inline-flex items-center justify-center w-40 h-40 mb-6 bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <img 
                src={cesfamLogo} 
                alt="Logo CESFAM" 
                className="w-full h-full object-contain" 
              />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900">
              Intranet Médico
            </h1>
            <p className="text-gray-600 mt-2">
              Bienvenido a tu espacio de confianza
            </p>
          </div>

          {/* Componente de Formulario - SIN onSubmit */}
          <LoginForm />

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>© 2025 Sistema Médico. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>

      {/* ==========================
          Columna Derecha: Imagen
          ========================== */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-[#009DDC] via-[#4DFFF3] to-[#52FFB8]">
        {/* Overlay decorativo */}
        <div className="absolute inset-0 bg-black/10 z-10"></div>
        
        {/* Patrón de fondo decorativo */}
        <div className="absolute inset-0 opacity-10 z-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern
              id="grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="16" cy="16" r="1" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Imagen principal */}
        <div className="relative z-20 flex items-center justify-center p-12 w-full">
          <div className="max-w-2xl text-white">
            {/* Contenedor de imagen */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={medicinaGeneralImg}
                alt="Equipo médico profesional"
                className="w-full h-[500px] object-cover"
                onError={(e) => {
                  // Fallback en caso de que la imagen no cargue
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Crect fill="%234F46E5" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="white" font-size="24" font-family="system-ui"%3EMédico profesional%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>

            {/* Texto informativo */}
            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-4xl font-bold drop-shadow-lg mb-4">
                Tecnología al servicio de la salud
              </h2>
              <p className="text-xl text-white/90 drop-shadow-md mb-6">
                Sistema integral de gestión de actividades y servicios administrativos
              </p>
              
              {/* Características destacadas */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm text-white/90">Disponibilidad</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm text-white/90">Seguro</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">+5K</div>
                  <div className="text-sm text-white/90">Usuarios</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================
// Export por Defecto
// ==========================

export default LoginPage;