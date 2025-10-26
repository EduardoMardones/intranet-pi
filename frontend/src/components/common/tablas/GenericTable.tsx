import React, { useState, useMemo } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type GenericTableProps = {
  headers: string[]
  data: Record<string, any>[]
  rowsPerPage?: number
}

type SortConfig = {
  key: string
  direction: "asc" | "desc"
}

const GenericTable: React.FC<GenericTableProps> = ({
  headers,
  data,
  rowsPerPage = 10,
}) => {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)

  // Filtrado
  const filteredData = useMemo(() => {
    if (!search) return data
    return data.filter((row) =>
      headers.some((header) =>
        String(row[header]).toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, data, headers])

  // Ordenamiento
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData
    const { key, direction } = sortConfig
    return [...filteredData].sort((a, b) => {
      const aValue = a[key] ?? ""
      const bValue = b[key] ?? ""
      if (aValue < bValue) return direction === "asc" ? -1 : 1
      if (aValue > bValue) return direction === "asc" ? 1 : -1
      return 0
    })
  }, [filteredData, sortConfig])

  // Paginación
  const totalPages = Math.ceil(sortedData.length / rowsPerPage)
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return sortedData.slice(start, start + rowsPerPage)
  }, [currentPage, sortedData, rowsPerPage])

  // Cambiar dirección de ordenamiento
  const handleSort = (header: string) => {
    if (sortConfig?.key === header) {
      // Cambia de asc a desc
      setSortConfig({
        key: header,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      })
    } else {
      setSortConfig({ key: header, direction: "asc" })
    }
  }

  return (
    <div className="overflow-x-auto rounded-2xl shadow-md border border-[#009DDC] p-4"> {/* Borde del contenedor: #009DDC */}
      {/* Buscador */}
      <div className="mb-4 flex justify-start">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setCurrentPage(1) // Reinicia a página 1 al buscar
          }}
          className="border border-gray-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#009DDC]" // Foco: #009DDC
        />
      </div>

      {/* Tabla */}
      <Table className="min-w-full border-collapse">
        {/* Cabecera de la tabla con el degradado */}
        <TableHeader className="bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] text-white">
          <TableRow>
            {headers.map((header, i) => (
              <TableHead
                key={i}
                className="text-center font-semibold uppercase border border-[#4DFFF3] cursor-pointer select-none" // Borde de celda de cabecera: #4DFFF3
                onClick={() => handleSort(header)}
              >
                <div className="flex items-center justify-center gap-1">
                  {header}
                  {sortConfig?.key === header && (
                    <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, i) => (
              <TableRow
                key={i}
                className="hover:bg-[rgba(77,255,243,0.1)] transition-colors" // Hover: un cian muy claro, ajustado para ser más sutil
              >
                {headers.map((header, j) => (
                  <TableCell
                    key={j}
                    className="text-center border border-[#CCF8FE] p-3" // Borde de celda de cuerpo: un azul muy claro
                  >
                    {row[header] ?? "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={headers.length}
                className="text-center text-gray-500 py-6"
              >
                No hay datos disponibles
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Paginación */}
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-[#009DDC] text-white" : "bg-gray-200" // Botón activo: #009DDC
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default GenericTable