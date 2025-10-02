import React, { useState } from "react";
import { FaPlus, FaMinus, FaQuestionCircle } from "react-icons/fa";
import { FAQS } from "../../constants/home"; // adjust path if needed

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-40 h-40 bg-purple-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center mx-auto mb-6">
            <FaQuestionCircle className="text-white" size={24} />
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
            Get answers to common questions about our services, processes, and
            how we can help grow your business.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg lg:text-xl font-semibold font-inter text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openFAQ === index ? (
                    <FaMinus className="text-purple-600" size={16} />
                  ) : (
                    <FaPlus className="text-purple-600" size={16} />
                  )}
                </div>
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openFAQ === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-8 pb-6">
                  <div className="w-full h-px bg-gray-200 mb-6"></div>
                  <p className="text-gray-600 font-inter leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold font-playfair mb-4">
              Still Have Questions?
            </h3>
            <p className="text-lg text-purple-100 mb-8 font-inter max-w-2xl mx-auto">
              We're here to help! Schedule a free consultation to discuss your
              specific needs and learn how we can help grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="hero-btn text-white px-8 py-4 rounded-full font-semibold text-lg font-inter hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
                Schedule Free Consultation
              </button>
              <button className="hero-btn-outline bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg font-inter hover:bg-white hover:text-purple-900 transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
