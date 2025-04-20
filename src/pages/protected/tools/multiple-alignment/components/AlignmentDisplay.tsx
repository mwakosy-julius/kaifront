import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, FileText, FileSpreadsheet } from "lucide-react";

interface AlignmentDisplayProps {
  alignment: string;
}

const AlignmentDisplay: React.FC<AlignmentDisplayProps> = ({ alignment }) => {
  const parseAlignmentForCSV = () => {
    const lines = alignment
      .split("\n")
      .filter((line) => line && !line.startsWith("CLUSTAL"));
    const sequences = lines.reduce((acc, line) => {
      const [id, seq] = line.split(/\s+/).filter(Boolean);
      if (id && seq) acc[id] = (acc[id] || "") + seq;
      return acc;
    }, {} as Record<string, string>);
    return Object.entries(sequences).map(([id, seq]) => ({
      id,
      sequence: seq,
    }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(alignment);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Alignment Results
        </CardTitle>
        <CardDescription>
          View and download your multiple sequence alignment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="raw">
          <TabsList>
            <TabsTrigger value="raw">Raw Alignment</TabsTrigger>
            <TabsTrigger value="formatted">Formatted</TabsTrigger>
          </TabsList>
          <TabsContent value="raw" className="space-y-4">
            <div className="p-4 overflow-x-auto font-mono text-xs border rounded bg-muted/50">
              <pre>{alignment}</pre>
            </div>
          </TabsContent>
          <TabsContent value="formatted" className="space-y-4">
            <div className="p-4 overflow-x-auto font-mono text-xs border rounded bg-muted/50">
              {alignment.split("\n").map((line, i) => {
                // Color code the sequence
                if (
                  line &&
                  !line.startsWith("CLUSTAL") &&
                  !line.match(/^\s*$/)
                ) {
                  const [id, seq] = line.split(/\s+/).filter(Boolean);
                  if (id && seq) {
                    return (
                      <div key={i} className="flex">
                        <span className="inline-block min-w-[120px] font-semibold">
                          {id}
                        </span>
                        <span>
                          {seq.split("").map((char, j) => {
                            let color = "";
                            if (char === "A") color = "text-red-500";
                            else if (char === "T" || char === "U")
                              color = "text-green-500";
                            else if (char === "G") color = "text-yellow-500";
                            else if (char === "C") color = "text-blue-500";
                            else if (char === "-") color = "text-gray-400";
                            return (
                              <span key={j} className={color}>
                                {char}
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    );
                  }
                }
                return <div key={i}>{line}</div>;
              })}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            <Copy className="w-4 h-4 mr-2" />
            Copy to Clipboard
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const blob = new Blob([alignment], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "alignment.txt";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <FileText className="w-4 h-4 mr-2" />
            Download Text
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const data = parseAlignmentForCSV();
              const csv = [
                "ID,Sequence",
                ...data.map((row) => `${row.id},${row.sequence}`),
              ].join("\n");
              const blob = new Blob([csv], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "alignment.csv";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Download CSV
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlignmentDisplay;
