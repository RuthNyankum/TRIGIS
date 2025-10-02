// constants.js
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  // FaPen,
  FaBookOpen,
  FaLaptop,
  FaChartLine,
  FaGraduationCap,
  FaFileAlt,
  FaSearch,
  FaCheckCircle,
  FaPen,
  FaUserTie,
  FaBook,
  // FaChartLine,
} from "react-icons/fa";

// import {
//   FaGraduationCap,
//   FaFileAlt,
//   FaSearch,
//   FaCheckCircle,
//   FaPen,
//   FaUserTie,
//   FaBook,
//   FaChartLine,
// } from "react-icons/fa";

// Words
export const WORDS = [
  "Content Strategy",
  "Digital Marketing",
  "Brand Storytelling",
  "Course Development",
  "Business Writing",
];

// Social links
export const SOCIAL_LINKS = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
];

// Floating icons
export const FLOATING_ICONS = [
  { icon: FaPen, position: "top-20 left-10", delay: "0s" },
  { icon: FaBookOpen, position: "top-32 right-16", delay: "0.5s" },
  { icon: FaLaptop, position: "bottom-40 left-20", delay: "1s" },
  { icon: FaChartLine, position: "bottom-20 right-10", delay: "1.5s" },
];

// Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "TechStart Solutions",
    role: "CEO",
    image: "👩‍💼",
    rating: 5,
    text: "TRIGIS Consult transformed our content strategy completely. Their team's expertise in digital marketing helped us increase our lead generation by 300% in just 6 months.",
    results: "300% increase in leads",
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "Growth Dynamics",
    role: "Marketing Director",
    image: "👨‍💻",
    rating: 5,
    text: "The course development services exceeded our expectations. They created engaging learning materials that improved our training completion rates by 85%.",
    results: "85% better completion rates",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    company: "Brand Innovators",
    role: "Creative Director",
    image: "👩‍🎨",
    rating: 5,
    text: "Outstanding brand storytelling services! They helped us craft a compelling narrative that resonated with our audience and increased brand engagement significantly.",
    results: "Significant engagement boost",
  },
  {
    id: 4,
    name: "David Thompson",
    company: "Scale Up Ventures",
    role: "Founder",
    image: "👨‍💼",
    rating: 5,
    text: "Professional, reliable, and results-driven. TRIGIS Consult's business writing services helped us secure major partnerships and funding opportunities.",
    results: "Major partnerships secured",
  },
];

// Process Steps
export const PROCESS_STEPS = [
  {
    number: "01",
    icon: "FaSearch",
    title: "Discovery & Analysis",
    description:
      "We dive deep into your business, audience, and current content to identify opportunities and gaps.",
    details: [
      "Business goals assessment",
      "Audience research",
      "Competitor analysis",
      "Content audit",
    ],
  },
  {
    number: "02",
    icon: "FaLightbulb",
    title: "Strategy Development",
    description:
      "Based on our findings, we create a comprehensive content strategy tailored to your objectives.",
    details: [
      "Content strategy roadmap",
      "Brand voice guidelines",
      "Content calendar",
      "KPI framework",
    ],
  },
  {
    number: "03",
    icon: "FaCogs",
    title: "Content Creation",
    description:
      "Our expert team brings your strategy to life with high-quality, engaging content across all channels.",
    details: [
      "Professional writing",
      "Visual content",
      "SEO optimization",
      "Brand consistency",
    ],
  },
  {
    number: "04",
    icon: "FaRocket",
    title: "Launch & Distribution",
    description:
      "We deploy your content across the right channels at optimal times for maximum impact.",
    details: [
      "Multi-channel publishing",
      "Timing optimization",
      "Cross-platform integration",
      "Audience targeting",
    ],
  },
  {
    number: "05",
    icon: "FaChartLine",
    title: "Monitor & Optimize",
    description:
      "Continuous monitoring and data-driven optimization ensure your content delivers measurable results.",
    details: [
      "Performance tracking",
      "A/B testing",
      "Analytics reporting",
      "Strategy refinement",
    ],
  },
  {
    number: "06",
    icon: "FaUsers",
    title: "Scale & Support",
    description:
      "We help you scale successful content initiatives and provide ongoing support for sustained growth.",
    details: [
      "Team training",
      "Process documentation",
      "Ongoing consultation",
      "Growth planning",
    ],
  },
];

