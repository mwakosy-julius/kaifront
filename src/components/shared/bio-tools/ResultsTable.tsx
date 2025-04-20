import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Column<T> {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  className?: string;
}

export interface ResultsTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  description?: string;
  exportCsv?: boolean;
  exportFilename?: string;
  className?: string;
  emptyMessage?: string;
  getExportRow?: (row: T) => Record<string, string | number>;
}

function ResultsTable<T>({
  data,
  columns,
  title,
  description,
  exportCsv = true,
  exportFilename = "results",
  className = "",
  emptyMessage = "No results to display",
  getExportRow,
}: ResultsTableProps<T>) {
  const handleExportCsv = () => {
    if (!data || data.length === 0) return;

    // If a custom export function is provided, use it
    const exportData = getExportRow
      ? data.map((row) => getExportRow(row))
      : data.map((row) => {
          // Create a simple object with column keys and values
          return columns.reduce((obj, col) => {
            const cellValue = col.cell(row);
            // Convert React nodes to string values
            const value =
              typeof cellValue === "string" || typeof cellValue === "number"
                ? cellValue
                : cellValue?.toString() || "";
            return { ...obj, [col.header]: value };
          }, {} as Record<string, string | number>);
        });

    // Create CSV content
    const headers = Object.keys(exportData[0]);
    const csvContent = [
      headers.join(","),
      ...exportData.map((row) =>
        headers
          .map((header) => {
            const val = row[header];
            // If the value contains commas, quotes, or newlines, wrap it in quotes
            return typeof val === "string" &&
              (val.includes(",") || val.includes('"') || val.includes("\n"))
              ? `"${val.replace(/"/g, '""')}"`
              : val;
          })
          .join(",")
      ),
    ].join("\n");

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exportFilename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {title && <h3 className="text-lg font-medium">{title}</h3>}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      <div className="border rounded">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key} className={column.className}>
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column) => (
                      <TableCell
                        key={`${rowIndex}-${column.key}`}
                        className={column.className}
                      >
                        {column.cell(row)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-6 text-muted-foreground"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {exportCsv && data.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportCsv}
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      )}
    </div>
  );
}

export default ResultsTable;
