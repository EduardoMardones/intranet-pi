// ======================================================
// PÁGINA: Crear Usuario
// Ubicación: src/pages/admin/CrearUsuarioPage.tsx
// Descripción: Vista dedicada para crear usuarios
// ======================================================

'use client';

import React, { useState } from 'react';
import { UnifiedNavbar } from '@/components/common/layout/UnifiedNavbar';
import Banner from '@/components/common/layout/Banner';
import bannerHome from "@/components/images/banner_images/BannerDirectorio.png";
import Footer from '@/components/common/layout/Footer';
import { FormularioUsuarioCompleto } from '@/components/common/usuarios/FormularioUsuarioCompleto';
import type { CrearUsuarioDTO, EditarUsuarioDTO } from '@/types/usuario';
import { Card } from '@/components/ui/card';
import { UserPlus, CheckCircle2 } from 'lucide-react';

export const CrearUsuarioPage: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCrearUsuario = (nuevoUsuario: CrearUsuarioDTO | EditarUsuarioDTO) => {
    console.log('Crear usuario desde página dedicada:', nuevoUsuario);
    
    // TODO: Llamar al backend
    // const response = await crearUsuario(nuevoUsuario);
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <>
      <UnifiedNavbar />
      <div className="h-15" />

      <Banner
        imageSrc={bannerHome}
        title=""
        subtitle=""
        height="250px"
      />

      {/* Mensaje de éxito */}
      {showSuccess && (
        <div className="fixed top-24 right-4 z-50 animate-in slide-in-from-top-2">
          <div className="bg-white border-2 border-[#52FFB8] rounded-xl shadow-lg p-4 flex items-center gap-3">
            <div className="p-2 bg-[#52FFB8]/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-[#52FFB8]" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">¡Usuario creado!</p>
              <p className="text-sm text-gray-600">El funcionario ha sido registrado exitosamente</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-[1000px] mx-auto">
          
          {/* Header */}
          <header className="bg-white shadow-lg rounded-xl overflow-hidden mb-6">
            <div className="px-6 py-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] rounded-xl shadow-lg">
                  <UserPlus className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Crear Nuevo Funcionario
                  </h1>
                  <p className="text-sm text-gray-600">
                    Completa el formulario para registrar un nuevo funcionario del CESFAM
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Card con instrucciones */}
          <Card className="p-6 mb-6 bg-blue-50 border-2 border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">📋 Información Importante</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Todos los campos marcados con (*) son obligatorios</li>
              <li>• El RUT debe tener formato chileno: XX.XXX.XXX-X</li>
              <li>• La contraseña debe tener al menos 8 caracteres</li>
              <li>• El email debe ser único en el sistema</li>
            </ul>
          </Card>

          {/* Botón para abrir formulario */}
          <Card className="p-8 text-center">
            <UserPlus className="w-16 h-16 text-[#009DDC] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Vista de Formulario Completo
            </h2>
            <p className="text-gray-600 mb-6">
              Esta página usa el mismo formulario unificado que el Directorio.<br />
              Ambas opciones crean usuarios con los mismos datos.
            </p>
            
            {/* Formulario siempre abierto en modo "página completa" */}
            <div className="mt-6">
              <FormularioUsuarioCompleto 
                open={true}
                onOpenChange={() => {}}
                onSubmit={handleCrearUsuario}
                modo="crear"
              />
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CrearUsuarioPage;