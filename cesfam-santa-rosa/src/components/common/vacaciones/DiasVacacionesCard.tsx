import React from "react"

type InfoCardProps = {
  title: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> // <-- así se tipa un icono dinámico
  topColor?: string // Color del borde superior, ej. 'bg-cyan-500'
  number: number
}

export const SolicitudCard: React.FC<InfoCardProps> = ({ title, icon: IconComponent, topColor = "bg-cyan-500", number }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden w-40">
      {/* Borde superior */}
      <div className={`${topColor} h-1 w-full`}></div>

      {/* Contenido */}
      <div className="flex flex-col items-center justify-center p-4">
        <IconComponent className="w-10 h-10 text-cyan-500 mb-2" />
        <h3 className="text-center font-semibold text-gray-700">{title}</h3>
        <h3 className="text-center font-semibold text-gray-700">{number}</h3>

      </div>
    </div>
  )
}


