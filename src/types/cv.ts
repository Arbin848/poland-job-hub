export type LanguageCode = 'pl' | 'en';

export type TemplateId = 
  | 'modern-polish' 
  | 'clean-ats' 
  | 'euro-modern' 
  | 'nordic-clean' 
  | 'academic-elite' 
  | 'dynamic-impact'
  | 'swiss-executive'
  | 'creative-tech'
  | 'berlin-minimal'
  | 'elegance-serif';

export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  faculty: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gradeOrDetails?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  level: CefrLevel;
  details?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  role: string;
  description: string;
  link?: string;
  techStack?: string[];
}

export interface CustomSectionItem {
  id: string;
  title: string;
  content: string;
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  portfolio?: string;
  github?: string;
  drivingLicense?: string;
  workEligibility?: string;
  workEligibilityType?: string;
  nationality?: string;
  photoUrl?: string;
  showPhoto?: boolean;
  qrCodeUrl?: string;
  showQrCode?: boolean;
  showWorkPermitBadge?: boolean;
}

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  location: string;
  link?: string;
  cvVersionName?: string;
  status: 'saved' | 'applied' | 'interview' | 'offer' | 'rejected';
  appliedDate: string;
  followUpDate?: string;
  salaryBrutto?: number;
  salaryNetto?: number;
  notes?: string;
}

export interface CvVersionMeta {
  id: string;
  name: string;
  createdAt: string;
  jobTarget?: string;
  templateId: TemplateId;
  cv: CVData;
}

export interface RodoClause {
  enabled: boolean;
  type: 'current' | 'future' | 'custom';
  text: string;
}

export type FontFamily = 'jakarta' | 'inter' | 'roboto' | 'merriweather' | 'outfit';

export interface SectionVisibility {
  summary: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
  languages: boolean;
  certifications: boolean;
  projects: boolean;
  rodo: boolean;
}

export interface CoverLetterData {
  enabled: boolean;
  recipientName: string;
  companyName: string;
  companyAddress: string;
  cityAndDate: string;
  subject: string;
  salutation: string;
  bodyParagraphs: string[];
  signOff: string;
}

export type ActiveDocumentType = 'cv' | 'cover-letter' | 'agency-onepager' | 'legal-packet';

export interface AgencyProfileData {
  candidateCode: string;
  availabilityDate: string;
  accommodationNeeded: boolean;
  hourlyRateExpected: string;
  monthlyRateExpected: string;
  medicalExamStatus: string;
  recruiterNotes: string;
  consultantName: string;
  consultantPhone: string;
  consultantEmail: string;
}

export interface CVData {
  id: string;
  version: number;
  lastModified: string;
  language: LanguageCode;
  templateId: TemplateId;
  accentColor: string;
  fontScale: 'compact' | 'normal' | 'relaxed';
  fontFamily?: FontFamily;
  sectionVisibility?: SectionVisibility;
  activeDocument: ActiveDocumentType;
  personalInfo: PersonalInfo;
  summary: string;
  experiences: ExperienceItem[];
  educations: EducationItem[];
  technicalSkills: string[];
  softSkills: string[];
  toolsAndCertificates: string[];
  interests: string[];
  languages: LanguageItem[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
  customSections: CustomSectionItem[];
  rodo: RodoClause;
  coverLetter: CoverLetterData;
  agencyProfile?: AgencyProfileData;
  agencyBadge?: {
    enabled: boolean;
    agencyName: string;
  };
}

export type FacultyCategory = 
  | 'logistics' 
  | 'it-software' 
  | 'driver-transport'
  | 'construction-welder'
  | 'healthcare' 
  | 'engineering' 
  | 'finance' 
  | 'sales' 
  | 'student-academic' 
  | 'hospitality';

export interface PresetProfile {
  id: FacultyCategory;
  namePl: string;
  nameEn: string;
  facultyPl: string;
  facultyEn: string;
  recommendedTemplate: TemplateId;
  descriptionPl: string;
  descriptionEn: string;
  data: Partial<CVData>;
}
