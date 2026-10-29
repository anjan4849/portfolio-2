/**
 * ====================================================================
 * PORTFOLIO DATA CONFIGURATION — ANJAN TRIPATHI
 * ====================================================================
 * This file contains all your personal information, links, skills,
 * projects, and education details.
 * 
 * TO UPDATE YOUR PORTFOLIO:
 * Simply edit the values in this file! The website will automatically
 * render your updated content without touching HTML or CSS.
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Anjan Tripathi",
    role: "Aspiring Software Developer",
    studentLabel: "Newton School of Technology | Tech Student",
    currentYear: "1st Year",
    institution: "Newton School of Technology",
    location: "Lucknow, India",
    statusText: "Open to Collaborations & Tech Internships",
    headline: "Building, Learning, and Creating with Technology.",
    shortBio: "I have strong foundational interests in Python and CSS. I love building practical software, crafting clean responsive web interfaces, and exploring artificial intelligence through hands-on experimentation.",
    longBio: [
      "I am currently a 1st-year technology student at Newton School of Technology, driven by a deep curiosity for how scalable software is architected and built. Rather than focusing solely on theoretical concepts, I believe in learning by actively writing code, debugging challenges, and shipping real projects.",
      "My current technical focus revolves around Python for backend logic, automation, and algorithmic problem-solving, paired with modern CSS and frontend technologies for crafting clean, accessible, and responsive user experiences.",
      "As I advance through my technology degree, I am continuously broadening my horizons across computer science foundations, web architecture, and emerging AI tools, preparing myself to build impactful, real-world software solutions."
    ],
    email: "anjantripathi.tech@gmail.com", // EDIT: Replace with your actual email
    github: "https://github.com/anjantripathi", // EDIT: Replace with your GitHub profile
    linkedin: "https://linkedin.com/in/anjantripathi", // EDIT: Replace with your LinkedIn profile
    resumeUrl: "#resume-modal", // Opens interactive resume modal
    avatarUrl: "assets/images/profile-avatar.svg"
  },

  careerInterests: [
    { title: "Software Development", desc: "Designing structured, maintainable software and automation utilities." },
    { title: "Web Development", desc: "Building responsive, modern, user-centric web applications with clean CSS." },
    { title: "Artificial Intelligence", desc: "Exploring machine learning concepts and AI-assisted engineering workflows." },
    { title: "Problem Solving", desc: "Strengthening core algorithmic thinking and data structure foundations." }
  ],

  highlights: [
    { number: "1st Year", label: "Newton School of Tech", sub: "Technology Degree" },
    { number: "Python & CSS", label: "Primary Focus", sub: "Logic & Aesthetics" },
    { number: "3+", label: "Practical Projects", sub: "Built from Scratch" },
    { number: "100%", label: "Curiosity & Grit", sub: "Continuous Learner" }
  ],

  skills: {
    programming: [
      { name: "Python", level: "Core Focus", icon: "🐍", note: "Object-Oriented Programming, Scripting, Automation, Logic" },
      { name: "CSS3 / Modern CSS", level: "Core Focus", icon: "🎨", note: "Flexbox, CSS Grid, Custom Properties, Keyframe Animations, Glassmorphism" },
      { name: "JavaScript (ES6+)", level: "Working Knowledge", icon: "⚡", note: "DOM Manipulation, Event Handling, Modern ES Modules, Fetch API" },
      { name: "HTML5 Semantic", level: "Proficient", icon: "📄", note: "Accessibility (a11y), SEO-friendly structure, Semantic Elements" },
      { name: "C / C++", level: "Foundations", icon: "⚙️", note: "Pointers, Memory basics, Algorithmic thinking, Core CS logic" }
    ],
    frontend: [
      { name: "Modern CSS Architecture", level: "Design Systems", icon: "📐", note: "BEM methodology, Responsive breakpoints, Theme tokens" },
      { name: "Responsive Web Design", level: "Mobile-First", icon: "📱", note: "Fluid layouts, Viewport units, Media queries, Touch states" },
      { name: "Tailwind CSS & Utilities", level: "Familiar", icon: "🌊", note: "Rapid prototyping, Utility-first styling workflows" },
      { name: "UI/UX & Micro-interactions", level: "Design Focus", icon: "✨", note: "Hover transitions, Visual hierarchy, Accessible contrast" }
    ],
    tools: [
      { name: "Git & GitHub", level: "Daily Workflow", icon: "🐙", note: "Branching, Version control, Pull requests, Git CLI" },
      { name: "VS Code & Terminal", level: "Daily Workflow", icon: "💻", note: "Zsh, Debugging, Linting, Extensions ecosystem" },
      { name: "Chrome DevTools", level: "Debugging", icon: "🔍", note: "CSS Layout inspection, Network monitoring, Performance checks" },
      { name: "Markdown & Docs", level: "Documentation", icon: "📝", note: "Technical READMEs, Project documentation, Code comments" }
    ],
    csFoundations: [
      { name: "Data Structures Foundations", level: "Active Learning", icon: "🧱", note: "Arrays, Strings, Stacks, Queues, Basic Tree concepts" },
      { name: "Object-Oriented Programming", level: "Foundational", icon: "🧩", note: "Encapsulation, Classes, Inheritance, Modularity" },
      { name: "Algorithmic Thinking", level: "Active Practice", icon: "💡", note: "Problem decomposition, Time complexity awareness, Logic" },
      { name: "Web Protocols & HTTP", level: "Foundational", icon: "🌐", note: "Client-server architecture, Requests, Responses, Status codes" }
    ]
  },

  projects: [
    {
      id: "pytask-cli",
      title: "PyTask CLI & Workflow Automator",
      subtitle: "Python Automation & Local Task Manager",
      badge: "Python • CLI • OOP",
      image: "assets/images/project1.svg",
      shortDesc: "A modular, object-oriented command-line task and productivity automator built with Python, featuring persistent JSON storage, priority tagging, and study schedule tracking.",
      problemSolved: "Managing study schedules and daily developer tasks without heavy GUI distractions or clunky browser tabs.",
      technologies: ["Python 3", "JSON Storage", "Argparse CLI", "OOP Architecture", "File I/O"],
      keyFeatures: [
        "Interactive CLI menu with flags for priority filtering (--high, --urgent)",
        "Persistent JSON database with atomic writes to prevent corruption",
        "Automated study log analytics showing daily hours dedicated to Python and CS",
        "Clean OOP structure with separate Task, StorageManager, and Reporter classes"
      ],
      deepDive: {
        architecture: "Built with a strictly decoupled architecture: the CLI parser interfaces with a TaskEngine controller, which delegates storage operations to a resilient JSON handler. Error handling gracefully manages corrupted records.",
        challenges: "Ensuring cross-platform compatibility across Windows and macOS terminal paths, and designing clean ASCII visual tables without external heavy dependencies.",
        takeaway: "Mastered Python class design, file serialization, argument parsing, and defensive programming practices."
      },
      githubUrl: "https://github.com/anjantripathi/pytask-cli", // Replace with your real repo link
      demoUrl: "terminal-tab", // Interactive demo in hero terminal!
      isPlaceholder: false
    },
    {
      id: "stylecraft-lab",
      title: "StyleCraft: Modern CSS Lab & Layout Engine",
      subtitle: "Interactive CSS3 & Responsive Design Showcase",
      badge: "CSS3 • Responsive • JavaScript",
      image: "assets/images/project2.svg",
      shortDesc: "An interactive web laboratory demonstrating mastery of modern CSS: Flexbox and Grid playgrounds, dynamic glassmorphic card generators, and fluid responsive design tokens.",
      problemSolved: "Understanding and mastering CSS layout mechanics visually, proving that modern native CSS can achieve stunning visuals without heavy frontend frameworks.",
      technologies: ["Modern CSS3", "CSS Grid & Flexbox", "CSS Custom Properties", "JavaScript (ES6)", "Semantic HTML5"],
      keyFeatures: [
        "Live CSS variable tweaker: instantly adjust padding, border radii, and blur",
        "Responsive multi-device viewport preview simulation",
        "Accessible contrast checker conforming to WCAG 2.1 AA standards",
        "Pure zero-dependency implementation delivering sub-second load times"
      ],
      deepDive: {
        architecture: "Leverages CSS Custom Properties (--primary, --surface, --glow) bound to DOM event listeners for real-time CSS manipulation with zero repaint lag.",
        challenges: "Achieving buttery-smooth 60fps animations across both low-end mobile browsers and high-DPI retina displays.",
        takeaway: "Gained an intimate understanding of the CSS box model, stacking contexts (z-index), compositor layers, and fluid clamp() typography."
      },
      githubUrl: "https://github.com/anjantripathi/stylecraft-css-lab", // Replace with your real repo link
      demoUrl: "#stylecraft-demo",
      isPlaceholder: false
    },
    {
      id: "campuspulse-hub",
      title: "CampusPulse: Student Resource & Milestone Tracker",
      subtitle: "Web Application for NST Tech Students",
      badge: "Web App • LocalStorage • UI Design",
      image: "assets/images/project3.svg",
      shortDesc: "A purpose-built web dashboard for 1st-year technology students to organize academic resources, track subject assignments, and monitor weekly coding streaks.",
      problemSolved: "Helps engineering students consolidate course materials, syllabus milestones, and coding goals into one clean, distraction-free dashboard.",
      technologies: ["JavaScript ES6", "CSS3 Grid", "HTML5 LocalStorage", "SVG Data Charts"],
      keyFeatures: [
        "Subject-wise syllabus progress tracker with interactive progress bars",
        "Offline-ready local persistence using browser LocalStorage API",
        "Visual coding streak tracker inspired by GitHub contribution graphs",
        "Keyboard shortcut support for rapid note capturing"
      ],
      deepDive: {
        architecture: "Modular vanilla JavaScript modules using Model-View-Controller (MVC) pattern. State changes trigger localized DOM diffing for instant UI reactivity.",
        challenges: "Designing an intuitive, clutter-free UI that provides high information density while remaining visually light and appealing.",
        takeaway: "Deepened knowledge of state management in pure JavaScript, asynchronous operations, and accessible UI layout design."
      },
      githubUrl: "https://github.com/anjantripathi/campuspulse-tracker", // Replace with your real repo link
      demoUrl: "#projects",
      isPlaceholder: false
    }
  ],

  education: {
    institution: "Newton School of Technology",
    degree: "Technology Degree (Undergraduate)",
    currentYear: "1st Year (Semester 1)",
    duration: "2024 – Present",
    location: "India",
    description: "Immersed in an intensive, industry-aligned technology curriculum focused on computer science foundations, software engineering practices, practical project development, and computational thinking.",
    coursework: [
      "Foundations of Programming in Python",
      "Modern Web Technologies & CSS Architecture",
      "Discrete Mathematics & Computational Logic",
      "Data Structures & Algorithmic Foundations",
      "Computer Systems & Engineering Principles"
    ],
    academicFocus: "Actively building strong fundamentals in software development, algorithm design, and modern web applications while collaborating with fellow student builders."
  },

  learningJourney: [
    {
      period: "Current Focus",
      title: "Algorithms, Python OOP & Full-Stack Exploration",
      place: "Newton School of Technology",
      description: "Deepening knowledge of Object-Oriented Programming principles in Python, practicing data structures, and connecting frontend styling to functional backend APIs."
    },
    {
      period: "Semester 1",
      title: "Mastering Modern CSS & Web Architecture",
      place: "Hands-on Development",
      description: "Experimented with advanced CSS Grid, Flexbox, glassmorphic UI, responsive typography, and semantic HTML5 to build polished developer-grade web interfaces."
    },
    {
      period: "Milestone",
      title: "Joined Newton School of Technology",
      place: "University Beginning",
      description: "Embarking on the technology degree journey, committing to becoming a versatile software developer who learns by continuously building real things."
    },
    {
      period: "Origins",
      title: "First Lines of Code in Python",
      place: "Self-Driven Curiosity",
      description: "Discovered the thrill of problem-solving through Python scripting, writing small automation tools and discovering the creative potential of computer science."
    }
  ],

  beyondCoding: [
    {
      title: "Algorithmic Problem Solving",
      category: "Daily Practice",
      icon: "🧠",
      description: "Regularly solving logic and algorithmic problems in Python to sharpen computational thinking and time-complexity intuition."
    },
    {
      title: "Tech Communities & Peer Learning",
      category: "Collaboration",
      icon: "🤝",
      description: "Active participant in student developer groups at Newton School of Technology, engaging in code reviews and tech discussions."
    },
    {
      title: "Open Source Curiosity",
      category: "Continuous Learning",
      icon: "🌐",
      description: "Exploring popular open-source Python repositories and modern CSS design systems to learn how production-grade software is written."
    },
    {
      title: "Creative Frontend & UI Design",
      category: "Design Craft",
      icon: "🎨",
      description: "Passionate about typography, micro-animations, and clean visual hierarchy that make software intuitive and enjoyable to use."
    }
  ]
};

// Export to window so it is accessible across scripts
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
