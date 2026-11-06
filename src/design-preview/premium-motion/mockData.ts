import { CVData } from '../../types/cv';

export const PROTOTYPE_CANDIDATE: CVData = {
  id: 'proto-preview-1',
  version: 1,
  lastModified: new Date().toISOString(),
  language: 'pl',
  templateId: 'modern-polish',
  accentColor: '#6250F4',
  fontScale: 'normal',
  fontFamily: 'jakarta',
  sectionVisibility: {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    languages: true,
    certifications: true,
    projects: true,
    rodo: true,
  },
  activeDocument: 'cv',
  personalInfo: {
    fullName: 'Alicja Dąbrowska',
    jobTitle: 'Senior Operations & Project Lead',
    email: 'alicja.dabrowska@preview.pl',
    phone: '+48 501 234 567',
    location: 'Warszawa, Polska (hybrydowo / zdalnie)',
    linkedIn: 'linkedin.com/in/alicja-dabrowska-ops',
    portfolio: 'alicjadabrowska.com',
    github: '',
    drivingLicense: 'Prawo jazdy kat. B',
    workEligibility: 'Obywatelstwo UE / Brak wymogu zezwolenia na pracę w RP',
    workEligibilityType: 'Obywatelstwo UE',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    showPhoto: true,
    showQrCode: true,
    qrCodeUrl: 'https://linkedin.com/in/alicja-dabrowska-ops',
    showWorkPermitBadge: true,
  },
  summary: 'Certyfikowany Operations Manager z 6-letnim stażem w skalowaniu procesów logistycznych i technologicznych w Polsce i regionie CEE. Skutecznie wdrożyła transformację cyfrową obiegu zleceń, podnosząc wskaźnik On-Time-Delivery z 88% do 98.4% przy redukcji kosztów o 180 000 PLN rocznie. Ekspertka w metodykach Lean i Agile, z biegłą znajomością języka angielskiego (C1).',
  experiences: [
    {
      id: 'exp-proto-1',
      role: 'Operations & Process Team Lead',
      company: 'OmniLogistics Poland S.A.',
      location: 'Warszawa',
      startDate: '2022-04',
      endDate: '',
      current: true,
      bullets: [
        'Zarządzanie 22-osobowym zespołem dyspozytorów i specjalistów ds. łańcucha dostaw w centrum dystrybucyjnym.',
        'Wdrożenie narzędzia ERP/WMS w 4 oddziałach regionalnych, co skróciło czas realizacji zleceń o 28% w ciągu 6 miesięcy.',
        'Optymalizacja wskaźnika SLA do poziomu 99.2% dla strategicznych klientów e-commerce w Polsce i Niemczech.',
        'Prowadzenie rekrutacji, audytów BHP i programu wdrożeniowego (onboarding) dla nowo zatrudnionych pracowników.'
      ]
    },
    {
      id: 'exp-proto-2',
      role: 'Project Coordinator',
      company: 'Asseco Enterprise Services',
      location: 'Kraków / Zdalnie',
      startDate: '2019-09',
      endDate: '2022-03',
      current: false,
      bullets: [
        'Koordynacja 14 projektów wdrożeniowych dla sektora bankowości i ubezpieczeń z budżetem przekraczającym 2.4 mln PLN.',
        'Opracowanie ustandaryzowanych raportów KPI dla zarządu oraz automatyzacja analiz w arkuszach Power BI.',
        'Bieżący kontakt z klientami korporacyjnymi w języku polskim i angielskim.'
      ]
    }
  ],
  educations: [
    {
      id: 'edu-proto-1',
      institution: 'Politechnika Warszawska',
      degree: 'Magister Inżynier (M.Sc.)',
      faculty: 'Wydział Inżynierii Produkcji',
      fieldOfStudy: 'Zarządzanie i Inżynieria Produkcji',
      startDate: '2017',
      endDate: '2019',
      gradeOrDetails: 'Dyplom z wyróżnieniem rektorskim'
    },
    {
      id: 'edu-proto-2',
      institution: 'Szkoła Główna Handlowa w Warszawie (SGH)',
      degree: 'Licencjat (B.A.)',
      faculty: 'Kolegium Zarządzania i Finansów',
      fieldOfStudy: 'Zarządzanie Operacyjne',
      startDate: '2014',
      endDate: '2017'
    }
  ],
  technicalSkills: [
    'Zarządzanie procesami Lean / Kaizen',
    'SAP ERP & WMS',
    'JIRA, Asana, Confluence',
    'Budżetowanie & Analiza KPI',
    'Power BI & Zaawansowany Excel'
  ],
  softSkills: [
    'Przywództwo i motywowanie zespołów',
    'Rozwiązywanie problemów pod presją czasu',
    'Negocjacje biznesowe B2B',
    'Precyzyjna komunikacja międzyoddziałowa'
  ],
  toolsAndCertificates: [
    'Certyfikat PRINCE2® Practitioner',
    'Lean Six Sigma Green Belt',
    'Prawo jazdy kat. B',
    'Uprawnienia UDT kat. I WJO'
  ],
  interests: ['Podróże górskie', 'Biegi długodystansowe (półmaraton)', 'Architektura modernistyczna'],
  languages: [
    { id: 'lang-1', language: 'Polski', level: 'Native', details: 'Język ojczysty' },
    { id: 'lang-2', language: 'Angielski', level: 'C1', details: 'Biegły w mowie i piśmie (C1 Advanced)' },
    { id: 'lang-3', language: 'Niemiecki', level: 'B1', details: 'Komunikacja zawodowa' }
  ],
  certifications: [
    { id: 'cert-1', name: 'PRINCE2® Foundation & Practitioner', issuer: 'AXELOS Global', date: '2023-05' },
    { id: 'cert-2', name: 'Six Sigma Green Belt Certification', issuer: 'TÜV Rheinland', date: '2021-11' }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Wdrożenie Hubu Logistycznego Błonie 2024',
      role: 'Project Lead',
      description: 'Kompleksowe uruchomienie nowego centrum przeładunkowego o powierzchni 18 000 m² przed planowanym terminem.',
      techStack: ['SAP WMS', 'Lean Manufacturing', 'AutoCAD']
    }
  ],
  customSections: [],
  rodo: {
    enabled: true,
    type: 'current',
    text: 'Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO 2026).'
  },
  coverLetter: {
    enabled: false,
    recipientName: 'Dział Rekrutacji / Zarząd',
    companyName: 'Nowoczesna Firma Sp. z o.o.',
    companyAddress: 'ul. Prosta 20, 00-850 Warszawa',
    cityAndDate: 'Warszawa, 23 października 2026 r.',
    subject: 'Aplikacja na stanowisko: Operations & Process Team Lead',
    salutation: 'Szanowni Państwo,',
    bodyParagraphs: [
      'W odpowiedzi na ogłoszenie o pracę zgłaszam swoją kandydaturę na stanowisko Operations & Process Team Lead. Moje wieloletnie doświadczenie w zarządzaniu łańcuchem dostaw oraz zrealizowane projekty optymalizacyjne są bezpośrednio zbieżne z celami rozwojowymi Państwa firmy.',
      'W dotychczasowej karierze w firmie OmniLogistics koordynowałam 22-osobowy zespół, osiągając wzrost terminowości dostaw do 99.2% i redukcję kosztów operacyjnych. Praktyczna znajomość systemów SAP ERP oraz certyfikacje Lean Six Sigma i PRINCE2 pozwalają mi na natychmiastowe wdrożenie efektywnych procedur.',
      'Z przyjemnością spotkam się na rozmowie rekrutacyjnej, aby szczegółowo omówić, w jaki sposób moje kompetencje przyczynią się do sukcesu Państwa organizacji w najbliższych kwartałach.'
    ],
    signOff: 'Z poważaniem,\nAlicja Dąbrowska'
  }
};
