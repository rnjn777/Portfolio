// ===== PORTFOLIO DATA =====

export const personalInfo = {
  name: "Ranjan Kumar",
  tagline: "AI Engineer crafting intelligent software from ideas to production.",
  degree: "B.Tech CSE (AI)",
  email: "ranjan777work@gmail.com",
  linkedin: "https://www.linkedin.com/in/ranjan-kumar-10766b248/",
  github: "https://github.com/rnjn777",
  fiverr: "https://fiverr.com/ranjankumar",
  resumeUrl: "/resume.pdf",
};

export const socialProofBadges = [
  { icon: "🏆", label: "SIH 2025 Qualified" },
  { icon: "🥈", label: "Innovate'25 Runner-Up" },
  { icon: "📈", label: "Top 1% JEE Main" },
  { icon: "🎓", label: "NSUT Delhi" },
];

export const stats = [
  { value: 10, suffix: "+", label: "Projects Built" },
  { value: 2, suffix: "", label: "Internships" },
  { value: 5, suffix: "+", label: "Hackathons" },
  { value: 3, suffix: "", label: "Leadership Roles" },
  { value: 3, suffix: "+", label: "AI Projects" },
  { value: 50, suffix: "+", label: "Clients Served" },
];

export const aboutText = {
  intro:
    "I'm Ranjan Kumar — an AI Engineer and Full-Stack Developer studying B.Tech CSE (AI) at NSUT, Delhi. I build intelligent products that bridge the gap between cutting-edge AI research and real-world impact.",
  highlights: [
    "Passionate about building AI agents, LLM applications, and scalable web systems",
    "Hackathon-driven problem solver with multiple national-level wins",
    "Currently exploring Agentic AI, RAG pipelines, and multi-agent systems",
    "Co-Founder experience with startup-grade product thinking",
  ],
  currentlyLearning: [
    "LangGraph",
    "MCP",
    "Agentic AI",
    "RAG",
    "Vector Databases",
    "Docker",
    "Kubernetes",
    "AWS",
    "GCP",
    "CrewAI",
    "AutoGen",
    "LlamaIndex",
  ],
};

export const experience = [
  {
    role: "Fullstack and UI-UX Developer",
    company: "Hanyura",
    period: "June 1, 2026 — July 15, 2026",
    description:
      "Owned end-to-end engineering for an e-commerce platform, driving the product lifecycle from initial UI/UX prototypes to production deployment. Designed cinematic, responsive frontend interfaces utilizing glassmorphism. Architected a scalable backend using Firebase for secure authentication, real-time database operations, and persistent state management.",
    type: "work" as const,
  },
  {
    role: "AI & Software Development Intern",
    company: "Invontec Infosoft Pvt. Ltd. (Singapore)",
    period: "June 2025 — July 2025",
    description:
      "Built AI-assisted software solutions using Python and Generative AI concepts. Applied prompt engineering, text generation, and summarization using pre-trained language models. Integrated AI-generated outputs into automation workflows.",
    type: "work" as const,
  },
  {
    role: "Startups & Freelance Graphic Designer",
    company: "Self-Employed / Fiverr",
    period: "April 2022 — Present",
    description:
      "Delivered branding, thumbnails, and digital creatives for 50+ clients. Collaborated with startups on branding, content strategy, UI concepts, and digital marketing creatives.",
    type: "work" as const,
  },
  {
    role: "Co-Founder",
    company: "Elura",
    period: "2024 — Present",
    description:
      "Conceptualized and developed a gift-focused startup, contributing to product ideation, branding, and growth strategy.",
    type: "leadership" as const,
  },
  {
    role: "Creative and Operations Member",
    company: "GDG at NSUT Delhi",
    period: "2023 — Present",
    description:
      "Contributing to creative initiatives and operational workflows for Google Developers Group at NSUT Delhi.",
    type: "leadership" as const,
  },
  {
    role: "Social Media & PR Head",
    company: "SPIC MACAY NSUT",
    period: "2023 — Present",
    description:
      "Led outreach, promotions, and public engagement initiatives for a National-Level Cultural Society.",
    type: "leadership" as const,
  }
];

