// Mock data for Ululato LMS

export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  students: number;
  courses: number;
  rating: number;
}

export interface Lecture {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl?: string;
}

export interface Section {
  id: string;
  title: string;
  lectures: Lecture[];
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Question {
  id: string;
  userName: string;
  userAvatar: string;
  question: string;
  date: string;
  answers: {
    id: string;
    userName: string;
    userAvatar: string;
    answer: string;
    date: string;
    isInstructor: boolean;
  }[];
}

export interface Course {
  id: string;
  title: string;
  instructor: Instructor;
  thumbnail: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  studentCount: number;
  duration: string;
  level: string;
  category: string;
  isBestseller: boolean;
  isNew: boolean;
  sections: Section[];
  reviews: Review[];
  questions: Question[];
  whatYouWillLearn: string[];
}

export interface CartItem {
  courseId: string;
  course: Course;
}

// Instructors
export const instructors: Instructor[] = [
  {
    id: "1",
    name: "Dr. Sarah Martinez",
    title: "Business Strategy Expert",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    bio: "Former McKinsey consultant with 15+ years of experience in corporate strategy and business transformation.",
    students: 125000,
    courses: 12,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Alex Chen",
    title: "Senior UX Designer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    bio: "Lead designer at top tech companies. Specializing in user-centered design and design systems.",
    students: 98000,
    courses: 8,
    rating: 4.9,
  },
  {
    id: "3",
    name: "Prof. Michael Johnson",
    title: "Data Science Professor",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    bio: "PhD in Computer Science. Teaching data science and machine learning at Stanford University.",
    students: 210000,
    courses: 15,
    rating: 4.7,
  },
  {
    id: "4",
    name: "Emma Williams",
    title: "Digital Marketing Strategist",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    bio: "Helped 500+ businesses grow their online presence. Expert in SEO, content marketing, and social media.",
    students: 87000,
    courses: 10,
    rating: 4.8,
  },
];

// Courses
export const courses: Course[] = [
  {
    id: "1",
    title: "Business Strategy Masterclass: From Zero to Market Leader",
    instructor: instructors[0],
    thumbnail: "/images/course-thumb-business.png",
    description: "Master the art of business strategy with proven frameworks used by Fortune 500 companies. Learn how to analyze markets, identify opportunities, and create winning strategies that drive sustainable growth.",
    price: 89.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviewCount: 12453,
    studentCount: 125000,
    duration: "24 hours",
    level: "Intermediate",
    category: "Business",
    isBestseller: true,
    isNew: false,
    whatYouWillLearn: [
      "Develop comprehensive business strategies using proven frameworks",
      "Analyze competitive landscapes and identify market opportunities",
      "Create actionable strategic plans for sustainable growth",
      "Master Porter's Five Forces, SWOT, and Blue Ocean Strategy",
      "Lead strategic initiatives and drive organizational change",
    ],
    sections: [
      {
        id: "s1",
        title: "Introduction to Strategic Thinking",
        lectures: [
          { id: "l1", title: "Welcome to the Course", duration: "5:30", completed: true },
          { id: "l2", title: "What is Business Strategy?", duration: "12:45", completed: true },
          { id: "l3", title: "The Strategic Planning Process", duration: "18:20", completed: false },
        ],
      },
      {
        id: "s2",
        title: "Market Analysis & Competitive Intelligence",
        lectures: [
          { id: "l4", title: "Understanding Your Market", duration: "22:15", completed: false },
          { id: "l5", title: "Porter's Five Forces Framework", duration: "25:40", completed: false },
          { id: "l6", title: "Competitive Analysis Techniques", duration: "19:30", completed: false },
        ],
      },
      {
        id: "s3",
        title: "Strategic Frameworks & Tools",
        lectures: [
          { id: "l7", title: "SWOT Analysis Deep Dive", duration: "16:50", completed: false },
          { id: "l8", title: "Blue Ocean Strategy", duration: "28:15", completed: false },
          { id: "l9", title: "BCG Matrix & Portfolio Management", duration: "21:00", completed: false },
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        userName: "John Davis",
        userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop",
        rating: 5,
        date: "2024-01-15",
        comment: "This course completely transformed how I approach business strategy. Dr. Martinez explains complex concepts in a clear, actionable way. Highly recommended!",
      },
      {
        id: "r2",
        userName: "Lisa Thompson",
        userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop",
        rating: 5,
        date: "2024-01-10",
        comment: "Best business strategy course I've taken. The frameworks are immediately applicable to real-world scenarios.",
      },
    ],
    questions: [
      {
        id: "q1",
        userName: "Mark Wilson",
        userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop",
        question: "How do I apply Porter's Five Forces to a startup environment?",
        date: "2024-01-18",
        answers: [
          {
            id: "a1",
            userName: "Dr. Sarah Martinez",
            userAvatar: instructors[0].avatar,
            answer: "Great question! For startups, focus on the threat of new entrants and bargaining power of customers. These are typically the most relevant forces in early-stage companies. I'll cover this in detail in the next module.",
            date: "2024-01-18",
            isInstructor: true,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Complete UI/UX Design Mastery: From Figma to Production",
    instructor: instructors[1],
    thumbnail: "/images/course-thumb-design.png",
    description: "Become a professional UI/UX designer. Learn user research, wireframing, prototyping, and design systems. Master Figma and create stunning interfaces that users love.",
    price: 79.99,
    originalPrice: 179.99,
    rating: 4.9,
    reviewCount: 8932,
    studentCount: 98000,
    duration: "32 hours",
    level: "All Levels",
    category: "Design",
    isBestseller: true,
    isNew: true,
    whatYouWillLearn: [
      "Master Figma and professional design tools",
      "Conduct user research and create user personas",
      "Design beautiful, functional user interfaces",
      "Build comprehensive design systems",
      "Create interactive prototypes and animations",
    ],
    sections: [
      {
        id: "s1",
        title: "Foundations of UX Design",
        lectures: [
          { id: "l1", title: "Introduction to UX Design", duration: "8:15", completed: false },
          { id: "l2", title: "User Research Methods", duration: "15:30", completed: false },
          { id: "l3", title: "Creating User Personas", duration: "12:45", completed: false },
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Sophie Anderson",
        userAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop",
        rating: 5,
        date: "2024-01-20",
        comment: "Alex is an incredible instructor! The course is well-structured and packed with practical examples.",
      },
    ],
    questions: [],
  },
  {
    id: "3",
    title: "Data Science & Machine Learning A-Z: Python Edition",
    instructor: instructors[2],
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    description: "Complete data science bootcamp. Learn Python, statistics, machine learning, deep learning, and deploy real-world AI models.",
    price: 94.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviewCount: 15678,
    studentCount: 210000,
    duration: "45 hours",
    level: "Beginner",
    category: "Data Science",
    isBestseller: true,
    isNew: false,
    whatYouWillLearn: [
      "Master Python for data science",
      "Build machine learning models from scratch",
      "Work with real datasets and solve business problems",
      "Deploy AI models to production",
    ],
    sections: [],
    reviews: [],
    questions: [],
  },
  {
    id: "4",
    title: "Digital Marketing Mastery: SEO, Social Media & Content",
    instructor: instructors[3],
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
    description: "Complete digital marketing course covering SEO, content marketing, social media, email marketing, and analytics.",
    price: 69.99,
    originalPrice: 149.99,
    rating: 4.8,
    reviewCount: 6543,
    studentCount: 87000,
    duration: "28 hours",
    level: "Beginner",
    category: "Marketing",
    isBestseller: false,
    isNew: true,
    whatYouWillLearn: [
      "Master SEO and rank on Google",
      "Create viral social media campaigns",
      "Build effective content marketing strategies",
      "Analyze and optimize marketing performance",
    ],
    sections: [],
    reviews: [],
    questions: [],
  },
  {
    id: "5",
    title: "Full-Stack Web Development: React, Node.js & MongoDB",
    instructor: instructors[1],
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
    description: "Build modern web applications from scratch. Learn React, Node.js, Express, MongoDB, and deploy to production.",
    price: 84.99,
    originalPrice: 189.99,
    rating: 4.8,
    reviewCount: 9876,
    studentCount: 105000,
    duration: "38 hours",
    level: "Intermediate",
    category: "Development",
    isBestseller: true,
    isNew: false,
    whatYouWillLearn: [
      "Build full-stack applications with React and Node.js",
      "Master MongoDB and database design",
      "Implement authentication and authorization",
      "Deploy applications to cloud platforms",
    ],
    sections: [],
    reviews: [],
    questions: [],
  },
  {
    id: "6",
    title: "Financial Analysis & Investment Banking",
    instructor: instructors[0],
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop",
    description: "Master financial modeling, valuation, and investment banking. Learn Excel, DCF, LBO models, and M&A analysis.",
    price: 99.99,
    originalPrice: 219.99,
    rating: 4.9,
    reviewCount: 4321,
    studentCount: 62000,
    duration: "35 hours",
    level: "Advanced",
    category: "Finance",
    isBestseller: false,
    isNew: false,
    whatYouWillLearn: [
      "Build sophisticated financial models",
      "Perform company valuations using DCF and comparable analysis",
      "Understand M&A transactions and LBO modeling",
      "Master Excel for financial analysis",
    ],
    sections: [],
    reviews: [],
    questions: [],
  },
];

// User data
export const currentUser = {
  id: "user1",
  name: "Carlos Rodriguez",
  email: "carlos@example.com",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
  enrolledCourses: ["1", "2"],
  wishlist: ["3", "4"],
  cart: [] as string[],
};

// Instructor earnings data (for dashboard)
export const instructorEarnings = {
  total: 125430,
  thisMonth: 12540,
  lastMonth: 11230,
  chartData: [
    { month: "Jan", earnings: 8500 },
    { month: "Feb", earnings: 9200 },
    { month: "Mar", earnings: 10100 },
    { month: "Apr", earnings: 11230 },
    { month: "May", earnings: 12540 },
  ],
};
