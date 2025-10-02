import React from "react";
import {
  FaSearch,
  FaLightbulb,
  FaRocket,
  FaChartLine,
  FaUsers,
  FaCogs,
} from "react-icons/fa";

import { PROCESS_STEPS } from "../../constants/home";

const ICONS = {
  FaSearch,
  FaLightbulb,
  FaRocket,
  FaChartLine,
  FaUsers,
  FaCogs,
};

const Process = () => {
  const steps = PROCESS_STEPS;

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 left-20 w-48 h-48 bg-purple-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-20 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">
            Our Proven <span className="gradient-text">Process</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
            We follow a systematic approach that has helped 500+ businesses
            achieve their content marketing goals. Here's how we work together
            to transform your brand.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div
            className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-600 to-yellow-400 opacity-20"
            style={{ height: "calc(100% - 100px)", top: "50px" }}
          ></div>

          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = ICONS[step.icon]; // map string to actual icon
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`flex items-center ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`w-full lg:w-5/12 ${
                      isEven ? "lg:pr-16" : "lg:pl-16"
                    }`}
                  >
                    <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105">
                      {/* Step Number */}
                      <div className="flex items-center mb-6">
                        <div className="text-4xl font-bold text-purple-600 font-inter mr-4">
                          {step.number}
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center">
                          <Icon className="text-white" size={20} />
                        </div>
                      </div>

                      {/* Step Title */}
                      <h3 className="text-2xl font-bold font-inter text-gray-900 mb-4">
                        {step.title}
                      </h3>

                      {/* Step Description */}
                      <p className="text-gray-600 font-inter mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Step Details */}
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-center text-sm text-gray-500 font-inter"
                          >
                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-3"></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Center Icon (Desktop) */}
                  <div className="hidden lg:flex w-2/12 justify-center">
                    <div className="w-16 h-16 bg-white border-4 border-purple-600 rounded-full flex items-center justify-center shadow-lg z-10">
                      <Icon className="text-purple-600" size={24} />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden lg:block w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Summary */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold font-playfair mb-4">
              Typical Project Timeline
            </h3>
            <p className="text-lg text-purple-100 mb-8 font-inter max-w-3xl mx-auto">
              Most clients see initial results within 30-60 days, with
              significant improvements after 3-6 months of consistent
              implementation.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 font-inter mb-2">
                  Week 1-2
                </div>
                <div className="text-purple-100 font-inter">
                  Discovery & Strategy
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 font-inter mb-2">
                  Week 3-8
                </div>
                <div className="text-purple-100 font-inter">
                  Content Creation & Launch
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 font-inter mb-2">
                  Ongoing
                </div>
                <div className="text-purple-100 font-inter">
                  Optimization & Growth
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
