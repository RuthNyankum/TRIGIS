import React, { useState } from "react";
import {
  FaArrowRight,
  FaCheckCircle,
  FaStar,
  FaQuoteLeft,
  FaRocket,
  FaAward,
  FaUsers,
  FaChartLine,
  FaEnvelope,
  FaDownload,
  FaClock,
} from "react-icons/fa";
import "../../styles/services.css";

import { services, processSteps, testimonials } from "../../constants/services";
import { Link } from "react-router";

const Services = () => {
  const [activeService, setActiveService] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-playfair mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
            Comprehensive content solutions designed to elevate your brand,
            engage your audience, and drive measurable business growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`service-card bg-white rounded-2xl p-8 shadow-lg cursor-pointer ${
                  activeService === index ? "active-service" : ""
                }`}
                onClick={() => setActiveService(index)}
              >
                {/* Service Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 bg-gradient-to-r ${service.bgGradient}`}
                >
                  <Icon size={24} className="text-white" />
                </div>

                {/* Service Content */}
                <h3 className="text-2xl font-bold font-playfair mb-3 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-[var(--brand-purple)] font-semibold font-inter mb-4">
                  {service.subtitle}
                </p>
                <p className="text-gray-600 font-inter mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-gray-600 font-inter"
                    >
                      <FaCheckCircle
                        className="text-green-500 mr-2"
                        size={12}
                      />
                      {feature}
                    </li>
                  ))}
                  {service.features.length > 3 && (
                    <li className="text-sm text-[var(--brand-purple)] font-inter font-semibold">
                      +{service.features.length - 3} more features
                    </li>
                  )}
                </ul>

                {/* CTA Button */}

                <Link to={`/services/${service.id}`}>
                  <button className="w-full bg-gradient-to-r from-[var(--brand-purple)] to-[var(--brand-yellow)] text-white py-3 rounded-xl font-semibold font-inter hover:shadow-lg transition-all duration-300 flex items-center justify-center group cursor-pointer">
                    Learn More
                    <FaArrowRight
                      className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                      size={14}
                    />
                  </button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Service Details Modal/Section */}
        {activeService !== null && (
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Service Details */}
              <div>
                <div className="flex items-center mb-6">
                  {React.createElement(services[activeService].icon, {
                    size: 32,
                    className: "text-[var(--brand-purple)] mr-4",
                  })}
                  <h3 className="text-3xl font-bold font-playfair text-gray-900">
                    {services[activeService].title}
                  </h3>
                </div>

                <p className="text-lg text-gray-700 font-inter mb-8 leading-relaxed">
                  {services[activeService].description}
                </p>

                <div className="space-y-4">
                  <h4 className="text-xl font-semibold font-playfair text-gray-900">
                    What's Included:
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {services[activeService].features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-gray-700 font-inter"
                      >
                        <FaCheckCircle
                          className="text-green-500 mr-3"
                          size={16}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Service Stats/Benefits */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h4 className="text-2xl font-bold font-playfair mb-6 text-gray-900">
                  Service Benefits
                </h4>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <FaRocket
                      className="text-[var(--brand-yellow)] mt-1 mr-4"
                      size={20}
                    />
                    <div>
                      <h5 className="font-semibold font-inter text-gray-900 mb-1">
                        Fast Turnaround
                      </h5>
                      <p className="text-gray-600 font-inter text-sm">
                        Quick delivery without compromising quality
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaAward
                      className="text-[var(--brand-purple)] mt-1 mr-4"
                      size={20}
                    />
                    <div>
                      <h5 className="font-semibold font-inter text-gray-900 mb-1">
                        Quality Guaranteed
                      </h5>
                      <p className="text-gray-600 font-inter text-sm">
                        Premium quality backed by our guarantee
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaUsers className="text-blue-500 mt-1 mr-4" size={20} />
                    <div>
                      <h5 className="font-semibold font-inter text-gray-900 mb-1">
                        Expert Team
                      </h5>
                      <p className="text-gray-600 font-inter text-sm">
                        Experienced professionals in your industry
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaChartLine
                      className="text-green-500 mt-1 mr-4"
                      size={20}
                    />
                    <div>
                      <h5 className="font-semibold font-inter text-gray-900 mb-1">
                        Measurable Results
                      </h5>
                      <p className="text-gray-600 font-inter text-sm">
                        Data-driven approach for optimal outcomes
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button className="w-full bg-gradient-to-r from-[var(--brand-purple)] to-[var(--brand-yellow)] text-white py-4 rounded-xl font-bold font-inter text-lg hover:shadow-lg transition-all duration-300">
                    Get Started Today
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Process Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold font-playfair mb-4 text-gray-900">
              Our <span className="gradient-text">Process</span>
            </h3>
            <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
              A proven methodology that ensures exceptional results for every
              project we undertake.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="process-step text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-[var(--brand-purple)] to-[var(--brand-yellow)] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-[var(--brand-yellow)]">
                      <span className="text-xs font-bold text-[var(--brand-purple)] font-inter">
                        {step.step}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold font-playfair mb-3 text-gray-900">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 font-inter text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="gradient-bg rounded-2xl p-8 lg:p-12 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold font-playfair mb-6 text-white">
            Ready to Transform Your Content Strategy?
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-inter leading-relaxed">
            Let's discuss how our services can help you achieve your business
            goals and drive meaningful growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[var(--brand-purple)] px-8 py-4 rounded-full font-bold font-inter text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center">
              <FaEnvelope className="mr-2" />
              Start Your Project
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold font-inter text-lg hover:bg-white hover:text-[var(--brand-purple)] transition-all duration-300 flex items-center justify-center">
              <FaDownload className="mr-2" />
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
