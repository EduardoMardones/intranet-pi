// ======================================================
// COMPONENTE: Modal de Selección de Tipo
// Ubicación: src/components/common/calendario/SelectTypeModal.tsx
// Descripción: Modal para elegir entre crear Actividad o Anuncio
// ======================================================

import React from 'react';
import { X } from 'lucide-react';

interface SelectTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectActividad: () => void;
  onSelectAnuncio: () => void;
  selectedDate: Date | null;
}

export const SelectTypeModal: React.FC<SelectTypeModalProps> = ({
  isOpen,
  onClose,
  onSelectActividad,
  onSelectAnuncio,
  selectedDate
}) => {
  if (!isOpen) return null;
  
  const fechaFormateada = selectedDate?.toLocaleDateString('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              ¿Qué deseas crear?
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          {selectedDate && (
            <p className="text-sm text-gray-600 mt-2 capitalize">
              📅 {fechaFormateada}
            </p>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-3">
          {/* OPCIÓN: ACTIVIDAD */}
          <button
            onClick={onSelectActividad}
            className="w-full p-6 border-2 border-blue-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 group-hover:from-blue-500 group-hover:to-cyan-500 transition-all duration-200 shadow-md">
                <span className="text-4xl">🎉</span>
              </div>
              <div className="text-left flex-1">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                  Actividad
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Eventos sociales, deportivos, celebraciones y actividades recreativas
                </p>
              </div>
            </div>
          </button>
          
          {/* OPCIÓN: ANUNCIO */}
          <button
            onClick={onSelectAnuncio}
            className="w-full p-6 border-2 border-red-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all duration-200 group"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-red-100 to-orange-100 group-hover:from-red-500 group-hover:to-orange-500 transition-all duration-200 shadow-md">
                <span className="text-4xl">📢</span>
              </div>
              <div className="text-left flex-1">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors mb-1">
                  Anuncio
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Comunicados oficiales, avisos importantes y notificaciones institucionales
                </p>
              </div>
            </div>
          </button>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors font-medium"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectTypeModal;