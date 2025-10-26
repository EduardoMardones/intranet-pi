import React from "react"

type EstadoProps = {
  estado: "Aprobado" | "Pendiente" | "Rechazado" | string
}

export const StateColorButton: React.FC<EstadoProps> = ({ estado }) => {
  let bgColor = ''
  let textColor = ''

  switch (estado) {
    case "Aprobado":
      bgColor = "bg-green-100"
      textColor = "text-green-800"
      break
    case "Pendiente":
      bgColor = "bg-yellow-100"
      textColor = "text-yellow-800"
      break
    case "Rechazado":
      bgColor = "bg-red-100"
      textColor = "text-red-800"
      break
    default:
      bgColor = "bg-gray-100"
      textColor = "text-gray-800"
  }

  return (
    <span className={`${bgColor} ${textColor} px-3 py-1 rounded-full text-sm font-semibold`}>
      {estado}
    </span>
  )
}

