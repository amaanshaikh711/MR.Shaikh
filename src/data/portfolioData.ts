import { Project, ExperienceItem, SkillCategory, Achievement, Education } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Aman Shaikh',
  firstName: 'Aman',
  lastName: 'Shaikh',
  role: 'Software Developer & AI Specialist',
  positioning: 'I build smart, AI-powered web applications and high-impact digital experiences.',
  subtext: 'Specializing at the intersection of full-stack engineering and applied machine learning — transforming complex requirements into refined, scalable software.',
  location: 'Mumbai, India',
  email: 'amaanshaikh711@gmail.com',
  github: 'https://github.com/amaanshaikh711',
  linkedin: 'https://linkedin.com/in/amaanshaikh711',
  twitter: 'https://twitter.com/amaanshaikh711',
  instagram: 'https://instagram.com/amaanshaikh711',
  resume: 'https://github.com/amaanshaikh711/Aman-Portfolio',
  bio: [
    "I'm Aman, a developer from Mumbai building at the intersection of full-stack web and applied AI/ML. I design and ship smart, AI-powered web applications — from MERN dashboards and real-estate platforms to NLP tools, ML pipelines and operator-grade analytics surfaces.",
    "My focus is on clean architecture, honest UX and code that ages well. I lean on the MERN stack, Next.js and Python (Scikit-learn, TensorFlow, Pandas) to turn fuzzy problems into shipped, measurable products.",
    "On GitHub (@amaanshaikh711) I ship in public — open-source projects, ML experiments, real-estate platforms (LussoHomes), AI tools (HateSense AI, Insightify, HealthScan Pro) and hackathon builds. Most repos prioritize readable code, tight commits and production-style structure over noise."
  ],
  stats: [
    { label: 'Primary Focus', value: 'Full-Stack & Applied AI' },
    { label: 'Current Role', value: 'Giga Nexus Technology' },
    { label: 'Location', value: 'Mumbai, India' },
    { label: 'Availability', value: 'Open for Select Roles' },
  ]
};

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'lussohomes',
    name: 'LussoHomes',
    year: '2024–2025',
    tagline: 'Luxury Real-Estate & AR E-Commerce Platform',
    desc: 'Live luxury real-estate platform with high-end editorial UI, fast search, architectural property showcases, and a seamless client consultation journey.',
    longDesc: 'Built and hosted from scratch for a premium interior design & real-estate brand. The platform features bespoke catalog curation, rapid multi-parameter filtering, interactive consultation scheduling, and high-performance image delivery engineered for luxury client conversion.',
    category: 'E-Commerce',
    tags: ['Next.js', 'React', 'TailwindCSS', 'TypeScript', 'Node.js', 'UI/UX'],
    href: 'https://github.com/amaanshaikh711',
    github: 'https://github.com/amaanshaikh711',
    image: '/assets/project-lussohomes.svg',
    featured: true,
    role: 'Lead Full-Stack Developer & UI Architect',
    metrics: [
      { label: 'Platform Type', value: 'Live Production' },
      { label: 'Page Speed', value: 'Sub-second' },
      { label: 'Stack', value: 'Next.js / Tailwind' }
    ],
    highlights: [
      'Engineered responsive luxury catalog with custom product curation',
      'Implemented real-time client booking flow & WhatsApp automated bridge',
      'Optimized performance for ultra-crisp architectural imagery'
    ]
  },
  {
    id: 'hatesense-ai',
    name: 'HateSense AI',
    year: '2025',
    tagline: 'AI-Powered Hate-Speech & Sentiment Intelligence',
    desc: 'Intelligent natural language processing system engineered to detect, classify, and surface toxic speech and sentiments in real time across social media channels.',
    longDesc: 'HateSense AI integrates multi-class NLP classifiers trained on toxic speech corpora to inspect comments, posts, and feeds from platforms like YouTube and Twitter. Features automated confidence scoring, sentiment telemetry, and clean operator audit dashboards.',
    category: 'AI / ML',
    tags: ['Python', 'NLP', 'Scikit-learn', 'Flask', 'Sentiment Analysis', 'REST API'],
    href: 'https://github.com/amaanshaikh711',
    github: 'https://github.com/amaanshaikh711',
    image: '/assets/project-hatesense.png',
    featured: true,
    role: 'ML Engineer & Backend Architect',
    metrics: [
      { label: 'Inference', value: 'Real-Time' },
      { label: 'Domain', value: 'Multi-Platform NLP' },
      { label: 'Core', value: 'Python / Flask' }
    ],
    highlights: [
      'Trained custom NLP text pipeline with text preprocessing & tokenization',
      'Built multi-platform social media ingestion interface for YouTube & Twitter',
      'Designed interactive dark telemetry dashboard for moderation audits'
    ]
  },
  {
    id: 'trustlock-ai',
    name: 'TrustLock AI',
    year: '2025',
    tagline: 'Smart Non-Custodial Escrow Platform on Stellar',
    desc: 'Decentralized smart escrow and automated transaction verification platform leveraging smart contract logic on Stellar for secure, non-custodial milestone releases.',
    longDesc: 'An intelligent Web3 escrow service ensuring verifiable counterparty trust. Combines automated milestone criteria verification with non-custodial cryptographic guarantees on the Stellar network.',
    category: 'Web3',
    tags: ['Stellar', 'Smart Contracts', 'Web3', 'AI Verification', 'TypeScript', 'TailwindCSS'],
    href: 'https://github.com/amaanshaikh711',
    github: 'https://github.com/amaanshaikh711',
    image: '/assets/project-trustlock.svg',
    featured: true,
    role: 'Full-Stack & Web3 Developer',
    metrics: [
      { label: 'Network', value: 'Stellar Blockchain' },
      { label: 'Security', value: 'Non-Custodial' },
      { label: 'Verification', value: 'Automated Rules' }
    ],
    highlights: [
      'Architected non-custodial escrow release workflows with multi-sig security',
      'Integrated verifiable milestone completion checking with smart contracts',
      'Designed clean cryptographic audit timeline for transaction transparency'
    ]
  },
  {
    id: 'aicounts',
    name: 'AICounts',
    year: '2025',
    tagline: 'Autonomous AI Accounting & Financial Intelligence',
    desc: 'Intelligent financial operations suite automating transaction categorization, ledger reconciliation, and executive cash-flow forecasts.',
    longDesc: 'Engineered as a robust business application with automated ledger parsing, invoice processing, and financial anomaly detection. Built with React, resilient backend API endpoints, and clean data visualizations.',
    category: 'Full-Stack',
    tags: ['React', 'TypeScript', 'Node.js', 'Financial APIs', 'Data Visualization'],
    href: 'https://github.com/amaanshaikh711',
    github: 'https://github.com/amaanshaikh711',
    image: '/assets/project-aicounts.svg',
    featured: true,
    role: 'Frontend & API Systems Developer',
    metrics: [
      { label: 'Domain', value: 'FinTech / SaaS' },
      { label: 'Processing', value: 'Automated Ledger' },
      { label: 'UI', value: 'High-Density Charts' }
    ],
    highlights: [
      'Developed high-density accounting interface with tabular precision',
      'Integrated real-time banking & invoice processing webhooks',
      'Built cash-flow prediction models visualizing fiscal quarter runways'
    ]
  }
];

