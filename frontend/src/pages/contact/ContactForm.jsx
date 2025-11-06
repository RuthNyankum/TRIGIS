import React, { useState } from "react";
import {
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner,
} from "react-icons/fa";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
    projectType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("http://localhost:8000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitStatus(null);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            company: "",
            service: "",
            budget: "",
            message: "",
            projectType: "",
          });
        }, 3000);
      } else {
        setSubmitStatus("error");
        console.error("Error:", data.message);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="success-animation text-center py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
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
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center">
          <FaExclamationCircle className="text-red-500 mr-3" size={20} />
          <p className="text-red-700 font-inter">
            Something went wrong. Please try again or contact us directly.
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
            className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
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
            <FaPaperPlane className="mr-2 group-hover:translate-x-1 transition-transform duration-200 " />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
