import { CVData, LanguageCode, TemplateId } from '../../types/cv';

export type V5ViewMode = 'homepage' | 'editor';

export type V5StepId = 1 | 2 | 3 | 4 | 5;

export interface V5StepMeta {
  id: V5StepId;
  titlePl: string;
  titleEn: string;
  subtitlePl: string;
  subtitleEn: string;
  estMinutes: number;
}

export const V5_STEPS: V5StepMeta[] = [
  {
    id: 1,
    titlePl: 'Dane osobowe i kontakt',
    titleEn: 'Personal & Contact Info',
    subtitlePl: 'Imię, nazwisko, tytuł zawodowy i dane kontaktowe',
    subtitleEn: 'Name, professional headline, and essential contacts',
    estMinutes: 1
  },
  {
    id: 2,
    titlePl: 'Doświadczenie zawodowe',
    titleEn: 'Work Experience',
    subtitlePl: 'Twoje kluczowe role z asystentem formuły STAR',
    subtitleEn: 'Key roles structured with STAR achievement formula',
    estMinutes: 2
  },
  {
    id: 3,
    titlePl: 'Wykształcenie i umiejętności',
    titleEn: 'Education & Skills',
    subtitlePl: 'Ukończone uczelnie, technologie i języki obce',
    subtitleEn: 'Universities, certified skills, and language CEFR levels',
    estMinutes: 1
  },
  {
    id: 4,
    titlePl: 'Wybór szablonu graficznego',
    titleEn: 'Design Template',
    subtitlePl: 'Wybierz spośród 10 dopasowanych szablonów rynku RP',
    subtitleEn: 'Choose from 10 proven templates tailored for EU recruiters',
    estMinutes: 1
  },
  {
    id: 5,
    titlePl: 'Weryfikacja i pobranie PDF',
    titleEn: 'Review & Download',
    subtitlePl: 'Audyt kompletności, weryfikacja klauzul zgody i eksport do druku',
    subtitleEn: 'Quality audit, recruitment consent check, and print PDF export',
    estMinutes: 1
  }
];

export interface StarSuggestion {
  id: string;
  roleContext: string;
  actionSnippet: string;
  category: 'efficiency' | 'leadership' | 'optimization' | 'client';
}

export interface VerificationCheck {
  id: string;
  labelPl: string;
  labelEn: string;
  status: 'passed' | 'warning';
  hintPl: string;
  hintEn: string;
}
