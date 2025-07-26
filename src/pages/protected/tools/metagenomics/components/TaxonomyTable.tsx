import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Search } from "lucide-react";
import { Detail } from "@/lib/services/tools";

interface TaxonomyTableProps {
  details: Detail[];
}

const TaxonomyTable: React.FC<TaxonomyTableProps> = ({ details }) => {
  const [sortField, setSortField] = useState<keyof Detail>("confidence");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (field: keyof Detail) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const filteredData = details.filter(
    (item) =>
      item.genus.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phylum.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField] ?? 0;
    const bValue = b[sortField] ?? 0;

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortOrder === "asc"
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  const exportCSV = () => {
    const headers = [
      "Genus",
      "Phylum",
      "K-mer Count",
      "Distance",
      "Confidence",
    ];
    const rows = details.map(
      (item) =>
        `${item.genus},${item.phylum},${item.kmer_count},${
          item.distance !== undefined ? item.distance.toFixed(2) : "N/A"
        },${item.confidence.toFixed(2)}`
    );
    const csv = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "taxonomy_results.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Taxonomy Results</CardTitle>
        <CardDescription>
          Comprehensive analysis of identified taxa and their confidence scores
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search taxa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <FileText className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer hover:text-primary"
                  onClick={() => handleSort("genus")}
                >
                  Genus{" "}
                  {sortField === "genus" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:text-primary"
                  onClick={() => handleSort("phylum")}
                >
                  Phylum{" "}
                  {sortField === "phylum" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  className="text-right cursor-pointer hover:text-primary"
                  onClick={() => handleSort("kmer_count")}
                >
                  K-mer Count{" "}
                  {sortField === "kmer_count" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  className="text-right cursor-pointer hover:text-primary"
                  onClick={() => handleSort("distance")}
                >
                  Distance{" "}
                  {sortField === "distance" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  className="text-right cursor-pointer hover:text-primary"
                  onClick={() => handleSort("confidence")}
                >
                  Confidence{" "}
                  {sortField === "confidence" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No results found
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.genus}</TableCell>
                    <TableCell>{item.phylum}</TableCell>
                    <TableCell className="text-right">
                      {item.kmer_count}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.distance !== undefined
                        ? item.distance.toFixed(2)
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.confidence.toFixed(1)}%
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxonomyTable;
