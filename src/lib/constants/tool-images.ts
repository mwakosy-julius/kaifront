/**
 * Constant image URLs for different tool categories
 * These can be replaced with actual image paths from your assets
 */

export const TOOL_IMAGES = {
  // Category images
  genomics:
    "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=500&auto=format&fit=crop",
  proteomics:
    "https://images.unsplash.com/photo-1576086776761-cc33f1db113d?q=80&w=500&auto=format&fit=crop",
  metabolomics:
    "https://images.unsplash.com/photo-1618015487607-93cd0f01fae9?q=80&w=500&auto=format&fit=crop",

  // Specific tool types
  sequencing:
    "https://images.unsplash.com/photo-1566570245405-9d3a89432b86?q=80&w=500&auto=format&fit=crop",
  alignment:
    "https://images.unsplash.com/photo-1599720574473-7d19d9958785?q=80&w=500&auto=format&fit=crop",
  analysis:
    "https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=500&auto=format&fit=crop",
  visualization:
    "https://images.unsplash.com/photo-1610433572201-110753c6cff9?q=80&w=500&auto=format&fit=crop",

  // Tool-specific images
  variantAnalysis:
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=500&auto=format&fit=crop",
  genomeAssembly:
    "https://images.unsplash.com/photo-1526666923127-b2970f64b422?q=80&w=500&auto=format&fit=crop",
  transcriptomics:
    "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=500&auto=format&fit=crop",
  massSpec:
    "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?q=80&w=500&auto=format&fit=crop",
  proteinStructure:
    "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?q=80&w=500&auto=format&fit=crop",
  metaboliteIdentifier:
    "https://images.unsplash.com/photo-1552152370-fb49b5454e23?q=80&w=500&auto=format&fit=crop",
  pathwayAnalysis:
    "https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=500&auto=format&fit=crop",

  // Generic scientific imagery
  phylogeneticTree:
    "https://images.unsplash.com/photo-1588613254732-9dde08396b4d?q=80&w=500&auto=format&fit=crop",
  sequenceAligner:
    "https://images.unsplash.com/photo-1637419450536-378d5457abb8?q=80&w=500&auto=format&fit=crop",
  statistical:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop",
  dataVisualization:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop",

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
