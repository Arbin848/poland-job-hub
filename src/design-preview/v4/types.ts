import { CVData, TemplateId, LanguageCode } from '../../types/cv';

export type V4ConceptId = 'concept-a' | 'concept-b' | 'concept-c';

export type V4FlowStep = 'landing' | 'templates' | 'onboarding' | 'builder' | 'preview' | 'download';

export interface V4ConceptConfig {
  id: V4ConceptId;
  name: string;
  tagline: string;
  badge: string;
  accentColor: string;
  description: string;
  highlights: string[];
}
