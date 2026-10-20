import { CVData, PresetProfile } from '../types/cv';
import { RODO_TEMPLATES } from './rodoTemplates';

export const DEFAULT_CV: CVData = {
  id: 'polcv-default',
  version: 1,
  lastModified: new Date().toISOString(),
  language: 'pl',
  templateId: 'modern-polish',
  accentColor: '#1e3a8a', // Corporate Navy
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
    fullName: 'Mikołaj Kamiński',
    jobTitle: 'Senior Logistics Specialist & Supply Chain Coordinator',
    email: 'mikolaj.kaminski@email.com',
    phone: '+48 601 234 567',
    location: 'Warszawa, Polska (gotowy do relokacji)',
    linkedIn: 'linkedin.com/in/mikolaj-kaminski-logistyka',
    portfolio: '',
    github: '',
    drivingLicense: 'Kat. B, Kat. C (Kierowca z kwalifikacją wstępną)',
    workEligibility: 'Obywatelstwo UE / Nie wymaga zezwolenia na pracę w Polsce',
    workEligibilityType: 'Obywatelstwo UE',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    showPhoto: true,
    showQrCode: true,
    qrCodeUrl: 'https://linkedin.com/in/mikolaj-kaminski-logistyka',
  },
  summary: 'Certyfikowany specjalista ds. logistyki i łańcucha dostaw z 5-letnim doświadczeniem w zarządzaniu procesami magazynowymi oraz dystrybucją w sektorze FMCG i e-commerce. Skutecznie wdrożył optymalizację systemu WMS, która zredukowała czas kompletacji zamówień o 22%. Biegła znajomość SAP ERP, uprawnienia UDT oraz płynny język angielski (C1) w kontaktach z międzynarodowymi przewoźnikami.',
  experiences: [
    {
      id: 'exp-1',
      role: 'Koordynator ds. Logistyki i Dystrybucji',
      company: 'Raben Logistics Polska Sp. z o.o.',
      location: 'Grodzisk Mazowiecki / Warszawa',
      startDate: '2022-03',
      endDate: '',
      current: true,
      bullets: [
        'Zarządzanie operacjami magazynowymi o powierzchni 12 000 m² oraz koordynacja zespołu 35 magazynierów i operatorów wózków.',
        'Wdrożenie usprawnień w procesie kompletacji pick-by-voice, co podniosło dokładność wydań do poziomu 99.8%.',
        'Negocjowanie umów z przewoźnikami krajowymi i międzynarodowymi, generując oszczędności rzędu 140 000 PLN w skali roku.',
        'Nadzór nad zgodnością procedur BHP, standardów ISO 9001 oraz kontrola stanów w systemie SAP ERP (moduł MM/WM).'
      ]
    },
    {
      id: 'exp-2',
      role: 'Młodszy Specjalista ds. Gospodarki Magazynowej',
      company: 'DPD Polska',
      location: 'Warszawa',
      startDate: '2019-10',
      endDate: '2022-02',
      current: false,
      bullets: [
        'Bieżąca obsługa przyjęć i wydań towarów w systemie WMS oraz rozliczanie dokumentacji przewozowej CMR i WZ.',
        'Współudział w inwentaryzacjach rocznych i ciągłych z redukcją rozbieżności asortymentowych do poniżej 0.2%.',
        'Bezpieczna obsługa wózków widłowych wysokiego składu zgodnie z normami UDT.'
      ]
    }
  ],
  educations: [
    {
      id: 'edu-1',
      institution: 'Szkoła Główna Handlowa w Warszawie (SGH)',
      faculty: 'Kolegium Zarządzania i Finansów',
      degree: 'Magister (Mgr)',
      fieldOfStudy: 'Zarządzanie Łańcuchem Dostaw i Logistyka Międzynarodowa',
      startDate: '2020-10',
      endDate: '2022-06',
      gradeOrDetails: 'Praca magisterska: "Optymalizacja procesów magazynowych z wykorzystaniem automatyzacji w centrach dystrybucyjnych w Polsce". Ocena: Bardzo dobry.'
    },
    {
      id: 'edu-2',
      institution: 'Politechnika Warszawska',
      faculty: 'Wydział Transportu',
      degree: 'Inżynier (Inż.)',
      fieldOfStudy: 'Inżynieria Transportu i Spedycja',
      startDate: '2016-10',
      endDate: '2020-02',
      gradeOrDetails: 'Specjalność: Sterowanie ruchem i logistyka transportowa.'
    }
  ],
  technicalSkills: [
    'SAP ERP (moduły MM / WM / SD)',
    'Systemy WMS (Manhattan, RedPrairie, Subiekt GT)',
    'Zaawansowany Excel (tabele przestawne, Power Query, VBA)',
    'Zarządzanie flotą (TMS)',
    'Analiza wskaźników KPI (OTIF, SLA, koszt za paletę)',
    'Metodologia Lean Magazyn (5S, Kaizen, Kanban)'
  ],
  softSkills: [
    'Zarządzanie zespołem zmianowym',
    'Negocjacje handlowe z przewoźnikami',
    'Rozwiązywanie kryzysów logistycznych pod presją czasu',
    'Precyzja i odpowiedzialność materialna'
  ],
  toolsAndCertificates: [
    'Uprawnienia UDT na wózki jezdniowe podnośnikowe (kat. I WJO)',
    'Certyfikat Lean Warehousing Practitioner (2023)',
    'Prawo jazdy kat. B oraz C',
    'Szkolenie ADR (przewóz towarów niebezpiecznych)'
  ],
  languages: [
    {
      id: 'lang-1',
      language: 'Polski',
      level: 'Native',
      details: 'Język ojczysty'
    },
    {
      id: 'lang-2',
      language: 'Angielski',
      level: 'C1',
      details: 'Płynny biznesowy w mowie i piśmie (kontakt z partnerami EU)'
    },
    {
      id: 'lang-3',
      language: 'Niemiecki',
      level: 'B1',
      details: 'Komunikacja podstawowa w sprawach spedycyjnych'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Certyfikat Kompetencji Zawodowych w Transporcie Drogowym Rzeczy Rzeczypospolitej Polskiej',
      issuer: 'Instytut Transportu Samochodowego w Warszawie',
      date: '2023',
      credentialId: 'ITS-PL-2023/8892'
    },
    {
      id: 'cert-2',
      name: 'Uprawnienia UDT – Obsługa wózków widłowych z wysięgnikiem (kat. I WJO)',
      issuer: 'Urząd Dozoru Technicznego',
      date: '2020',
      credentialId: 'UDT-WAW-49210'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Wdrożenie strefy automatycznego sortowania paczek',
      role: 'Lider operacyjny wdrożenia',
      description: 'Zaprojektowanie i uruchomienie 4 linii sortowniczych w hubie dystrybucyjnym, skracające czas przeładunku cross-docking o 35 minut na naczepę.',
      techStack: ['SAP WM', 'WMS', 'Lean 5S']
    }
  ],
  interests: ['Nowoczesne systemy automatyki magazynowej (WMS)', 'Optymalizacja łańcucha dostaw', 'Żeglarstwo śródlądowe'],
  customSections: [],
  rodo: {
    enabled: true,
    type: 'current',
    text: RODO_TEMPLATES.pl.current
  },
  coverLetter: {
    enabled: true,
    recipientName: 'Dyrektor ds. Rekrutacji i Operacji',
    companyName: 'Raben Logistics Polska Sp. z o.o.',
    companyAddress: 'ul. Zbożowa 1, 05-825 Grodzisk Mazowiecki',
    cityAndDate: 'Warszawa, 17 października 2026 r.',
    subject: 'Dotyczy: Aplikacja na stanowisko Koordynatora ds. Logistyki i Dystrybucji',
    salutation: 'Szanowni Państwo,',
    bodyParagraphs: [
      'W odpowiedzi na ogłoszenie rekrutacyjne z wielkim zainteresowaniem zgłaszam swoją kandydaturę na stanowisko Koordynatora ds. Logistyki i Dystrybucji. Moje 5-letnie doświadczenie w zarządzaniu procesami magazynowymi oraz praktyczna znajomość systemów SAP ERP i WMS bezpośrednio odpowiadają profilowi poszukiwanego pracownika.',
      'W trakcie dotychczasowej pracy w Raben Logistics z sukcesem koordynowałem operacje na powierzchni 12 000 m², zarządzając 35-osobowym zespołem oraz wprowadzając innowacje w procesie kompletacji pick-by-voice, co podniosło dokładność wydań do 99.8%. Ponadto moje negocjacje z przewoźnikami przyniosły oszczędności rzędu 140 000 PLN w skali roku.',
      'Jestem przekonany, że moje zaangażowanie, uprawnienia UDT oraz ukierunkowanie na wskaźniki KPI (OTIF, SLA) przyczynią się do dalszej optymalizacji procesów w Państwa firmie. Z przyjemnością spotkam się na rozmowie kwalifikacyjnej, aby szczegółowo omówić potencjalne korzyści z naszej współpracy.'
    ],
    signOff: 'Z poważaniem,'
  },
  agencyProfile: {
    candidateCode: 'PJH-7492',
    availabilityDate: 'Od zaraz (Ready immediately)',
    accommodationNeeded: false,
    hourlyRateExpected: '29.50 PLN brutto/h',
    monthlyRateExpected: '6 800 PLN brutto',
    medicalExamStatus: 'Ważne orzeczenie medycyny pracy + Sanepid',
    recruiterNotes: 'Kandydat rzetelny, z udokumentowanym 5-letnim stażem. Posiada ważne uprawnienia UDT kat. I WJO oraz biegłą znajomość systemów WMS. Sprawdzony w pracy wielozmianowej.',
    consultantName: 'PolJobHub Recruitment Desk',
    consultantPhone: '+48 22 123 45 67',
    consultantEmail: 'document.poljobhub@gmail.com'
  },
  agencyBadge: {
    enabled: true,
    agencyName: 'PolJobHub Agency'
  }
};

