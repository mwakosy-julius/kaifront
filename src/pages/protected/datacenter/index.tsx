"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Download,
  Star,
  Users,
  Database,
  Shield,
  Zap,
  ChevronDown,
  ShoppingCart,
  Heart,
  Eye,
} from "lucide-react";

const datasets = [
  {
    id: 1,
    title: "Human Genome Variation Dataset",
    description:
      "Comprehensive collection of SNPs, indels, and structural variants from 10,000+ individuals across diverse populations.",
    category: "Genomics",
    price: 299,
    originalPrice: 399,
    format: "VCF, TSV",
    size: "2.4 TB",
    samples: "10,847",
    rating: 4.9,
    reviews: 156,
    downloads: 2847,
    tags: ["SNPs", "Population Genetics", "GWAS", "Variant Calling"],
    featured: true,
    quality: "Premium",
  },
  {
    id: 2,
    title: "Cancer Proteomics Atlas",
    description:
      "Mass spectrometry-based proteomics data from 15 cancer types with matched normal tissues and clinical annotations.",
    category: "Proteomics",
    price: 199,
    format: "mzML, CSV",
    size: "890 GB",
    samples: "3,245",
    rating: 4.8,
    reviews: 89,
    downloads: 1523,
    tags: ["Mass Spectrometry", "Cancer", "Biomarkers", "Clinical"],
    quality: "Validated",
  },
  {
    id: 3,
    title: "Single-Cell RNA-seq Atlas",
    description:
      "High-resolution single-cell transcriptomics data from human brain development across multiple time points.",
    category: "Transcriptomics",
    price: 149,
    format: "H5AD, MTX",
    size: "156 GB",
    samples: "2.1M cells",
    rating: 4.7,
    reviews: 234,
    downloads: 3891,
    tags: ["scRNA-seq", "Brain Development", "Cell Types", "Trajectory"],
    quality: "Curated",
  },
  {
    id: 4,
    title: "Metabolomics Biomarker Panel",
    description:
      "Targeted metabolomics data for diabetes research with validated biomarkers and pathway annotations.",
    category: "Metabolomics",
    price: 89,
    format: "CSV, JSON",
    size: "45 GB",
    samples: "1,567",
    rating: 4.6,
    reviews: 67,
    downloads: 892,
    tags: ["Diabetes", "Biomarkers", "Pathways", "Clinical"],
    quality: "Standard",
  },
  {
    id: 5,
    title: "Microbiome Diversity Dataset",
    description:
      "16S rRNA sequencing data from gut microbiome samples across different populations and health conditions.",
    category: "Microbiomics",
    price: 129,
    format: "FASTQ, BIOM",
    size: "234 GB",
    samples: "4,892",
    rating: 4.5,
    reviews: 123,
    downloads: 1456,
    tags: ["16S rRNA", "Gut Microbiome", "Diversity", "Health"],
    quality: "Curated",
  },
  {
    id: 6,
    title: "Epigenetic Modifications Map",
    description:
      "ChIP-seq and ATAC-seq data mapping histone modifications and chromatin accessibility across cell types.",
    category: "Epigenomics",
    price: 179,
    format: "BAM, BED, BigWig",
    size: "567 GB",
    samples: "892",
    rating: 4.8,
    reviews: 78,
    downloads: 634,
    tags: ["ChIP-seq", "ATAC-seq", "Chromatin", "Histone"],
    quality: "Premium",
  },
];

const categories = [
  "All Categories",
  "Genomics",
  "Proteomics",
  "Transcriptomics",
  "Metabolomics",
  "Microbiomics",
  "Epigenomics",
];
const qualityLevels = [
  "All Quality",
  "Premium",
  "Validated",
  "Curated",
  "Standard",
];
const sortOptions = [
  "Relevance",
  "Price: Low to High",
  "Price: High to Low",
  "Most Downloaded",
  "Highest Rated",
  "Newest",
];

export default function Component() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedQuality, setSelectedQuality] = useState("All Quality");
  const [sortBy, setSortBy] = useState("Relevance");

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "Premium":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Validated":
        return "bg-green-100 text-green-800 border-green-200";
      case "Curated":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Database className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">
                  BioDataHub
                </span>
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Browse
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Categories
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Pricing
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Support
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
              </Button>
              <Button variant="outline" size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart (0)
              </Button>
              <Button size="sm">Sign In</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Premium Bioinformatics Datasets
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Accelerate your research with high-quality, curated datasets from
            genomics to proteomics. Trusted by researchers worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="h-5 w-5" />
              <span>Quality Guaranteed</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Zap className="h-5 w-5" />
              <span>Instant Download</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Users className="h-5 w-5" />
              <span>10,000+ Researchers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search datasets, keywords, or research areas..."
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedQuality}
                onValueChange={setSelectedQuality}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Quality" />
                </SelectTrigger>
                <SelectContent>
                  {qualityLevels.map((quality) => (
                    <SelectItem key={quality} value={quality}>
                      {quality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {datasets.length} Datasets Available
          </h2>
          <div className="text-sm text-gray-600">
            Showing results for "
            {selectedCategory === "All Categories"
              ? "all categories"
              : selectedCategory}
            "
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {datasets.map((dataset) => (
            <Card
              key={dataset.id}
              className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="mb-2">
                    {dataset.category}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                  {dataset.title}
                </CardTitle>
                <CardDescription className="text-sm line-clamp-3">
                  {dataset.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge
                    className={getQualityColor(dataset.quality)}
                    variant="outline"
                  >
                    {dataset.quality}
                  </Badge>
                  {dataset.featured && (
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                      Featured
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <Label className="text-xs text-gray-500">Format</Label>
                    <p className="font-medium">{dataset.format}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Size</Label>
                    <p className="font-medium">{dataset.size}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Samples</Label>
                    <p className="font-medium">{dataset.samples}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Downloads</Label>
                    <p className="font-medium">
                      {dataset.downloads.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">
                      {dataset.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({dataset.reviews} reviews)
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {dataset.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {dataset.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{dataset.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${dataset.price}
                      </span>
                      {dataset.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${dataset.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1" size="sm">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Datasets
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Database className="h-6 w-6" />
                <span className="text-lg font-bold">BioDataHub</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering researchers with premium bioinformatics datasets for
                breakthrough discoveries.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Genomics
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Proteomics
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Transcriptomics
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Metabolomics
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 BioDataHub. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-gray-400">
                Trusted by researchers worldwide
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
