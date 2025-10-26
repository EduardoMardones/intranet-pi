import GenericTable from '../tablas/GenericTable'
import PDFDownload from '../buttons/PDFDownload'
import VerSolicitud from '../buttons/VerSolicitud'

export function RepositorioTable() {
  const headers = [
    "ID",
    "Tipo",
    "Nombre",
    "Fecha Subida",
    "Tamaño",
    "Acciones"
  ]

  const tipos = ["PDF", "Imagen", "Video", "Documento"]

  const data = Array.from({ length: 15 }, (_, i) => {
    const id = `FILE${(i + 1).toString().padStart(3, '0')}`
    const tipoRandom = tipos[Math.floor(Math.random() * tipos.length)]
    const sizeRandom = `${Math.floor(Math.random() * 900 + 100)} KB`
    const fecha = new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    const formatDate = (d: Date) => `${d.getDate().toString().padStart(2,"0")}/${(d.getMonth()+1).toString().padStart(2,"0")}/${d.getFullYear()}`

    return {
      ID: id,
      Tipo: tipoRandom,
      Nombre: `${tipoRandom}_${i + 1}`,
      "Fecha Subida": formatDate(fecha),
      Tamaño: sizeRandom,
      Acciones: (
        <div className="flex gap-2 justify-center">
          <VerSolicitud id={id} />
          {tipoRandom === "PDF" && <PDFDownload fileName={`${id}.pdf`} />}
        </div>
      )
    }
  })

  return <GenericTable headers={headers} data={data} />
}
