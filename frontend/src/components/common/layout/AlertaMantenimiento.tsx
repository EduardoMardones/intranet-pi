import React, { useState } from "react";
import { AlertCircle, X } from "lucide-react"; // Asegúrate de tener lucide-react instalado

interface AlertaMantenimientoProps {
  title: string;
  message: string;
  show?: boolean;
}

// ejemplo de mantenimiento
// const urgentAlert = {
//     show: true,
//     title: "Mantenimiento Programado",
//     message: "Sistema de registro electrónico en mantención hoy 14:00-16:00 hrs"
// };

const AlertaMantenimiento: React.FC<AlertaMantenimientoProps> = ({
  title,
  message,
  show = true,
}) => {
  const [visible, setVisible] = useState(show);

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <span className="font-bold text-sm md:text-base">{title}:</span>
          <span className="text-sm md:text-base">{message}</span>
        </div>
        <button
          className="text-white hover:text-gray-200"
          onClick={() => setVisible(false)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AlertaMantenimiento;
