import type React from "react";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dna,
  Microscope,
  BarChart3,
  Shield,
  Users,
  Zap,
  ArrowRight,
  CheckCircle,
  Eye,
  Target,
  Heart,
} from "lucide-react";

// Interface for Team Member data
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

// Interface for Value data
interface Value {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Interface for Company data
interface Company {
  name: string;
  logo: string;
}

// Feature data interface
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Team Member Card Component
const TeamMemberCard: FC<TeamMember> = ({ name, role, bio, imageUrl }) => {
  return (
    <Card className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-all duration-300">
      <CardContent className="p-6 text-center">
        <img
          src={imageUrl || "/placeholder.svg?height=120&width=120"}
          alt={name}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-emerald-200"
        />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 font-medium mb-3">{role}</p>
        <p className="text-gray-600 text-sm">{bio}</p>
      </CardContent>
    </Card>
  );
};

// Value Card Component
const ValueCard: FC<Value> = ({ title, description, icon }) => {
  return (
    <Card className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-all duration-300">
      <CardContent className="p-6">
        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

// Feature Card Component
const FeatureCard: FC<Feature> = ({ icon, title, description }) => {
  return (
    <Card className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-all duration-300">
      <CardContent className="p-6">
        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

// Company Logo Component
const CompanyLogo: FC<Company> = ({ name, logo }) => {
  return (
    <div className="bg-gray-50 border-gray-200 rounded-lg p-4 flex items-center justify-center hover:bg-gray-100 transition-all duration-300">
      <img
        src={logo || "/placeholder.svg?height=60&width=120"}
        alt={name}
        className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity"
      />
    </div>
  );
};

// Main About Component
const AboutUs: FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Julius Mwakosya",
      role: "Founder & CEO",
      bio: "With a great passion in bioinformatics, Julius leads Kaidoku with a vision to revolutionize genomic research and personalized medicine.",
      imageUrl: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "George Kitundu, Ph.D.",
      role: "Chief Scientist",
      bio: "A renowned expert in computational biology, George drives our innovative algorithms and data analysis pipelines.",
      imageUrl: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "Elia Mkumbo",
      role: "Head of Engineering",
      bio: "Elia oversees our platform's development, ensuring scalability, security, and cutting-edge technology for our users.",
      imageUrl: "/placeholder.svg?height=120&width=120",
    },
  ];

  const values: Value[] = [
    {
      title: "Innovation",
      description:
        "We push the boundaries of bioinformatics with advanced algorithms and state-of-the-art technology to unlock genomic insights.",
      icon: <Zap className="w-6 h-6 text-emerald-700" />,
    },
    {
      title: "Integrity",
      description:
        "We uphold the highest standards of data privacy, security, and ethical practices in all our operations.",
      icon: <Shield className="w-6 h-6 text-emerald-700" />,
    },
    {
      title: "Collaboration",
      description:
        "We partner with researchers, clinicians, and institutions to accelerate discoveries and improve human health.",
      icon: <Users className="w-6 h-6 text-emerald-700" />,
    },
  ];

  const features: Feature[] = [
    {
      icon: <Dna className="w-6 h-6 text-emerald-700" />,
      title: "Genomic Analysis",
      description:
        "Advanced algorithms for comprehensive genomic data analysis, from variant calling to population genetics studies.",
    },
    {
      icon: <Microscope className="w-6 h-6 text-emerald-700" />,
      title: "Research Tools",
      description:
        "Cutting-edge bioinformatics tools designed for researchers, clinicians, and pharmaceutical companies.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-emerald-700" />,
      title: "Data Visualization",
      description:
        "Interactive dashboards and visualizations that make complex biological data accessible and actionable.",
    },
  ];

  const collaborationCompanies: Company[] = [
    {
      name: "Harvard Medical School",
      logo: "/placeholder.svg?height=40&width=120",
    },
    {
      name: "Stanford University",
      logo: "/placeholder.svg?height=40&width=120",
    },
    { name: "MIT", logo: "/placeholder.svg?height=40&width=120" },
    { name: "Johns Hopkins", logo: "/placeholder.svg?height=40&width=120" },
    { name: "Mayo Clinic", logo: "/placeholder.svg?height=40&width=120" },
    { name: "Broad Institute", logo: "/placeholder.svg?height=40&width=120" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Connect with <span className="text-gray-600">Kaidoku</span>
                <span className="text-gray-600">|</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Accelerate your bioinformatics research with tailored genomic
                analysis solutions in Tanzania and beyond.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gray-800 text-white hover:bg-gray-900 font-semibold px-8 py-3 text-lg">
                  Start Analysis
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-3 text-lg bg-transparent"
                >
                  Access Documentation
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-50 border-gray-200 rounded-2xl p-8">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Kaidoku Platform Interface"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              AI-Connected <span className="text-gray-600">Bioinformatics</span>{" "}
              Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kaidoku provides fast and scalable genomic analysis,
              visualization, and interpretation solutions, helping researchers
              and institutions unlock biological insights.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                  <Eye className="w-6 h-6 text-emerald-700" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our vision is to accelerate scientific breakthroughs by
                providing a seamless, innovative bioinformatics ecosystem that
                bridges data and discovery.
              </p>
            </div>
            <div className="bg-gray-50 border-gray-200 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-700 mr-3" />
                  <span className="text-gray-600">
                    Democratize genomic research globally
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-700 mr-3" />
                  <span className="text-gray-600">
                    Bridge the gap between data and discovery
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-700 mr-3" />
                  <span className="text-gray-600">
                    Enable breakthrough scientific innovations
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-50 border-gray-200 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-700 mr-3" />
                  <span className="text-gray-600">
                    User-friendly bioinformatics solutions
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-700 mr-3" />
                  <span className="text-gray-600">
                    High-performance data analysis
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-700 mr-3" />
                  <span className="text-gray-600">
                    Drive innovation in science and healthcare
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-emerald-700" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Our Mission
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                We are committed to delivering user-friendly, high-performance
                bioinformatics solutions that enable the analysis,
                visualization, and interpretation of complex biological data to
                drive innovation in science and healthcare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                <Heart className="w-6 h-6 text-emerald-700" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <ValueCard
                key={index}
                title={value.title}
                description={value.description}
                icon={value.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Companies Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Leading{" "}
              <span className="text-gray-600">Research Institutions</span>
            </h2>
            <p className="text-lg text-gray-600">
              Collaborating with world-class institutions to advance genomic
              research
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {collaborationCompanies.map((company, index) => (
              <CompanyLogo
                key={index}
                name={company.name}
                logo={company.logo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-gray-600">Expert Team</span>
            </h2>
            <p className="text-lg text-gray-600">
              Leading bioinformatics innovation with passion and expertise
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={index}
                name={member.name}
                role={member.role}
                bio={member.bio}
                imageUrl={member.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 border-gray-200 rounded-2xl p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Want to learn more about Kaidoku? Reach out to us to explore how
                we can support your bioinformatics needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-6 h-6 text-emerald-600 mr-4 mt-1">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Email Us
                    </h3>
                    <p className="text-gray-600">
                      General Inquiries: info@kaidoku.com
                    </p>
                    <p className="text-gray-600">
                      Support: support@kaidoku.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 text-emerald-600 mr-4 mt-1">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Call Us
                    </h3>
                    <p className="text-gray-600">Phone: +255 687 408 191</p>
                    <p className="text-gray-600">Mon-Fri, 9 AM - 5 PM EAT</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 text-emerald-600 mr-4 mt-1">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Visit Us
                    </h3>
                    <p className="text-gray-600">Kaidoku Headquarters</p>
                    <p className="text-gray-600">Dar es Salaam, Tanzania</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Button className="bg-gray-800 text-white hover:bg-gray-900 font-semibold px-8 py-3 text-lg">
                  Send a Message
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">© 2025 Kaidoku. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
