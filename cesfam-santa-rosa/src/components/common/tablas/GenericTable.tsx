import React from "react"
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
}

const GenericTable: React.FC<GenericTableProps> = ({ headers, data }) => {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-md border border-cyan-400">
      <Table className="min-w-full border-collapse">
        <TableHeader className="bg-[hsla(176,100%,65%,1)] text-white">
          <TableRow>
            {headers.map((header, i) => (
              <TableHead
                key={i}
                className="text-center font-semibold uppercase border border-cyan-300"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <TableRow
                key={i}
                className="hover:bg-[rgba(77,255,243,0.2)] transition-colors"
              >
                {headers.map((header, j) => (
                  <TableCell
                    key={j}
                    className="text-center border border-cyan-200 p-3"
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
    </div>
  )
}

export default GenericTable
