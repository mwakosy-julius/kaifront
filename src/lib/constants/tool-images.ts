/**
 * Constant image URLs for different tool categories
 * These can be replaced with actual image paths from your assets
 */

export const TOOL_IMAGES = {
  // Category images
  genomics:
    "https://images.unsplash.com/photo-1719163534402-ba86dcb55228?q=80&w=1990&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  proteomics:
    "https://images.unsplash.com/photo-1576086776761-cc33f1db113d?q=80&w=500&auto=format&fit=crop",
  metabolomics:
    "https://images.unsplash.com/photo-1618015487607-93cd0f01fae9?q=80&w=500&auto=format&fit=crop",

  // Specific tool types
  sequencing:
    "https://images.unsplash.com/photo-1566570245405-9d3a89432b86?q=80&w=500&auto=format&fit=crop",
  alignment:
    "https://images.unsplash.com/photo-1717501218221-1da14c0f365e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  analysis:
    "https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=500&auto=format&fit=crop",
  visualization:
    "https://images.unsplash.com/photo-1610433572201-110753c6cff9?q=80&w=500&auto=format&fit=crop",

  // Tool-specific images
  variantAnalysis:
    "https://images.unsplash.com/photo-1707681611906-5f941658d392?q=80&w=2011&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  genomeAssembly:
    "https://images.unsplash.com/photo-1526666923127-b2970f64b422?q=80&w=500&auto=format&fit=crop",
  transcriptomics:
    "https://images.unsplash.com/photo-1580378159116-918e927816ce?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  massSpec:
    "https://images.unsplash.com/photo-1678945253365-51d5f2ebf298?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  proteinStructure:
    "https://images.unsplash.com/photo-1653462072468-644bc3c86574?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  metaboliteIdentifier:
    "https://images.unsplash.com/photo-1705256811175-b1e3398d50e4?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  pathwayAnalysis:
    "https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=500&auto=format&fit=crop",

  // Generic scientific imagery
  phylogeneticTree:
    "https://images.unsplash.com/photo-1692607038273-8f45f4b0b1c7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  sequenceAligner:
    "https://images.unsplash.com/photo-1659922112975-6698cdcb9f9c?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  statistical:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop",
  dataVisualization:
    "https://plus.unsplash.com/premium_photo-1676226342632-5072f3b96149?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxiaW8lMjBpbmZvcm1hdGljc3xlbnwwfHwwfHx8MA%3D%3D",

  // Default/fallback image
  default:
    "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=500&auto=format&fit=crop",
};

/**
 * Get an appropriate image URL based on tool name or category
 */
export function getToolImage(toolName: string, category?: string): string {
  const name = toolName.toLowerCase();

  // Check for specific tool matches first
  if (name.includes("variant") || name.includes("mutation"))
    return TOOL_IMAGES.variantAnalysis;
  if (name.includes("assembly") || name.includes("genome"))
    return TOOL_IMAGES.genomeAssembly;
  if (name.includes("transcript") || name.includes("expression"))
    return TOOL_IMAGES.transcriptomics;
  if (name.includes("mass") || name.includes("spec"))
    return TOOL_IMAGES.massSpec;
  if (name.includes("protein") || name.includes("structure"))
    return TOOL_IMAGES.proteinStructure;
  if (name.includes("metabolite") || name.includes("identify"))
    return TOOL_IMAGES.metaboliteIdentifier;
  if (name.includes("pathway") || name.includes("network"))
    return TOOL_IMAGES.pathwayAnalysis;
  if (name.includes("phylo") || name.includes("tree"))
    return TOOL_IMAGES.phylogeneticTree;
  if (name.includes("align") || name.includes("sequence"))
    return TOOL_IMAGES.sequenceAligner;
  if (name.includes("stat") || name.includes("analysis"))
    return TOOL_IMAGES.statistical;
  if (
    name.includes("visual") ||
    name.includes("chart") ||
    name.includes("plot")
  )
    return TOOL_IMAGES.dataVisualization;

  // If no specific match, try to match by category
  if (category) {
    const cat = category.toLowerCase();
    if (cat.includes("genom")) return TOOL_IMAGES.genomics;
    if (cat.includes("proteo")) return TOOL_IMAGES.proteomics;
    if (cat.includes("metabol")) return TOOL_IMAGES.metabolomics;
    if (cat.includes("visual")) return TOOL_IMAGES.visualization;
    if (cat.includes("align")) return TOOL_IMAGES.alignment;
    if (cat.includes("analysis")) return TOOL_IMAGES.analysis;
  }

  // Default fallback
  return TOOL_IMAGES.default;
}
