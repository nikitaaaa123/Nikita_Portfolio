export type ThemeMode = 'dark' | 'light';

export interface Project {
  id: string;
  title: string;
  category: 'ai-ml' | 'embedded-rf' | 'software' | 'fullstack';
  categoryLabel: string;
  subtitle: string;
  description: string;
  longDescription: string;
  highlights: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  metric?: string;
  domainIcon: 'brain' | 'radio' | 'cpu' | 'eye' | 'home' | 'rocket' | 'ticket' | 'palette' | 'bot' | 'layers';
  architecture?: {
    inputs: string;
    processing: string;
    outputs: string;
  };
}

export interface SkillCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    highlight?: boolean;
  }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  organizationType: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  technologies: string[];
  link?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: string;
  link: string;
  badgeType: 'specialization' | 'champion' | 'hackathon' | 'leadership';
  skillsGained: string[];
  credentialNote?: string;
}

export interface ExtracurricularItem {
  id: string;
  title: string;
  subtitle: string;
  metric: string;
  description: string;
  icon: 'code' | 'git' | 'languages' | 'users' | 'heart' | 'award';
  link?: string;
  tags: string[];
}
