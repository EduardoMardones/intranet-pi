// src/components/common/footer/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3">CESFAM Santa Rosa</h3>
            <p className="text-gray-400 text-sm">Temuco, Región de La Araucanía</p>
            <p className="text-gray-400 text-sm">Centro de Salud Familiar</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Contacto</h3>
            <p className="text-gray-400 text-sm">Teléfono: +56 45 2XX XXXX</p>
            <p className="text-gray-400 text-sm">Email: contacto@cesfamsantarosa.cl</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Recursos</h3>
            <a
              href="#"
              className="block text-gray-400 text-sm hover:text-white mb-1"
            >
              Manual de Usuario
            </a>
            <a
              href="#"
              className="block text-gray-400 text-sm hover:text-white mb-1"
            >
              Política de Privacidad
            </a>
            <a
              href="#"
              className="block text-gray-400 text-sm hover:text-white"
            >
              Términos de Uso
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 CESFAM Santa Rosa - Intranet v1.0.0 | Todos los derechos
            reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
