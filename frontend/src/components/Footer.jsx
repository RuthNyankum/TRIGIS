// import React from "react";
// import {
//   MdEmail,
//   MdPhone,
//   MdLocationOn,
//   MdBook,
//   MdEdit,
//   MdPeople,
//   MdFavorite,
//   MdArrowUpward,
// } from "react-icons/md";
// import { NavLink, useNavigate } from "react-router";
// import logo from "../assets/images/trigis1.png";

// import {
//   services,
//   courses,
//   quickLinks,
//   socialLinks,
// } from "../constants/footerLinks";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();
//   const navigate = useNavigate();

//   const handleLinkClick = (href) => {
//     if (href.startsWith("http")) {
//       // external link → open in a new tab
//       window.open(href, "_blank", "noopener,noreferrer");
//     } else {
//       // internal route → use React Router
//       navigate(href);
//     }
//   };

//   return (
//     <footer className="bg-gray-900 text-white">
//       {/* Newsletter Section */}
//       {/* <div
//         className="text-white"
//         style={{ backgroundImage: "var(--brand-gradient)" }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="text-center">
//             <h3 className="text-2xl lg:text-3xl font-bold font-playfair mb-4">
//               Stay Updated with Writing Tips & Course Launches
//             </h3>
//             <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto font-inter">
//               Get exclusive writing tips, industry insights, and early access to
//               new courses delivered to your inbox.
//             </p>
//             <div className="max-w-md mx-auto">
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <input
//                   type="email"
//                   placeholder="Enter your email address"
//                   className="flex-1 px-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--brand-purple)] font-inter"
//                 />
//                 <button
//                   className="px-6 py-3 rounded-xl font-semibold flex items-center justify-center font-inter text-white shadow-md"
//                   style={{ backgroundImage: "var(--brand-gradient)" }}
//                 >
//                   Subscribe
//                   <MdArrowForward size={16} className="ml-2" />
//                 </button>
//               </div>
//               <p className="text-xs text-white/80 mt-3 font-inter">
//                 No spam, unsubscribe at any time. We respect your privacy.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div> */}

//       {/* Main Footer Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
//           {/* Company Info */}
//           <div className="lg:col-span-2">
//             <NavLink
//               to="/"
//               className="flex items-center space-x-3 group cursor-pointer"
//               onClick={() => setIsOpen(false)}
//             >
//               <img
//                 src={logo}
//                 alt="Trigis Consult Logo"
//                 className="h-12 lg:h-16 w-auto object-contain"
//               />
//               <div className="hidden sm:block">
//                 <h1
//                   className="text-xl lg:text-2xl font-bold font-playfair bg-clip-text text-transparent"
//                   style={{ backgroundImage: "var(--brand-gradient)" }}
//                 >
//                   TRIGIS
//                 </h1>
//                 <p className="text-xs text-gray-600 -mt-1 font-inter font-medium">
//                   CONSULT
//                 </p>
//               </div>
//             </NavLink>

//             <p className="text-gray-300 mb-6 leading-relaxed font-inter">
//               Trigis Consult provides reliable academic and professional writing
//               services for students, researchers, and professionals.
//             </p>

//             {/* Contact Info */}
//             <div className="space-y-3 mb-6">
//               <div className="flex items-center space-x-3 text-gray-300">
//                 <MdEmail size={18} className="text-[var(--brand-purple)]" />
//                 <span className="font-inter">gyesiagnes22@gmail.com</span>
//               </div>
//               <div className="flex items-center space-x-3 text-gray-300">
//                 <MdPhone size={18} className="text-[var(--brand-purple)]" />
//                 <span className="font-inter">+233 54 378 113</span>
//               </div>
//               <div className="flex items-center space-x-3 text-gray-300">
//                 <MdLocationOn
//                   size={18}
//                   className="text-[var(--brand-purple)]"
//                 />
//                 <span className="font-inter">Cape Coast, Ghana</span>
//               </div>
//             </div>

