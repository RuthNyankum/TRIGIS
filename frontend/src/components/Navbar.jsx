import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import logo from "../assets/images/trigis.jpg";
import { HiMenu, HiX, HiAcademicCap } from "react-icons/hi";
import { navItems } from "../constants/navItems";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
                <p className="text-xs text-gray-600 -mt-1 font-inter font-medium">
                  CONSULT
                </p>
              </div>
            </NavLink>

            {/* Desktop Nav */}
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

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <NavLink
                to="/courses"
                className="relative text-white px-6 py-2.5 rounded-xl text-sm font-semibold transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl font-inter overflow-hidden"
                style={{ backgroundImage: "var(--brand-gradient)" }}
              >
                <span className="relative z-10">Start Learning</span>
              </NavLink>
            </div>

            {/* Mobile Menu Btn */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-[var(--brand-purple)] hover:bg-gray-100 transition-all duration-200 hover:scale-105"
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>

          {/* Mobile Nav */}
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

      {/* Spacer */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;
