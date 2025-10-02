import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaPaperPlane,
  FaUser,
  FaBuilding,
  FaCommentAlt,
  FaCheckCircle,
  FaCalendarAlt,
  FaVideo,
  FaHandshake,
  FaRocket,
  FaAward,
  FaQuoteLeft,
  FaArrowRight,
  FaWhatsapp,
  FaTelegram,
  FaSkype,
} from "react-icons/fa";
import { MdStar } from "react-icons/md";

const Contact = () => {
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const contactMethods = [
    {
      icon: FaEnvelope,
      title: "Email Us",
      subtitle: "Quick response guaranteed",
      value: "hello@trigisconsult.com",
      action: "mailto:hello@trigisconsult.com",
      color: "purple",
      description: "Get a response within 2 hours during business hours",
    },
    {
      icon: FaPhone,
      title: "Call Us",
      subtitle: "Direct line to our team",
      value: "+233 24 123 4567",
      action: "tel:+233241234567",
      color: "blue",
      description: "Monday - Friday, 9:00 AM - 6:00 PM GMT",
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      subtitle: "Chat with us instantly",
      value: "+233 24 123 4567",
      action: "https://wa.me/233241234567",
      color: "green",
      description: "Quick questions and instant support",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      subtitle: "Our office location",
      value: "Accra, Ghana",
      action: "#",
      color: "red",
      description: "East Legon, Greater Accra Region",
    },
  ];

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

  const faqs = [
    {
      question: "How quickly can you start my project?",
      answer:
        "Most projects can begin within 24-48 hours after contract signing. Rush projects are available for an additional fee.",
    },
    {
      question: "Do you work with international clients?",
      answer:
        "Yes! We work with clients globally and are experienced in different time zones and cultural contexts.",
    },
    {
      question: "What's included in your content packages?",
      answer:
        "Our packages include initial consultation, content strategy, writing/creation, revisions, and final delivery. Specific inclusions vary by service.",
    },
    {
      question: "Do you offer payment plans?",
      answer:
        "Yes, we offer flexible payment options for larger projects, including milestone-based payments and monthly retainers.",
    },
    {
      question: "Can I get samples of your work?",
      answer:
        "Absolutely! We're happy to share relevant portfolio samples and case studies during our initial consultation.",
    },
  ];

  const testimonials = [
    {
      name: "Kwame Asante",
      company: "TechStart Ghana",
      role: "CEO",
      content:
        "TRIGIS Consult's response time is incredible. They understood our needs immediately and delivered beyond expectations.",
      rating: 5,
    },
    {
      name: "Akosua Mensah",
      company: "Growth Dynamics",
      role: "Marketing Director",
      content:
        "Professional, reliable, and results-driven. The consultation process was thorough and the final output was exceptional.",
      rating: 5,
    },
    {
      name: "Samuel Osei",
      company: "EduTech Solutions",
      role: "Founder",
      content:
        "Working with TRIGIS transformed our content strategy. Their expertise and dedication to client success is unmatched.",
      rating: 5,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
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
  };

  const getColorClasses = (color) => {
    const colors = {
      purple: "bg-purple-500 text-white",
      blue: "bg-blue-500 text-white",
      green: "bg-green-500 text-white",
      red: "bg-red-500 text-white",
    };
    return colors[color] || "bg-purple-500 text-white";
  };

  return (
    <>
      {/* Custom Styles */}
      <style jsx>{`
        :root {
          --brand-purple: #7e1394;
          --brand-yellow: #fdb813;
          --brand-gradient: linear-gradient(135deg, #7e1394 0%, #fdb813 100%);
        }

        .gradient-bg {
          background: linear-gradient(
            135deg,
            var(--brand-purple) 0%,
            var(--brand-yellow) 100%
          );
        }

        .gradient-text {
          background: var(--brand-gradient);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .contact-card {
          transition: all 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(126, 19, 148, 0.15);
        }

        .form-input {
          transition: all 0.3s ease;
        }

        .form-input:focus {
          border-color: var(--brand-purple);
          box-shadow: 0 0 0 3px rgba(126, 19, 148, 0.1);
        }

        .success-animation {
          animation: slideInUp 0.5s ease-out;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .font-playfair {
          font-family: "Playfair Display", serif;
        }

        .font-inter {
          font-family: "Inter", sans-serif;
        }

        .tab-button {
          transition: all 0.3s ease;
        }

        .tab-button.active {
          background: var(--brand-gradient);
          color: white;
          transform: translateY(-2px);
        }
      `}</style>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-yellow-500 rounded-full mb-6">
              <FaEnvelope size={32} className="text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold font-playfair mb-6">
              Let's <span className="gradient-text">Connect</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed mb-8">
              Ready to transform your content strategy and drive real business
              growth? We're here to help you succeed. Reach out and let's start
              the conversation.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <a
                  key={index}
                  href={method.action}
                  className="contact-card bg-white rounded-2xl p-6 shadow-lg text-center group cursor-pointer"
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 ${getColorClasses(
                      method.color
                    )}`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold font-playfair mb-2 text-gray-900">
                    {method.title}
                  </h3>
                  <p className="text-purple-600 font-semibold font-inter mb-2 text-sm">
                    {method.subtitle}
                  </p>
                  <p className="text-gray-900 font-inter font-semibold mb-3">
                    {method.value}
                  </p>
                  <p className="text-gray-600 font-inter text-sm leading-relaxed">
                    {method.description}
                  </p>
                </a>
              );
            })}
          </div>

          {/* Main Contact Form Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold font-playfair mb-6 text-gray-900">
                Start Your <span className="gradient-text">Project</span>
              </h2>
              <p className="text-gray-600 font-inter mb-8 leading-relaxed">
                Tell us about your project and we'll get back to you with a
                customized proposal within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="success-animation text-center py-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
                    <FaCheckCircle size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold font-playfair mb-4 text-gray-900">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 font-inter">
                    Thank you for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
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
                        className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none"
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
                        className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none"
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
                        className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none"
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
                        className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none"
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
                      className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none"
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
                        className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none"
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
                        className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none"
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
                      className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none"
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
                      className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl font-inter focus:outline-none resize-none"
                      placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 text-white py-4 rounded-xl font-bold font-inter text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
                  >
                    <FaPaperPlane className="mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                    Send Message
                  </button>
                </div>
              )}
            </div>

            {/* Right Side - Info & Benefits */}
            <div className="space-y-8">
              {/* Why Choose Us */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold font-playfair mb-6 text-gray-900">
                  Why Choose{" "}
                  <span className="gradient-text">TRIGIS Consult</span>
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <FaRocket className="text-purple-600 mt-1 mr-4" size={20} />
                    <div>
                      <h4 className="font-semibold font-inter text-gray-900 mb-2">
                        Fast Turnaround
                      </h4>
                      <p className="text-gray-600 font-inter text-sm">
                        Most projects start within 24-48 hours with quick
                        delivery times
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaAward className="text-yellow-500 mt-1 mr-4" size={20} />
                    <div>
                      <h4 className="font-semibold font-inter text-gray-900 mb-2">
                        Proven Results
                      </h4>
                      <p className="text-gray-600 font-inter text-sm">
                        Over 500+ successful projects with measurable business
                        impact
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaHandshake
                      className="text-blue-500 mt-1 mr-4"
                      size={20}
                    />
                    <div>
                      <h4 className="font-semibold font-inter text-gray-900 mb-2">
                        Dedicated Support
                      </h4>
                      <p className="text-gray-600 font-inter text-sm">
                        Personal project manager and direct access to our team
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaCheckCircle
                      className="text-green-500 mt-1 mr-4"
                      size={20}
                    />
                    <div>
                      <h4 className="font-semibold font-inter text-gray-900 mb-2">
                        Quality Guarantee
                      </h4>
                      <p className="text-gray-600 font-inter text-sm">
                        100% satisfaction guarantee with unlimited revisions
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <FaClock className="text-purple-600 mr-3" size={24} />
                  <h3 className="text-xl font-bold font-playfair text-gray-900">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-inter">
                      Monday - Friday
                    </span>
                    <span className="font-semibold text-gray-900 font-inter">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-inter">Saturday</span>
                    <span className="font-semibold text-gray-900 font-inter">
                      10:00 AM - 2:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-inter">Sunday</span>
                    <span className="font-semibold text-gray-900 font-inter">
                      Closed
                    </span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-purple-600 font-inter font-semibold">
                      Emergency support available 24/7 for ongoing projects
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold font-playfair mb-4 text-gray-900">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                  >
                    <FaLinkedin size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
                  >
                    <FaTwitter size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center text-white hover:bg-blue-900 transition-colors"
                  >
                    <FaFacebook size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors"
                  >
                    <FaInstagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold font-playfair mb-4 text-gray-900">
                Frequently Asked{" "}
                <span className="gradient-text">Questions</span>
              </h3>
              <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
                Got questions? We've got answers. Here are the most common
                questions we receive.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="text-lg font-semibold font-playfair mb-3 text-gray-900">
                    {faq.question}
                  </h4>
                  <p className="text-gray-600 font-inter leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold font-playfair mb-4 text-gray-900">
                What Our <span className="gradient-text">Clients Say</span>
              </h3>
              <p className="text-lg text-gray-600 font-inter">
                Don't just take our word for it - hear from businesses we've
                helped grow.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <MdStar key={i} className="text-yellow-400" size={16} />
                    ))}
                  </div>

                  <FaQuoteLeft className="text-purple-600 mb-4" size={20} />
                  <p className="text-gray-700 font-inter mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  <div className="border-t border-gray-100 pt-4">
                    <div className="font-semibold text-gray-900 font-inter">
                      {testimonial.name}
                    </div>
                    <div className="text-purple-600 text-sm font-inter">
                      {testimonial.role}
                    </div>
                    <div className="text-gray-600 text-sm font-inter">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="gradient-bg rounded-2xl p-8 lg:p-12 text-center">
            <h3 className="text-3xl lg:text-4xl font-bold font-playfair mb-6 text-white">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-inter leading-relaxed">
              Join hundreds of satisfied clients who have transformed their
              businesses with our expert content solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold font-inter text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center">
                <FaCalendarAlt className="mr-2" />
                Book Free Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold font-inter text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center justify-center">
                <FaVideo className="mr-2" />
                Schedule Video Call
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
