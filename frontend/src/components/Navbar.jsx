// import React, { useState, useEffect } from "react";
// import Home from "../pages/Home";
// import {
//   HiMenu,
//   HiX,
//   HiBookOpen,
//   HiUser,
//   HiBriefcase,
//   HiAcademicCap,
//   HiMail,
//   HiHome,
// } from "react-icons/hi";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeSection, setActiveSection] = useState("/");

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Navigation items
//   const navItems = [
//     { path: "/", label: "Home", icon: Home },
//     { path: "/about-us", label: "About Us", icon: HiUser },
//     { path: "/services", label: "Services", icon: HiBriefcase },
//     { path: "/courses", label: "Courses", icon: HiAcademicCap },
//     { path: "/contact-us", label: "Contact Us", icon: HiMail },
//   ];

//   const handleNavClick = (path) => {
//     setActiveSection(path);
//     setIsOpen(false);
//     // In real app, this would be handled by React Router
//     console.log(`Navigating to: ${path}`);
//   };

//   const isActive = (path) => {
//     return activeSection === path;
//   };

//   return (
//     <>
//       {/* Font Import Example - Add to your index.html or CSS */}
//       {/* <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap');
//       `}</style> */}

//       <nav
//         className={`fixed top-0 w-full z-50 transition-all duration-300 font-inter ${
//           isScrolled
//             ? "bg-white/95 backdrop-blur-md shadow-lg"
//             : "bg-white/90 backdrop-blur-sm"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16 lg:h-20">
//             {/* Logo */}
//             <div
//               onClick={() => handleNavClick("/")}
//               className="flex items-center space-x-3 group cursor-pointer"
//             >
//               <div className="relative">
//                 {/* Logo Image Container */}
//                 <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-md group-hover:shadow-lg transition-all duration-300 flex items-center justify-center">
//                   {/* Replace this with your actual logo image */}
//                   <img
//                     src="/api/placeholder/48/48"
//                     alt="WriterPro Logo"
//                     className="h-8 w-8 lg:h-10 lg:w-10 rounded-lg object-cover"
//                     onError={(e) => {
//                       // Fallback if image fails to load
//                       e.target.style.display = "none";
//                       e.target.nextSibling.style.display = "flex";
//                     }}
//                   />
//                   {/* Fallback logo */}
//                   <div className="hidden h-full w-full items-center justify-center text-white font-bold text-lg font-playfair">
//                     W
//                   </div>
//                 </div>
//               </div>
//               <div className="hidden sm:block">
//                 <h1 className="text-xl lg:text-2xl font-bold font-playfair bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   WriterPro
//                 </h1>
//                 <p className="text-xs text-gray-600 -mt-1 font-inter font-medium">
//                   Freelance Writing Services
//                 </p>
//               </div>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center space-x-1">
//               {navItems.map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <button
//                     key={item.path}
//                     onClick={() => handleNavClick(item.path)}
//                     className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
//                       isActive(item.path)
//                         ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 shadow-sm"
//                         : "text-gray-700 hover:bg-gray-100 hover:text-blue-600 hover:scale-105"
//                     }`}
//                   >
//                     <Icon size={16} />
//                     <span className="font-inter">{item.label}</span>
//                   </button>
//                 );
//               })}
//             </div>

//             {/* CTA Button - Desktop */}
//             <div className="hidden lg:flex items-center space-x-4">
//               <button
//                 onClick={() => handleNavClick("/courses")}
//                 className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl font-inter overflow-hidden"
//               >
//                 <span className="relative z-10">Start Learning</span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-200"></div>
//               </button>
//             </div>

//             {/* Mobile menu button */}
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-all duration-200 hover:scale-105"
//             >
//               {isOpen ? <X size={24} /> : <HiMenu size={24} />}
//             </button>
//           </div>

//           {/* Mobile Navigation */}
//           <div
//             className={`lg:hidden transition-all duration-300 ease-in-out ${
//               isOpen
//                 ? "max-h-96 opacity-100"
//                 : "max-h-0 opacity-0 overflow-hidden"
//             }`}
//           >
//             <div className="py-4 space-y-2 border-t border-gray-100">
//               {navItems.map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <button
//                     key={item.path}
//                     onClick={() => handleNavClick(item.path)}
//                     className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
//                       isActive(item.path)
//                         ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 shadow-sm"
//                         : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                     }`}
//                   >
//                     <Icon size={18} />
//                     <span className="font-inter">{item.label}</span>
//                   </button>
//                 );
//               })}

//               {/* Mobile CTA */}
//               <div className="pt-4 border-t border-gray-100">
//                 <button
//                   onClick={() => handleNavClick("/courses")}
//                   className="flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md font-inter"
//                 >
//                   <HiAcademicCap size={18} className="mr-2" />
//                   Start Learning
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Demo Section showing different states */}
//         <div className="bg-gray-50 border-t border-gray-200 p-4 text-center text-sm text-gray-600 font-inter">
//           <p>
//             Current active section:{" "}
//             <span className="font-semibold text-blue-600">{activeSection}</span>
//           </p>
//           <p className="text-xs mt-1">
//             Click navigation items to see active states • Scroll to see blur
//             effect
//           </p>
//         </div>
//       </nav>

