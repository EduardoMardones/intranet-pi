import React, { useState, useEffect } from "react";
import { Users, CheckCircle, Clock, XCircle } from "lucide-react";
import { CardGenerica } from "../cardgenerica/CardGenerica";
// ✅ NUEVO: Imports del backend
import { solicitudService } from '@/api';
import type { Solicitud } from '@/api';

export const CardSection: React.FC = () => {
  // ✅ NUEVO: Estado para solicitudes del backend
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ NUEVO: Cargar solicitudes desde el backend
  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const cargarSolicitudes = async () => {
    try {
      setLoading(true);
      const data = await solicitudService.getMisSolicitudes();
      setSolicitudes(data);
    } catch (error) {
      console.error('Error al cargar solicitudes:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ NUEVO: Calcular estadísticas desde datos reales
  const totales = solicitudes.length;
  const aprobadas = solicitudes.filter(s => s.estado === 'aprobada').length;
  const pendientes = solicitudes.filter(s => s.estado === 'pendiente_jefatura' || s.estado === 'pendiente_direccion').length;
  const rechazadas = solicitudes.filter(s => 
    s.estado === 'rechazada_jefatura' || 
    s.estado === 'rechazada_direccion' || 
    s.estado === 'cancelada'
  ).length;

  return (
    // Contenedor principal para la sección, con padding exterior si es necesario
    <div className="pt-1 pb-10">
      {/* Nuevo contenedor redondeado y con sombra para las cards */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-6">
        <div className="py-8 px-6"> {/* Padding interno para el contenido de las cards */}
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-500">Cargando estadísticas...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <CardGenerica
                title="Totales"
                icon={Users}
                topColor="border-blue-400"
                number={totales}
              />
              <CardGenerica
                title="Aprobadas"
                icon={CheckCircle}
                topColor="border-green-400"
                number={aprobadas}
              />
              <CardGenerica
                title="Pendientes"
                icon={Clock}
                topColor="border-yellow-400"
                number={pendientes}
              />
              <CardGenerica
                title="Rechazadas"
                icon={XCircle}
                topColor="border-red-400"
                number={rechazadas}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};