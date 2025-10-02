import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaStar,
  FaQuoteLeft,
  FaRocket,
  FaAward,
  FaUsers,
  FaChartLine,
  FaEnvelope,
  FaClock,
  FaShieldAlt,
  FaLightbulb,
} from "react-icons/fa";

import { services } from "../constants/services";

const testimonials = [
  {
    name: "Kwame Asante",
    company: "University of Ghana",
    role: "PhD Student",
    content:
      "TRIGIS helped me craft a compelling statement of purpose that got me accepted into my dream program. Their attention to detail was exceptional.",
    rating: 5,
  },
  {
    name: "Akosua Mensah",
    company: "KNUST Graduate",
    role: "International Student",
    content:
      "The visa statement of purpose they wrote for me was perfect. I got my visa approved on the first try. Highly recommended!",
    rating: 5,
  },
  {
    name: "Emmanuel Osei",
    company: "Tech Professional",
    role: "Software Engineer",
    content:
      "My professional CV was transformed completely. I started getting interview calls within a week of updating my CV.",
    rating: 5,
  },
];

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [selectedSubService, setSelectedSubService] = useState(0);

  // Debug: Log the serviceId
  useEffect(() => {
    console.log("Service ID from URL:", serviceId);
    console.log(
      "Available services:",
      services.map((s) => s.id)
    );
  }, [serviceId]);

  const service = services.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Service not found
          </h2>
          <p className="text-gray-600 mb-6">
            Service ID: {serviceId || "No ID provided"}
          </p>
          <button
            onClick={() => navigate("/services")}
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold text-lg"
          >
            <FaArrowLeft className="mr-2" />
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${service.bgGradient} py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/services"
            className="inline-flex items-center text-white/90 hover:text-white mb-8 font-semibold transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Services
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <Icon size={36} className="text-white" />
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                {service.title}
              </h1>
              <p className="text-xl text-white/90 mb-6">{service.subtitle}</p>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                {service.detailedDescription}
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                  <div className="flex items-center text-white">
                    <FaClock className="mr-2" />
                    <span className="font-semibold">
                      Delivery: {service.deliveryTime}
                    </span>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                  <div className="flex items-center text-white">
                    <FaShieldAlt className="mr-2" />
                    <span className="font-semibold">Quality Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Ready to Get Started?
              </h3>
              <p className="text-gray-600 mb-6">
                Contact us today to discuss your project requirements and get a
                personalized quote.
              </p>
              <button className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                <FaEnvelope className="mr-2" />
                Request a Quote
              </button>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  Average response time: 2 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What's Included
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive features designed to meet your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start">
                  <FaCheckCircle
                    className="text-green-500 mt-1 mr-3 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {feature}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Professional quality assured
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-Services Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Specialized Services
            </h2>
            <p className="text-lg text-gray-600">
              Explore our range of specialized offerings
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.subServices.map((subService, index) => (
              <div
                key={index}
                className={`bg-white border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedSubService === index
                    ? "border-purple-600 shadow-lg"
                    : "border-gray-200"
                }`}
                onClick={() => setSelectedSubService(index)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{subService}</h4>
                  {selectedSubService === index && (
                    <FaCheckCircle className="text-purple-600" size={20} />
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  Click to learn more about this service
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specializations Section - Only show if service has specializations */}
      {service.specializations && service.specializations.length > 0 && (
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Specializations
              </h2>
              <p className="text-lg text-gray-600">
                Deep dive into our expert service offerings
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {service.specializations.map((spec, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-purple-300 transition-all shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${service.bgGradient} rounded-xl flex items-center justify-center mr-4`}
                    >
                      <FaLightbulb size={20} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {spec.title}
                    </h3>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {spec.description}
                  </p>

                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      What You'll Get:
                    </h4>
                    <ul className="space-y-3">
                      {spec.includes.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-gray-700"
                        >
                          <span className="text-purple-600 mr-3 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600">
              Excellence in every aspect of service delivery
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRocket size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Fast Turnaround
              </h3>
              <p className="text-gray-600">
                Quick delivery without compromising on quality standards
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Quality Guaranteed
              </h3>
              <p className="text-gray-600">
                Premium quality backed by our satisfaction guarantee
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Expert Team
              </h3>
              <p className="text-gray-600">
                Experienced professionals with industry expertise
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaChartLine size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Proven Results
              </h3>
              <p className="text-gray-600">
                Data-driven approach for optimal outcomes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              A simple, streamlined process from start to finish
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Share Requirements",
                description: "Tell us about your project needs and deadlines",
                icon: FaLightbulb,
              },
              {
                step: "02",
                title: "Expert Assignment",
                description: "We match you with the right specialist",
                icon: FaUsers,
              },
              {
                step: "03",
                title: "Quality Delivery",
                description: "Receive your completed work on time",
                icon: FaRocket,
              },
              {
                step: "04",
                title: "Free Revisions",
                description: "Request changes until you're satisfied",
                icon: FaCheckCircle,
              },
            ].map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={index} className="text-center relative">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <StepIcon size={24} className="text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-500">
                      <span className="text-xs font-bold text-purple-600">
                        {step.step}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Client Success Stories
            </h2>
            <p className="text-lg text-gray-600">
              See what our clients say about working with us
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" size={16} />
                  ))}
                </div>

                <FaQuoteLeft className="text-purple-600 mb-4" size={20} />
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="border-t border-gray-100 pt-4">
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-purple-600 text-sm">
                    {testimonial.role}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-600 to-yellow-500 rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss your project and how we can help you achieve your
              goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
                <FaEnvelope className="mr-2" />
                Contact Us Now
              </button>
              <Link to="/services">
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all flex items-center justify-center">
                  <FaArrowLeft className="mr-2" />
                  View All Services
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
