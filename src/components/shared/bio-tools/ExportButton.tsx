import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Download } from "lucide-react";

export type ExportFormat = "csv" | "json" | "txt" | "svg" | "png" | "fasta";

export interface ExportButtonProps extends Omit<ButtonProps, "onClick"> {
  data: any;
  format: ExportFormat;
  filename?: string;
  svgElementId?: string;
  customTransform?: (data: any) => string;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  data,
  format,
  filename = `export-${Date.now()}`,
  svgElementId,
  customTransform,
  variant = "outline",
  size = "sm",
  className = "",
  children,
  ...buttonProps
}) => {
  const handleExport = () => {
    let content: string | Blob;
    let type: string;
    const finalFilename = `${filename}.${format}`;

    switch (format) {
      case "csv":
        content = customTransform
          ? customTransform(data)
          : Array.isArray(data)
          ? [
              Object.keys(data[0]).join(","),
              ...data.map((item) => Object.values(item).join(",")),
            ].join("\n")
          : "";
        type = "text/csv";
        break;

      case "json":
        content = JSON.stringify(data, null, 2);
        type = "application/json";
        break;

      case "txt":
        content = customTransform
          ? customTransform(data)
          : typeof data === "string"
          ? data
          : JSON.stringify(data, null, 2);
        type = "text/plain";
        break;

      case "fasta":
        content = customTransform
          ? customTransform(data)
          : typeof data === "string"
          ? data
          : "";
        type = "text/plain";
        break;

      case "svg":
        if (svgElementId) {
          const svgElement = document.querySelector(`#${svgElementId} svg`);
          if (!svgElement) return;

          content = new XMLSerializer().serializeToString(svgElement);
          type = "image/svg+xml";
        } else {
          console.error("SVG element ID is required for SVG export");
          return;
        }
        break;

      case "png":
        // PNG export usually requires a canvas, this is a simplified approach
        if (svgElementId) {
          // This implementation requires a library like html2canvas or similar for PNG
          console.error(
            "PNG export requires canvas conversion, consider adding html2canvas"
          );
          return;
        } else {
          console.error("Element ID is required for PNG export");
          return;
        }

      default:
        content = "";
        type = "text/plain";
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = finalFilename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={handleExport}
      variant={variant}
      size={size}
      className={className}
      {...buttonProps}
    >
      {children ? (
        children
      ) : (
        <>
          <Download className="w-4 h-4 mr-2" />
          Export {format.toUpperCase()}
        </>
      )}
    </Button>
  );
};

export default ExportButton;
