import { LanguageCode } from '../types/cv';

export interface SectionTranslations {
  professionalSummary: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
  technicalSkills: string;
  softSkills: string;
  toolsAndCertificates: string;
  languages: string;
  certifications: string;
  projects: string;
  drivingLicense: string;
  workEligibility: string;
  rodoClause: string;
  contact: string;
  present: string;
  motherTongue: string;
  foreignLanguages: string;
}

export const CV_TRANSLATIONS: Record<LanguageCode, SectionTranslations> = {
  pl: {
    professionalSummary: 'Podsumowanie Zawodowe',
    summary: 'Podsumowanie Zawodowe',
    experience: 'Doświadczenie Zawodowe',
    education: 'Wykształcenie',
    skills: 'Umiejętności',
    technicalSkills: 'Kluczowe Kompetencje Twarde',
    softSkills: 'Umiejętności Miękkie',
    toolsAndCertificates: 'Narzędzia i Uprawnienia',
    languages: 'Znajomość Języków Obcych',
    certifications: 'Certyfikaty i Uprawnienia Zawodowe',
    projects: 'Wybrane Projekty i Osiągnięcia',
    drivingLicense: 'Prawo Jazdy',
    workEligibility: 'Status Prawny / Zezwolenie na Pracę',
    rodoClause: 'Klauzula RODO',
    contact: 'Dane Kontaktowe',
    present: 'Obecnie',
    motherTongue: 'Język ojczysty',
    foreignLanguages: 'Języki obce'
  },
  en: {
    professionalSummary: 'Professional Summary',
    summary: 'Professional Summary',
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills & Competencies',
    technicalSkills: 'Technical Expertise',
    softSkills: 'Key Strengths',
    toolsAndCertificates: 'Tools & Certifications',
    languages: 'Languages',
    certifications: 'Licenses & Certifications',
    projects: 'Featured Projects & Impact',
    drivingLicense: 'Driving License',
    workEligibility: 'Work Eligibility',
    rodoClause: 'GDPR / Data Protection Statement',
    contact: 'Contact Information',
    present: 'Present',
    motherTongue: 'Native language',
    foreignLanguages: 'Languages'
  }
};
