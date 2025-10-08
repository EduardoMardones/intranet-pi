import React from "react"
import { Users, CheckCircle, Clock, XCircle } from "lucide-react"
import { SolicitudCard } from "./DiasVacacionesCard"
export const CardSection: React.FC = () => {
  return (
    <div className="pt-1 pb-10 flex flex-wrap gap-6 justify-center ">
      <SolicitudCard
        title="Totales"
        icon={Users}
        topColor="bg-cyan-500"
        number={11}
      />
      <SolicitudCard
        title="Aprobadas"
        icon={CheckCircle}
        topColor="bg-green-500"
        number={7}
      />
      <SolicitudCard
        title="Pendientes"
        icon={Clock}
        topColor="bg-yellow-500"
        number={2}
      />
      <SolicitudCard
        title="Rechazadas"
        icon={XCircle}
        topColor="bg-red-500"
        number={2}
      />
    </div>
  )
}
