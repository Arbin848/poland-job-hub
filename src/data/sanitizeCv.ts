import { CVData } from '../types/cv';
import { DEFAULT_CV } from './presets';

export const sanitizeCVData = (raw: any): CVData => {
  if (!raw || typeof raw !== 'object') return DEFAULT_CV;
  return {
    ...DEFAULT_CV,
    ...raw,
    id: raw.id || `polcv-${Date.now()}`,
    lastModified: raw.lastModified || new Date().toISOString(),
    personalInfo: {
      ...DEFAULT_CV.personalInfo,
      ...(raw.personalInfo || {}),
      fullName: raw.personalInfo?.fullName ?? DEFAULT_CV.personalInfo.fullName ?? '',
      jobTitle: raw.personalInfo?.jobTitle ?? DEFAULT_CV.personalInfo.jobTitle ?? '',
      email: raw.personalInfo?.email ?? DEFAULT_CV.personalInfo.email ?? '',
      phone: raw.personalInfo?.phone ?? DEFAULT_CV.personalInfo.phone ?? '',
      location: raw.personalInfo?.location ?? DEFAULT_CV.personalInfo.location ?? '',
      drivingLicense: raw.personalInfo?.drivingLicense ?? DEFAULT_CV.personalInfo.drivingLicense ?? '',
      workEligibility: raw.personalInfo?.workEligibility ?? DEFAULT_CV.personalInfo.workEligibility ?? '',
      workEligibilityType: raw.personalInfo?.workEligibilityType ?? DEFAULT_CV.personalInfo.workEligibilityType ?? 'Obywatelstwo UE',
      linkedIn: raw.personalInfo?.linkedIn ?? DEFAULT_CV.personalInfo.linkedIn ?? '',
      github: raw.personalInfo?.github ?? DEFAULT_CV.personalInfo.github ?? '',
      portfolio: raw.personalInfo?.portfolio ?? DEFAULT_CV.personalInfo.portfolio ?? '',
      photoUrl: raw.personalInfo?.photoUrl ?? DEFAULT_CV.personalInfo.photoUrl ?? '',
      qrCodeUrl: raw.personalInfo?.qrCodeUrl ?? DEFAULT_CV.personalInfo.qrCodeUrl ?? '',
      showQrCode: Boolean(raw.personalInfo?.showQrCode ?? DEFAULT_CV.personalInfo.showQrCode),
      showPhoto: Boolean(raw.personalInfo?.showPhoto ?? DEFAULT_CV.personalInfo.showPhoto),
      showWorkPermitBadge: Boolean(raw.personalInfo?.showWorkPermitBadge ?? false),
    },
    rodo: {
      ...DEFAULT_CV.rodo,
      ...(raw.rodo || {})
    },
    coverLetter: {
      ...DEFAULT_CV.coverLetter,
      ...(raw.coverLetter || {})
    },
    agencyBadge: {
      ...DEFAULT_CV.agencyBadge,
      ...(raw.agencyBadge || {})
    },
    agencyProfile: {
      ...DEFAULT_CV.agencyProfile,
      ...(raw.agencyProfile || {})
    },
    activeDocument: raw.activeDocument || DEFAULT_CV.activeDocument || 'cv',
    sectionVisibility: {
      ...DEFAULT_CV.sectionVisibility,
      ...(raw.sectionVisibility || {})
    },
    experiences: Array.isArray(raw.experiences) ? raw.experiences : DEFAULT_CV.experiences,
    educations: Array.isArray(raw.educations) ? raw.educations : DEFAULT_CV.educations,
    technicalSkills: Array.isArray(raw.technicalSkills) ? raw.technicalSkills : DEFAULT_CV.technicalSkills,
    toolsAndCertificates: Array.isArray(raw.toolsAndCertificates) ? raw.toolsAndCertificates : DEFAULT_CV.toolsAndCertificates,
    softSkills: Array.isArray(raw.softSkills) ? raw.softSkills : DEFAULT_CV.softSkills,
    languages: Array.isArray(raw.languages) ? raw.languages : DEFAULT_CV.languages,
    certifications: Array.isArray(raw.certifications) ? raw.certifications : DEFAULT_CV.certifications,
    projects: Array.isArray(raw.projects) ? raw.projects : (DEFAULT_CV.projects || []),
  };
};
