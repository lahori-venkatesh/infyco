import type { Mentor } from "./types";

// Helper function to generate reviews
const generateReviews = (count: number = 3) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `review-${i + 1}`,
    author: `Mentee ${i + 1}`,
    rating: 4 + Math.random(),
    date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
    content: "Great mentoring session! Learned a lot about system design and best practices.",
    authorImage: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
  }));
};

// Helper function to generate resources
const generateResources = (specialty: string) => [
  {
    id: "res-1",
    title: `Essential ${specialty} Course`,
    type: "video" as const,
    url: "https://youtube.com",
    description: `Comprehensive guide to ${specialty} fundamentals and advanced concepts.`
  },
  {
    id: "res-2",
    title: `${specialty} Best Practices`,
    type: "article" as const,
    url: "https://medium.com",
    description: `Learn industry best practices for ${specialty} development.`
  }
];

// Helper function to generate career history
const generateCareerHistory = (company: string, role: string) => [
  {
    role,
    company,
    duration: "2020 - Present",
    description: "Leading technical initiatives and mentoring junior developers.",
    current: true
  },
  {
    role: `Senior ${role}`,
    company: "Previous Tech Corp",
    duration: "2018 - 2020",
    description: "Developed scalable solutions and improved system performance.",
    current: false
  }
];

export const mentorsData: Mentor[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
    profession: "Senior Frontend Engineer",
    company: "Google",
    rating: 4.9,
    category: "engineering",
    subcategory: "frontend",
    skills: ["React", "TypeScript", "Next.js", "Performance Optimization", "Web Accessibility"],
    description: "Frontend specialist with expertise in React and modern web technologies.",
    availability: ["Monday Wednesday Friday", "9:00 AM - 5:00 PM"],
    sessionRate: "₹1999/hour",
    languages: ["English", "Spanish"],
    experience: "8+ years",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    website: "https://sarahjohnson.dev",
    email: "sarah.j@example.com",
    specializations: ["Frontend Architecture", "Performance", "Accessibility"],
    achievements: ["Led Google's frontend team", "Created accessibility guidelines", "Tech conference speaker"],
    location: "San Francisco, CA",
    careerHistory: generateCareerHistory("Google", "Senior Frontend Engineer"),
    reviews: generateReviews(),
    resources: generateResources("Frontend Development"),
    minutesMentored: 1234,
    totalMentees: 89
  },
  // Add more mentors with similar detailed data...
];