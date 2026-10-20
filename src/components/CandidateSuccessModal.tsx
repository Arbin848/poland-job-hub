import React, { useState, useEffect } from 'react';
import { CVData, LanguageCode, TemplateId, FacultyCategory } from '../types/cv';
import { PRESET_PROFILES } from '../data/presets';
import {
  Sparkles,
  Briefcase,
  Calculator,
  ShieldCheck,
  Send,
  MessageSquare,
  HelpCircle,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award,
  Globe,
  FileText,
  UserCheck,
  Info,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export type CandidateSuccessTab = 'wizard' | 'legal' | 'salary' | 'jobs' | 'interview';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cv: CVData;
  onApplyCV: (newCvData: Partial<CVData>) => void;
  initialTab?: CandidateSuccessTab;
}

type TabType = CandidateSuccessTab;

export const CandidateSuccessModal: React.FC<Props> = ({
  isOpen,
  onClose,
  cv,
  onApplyCV,
  initialTab = 'wizard'
}) => {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialTab) setActiveTab(initialTab);
      setTargetLanguage(cv.language || 'pl');
      if (cv.personalInfo.fullName) setCandidateName(cv.personalInfo.fullName);
      if (cv.personalInfo.phone) setCandidatePhone(cv.personalInfo.phone);
      if (cv.personalInfo.location) setCandidateCity(cv.personalInfo.location);
    }
  }, [isOpen, initialTab, cv.language, cv.personalInfo]);

  // Wizard state
  const [selectedRoleCategory, setSelectedRoleCategory] = useState<FacultyCategory>('logistics');
  const [selectedLegalStatus, setSelectedLegalStatus] = useState<string>('Obywatelstwo UE / Brak wymogu zezwolenia');
  const [candidateName, setCandidateName] = useState<string>(cv.personalInfo.fullName || 'Jan Kowalski');
  const [candidatePhone, setCandidatePhone] = useState<string>(cv.personalInfo.phone || '+48 500 123 456');
  const [candidateCity, setCandidateCity] = useState<string>(cv.personalInfo.location || 'Warszawa, Polska');
  const [targetLanguage, setTargetLanguage] = useState<LanguageCode>(cv.language || 'pl');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(cv.templateId || 'modern-polish');

  // Salary Calculator state
  const [grossSalary, setGrossSalary] = useState<number>(6500);
  const [contractType, setContractType] = useState<'uop' | 'uz' | 'b2b'>('uop');
  const [isStudentUnder26, setIsStudentUnder26] = useState<boolean>(false);
  const [b2bTaxRate, setB2bTaxRate] = useState<number>(12); // 12% ryczałt or 19% liniowy

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Salary Calculation Engine for Poland 2025/2026
  const calculateSalary = () => {
    const gross = Math.max(0, grossSalary);

    if (contractType === 'uop') {
      // Umowa o Pracę
      const emerytalna = gross * 0.0976;
      const rentowa = gross * 0.015;
      const chorobowa = gross * 0.0245;
      const totalSpoleczne = emerytalna + rentowa + chorobowa;
      const podstawaZdrowotna = Math.max(0, gross - totalSpoleczne);
      const zdrowotna = podstawaZdrowotna * 0.09;
      
      const kosztyUzyskania = 250; // standardowe
      const kwotaZmniejszajaca = 300; // 3600 / 12
      const podstawaPit = Math.max(0, Math.round(gross - totalSpoleczne - kosztyUzyskania));
      
      let pit = 0;
      if (!isStudentUnder26) {
        pit = Math.max(0, Math.round(podstawaPit * 0.12 - kwotaZmniejszajaca));
      }

      const netto = Math.round(gross - totalSpoleczne - zdrowotna - pit);
      
      // Koszt pracodawcy
      const emerytalnaPracodawca = gross * 0.0976;
      const rentowaPracodawca = gross * 0.065;
      const wypadkowaPracodawca = gross * 0.0167;
      const fp = gross * 0.0245;
      const fgsp = gross * 0.001;
      const totalPracodawca = Math.round(gross + emerytalnaPracodawca + rentowaPracodawca + wypadkowaPracodawca + fp + fgsp);

      return {
        netto,
        zusPracownik: Math.round(totalSpoleczne),
        zdrowotna: Math.round(zdrowotna),
        pit: Math.round(pit),
        kosztPracodawcy: totalPracodawca,
        effectiveTaxPercent: Math.round(((gross - netto) / gross) * 100) || 0
      };
    } else if (contractType === 'uz') {
      // Umowa Zlecenie
      if (isStudentUnder26) {
        // Status studenta / ucznia do 26 r.ż. - brutto = netto!
        return {
          netto: Math.round(gross),
          zusPracownik: 0,
          zdrowotna: 0,
          pit: 0,
          kosztPracodawcy: Math.round(gross),
          effectiveTaxPercent: 0
        };
      } else {
        const emerytalna = gross * 0.0976;
        const rentowa = gross * 0.015;
        const chorobowa = 0; // dobrowolna
        const totalSpoleczne = emerytalna + rentowa + chorobowa;
        const podstawaZdrowotna = gross - totalSpoleczne;
        const zdrowotna = podstawaZdrowotna * 0.09;
        const kosztyUzyskania = (gross - totalSpoleczne) * 0.20; // 20% koszty
        const podstawaPit = Math.max(0, Math.round(gross - totalSpoleczne - kosztyUzyskania));
        const pit = Math.max(0, Math.round(podstawaPit * 0.12));
        const netto = Math.round(gross - totalSpoleczne - zdrowotna - pit);

        return {
          netto,
          zusPracownik: Math.round(totalSpoleczne),
          zdrowotna: Math.round(zdrowotna),
          pit,
          kosztPracodawcy: Math.round(gross * 1.20),
          effectiveTaxPercent: Math.round(((gross - netto) / gross) * 100) || 0
        };
      }
    } else {
      // B2B Samozatrudnienie (Ryczałt)
      const zusSpoleczny = 1600; // Przybliżony Duży ZUS 2025/2026
      const zusZdrowotny = 700; // Średni ryczałt
      const podatek = Math.max(0, Math.round(gross * (b2bTaxRate / 100)));
      const netto = Math.max(0, Math.round(gross - zusSpoleczny - zusZdrowotny - podatek));

      return {
        netto,
        zusPracownik: zusSpoleczny,
        zdrowotna: zusZdrowotny,
        pit: podatek,
        kosztPracodawcy: gross,
        effectiveTaxPercent: Math.round(((gross - netto) / gross) * 100) || 0
      };
    }
  };

  const salaryResults = calculateSalary();

  // Wizard Generation Handler
  const handleGenerateWizardCV = () => {
    const preset = PRESET_PROFILES.find((p) => p.id === selectedRoleCategory) || PRESET_PROFILES[0];
    const baseData = preset.data;

    const updatedCv: Partial<CVData> = {
      ...baseData,
      language: targetLanguage,
      templateId: selectedTemplate,
      personalInfo: {
        ...(baseData.personalInfo || cv.personalInfo),
        fullName: candidateName.trim() || 'Kandydat',
        phone: candidatePhone.trim() || '+48 500 000 000',
        location: candidateCity.trim() || 'Polska',
        workEligibility: selectedLegalStatus,
        workEligibilityType: selectedLegalStatus.split('/')[0].trim(),
        showPhoto: true,
        showQrCode: true,
      },
      lastModified: new Date().toISOString()
    };

    onApplyCV(updatedCv);
    onClose();
  };

  const legalOptions = [
    {
      title: 'Obywatelstwo Polskie / UE',
      desc: 'Pełne prawo do pracy bez żadnych zezwoleń i formalności urzędowych.',
      badge: 'Zawsze akceptowane',
      statusText: 'Obywatelstwo UE / Brak wymogu zezwolenia na pracę w Polsce'
    },
    {
      title: 'PESEL UKR (Obywatele Ukrainy)',
      desc: 'Legalny pobyt i natychmiastowe prawo do pracy. Pracodawca zgłasza powiadomienie do PUP w ciągu 14 dni przez praca.gov.pl.',
      badge: 'Specustawa / 14 dni na powiadomienie',
      statusText: 'PESEL UKR (Ochrona tymczasowa) / Legalna praca bez zezwolenia (Art. 22 specustawy)'
    },
    {
      title: 'Karta Pobytu (Pobyt Czasowy / Stały)',
      desc: 'Posiada adnotację „DOSTĘP DO RYNKU PRACY” – pracodawca nie musi wyrabiać odrębnego zezwolenia.',
      badge: 'Dostęp do rynku pracy',
      statusText: 'Karta Pobytu z adnotacją „Dostęp do rynku pracy” / Zezwolenie jednolite'
    },
    {
      title: 'Oświadczenie o powierzeniu pracy',
      desc: 'Rejestrowane w Powiatowym Urzędzie Pracy (PUP) na okres do 24 miesięcy (Armenia, Białoruś, Gruzja, Mołdawia, Ukraina).',
      badge: 'Procedura uproszczona PUP',
      statusText: 'Oświadczenie o powierzeniu wykonywania pracy (PUP) / Gotowy do podjęcia zatrudnienia'
    },
    {
      title: 'Zezwolenie na pracę Typ A (Wojewoda)',
      desc: 'Wydawane przez właściwego Wojewodę na wniosek polskiego pracodawcy (do 3 lat).',
      badge: 'Zezwolenie Wojewódzkie',
      statusText: 'Zezwolenie na pracę Typ A / Wszystkie dokumenty gotowe do weryfikacji'
    },
    {
      title: 'Student / Absolwent uczelni w Polsce',
      desc: 'Studenci studiów stacjonarnych i absolwenci polskich uczelni wyższych są z mocy prawa zwolnieni z obowiązku posiadania zezwolenia!',
      badge: 'Zwolniony z zezwolenia',
      statusText: 'Student/Absolwent uczelni w RP – zwolniony z obowiązku zezwolenia na pracę'
    }
  ];

  const isEn = cv.language === 'en';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden text-slate-900">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 flex items-start justify-between relative shrink-0">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>
                {isEn ? 'Candidate Career Hub & Employment Assistant in Poland' : 'Centrum Sukcesu Kandydata & Asystent Pracy w Polsce'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {isEn 
                ? 'Everything you need to secure a great job in Poland & the EU' 
                : 'Wszystko, czego potrzebujesz, aby dostać dobrą pracę w Polsce i UE'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isEn 
                ? '60-second CV generator, work permits & legal status, net salary calculator, direct Polish job board launchers & ready application pitches.' 
                : 'Kreator 60-sekundowy, legalizacja zatrudnienia, kalkulator pensji netto, bezpośrednie linki do portali pracy i gotowe wzory wiadomości do polskich rekruterów.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition shrink-0"
            aria-label="Zamknij"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 overflow-x-auto scrollbar-none shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('wizard')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'wizard'
                ? 'border-indigo-600 text-indigo-900 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>{isEn ? '1. 60s Fast CV Wizard' : '1. Szybki Kreator CV (60s)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('legal')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'legal'
                ? 'border-indigo-600 text-indigo-900 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{isEn ? '2. Work Permits & Status' : '2. Legalizacja & Zezwolenia'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('salary')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'salary'
                ? 'border-indigo-600 text-indigo-900 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-4 h-4 text-amber-600" />
            <span>{isEn ? '3. Net Salary Calc (PLN)' : '3. Kalkulator Pensji Netto'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('jobs')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'jobs'
                ? 'border-indigo-600 text-indigo-900 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Send className="w-4 h-4 text-blue-600" />
            <span>{isEn ? '4. Job Portals & Pitches' : '4. Portale Pracy & Wiadomości'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('interview')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'interview'
                ? 'border-indigo-600 text-indigo-900 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-purple-600" />
            <span>{isEn ? '5. Interview Q&A Coach' : '5. Pytania na Rozmowie'}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: SZYBKI KREATOR 60s */}
          {activeTab === 'wizard' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
                <div className="text-xs text-indigo-950">
                  <strong className="font-bold">Potrzebujesz natychmiastowego CV?</strong> Wybierz zawód, podaj podstawowe dane kontaktowe i kliknij <em>Generuj Gotowe CV</em>. Aplikacja załaduje profesjonalny szablon, zweryfikowane osiągnięcia, uprawnienia i wymaganą polską klauzulę RODO.
                </div>
              </div>

              {/* Step 1: Select Profession */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">1</span>
                  <span>Wybierz Branżę / Zawód:</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {[
                    { id: 'logistics', icon: '📦', name: 'Logistyka & Magazyn UDT', sub: 'Wózki widłowe, WMS, SAP' },
                    { id: 'driver-transport', icon: '🚚', name: 'Kierowca C+E / D', sub: 'Kod 95, ADR, Karta tachografu' },
                    { id: 'it-software', icon: '💻', name: 'IT & Software', sub: 'Frontend, Fullstack, QA, DevOps' },
                    { id: 'construction-welder', icon: '🏗️', name: 'Budownictwo & Spawacz', sub: 'MAG 135, TIG, Monter' },
                    { id: 'healthcare', icon: '🏥', name: 'Medycyna & Opieka', sub: 'Pielęgniarka, PWZ, Sanepid' },
                    { id: 'hospitality', icon: '🍽️', name: 'Gastronomia & Kurier', sub: 'Kucharz, Kelner, Dostawca' },
                    { id: 'finance', icon: '💼', name: 'Finanse & Księgowość', sub: 'Księgowy, Symfonia, Excel' },
                    { id: 'sales', icon: '📈', name: 'Sprzedaż & B2B', sub: 'Przedstawiciel, CRM, KPI' },
                    { id: 'student-academic', icon: '🎓', name: 'Student & Absolwent', sub: 'Ulga do 26 lat, staż' },
                    { id: 'engineering', icon: '⚙️', name: 'Inżynieria Produkcji', sub: 'Automatyk, Lean, Jakość' }
                  ].map((cat) => {
                    const isSelected = selectedRoleCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedRoleCategory(cat.id as FacultyCategory)}
                        className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                          isSelected
                            ? 'bg-indigo-50/80 border-indigo-600 ring-2 ring-indigo-500/20 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <div className="text-xl mb-1">{cat.icon}</div>
                          <div className="font-bold text-xs text-slate-900 leading-snug">{cat.name}</div>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-2">{cat.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Legal Status in Poland */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">2</span>
                  <span>Status Prawny i Prawo do Pracy w Polsce:</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {legalOptions.map((opt) => {
                    const isSelected = selectedLegalStatus === opt.statusText;
                    return (
                      <button
                        key={opt.title}
                        type="button"
                        onClick={() => setSelectedLegalStatus(opt.statusText)}
                        className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                          isSelected
                            ? 'bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-500/20'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="font-bold text-xs text-slate-900">{opt.title}</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                              {opt.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600">{opt.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Candidate Basic Details */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">3</span>
                  <span>Podstawowe Dane Kontaktowe:</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Imię i Nazwisko:</label>
                    <input
                      type="text"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="np. Jan Kowalski / Oleksandr Bondarenko"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Numer Telefonu (+48):</label>
                    <input
                      type="text"
                      value={candidatePhone}
                      onChange={(e) => setCandidatePhone(e.target.value)}
                      placeholder="+48 600 000 000"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Lokalizacja w Polsce:</label>
                    <input
                      type="text"
                      value={candidateCity}
                      onChange={(e) => setCandidateCity(e.target.value)}
                      placeholder="np. Warszawa (gotowy do podjęcia pracy)"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Language & Template */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-800 mb-1.5">
                    Język generowanego CV:
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setTargetLanguage('pl')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                        targetLanguage === 'pl'
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      🇵🇱 Polski (Rekomendowany w RP)
                    </button>
                    <button
                      type="button"
                      onClick={() => setTargetLanguage('en')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                        targetLanguage === 'en'
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      🇬🇧 English (International & Corporate)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-800 mb-1.5">
                    Szablon Wizualny:
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value as TemplateId)}
                    className="w-full px-3 py-2 text-xs font-semibold border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden bg-white"
                  >
                    <option value="modern-polish">👔 Modern Polish Pro (Klasyczny Executive)</option>
                    <option value="swiss-executive">🏛️ Swiss Executive (Najwyższy Prestiż)</option>
                    <option value="creative-tech">⚡ Creative Tech (IT & Nowoczesny)</option>
                    <option value="clean-ats">🤖 Clean ATS Minimal (100% Parsowania)</option>
                    <option value="berlin-minimal">🖤 Neo-Berlin (Modernistyczny Kontrast)</option>
                    <option value="euro-modern">🇪🇺 Euro Modern (Standard Europejski)</option>
                    <option value="dynamic-impact">🚀 Dynamic Impact (Sprzedaż & KPI)</option>
                  </select>
                </div>
              </div>

              {/* Generate CTA Button */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
                <div className="text-xs text-slate-600 hidden sm:block">
                  Wszystkie sekcje zostaną automatycznie wypełnione branżowymi danymi, które możesz w 100% dostosować.
                </div>
                <button
                  type="button"
                  onClick={handleGenerateWizardCV}
                  className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-extrabold rounded-xl shadow-lg hover:shadow-indigo-500/25 transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Wygeneruj Gotowe CV do Edycji i Druku →</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: LEGALIZACJA & ZEZWOLENIA */}
          {activeTab === 'legal' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950 space-y-1">
                  <div className="font-extrabold text-sm">Jak polscy pracodawcy weryfikują legalność zatrudnienia?</div>
                  <p>
                    Wielu kandydatów traci szanse na telefon od rekrutera, ponieważ w CV nie ma jasnej informacji o prawie do pracy. Polskie firmy obawiają się kar Państwowej Inspekcji Pracy (PIP) i Straży Granicznej. Umieszczenie w CV jednej z poniższych klauzul rozwiewa wszelkie wątpliwości pracodawcy!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {legalOptions.map((opt, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs hover:border-slate-300 transition flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-bold text-sm text-slate-900">{opt.title}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {opt.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mb-3">{opt.desc}</p>
                      
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono text-slate-800 mb-3 select-all">
                        {opt.statusText}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onApplyCV({
                            personalInfo: {
                              ...cv.personalInfo,
                              workEligibility: opt.statusText,
                              workEligibilityType: opt.title
                            }
                          });
                          copyToClipboard(opt.statusText, `legal-${idx}`);
                        }}
                        className="flex-1 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5"
                      >
                        {copiedKey === `legal-${idx}` ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Zastosowano w Twoim CV!</span>
                          </>
                        ) : (
                          <>
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>Wstaw do mojego CV</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => copyToClipboard(opt.statusText, `copy-${idx}`)}
                        className="py-1.5 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
                        title="Kopiuj tekst"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Polish Trade Qualifications & Sanepid */}
              <div className="border-t border-slate-200 pt-5 space-y-3">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Kluczowe Uprawnienia Zawodowe w Polsce (Złoty bilet do natychmiastowej pracy)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                    <strong className="font-bold text-slate-900 block mb-1">Uprawnienia UDT (Wózki widłowe):</strong>
                    <p className="text-slate-600 text-[11px]">Wydawane przez Urząd Dozoru Technicznego. Kat. I WJO (wózki specjalizowane i wysokiego składu) lub II WJO. Obowiązkowe w każdym nowoczesnym magazynie w Polsce.</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                    <strong className="font-bold text-slate-900 block mb-1">Uprawnienia SEP (Elektryczne):</strong>
                    <p className="text-slate-600 text-[11px]">Grupa G1 (eksploatacja/dozór do 1 kV), G2 (cieplne) i G3 (gazowe). Kluczowe dla monterów, elektryków i techników utrzymania ruchu.</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                    <strong className="font-bold text-slate-900 block mb-1">Książeczka Sanepid:</strong>
                    <p className="text-slate-600 text-[11px]">Orzeczenie do celów sanitarno-epidemiologicznych. Wymagane w gastronomii, piekarniach, hotelarstwie, produkcji spożywczej i opiece medycznej.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KALKULATOR PENSJI NETTO */}
          {activeTab === 'salary' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <Calculator className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950 space-y-1">
                  <div className="font-extrabold text-sm">Kalkulator Wynagrodzeń Polska 2025/2026 (Brutto → Netto na rękę)</div>
                  <p>
                    W polskich ogłoszeniach o pracę stawki są prawie zawsze podawane w <strong>kwotach brutto</strong>. Oblicz dokładnie, ile pieniędzy faktycznie wpłynie na Twoje konto bankowe po odliczeniu ZUS, składki zdrowotnej NFZ i podatku dochodowego (PIT).
                  </p>
                </div>
              </div>

              {/* Calculator Inputs */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4 shadow-xs">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Wynagrodzenie Brutto (PLN):
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1000"
                        step="100"
                        value={grossSalary}
                        onChange={(e) => setGrossSalary(Number(e.target.value) || 0)}
                        className="w-full pl-3 pr-12 py-2.5 text-base font-extrabold border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                      />
                      <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-500">PLN</span>
                    </div>

                    {/* Quick Preset Buttons */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {[
                        { label: '4 666 zł (Min. 2025)', val: 4666 },
                        { label: '6 000 zł', val: 6000 },
                        { label: '8 000 zł', val: 8000 },
                        { label: '12 000 zł', val: 12000 },
                        { label: '16 000 zł', val: 16000 }
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setGrossSalary(item.val)}
                          className={`text-[10px] font-bold px-2 py-1 rounded-md border transition ${
                            grossSalary === item.val
                              ? 'bg-amber-600 text-white border-amber-600'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Rodzaj Umowy w Polsce:
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setContractType('uop')}
                        className={`py-2 px-1 text-xs font-bold rounded-lg border text-center transition ${
                          contractType === 'uop'
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        Umowa o Pracę
                      </button>
                      <button
                        type="button"
                        onClick={() => setContractType('uz')}
                        className={`py-2 px-1 text-xs font-bold rounded-lg border text-center transition ${
                          contractType === 'uz'
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        Umowa Zlecenie
                      </button>
                      <button
                        type="button"
                        onClick={() => setContractType('b2b')}
                        className={`py-2 px-1 text-xs font-bold rounded-lg border text-center transition ${
                          contractType === 'b2b'
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        B2B (Faktura)
                      </button>
                    </div>
                  </div>

                  {/* Special Discounts (Ulga do 26 lat) */}
                  {contractType !== 'b2b' && (
                    <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition">
                      <input
                        type="checkbox"
                        checked={isStudentUnder26}
                        onChange={(e) => setIsStudentUnder26(e.target.checked)}
                        className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-900 block">Ulga dla Młodych (Wiek poniżej 26 lat)</span>
                        <span className="text-[11px] text-slate-500">Zwolnienie z podatku PIT (0%). Na umowie zlecenie student otrzymuje 100% brutto!</span>
                      </div>
                    </label>
                  )}

                  {contractType === 'b2b' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Stawka Ryczałtu B2B:
                      </label>
                      <select
                        value={b2bTaxRate}
                        onChange={(e) => setB2bTaxRate(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                      >
                        <option value="8.5">8.5% (Usługi, gastronomia, handel)</option>
                        <option value="12">12% (IT, programowanie, konsulting)</option>
                        <option value="15">15% (Doradztwo, finanse, marketing)</option>
                        <option value="19">19% (Podatek liniowy z odliczaniem kosztów)</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Calculator Results Display */}
                <div className="lg:col-span-7 bg-slate-900 text-white rounded-xl p-5 sm:p-6 space-y-5 shadow-lg">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-1">
                      Szacowane wynagrodzenie „Na Rękę” (Netto):
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black text-amber-300 tracking-tight">
                        {salaryResults.netto.toLocaleString('pl-PL')}
                      </span>
                      <span className="text-xl font-bold text-amber-400">PLN / mc</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Kwota brutto: {grossSalary.toLocaleString('pl-PL')} PLN ({contractType.toUpperCase()})
                    </div>
                  </div>

                  {/* Deductions Breakdown */}
                  <div className="border-t border-slate-800 pt-4 space-y-2.5 text-xs">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Składki ZUS (Emerytalna, Rentowa, Chorobowa):</span>
                      <span className="font-mono font-bold text-white">-{salaryResults.zusPracownik.toLocaleString('pl-PL')} PLN</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Składka Zdrowotna NFZ (9%):</span>
                      <span className="font-mono font-bold text-white">-{salaryResults.zdrowotna.toLocaleString('pl-PL')} PLN</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Zaliczka na podatek dochodowy (PIT):</span>
                      <span className="font-mono font-bold text-white">-{salaryResults.pit.toLocaleString('pl-PL')} PLN</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400 pt-2 border-t border-slate-800/80">
                      <span>Łączny koszt dla pracodawcy (Brutto Brutto):</span>
                      <span className="font-mono font-bold text-emerald-400">~{salaryResults.kosztPracodawcy.toLocaleString('pl-PL')} PLN</span>
                    </div>
                  </div>

                  {/* Recruiter Salary Negotiation Tip */}
                  <div className="bg-slate-800/90 border border-slate-700 rounded-lg p-3 text-[11px] text-slate-300 leading-relaxed">
                    <strong className="text-amber-300 font-bold block mb-0.5">Wskazówka na rozmowę o stawkach:</strong>
                    Gdy polski rekruter zapyta: <em>„Jakie są Pana/Pani oczekiwania finansowe?”</em>, najlepiej odpowiedzieć widełkami brutto: <em>„Moje oczekiwania to {grossSalary.toLocaleString('pl-PL')} – {(grossSalary + 1000).toLocaleString('pl-PL')} PLN brutto na Umowie o Pracę (co daje ok. {salaryResults.netto.toLocaleString('pl-PL')} zł na rękę).”</em>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PORTALE PRACY & WIADOMOŚCI */}
          {activeTab === 'jobs' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <Send className="w-6 h-6 text-blue-700 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-950 space-y-1">
                  <div className="font-extrabold text-sm">Gdzie szukać pracy w Polsce i jak wysyłać zgłoszenia?</div>
                  <p>
                    Oto bezpośrednie linki do 5 największych platform zatrudnienia w Polsce oraz gotowe wiadomości aplikacyjne. Skopiuj tekst, wstaw swoje nazwisko i wyślij razem z wygenerowanym plikiem PDF!
                  </p>
                </div>
              </div>

              {/* Polish Job Boards Launchers */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { name: 'Pracuj.pl', desc: 'Baza nr 1 dla specjalistów, biura i inżynierii', url: 'https://www.pracuj.pl', color: 'border-blue-300 bg-blue-50/50' },
                  { name: 'OLX Praca', desc: 'Najlepszy dla kierowców, magazynu, budownictwa i gastronomii', url: 'https://www.olx.pl/praca/', color: 'border-cyan-300 bg-cyan-50/50' },
                  { name: 'Gowork.pl', desc: 'Ogłoszenia oraz opinie o pracodawcach w Polsce', url: 'https://www.gowork.pl/praca', color: 'border-amber-300 bg-amber-50/50' },
                  { name: 'Jooble Polska', desc: 'Wyszukiwarka ofert z całej Polski i UE', url: 'https://pl.jooble.org', color: 'border-purple-300 bg-purple-50/50' },
                  { name: 'LinkedIn PL', desc: 'Oferty dla IT, korporacji, logistyki i B2B', url: 'https://www.linkedin.com/jobs/', color: 'border-indigo-300 bg-indigo-50/50' }
                ].map((portal) => (
                  <a
                    key={portal.name}
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl border ${portal.color} hover:shadow-md transition text-left flex flex-col justify-between`}
                  >
                    <div>
                      <div className="font-extrabold text-sm text-slate-900 flex items-center justify-between">
                        <span>{portal.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-snug">{portal.desc}</p>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-700 mt-2">Otwórz portal →</span>
                  </a>
                ))}
              </div>

              {/* Ready-to-copy application message templates */}
              <div className="space-y-4 pt-2">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Copy className="w-4 h-4 text-indigo-600" />
                  <span>Gotowe Wzorce Wiadomości do Pracodawcy (1-Click Kopiuj)</span>
                </h3>

                {/* Template 1: OLX / Pracuj Quick Message */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">
                      Wzór 1: Wiadomość na portalu (OLX / Pracuj.pl – krótka, konkretna, wysoka skuteczność)
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const msg = `Dzień dobry,\n\nZgłaszam swoją kandydaturę na ogłoszone stanowisko. Posiadam odpowiednie doświadczenie, wymagane uprawnienia oraz pełną gotowość do natychmiastowego podjęcia pracy.\n\nW załączniku przesyłam moje profesjonalne CV z klauzulą RODO.\n\nZ chęcią odpowiem na pytania pod numerem telefonu: ${cv.personalInfo.phone || '+48 000 000 000'}.\n\nPozdrawiam serdecznie,\n${cv.personalInfo.fullName || 'Kandydat'}`;
                        copyToClipboard(msg, 'msg-1');
                      }}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                    >
                      {copiedKey === 'msg-1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'msg-1' ? 'Skopiowano!' : 'Kopiuj Wiadomość'}</span>
                    </button>
                  </div>
                  <pre className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs font-sans text-slate-800 whitespace-pre-wrap leading-relaxed">
{`Dzień dobry,

Zgłaszam swoją kandydaturę na ogłoszone stanowisko. Posiadam odpowiednie doświadczenie, wymagane uprawnienia oraz pełną gotowość do natychmiastowego podjęcia pracy.

W załączniku przesyłam moje profesjonalne CV z klauzulą RODO.

Z chęcią odpowiem na pytania pod numerem telefonu: ${cv.personalInfo.phone || '+48 500 000 000'}.

Pozdrawiam serdecznie,
${cv.personalInfo.fullName || 'Kandydat'}`}
                  </pre>
                </div>

                {/* Template 2: Foreign Worker / Legal Status Confirmation */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">
                      Wzór 2: Dla pracownika z zagranicy (Ukraina / cudzoziemiec z potwierdzeniem legalności)
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const msg = `Szanowni Państwo,\n\nW odpowiedzi na ogłoszenie o pracę przesyłam swoje CV. Posiadam legalny pobyt i pełne prawo do wykonywania pracy w Polsce (${cv.personalInfo.workEligibility || 'PESEL UKR / Karta Pobytu'}).\n\nPosiadam udokumentowane doświadczenie oraz dobrą znajomość języka polskiego. Jestem osobą sumienną, bez nałogów i gotową do podjęcia zatrudnienia od zaraz.\n\nBędę wdzięczny za kontakt: ${cv.personalInfo.phone || '+48 000 000 000'}.\n\nZ poważaniem,\n${cv.personalInfo.fullName || 'Kandydat'}`;
                        copyToClipboard(msg, 'msg-2');
                      }}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                    >
                      {copiedKey === 'msg-2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'msg-2' ? 'Skopiowano!' : 'Kopiuj Wiadomość'}</span>
                    </button>
                  </div>
                  <pre className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs font-sans text-slate-800 whitespace-pre-wrap leading-relaxed">
{`Szanowni Państwo,

W odpowiedzi na ogłoszenie o pracę przesyłam swoje CV. Posiadam legalny pobyt i pełne prawo do wykonywania pracy w Polsce (${cv.personalInfo.workEligibility || 'PESEL UKR / Karta Pobytu'}).

Posiadam udokumentowane doświadczenie oraz dobrą znajomość języka polskiego. Jestem osobą sumienną, bez nałogów i gotową do podjęcia zatrudnienia od zaraz.

Będę wdzięczny za kontakt: ${cv.personalInfo.phone || '+48 500 000 000'}.

Z poważaniem,
${cv.personalInfo.fullName || 'Kandydat'}`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PYTANIA NA ROZMOWIE */}
          {activeTab === 'interview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-start gap-3">
                <MessageSquare className="w-6 h-6 text-purple-700 shrink-0 mt-0.5" />
                <div className="text-xs text-purple-950 space-y-1">
                  <div className="font-extrabold text-sm">Przewodnik po Rozmowie Kwalifikacyjnej w Polsce</div>
                  <p>
                    Polscy pracodawcy cenią konkretne odpowiedzi, punktualność oraz kulturę osobistą. Zapoznaj się z 6 najczęściej zadawanymi pytaniami i modelowymi odpowiedziami, które pozwolą Ci zdobyć zatrudnienie.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    q: '1. „Proszę opowiedzieć o swoim doświadczeniu i dlaczego ta praca?”',
                    a: 'Mów krótko (max 2 minuty): od ilu lat pracujesz w branży, jakie konkretne maszyny/narzędzia obsługujesz (np. wózki widłowe, spawarka, SAP) i dlaczego ta firma odpowiada Twoim kwalifikacjom.',
                    tip: 'Unikaj opowiadania o całym życiu prywatnym; skup się na swoich atutach zawodowych.'
                  },
                  {
                    q: '2. „Jakie są Pana/Pani oczekiwania finansowe?”',
                    a: 'Zawsze podawaj stawkę brutto lub jasno zaznacz: „Oczekuję kwoty X zł netto (na rękę) przy umowie o pracę”. Możesz skorzystać z zakładki Kalkulator Pensji w naszym programie!',
                    tip: 'Nie mów „tyle, ile dacie” – to brzmi niepewnie. Sprawdź rynkowe widełki w naszej zakładce kalkulatora.'
                  },
                  {
                    q: '3. „Kiedy najwcześniej może Pan/Pani zacząć?”',
                    a: 'Jeśli nie pracujesz: „Mogę zacząć od zaraz, po przejściu badań lekarskich BHP”. Jeśli pracujesz: wskaż dokładny okres wypowiedzenia (zwykle 2 tygodnie lub 1 miesiąc).',
                    tip: 'Gotowość do pracy od poniedziałku jest olbrzymim plusem dla agencji i kierowników magazynów.'
                  },
                  {
                    q: '4. „Jaki jest Pana/Pani status legalności pobytu i pracy w Polsce?”',
                    a: '„Posiadam legalny pobyt na podstawie PESEL UKR / Karty Pobytu / Obywatelstwa UE. Zgodnie z polskim prawem mogą mnie Państwo zatrudnić natychmiast bez oczekiwania na decyzję wojewody”.',
                    tip: 'Pewność w tej odpowiedzi zdejmuje z rekrutera strach przed procedurami urzędowymi.'
                  },
                  {
                    q: '5. „Czy posiada Pan/Pani badania lekarskie i uprawnienia?”',
                    a: 'Wymień posiadane dokumenty: „Posiadam ważne uprawnienia UDT / prawo jazdy / certyfikat spawalniczy / książeczkę Sanepid oraz jestem gotowy na skierowanie na badania medycyny pracy”.',
                    tip: 'Badania wstępne medycyny pracy zawsze opłaca pracodawca w Polsce.'
                  },
                  {
                    q: '6. „Czy ma Pan/Pani jakieś pytania do nas?”',
                    a: 'Zawsze zadaj 1-2 pytania: „Jak wygląda typowy dzień na tym stanowisku?”, „Czy zapewniają Państwo odzież roboczą BHP i szkolenie stanowiskowe?”, „Jaki jest system zmianowy?”.',
                    tip: 'Zadawanie pytań pokazuje pracodawcy, że jesteś odpowiedzialnym pracownikiem.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs space-y-1.5">
                    <div className="font-extrabold text-sm text-slate-900">{item.q}</div>
                    <div className="text-xs text-slate-700 bg-slate-50 rounded-lg p-2.5 border border-slate-200">
                      <strong>Wzorcowa odpowiedź:</strong> {item.a}
                    </div>
                    <div className="text-[11px] text-purple-700 font-medium">
                      💡 <em>Wskazówka rekrutera:</em> {item.tip}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex items-center justify-between text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>
              {isEn 
                ? 'Compliant with Polish Labor Code & EU GDPR/RODO 2025/2026 standards' 
                : 'Zgodne z polskimi przepisami Kodeksu Pracy i standardami RODO 2025/2026'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition"
          >
            {isEn ? 'Close Assistant' : 'Zamknij Asystenta'}
          </button>
        </div>

      </div>
    </div>
  );
};
