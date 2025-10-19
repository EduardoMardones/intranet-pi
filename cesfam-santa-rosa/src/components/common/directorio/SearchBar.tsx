// ======================================================
// COMPONENTE: SearchBar
// Ubicación: src/components/ui/SearchBar.tsx
// Descripción: Barra de búsqueda para el directorio
// ======================================================

'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

// ======================================================
// INTERFACES
// ======================================================

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Buscar por nombre o email...'
}) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative w-full max-w-2xl">
      {/* Ícono de búsqueda */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>

      {/* Input de búsqueda */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-12 pr-12 py-4
          bg-white border-2 border-gray-200
          rounded-2xl
          text-gray-900 placeholder-gray-400
          focus:outline-none focus:border-[#009DDC] focus:ring-4 focus:ring-[#009DDC]/20
          transition-all duration-200
          shadow-md hover:shadow-lg
        "
      />

      {/* Botón para limpiar */}
      {value && (
        <button
          onClick={handleClear}
          className="
            absolute right-4 top-1/2 -translate-y-1/2
            p-1.5 rounded-full
            bg-gray-200 hover:bg-gray-300
            text-gray-600 hover:text-gray-900
            transition-colors duration-200
          "
          aria-label="Limpiar búsqueda"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Indicador de resultados (opcional) */}
      {value && (
        <div className="absolute -bottom-6 left-0 text-xs text-gray-500">
          Buscando: <span className="font-semibold text-[#009DDC]">{value}</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;