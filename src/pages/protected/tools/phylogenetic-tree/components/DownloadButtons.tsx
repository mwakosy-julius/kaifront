import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileImage, FileCode, FileText } from "lucide-react";

interface DownloadButtonsProps {
  treeData: {
    svg: string;
    newick: string;
  };
}

const DownloadButtons: React.FC<DownloadButtonsProps> = ({ treeData }) => {
  const downloadSVG = () => {
    // Create a Blob from the SVG string
    const svgBlob = new Blob([treeData.svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);

    // Create download link
    const link = document.createElement("a");
    link.href = url;
    link.download = "phylogenetic_tree.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadPNG = () => {
    // Create a temporary SVG element
    const container = document.createElement("div");
    container.innerHTML = treeData.svg;
    const svgElement = container.firstChild as SVGSVGElement;
    document.body.appendChild(container);

    // Set dimensions
    const width = svgElement.getAttribute("width") || "800";
    const height = svgElement.getAttribute("height") || "600";
    svgElement.setAttribute("width", width);
    svgElement.setAttribute("height", height);

    // Create a canvas element
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      alert("Your browser does not support canvas. Cannot export PNG.");
      document.body.removeChild(container);
      return;
    }

    // Set canvas size
    const scale = 2; // Higher resolution
    canvas.width = parseInt(width) * scale;
    canvas.height = parseInt(height) * scale;

    // Create image from SVG
    const img = new Image();
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgURL =
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgData);

    img.onload = function () {
      // Scale and draw image
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);

      // Download
      const pngURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngURL;
      link.download = "phylogenetic_tree.png";
      link.click();
    };

    img.src = svgURL;
    document.body.removeChild(container);
  };

  const downloadNewick = () => {
    const blob = new Blob([treeData.newick], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "phylogenetic_tree.newick";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Results</CardTitle>
        <CardDescription>
          Download the phylogenetic tree in various formats for further use
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Button
            onClick={downloadSVG}
            className="flex items-center justify-center gap-2"
          >
            <FileCode className="w-4 h-4" />
            Download SVG
          </Button>
          <Button
            onClick={downloadPNG}
            className="flex items-center justify-center gap-2"
          >
            <FileImage className="w-4 h-4" />
            Download PNG
          </Button>
          <Button
            onClick={downloadNewick}
            className="flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Download Newick
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          SVG is recommended for publications and editable vector graphics. PNG
          is best for presentations and web usage. Newick format can be imported
          into other phylogenetic software.
        </p>
      </CardContent>
    </Card>
  );
};

export default DownloadButtons;
