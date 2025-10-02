import {
  FaGraduationCap,
  FaFileAlt,
  FaSearch,
  FaPen,
  FaUserTie,
  FaBook,
  FaCheckCircle,
  FaUsers,
  FaAward,
  FaChartLine,
  FaEdit,
  FaDatabase,
} from "react-icons/fa";

export const services = [
  {
    id: "academic-writing",
    icon: FaGraduationCap,
    title: "Academic Writing Services",
    subtitle: "Professional academic support",
    description:
      "Comprehensive academic writing assistance for students and professionals across all levels.",
    features: [
      "Academic & Professional CVs",
      "Application Letters",
      "Statement of Purpose",
      "Scholarship Essays",
      "Assignment Assistance",
      "Plagiarism Checking",
    ],
    deliveryTime: "1-5 days",
    bgGradient: "from-blue-500 to-blue-700",
    detailedDescription:
      "Our academic writing services provide comprehensive support for students and professionals. From crafting compelling CVs to writing persuasive scholarship essays, we ensure your academic documents meet the highest standards and help you achieve your educational goals.",
    subServices: [
      "Academic and Professional CVs",
      "Application Letters",
      "Academic Statement of Purpose",
      "Visa Statement of Purpose",
      "Scholarship Essays",
      "Assignment Assistance",
    ],
  },
  {
    id: "research-services",
    icon: FaSearch,
    title: "Research & Project Services",
    subtitle: "Expert research and analysis",
    description:
      "Professional research, data analysis, and project writing services for academic and business needs.",
    features: [
      "Research Proposals",
      "Literature Reviews",
      "Data Analysis",
      "Thesis/Dissertation Writing",
      "Project Work Writing",
      "Business Plan Development",
    ],
    deliveryTime: "3-14 days",
    bgGradient: "from-green-500 to-green-700",
    detailedDescription:
      "Our research services combine academic rigor with practical application. Whether you need a comprehensive literature review or statistical data analysis, our expert team delivers high-quality research that meets academic and professional standards. We specialize in transforming complex data into actionable insights and crafting compelling business plans that attract investors and drive growth.",
    subServices: [
      "Research Proposals",
      "Project Work Writing",
      "Thesis/Dissertation Writing",
      "Literature Reviews",
      "Business Plan Writing",
      "Data Analysis (SPSS, Excel, R, Python)",
      "Statistical Analysis & Interpretation",
      "Market Research & Analysis",
      "Financial Projections & Modeling",
      "Executive Summary Development",
    ],
    specializations: [
      {
        title: "Business Plan Writing",
        description:
          "Comprehensive business plans that secure funding and guide strategic growth. We create investor-ready documents with detailed market analysis, financial projections, and operational strategies tailored to your industry.",
        includes: [
          "Executive Summary",
          "Market Analysis & Competition",
          "Financial Projections (3-5 years)",
          "Marketing & Sales Strategy",
          "Operations & Management Plan",
          "Risk Assessment & Mitigation",
        ],
      },
      {
        title: "Data Analysis",
        description:
          "Professional statistical analysis and data interpretation using industry-standard tools. We help you make data-driven decisions through comprehensive analysis, visualization, and reporting.",
        includes: [
          "Descriptive & Inferential Statistics",
          "Regression Analysis",
          "ANOVA & T-Tests",
          "Data Visualization & Charts",
          "SPSS, Excel, R, Python Analysis",
          "Interpretation & Reporting",
        ],
      },
    ],
  },
  {
    id: "content-quality",
    icon: FaCheckCircle,
    title: "Content Quality Services",
    subtitle: "Ensuring originality and excellence",
    description:
      "Professional editing, plagiarism checking, and content improvement services.",
    features: [
      "Plagiarism Detection",
      "AI Content Checking",
      "Paraphrasing/Rewriting",
      "Proofreading & Editing",
      "Content Optimization",
      "Quality Assurance",
    ],
    deliveryTime: "1-3 days",
    bgGradient: "from-purple-500 to-purple-700",
    detailedDescription:
      "Our content quality services ensure your work meets the highest standards of originality and clarity. We use advanced tools and expert knowledge to check, improve, and optimize your content for maximum impact.",
    subServices: [
      "Plagiarism and AI Checking",
      "Paraphrasing/Rewriting",
      "Proofreading & Editing",
      "Content Optimization",
    ],
  },
  {
    id: "specialized-writing",
    icon: FaFileAlt,
    title: "Specialized Writing",
    subtitle: "Custom writing solutions",
    description:
      "Tailored writing services for specific needs including visa documents and sponsorship letters.",
    features: [
      "Visa Applications",
      "Sponsorship Letters",
      "Legal Documents",
      "Business Correspondence",
      "Technical Writing",
      "Grant Proposals",
    ],
    deliveryTime: "2-7 days",
    bgGradient: "from-red-500 to-red-700",
    detailedDescription:
      "Our specialized writing services address unique document needs with precision and expertise. From visa applications to sponsorship letters, we craft documents that meet specific requirements and increase your chances of success.",
    subServices: [
      "Visa Statement of Purpose",
      "Sponsorship Letters",
      "Legal Document Drafting",
      "Business Correspondence",
    ],
  },

  {
    id: "business-plan",
    icon: FaChartLine,
    title: "Business Plan Writing",
    subtitle: "Investor-ready strategic plans",
    description:
      "Professional business plan development tailored to your industry and growth goals.",
    features: [
      "Executive Summary",
      "Market & Competitor Analysis",
      "Financial Projections (3-5 years)",
      "Marketing & Sales Strategy",
      "Operations & Management Plan",
      "Risk Assessment & Mitigation",
    ],
    deliveryTime: "5-14 days",
    bgGradient: "from-amber-500 to-orange-700",
    detailedDescription:
      "Our business plan writing service creates comprehensive, investor-ready documents that secure funding and guide your strategic growth. Each plan is tailored to your industry with in-depth market research, detailed financial projections, and a clear roadmap for success.",
    subServices: [
      "Investor Pitch Decks",
      "Market Analysis Reports",
      "Financial Projections & Modeling",
      "Operational Strategy Documentation",
    ],
  },

  {
    id: "data-analysis",
    icon: FaDatabase,
    title: "Data Analysis Services",
    subtitle: "Turn data into actionable insights",
    description:
      "Expert statistical analysis and reporting using industry-standard tools and techniques.",
    features: [
      "Descriptive & Inferential Statistics",
      "Regression Analysis",
      "ANOVA & T-Tests",
      "Hypothesis Testing",
      "Data Visualization & Dashboards",
      "SPSS, Excel, R, Python Analysis",
    ],
    deliveryTime: "2-10 days",
    bgGradient: "from-teal-500 to-teal-700",
    detailedDescription:
      "Our data analysis services help you transform raw data into meaningful insights. Using SPSS, R, Python, and Excel, we perform advanced statistical analysis, create clear visualizations, and provide detailed reports to support academic and business decision-making.",
    subServices: [
      "Statistical Modeling",
      "Data Visualization & Charts",
      "Survey Data Analysis",
      "Experimental Design & Analysis",
      "Custom Python/R Scripts",
    ],
  },
];
export const processSteps = [
  {
    step: "01",
    title: "Consultation & Brief",
    description:
      "We start by understanding your specific requirements, deadlines, and expectations through detailed consultation.",
    icon: FaUsers,
  },
  {
    step: "02",
    title: "Research & Planning",
    description:
      "Our team conducts thorough research and develops a customized approach tailored to your academic or professional needs.",
    icon: FaSearch,
  },
  {
    step: "03",
    title: "Writing & Development",
    description:
      "We create high-quality, original content that meets academic standards and aligns with your specific requirements.",
    icon: FaEdit, // use FaEdit here instead of FaPen
  },
  {
    step: "04",
    title: "Quality Check & Delivery",
    description:
      "Every document undergoes rigorous quality assurance, plagiarism checking, and formatting before delivery.",
    icon: FaAward,
  },
];

export const testimonials = [
  {
    name: "Kwame Asante",
    company: "University of Ghana",
    role: "PhD Student",
    content:
      "TRIGIS helped me craft a compelling statement of purpose that got me accepted into my dream program. Their attention to detail was exceptional.",
    rating: 5,
  },
  {
    name: "Akosua Mensah",
    company: "KNUST Graduate",
    role: "International Student",
    content:
      "The visa statement of purpose they wrote for me was perfect. I got my visa approved on the first try. Highly recommended!",
    rating: 5,
  },
  {
    name: "Emmanuel Osei",
    company: "Tech Professional",
    role: "Software Engineer",
    content:
      "My professional CV was transformed completely. I started getting interview calls within a week of updating my CV.",
    rating: 5,
  },
];

export const homeServices = [
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
