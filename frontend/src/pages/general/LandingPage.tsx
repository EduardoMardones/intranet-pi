// ======================================================
// PÁGINA: Landing / Bienvenida
// Ubicación: src/pages/LandingPage.tsx
// Descripción: Vista previa al login del sistema
// ======================================================

'use client';

import React from 'react';
import { MedicalVectors } from '@/components/common/landing/MedicalVectors';
import { ArrowRight, Shield, Clock, Users } from 'lucide-react';

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

const LandingPage: React.FC = () => {
  const handleAccessClick = () => {
    // Aquí rediriges al login
    console.log('Redirigiendo al login...');
    window.location.href = '/login';
    // o con React Router: navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* ======================================================
          LADO IZQUIERDO - IMAGEN MÉDICA
          ====================================================== */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-gray-100 to-blue-50">
        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80"
            alt="Equipo médico CESFAM"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback a un placeholder con gradiente
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.style.background = 
                'linear-gradient(135deg, #009DDC 0%, #4DFFF3 100%)';
            }}
          />
          {/* Overlay oscuro para contraste */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#009DDC]/40 to-transparent"></div>
        </div>

        {/* Contenido sobre la imagen */}
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
              Bienvenido al CESFAM
            </h2>
            <p className="text-xl mb-6 drop-shadow-md text-white/90">
              Centro de Salud Familiar
            </p>
            <p className="text-lg leading-relaxed drop-shadow-md">
              Sistema de gestión integral para nuestro equipo de profesionales de la salud.
              Accede a todas las herramientas y recursos institucionales en un solo lugar.
            </p>

            {/* Características destacadas */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Acceso Seguro</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Disponible 24/7</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Multi-usuario</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Datos Protegidos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          LADO DERECHO - FORMULARIO DE ACCESO
          ====================================================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#009DDC] via-[#4DFFF3] to-[#52FFB8]">
        {/* Vectores médicos decorativos */}
        <MedicalVectors />

        {/* Contenedor principal */}
        <div className="relative z-20 w-full max-w-md px-8">
          {/* Logo/Título */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
              <svg
                className="w-14 h-14 text-[#009DDC]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-3">
              Intranet CESFAM
            </h1>
            <p className="text-xl text-white/90 drop-shadow-md font-medium">
              Portal de Gestión Institucional
            </p>
          </div>

          {/* Card de acceso */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Acceso al Sistema
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Ingresa con tus credenciales institucionales
            </p>

            {/* Información */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                <Shield className="w-5 h-5 text-[#009DDC] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Acceso Seguro</p>
                  <p className="text-xs text-gray-600">Todas las comunicaciones están encriptadas</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-cyan-50 rounded-xl">
                <Users className="w-5 h-5 text-[#4DFFF3] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Personal Autorizado</p>
                  <p className="text-xs text-gray-600">Solo para funcionarios del CESFAM</p>
                </div>
              </div>
            </div>

            {/* Botón de acceso */}
            <button
              onClick={handleAccessClick}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <span>Acceder al Sistema</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Enlaces adicionales */}
            <div className="mt-6 text-center space-y-2">
              <a
                href="#"
                className="block text-sm text-gray-600 hover:text-[#009DDC] transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </a>
              <p className="text-xs text-gray-500">
                ¿Problemas de acceso? Contacta a{' '}
                <a href="mailto:soporte@cesfam.cl" className="text-[#009DDC] hover:underline">
                  soporte@cesfam.cl
                </a>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-white/80 text-sm drop-shadow-md">
            <p>© 2025 CESFAM - Centro de Salud Familiar</p>
            <p className="mt-1">Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ======================================================
// EXPORT
// ======================================================

export default LandingPage;