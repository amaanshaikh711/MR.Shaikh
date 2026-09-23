export interface Project {
  id: string;
  name: string;
  year: string;
  tagline: string;
  desc: string;
  longDesc?: string;
  category: 'Full-Stack' | 'AI / ML' | 'E-Commerce' | 'Web3';
  tags: string[];
  href: string;
  github?: string;
  image: string;
  featured?: boolean;
  metrics?: { label: string; value: string }[];
  highlights?: string[];
  role?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  isCurrent?: boolean;
  location?: string;
  summary?: string;
  points: string[];
  skills: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  items: string[];
}

export interface Achievement {
  name: string;
  issuer: string;
  year?: string;
  type: 'Hackathon' | 'Certification' | 'Training';
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  details: string;
}
