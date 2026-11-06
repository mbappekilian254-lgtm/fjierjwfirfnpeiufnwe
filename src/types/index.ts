export type Language = 'uz' | 'en';
export type Theme = 'dark' | 'light';

export type ProjectCategory = 'all' | 'web' | 'iot' | 'ai' | 'experiments';

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: {
    uz: string;
    en: string;
  };
  category: 'web' | 'iot' | 'ai' | 'experiments';
  status: {
    uz: 'Konsept' | 'Prototip' | 'Ishlab chiqilmoqda';
    en: 'Concept' | 'Prototype' | 'In Development';
    type: 'concept' | 'prototype' | 'dev';
  };
  tags: string[];
  shortDesc: {
    uz: string;
    en: string;
  };
  problemGoal: {
    uz: string;
    en: string;
  };
  howItWorks: {
    uz: string;
    en: string;
  };
  sensorOrModules?: {
    uz: string;
    en: string;
  };
  componentsList: string[];
  futurePlans: {
    uz: string;
    en: string;
  };
  liveUrl?: string;
  demoType: 'esp32-led' | 'piano' | 'school' | 'qr-menu' | 'sensors' | 'deployment' | 'news' | 'library' | 'standard';
  accentColor: string;
}

export interface UserProfile {
  name: string;
  titleBadge: {
    uz: string;
    en: string;
  };
  tagline: {
    uz: string;
    en: string;
  };
  email: string;
  github: string;
  telegram: string;
  location: {
    uz: string;
    en: string;
  };
  avatarUrl?: string;
  showEmail: boolean;
  showGithub: boolean;
  showTelegram: boolean;
}

export interface SkillItem {
  name: string;
  status: {
    uz: string;
    en: string;
    level: 'learning' | 'practice' | 'experience';
  };
}

export interface SkillCategory {
  id: string;
  title: {
    uz: string;
    en: string;
  };
  description: {
    uz: string;
    en: string;
  };
  icon: string;
  skills: SkillItem[];
}

export interface JourneyStep {
  step: string;
  title: {
    uz: string;
    en: string;
  };
  desc: {
    uz: string;
    en: string;
  };
  focus: string;
}

export interface WorkProcessStep {
  step: string;
  title: {
    uz: string;
    en: string;
  };
  desc: {
    uz: string;
    en: string;
  };
  details: {
    uz: string;
    en: string;
  };
}

export interface ValueItem {
  key: string;
  title: {
    uz: string;
    en: string;
  };
  desc: {
    uz: string;
    en: string;
  };
  icon: string;
}