//       {/* Spacer for fixed navbar */}
//       <div className="h-20"></div>

//       {/* Demo Content */}
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center py-16">
//             <h2 className="text-4xl font-bold font-playfair text-gray-900 mb-6">
//               Professional Freelance Writing Services
//             </h2>
//             <p className="text-xl text-gray-600 font-inter leading-relaxed">
//               Crafting compelling content that converts and educates. From blog
//               posts to comprehensive courses, I help businesses tell their
//               stories.
//             </p>
//           </div>

//           {/* Font Examples */}
//           <div className="grid md:grid-cols-2 gap-8 mb-16">
//             <div className="bg-white p-8 rounded-2xl shadow-lg">
//               <h3 className="text-2xl font-bold font-playfair text-gray-900 mb-4">
//                 Font Recommendations
//               </h3>
//               <div className="space-y-4">
//                 <div>
//                   <h4 className="font-semibold text-blue-600 font-inter">
//                     Primary: Inter
//                   </h4>
//                   <p className="text-gray-600 font-inter">
//                     Clean, modern, excellent readability for body text and UI
//                     elements.
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-purple-600 font-playfair">
//                     Secondary: Playfair Display
//                   </h4>
//                   <p className="text-gray-600 font-inter">
//                     Elegant serif for headings and brand elements.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white p-8 rounded-2xl shadow-lg">
//               <h3 className="text-2xl font-bold font-playfair text-gray-900 mb-4">
//                 Implementation
//               </h3>
//               <div className="text-sm font-mono bg-gray-100 p-4 rounded-lg">
//                 <div className="text-green-600">
//                   // In your Tailwind config:
//                 </div>
//                 <div className="text-blue-600">fontFamily: {`{`}</div>
//                 <div className="ml-2 text-purple-600">
//                   'inter': ['Inter', 'sans-serif'],
//                 </div>
//                 <div className="ml-2 text-purple-600">
//                   'playfair': ['Playfair Display', 'serif']
//                 </div>
//                 <div className="text-blue-600">{`}`}</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import logo from "../assets/images/trigis.jpg";
import {
  HiMenu,
  HiX,
  HiUser,
  HiBriefcase,
  HiAcademicCap,
  HiMail,
  HiHome,
} from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { path: "/", label: "Home", icon: HiHome },
    { path: "/about-us", label: "About Us", icon: HiUser },
    { path: "/services", label: "Services", icon: HiBriefcase },
    { path: "/courses", label: "Courses", icon: HiAcademicCap },
    { path: "/contact-us", label: "Contact Us", icon: HiMail },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 font-inter ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <NavLink
              to="/"
              className="flex items-center space-x-3 group cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <img
                src={logo}
                alt="WriterPro Logo"
                className="h-12 lg:h-16 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* Fallback logo */}
              <div className="hidden h-full w-full items-center justify-center text-gray-800 font-bold text-lg font-playfair">
                TC
              </div>
              <div className="hidden sm:block">
                <h1
                  className="text-xl lg:text-2xl font-bold font-playfair bg-clip-text text-transparent"
                  style={{ backgroundImage: "var(--brand-gradient)" }}
                >
                  TRIGIS
                </h1>
                <p className="text-xs text-gray-600 -mt-1 font-inter font-medium">
                  Consult
                </p>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "text-white shadow-sm"
                          : "text-gray-700 hover:bg-gray-100 hover:text-[var(--brand-purple)] hover:scale-105"
                      }`
                    }
                    style={({ isActive }) =>
                      isActive
                        ? { backgroundImage: "var(--brand-gradient)" }
                        : {}
                    }
                  >
                    <Icon size={16} />
                    <span className="font-inter">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <NavLink
                to="/courses"
                className="relative text-white px-6 py-2.5 rounded-xl text-sm font-semibold transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl font-inter overflow-hidden"
                style={{ backgroundImage: "var(--brand-gradient)" }}
              >
                <span className="relative z-10">Start Learning</span>
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--brand-yellow), var(--brand-purple))",
                  }}
                ></div>
              </NavLink>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-[var(--brand-purple)] hover:bg-gray-100 transition-all duration-200 hover:scale-105"
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out ${
              isOpen
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="py-4 space-y-2 border-t border-gray-100">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                        isActive
                          ? "text-white shadow-sm"
                          : "text-gray-700 hover:bg-gray-100 hover:text-[var(--brand-purple)]"
                      }`
                    }
                    style={({ isActive }) =>
                      isActive
                        ? { backgroundImage: "var(--brand-gradient)" }
                        : {}
                    }
                  >
                    <Icon size={18} />
                    <span className="font-inter">{item.label}</span>
                  </NavLink>
                );
              })}

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-gray-100">
                <NavLink
                  to="/courses"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md font-inter"
                  style={{ backgroundImage: "var(--brand-gradient)" }}
                >
                  <HiAcademicCap size={18} className="mr-2" />
                  Start Learning
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;
