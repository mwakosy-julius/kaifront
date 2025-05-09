import React from 'react';
import { Page } from '@/components/core/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Dna, GitCompareArrows, Archive, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: GitCompareArrows,
      title: 'Sequence Alignment',
      description: 'Blast through DNA alignments with speed and precision.',
      image: 'https://source.unsplash.com/random/400x300/?dna-alignment',
    },
    {
      icon: Dna,
      title: 'Consensus Maker',
      description: 'Forge consensus sequences from massive genes like DMD.',
      image: 'https://source.unsplash.com/random/400x300/?dna-sequence',
    },
    {
      icon: Archive,
      title: 'Data Compression',
      description: 'Crush FASTA files into compact, efficient formats.',
      image: 'https://source.unsplash.com/random/400x300/?data',
    },
  ];

  const community = [
    {
      name: 'Aisha, Student',
      quote: 'Kaidoku makes bioinformatics feel like an adventure!',
      image: 'https://source.unsplash.com/random/100x100/?student',
    },
    {
      name: 'Carlos, Researcher',
      quote: 'Analyzed 14,000 bp in seconds. Pure power.',
      image: 'https://source.unsplash.com/random/100x100/?scientist',
    },
    {
      name: 'Lena, Bioinformatician',
      quote: 'The tools are as bold as my research.',
      image: 'https://source.unsplash.com/random/100x100/?professional',
    },
  ];

  return (
    <Page container>
      {/* Fixed Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex items-center justify-between py-4">
          <img
            src="/kaidoku-logo.svg"
            alt="Kaidoku Logo"
            className="w-32 md:w-40"
            style={{ filter: 'drop-shadow(0 0 5px #00f6ff)' }}
          />
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="lg"
              href="/sign-in"
              className="text-white hover:bg-cyan-400 hover:text-gray-900 font-bold"
            >
              Sign In
            </Button>
            <Button
              variant="default"
              size="lg"
              href="/sign-up"
              className="bg-cyan-400 text-gray-900 hover:bg-cyan-600 font-bold"
            >
              Get Started <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center text-center">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/dna-video.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 [text-shadow:_0_0_10px_#00f6ff]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Kaidoku: Power Your DNA Discovery
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Unleash cutting-edge bioinformatics tools to analyze, align, and compress DNA sequences.
          </motion.p>
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              className="bg-red-600 text-white hover:bg-red-700 text-lg py-6 px-8 font-bold"
              href="/sign-up"
            >
              Join Now <ArrowRight className="ml-2" />
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 text-lg py-6 px-8 font-bold"
              href="/demo"
            >
              Try Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-800">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-cyan-400 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Tools That Ignite Discovery
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-gray-700 border-none overflow-hidden">
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${feature.image})` }}
                />
                <CardHeader>
                  <feature.icon className="w-10 h-10 text-cyan-400 mb-2" />
                  <CardTitle className="text-2xl font-bold text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-900">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-cyan-400 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Our Community Rocks
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {community.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="bg-gray-700 border-none">
                <CardContent className="pt-6 flex items-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <p className="text-gray-300 italic">"{member.quote}"</p>
                    <p className="mt-2 text-cyan-400 font-bold">{member.name}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-gray-900 to-gray-800 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Ready to Dive In?
        </motion.h2>
        <motion.p
          className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Join Kaidoku and power up your bioinformatics research today.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            className="bg-red-600 text-white hover:bg-red-700 text-lg py-6 px-8 font-bold"
            href="/sign-up"
          >
            Get Started Now <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 bg-gray-800 text-gray-300 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-4">© 2025 Kaidoku by BlastCraft. All rights reserved.</p>
          <div className="flex justify-center gap-6">
            <a href="https://github.com/your-username/blastcraft" className="hover:text-cyan-400">
              GitHub
            </a>
            <a href="https://x.com/blastcraft" className="hover:text-cyan-400">
              X
            </a>
            <a href="https://blastcraft.vercel.app/docs" className="hover:text-cyan-400">
              Documentation
            </a>
            <a href="https://biostars.org" className="hover:text-cyan-400">
              Biostars
            </a>
          </div>
        </motion.div>
      </footer>
    </Page>
  );
};

export default LandingPage;