//             {/* Social Links */}
//             <div className="flex space-x-4">
//               {socialLinks.map((social) => {
//                 const Icon = social.icon;
//                 return (
//                   <button
//                     key={social.name}
//                     onClick={() => handleLinkClick(social.href)}
//                     className="p-2 rounded-lg bg-gray-800 text-gray-400 transition-all duration-200 hover:text-[var(--brand-yellow)] hover:scale-110 cursor-pointer"
//                     aria-label={social.name}
//                   >
//                     <Icon size={20} />
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Services */}
//           <div>
//             <h3 className="text-lg font-semibold mb-6 font-playfair flex items-center">
//               <MdEdit size={20} className="mr-2 text-[var(--brand-purple)]" />
//               Services
//             </h3>
//             <ul className="space-y-3">
//               {services.map((service) => (
//                 <li key={service.name}>
//                   <button
//                     onClick={() => handleLinkClick(service.href)}
//                     className="text-gray-400 hover:text-[var(--brand-yellow)] transition-colors duration-200 font-inter text-sm hover:translate-x-1 transform cursor-pointer"
//                   >
//                     {service.name}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Courses */}
//           <div>
//             <h3 className="text-lg font-semibold mb-6 font-playfair flex items-center">
//               <MdBook size={20} className="mr-2 text-[var(--brand-yellow)]" />
//               Courses
//             </h3>
//             <ul className="space-y-3">
//               {courses.map((course) => (
//                 <li key={course.name}>
//                   <button
//                     onClick={() => handleLinkClick(course.href)}
//                     className="text-gray-400 hover:text-[var(--brand-yellow)] transition-colors duration-200 font-inter text-sm hover:translate-x-1 transform"
//                   >
//                     {course.name}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-6 font-playfair flex items-center">
//               <MdPeople size={20} className="mr-2 text-[var(--brand-purple)]" />
//               Quick Links
//             </h3>
//             <ul className="space-y-3">
//               {quickLinks.map((link) => (
//                 <li key={link.name}>
//                   <button
//                     onClick={() => handleLinkClick(link.href)}
//                     className="text-gray-400 hover:text-[var(--brand-yellow)] transition-colors duration-200 font-inter text-sm hover:translate-x-1 transform cursor-pointer"
//                   >
//                     {link.name}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="mt-16 pt-12 border-t border-gray-800">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
//             <div className="text-center">
//               <div className="text-3xl font-bold text-[var(--brand-purple)] font-inter mb-2">
//                 500+
//               </div>
//               <div className="text-gray-400 text-sm font-inter">
//                 Projects Completed
//               </div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-[var(--brand-yellow)] font-inter mb-2">
//                 1000+
//               </div>
//               <div className="text-gray-400 text-sm font-inter">
//                 Students Taught
//               </div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-[var(--brand-purple)] font-inter mb-2">
//                 5
//               </div>
//               <div className="text-gray-400 text-sm font-inter">
//                 Years Experience
//               </div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-[var(--brand-yellow)] font-inter mb-2">
//                 98%
//               </div>
//               <div className="text-gray-400 text-sm font-inter">
//                 Client Satisfaction
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="border-t border-gray-800 bg-gray-950">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
//             <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400 font-inter">
//               <p>© {currentYear} Trigis Consult All rights reserved.</p>
//               <div className="flex items-center space-x-1">
//                 <span>Made with</span>
//                 <MdFavorite
//                   size={16}
//                   className="text-[var(--brand-purple)] animate-pulse"
//                 />
//                 <span>by Ruth</span>
//               </div>
//             </div>

//             <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-400 font-inter">
//               <button
//                 onClick={() => handleLinkClick("/privacy")}
//                 className="hover:text-[var(--brand-yellow)] transition-colors duration-200"
//               >
//                 Privacy Policy
//               </button>
//               <button
//                 onClick={() => handleLinkClick("/terms")}
//                 className="hover:text-[var(--brand-yellow)] transition-colors duration-200"
//               >
//                 Terms of Service
//               </button>
//               <button
//                 onClick={() => handleLinkClick("/cookies")}
//                 className="hover:text-[var(--brand-yellow)] transition-colors duration-200"
//               >
//                 Cookie Policy
//               </button>
//               <button
//                 onClick={() => handleLinkClick("/sitemap")}
//                 className="hover:text-[var(--brand-yellow)] transition-colors duration-200"
//               >
//                 Sitemap
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Back to Top Button */}
//       <button
//         onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//         className="fixed bottom-6 right-6 bg-[var(--brand-gradient)] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-40"
//         aria-label="Back to top"
//       >
//         <MdArrowUpward size={20} />
//       </button>
//     </footer>
//   );
// };

