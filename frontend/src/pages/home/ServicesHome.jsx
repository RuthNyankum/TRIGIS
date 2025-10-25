import React from "react";
import { useNavigate } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { services } from "../../constants/home";
// import { homeServices } from "../../constants/home";

const ServicesShowcase = () => {
  const navigate = useNavigate();

  const handleViewAllServices = () => {
    navigate("/services");
  };

  return (
    <section className="pb-20 bg-gradient-to-br from-gray-50 to-purple-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-purple-600 to-yellow-400 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-gray-100 group cursor-pointer"
                onClick={handleViewAllServices}
              >
                {/* Service Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center mb-4 group-hover:from-yellow-400 group-hover:to-yellow-600 transition-all duration-300">
                  <Icon className="text-white" size={20} />
                </div>

                {/* Service Content */}
                <h3 className="text-lg font-bold font-inter text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 font-inter mb-3 text-sm leading-relaxed">
                  {service.description}
                </p>

                <div className="flex justify-end">
                  <FaArrowRight
                    className="text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300"
                    size={14}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
