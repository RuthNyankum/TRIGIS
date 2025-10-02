// src/constants/aboutData.js
import {
  FaUsers,
  FaShieldAlt,
  FaRocket,
  FaAward,
  FaHandsHelping,
  FaGraduationCap,
  FaSyncAlt,
  FaPen,
  FaBriefcase,
  FaStar,
} from "react-icons/fa";

export const companyValues = [
  {
    icon: FaShieldAlt,
    title: "Integrity",
    description:
      "We deliver honest, original, and plagiarism-free work while upholding ethical standards in every project.",
    color: "text-yellow-500",
  },
  {
    icon: FaAward,
    title: "Excellence",
    description:
      "We pursue the highest quality in research, writing, and presentation to exceed client expectations.",
    color: "text-blue-500",
  },
  {
    icon: FaHandsHelping,
    title: "Customer-Centered Service",
    description:
      "We prioritize clear communication and tailor our solutions to meet each client’s unique goals.",
    color: "text-purple-500",
  },
  {
    icon: FaSyncAlt,
    title: "Continuous Improvement",
    description:
      "We continuously refine our processes, skills, and tools to stay current and deliver better results.",
    color: "text-green-500",
  },
];

export const milestones = [
  {
    year: "2019",
    event: "TRIGIS Consult Founded",
    description:
      "Started with a mission to support students and professionals with high-quality writing services.",
  },
  {
    year: "2020",
    event: "First 100 Successful Projects",
    description:
      "Delivered academic and professional documents across diploma and undergraduate programs.",
  },
  {
    year: "2021",
    event: "Expanded Services",
    description:
      "Introduced thesis, dissertation, and research proposal assistance for postgraduate clients.",
  },
  {
    year: "2022",
    event: "500+ Projects Completed",
    description:
      "Achieved a reputation for excellence in academic and professional writing solutions.",
  },
  {
    year: "2023",
    event: "Regional Growth",
    description:
      "Extended support to clients across West Africa, empowering students and professionals alike.",
  },
  {
    year: "2024",
    event: "Recognized for Quality",
    description:
      "Acknowledged by clients and partners for delivering reliable, plagiarism-free, and impactful work.",
  },
];

export const ceoAchievements = [
  {
    icon: FaGraduationCap,
    title: "Master's in Communications",
    description: "University of Ghana",
  },
  {
    icon: FaPen,
    title: "Published Author",
    description: "5+ business writing guides",
  },
  {
    icon: FaAward,
    title: "Industry Awards",
    description: "Top 40 Under 40 Entrepreneurs",
  },
  {
    icon: FaBriefcase,
    title: "Speaking Engagements",
    description: "50+ conferences and workshops",
  },
];

export const stats = [
  { number: "500+", label: "Happy Clients", icon: FaUsers },
  { number: "1000+", label: "Projects Delivered", icon: FaRocket },
  { number: "98%", label: "Client Retention", icon: FaStar },
  { number: "5+", label: "Years Experience", icon: FaAward },
];