// export default Footer;

// src/components/Footer.jsx
import React from "react";
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdBook,
  MdEdit,
  MdPeople,
  MdFavorite,
  MdArrowUpward,
} from "react-icons/md";
import { NavLink, useNavigate } from "react-router";
import logo from "../assets/images/trigis1.png";

import { quickLinks, socialLinks } from "../constants/footerLinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleLinkClick = (href) => {
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      navigate(href);
    }
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Gradient Accent Top Line */}
      <div className="h-1 w-full bg-gradient-to-r from-[var(--brand-purple)] to-[var(--brand-yellow)]"></div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <NavLink
              to="/"
              className="flex items-center space-x-3 group cursor-pointer mb-6"
            >
              <img
                src={logo}
                alt="Trigis Consult Logo"
                className="h-12 lg:h-16 w-auto object-contain"
              />
              <div className="hidden sm:block">
                <h1
                  className="text-xl lg:text-2xl font-bold font-playfair bg-clip-text text-transparent"
                  style={{ backgroundImage: "var(--brand-gradient)" }}
                >
                  TRIGIS
                </h1>
                <p className="text-xs text-gray-400 -mt-1 font-inter font-medium">
                  CONSULT
                </p>
              </div>
            </NavLink>

            <p className="text-gray-300 mb-6 leading-relaxed font-inter">
              Trigis Consult provides reliable academic and professional writing
              services for students, researchers, and professionals.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-300">
                <MdEmail size={18} className="text-[var(--brand-purple)]" />
                <span className="font-inter">gyesiagnes22@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MdPhone size={18} className="text-[var(--brand-purple)]" />
                <span className="font-inter">+233 54 378 113</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MdLocationOn
                  size={18}
                  className="text-[var(--brand-purple)]"
                />
                <span className="font-inter">Cape Coast, Ghana</span>
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
                    className="p-2 rounded-lg bg-gray-800 text-gray-400 transition-all duration-200 hover:text-[var(--brand-yellow)] hover:scale-110 cursor-pointer"
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
            <h3 className="text-lg font-semibold mb-4 font-playfair flex items-center">
              <MdEdit size={20} className="mr-2 text-[var(--brand-purple)]" />
              Our Services
            </h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed font-inter">
              Explore our professional academic and content writing services
              tailored for students, researchers, and institutions.
            </p>
            <button
              onClick={() => handleLinkClick("/services")}
              className="inline-block bg-[var(--brand-purple)] text-white text-sm px-4 py-2 rounded-lg font-inter hover:bg-[var(--brand-yellow)] transition-all duration-200"
            >
              View Services
            </button>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-playfair flex items-center">
              <MdBook size={20} className="mr-2 text-[var(--brand-yellow)]" />
              Our Courses
            </h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed font-inter">
              Learn from experienced tutors through our research writing and
              publication training programs.
            </p>
            <button
              onClick={() => handleLinkClick("/courses")}
              className="inline-block bg-[var(--brand-yellow)] text-gray-900 text-sm px-4 py-2 rounded-lg font-inter hover:bg-[var(--brand-purple)] hover:text-white transition-all duration-200"
            >
              Browse Courses
            </button>
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
                    className="text-gray-400 hover:text-[var(--brand-yellow)] transition-colors duration-200 font-inter text-sm hover:translate-x-1 transform cursor-pointer"
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
                200+
              </div>
              <div className="text-gray-400 text-sm font-inter">
                Projects Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--brand-yellow)] font-inter mb-2">
                100+
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
              <p>© {currentYear} Trigis Consult. All rights reserved.</p>
              {/* <div className="flex items-center space-x-1">
                <span>Made with</span>
                <MdFavorite
                  size={16}
                  className="text-[var(--brand-purple)] animate-pulse"
                />
                <span>by Ruth</span>
              </div> */}
            </div>

            <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-400 font-inter">
              {/* <button
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
              </button> */}
              <div className="flex items-center space-x-1">
                <span>Made with</span>
                <MdFavorite
                  size={16}
                  className="text-[var(--brand-purple)] animate-pulse"
                />
                <span>by Ruth</span>
              </div>
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
