import React, { useState, useEffect, useRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import * as d3 from 'd3';

// Define types for Newick parsing
interface NewickNode {
  name?: string;
  branch_length?: number;
  children?: NewickNode[];
}

const PhylogeneticTree: React.FC = () => {
  const [fasta, setFasta] = useState<string>(`>seq1\nATCGATCGATCGATCG\n>seq2\nATGGATCGATCGATCG\n>seq3\nATCGATGGATCGATCG`);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const visualizeTree = async () => {
    try {
      const response: AxiosResponse<{ newick: string }> = await axios.post(
        'http://localhost:8000/phylogenetic-tree',
        fasta,
        { headers: { 'Content-Type': 'text/plain' } }
      );
      const newick = response.data.newick;
      renderTree(newick);
    } catch (error: any) {
      alert('Error generating tree: ' + (error.response?.data?.detail || error.message));
    }
  };

  const renderTree = (newick: string) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous tree

    const width = 600;
    const height = 400;
    svg.attr("width", width).attr("height", height);

    // Parse Newick string into a hierarchy
    const root = d3.hierarchy<NewickNode>(parseNewick(newick), (d) => d.children)
      .sum((d) => d.branch_length || 0);

    // Compute tree layout
    const tree = d3.tree<NewickNode>().size([height - 50, width - 150]);
    tree(root);

    // Links
    svg.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", d3.linkHorizontal()
        .x((d) => d.y)
        .y((d) => d.x))
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-width", 1.5);

    // Nodes
    const node = svg.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    node.append("circle")
      .attr("r", 3)
      .attr("fill", "#999");

    // Labels
    node.append("text")
      .attr("dy", ".31em")
      .attr("x", (d) => d.children ? -8 : 8)
      .attr("text-anchor", (d) => d.children ? "end" : "start")
      .text((d) => d.data.name || '');
  };

  // Simple Newick parser with TypeScript types
  const parseNewick = (newick: string): NewickNode => {
    const tokens = newick.split(/([(),;:])/).filter((t) => t.trim());
    const stack: NewickNode[] = [];
    let current: NewickNode = { children: [] };
    let name = "";
    let length = "";

    for (const token of tokens) {
      if (token === '(') {
        const newNode: NewickNode = { children: [] };
        current.children!.push(newNode);
        stack.push(current);
        current = newNode;
      } else if (token === ',') {
        if (name) {
          current.name = name;
          if (length) current.branch_length = parseFloat(length);
          name = "";
          length = "";
        }
      } else if (token === ')') {
        if (name) {
          current.name = name;
          if (length) current.branch_length = parseFloat(length);
          name = "";
          length = "";
        }
        current = stack.pop()!;
      } else if (token === ':') {
        length = "";
      } else if (token === ';') {
        if (name) {
          current.name = name;
          if (length) current.branch_length = parseFloat(length);
        }
      } else if (length !== "") {
        length += token;
      } else {
        name += token;
      }
    }
    return current;
  };

  return (
    <div>
        <h1>Phylogenetic Tree Visualizer</h1>
        <textarea
        rows={6}
        cols={50}
        value={fasta}
        onChange={(e) => setFasta(e.target.value)}
        placeholder="Enter FASTA sequences"
        />
        <br />
        <button onClick={visualizeTree}>Visualize Tree</button>
        <svg ref={svgRef}></svg>
    </div>
  );
};

export default PhylogeneticTree;