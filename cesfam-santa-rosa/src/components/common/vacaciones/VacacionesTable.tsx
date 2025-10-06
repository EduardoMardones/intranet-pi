import GenericTable from '../tablas/GenericTable'
import { StateColorButton } from './StateColorButton'
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
    },
    // Generamos 12 registros más
    ...Array.from({ length: 12 }, (_, i) => {
      const id = `VAC${(i + 4).toString().padStart(3, "0")}`
      const estados = ["Aprobado", "Pendiente", "Rechazado"]
      const estadoRandom = estados[Math.floor(Math.random() * estados.length)]
      const dias = Math.floor(Math.random() * 5) + 3
      const startDate = new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 25) + 1)
      const endDate = new Date(startDate)
      endDate.setDate(startDate.getDate() + dias)
      const formatDate = (d: Date) => `${d.getDate().toString().padStart(2,"0")}/${(d.getMonth()+1).toString().padStart(2,"0")}/${d.getFullYear()}`
      return {
        ID: id,
        Tipo: "Vacaciones",
        Periodo: `${formatDate(startDate)} - ${formatDate(endDate)}`,
        Días: dias,
        "Estado General": <StateColorButton estado={estadoRandom} />,
        Jefatura: `Jefatura ${i + 1}`,
        Dirección: `Departamento ${i + 1}`,
        "Fecha Solicitud": formatDate(new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 25) + 1)),
        Acciones: (
          <div className="flex gap-2 justify-center">
            <VerSolicitud id={id} />
            {estadoRandom === "Aprobado" && <PDFDownload fileName={`${id}.pdf`} />}
          </div>
        )
      }
    })
  ]

  return (
    <>
      <GenericTable headers={headers} data={data} />
    </>
  )
}
