import * as ThreeDMol from "3dmol";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";
import { StructurePrediction } from "@/lib/services/tools/protein_structure";
import { Minimize2 } from "lucide-react";

interface StructureResultsProps {
  result: StructurePrediction | null;
}

const StructureResults: React.FC<StructureResultsProps> = ({ result }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [viewer, setViewer] = useState<ThreeDMol.GLViewer | null>(null);
  const [viewStyle, setViewStyle] = useState<string>("cartoon");
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  useEffect(() => {
    let glViewer: ThreeDMol.GLViewer | null = null;

    if (result && viewerRef.current) {
      // Initialize the viewer with configuration options
      glViewer = ThreeDMol.createViewer(viewerRef.current, {
        backgroundColor: "white",
        antialias: true,
        id: "structure-viewer",
      });

      // Add the PDB model data
      glViewer.addModel(result.pdb_data, "pdb");

      // Set default style - initially cartoon with spectrum coloring
      glViewer.setStyle({}, { cartoon: { color: "spectrum" } });

      // Add surface representation with some transparency
      glViewer.addSurface(ThreeDMol.SurfaceType.VDW, {
        opacity: 0.7,
        colorscheme: "whiteCarbon",
      });

      // Center and zoom the view
      glViewer.zoomTo();

      // Render the initial view
      glViewer.render();

      // Save the viewer reference to state for later manipulation
      setViewer(glViewer);
    }

    // Cleanup function
    return () => {
      if (glViewer) {
        // Stop any animations
        glViewer.spin(false);
        // Remove models when component unmounts
        glViewer.removeAllModels();
        glViewer.render();
      }
    };
  }, [result]);

  // Effect to handle resize when fullscreen changes
  useEffect(() => {
    if (viewer) {
      // Small delay to ensure DOM has updated
      setTimeout(() => {
        viewer.resize();
        viewer.render();
      }, 100);
    }
  }, [isFullScreen, viewer]);

  // Style switching functions
  const changeStyle = (style: string) => {
    if (!viewer || !result) return;

    viewer.removeAllSurfaces();

    switch (style) {
      case "cartoon":
        viewer.setStyle({}, { cartoon: { color: "spectrum" } });
        break;
      case "stick":
        viewer.setStyle({}, { stick: { colorscheme: "default", radius: 0.2 } });
        break;
      case "sphere":
        viewer.setStyle({}, { sphere: { colorscheme: "default", scale: 0.3 } });
        break;
      case "surface":
        viewer.setStyle({}, { cartoon: { color: "spectrum", opacity: 0.5 } });
        viewer.addSurface(ThreeDMol.SurfaceType.VDW, {
          opacity: 0.7,
          colorscheme: "whiteCarbon",
        });
        break;
      default:
        viewer.setStyle({}, { cartoon: { color: "spectrum" } });
    }

    viewer.render();
    setViewStyle(style);
  };

  // Toggle spin animation
  const toggleSpin = () => {
    if (!viewer) return;

    if (isSpinning) {
      viewer.spin(false);
    } else {
      viewer.spin("y", 1);
    }

    setIsSpinning(!isSpinning);
    viewer.render();
  };

  // Toggle fullscreen mode
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  if (!result) {
    return null;
  }

  const downloadPdb = () => {
    if (result.pdb_data) {
      const blob = new Blob([result.pdb_data], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "predicted_structure.pdb");
    }
  };

  return (
    <motion.div
      className="container mx-auto space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isFullScreen ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
          <div className="flex items-center justify-between p-4 bg-gray-100">
            <h2 className="text-xl font-bold text-cyan-400">
              Protein Structure - Full Screen View
            </h2>
            <Button
              onClick={toggleFullScreen}
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
            >
              <Minimize2 size={18} /> Exit Full Screen
            </Button>
          </div>
          <div
            ref={viewerRef}
            className="flex-grow"
            style={{ position: "relative" }}
          />
          <div className="flex flex-wrap gap-2 p-4 bg-gray-100">
            <Button
              onClick={() => changeStyle("cartoon")}
              className={`${
                viewStyle === "cartoon"
                  ? "bg-cyan-500"
                  : "bg-gray-200 text-gray-800"
              }`}
              variant={viewStyle === "cartoon" ? "default" : "outline"}
              size="sm"
            >
              Cartoon
            </Button>
            <Button
              onClick={() => changeStyle("stick")}
              className={`${
                viewStyle === "stick"
                  ? "bg-cyan-500"
                  : "bg-gray-200 text-gray-800"
              }`}
              variant={viewStyle === "stick" ? "default" : "outline"}
              size="sm"
            >
              Stick
            </Button>
            <Button
              onClick={() => changeStyle("sphere")}
              className={`${
                viewStyle === "sphere"
                  ? "bg-cyan-500"
                  : "bg-gray-200 text-gray-800"
              }`}
              variant={viewStyle === "sphere" ? "default" : "outline"}
              size="sm"
            >
              Sphere
            </Button>
            <Button
              onClick={() => changeStyle("surface")}
              className={`${
                viewStyle === "surface"
                  ? "bg-cyan-500"
                  : "bg-gray-200 text-gray-800"
              }`}
              variant={viewStyle === "surface" ? "default" : "outline"}
              size="sm"
            >
              Surface
            </Button>
            <Button
              onClick={toggleSpin}
              variant="outline"
              size="sm"
              className={`${
                isSpinning
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {isSpinning ? "Stop Spin" : "Start Spin"}
            </Button>
          </div>
        </div>
      ) : (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-cyan-400">
              Predicted Protein Structure
            </CardTitle>
            <CardDescription className="text-gray-600">
              3D structure predicted from your amino acid sequence
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-gray-700 break-all">
                Sequence: <span className="font-mono">{result.sequence}</span>
              </p>
              <p className="text-gray-700">
                Confidence Score: {result.confidence.toFixed(2)}
              </p>
            </div>
            <div className="relative">
              <div
                ref={viewerRef}
                className="w-full h-[400px] bg-white rounded-lg"
                style={{ position: "relative" }}
              />
              {/* <Button
                onClick={toggleFullScreen}
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              >
                <Maximize2 size={18} />
              </Button> */}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => changeStyle("cartoon")}
                className={`${
                  viewStyle === "cartoon"
                    ? "bg-cyan-500"
                    : "bg-gray-200 text-gray-800"
                }`}
                variant={viewStyle === "cartoon" ? "default" : "outline"}
              >
                Cartoon
              </Button>
              <Button
                onClick={() => changeStyle("stick")}
                className={`${
                  viewStyle === "stick"
                    ? "bg-cyan-500"
                    : "bg-gray-200 text-gray-800"
                }`}
                variant={viewStyle === "stick" ? "default" : "outline"}
              >
                Stick
              </Button>
              <Button
                onClick={() => changeStyle("sphere")}
                className={`${
                  viewStyle === "sphere"
                    ? "bg-cyan-500"
                    : "bg-gray-200 text-gray-800"
                }`}
                variant={viewStyle === "sphere" ? "default" : "outline"}
              >
                Sphere
              </Button>
              <Button
                onClick={() => changeStyle("surface")}
                className={`${
                  viewStyle === "surface"
                    ? "bg-cyan-500"
                    : "bg-gray-200 text-gray-800"
                }`}
                variant={viewStyle === "surface" ? "default" : "outline"}
              >
                Surface
              </Button>
              <Button
                onClick={toggleSpin}
                variant="outline"
                className={`${
                  isSpinning
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {isSpinning ? "Stop Spin" : "Start Spin"}
              </Button>

              <Button
                onClick={downloadPdb}
                className="bg-cyan-400 text-gray-900 hover:bg-cyan-600 hover:[box-shadow:_0_0_12px_#00f6ff]"
              >
                Download PDB
              </Button>
            </div>

            <div className="mt-2 text-sm text-gray-500">
              <p>
                Mouse Controls: Left click to rotate, scroll to zoom, middle
                click/ctrl+left click to translate
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default StructureResults;
