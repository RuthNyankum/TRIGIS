import React, { useState, useEffect } from "react";
import {
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { TESTIMONIALS } from "../../constants/home"; // adjust path as needed

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = TESTIMONIALS;

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-20 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-48 h-48 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-white mb-6">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto font-inter">
            Don't just take our word for it. See how we've helped businesses
            like yours achieve remarkable results.
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl">
            {/* Quote Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                <FaQuoteLeft className="text-purple-900" size={24} />
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="text-center">
              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl mx-1" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl lg:text-2xl text-white font-inter leading-relaxed mb-8 max-w-4xl mx-auto">
                "{current.text}"
              </blockquote>

              {/* Results Badge */}
              <div className="inline-block bg-yellow-400 text-purple-900 px-6 py-2 rounded-full font-bold font-inter mb-8">
                ✨ {current.results}
              </div>

              {/* Client Info */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-2xl">
                  {current.image}
                </div>
                <div className="text-left">
                  <h4 className="text-xl font-bold text-white font-inter">
                    {current.name}
                  </h4>
                  <p className="text-purple-200 font-inter">
                    {current.role} at {current.company}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
          >
            <FaChevronLeft size={16} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
          >
            <FaChevronRight size={16} />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentTestimonial
                  ? "bg-yellow-400 scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/20">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-yellow-400 font-inter mb-2">
              500+
            </div>
            <div className="text-purple-200 font-inter">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-yellow-400 font-inter mb-2">
              98%
            </div>
            <div className="text-purple-200 font-inter">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-yellow-400 font-inter mb-2">
              250%
            </div>
            <div className="text-purple-200 font-inter">Avg. Growth</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-yellow-400 font-inter mb-2">
              5+
            </div>
            <div className="text-purple-200 font-inter">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