export const ARCHIVE_PROJECTS: Project[] = [
  {
    id: 'insightify',
    name: 'Insightify',
    year: '2025',
    tagline: 'Interactive Data Exploration & Automated Reporting',
    desc: 'Interactive data analysis tool for visualizing, querying, and exploring arbitrary datasets with intelligent auto-summaries and statistical breakdowns.',
    category: 'AI / ML',
    tags: ['Python', 'Pandas', 'Streamlit', 'Data Analytics', 'NumPy'],
    href: 'https://github.com/amaanshaikh711',
    github: 'https://github.com/amaanshaikh711',
    image: '/assets/project-insightify.png'
  },
  {
    id: 'sales-dashboard',
    name: 'AI Sales Dashboard',
    year: '2024',
    tagline: 'Predictive Retail Analytics & Forecasting',
    desc: 'ML-powered retail sales analytics dashboard featuring time-series forecasting, regional trend analysis, and an operator-grade executive interface.',
    category: 'AI / ML',
    tags: ['Python', 'Scikit-learn', 'Machine Learning', 'React', 'Charts'],
    href: 'https://github.com/amaanshaikh711',
    github: 'https://github.com/amaanshaikh711',
    image: '/assets/project-sales-dashboard.png'
  },
  {
    id: 'healthscan-pro',
    name: 'HealthScan Pro',
    year: '2024',
    tagline: 'Personal AI Nutritionist & Health Companion',
    desc: 'Intelligent nutritional companion that analyzes meals, scans ingredient breakdowns, and computes personalized caloric and macro metrics.',
    category: 'Full-Stack',
    tags: ['AI', 'React', 'Node.js', 'Computer Vision', 'HealthTech'],
    href: 'https://github.com/amaanshaikh711',
    github: 'https://github.com/amaanshaikh711',
    image: '/assets/project-healthscan.png'
  },
  {
    id: 'weather-dashboard',
    name: 'Weather Dashboard',
    year: '2024',
    tagline: 'Real-Time Meteorological Visualization',
    desc: 'Real-time weather tracking application featuring interactive geospatial metrics, 24-hour temperature curves, and multi-day microclimate forecasts.',
    category: 'Full-Stack',
    tags: ['JavaScript', 'Weather API', 'CSS3', 'Data Visualization'],
    href: 'https://github.com/amaanshaikh711',
    github: 'https://github.com/amaanshaikh711',
    image: '/assets/project-weather.png'
  },
  {
    id: 'churn-prediction',
    name: 'Churn Prediction ML',
    year: '2024',
    tagline: 'Customer Retention & Churn Risk Classifier',
    desc: 'Supervised machine learning model engineered to evaluate customer behavioral signals, detect churn propensity, and guide proactive retention strategies.',
    category: 'AI / ML',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Predictive Modeling'],
    href: 'https://github.com/amaanshaikh711',
    github: 'https://github.com/amaanshaikh711',
    image: '/assets/project-churn.png'
  },
  {
    id: 'watch-ecommerce',
    name: 'Luxury Watch E-Commerce',
    year: '2023',
    tagline: 'Modern Horology Boutique Experience',
    desc: 'High-end luxury watch showcase engineered with dark cinematic aesthetics, smooth product zoom, specifications carousel, and bespoke cart workflows.',
    category: 'E-Commerce',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    href: 'https://github.com/amaanshaikh711',
    github: 'https://github.com/amaanshaikh711',
    image: '/assets/project-watch.png'
  },
  {
    id: 'internal-ops',
    name: 'Internal Ops / HRMS Platform',
    year: '2025',
    tagline: 'Enterprise Operations & Employee Lifecycle',
    desc: 'Comprehensive organizational HR platform supporting employee onboarding, leave management, role-based permissions, and payroll workflows.',
    category: 'Full-Stack',
    tags: ['React', 'Node.js', 'REST APIs', 'RBAC', 'Enterprise'],
    href: 'https://github.com/amaanshaikh711',
    github: 'https://github.com/amaanshaikh711',
    image: '/assets/project-sales-dashboard.png'
  },
  {
    id: 'air-zone-crm',
    name: 'Air Zone Cool CRM',
    year: '2024',
    tagline: 'Operations & Service Pipeline Management',
    desc: 'Tailored customer relationship system coordinating client ticket pipelines, technician dispatching, and automated quotation generators.',
    category: 'Full-Stack',
    tags: ['React', 'Express', 'MongoDB', 'Business Pipelines'],
    href: 'https://github.com/amaanshaikh711',
    github: 'https://github.com/amaanshaikh711',
    image: '/assets/project-sales-dashboard.png'
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'giga-nexus',
    role: 'Software Developer & AI Specialist',
    company: 'Giga Nexus Technology',
    period: 'June 2026 – Present',
    isCurrent: true,
    location: 'Mumbai, India',
    summary: 'Leading technical engineering on full-stack web applications and integrating production AI/ML workflows for client and internal software platforms.',
    points: [
      'Architecting resilient web systems leveraging Next.js, Node.js, and TypeScript.',
      'Developing AI/ML integration pipelines for smart data extraction, classification, and real-time processing.',
      'Collaborating across engineering cycles to deliver high-performance, accessible, and maintainable codebases.',
      'Overseeing technical design consistency, deployment pipelines, and modern frontend architecture.'
    ],
    skills: ['Full-Stack Web', 'AI Pipelines', 'Next.js', 'TypeScript', 'Python', 'Production Architecture']
  },
  {
    id: 'future-interns',
    role: 'Machine Learning Intern',
    company: 'Future Interns',
    period: 'December 2025 – January 2026',
    isCurrent: false,
    location: 'Remote',
    summary: 'Worked directly on core ML fundamentals, data wrangling pipelines, and model evaluation routines on real-world datasets.',
    points: [
      'Worked on core Machine Learning concepts including data preprocessing, model training, and evaluation metrics.',
      'Implemented ML algorithms in Python using Scikit-learn, Pandas, and NumPy for structured prediction tasks.',
      'Gained hands-on experience with real-world datasets and end-to-end problem-solving workflows.',
      'Strengthened understanding of ML deployment pipelines and model monitoring.'
    ],
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Model Evaluation', 'Scikit-learn', 'Pandas']
  },
  {
    id: 'lusso-homes',
    role: 'Freelance Web Developer',
    company: 'Lusso Homes',
    period: 'December 2025',
    isCurrent: false,
    location: 'Mumbai, India',
    summary: 'Commissioned to build and launch an end-to-end responsive luxury real-estate and interior design e-commerce presence.',
    points: [
      'Built and hosted a professional, responsive real-estate website from scratch with bespoke visual art direction.',
      'Designed a user-friendly platform that elevated digital presence and client inquiry conversion.',
      'Translated complex client requirements into a polished, high-quality final product.',
      'Ensured seamless hosting, CDN setup, and performance optimization for a premium user experience.'
    ],
    skills: ['Web Development', 'Frontend Design', 'UI/UX Architecture', 'Website Hosting', 'TailwindCSS']
  },
  {
    id: 'codtech',
    role: 'Python Programming Intern',
    company: 'Codtech IT Solutions Pvt. Ltd.',
    period: '2024',
    isCurrent: false,
    location: 'Remote',
    summary: 'Engineered Python programs for industrial use cases focusing on clean code principles and algorithmic reliability.',
    points: [
      'Developed and tested Python-based programs for practical, industry-style use cases.',
      'Strengthened fundamentals of logic building, debugging, and clean code practices.',
      'Shipped small real-world tasks aligned with production problem-solving.',
      'Demonstrated consistency, fast learning, and a professional engineering ethic.'
    ],
    skills: ['Python', 'Problem Solving', 'Programming Fundamentals', 'Algorithms', 'Debugging']
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages & Frontend',
    description: 'Modern reactive architecture and type-safe systems',
    items: ['TypeScript', 'JavaScript (ESNext)', 'Python', 'React.js', 'Next.js', 'TailwindCSS', 'HTML5 / Semantic CSS', 'shadcn/ui']
  },
  {
    title: 'Backend & Databases',
    description: 'Scalable servers, APIs, and persistent databases',
    items: ['Node.js', 'Express.js', 'Flask', 'RESTful APIs', 'MongoDB', 'PostgreSQL', 'FastAPI']
  },
  {
    title: 'AI / ML & Data Science',
    description: 'Applied machine learning, NLP, and model evaluation',
    items: ['Scikit-learn', 'Pandas', 'NumPy', 'TensorFlow', 'NLP (Natural Language Processing)', 'Prompt Engineering', 'Data Preprocessing']
  },
  {
    title: 'Creative & Tooling',
    description: 'Motion design, 3D interaction, and DevOps workflows',
    items: ['Three.js', 'Framer Motion', 'Git & GitHub', 'Vercel', 'Figma', 'Webpack / Vite']
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  { name: 'Hackathon Winner', issuer: 'Tech Event', type: 'Hackathon' },
  { name: 'Google Hackathon', issuer: 'Google', type: 'Hackathon' },
  { name: 'AWS Certification', issuer: 'Amazon Web Services', type: 'Certification' },
  { name: 'AI Certification', issuer: 'Infosys', type: 'Certification' },
  { name: 'Python Training', issuer: 'Institution', type: 'Training' },
  { name: 'Web Development (HTML/CSS/JS)', issuer: 'Udemy', type: 'Certification' }
];

export const EDUCATION: Education[] = [
  {
    degree: 'B.Sc. Computer Science',
    institution: 'University of Mumbai',
    location: 'Mumbai, India',
    period: '2022 — 2025',
    details: 'Comprehensive curriculum focused on Artificial Intelligence & Machine Learning, full-stack software engineering, applied data science, and database design.'
  }
];
