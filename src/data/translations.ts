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

export interface HeroTranslations {
  badgeMarket: string;
  badgeTemplates: string;
  headlineMain: string;
  headlineGradient: string;
  subhead: string;
  ctaCreate: string;
  ctaExplore: string;
  ctaContinue: string;
  continueNotice: string;
  rodoTag: string;
  formatTag: string;
  starTag: string;
  editSample: string;
  stepsKicker: string;
  stepsTitle: string;
  step1Num: string;
  step1Title: string;
  step1Desc: string;
  step2Num: string;
  step2Title: string;
  step2Desc: string;
  step3Num: string;
  step3Title: string;
  step3Desc: string;
  featuresKicker: string;
  featuresTitle: string;
  galleryKicker: string;
  galleryTitle: string;
  galleryViewAll: string;
  selectStyle: string;
  footerTitle: string;
  footerDesc: string;
  footerCta: string;
}

export const HERO_TRANSLATIONS: Record<LanguageCode, HeroTranslations> = {
  pl: {
    badgeMarket: 'Polski i Europejski Rynek Pracy 2026',
    badgeTemplates: '10 Szablonów A4',
    headlineMain: 'Stwórz Profesjonalne CV, Które',
    headlineGradient: 'Otwiera Drzwi.',
    subhead: 'Nowoczesny kreator życiorysu z 10 szablonami A4, aktualną klauzulą RODO 2026, asystentem osiągnięć STAR oraz natychmiastowym eksportem do druku.',
    ctaCreate: 'Stwórz Nowe CV',
    ctaExplore: 'Przeglądaj Szablony',
    ctaContinue: 'Wznów Edycję CV',
    continueNotice: 'Masz rozpoczęty projekt CV w pamięci przeglądarki.',
    rodoTag: 'RODO 2026 Zgodne',
    formatTag: 'Format A4 (210×297 mm)',
    starTag: 'Osiągnięcia (Metoda STAR)',
    editSample: 'Edytuj ten profil',
    stepsKicker: 'Prosty Proces w 3 Krokach',
    stepsTitle: 'Od pustego arkusza do gotowego dokumentu',
    step1Num: '01',
    step1Title: 'Wybierz Profesjonalny Szablon',
    step1Desc: 'Wybierz spośród 10 sprawdzonych układów dostosowanych do rekruterów w Polsce i Unii Europejskiej.',
    step2Num: '02',
    step2Title: 'Wypełnij Dane lub Wgraj Stare CV',
    step2Desc: 'Skorzystaj z gotowych wzorców branżowych i asystenta STAR, który precyzyjnie formułuje Twoje osiągnięcia.',
    step3Num: '03',
    step3Title: 'Pobierz Gotowy Plik PDF',
    step3Desc: 'Otrzymaj dokument z aktualną klauzulą RODO 2026 i kodem QR, gotowy do wysłania na Pracuj.pl lub LinkedIn.',
    featuresKicker: 'Narzędzia i Bezpieczeństwo',
    featuresTitle: 'Wszystko, czego wymaga polski rynek pracy',
    galleryKicker: 'Galeria Stylów',
    galleryTitle: 'Wybierz szablon dopasowany do Twojej branży',
    galleryViewAll: 'Zobacz wszystkie 10 szablonów',
    selectStyle: 'Wybierz ten styl',
    footerTitle: 'Gotowy, aby stworzyć swoje nowe CV?',
    footerDesc: 'Bez rejestracji i bez kart płatniczych. Twoje dane pozostają w 100% bezpieczne w Twojej przeglądarce.',
    footerCta: 'Rozpocznij teraz za darmo'
  },
  en: {
    badgeMarket: 'Poland & European Job Market 2026',
    badgeTemplates: '10 A4 Templates',
    headlineMain: 'Create a CV That',
    headlineGradient: 'Opens Doors.',
    subhead: 'Professional resume builder with 10 A4 templates, 2026 Polish GDPR compliance, STAR impact writing assistant, and clean PDF export.',
    ctaCreate: 'Create New CV',
    ctaExplore: 'Explore Templates',
    ctaContinue: 'Continue Editing',
    continueNotice: 'You have an active CV draft saved in your browser.',
    rodoTag: '2026 GDPR Compliant',
    formatTag: 'Format A4 (210×297 mm)',
    starTag: 'Impact Highlights (STAR Method)',
    editSample: 'Edit this profile',
    stepsKicker: 'Simple 3-Step Process',
    stepsTitle: 'From blank sheet to job-ready CV',
    step1Num: '01',
    step1Title: 'Choose a Professional Template',
    step1Desc: 'Select from 10 battle-tested layouts tailored for recruiters in Poland and the European Union.',
    step2Num: '02',
    step2Title: 'Fill Details or Import Old CV',
    step2Desc: 'Use industry presets and the STAR assistant to structure your career achievements with clear metrics.',
    step3Num: '03',
    step3Title: 'Export Clean Print-Ready PDF',
    step3Desc: 'Generate a document with legal GDPR statement and QR code, ready for job boards and LinkedIn.',
    featuresKicker: 'Tools & Security',
    featuresTitle: 'Everything required by Polish and EU employers',
    galleryKicker: 'Template Showcase',
    galleryTitle: 'Choose a layout matched to your industry',
    galleryViewAll: 'View all 10 templates',
    selectStyle: 'Use this style',
    footerTitle: 'Ready to build your standout CV?',
    footerDesc: 'No sign-up and no credit cards required. Your data stays 100% private in your local browser.',
    footerCta: 'Start Building Free'
  }
};

