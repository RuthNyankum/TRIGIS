import React from "react";
import { useNavigate } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { homeServices } from "../../constants/services";

const ServicesShowcase = () => {
  const navigate = useNavigate();

  const handleViewAllServices = () => {
    navigate("/services");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">
            Our Academic{" "}
            <span className="bg-gradient-to-r from-purple-600 to-yellow-400 bg-clip-text text-transparent">
              Writing Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto font-inter leading-relaxed">
            Professional academic writing assistance for students and
            professionals. From CVs to dissertations, we help you succeed in
            your academic journey.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {homeServices.map((service, index) => {
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

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold font-playfair mb-4">
              Need Help with Your Academic Work?
            </h3>
            <p className="text-lg text-purple-100 mb-8 font-inter max-w-2xl mx-auto">
              Get professional academic writing assistance from experienced
              writers. Quality guaranteed with fast delivery and affordable
              pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleViewAllServices}
                className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-full font-semibold text-lg font-inter hover:bg-yellow-300 transition-all duration-300 hover:transform hover:scale-105 shadow-lg"
              >
                View All Services
              </button>
              <button
                onClick={() => navigate("/contact-us")}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg font-inter hover:bg-white hover:text-purple-900 transition-all duration-300 hover:transform hover:scale-105"
              >
                Get Free Quote
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-purple-600 font-inter mb-2">
              500+
            </div>
            <div className="text-gray-600 font-inter">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-purple-600 font-inter mb-2">
              98%
            </div>
            <div className="text-gray-600 font-inter">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-purple-600 font-inter mb-2">
              24/7
            </div>
            <div className="text-gray-600 font-inter">Support Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-purple-600 font-inter mb-2">
              100%
            </div>
            <div className="text-gray-600 font-inter">Original Content</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
