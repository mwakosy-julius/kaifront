import React, { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";
import { motion } from "motion/react";
import * as ThreeDMol from "3dmol";
import { StructurePrediction } from "@/lib/services/tools/protein_structure";

interface StructureResultsProps {
  result: StructurePrediction | null;
}

const StructureResults: React.FC<StructureResultsProps> = ({ result }) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result && viewerRef.current) {
      const viewer = ThreeDMol.createViewer(viewerRef.current, {
        backgroundColor: "black",
      });
      viewer.addModel(result.pdb_data, "pdb");
      viewer.setStyle({}, { cartoon: { color: "spectrum" } });
      viewer.zoomTo();
      viewer.render();
      // No cleanup necessary as GLViewer does not have a destroy method
      return undefined;
    }
  }, [result]);

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
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-cyan-400">
            Predicted Protein Structure
          </CardTitle>
          <CardDescription className="text-gray-300">
            3D structure predicted from your amino acid sequence
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-white">
              Sequence: <span className="font-mono">{result.sequence}</span>
            </p>
            <p className="text-white">
              Confidence Score: {result.confidence.toFixed(2)}
            </p>
          </div>
          <div
            ref={viewerRef}
            className="w-full h-[400px] bg-black rounded-lg"
            style={{ position: "relative" }}
          />
          <Button
            onClick={downloadPdb}
            className="bg-cyan-400 text-gray-900 hover:bg-cyan-600 hover:[box-shadow:_0_0_12px_#00f6ff]"
          >
            Download PDB
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StructureResults;
