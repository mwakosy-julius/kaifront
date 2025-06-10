import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Play,
  Dna,
  Code,
  Layers,
  Search,
  Archive,
  FileText,
  TreePine,
  LineChart,
  BarChart2,
  UserCheck,
  Microscope,
  ArrowRight,
  NetworkIcon,
  FlaskConical,
  GitCompareArrows,
} from "lucide-react";

// Local imports
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Tool categories
  const toolCategories = [
    {
      id: "sequence-analysis",
      name: "Sequence Analysis",
      description: "Analyze and manipulate DNA/RNA sequences with precision",
      tools: [
        {
          icon: GitCompareArrows,
          title: "BLAST",
          link: "/blast",
          description:
            "Search sequence databases for optimal local alignment matches",
        },
        {
          icon: Search,
          title: "Sequence Search",
          link: "/sequence_search",
          description: "Find patterns and motifs within nucleotide sequences",
        },
        {
          icon: Dna,
          title: "Consensus Maker",
          link: "/consensus_maker",
          description: "Generate consensus sequences from multiple alignments",
        },
        {
          icon: Code,
          title: "Sequence Mutator",
          link: "/sequence_mutator",
          description:
            "Simulate mutations and analyze their effects on sequences",
        },
      ],
    },
    {
      id: "genomics",
      name: "Genomics",
      description:
        "Advanced tools for whole genome analysis and interpretation",
      tools: [
        {
          icon: LineChart,
          title: "GC Content",
          link: "/gc_content",
          description: "Calculate and visualize GC content across sequences",
        },
        {
          icon: BarChart2,
          title: "Codon Usage",
          link: "/codon_usage",
          description:
            "Analyze codon frequency and optimization in coding sequences",
        },
        {
          icon: Archive,
          title: "Data Compression",
          link: "/data_compression",
          description:
            "Efficiently compress genomic data for storage and transfer",
        },
        {
          icon: Microscope,
          title: "Variant Calling",
          link: "/variant_calling",
          description: "Identify genomic variants from sequencing data",
        },
      ],
    },
    {
      id: "comparative",
      name: "Comparative Genomics",
      description: "Compare sequences across species and evolutionary analyses",
      tools: [
        {
          icon: TreePine,
          title: "Phylogenetic Trees",
          link: "/phylogenetic_tree",
          description: "Generate evolutionary trees from multiple sequences",
        },
        {
          icon: NetworkIcon,
          title: "Multiple Alignment",
          link: "/multiple_alignment",
          description:
            "Align multiple sequences to identify conservation patterns",
        },
        {
          icon: Layers,
          title: "Metagenomics",
          link: "/metagenomics",
          description:
            "Analyze microbial communities from environmental samples",
        },
        {
          icon: GitCompareArrows,
          title: "Pairwise Alignment",
          link: "/pairwise_alignment",
          description:
            "Compare two sequences to identify similarities and differences",
        },
      ],
    },
    {
      id: "visualization",
      name: "Visualization",
      description: "Powerful visual representations of complex biological data",
      tools: [
        {
          icon: Dna,
          title: "DNA Visualization",
          link: "/dna_visualization",
          description:
            "Interactive visualization of nucleotide sequences and features",
        },
        {
          icon: FlaskConical,
          title: "Protein Structure",
          link: "/protein_structure",
          description: "Visualize and analyze 3D protein structures",
        },
        {
          icon: FileText,
          title: "Motif Finder",
          link: "/motif_finder",
          description: "Identify and visualize sequence motifs and patterns",
        },
      ],
    },
  ];

  // User testimonials with improved quotes
  const testimonials = [
    {
      name: "Ngereza Stuart",
      position: "Biotechnology Student, Udsm",
      quote:
        "KaiDoku is mind-blowing for a newbie like me! I used the metagenomics tool to analyze a FASTA file for my ecology class, and it was so easy-no coding, just paste and go. The visualizations helped me understand complex data in minutes.",
      image:
        "https://i.pinimg.com/736x/0f/69/1c/0f691cd77a8c6d90f07b35c10c95668f.jpg",
    },
    {
      name: "Mr. Felix",
      position: "Bioinformatician, Pwani University",
      quote:
        "KaiDoku is a game-changer for no-code bioinformatics. The app is super intuitive for quick checks, and the aesthetic design makes it feel fresh, not like another clunky bioinformatics tool.",
      image:
        "https://i.pinimg.com/736x/0f/69/1c/0f691cd77a8c6d90f07b35c10c95668f.jpg",
    },
    {
      name: "Mr. Kiula",
      position: "Genomics Researcher, MUHAS",
      quote:
        "As a researcher, I am looking for quick ways to analyze my data. KaiDoku delivers results in seconds and the charts are publication-ready. The design is also slick. 14,000 bp gene regions used to take days. With Kaidoku's consensus maker and variant caller, I can process the same data in minutes and focus on interpretation rather than processing.",
      image:
        "https://i.pinimg.com/736x/0f/69/1c/0f691cd77a8c6d90f07b35c10c95668f.jpg",
    },
  ];

  // Research publications using Kaidoku
  const publications = [
    {
      title:
        "Comparative genomic analysis reveals novel insights into the evolution of SARS-CoV-2 variants",
      authors: "Martinez et al.",
      journal: "Nature Genetics",
      year: "2024",
      doi: "10.1038/s41588-024-1234-5",
      toolsUsed: ["Multiple Alignment", "Phylogenetic Tree", "Variant Calling"],
    },
    {
      title:
        "Metagenomic characterization of microbial communities in deep-sea hydrothermal vents",
      authors: "Johnson et al.",
      journal: "Science Advances",
      year: "2024",
      doi: "10.1126/sciadv.abc1234",
      toolsUsed: ["Metagenomics", "Sequence Search", "GC Content"],
    },
    {
      title:
        "Novel algorithms for efficient compression of large-scale genomic datasets",
      authors: "Williams et al.",
      journal: "Bioinformatics",
      year: "2023",
      doi: "10.1093/bioinformatics/btad123",
      toolsUsed: ["Data Compression"],
    },
  ];

  // Platform advantages
  const advantages = [
    {
      icon: UserCheck,
      title: "User-Friendly Interface",
      description:
        "Designed for both beginners and experts, with intuitive workflows and helpful documentation",
    },
    {
      icon: Microscope,
      title: "High-Performance Computing",
      description:
        "Cloud-optimized algorithms process your data faster than traditional desktop software",
    },
    {
      icon: BarChart2,
      title: "Interactive Visualizations",
      description:
        "Dynamic, publication-ready visualizations that update in real-time as you analyze your data",
    },
    {
      icon: Search,
      title: "Reproducible Research",
      description:
        "Save and share your complete analysis workflow to ensure reproducibility",
    },
  ];

  return (
    <main>
      {/* Navigation Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex items-center justify-between py-4 mx-auto">
          <div className="flex items-center gap-2">
            <img
              src="/kaidoku-logo.svg"
              alt="Kaidoku Logo"
              className="w-10 h-10 md:w-12 md:h-12"
              style={{ filter: "drop-shadow(0 0 5px #00f6ff)" }}
            />
            <span className="text-2xl font-bold text-white">Kaidoku</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex gap-8">
              <li>
                <a
                  href="#about"
                  className="text-gray-200 transition-colors hover:text-cyan-400"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#tools"
                  className="text-gray-200 transition-colors hover:text-cyan-400"
                >
                  Tools
                </a>
              </li>
              <li>
                <a
                  href="/docs"
                  className="text-gray-200 transition-colors hover:text-cyan-400"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-gray-200 transition-colors hover:text-cyan-400"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-gray-200 transition-colors hover:text-cyan-400"
                >
                  Testimonials
                </a>
              </li>              
            </ul>
          </nav>

          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button
                variant="default"
                className="hidden px-4 py-2 text-sm font-medium text-gray-900 bg-cyan-400 hover:bg-cyan-300 md:block"
              >
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <div className="flex gap-4">
              <Button
                variant="ghost"
                href="/sign-in"
                size="sm"
                className="font-medium text-white"
                asChild
              >
                Sign In
              </Button>
              <Button
                variant="default"
                href="/sign-up"
                size="sm"
                className="font-medium text-gray-900 bg-cyan-400 hover:bg-cyan-300"
                asChild
              >
                Try Free
              </Button>
            </div>
          )}
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen text-center">
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            className="absolute object-cover w-full h-full opacity-40"
          >
            <source src="/dna-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/60 to-gray-900"></div>
        </div>
        <div className="container relative z-10 px-4 mx-auto">
          <motion.div
            className="max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
              Modern{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
                Bioinformatics Platform
              </span>{" "}
              for Genomics
            </h1>
            <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-200 md:text-xl">
              A comprehensive platform with 15+ specialized tools for DNA
              sequence analysis, genomics research, and interactive data
              visualization designed for scientists and students.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-center gap-4 mb-12 sm:flex-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              className="px-8 py-6 text-lg font-medium text-white transition-all shadow-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl hover:shadow-xl hover:shadow-cyan-500/20"
              href="/sign-up"
            >
              Start Free Trial{" "}
              <ArrowRight className="inline-block w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="px-8 py-6 text-lg font-medium transition-all border-2 shadow-lg text-cyan-300 hover:text-cyan-500 border-cyan-500/50 hover:border-cyan-500 rounded-xl"
              href="/demo"
            >
              <Play className="w-6 h-6" />
              <span>Watch Demo</span>
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div>
              <p className="text-3xl font-bold text-cyan-400">15+</p>
              <p className="text-gray-300">Specialized Tools</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-cyan-400">5000+</p>
              <p className="text-gray-300">Sequences Processed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-cyan-400">100+</p>
              <p className="text-gray-300">Researchers</p>
            </div>
            {/* <div>
              <p className="text-3xl font-bold text-cyan-400">200+</p>
              <p className="text-gray-300">Publications</p>
            </div> */}
          </motion.div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-10 bg-gray-900">
        <div className="container px-4 mx-auto">
          <motion.div
            className="max-w-3xl mx-auto mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Powerful Bioinformatics Tools
            </h2>
            <p className="text-xl text-gray-300">
              From sequence alignment to complex genomic analysis, our
              comprehensive suite of tools empowers your research.
            </p>
          </motion.div>

          <Tabs defaultValue="sequence-analysis" className="w-full">
            <TabsList className="flex flex-wrap justify-center w-full mb-8 space-x-2 bg-transparent">
              {toolCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="px-6 py-3 text-gray-300 border border-gray-700 data-[state=active]:bg-cyan-900 data-[state=active]:text-cyan-300 rounded-full data-[state=active]:border-cyan-700 hover:border-gray-600"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {toolCategories.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id}
                className="mt-4"
              >
                <div className="mb-8">
                  <h3 className="mb-2 text-2xl font-bold text-cyan-400">
                    {category.name}
                  </h3>
                  <p className="text-gray-300">{category.description}</p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {category.tools.map((tool, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="h-full overflow-hidden transition-all duration-300 bg-gray-800 border-gray-700 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-900/30">
                        <CardHeader className="pb-2">
                          <div className="p-3 mb-4 rounded-lg w-fit bg-cyan-900/50">
                            <tool.icon className="w-6 h-6 text-cyan-400" />
                          </div>
                          <CardTitle className="text-xl font-bold text-white">
                            {tool.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-300">{tool.description}</p>
                        </CardContent>
                        <CardFooter>
                          <Button
                            variant="ghost"
                            className="p-0 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950"
                            href={`/dashboard/tools${tool.link}`}
                          >
                            Learn more <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="container px-4 mx-auto">
          <motion.div
            className="max-w-3xl mx-auto mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Why Choose Kaidoku
            </h2>
            <p className="text-xl text-gray-300">
              Our platform is designed to meet the needs of both novice students
              and experienced researchers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="p-8 text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-cyan-900/50">
                    <advantage.icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-white">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-300">{advantage.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research & Publications */}
      {/* <section
        id="research"
        className="py-20 bg-gradient-to-b from-gray-900 to-gray-950"
      >
        <div className="container px-4 mx-auto">
          <motion.div
            className="max-w-3xl mx-auto mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Research Powered by Kaidoku
            </h2>
            <p className="text-xl text-gray-300">
              Researchers worldwide trust our platform for groundbreaking
              discoveries and publications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {publications.map((pub, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-white">
                      {pub.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {pub.authors} ({pub.year}), {pub.journal}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-300">DOI: {pub.doi}</p>
                    <div className="flex flex-wrap gap-2">
                      {pub.toolsUsed.map((tool, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm rounded-full bg-cyan-900/50 text-cyan-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              className="border-cyan-700 text-cyan-600 hover:text-cyan-500"
              href="/publications"
            >
              View All Publications{" "}
              <ArrowRight className="inline-block w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-950">
        <div className="container px-4 mx-auto">
          <motion.div
            className="max-w-3xl mx-auto mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Trusted by Scientists Worldwide
            </h2>
            <p className="text-xl text-gray-300">
              Hear from students and researchers who've transformed their work
              with Kaidoku.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full overflow-hidden bg-gray-800 border-gray-700">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="object-cover w-16 h-16 mr-4 rounded-full"
                      />
                      <div>
                        <p className="font-bold text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-cyan-400">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="pricing" className="py-20 bg-gray-900">
        <div className="container px-4 mx-auto">
          <motion.div
            className="max-w-3xl mx-auto mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-300">
              Choose the plan that fits your research needs.
            </p>
          </motion.div>

          <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden border-gray-700 bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white">
                    Free
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Perfect for students and exploration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">$0</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-300">
                      <svg
                        className="w-5 h-5 mr-2 text-cyan-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Access to basic tools
                    </li>
                    <li className="flex items-center text-gray-300">
                      <svg
                        className="w-5 h-5 mr-2 text-cyan-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Process up to 1MB files
                    </li>
                    <li className="flex items-center text-gray-300">
                      <svg
                        className="w-5 h-5 mr-2 text-cyan-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Community support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-gray-700 hover:bg-gray-600"
                    asChild
                  >
                    <a href="/sign-up">Get Started</a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="md:scale-105 md:-translate-y-2"
            >
              <Card className="relative h-full overflow-hidden bg-gray-800 border-cyan-500">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
                <CardHeader>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-900/50 text-cyan-300">
                      POPULAR
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-white">
                    Professional
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    For researchers and professionals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">$29</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-300">
                      <svg
                        className="w-5 h-5 mr-2 text-cyan-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Access to all tools
                    </li>
                    <li className="flex items-center text-gray-300">
                      <svg
                        className="w-5 h-5 mr-2 text-cyan-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Process up to 100MB files
                    </li>
                    <li className="flex items-center text-gray-300">
                      <svg
                        className="w-5 h-5 mr-2 text-cyan-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Priority support
                    </li>
                    <li className="flex items-center text-gray-300">
                      <svg
                        className="w-5 h-5 mr-2 text-cyan-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Advanced visualizations
                    </li>
                    <li className="flex items-center text-gray-300">
                      <svg
                        className="w-5 h-5 mr-2 text-cyan-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      API access
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    asChild
                  >
                    <a href="/sign-up?plan=pro">Get Started</a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden border-gray-700 bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white">
                    Enterprise
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    For organizations and institutions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">
                      Custom
                    </span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-300">
                      <svg
                        className="w-5 h-5 mr-2 text-cyan-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      All Professional features
                    </li>
                    <li className="flex items-center text-gray-300">
                      <svg
                        className="w-5 h-5 mr-2 text-cyan-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Unlimited file sizes
                    </li>
                    <li className="flex items-center text-gray-300">
                      <svg
                        className="w-5 h-5 mr-2 text-cyan-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Dedicated support team
                    </li>
                    <li className="flex items-center text-gray-300">
                      <svg
                        className="w-5 h-5 mr-2 text-cyan-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Custom tool development
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-gray-700 hover:bg-gray-600"
                    asChild
                  >
                    <a href="/contact-sales">Contact Sales</a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl p-8 mx-auto text-center rounded-2xl bg-gradient-to-r from-cyan-900/30 to-blue-900/30 backdrop-blur-sm">
            <motion.h2
              className="mb-6 text-3xl font-bold text-white md:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Bioinformatics Workflow?
            </motion.h2>
            <motion.p
              className="max-w-2xl mx-auto mb-8 text-lg text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Join thousands of scientists who've accelerated their research
              with Kaidoku's powerful tools.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button
                className="px-8 py-6 text-lg font-medium text-white transition-all shadow-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl hover:shadow-xl hover:shadow-cyan-500/20"
                asChild
              >
                <Link to="/sign-up">
                  Start Your Free Trial Today{" "}
                  <ArrowRight className="inline-block ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="px-4 py-12 bg-gray-950 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 pb-10 border-b border-gray-800 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <img
                  src="/kaidoku-logo.svg"
                  alt="Kaidoku Logo"
                  className="w-10 h-10"
                  style={{ filter: "drop-shadow(0 0 5px #00f6ff)" }}
                />
                <span className="text-xl font-bold text-white">Kaidoku</span>
              </div>
              <p className="mb-6 text-gray-400">
                Empowering genomics research with cutting-edge bioinformatics
                tools since 2021.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com/kaidoku"
                  className="text-gray-400 hover:text-cyan-400"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a
                  href="https://github.com/kaidoku-bio"
                  className="text-gray-400 hover:text-cyan-400"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/kaidoku"
                  className="text-gray-400 hover:text-cyan-400"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/tools"
                    className="text-gray-400 hover:text-cyan-400"
                  >
                    Tools
                  </a>
                </li>
                <li>
                  <a
                    href="/pricing"
                    className="text-gray-400 hover:text-cyan-400"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="/case-studies"
                    className="text-gray-400 hover:text-cyan-400"
                  >
                    Case Studies
                  </a>
                </li>
                <li>
                  <a
                    href="/documentation"
                    className="text-gray-400 hover:text-cyan-400"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="/api" className="text-gray-400 hover:text-cyan-400">
                    API Reference
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/blog" className="text-gray-400 hover:text-cyan-400">
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/tutorials"
                    className="text-gray-400 hover:text-cyan-400"
                  >
                    Tutorials
                  </a>
                </li>
                <li>
                  <a
                    href="/webinars"
                    className="text-gray-400 hover:text-cyan-400"
                  >
                    Webinars
                  </a>
                </li>
                <li>
                  <a
                    href="/publications"
                    className="text-gray-400 hover:text-cyan-400"
                  >
                    Publications
                  </a>
                </li>
                <li>
                  <a
                    href="/community"
                    className="text-gray-400 hover:text-cyan-400"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/about-us"
                    className="text-gray-400 hover:text-cyan-400"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/careers"
                    className="text-gray-400 hover:text-cyan-400"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-400 hover:text-cyan-400"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-gray-400 hover:text-cyan-400"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-gray-400 hover:text-cyan-400"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col justify-between pt-8 md:flex-row">
            <p className="text-gray-400">
              © 2025 Kaidoku BioInformatics. All rights reserved.
            </p>
            <p className="text-gray-400">
              Made with ❤️ for researchers worldwide
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
