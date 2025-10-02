import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const CTA = () => {
  const benefits = [
    "Free 30-minute strategy consultation",
    "Custom content audit report",
    "Tailored growth recommendations",
    "No long-term commitments required",
  ];

  const handleCTAClick = (type) => {
    console.log(`${type} CTA clicked`);
    // In real app, handle the action (form, booking, etc.)
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-48 h-48 bg-purple-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-pink-400 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-1/4 w-4 h-4 bg-yellow-400 rounded-full floating-icon opacity-60"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute bottom-32 right-1/4 w-3 h-3 bg-white rounded-full floating-icon opacity-40"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/5 w-2 h-2 bg-purple-300 rounded-full floating-icon opacity-50"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          {/* Main CTA Content */}
          <div className="mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold font-playfair text-white mb-6 leading-tight">
              Ready to <span className="gradient-text">Transform</span>
              <br />
              Your Content Strategy?
            </h2>
            <p className="text-xl lg:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto font-inter leading-relaxed">
              Join 500+ successful businesses that have accelerated their growth
              with our proven content strategies. Let's discuss how we can help
              you achieve your goals.
            </p>
          </div>

          {/* Benefits List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center justify-center lg:justify-start text-left"
              >
                <FaCheckCircle
                  className="text-yellow-400 mr-3 flex-shrink-0"
                  size={20}
                />
                <span className="text-purple-100 font-inter">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button
              onClick={() => handleCTAClick("schedule")}
              className="hero-btn text-white px-10 py-5 rounded-full font-semibold text-xl font-inter flex items-center justify-center gap-3 shadow-2xl hover:transform hover:scale-105 transition-all duration-300 group"
            >
              <FaCalendarAlt size={20} />
              Schedule Free Consultation
              <FaArrowRight
                className="group-hover:translate-x-1 transition-transform duration-200"
                size={16}
              />
            </button>
            <button
              onClick={() => handleCTAClick("contact")}
              className="hero-btn-outline bg-transparent border-2 border-white text-white px-10 py-5 rounded-full font-semibold text-xl font-inter flex items-center justify-center gap-3 hover:bg-white hover:text-purple-900 transition-all duration-300 hover:transform hover:scale-105"
            >
              <FaEnvelope size={18} />
              Get In Touch
            </button>
          </div>

          {/* Contact Information */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20">
            <h3 className="text-2xl lg:text-3xl font-bold font-playfair text-white mb-8">
              Multiple Ways to Connect
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Email */}
              <div className="text-center group">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaEnvelope className="text-purple-900" size={24} />
                </div>
                <h4 className="text-lg font-semibold text-white font-inter mb-2">
                  Email Us
                </h4>
                <p className="text-purple-100 font-inter">
                  hello@trigisconsult.com
                </p>
                <p className="text-purple-200 text-sm font-inter mt-2">
                  Response within 24 hours
                </p>
              </div>

              {/* Phone */}
              <div className="text-center group">
                <div className="w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaPhone className="text-white" size={24} />
                </div>
                <h4 className="text-lg font-semibold text-white font-inter mb-2">
                  Call Us
                </h4>
                <p className="text-purple-100 font-inter">
                  +233 (0) 123-456-789
                </p>
                <p className="text-purple-200 text-sm font-inter mt-2">
                  Mon-Fri, 9AM-6PM GMT
                </p>
              </div>

              {/* Calendar */}
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaCalendarAlt className="text-white" size={24} />
                </div>
                <h4 className="text-lg font-semibold text-white font-inter mb-2">
                  Book Online
                </h4>
                <p className="text-purple-100 font-inter">Schedule instantly</p>
                <p className="text-purple-200 text-sm font-inter mt-2">
                  Choose your preferred time
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <p className="text-purple-200 font-inter mb-6">
              Trusted by companies worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-white font-bold font-inter">
                TechStart Solutions
              </div>
              <div className="text-white font-bold font-inter">
                Growth Dynamics
              </div>
              <div className="text-white font-bold font-inter">
                Brand Innovators
              </div>
              <div className="text-white font-bold font-inter">
                Scale Up Ventures
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
