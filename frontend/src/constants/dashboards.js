////// ADMIN DASHBOARD /////

export const statsData = {
  totalStudents: 1247,
  activeCourses: 32,
  revenue: 45680,
  enrollments: 3521,
};

export const recentActivityData = [
  {
    id: 1,
    type: "enrollment",
    message: "New enrollment in Advanced JavaScript",
    time: "5 min ago",
    user: "John Doe",
  },
  {
    id: 2,
    type: "course",
    message: 'Course "React Mastery" published',
    time: "1 hour ago",
    user: "Admin",
  },
  {
    id: 3,
    type: "student",
    message: "New student registration",
    time: "2 hours ago",
    user: "Jane Smith",
  },
  {
    id: 4,
    type: "payment",
    message: "Payment received - $299",
    time: "3 hours ago",
    user: "Mike Johnson",
  },
];

export const topCoursesData = [
  {
    id: 1,
    title: "Business Plan Writing",
    students: 410,
    revenue: 12200,
    rating: 4.9,
  },
  {
    id: 2,
    title: "Research Proposal Writing",
    students: 365,
    revenue: 10950,
    rating: 4.8,
  },
  {
    id: 3,
    title: "Thesis & Dissertation Support",
    students: 298,
    revenue: 8940,
    rating: 4.7,
  },
  {
    id: 4,
    title: "Data Analysis & Interpretation",
    students: 257,
    revenue: 7710,
    rating: 4.8,
  },
];

export const alertsData = [
  {
    id: 1,
    type: "warning",
    message: "Server maintenance scheduled for tonight",
    priority: "high",
  },
  {
    id: 2,
    type: "info",
    message: "5 courses pending approval",
    priority: "medium",
  },
];

export const monthlyDataChart = [
  { month: "Jan", students: 180, revenue: 5400 },
  { month: "Feb", students: 220, revenue: 6600 },
  { month: "Mar", students: 280, revenue: 8400 },
  { month: "Apr", students: 320, revenue: 9600 },
];

////// STUDENT DASHBOARD /////

export const studentStats = {
  enrolledCourses: 5,
  completedCourses: 2,
  achievements: 12,
  studyHours: 47,
};

export const currentCoursesData = [
  {
    id: 1,
    title: "Advanced JavaScript",
    progress: 75,
    nextLesson: "Async/Await Patterns",
    hours: 12,
  },
  {
    id: 2,
    title: "React Fundamentals",
    progress: 60,
    nextLesson: "State Management",
    hours: 8,
  },
  {
    id: 3,
    title: "UI/UX Design",
    progress: 40,
    nextLesson: "Color Theory",
    hours: 5,
  },
];

export const recentAchievementsData = [
  {
    id: 1,
    title: "Quick Learner",
    description: "Complete 5 lessons in one day",
    date: "2 days ago",
  },
  {
    id: 2,
    title: "Perfect Score",
    description: "Score 100% on a quiz",
    date: "1 week ago",
  },
];

export const upcomingDeadlinesData = [
  {
    id: 1,
    course: "Advanced JavaScript",
    task: "Final Project",
    dueDate: "3 days",
    urgent: true,
  },
  {
    id: 2,
    course: "React Fundamentals",
    task: "Quiz 5",
    dueDate: "1 week",
    urgent: false,
  },
];
