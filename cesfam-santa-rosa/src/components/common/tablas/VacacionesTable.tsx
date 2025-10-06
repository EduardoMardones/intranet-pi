import GenericTable from './GenericTable'
import { StateColorButton } from '../vacaciones/StateColorButton'
import PDFDownload from '../buttons/PDFDownload'
import VerSolicitud from '../buttons/VerSolicitud'

export function VacacionesTable() {
  const headers = [
    "ID", "Tipo", "Periodo", "Días", "Estado General",
    "Jefatura", "Dirección", "Fecha Solicitud", "Acciones"
  ]

  const data = [
    {
      ID: "VAC001",
      Tipo: "Vacaciones",
      Periodo: "22/10/2025 - 25/10/2025",
      Días: 4,
      "Estado General": <StateColorButton estado="Aprobado" />,
      Jefatura: "María Torres",
      Dirección: "Recursos Humanos",
      "Fecha Solicitud": "15/10/2025",
      Acciones: (
        <div className="flex gap-2 justify-center">
          <VerSolicitud id="VAC001" />
          <PDFDownload fileName="VAC001.pdf" />
        </div>
      )
    },
    {
      ID: "VAC002",
      Tipo: "Vacaciones",
      Periodo: "05/11/2025 - 09/11/2025",
      Días: 5,
      "Estado General": <StateColorButton estado="Pendiente" />,
      Jefatura: "Carlos Rivas",
      Dirección: "Finanzas",
      "Fecha Solicitud": "01/11/2025",
      Acciones: (
        <div className="flex gap-2 justify-center">
          <VerSolicitud id="VAC002" />
        </div>
      )
    },
    {
      ID: "VAC003",
      Tipo: "Días Admin.",
      Periodo: "10/12/2025 - 12/12/2025",
      Días: 3,
      "Estado General": <StateColorButton estado="Rechazado" />,
      Jefatura: "Laura Pino",
      Dirección: "Operaciones",
      "Fecha Solicitud": "09/12/2025",
      Acciones: (
        <div className="flex gap-2 justify-center">
          <VerSolicitud id="VAC003" />
        </div>
      )
    }
  ]

  return (
    <>
      <GenericTable headers={headers} data={data} />
    </>
  )
}