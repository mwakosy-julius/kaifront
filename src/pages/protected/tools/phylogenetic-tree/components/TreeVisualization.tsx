import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  ZoomIn,
  ZoomOut,
  Move,
  Maximize,
  MinusCircle,
  PlusCircle,
} from "lucide-react";

interface TreeVisualizationProps {
  svg: string;
  newick?: string;
}

interface TreeNode {
  name: string;
  length: number;
  children: TreeNode[];
  x: number;
  y: number;
  parent?: TreeNode;
}

const TreeVisualization: React.FC<TreeVisualizationProps> = ({
  svg,
  newick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [colorScheme, setColorScheme] = useState("default");
  const [useNewick, setUseNewick] = useState(!!newick);
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [treeWidth, setTreeWidth] = useState(800);
  const [treeHeight, setTreeHeight] = useState(600);

  const parseNewick = (newickString: string): TreeNode | null => {
    if (!newickString) return null;

    let data = newickString.trim();
    if (data.endsWith(";")) {
      data = data.slice(0, -1);
    }

    let pos = 0;

    function parseNode(): TreeNode {
      const node: TreeNode = {
        name: "",
        length: 0,
        children: [],
        x: 0,
        y: 0,
      };

      if (data[pos] === "(") {
        pos++;
        while (data[pos] !== ")") {
          const child = parseNode();
          child.parent = node;
          node.children.push(child);
          if (data[pos] === ",") {
            pos++;
          }
        }
        pos++;
      }

      let name = "";
      while (
        pos < data.length &&
        data[pos] !== ":" &&
        data[pos] !== "," &&
        data[pos] !== ")"
      ) {
        name += data[pos];
        pos++;
      }
      node.name = name.trim();

      if (data[pos] === ":") {
        pos++;
        let lengthStr = "";
        while (pos < data.length && data[pos] !== "," && data[pos] !== ")") {
          lengthStr += data[pos];
          pos++;
        }
        node.length = parseFloat(lengthStr) || 0;
      }

      return node;
    }

    const root = parseNode();
    return root;
  };

  const layoutTree = (
    node: TreeNode,
    depth: number = 0,
    yPos: number = 0,
    leafNodes: TreeNode[] = []
  ): number => {
    if (node.children.length === 0) {
      leafNodes.push(node);
      node.x = depth;
      node.y = yPos;
      return 1;
    } else {
      let totalLeaves = 0;
      let currentY = yPos;

      for (let i = 0; i < node.children.length; i++) {
        const leaves = layoutTree(
          node.children[i],
          depth + node.children[i].length,
          currentY,
          leafNodes
        );
        currentY += leaves;
        totalLeaves += leaves;
      }

      node.x = depth;
      node.y = yPos + (totalLeaves - 1) / 2;
      return totalLeaves;
    }
  };

  const drawTree = (
    ctx: CanvasRenderingContext2D,
    node: TreeNode,
    maxDepth: number,
    maxY: number,
    colors: boolean = false
  ) => {
    const scaleX = (x: number) => (x / maxDepth) * (ctx.canvas.width - 160);
    const scaleY = (y: number) => (y / maxY) * (ctx.canvas.height - 60);

    if (node.parent) {
      ctx.beginPath();
      ctx.moveTo(scaleX(node.x) + 120, scaleY(node.y) + 30);
      ctx.lineTo(scaleX(node.parent.x) + 120, scaleY(node.y) + 30);
      ctx.lineTo(scaleX(node.parent.x) + 120, scaleY(node.parent.y) + 30);

      if (colors) {
        const hue = (node.x * 120) % 360;
        ctx.strokeStyle = `hsl(${hue}, 70%, 50%)`;
      } else {
        ctx.strokeStyle = colorScheme === "grayscale" ? "#666" : "#000";
      }

      ctx.lineWidth = 2;
      ctx.stroke();
    }

    if (node.children.length === 0) {
      ctx.fillStyle = colorScheme === "grayscale" ? "#666" : "#000";
      ctx.font = "12px Arial";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(node.name || "", scaleX(node.x) + 125, scaleY(node.y) + 30);
    }

    for (const child of node.children) {
      drawTree(ctx, child, maxDepth, maxY, colors);
    }
  };

  useEffect(() => {
    if (newick && useNewick) {
      const parsedRoot = parseNewick(newick);
      if (parsedRoot) {
        const leafNodes: TreeNode[] = [];
        layoutTree(parsedRoot, 0, 0, leafNodes);

        let maxDepth = 0;

        const findMaxDepth = (node: TreeNode, depth: number) => {
          if (depth > maxDepth) maxDepth = depth;
          for (const child of node.children) {
            findMaxDepth(child, depth + child.length);
          }
        };

        findMaxDepth(parsedRoot, 0);
        setRoot(parsedRoot);
        setTreeWidth(Math.max(800, leafNodes.length * 20));
        setTreeHeight(Math.max(500, leafNodes.length * 30));
      }
    } else if (svg && !useNewick) {
      if (svgContainerRef.current) {
        svgContainerRef.current.innerHTML = svg;

        const svgElement = svgContainerRef.current.querySelector("svg");
        if (svgElement) {
          svgElement.setAttribute("width", "100%");
          svgElement.setAttribute("height", "100%");
          svgElement.style.maxHeight = "600px";
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newick, svg, useNewick]);

  useEffect(() => {
    if (useNewick && root && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = treeWidth;
      canvas.height = treeHeight;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let maxDepth = 0;
      let maxY = 0;

      const findMaxValues = (node: TreeNode) => {
        if (node.x > maxDepth) maxDepth = node.x;
        if (node.y > maxY) maxY = node.y;
        for (const child of node.children) {
          findMaxValues(child);
        }
      };

      findMaxValues(root);

      drawTree(ctx, root, maxDepth, maxY, colorScheme === "colorful");

      ctx.fillStyle = "#000";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Phylogenetic Tree", canvas.width / 2, 15);

      const scaleBarLength = maxDepth * 0.2;
      const scaleX = (x: number) => (x / maxDepth) * (canvas.width - 160);

      ctx.beginPath();
      ctx.moveTo(50, treeHeight - 20);
      ctx.lineTo(50 + scaleX(scaleBarLength), treeHeight - 20);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#000";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        `${scaleBarLength.toFixed(2)} substitutions/site`,
        50 + scaleX(scaleBarLength) / 2,
        treeHeight - 8
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root, useNewick, colorScheme, treeWidth, treeHeight]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && containerRef.current) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 3));
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
  };

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const applyColorScheme = (scheme: string) => {
    setColorScheme(scheme);

    if (useNewick) {
      return;
    }

    if (!svgContainerRef.current) return;

    const svgElement = svgContainerRef.current.querySelector("svg");
    if (!svgElement) return;

    svgElement.classList.remove(
      "tree-default",
      "tree-colorful",
      "tree-grayscale"
    );

    switch (scheme) {
      case "colorful": {
        svgElement.classList.add("tree-colorful");
        const branches = svgElement.querySelectorAll("path");
        branches.forEach((branch, i) => {
          const hue = (i * 25) % 360;
          branch.setAttribute("stroke", `hsl(${hue}, 70%, 50%)`);
        });
        break;
      }
      case "grayscale": {
        svgElement.classList.add("tree-grayscale");
        const elements = svgElement.querySelectorAll("path, circle, text");
        elements.forEach((el) => {
          if (el.tagName === "text") {
            el.setAttribute("fill", "#666");
          } else {
            el.setAttribute("stroke", "#666");
          }
        });
        break;
      }
      default: {
        svgElement.classList.add("tree-default");
        const defaultElements = svgElement.querySelectorAll("path, circle");
        defaultElements.forEach((el) => {
          el.setAttribute("stroke", "#000");
        });
        const textElements = svgElement.querySelectorAll("text");
        textElements.forEach((el) => {
          el.setAttribute("fill", "#000");
        });
      }
    }
  };

  const toggleRenderMode = () => {
    setUseNewick(!useNewick);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phylogenetic Tree</CardTitle>
        <CardDescription>
          Visual representation of evolutionary relationships
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 p-2 mb-2 border rounded bg-muted/20">
          <Button variant="outline" size="sm" onClick={zoomIn}>
            <ZoomIn className="w-4 h-4 mr-1" />
            Zoom In
          </Button>
          <Button variant="outline" size="sm" onClick={zoomOut}>
            <ZoomOut className="w-4 h-4 mr-1" />
            Zoom Out
          </Button>
          <Button variant="outline" size="sm" onClick={resetView}>
            <Maximize className="w-4 h-4 mr-1" />
            Reset
          </Button>
          {newick && svg && (
            <Button variant="secondary" size="sm" onClick={toggleRenderMode}>
              {useNewick ? "Use SVG" : "Use Newick"}
            </Button>
          )}
          <div className="flex items-center gap-2 ml-auto">
            <Label htmlFor="color-scheme" className="text-sm whitespace-nowrap">
              Color Scheme:
            </Label>
            <select
              id="color-scheme"
              value={colorScheme}
              onChange={(e) => applyColorScheme(e.target.value)}
              className="h-8 px-2 text-sm border rounded bg-background"
            >
              <option value="default">Default</option>
              <option value="colorful">Colorful</option>
              <option value="grayscale">Grayscale</option>
            </select>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative overflow-hidden border rounded h-[500px] bg-white cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {useNewick ? (
            <canvas
              ref={canvasRef}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: "top left",
                transition: "transform 0.1s ease-out",
              }}
              className="absolute w-full h-full"
            />
          ) : (
            <div
              ref={svgContainerRef}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: "center",
                transition: "transform 0.1s ease-out",
              }}
              className="absolute w-full h-full"
            />
          )}

          {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/10">
              <Move className="w-8 h-8 text-white opacity-50" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="zoom-slider" className="text-sm">
            Zoom:
          </Label>
          <Button
            variant="outline"
            size="icon"
            className="w-6 h-6 p-0 rounded-full"
            onClick={zoomOut}
          >
            <MinusCircle className="w-3 h-3" />
          </Button>
          <Slider
            id="zoom-slider"
            value={[scale * 100]}
            min={50}
            max={300}
            step={10}
            onValueChange={(value) => setScale(value[0] / 100)}
            className="w-full max-w-xs"
          />
          <Button
            variant="outline"
            size="icon"
            className="w-6 h-6 p-0 rounded-full"
            onClick={zoomIn}
          >
            <PlusCircle className="w-3 h-3" />
          </Button>
          <span className="ml-2 text-xs text-muted-foreground">
            {Math.round(scale * 100)}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TreeVisualization;
