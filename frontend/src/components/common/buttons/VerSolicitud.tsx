import React from "react"
import { Eye } from "lucide-react"

type VerSolicitudProps = {
  id?: string
}

const VerSolicitud: React.FC<VerSolicitudProps> = ({ id }) => {
  const handleView = () => {
    alert(`Viendo solicitud ${id}`)
  }

  return (
    <Eye
      className="text-cyan-600 w-6 h-6 cursor-pointer hover:text-cyan-800 transition-colors"
      onClick={handleView}
    />
  )
}

export default VerSolicitud