export const projects = [
  {
    title: "Hanyura E-Commerce Platform",
    description:
      "A premium, highly scalable e-commerce platform featuring cinematic frontend interfaces and robust real-time backend systems.",
    problem:
      "Modern e-commerce platforms often compromise between premium aesthetic design and scalable backend performance.",
    solution:
      "Owned end-to-end engineering, designing responsive glassmorphism interfaces while architecting a scalable Firebase backend for authentication, real-time data, and cart state management.",
    techStack: ["Next.js", "Firebase", "Tailwind CSS", "Framer Motion", "React"],
    features: [
      "Cinematic glassmorphism frontend interfaces",
      "Firebase auth & real-time database operations",
      "Persistent cart state management",
      "Aggressively optimized data fetching",
    ],
    liveUrl: "#",
    githubUrl: "#",
    image: null,
  },
  {
    title: "Urban Green Corridor Platform",
    description:
      "AI-powered spatial intelligence platform for urban sustainability and environmental impact forecasting.",
    problem:
      "Urban planning lacks real-time, data-driven insights for optimizing green corridor interventions.",
    solution:
      "Engineered a full-stack GIS platform. Integrated Google Gemini 2.0 Flash to develop an AI Urban Ecology Assistant. Implemented real-time environmental forecasting using Open-Meteo APIs.",
    techStack: ["Flask", "GeoPandas", "Leaflet.js", "Gemini 2.0 Flash", "Python"],
    features: [
      "AI Urban Ecology Assistant processing NLP queries",
      "Algorithmic scoring for greening interventions",
      "Real-time environmental forecasting (AQI, temperature)",
      "Full-stack GIS visualization",
    ],
    liveUrl: "#",
    githubUrl: "#",
    image: null,
  },
  {
    title: "KrishiQuest",
    description:
      "Designed a gamified digital platform to promote sustainable farming practices among small and marginal farmers.",
    problem:
      "Lack of accessible, engaging educational resources for farmers regarding sustainable practices.",
    solution:
      "Developed a mobile-first full-stack platform using React.js and Node.js with gamified learning (quizzes, challenges, rewards). Conceptualized an AI-assisted recommendation system.",
    techStack: ["React.js", "Node.js", "Tailwind CSS", "JavaScript", "HTML/CSS"],
    features: [
      "Gamified learning quizzes and challenges",
      "Reward mechanisms for farming practices",
      "AI-assisted personalized guidance",
      "Mobile-first design for low-spec devices",
    ],
    liveUrl: "#",
    githubUrl: "#",
    image: null,
  },
  {
    title: "House Price Prediction",
    description:
      "Machine learning pipeline for real-estate price prediction and model evaluation.",
    problem:
      "Real estate pricing relies on subjective analysis and lacks robust data-driven predictive modeling.",
    solution:
      "Built an end-to-end prediction workflow covering data ingestion, feature engineering, training, and evaluation. Applied hyperparameter tuning for generalization.",
    techStack: ["Python", "Pandas", "NumPy", "Scikit-learn"],
    features: [
      "Exploratory data analysis (EDA)",
      "Train-test splitting and performance metrics",
      "Hyperparameter tuning and model selection",
      "End-to-end ML prediction workflow",
    ],
    liveUrl: "#",
    githubUrl: "#",
    image: null,
  },
  {
    title: "Portfolio Website",
    description:
      "This very website — a premium dark futuristic portfolio built with Next.js, Tailwind CSS, and Framer Motion.",
    problem:
      "Generic portfolio templates don't communicate technical depth or design sensibility.",
    solution:
      "Designed and engineered a custom portfolio with cinematic animations, glassmorphism, and an immersive dark aesthetic.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
    features: [
      "Custom aurora mesh background",
      "Command palette (Ctrl+K)",
      "GSAP scroll animations",
      "Responsive glassmorphism design",
    ],
    liveUrl: "#",
    githubUrl: "#",
    image: null,
  },
];

export const techStack = [
  { category: "Languages", techs: ["Python", "C++", "C", "JavaScript", "SQL"] },
  { category: "GenAI & LLMs", techs: ["Generative AI", "Prompt Engineering", "Hugging Face", "Transformers", "LangChain", "RAG"] },
  { category: "ML Techniques", techs: ["Machine Learning", "Feature Engineering", "Data Preprocessing", "Model Evaluation", "Hyperparameter Tuning"] },
  { category: "Libraries", techs: ["Pandas", "NumPy", "Matplotlib", "Scikit-learn", "ChromaDB", "FAISS"] },
  { category: "Tools & Core CS", techs: ["Git", "GitHub", "Jupyter Notebook", "VS Code", "Data Structures", "Algorithms"] },
  { category: "Frontend", techs: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "HTML/CSS"] }
];

export const achievements = [
  {
    icon: "🌟",
    title: "India Innovates TOP 5",
    description: "Secured Top 5 in India's biggest hackathon",
    highlight: true,
  },
  {
    icon: "🥈",
    title: "Innovate'25 Hackathon Runner-Up",
    description: "Urban Green Corridor Interventions Platform",
    highlight: true,
  },
  {
    icon: "🏆",
    title: "SIH 2025 Qualified",
    description: "Gamification of Sustainable Farming (KrishiQuest)",
    highlight: true,
  },
  {
    icon: "🏅",
    title: "Hack4Delhi 4th Position",
    description: "Delhi's premier civic innovation hackathon",
    highlight: false,
  },
  {
    icon: "🌟",
    title: "Best Notion Project Winner",
    description: "Awarded at Notion AI Agents Workshop",
    highlight: true,
  },
  {
    icon: "📈",
    title: "Top 1% JEE Main",
    description: "Among top percentile in national engineering exam",
    highlight: false,
  },
];

export const certifications = [
  { name: "AI Fluency: Framework & Foundations", issuer: "Anthropic", year: "2024" },
  { name: "Building LLM Applications with Prompt Engineering", issuer: "NVIDIA", year: "2024" },
];

export const careerGoals = [
  "AI Engineering",
  "Full Stack Development",
  "Machine Learning",
  "Software Engineering",
  "Freelance AI Solutions",
];

export const currentlyBuilding = [
  { name: "Urban Green Corridor Platform", status: "active" as const },
  { name: "KrishiQuest Gamification", status: "active" as const },
  { name: "Next.js Portfolio", status: "complete" as const },
  { name: "LLM Projects", status: "active" as const },
  { name: "Open Source Contributions", status: "active" as const },
];

export const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const commandPaletteItems = [
  { label: "Home", href: "#hero", icon: "🏠" },
  { label: "About Me", href: "#about", icon: "👤" },
  { label: "Experience", href: "#experience", icon: "💼" },
  { label: "Projects", href: "#projects", icon: "🚀" },
  { label: "Tech Stack", href: "#skills", icon: "⚡" },
  { label: "Achievements", href: "#achievements", icon: "🏆" },
  { label: "GitHub Activity", href: "#github", icon: "📊" },
  { label: "Contact", href: "#contact", icon: "📧" },
  { label: "Resume", href: "/resume.pdf", icon: "📄", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ranjan-kumar-10766b248/", icon: "🔗", external: true },
  { label: "GitHub", href: "https://github.com/rnjn777", icon: "🐙", external: true },
];
