// src/constants/footer.js

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export const services = [
  { name: "Content Quality Services", href: "/services/content-quality" },
  { name: "Specialized Writing", href: "/services/specialized-writing" },
  { name: "Business Plan Writing", href: "/services/business-plan" },
  { name: "Data Analysis Services", href: "/services/data-analysis" },
  { name: "Academic Writing", href: "/services/academic-writing" },
  { name: "Research & Project", href: "/services/research-services" },
];

export const courses = [
  { name: "Freelance Writing Mastery", href: "/courses/freelance-mastery" },
  { name: "Copywriting Fundamentals", href: "/courses/copywriting-101" },
  { name: "Content Marketing Blueprint", href: "/courses/content-marketing" },
  { name: "SEO Writing Course", href: "/courses/seo-writing" },
  { name: "Email Marketing Mastery", href: "/courses/email-marketing" },
];

export const quickLinks = [
  { name: "About Us", href: "/about-us" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact-us" },
];

export const socialLinks = [
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