// FAQs
export const FAQS = [
  {
    question:
      "What makes TRIGIS Consult different from other content agencies?",
    answer:
      "We combine strategic thinking with creative execution, backed by data-driven insights. Our team has 5+ years of proven experience delivering measurable results for 500+ clients across various industries. We don't just create content – we build comprehensive strategies that drive business growth.",
  },
  {
    question:
      "How long does it take to see results from your content strategy?",
    answer:
      "Most clients start seeing initial improvements within 30-60 days, with significant results typically emerging after 3-6 months. However, the timeline varies based on your industry, current position, and goals. We provide monthly progress reports to track your success metrics.",
  },
  {
    question: "Do you work with businesses of all sizes?",
    answer:
      "Yes! We work with startups, small businesses, and enterprise companies. Our flexible approach allows us to scale our services to match your needs and budget. Whether you need a complete content overhaul or specific project support, we can help.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We have experience across technology, healthcare, finance, e-commerce, education, and professional services. Our team's diverse background allows us to quickly understand industry-specific challenges and create targeted solutions.",
  },
  {
    question: "How do you measure the success of your content strategies?",
    answer:
      "We track key performance indicators specific to your goals, including lead generation, website traffic, engagement rates, conversion rates, and ROI. You'll receive detailed monthly reports with actionable insights and recommendations for continued improvement.",
  },
  {
    question: "Can you help with both content creation and strategy?",
    answer:
      "Absolutely! We offer end-to-end content solutions, from initial strategy development to content creation, distribution, and performance optimization. Our holistic approach ensures consistency and maximum impact across all your content initiatives.",
  },
  {
    question: "What is your typical project timeline?",
    answer:
      "Project timelines vary based on scope and complexity. Strategy development typically takes 2-3 weeks, while ongoing content creation follows agreed schedules. We'll provide a detailed timeline during our initial consultation based on your specific requirements.",
  },
  {
    question: "Do you provide training for our internal team?",
    answer:
      "Yes! We offer comprehensive training programs and workshops to upskill your internal team. This includes content strategy workshops, writing training, and ongoing support to ensure your team can maintain and build upon our initial work.",
  },
];

export const services = [
  {
    icon: FaUserTie,
    title: "Academic and Professional CVs",
    description:
      "Expertly crafted resumes for academic and professional settings",
  },
  {
    icon: FaFileAlt,
    title: "Application Letters",
    description: "Well-written letters to accompany your applications",
  },
  {
    icon: FaGraduationCap,
    title: "Academic Statement of Purpose",
    description: "Personalized essays for university applications",
  },
  {
    icon: FaFileAlt,
    title: "Visa Statement of Purpose",
    description: "Professional statements for visa applications",
  },
  {
    icon: FaPen,
    title: "Sponsorship Letters",
    description: "Compelling letters for sponsorship requests",
  },
  {
    icon: FaBook,
    title: "Scholarship Essays",
    description: "Winning essays for scholarship applications",
  },
  {
    icon: FaChartLine,
    title: "Business Plan Writing",
    description: "Professional business plan development",
  },
  {
    icon: FaSearch,
    title: "Research Proposal",
    description: "Detailed research plans and methodologies",
  },
  {
    icon: FaPen,
    title: "Project Work Writing",
    description: "Comprehensive academic project writing",
  },
  {
    icon: FaBook,
    title: "Thesis/Dissertation Writing",
    description: "Expert support for advanced degree projects",
  },
  {
    icon: FaCheckCircle,
    title: "Plagiarism and AI Checking",
    description: "Ensuring originality and authenticity",
  },
  {
    icon: FaPen,
    title: "Paraphrasing/Rewriting",
    description: "Content rewriting for clarity and originality",
  },
  {
    icon: FaChartLine,
    title: "Data Analysis",
    description: "Statistical analysis and interpretation",
  },
  {
    icon: FaBook,
    title: "Literature Review",
    description: "In-depth analysis of existing research",
  },
  {
    icon: FaGraduationCap,
    title: "Assignment Assistance",
    description: "Support with academic assignments",
  },
];
