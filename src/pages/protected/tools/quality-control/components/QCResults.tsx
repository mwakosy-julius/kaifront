import React from "react";
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
import { Download } from "lucide-react";

interface FileData {
  filename: string;
  content: string;
}

interface QCResultsProps {
  reportHtml?: string;
  files?: FileData[];
}

const QCResults: React.FC<QCResultsProps> = ({ reportHtml, files }) => {
  const handleDownload = (
    filename: string,
    content: string,
    isHtml: boolean = false,
  ) => {
    const blob = isHtml
      ? new Blob([content], { type: "text/html" })
      : new Blob([atob(content)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!reportHtml && (!files || files.length === 0)) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Quality Control Results</CardTitle>
        <CardDescription>Analysis results for your FASTQ files</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-600">
              <TableHead>File Type</TableHead>
              <TableHead>Filename</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportHtml && (
              <TableRow className="border-gray-600 hover:bg-gray-200">
                <TableCell>Quality Report</TableCell>
                <TableCell>fastp_report.html</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleDownload("fastp_report.html", reportHtml, true)
                    }
                    aria-label="Download quality report"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </TableCell>
              </TableRow>
            )}
            {files?.map((file, index) => (
              <TableRow
                key={index}
                className="border-gray-600 hover:bg-gray-200"
              >
                <TableCell>Cleaned FASTQ</TableCell>
                <TableCell>{file.filename}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(file.filename, file.content)}
                    aria-label={`Download ${file.filename}`}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download File
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default QCResults;
