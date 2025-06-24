import { FC } from "react";

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
}

// Team Member Card Component
const TeamMemberCard: FC<TeamMember> = ({ name, role, bio, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      <img
        src={imageUrl || "https://via.placeholder.com/150"}
        alt={name}
        className="w-32 h-32 rounded-full mb-4 object-cover"
      />
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      <p className="text-blue-600 font-medium mb-2">{role}</p>
      <p className="text-gray-600 text-sm">{bio}</p>
    </div>
  );
};

// Value Card Component
const ValueCard: FC<Value> = ({ title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Main About Us Component
const AboutUs: FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Julius Mwakosya",
      role: "Founder & CEO",
      bio: "With a great passion in bioinformatics, Julius leads Kaidoku with a vision to revolutionize genomic research and personalized medicine.",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      name: "George Kitundu, Ph.D.",
      role: "Chief Scientist",
      bio: "A renowned expert in computational biology, George drives our innovative algorithms and data analysis pipelines.",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      name: "Elia Mkumbo",
      role: "Head of Engineering",
      bio: "Elia oversees our platform's development, ensuring scalability, security, and cutting-edge technology for our users.",
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  const values: Value[] = [
    {
      title: "Innovation",
      description:
        "We push the boundaries of bioinformatics with advanced algorithms and state-of-the-art technology to unlock genomic insights.",
    },
    {
      title: "Integrity",
      description:
        "We uphold the highest standards of data privacy, security, and ethical practices in all our operations.",
    },
    {
      title: "Collaboration",
      description:
        "We partner with researchers, clinicians, and institutions to accelerate discoveries and improve human health.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">About Kaidoku</h1>
          <p className="text-lg text-center mt-4 max-w-3xl mx-auto">
            Pioneering the future of bioinformatics through innovation,
            collaboration, and cutting-edge technology.
          </p>
        </div>
      </header>

      {/* Vision Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Our Vision
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
            Our vision is to accelerate scientific breakthroughs by providing a
            seamless, innovative bioinformatics ecosystem that bridges data and
            discovery.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
            We are committed to delivering user-friendly, high-performance
            bioinformatics solutions that enable the analysis, visualization,
            and interpretation of complex biological data to drive innovation in
            science and healthcare.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <ValueCard
                key={index}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Meet Our Team
          </h2>
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
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div>
              <p className="text-lg text-center md:text-left max-w-3xl mx-auto mb-8">
                Want to learn more about Kaidoku? Reach out to us to explore how
                we can support your bioinformatics needs.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 mr-4 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold">Email Us</h3>
                    <p className="text-gray-200">
                      General Inquiries: info@kaidoku.com
                    </p>
                    <p className="text-gray-200">
                      Support: support@kaidoku.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 mr-4 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold">Call Us</h3>
                    <p className="text-gray-200">Phone: +255 687 408 191</p>
                    <p className="text-gray-200">Mon-Fri, 9 AM - 5 PM EAT</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 mr-4 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
                  <div>
                    <h3 className="text-lg font-semibold">Visit Us</h3>
                    <p className="text-gray-200">Kaidoku Headquarters</p>
                    <p className="text-gray-200">Dar es salam, Tanzania</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-white text-blue-700 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition"
                onClick={() => alert("Contact form would be implemented here!")}
              >
                Send a Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2025 Kaidoku. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
