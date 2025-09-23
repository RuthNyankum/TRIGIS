import React from "react";
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdBook,
  MdEdit,
  MdPeople,
  MdEmojiEvents,
  MdArrowForward,
  MdFavorite,
  MdArrowUpward,
} from "react-icons/md";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Blog Writing", href: "/services/blog-writing" },
    { name: "Copywriting", href: "/services/copywriting" },
    { name: "Content Strategy", href: "/services/content-strategy" },
    { name: "Ghostwriting", href: "/services/ghostwriting" },
    { name: "SEO Content", href: "/services/seo-content" },
    { name: "Email Marketing", href: "/services/email-marketing" },
  ];

  const courses = [
    { name: "Freelance Writing Mastery", href: "/courses/freelance-mastery" },
    { name: "Copywriting Fundamentals", href: "/courses/copywriting-101" },
    { name: "Content Marketing Blueprint", href: "/courses/content-marketing" },
    { name: "SEO Writing Course", href: "/courses/seo-writing" },
    { name: "Email Marketing Mastery", href: "/courses/email-marketing" },
  ];

  const quickLinks = [
    { name: "About Us", href: "/about-us" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact-us" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebookF,
      href: "#",
      color: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      href: "#",
      color: "hover:text-sky-500",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "#",
      color: "hover:text-pink-500",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      href: "#",
      color: "hover:text-blue-700",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      href: "#",
      color: "hover:text-red-500",
    },
  ];

  const handleLinkClick = (href) => {
    console.log(`Navigating to: ${href}`);
    // In real app, this would be handled by React Router
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div
        className="text-white"
        style={{ backgroundImage: "var(--brand-gradient)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl lg:text-3xl font-bold font-playfair mb-4">
              Stay Updated with Writing Tips & Course Launches
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto font-inter">
              Get exclusive writing tips, industry insights, and early access to
              new courses delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--brand-purple)] font-inter"
                />
                <button
                  className="px-6 py-3 rounded-xl font-semibold flex items-center justify-center font-inter text-white shadow-md"
                  style={{ backgroundImage: "var(--brand-gradient)" }}
                >
                  Subscribe
                  <MdArrowForward size={16} className="ml-2" />
                </button>
              </div>
              <p className="text-xs text-white/80 mt-3 font-inter">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-[var(--brand-gradient)] flex items-center justify-center">
                <span className="text-white font-bold text-lg font-playfair">
                  W
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold font-playfair bg-[var(--brand-gradient)] bg-clip-text text-transparent">
                  WriterPro
                </h2>
                <p className="text-gray-400 text-sm font-inter">
                  Freelance Writing Services
                </p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed font-inter">
              Transforming ideas into compelling content that drives results.
              With over 5 years of experience, I help businesses tell their
              stories and train aspiring writers to build successful careers.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-300">
                <MdEmail size={18} className="text-[var(--brand-purple)]" />
                <span className="font-inter">hello@writerpro.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MdPhone size={18} className="text-[var(--brand-purple)]" />
                <span className="font-inter">+233 XX XXX XXXX</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MdLocationOn
                  size={18}
                  className="text-[var(--brand-purple)]"
                />
                <span className="font-inter">Accra, Ghana</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <button
                    key={social.name}
                    onClick={() => handleLinkClick(social.href)}
                    className="p-2 rounded-lg bg-gray-800 text-gray-400 transition-all duration-200 hover:text-[var(--brand-yellow)] hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-playfair flex items-center">
              <MdEdit size={20} className="mr-2 text-[var(--brand-purple)]" />
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <button
                    onClick={() => handleLinkClick(service.href)}
                    className="text-gray-400 hover:text-[var(--brand-yellow)] transition-colors duration-200 font-inter text-sm hover:translate-x-1 transform"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-playfair flex items-center">
              <MdBook size={20} className="mr-2 text-[var(--brand-yellow)]" />
              Courses
            </h3>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course.name}>
                  <button
                    onClick={() => handleLinkClick(course.href)}
                    className="text-gray-400 hover:text-[var(--brand-yellow)] transition-colors duration-200 font-inter text-sm hover:translate-x-1 transform"
                  >
                    {course.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-playfair flex items-center">
              <MdPeople size={20} className="mr-2 text-[var(--brand-purple)]" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-400 hover:text-[var(--brand-yellow)] transition-colors duration-200 font-inter text-sm hover:translate-x-1 transform"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 pt-12 border-t border-gray-800">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--brand-purple)] font-inter mb-2">
                500+
              </div>
              <div className="text-gray-400 text-sm font-inter">
                Projects Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--brand-yellow)] font-inter mb-2">
                1000+
              </div>
              <div className="text-gray-400 text-sm font-inter">
                Students Taught
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--brand-purple)] font-inter mb-2">
                5
              </div>
              <div className="text-gray-400 text-sm font-inter">
                Years Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--brand-yellow)] font-inter mb-2">
                98%
              </div>
              <div className="text-gray-400 text-sm font-inter">
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400 font-inter">
              <p>© {currentYear} WriterPro. All rights reserved.</p>
              <div className="flex items-center space-x-1">
                <span>Made with</span>
                <MdFavorite
                  size={16}
                  className="text-[var(--brand-purple)] animate-pulse"
                />
                <span>in Ghana</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-400 font-inter">
              <button
                onClick={() => handleLinkClick("/privacy")}
                className="hover:text-[var(--brand-yellow)] transition-colors duration-200"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleLinkClick("/terms")}
                className="hover:text-[var(--brand-yellow)] transition-colors duration-200"
              >
                Terms of Service
              </button>
              <button
                onClick={() => handleLinkClick("/cookies")}
                className="hover:text-[var(--brand-yellow)] transition-colors duration-200"
              >
                Cookie Policy
              </button>
              <button
                onClick={() => handleLinkClick("/sitemap")}
                className="hover:text-[var(--brand-yellow)] transition-colors duration-200"
              >
                Sitemap
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-[var(--brand-gradient)] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-40"
        aria-label="Back to top"
      >
        <MdArrowUpward size={20} />
      </button>
    </footer>
  );
};

export default Footer;
