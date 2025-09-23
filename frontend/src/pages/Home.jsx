import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPen,
  FaBookOpen,
  FaLaptop,
  FaChartLine,
  FaDownload,
  FaEnvelope,
} from "react-icons/fa";

const Home = () => {
  const [currentWord, setCurrentWord] = useState(0);

  // Typing animation words
  const words = [
    "Content Writer",
    "Copywriter",
    "Blog Writer",
    "Course Creator",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
  ];

  const floatingIcons = [
    { icon: FaPen, position: "top-20 left-10", delay: "0s" },
    { icon: FaBookOpen, position: "top-32 right-16", delay: "0.5s" },
    { icon: FaLaptop, position: "bottom-40 left-20", delay: "1s" },
    { icon: FaChartLine, position: "bottom-20 right-10", delay: "1.5s" },
  ];

  const handleCTAClick = (type) => {
    console.log(`${type} clicked`);
    // In real app, handle navigation or contact form
  };

  return (
    <>
      {/* Add custom styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(5deg);
          }
          66% {
            transform: translateY(-10px) rotate(-3deg);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(204, 212, 49, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(204, 212, 49, 0.6);
          }
        }

        .floating-icon {
          animation: float 6s ease-in-out infinite;
        }

        .hero-text {
          animation: fadeInUp 0.8s ease-out;
        }

        .typing-text {
          border-right: 2px solid var(--brand-yellow);
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%,
          50% {
            border-right-color: var(--brand-yellow);
          }
          51%,
          100% {
            border-right-color: transparent;
          }
        }

        .gradient-text {
          background: var(--brand-gradient);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-btn {
          background: var(--brand-gradient);
          transition: all 0.3s ease;
        }

        .hero-btn:hover {
          transform: translateY(-2px);
          animation: pulse-glow 2s infinite;
        }

        .hero-btn-outline {
          border: 2px solid var(--brand-purple);
          color: var(--brand-purple);
          transition: all 0.3s ease;
        }

        .hero-btn-outline:hover {
          background: var(--brand-purple);
          color: white;
          transform: translateY(-2px);
        }
      `}</style>

      <section className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
        {/* Floating Background Icons */}
        {floatingIcons.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`absolute ${item.position} floating-icon opacity-20 text-white`}
              style={{
                animationDelay: item.delay,
                fontSize: "2rem",
              }}
            >
              <Icon />
            </div>
          );
        })}

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
            {/* Left Side - Content */}
            <div className="hero-text space-y-6 lg:space-y-8">
              {/* Greeting */}
              <div className="space-y-2">
                <p className="text-xl lg:text-2xl text-purple-200 font-inter">
                  Hi! I'm <span className="gradient-text font-bold">Sarah</span>
                </p>
                <h1 className="text-4xl lg:text-6xl font-bold font-playfair text-white leading-tight">
                  Freelance{" "}
                  <span className="typing-text gradient-text">
                    {words[currentWord]}
                  </span>
                </h1>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-lg lg:text-xl text-purple-100 font-inter leading-relaxed">
                  To be a professional content writer is so amazing career, I
                  can help everyone build their business through compelling
                  words and engaging content.
                </p>
                <p className="text-base lg:text-lg text-purple-200 font-inter">
                  So let me help you grow! ✨
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => handleCTAClick("hire")}
                  className="hero-btn text-white px-8 py-4 rounded-full font-semibold text-lg font-inter flex items-center justify-center gap-3 shadow-lg"
                >
                  <FaEnvelope size={20} />
                  Hire me
                </button>
                <button
                  onClick={() => handleCTAClick("download")}
                  className="hero-btn-outline bg-transparent px-8 py-4 rounded-full font-semibold text-lg font-inter flex items-center justify-center gap-3"
                >
                  <FaDownload size={18} />
                  Download Portfolio
                </button>
              </div>

              {/* Social Links */}
              <div className="flex space-x-6 pt-6">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleCTAClick(social.label.toLowerCase())}
                      className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-purple-600 transition-all duration-300 hover:scale-110"
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Main Character Illustration */}
              <div className="relative">
                {/* Character Container */}
                <div className="relative z-10">
                  {/* Person sitting with laptop */}
                  <div className="w-80 h-80 lg:w-96 lg:h-96 relative">
                    {/* Body */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-48 bg-yellow-400 rounded-t-full flex items-end justify-center">
                      {/* Laptop */}
                      <div className="w-24 h-16 bg-gray-300 rounded-t-lg mb-8 relative">
                        <div className="w-full h-2 bg-gray-800 rounded-t-lg"></div>
                        <div className="w-full h-14 bg-gray-100 rounded-b-lg flex items-center justify-center">
                          <div className="w-16 h-10 bg-white rounded border border-gray-200 flex items-center justify-center">
                            <FaPen className="text-purple-600" size={12} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Legs */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-12">
                      <div className="w-20 h-8 bg-gray-200 rounded-full absolute left-4 transform rotate-12"></div>
                      <div className="w-20 h-8 bg-gray-200 rounded-full absolute right-4 transform -rotate-12"></div>
                    </div>

                    {/* Head */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-yellow-200 rounded-full">
                      {/* Hair */}
                      <div className="absolute -top-2 left-2 w-16 h-16 bg-yellow-800 rounded-full"></div>
                      {/* Glasses */}
                      <div className="absolute top-6 left-2 w-16 h-8 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-gray-800 rounded-full bg-white/20"></div>
                        <div className="w-2 h-1 bg-gray-800 mx-1"></div>
                        <div className="w-6 h-6 border-2 border-gray-800 rounded-full bg-white/20"></div>
                      </div>
                      {/* Smile */}
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-gray-800 rounded-full"></div>
                    </div>

                    {/* Arms */}
                    <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-48 h-8">
                      <div className="absolute left-8 w-12 h-6 bg-yellow-400 rounded-full transform rotate-45"></div>
                      <div className="absolute right-8 w-12 h-6 bg-yellow-400 rounded-full transform -rotate-45"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Tool Icons */}
                <div
                  className="absolute top-16 -left-8 floating-icon opacity-80"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xs">AI</span>
                  </div>
                </div>

                <div
                  className="absolute top-8 -right-8 floating-icon opacity-80"
                  style={{ animationDelay: "0.7s" }}
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xs">PS</span>
                  </div>
                </div>

                <div
                  className="absolute bottom-32 -right-12 floating-icon opacity-80"
                  style={{ animationDelay: "1.2s" }}
                >
                  <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                    <FaBookOpen className="text-white" size={16} />
                  </div>
                </div>

                <div
                  className="absolute bottom-16 -left-12 floating-icon opacity-80"
                  style={{ animationDelay: "1.7s" }}
                >
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-lg">
                    <FaPen className="text-white" size={16} />
                  </div>
                </div>

                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-purple-400/20 blur-3xl -z-10 scale-150"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
