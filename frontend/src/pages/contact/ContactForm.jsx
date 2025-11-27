import React, { useEffect } from "react";
import {
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  submitContactForm,
  setFormField,
  resetForm,
  clearSubmitStatus,
} from "../../redux/slice/users/contactFormSlice";

const ContactForm = () => {
  const dispatch = useDispatch();

  // Redux state
  const { formData, isSubmitting, submitStatus, error } = useSelector(
    (state) => state.contactForm
  );

  const services = [
    "Content Writing & Copywriting",
    "Digital Marketing Strategy",
    "Brand Storytelling",
    "Course Development",
    "Email Marketing",
    "Content Consulting",
    "SEO Content Writing",
    "Social Media Management",
  ];

  const budgetRanges = [
    "Under GH₵500",
    "GH₵500 - GH₵1,000",
    "GH₵1,000 - GH₵2,500",
    "GH₵2,500 - GH₵5,000",
    "GH₵5,000+",
    "Let's discuss",
  ];

  const projectTypes = [
    "One-time Project",
    "Ongoing Partnership",
    "Course Enrollment",
    "Consultation",
    "Custom Package",
  ];

  // Auto-clear success status after 3 seconds
  useEffect(() => {
    if (submitStatus === "success") {
      const timer = setTimeout(() => {
        dispatch(clearSubmitStatus());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormField({ field: name, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(submitContactForm(formData));
  };

  if (submitStatus === "success") {
    return (
      <div className="success-animation text-center py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6 animate-bounce">
          <FaCheckCircle size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold font-playfair mb-4 text-gray-900">
          Message Sent Successfully!
        </h3>
        <p className="text-gray-600 font-inter">
          Thank you for reaching out. We'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center animate-shake">
          <FaExclamationCircle className="text-red-500 mr-3" size={20} />
          <p className="text-red-700 font-inter">
            {error ||
              "Something went wrong. Please try again or contact us directly."}
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-inter">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-inter">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-inter">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-inter">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="+233 XX XXX XXXX"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 font-inter">
          Company/Organization
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          placeholder="Your company name"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-inter">
            Service Needed *
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            required
            className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          >
            <option value="">Select a service</option>
            {services.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-inter">
            Project Type
          </label>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleInputChange}
            className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          >
            <option value="">Select project type</option>
            {projectTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 font-inter">
          Budget Range
        </label>
        <select
          name="budget"
          value={formData.budget}
          onChange={handleInputChange}
          className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        >
          <option value="">Select budget range</option>
          {budgetRanges.map((range, index) => (
            <option key={index} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 font-inter">
          Project Details *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows="4"
          className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition"
          placeholder="Tell us about your project goals, timeline, and any specific requirements..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 text-white py-4 rounded-xl font-bold font-inter text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <FaSpinner className="mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <FaPaperPlane className="mr-2 group-hover:translate-x-1 transition-transform duration-200" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
