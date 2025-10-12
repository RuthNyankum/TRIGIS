import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  FaEnvelope,
  FaChartLine,
  FaPen,
  FaBookOpen,
  FaLaptop,
} from "react-icons/fa";
import "../../styles/home.css";
import { WORDS, SOCIAL_LINKS, FLOATING_ICONS } from "../../constants/home";

const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCTAClick = (type) => {
    console.log(`${type} clicked - attempting navigation`);
    try {
      if (type === "consultation") {
        console.log("Navigating to /contact-us");
        navigate("/contact-us");
      } else if (type === "expertise") {
        console.log("Navigating to /services");
        navigate("/services");
      }
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern - Lowest z-index */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Floating Background Icons - Low z-index, no pointer events */}
      {FLOATING_ICONS.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className={`absolute ${item.position} floating-icon opacity-20 text-white pointer-events-none z-1`}
            style={{ animationDelay: item.delay, fontSize: "2rem" }}
          >
            <Icon />
          </div>
        );
      })}

      {/* Main Content - Higher z-index */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Side - Content with higher z-index */}
          <div className="hero-text space-y-6 lg:space-y-8 relative z-20">
            {/* Greeting */}
            <div className="space-y-2">
              <p className="text-xl lg:text-2xl text-purple-200 font-inter">
                Trusted by <span className="gradient-text font-bold">500+</span>{" "}
                Growing Businesses
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold font-playfair text-white leading-tight">
                Expert{" "}
                <span className="typing-text gradient-text">
                  {WORDS[currentWord]}
                </span>
              </h1>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-lg lg:text-xl text-purple-100 font-inter leading-relaxed">
                TRIGIS Consult delivers premium content solutions that drive
                measurable results. Our expert team transforms your ideas into
                compelling narratives that engage audiences and accelerate
                business growth.
              </p>
              <p className="text-base lg:text-lg text-purple-200 font-inter">
                Ready to elevate your brand's story? 🚀
              </p>
            </div>

            {/* CTA - Ensure high z-index and clickable */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 relative z-30">
              <button
                onClick={() => handleCTAClick("consultation")}
                className="hero-btn text-white px-8 py-4 rounded-full font-semibold text-lg font-inter flex items-center justify-center gap-3 shadow-lg cursor-pointer relative z-40 pointer-events-auto"
                style={{ position: "relative" }}
              >
                <FaEnvelope size={20} />
                Schedule Consultation
              </button>
              <button
                onClick={() => handleCTAClick("expertise")}
                className="hero-btn-outline bg-transparent px-8 py-4 rounded-full font-semibold text-lg font-inter flex items-center justify-center gap-3 !text-white cursor-pointer relative z-40 pointer-events-auto"
                style={{ position: "relative" }}
              >
                <FaChartLine size={18} />
                Our Expertise
              </button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6 pt-6 relative z-20">
              <div className="text-sm text-purple-300 font-inter mr-4">
                Connect with us:
              </div>
              {SOCIAL_LINKS.map((social, index) => {
                const Icon = social.icon;
                return (
                  <button
                    key={index}
                    onClick={() => console.log(`${social.label} clicked`)}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[var(--brand-purple)] transition-all duration-300 hover:scale-110 cursor-pointer pointer-events-auto"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side - Team Illustration */}
          <div className="relative flex justify-center lg:justify-end z-10">
            {/* Team Collaboration Illustration */}
            <div className="relative pointer-events-none">
              {/* Main Container */}
              <div className="relative z-10">
                <div className="w-80 h-80 lg:w-96 lg:h-96 relative">
                  {/* Team Members */}
                  {/* Team Member 1 - Front Center */}
                  <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-30">
                    <div className="w-20 h-20 bg-yellow-400 rounded-full relative">
                      {/* Hair */}
                      <div className="absolute -top-2 left-2 w-16 h-16 bg-yellow-800 rounded-full"></div>
                      {/* Glasses */}
                      <div className="absolute top-6 left-2 w-16 h-8 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-gray-800 rounded-full bg-white/20"></div>
                        <div className="w-2 h-1 bg-gray-800 mx-1"></div>
                        <div className="w-5 h-5 border-2 border-gray-800 rounded-full bg-white/20"></div>
                      </div>
                      {/* Smile */}
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-gray-800 rounded-full"></div>
                    </div>
                    {/* Body */}
                    <div className="w-16 h-24 bg-blue-500 rounded-t-full mx-auto -mt-2"></div>
                  </div>

                  {/* Team Member 2 - Left */}
                  <div className="absolute bottom-20 left-8 z-20">
                    <div className="w-16 h-16 bg-pink-300 rounded-full relative">
                      {/* Hair */}
                      <div className="absolute -top-1 left-1 w-14 h-14 bg-black rounded-full"></div>
                      {/* Eyes */}
                      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                      </div>
                      {/* Smile */}
                      <div className="absolute top-9 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-800 rounded-full"></div>
                    </div>
                    {/* Body */}
                    <div className="w-12 h-18 bg-green-500 rounded-t-full mx-auto -mt-2"></div>
                  </div>

                  {/* Team Member 3 - Right */}
                  <div className="absolute bottom-20 right-8 z-20">
                    <div className="w-16 h-16 bg-orange-300 rounded-full relative">
                      {/* Hair */}
                      <div
                        className="absolute -top-1 left-1 w-14 h-14 bg-brown-600 rounded-full"
                        style={{ backgroundColor: "#8B4513" }}
                      ></div>
                      {/* Eyes */}
                      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                      </div>
                      {/* Smile */}
                      <div className="absolute top-9 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-800 rounded-full"></div>
                    </div>
                    {/* Body */}
                    <div className="w-12 h-18 bg-red-500 rounded-t-full mx-auto -mt-2"></div>
                  </div>

                  {/* Collaboration Elements */}
                  {/* Shared Laptop/Document */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-32 h-20 bg-gray-300 rounded-lg relative shadow-lg">
                      <div className="w-full h-4 bg-gray-800 rounded-t-lg"></div>
                      <div className="w-full h-16 bg-gray-100 rounded-b-lg flex items-center justify-center">
                        <div className="w-24 h-12 bg-white rounded border border-gray-200 flex items-center justify-center">
                          <div className="text-xs text-gray-600 text-center">
                            <div className="w-16 h-1 bg-gray-400 rounded mb-1"></div>
                            <div className="w-12 h-1 bg-gray-400 rounded mb-1"></div>
                            <div className="w-14 h-1 bg-gray-400 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connection Lines */}
                  <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-5">
                    <svg width="200" height="100" className="opacity-30">
                      <line
                        x1="50"
                        y1="50"
                        x2="100"
                        y2="80"
                        stroke="#CCD431"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                      <line
                        x1="150"
                        y1="50"
                        x2="100"
                        y2="80"
                        stroke="#CCD431"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                      <line
                        x1="100"
                        y1="30"
                        x2="100"
                        y2="80"
                        stroke="#7E1394"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Floating Service Icons - No pointer events */}
              <div
                className="absolute top-16 -left-8 floating-icon opacity-80 pointer-events-none"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="w-14 h-14 bg-[var(--brand-purple)] rounded-xl flex items-center justify-center shadow-xl">
                  <FaPen className="text-white" size={18} />
                </div>
              </div>

              <div
                className="absolute top-8 -right-8 floating-icon opacity-80 pointer-events-none"
                style={{ animationDelay: "0.7s" }}
              >
                <div className="w-14 h-14 bg-[var(--brand-yellow)] rounded-xl flex items-center justify-center shadow-xl">
                  <FaBookOpen
                    className="text-[var(--brand-purple)]"
                    size={18}
                  />
                </div>
              </div>

              <div
                className="absolute bottom-32 -right-12 floating-icon opacity-80 pointer-events-none"
                style={{ animationDelay: "1.2s" }}
              >
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-xl">
                  <FaChartLine className="text-white" size={18} />
                </div>
              </div>

              <div
                className="absolute bottom-16 -left-12 floating-icon opacity-80 pointer-events-none"
                style={{ animationDelay: "1.7s" }}
              >
                <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center shadow-xl">
                  <FaLaptop className="text-white" size={18} />
                </div>
              </div>

              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-yellow-400/20 blur-3xl -z-10 scale-150 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300 z-50 pointer-events-auto"
        aria-label="Scroll to next section"
      >
        <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center hover:border-white transition-colors duration-300">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse hover:bg-white transition-colors duration-300"></div>
        </div>
      </button>
    </section>
  );
};

export default Hero;
