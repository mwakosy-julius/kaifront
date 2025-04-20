import React, { ReactNode, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

export interface ChartContainerProps {
  title: string;
  children: ReactNode;
  downloadable?: boolean;
  downloadFormat?: "svg" | "png";
  filename?: string;
  id?: string;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  children,
  downloadable = true,
  downloadFormat = "svg",
  filename = "chart",
  id,
  className = "",
  headerClassName = "",
  contentClassName = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartId = id || `chart-${Math.random().toString(36).substring(2, 9)}`;

  const handleDownload = () => {
    if (!containerRef.current) return;

    const svgElement = containerRef.current.querySelector("svg");
    if (!svgElement) {
      console.error("No SVG element found for download");
      return;
    }

    if (downloadFormat === "svg") {
      // Create an SVG file
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (downloadFormat === "png") {
      // This is a simple approach for PNG conversion
      // For a more robust solution, consider using html2canvas or similar libraries
      try {
        const canvas = document.createElement("canvas");
        const svgRect = svgElement.getBoundingClientRect();
        canvas.width = svgRect.width;
        canvas.height = svgRect.height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          throw new Error("Could not get canvas context");
        }

        // Create a data URL from the SVG
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], {
          type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(svgBlob);

        // Create an image and draw it to the canvas when loaded
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          URL.revokeObjectURL(url);

          // Convert the canvas to a PNG data URL and download it
          const pngData = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.href = pngData;
          a.download = `${filename}.png`;
          a.click();
        };
        img.src = url;
      } catch (error) {
        console.error("Error converting SVG to PNG:", error);
      }
    }
  };

  return (
    <Card className={className}>
      <CardHeader className={headerClassName}>
        <CardTitle className="text-base flex justify-between items-center">
          <span>{title}</span>
          {downloadable && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleDownload}
              title={`Download as ${downloadFormat.toUpperCase()}`}
            >
              <Download className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className={contentClassName}>
        <div id={chartId} ref={containerRef} className="w-full h-full">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartContainer;
