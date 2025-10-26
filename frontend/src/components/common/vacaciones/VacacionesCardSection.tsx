import React from "react";
import { Users, CheckCircle, Clock, XCircle } from "lucide-react";
import { CardGenerica } from "../cardgenerica/CardGenerica";
export const CardSection: React.FC = () => {
  return (
    // Contenedor principal para la sección, con padding exterior si es necesario
    <div className="pt-1 pb-10">
      {/* Nuevo contenedor redondeado y con sombra para las cards */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-6">
        <div className="py-8 px-6"> {/* Padding interno para el contenido de las cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardGenerica
              title="Totales"
              icon={Users}
              topColor="border-blue-400"
              number={11}
            />
            <CardGenerica
              title="Aprobadas"
              icon={CheckCircle}
              topColor="border-green-400"
              number={7}
            />
            <CardGenerica
              title="Pendientes"
              icon={Clock}
              topColor="border-yellow-400"
              number={2}
            />
            <CardGenerica
              title="Rechazadas"
              icon={XCircle}
              topColor="border-red-400"
              number={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};