export type TimelineKind = "work" | "education" | "project";

export interface TimelineEntry {
  id: string;
  kind: TimelineKind;
  title: string;
  organization: string;
  period: string;
  /** Used to order the timeline newest-first without parsing `period`. */
  sortKey: number;
  current?: boolean;
  location?: string;
  impact: string;
  context: string[];
  learned: string[];
  formalSummary?: string;
  /** Optional reference URL — shown on project cards. */
  link?: string;
  tags: string[];
}

export interface SkillGroup {
  id: string;
  name: string;
  summary: string;
  details: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  /** Primary entries stay visible; the rest live behind a disclosure. */
  primary: boolean;
  note?: string;
}

export interface CareerGoals {
  headline: string;
  targetRoles: string[];
  projectTypes: string[];
  idealContext: string[];
}

export interface Capability {
  id: string;
  label: string;
  detail: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface PersonalInfo {
  name: string;
  roles: string[];
  statusBadge: string;
  intro: string;
  formalIntro: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
  license: string;
  /** Display string, e.g. "12 maggio 1992". */
  birthDate: string;
  /** Optional override; defaults to /images/filippo-portrait.png */
  portraitUrl?: string;
  languages: Language[];
}

export interface Compensation {
  label: string;
  range: string;
  note: string;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
}

export type CvDataLocaleBundle = {
  personal: PersonalInfo;
  goals: CareerGoals;
  hardSkills: SkillGroup[];
  softSkills: SkillGroup[];
  certifications: Certification[];
  canDo: Capability[];
  cannotDo: Capability[];
  compensation: Compensation;
  timeline: TimelineEntry[];
  socials: SocialLink[];
};

export interface CvData {
  personal: PersonalInfo;
  goals: CareerGoals;
  hardSkills: SkillGroup[];
  softSkills: SkillGroup[];
  certifications: Certification[];
  canDo: Capability[];
  cannotDo: Capability[];
  compensation: Compensation;
  timeline: TimelineEntry[];
  socials: SocialLink[];
  en?: CvDataLocaleBundle;
}

export const TIMELINE_KIND_LABELS: Record<TimelineKind, string> = {
  work: "Esperienza",
  education: "Formazione",
  project: "Progetto",
};
