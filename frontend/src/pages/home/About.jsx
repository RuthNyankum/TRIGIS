import React, { useState } from "react";
import {
  FaLinkedinIn,
  FaEnvelope,
  FaRocket,
  FaEye,
  FaBullseye,
  FaQuoteLeft,
  FaLightbulb,
  FaAward,
  FaFacebook,
} from "react-icons/fa";
import "../../styles/about.css";
import ceo from "../../assets/images/ceo1.jpg";
import { companyValues } from "../../constants/home";

const About = () => {
  const [activeTab, setActiveTab] = useState("company");

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header for the section */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl lg:text-5xl font-bold font-playfair mb-6">
            About <span className="gradient-text">TRIGIS Consult</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
            Transforming academic and professional journeys through high-quality
            writing services that inspire success, ensure originality, and
            uphold excellence.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <button
              onClick={() => setActiveTab("company")}
              className={`px-8 py-3 rounded-full font-semibold text-lg font-inter transition-all duration-300 cursor-pointer ${
                activeTab === "company"
                  ? "tab-active"
                  : "text-gray-600 hover:text-[var(--brand-purple)]"
              }`}
            >
              Our Company
            </button>
            <button
              onClick={() => setActiveTab("ceo")}
              className={`px-8 py-3 rounded-full font-semibold text-lg font-inter transition-all duration-300 cursor-pointer ${
                activeTab === "ceo"
                  ? "tab-active"
                  : "text-gray-600 hover:text-[var(--brand-purple)]"
              }`}
            >
              Meet Our CEO
            </button>
          </div>
        </div>

        {/* Company Tab */}
        {activeTab === "company" && (
          <div className="animate-fadeInUp">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                {/* <h3 className="text-3xl font-bold font-playfair mb-6 text-gray-900">
                    Our Story
                  </h3> */}
                <div className="space-y-6 text-gray-700 font-inter leading-relaxed">
                  <p className="text-lg">
                    Founded in 2019 with a simple yet powerful mission: to help
                    businesses communicate more effectively through compelling
                    content and strategic storytelling.
                  </p>
                  <p>
                    Trigis Consult is a freelance writing agency dedicated to
                    providing top-quality academic and professional writing
                    services for Diploma, Undergraduate, Master’s, and
                    Postgraduate programs. We specialize in delivering
                    well-researched, original, and structured academic projects
                    with precision and consistency.
                  </p>
                  <p>
                    Beyond academic work, we also support students, researchers,
                    and professionals with CVs, proposals, essays,
                    dissertations, and business writing — ensuring clarity,
                    professionalism, and results. Our mission is to make your
                    academic and career journey easier by offering reliable
                    guidance every step of the way.
                  </p>
                </div>
              </div>

              {/* Company Visual */}
              <div className="relative">
                <div className="gradient-bg rounded-2xl p-8 text-white">
                  <div className="text-center">
                    <FaRocket size={60} className="mx-auto mb-6 text-white" />
                    <h4 className="text-2xl font-bold font-playfair mb-4">
                      Our Mission
                    </h4>
                    <p className="text-lg font-inter leading-relaxed">
                      Our mission is to provide high-quality, original, and
                      well-structured academic and professional writing services
                      that support academic success, career growth, and lifelong
                      learning.
                    </p>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--brand-purple)] font-inter">
                      200+
                    </div>
                    <div className="text-sm text-gray-600 font-inter">
                      Projects
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--brand-purple)] font-inter">
                      98%
                    </div>
                    <div className="text-sm text-gray-600 font-inter">
                      Satisfaction
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision & Values */}
            <div className="mb-20">
              <div className="grid lg:grid-cols-2 gap-12 mb-16">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <FaEye
                      className="text-[var(--brand-yellow)] mr-4"
                      size={32}
                    />
                    <h4 className="text-2xl font-bold font-playfair text-gray-900">
                      Our Vision
                    </h4>
                  </div>
                  <p className="text-gray-700 font-inter text-lg leading-relaxed">
                    To be the most trusted academic and professional writing
                    partner in Africa, empowering students, researchers, and
                    professionals with knowledge, clarity, and excellence.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <FaBullseye
                      className="text-[var(--brand-purple)] mr-4"
                      size={32}
                    />
                    <h4 className="text-2xl font-bold font-playfair text-gray-900">
                      Our Goals
                    </h4>
                  </div>
                  <p className="text-gray-700 font-inter text-lg leading-relaxed">
                    To expand our impact across Africa, provide high-quality
                    academic and professional writing solutions, empower
                    students and professionals to achieve success, and
                    continuously raise industry standards through innovation and
                    excellence.
                  </p>
                </div>
              </div>

              {/* Company Values */}
              <h3 className="text-3xl font-bold font-playfair text-center mb-12 text-gray-900">
                Our Core Values
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {companyValues.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div
                      key={index}
                      className="value-card bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 text-center"
                    >
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 ${value.color}`}
                      >
                        <Icon size={24} />
                      </div>
                      <h5 className="text-xl font-bold font-playfair mb-3 text-gray-900">
                        {value.title}
                      </h5>
                      <p className="text-gray-600 font-inter text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* CEO Tab */}
        {activeTab === "ceo" && (
          <div className="animate-fadeInUp">
            {/* CEO Profile */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              {/* CEO Image */}
              <div className="relative">
                <div className="w-80 h-80 mx-auto relative">
                  {/* Profile Image Placeholder */}
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
                    <img
                      src={ceo}
                      alt="CEO Portrait"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="hidden w-full h-full bg-gradient-to-br from-[var(--brand-purple)] to-[var(--brand-yellow)] items-center justify-center">
                      <span className="text-6xl font-bold text-white font-playfair">
                        Agnes
                      </span>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-[var(--brand-yellow)] rounded-full p-3 shadow-lg">
                    <FaLightbulb
                      className="text-[var(--brand-purple)]"
                      size={24}
                    />
                  </div>

                  <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg">
                    <FaAward className="text-[var(--brand-purple)]" size={24} />
                  </div>
                </div>
              </div>

              {/* CEO Info */}
              <div>
                <h3 className="text-4xl font-bold font-playfair mb-2 text-gray-900">
                  Agnes Gyesi
                </h3>
                <p className="text-xl text-[var(--brand-purple)] font-semibold font-inter mb-6">
                  Founder & Chief Executive Officer
                </p>

                <div className="space-y-6 text-gray-700 font-inter leading-relaxed">
                  <p className="text-lg">
                    Agnes Gyesi is a multifaceted individual who has made a name
                    for herself as a writer, researcher, and entrepreneur. With
                    a degree in English , Diploma in Research Skills and
                    knowledge in tricology, she has authored two notable books:
                    "Hair Elegance: The Art of Hair Care" and "Biblical
                    Marriage: Love, Respect, and Submission".
                  </p>
                  <p>
                    She is the founder of Trigis Consult who has taken the
                    initiative to establish her own consulting firm, Trigis
                    Consult, which offer services in research, data analysis,
                    and potentially other areas aligned with her expertise.
                  </p>
                  <p>
                    She possesses skills in research, statistical analysis and
                    data visualization tools such as SPSS, Nvivo, and Power BI,
                    making her a valuable asset in research and data-driven
                    projects.
                  </p>
                </div>

                {/* CEO Social Links */}
                <div className="flex space-x-4 mt-8">
                  <a
                    href="https://www.linkedin.com/in/agnes-gyesi-972812137/?originalSubdomain=gh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-colors duration-200 font-inter cursor-pointer"
                  >
                    <FaLinkedinIn size={20} />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href="https://www.facebook.com/share/1F6dsmJdHA/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-full transition-colors duration-200 font-inter cursor-pointer"
                  >
                    <FaFacebook size={20} />
                    <span>Facebook</span>
                  </a>

                  <a
                    href="gyesiagnes22@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-[var(--brand-purple)] hover:opacity-90 text-white px-6 py-3 rounded-full transition-opacity duration-200 font-inter cursor-pointer"
                  >
                    <FaEnvelope size={20} />
                    <span>Contact</span>
                  </a>
                </div>
              </div>
            </div>

            {/* CEO Quote */}
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg text-center">
              <FaQuoteLeft
                className="text-[var(--brand-yellow)] mx-auto mb-6"
                size={40}
              />
              <blockquote className="text-2xl lg:text-3xl font-playfair text-gray-800 mb-8 italic leading-relaxed">
                "Great writing goes beyond meeting requirements—it empowers
                students and professionals to achieve their goals, unlock
                opportunities, and leave a lasting impact."
              </blockquote>
              <div className="text-xl font-semibold text-[var(--brand-purple)] font-inter">
                - Agnes Gyesi, CEO of TRIGIS Consult
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