export const PRESET_PROFILES: PresetProfile[] = [
  {
    id: 'logistics',
    namePl: 'Logistyka & Magazyn / Spedycja',
    nameEn: 'Logistics, Warehouse & Supply Chain',
    facultyPl: 'Wydział Transportu / Logistyka',
    facultyEn: 'Faculty of Transport & Logistics',
    recommendedTemplate: 'modern-polish',
    descriptionPl: 'Idealny dla magazynierów, dyspozytorów, kierowników magazynu i logistyków. Uwzględnia uprawnienia UDT, SAP i prawo jazdy.',
    descriptionEn: 'Tailored for warehouse coordinators, dispatchers, and supply chain managers. Highlights UDT forklift licenses, SAP, and driving permits.',
    data: DEFAULT_CV
  },
  {
    id: 'it-software',
    namePl: 'IT, Programowanie & DevOps',
    nameEn: 'Software Engineering & IT',
    facultyPl: 'Wydział Elektroniki i Technik Informacyjnych (WEiTI) / Informatyka',
    facultyEn: 'Faculty of Computer Science & Software Engineering',
    recommendedTemplate: 'clean-ats',
    descriptionPl: 'Maksymalny wynik ATS dla programistów, testerów i architektów. Matryca technologii, linki do GitHub, projekty komercyjne.',
    descriptionEn: 'Optimized for high-tech ATS parsing. Stack matrix, GitHub repos, technical achievements, and modern cloud competencies.',
    data: {
      ...DEFAULT_CV,
      templateId: 'clean-ats',
      accentColor: '#0f766e', // Deep Teal
      personalInfo: {
        fullName: 'Aleksandra Wiśniewska',
        jobTitle: 'Senior Full Stack Engineer (React / Node.js / AWS)',
        email: 'aleksandra.wisniewska.dev@gmail.com',
        phone: '+48 512 987 654',
        location: 'Wrocław / Zdalnie (Polska)',
        linkedIn: 'linkedin.com/in/aleksandra-wisniewska-dev',
        github: 'github.com/aleksandra-wisniewska',
        portfolio: 'aleksandra-wisniewska.io',
        drivingLicense: 'Kat. B',
        workEligibility: 'Obywatelstwo UE / B2B lub Umowa o Pracę',
        showPhoto: false, // In tech ATS, no photo is often preferred
      },
      summary: 'Inżynier oprogramowania z 6-letnim doświadczeniem w projektowaniu skalowalnych aplikacji webowych i architektur chmurowych (TypeScript, React, Node.js, AWS). Posiada tytuł magistra inżyniera Politechniki Wrocławskiej. Zoptymalizowała system płatności przetwarzający ponad 1.5 mln transakcji miesięcznie, redukując opóźnienia API o 40%.',
      experiences: [
        {
          id: 'exp-tech-1',
          role: 'Senior Full Stack Developer',
          company: 'Software Mind / Klient Fintech (Wielka Brytania)',
          location: 'Wrocław (Praca Hybrydowa)',
          startDate: '2021-09',
          endDate: '',
          current: true,
          bullets: [
            'Architektura i rozwój platformy bankowości otwartej w technologii React, Next.js, Node.js oraz PostgreSQL.',
            'Migracja infrastruktury on-premise do AWS (ECS, Lambda, RDS, Terraform), zmniejszająca koszty utrzymania chmury o 28%.',
            'Mentoring 5 młodszych programistów, wprowadzenie testów automatycznych (Jest, Playwright) i podniesienie pokrycia kodu do 88%.',
            'Prowadzenie code review oraz standaryzacja procesów CI/CD w GitHub Actions.'
          ]
        },
        {
          id: 'exp-tech-2',
          role: 'Frontend Developer',
          company: 'Netguru',
          location: 'Poznań / Zdalnie',
          startDate: '2019-02',
          endDate: '2021-08',
          current: false,
          bullets: [
            'Implementacja responsywnych interfejsów użytkownika dla platformy e-commerce z obrotem 10M+ EUR rocznie.',
            'Refaktoryzacja legacy kodu z JavaScript do rygorystycznego TypeScript, eliminująca 60% błędów typu runtime.',
            'Optymalizacja wskaźników Core Web Vitals (LCP, FID) do poziomu zielonego 95+ w Google PageSpeed.'
          ]
        }
      ],
      educations: [
        {
          id: 'edu-tech-1',
          institution: 'Politechnika Wrocławska',
          faculty: 'Wydział Informatyki i Telekomunikacji',
          degree: 'Magister Inżynier (Mgr Inż.)',
          fieldOfStudy: 'Informatyka Stosowana – Inżynieria Systemów Rozproszonych',
          startDate: '2019-10',
          endDate: '2021-07',
          gradeOrDetails: 'Dyplom z wyróżnieniem. Praca magisterska dot. architektury mikroserwisowej z event-driven streamingiem (Kafka).'
        },
        {
          id: 'edu-tech-2',
          institution: 'Politechnika Wrocławska',
          faculty: 'Wydział Informatyki i Telekomunikacji',
          degree: 'Inżynier (Inż.)',
          fieldOfStudy: 'Informatyka',
          startDate: '2015-10',
          endDate: '2019-02'
        }
      ],
      technicalSkills: [
        'TypeScript / JavaScript (ESNext)',
        'React 19, Next.js, Redux Toolkit, Tailwind CSS',
        'Node.js, Express, NestJS, GraphQL',
        'PostgreSQL, MongoDB, Redis',
        'AWS (ECS, Lambda, S3, RDS, CloudFront), Terraform',
        'Docker, Kubernetes, CI/CD (GitHub Actions)',
        'Testowanie: Jest, Vitest, React Testing Library, Playwright'
      ],
      softSkills: [
        'Praca w metodykach zwinnych (Scrum, Kanban)',
        'Wysokie standardy komunikacji w zespole rozproszonym',
        'Skuteczne prowadzenie rekrutacji technicznych'
      ],
      toolsAndCertificates: [
        'AWS Certified Solutions Architect – Associate (2023)',
        'Git, Jira, Confluence, Postman, Datadog'
      ],
      languages: [
        { id: 'l1', language: 'Polski', level: 'Native', details: 'Język ojczysty' },
        { id: 'l2', language: 'Angielski', level: 'C2', details: 'Płynny techniczny i biznesowy (codzienna praca z rynkiem UK/US)' }
      ],
      certifications: [
        {
          id: 'c1',
          name: 'AWS Certified Solutions Architect – Associate',
          issuer: 'Amazon Web Services',
          date: '2023',
          credentialId: 'AWS-PSA-491209'
        }
      ],
      projects: [
        {
          id: 'p1',
          name: 'FinFlow – Open Banking Dashboard',
          role: 'Lead Architect & Developer',
          description: 'Aplikacja SaaS do analizy przepływów pieniężnych dla MŚP integrująca polskie banki przez API AISP. Ponad 4000 aktywnych użytkowników.',
          techStack: ['React', 'NestJS', 'PostgreSQL', 'Docker', 'AWS']
        }
      ]
    }
  },
  {
    id: 'engineering',
    namePl: 'Inżynieria Produkcji & Jakość (Mechanika)',
    nameEn: 'Production & Quality Engineering',
    facultyPl: 'Wydział Inżynierii Produkcji / Mechaniczny Technologiczny',
    facultyEn: 'Faculty of Production Engineering & Mechanics',
    recommendedTemplate: 'academic-elite',
    descriptionPl: 'Dla inżynierów mechaników, technologów i kierowników jakości. Standardy ISO, IATF 16949, Lean, AutoCAD i SEP.',
    descriptionEn: 'Engineered for automotive, mechanical and manufacturing specialists. Features ISO standards, CAD, Lean 5S, and technical credentials.',
    data: {
      ...DEFAULT_CV,
      templateId: 'academic-elite',
      accentColor: '#1e40af',
      personalInfo: {
        fullName: 'Inż. Piotr Szymański',
        jobTitle: 'Inżynier ds. Jakości i Optymalizacji Produkcji (IATF 16949)',
        email: 'piotr.szymanski.inz@gmail.com',
        phone: '+48 693 456 789',
        location: 'Katowice / Śląsk, Polska',
        linkedIn: 'linkedin.com/in/piotr-szymanski-jakosc',
        drivingLicense: 'Kat. B',
        workEligibility: 'Obywatelstwo Polskie',
        showPhoto: true,
      },
      summary: 'Inżynier mechanik z 4-letnim stażem w branży automotive (tier 1 dostawcy). Audytor wewnętrzny systemów IATF 16949 oraz ISO 9001. Absolwent Politechniki Śląskiej. Skutecznie wdrożył metodologię 8D oraz analizy FMEA, redukując wskaźnik braków produkcyjnych (scrap rate) z 3.8% do 1.2%, co przyniosło 280 000 PLN oszczędności rocznie.',
      technicalSkills: [
        'IATF 16949, ISO 9001, ISO 14001',
        'Narzędzia jakości: 8D, Ishikawa, 5Why, FMEA, PPAP, APQP',
        'AutoCAD, SolidWorks, CATIA V5',
        'Metodologia Lean Manufacturing (Kaizen, SMED, 5S, Poka-Yoke)',
        'Statystyczna Kontrola Procesu (SPC / Minitab)',
        'Pomiary warsztatowe i współrzędnościowe CMM'
      ],
      toolsAndCertificates: [
        'Audytor Wewnętrzny IATF 16949:2016 (TÜV Rheinland)',
        'Uprawnienia SEP do 1kV (Grupa 1 - E)',
        'Certyfikat Six Sigma Green Belt'
      ]
    }
  },
  {
    id: 'healthcare',
    namePl: 'Pielęgniarstwo, Medycyna & Opieka',
    nameEn: 'Nursing, Healthcare & Care Services',
    facultyPl: 'Wydział Nauk o Zdrowiu / Wydział Lekarski',
    facultyEn: 'Faculty of Health Sciences & Medicine',
    recommendedTemplate: 'euro-modern',
    descriptionPl: 'Dla pielęgniarek, ratowników, opiekunów medycznych i fizjoterapeutów. Zawiera numer PWZ, kursy specjalistyczne i kwalifikacje.',
    descriptionEn: 'Essential for nurses, paramedics, and physiotherapists. Incorporates PWZ license number, clinical rotations, and emergency protocols.',
    data: {
      ...DEFAULT_CV,
      templateId: 'euro-modern',
      accentColor: '#0369a1', // Sky/Hospital Blue
      personalInfo: {
        fullName: 'Katarzyna Nowak',
        jobTitle: 'Magister Pielęgniarstwa – Specjalista Pielęgniarstwa Anestezjologicznego (PWZ: 3482190P)',
        email: 'katarzyna.nowak.med@gmail.com',
        phone: '+48 505 112 233',
        location: 'Kraków, Polska',
        drivingLicense: 'Kat. B',
        workEligibility: 'Prawo Wykonywania Zawodu Pielęgniarki w RP (Okręgowa Izba Pielęgniarek i Położnych w Krakowie)',
        showPhoto: true,
      },
      summary: 'Dyplomowana pielęgniarka z tytułem magistra oraz 7-letnim doświadczeniem klinicznym na Oddziale Anestezjologii i Intensywnej Terapii. Posiada ukończoną specjalizację oraz aktualny numer PWZ. Biegła w monitorowaniu pacjentów w stanie krytycznym, obsłudze respiratorów oraz prowadzeniu dokumentacji elektronicznej e-Zdrowie. Empatyczna, opanowana w sytuacjach nagłego zagrożenia życia.',
      technicalSkills: [
        'Intensywna terapia i monitorowanie hemodynamiczne',
        'Kaniulacja naczyń obwodowych oraz pobieranie materiału do badań',
        'Resuscytacja krążeniowo-oddechowa (ALS / BLS certyfikat ERC)',
        'Obsługa aparatury: respiratory, pompy infuzyjne, defibrylatory',
        'Dokumentacja medyczna: systemy szpitalne (Asseco AMMS, Comarch Medycyna)',
        'Zasady aseptyki, antyseptyki i profilaktyki zakażeń szpitalnych'
      ],
      toolsAndCertificates: [
        'Prawo Wykonywania Zawodu (PWZ): 3482190P',
        'Certyfikat Advanced Life Support (ALS - ERC)',
        'Kurs przetaczania krwi i jej składników',
        'Kurs EKG dla pielęgniarek'
      ]
    }
  },
  {
    id: 'finance',
    namePl: 'Finanse, Księgowość & Administracja',
    nameEn: 'Finance, Accounting & Business Admin',
    facultyPl: 'Wydział Zarządzania i Finansów / Rachunkowość',
    facultyEn: 'Faculty of Finance & Accounting',
    recommendedTemplate: 'modern-polish',
    descriptionPl: 'Dla księgowych, analityków finansowych i kontrolerów. Znajomość polskiego prawa podatkowego, SAP, Symfonia, CIT/PIT/VAT.',
    descriptionEn: 'Built for accountants and financial analysts. Highlights Polish tax code compliance, SAP ERP, financial modeling, and audits.',
    data: {
      ...DEFAULT_CV,
      templateId: 'modern-polish',
      accentColor: '#1e3a8a',
      personalInfo: {
        fullName: 'Bartosz Krawczyk',
        jobTitle: 'Główny Księgowy / Senior Financial Analyst (Certyfikat SKwP)',
        email: 'bartosz.krawczyk.fin@gmail.com',
        phone: '+48 602 889 900',
        location: 'Poznań, Polska',
        linkedIn: 'linkedin.com/in/bartosz-krawczyk-finanse',
        drivingLicense: 'Kat. B',
        workEligibility: 'Obywatelstwo Polskie',
        showPhoto: true,
      },
      summary: 'Ekspert w dziedzinie finansów i rachunkowości z 8-letnim doświadczeniem w spółkach kapitałowych i centrach usług wspólnych (SSC). Certyfikowany przez Stowarzyszenie Księgowych w Polsce (SKwP). Ekspert w zakresie polskiego prawa bilansowego i podatkowego (VAT, CIT, JPK_V7), zamykania miesięcy oraz raportowania zarządczego do zarządu według MSR/MSSF.',
      technicalSkills: [
        'Pełna księgowość spółek z o.o. i S.A.',
        'Sprawozdawczość finansowa, bilanse, RZiS, cash flow',
        'Podatki w Polsce: CIT, PIT, VAT, JPK, podatek u źródła (WHT)',
        'SAP FI/CO, Symfonia Finanse i Księgowość, Comarch ERP Optima',
        'Zaawansowane modelowanie w Excel (funkcje finansowe, makra VBA)'
      ]
    }
  },
  {
    id: 'student-academic',
    namePl: 'Absolwent Uczelni / Student & Stażysta',
    nameEn: 'University Student / Recent Graduate',
    facultyPl: 'Uniwersytet / Politechnika – Dowolny Wydział',
    facultyEn: 'University / Technical Academy – All Faculties',
    recommendedTemplate: 'nordic-clean',
    descriptionPl: 'Skonstruowany specjalnie dla osób bez bogatego stażu pracy. Eksponuje kierunek studiów, koła naukowe, stypendia i praktyki studenckie.',
    descriptionEn: 'Engineered for students and new grads with limited work history. Spotlights academic projects, coursework, internships, and fast learning.',
    data: {
      ...DEFAULT_CV,
      templateId: 'nordic-clean',
      accentColor: '#475569', // Slate
      personalInfo: {
        fullName: 'Zofia Dąbrowska',
        jobTitle: 'Absolwentka E-commerce & Nowych Mediów – Młodszy Specjalista ds. Marketingu',
        email: 'zofia.dabrowska.cv@gmail.com',
        phone: '+48 570 334 455',
        location: 'Warszawa / Łódź (Polska)',
        linkedIn: 'linkedin.com/in/zofia-dabrowska-marketing',
        drivingLicense: 'Kat. B',
        workEligibility: 'Studentka / Absolwentka – gotowa do pracy w pełnym wymiarze',
        showPhoto: true,
      },
      summary: 'Ambitna absolwentka kierunku Zarządzanie i Marketing na Uniwersytecie Warszawskim (ocena celująca na dyplomie). Aktywna wiceprzewodnicząca Koła Naukowego Marketingu Cyfrowego. Odbyła 6-miesięczny płatny staż w agencji mediowej, gdzie zarządzała kampaniami Meta Ads z budżetem 25 000 PLN/miesięcznie. Biegła znajomość Google Analytics 4, Canva i płynny angielski (C1).',
      educations: [
        {
          id: 'edu-stud-1',
          institution: 'Uniwersytet Warszawski',
          faculty: 'Wydział Zarządzania',
          degree: 'Licencjat',
          fieldOfStudy: 'Zarządzanie – specjalność: Marketing i Social Media',
          startDate: '2021-10',
          endDate: '2024-06',
          gradeOrDetails: 'Średnia ocen: 4.85. Stypendium Rektora dla najlepszych studentów przez 2 lata z rzędu. Praca licencjacka z zakresu zachowań konsumenckich w e-commerce.'
        }
      ],
      technicalSkills: [
        'Google Analytics 4 & Google Tag Manager',
        'Meta Ads Manager & TikTok Ads',
        'Canva, podstawy pakietu Adobe (Photoshop)',
        'Copywriting i redagowanie treści SEO w języku polskim i angielskim',
        'MS Office (Excel, PowerPoint)'
      ]
    }
  },
  {
    id: 'sales',
    namePl: 'Sprzedaż, B2B & Obsługa Klienta',
    nameEn: 'Sales, B2B & Account Management',
    facultyPl: 'Wydział Zarządzania / Komunikacji Społecznej',
    facultyEn: 'Faculty of Business & Communication',
    recommendedTemplate: 'dynamic-impact',
    descriptionPl: 'Dla handlowców, przedstawicieli handlowych i kierowników sprzedaży. Nacisk na zrealizowane targety, wzrost przychodów i CRM.',
    descriptionEn: 'High-impact layout highlighting revenue quotas, lead conversion, pipeline management, and client relationships.',
    data: {
      ...DEFAULT_CV,
      templateId: 'dynamic-impact',
      accentColor: '#b91c1c', // Crimson
      personalInfo: {
        fullName: 'Tomasz Kozłowski',
        jobTitle: 'Key Account Manager – B2B Solutions',
        email: 'tomasz.kozlowski.b2b@gmail.com',
        phone: '+48 600 777 888',
        location: 'Warszawa / Cała Polska (praca mobilna)',
        linkedIn: 'linkedin.com/in/tomasz-kozlowski-sprzedaz',
        drivingLicense: 'Kat. B (aktywny kierowca z 8-letnim stażem, bez punktów karnych)',
        workEligibility: 'Obywatelstwo Polskie',
        showPhoto: true,
      },
      summary: 'Doświadczony doradca biznesowy i Key Account Manager z 6-letnim stażem w sprzedaży bezpośredniej B2B (sektor technologii i usług dla biznesu). W 2023 roku zrealizował 128% rocznego planu sprzedażowego, pozyskując 18 strategicznych klientów korporacyjnych o łącznej wartości kontraktów 3.4 mln PLN. Biegły w negocjacjach zarządczych i systemach CRM.',
      technicalSkills: [
        'Techniki sprzedaży B2B (SPIN Selling, Challenger Sale)',
        'Negocjacje umów handlowych na szczeblu C-level',
        'Systemy CRM: Salesforce, HubSpot, Pipedrive',
        'Budowanie lejków sprzedażowych i prognozowanie przychodów',
        'Obsługa przetargów i zapytań ofertowych (RFP)'
      ]
    }
  },
  {
    id: 'hospitality',
    namePl: 'Gastronomia, Hotelarstwo & Turystyka',
    nameEn: 'Hospitality, Culinary & Tourism',
    facultyPl: 'Wydział Nauk o Żywności / Turystyka i Rekreacja',
    facultyEn: 'Faculty of Hospitality & Food Sciences',
    recommendedTemplate: 'euro-modern',
    descriptionPl: 'Dla kucharzy, szefów kuchni, managerów restauracji i recepcjonistów. Certyfikaty HACCP, znajomość języków obcych i praca zmianowa.',
    descriptionEn: 'Focused on culinary standards, guest satisfaction, HACCP compliance, multi-language fluency, and shift management.',
    data: {
      ...DEFAULT_CV,
      templateId: 'euro-modern',
      accentColor: '#9a3412', // Warm amber-bronze
      personalInfo: {
        fullName: 'Damian Lewandowski',
        jobTitle: 'Sous Chef / Zastępca Szefa Kuchni (HACCP & Gastronomia Europejska)',
        email: 'damian.lewandowski.chef@gmail.com',
        phone: '+48 501 345 678',
        location: 'Gdańsk / Sopot, Polska',
        drivingLicense: 'Kat. B',
        workEligibility: 'Obywatelstwo Polskie / Aktualna książeczka do celów sanitarno-epidemiologicznych (SANEPID)',
        showPhoto: true,
      },
      summary: 'Kreatywny i zdyscyplinowany kucharz z 7-letnim doświadczeniem w renomowanych restauracjach hotelowych nad polskim morzem. Specjalizacja w kuchni polskiej nowoczesnej oraz śródziemnomorskiej. Posiada ukończoną szkołę gastronomiczną oraz międzynarodowe staże. Skutecznie obniżył wskaźnik food cost o 4.5% przy zachowaniu najwyższych ocen gości.',
      technicalSkills: [
        'Organizacja pracy sekcji kuchennej i zarządzanie personelem (12 osób)',
        'Kontrola kosztów: Food Cost, kalkulacje receptur i marż',
        'Systemy HACCP, GHP, GMP oraz audyty Sanepidu',
        'Zarządzanie zaopatrzeniem i współpraca z lokalnymi dostawcami',
        'Nowoczesne techniki kulinarne (Sous-vide, fermentacja, cukiernictwo)'
      ],
      toolsAndCertificates: [
        'Dyplom Mistrza w zawodzie Kucharz',
        'Aktualne orzeczenie SANEPID do celów sanitarno-epidemiologicznych',
        'Certyfikat Zarządzania Bezpieczeństwem Żywności HACCP (2022)'
      ]
    }
  }
];
