import React from "react";

type InfoCardProps = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  topColor?: string; // Color para el borde izquierdo, ej. 'border-blue-400'
  number: number;
};

export const CardGenerica: React.FC<InfoCardProps> = ({
  title,
  icon: IconComponent,
  topColor = "border-blue-400", // Cambiado a un color de borde izquierdo por defecto
  number,
}) => {
  // Mapear colores de borde a colores de gradiente de fondo, o usar un default
  const getBackgroundColorClass = (borderColor: string) => {
    switch (borderColor) {
      case "border-blue-400":
        return "from-blue-50 to-blue-100";
      case "border-purple-400":
        return "from-purple-50 to-purple-100";
      case "border-green-400":
        return "from-green-50 to-green-100";
      case "border-cyan-400":
        return "from-cyan-50 to-cyan-100";
      case "border-yellow-400": // Añadido para el ejemplo de "Pendientes"
        return "from-yellow-50 to-yellow-100";
      case "border-red-400": // Añadido para el ejemplo de "Rechazadas"
        return "from-red-50 to-red-100";
      default:
        return "from-gray-50 to-gray-100";
    }
  };

  const iconColorClass = (borderColor: string) => {
    switch (borderColor) {
      case "border-blue-400":
        return "text-blue-600";
      case "border-purple-400":
        return "text-purple-600";
      case "border-green-400":
        return "text-green-600";
      case "border-cyan-400":
        return "text-cyan-600";
      case "border-yellow-400": // Añadido
        return "text-yellow-600";
      case "border-red-400": // Añadido
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const bgColorClasses = getBackgroundColorClass(topColor);
  const currentIconColorClass = iconColorClass(topColor);

  return (
    <div
      className={`bg-gradient-to-br ${bgColorClasses} rounded-xl p-4 border-l-4 ${topColor} flex items-center gap-3 `} // Ajusta `w-60` según necesites un ancho fijo
    >
      <div className="p-3 bg-white rounded-lg shadow-sm flex-shrink-0">
        <IconComponent className={`w-6 h-6 ${currentIconColorClass}`} />
      </div>
      <div>
        <p className="text-sm text-gray-600 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{number}</p>
      </div>
    </div>
  );
};