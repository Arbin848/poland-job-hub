import React, { useState } from 'react';
import { CVData, LanguageCode } from '../types/cv';
import {
  X,
  Calculator,
  ShieldCheck,
  Briefcase,
  MessageSquare,
  Building,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info,
  DollarSign,
  TrendingUp,
  Volume2
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cv: CVData;
  onChangeCv: (updated: CVData) => void;
  language: LanguageCode;
  initialSection?: 'salary' | 'legal' | 'jobs' | 'interview' | 'agency';
}

export const CareerKit: React.FC<Props> = ({
  isOpen,
  onClose,
  cv,
  onChangeCv,
  language,
  initialSection = 'salary'
}) => {
  const [section, setSection] = useState<'salary' | 'legal' | 'jobs' | 'interview' | 'agency'>(initialSection);
  const isPl = language === 'pl';

  // Salary Calculator State
  const [grossSalary, setGrossSalary] = useState<number>(6500);
  const [contractType, setContractType] = useState<'uop' | 'uz' | 'b2b'>('uop');
  const [isStudentUnder26, setIsStudentUnder26] = useState<boolean>(false);
  const [b2bTaxRate, setB2bTaxRate] = useState<number>(12);

  // Audio speech synthesis helper
  const speakPolish = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pl-PL';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Poland Salary Calculation
  const calculateSalary = () => {
    const gross = Math.max(0, grossSalary);

    if (contractType === 'uop') {
      const emerytalna = gross * 0.0976;
      const rentowa = gross * 0.015;
      const chorobowa = gross * 0.0245;
      const totalSpoleczne = emerytalna + rentowa + chorobowa;
      const podstawaZdrowotna = Math.max(0, gross - totalSpoleczne);
      const zdrowotna = podstawaZdrowotna * 0.09;
      
      const kosztyUzyskania = 250;
      const kwotaZmniejszajaca = 300;
      const podstawaPit = Math.max(0, Math.round(gross - totalSpoleczne - kosztyUzyskania));
      
      let pit = 0;
      if (!isStudentUnder26) {
        pit = Math.max(0, Math.round(podstawaPit * 0.12 - kwotaZmniejszajaca));
      }

      const netto = Math.round(gross - totalSpoleczne - zdrowotna - pit);
      const employerCost = Math.round(gross * 1.2048);

      return {
        netto: Math.max(0, netto),
        zusWorker: Math.round(totalSpoleczne),
        zdrowotna: Math.round(zdrowotna),
        pit: Math.round(pit),
        employerCost
      };
    } else if (contractType === 'uz') {
      if (isStudentUnder26) {
        return {
          netto: Math.round(gross),
          zusWorker: 0,
          zdrowotna: 0,
          pit: 0,
          employerCost: Math.round(gross)
        };
      }
      const emerytalna = gross * 0.0976;
      const rentowa = gross * 0.015;
      const totalSpoleczne = emerytalna + rentowa;
      const podstawaZdrowotna = Math.max(0, gross - totalSpoleczne);
      const zdrowotna = podstawaZdrowotna * 0.09;
      const kosztyUzyskania = (gross - totalSpoleczne) * 0.20;
      const podstawaPit = Math.max(0, Math.round(gross - totalSpoleczne - kosztyUzyskania));
      const pit = Math.max(0, Math.round(podstawaPit * 0.12));
      const netto = Math.round(gross - totalSpoleczne - zdrowotna - pit);
      return {
        netto: Math.max(0, netto),
        zusWorker: Math.round(totalSpoleczne),
        zdrowotna: Math.round(zdrowotna),
        pit: Math.round(pit),
        employerCost: Math.round(gross * 1.20)
      };
    } else {
      // B2B
      const zusB2B = 1600; // Mały ZUS / standard ryczałt
      const zdrowotnaB2B = 420;
      const podatek = Math.round((gross - zusB2B) * (b2bTaxRate / 100));
      const netto = Math.round(gross - zusB2B - zdrowotnaB2B - podatek);
      return {
        netto: Math.max(0, netto),
        zusWorker: zusB2B,
        zdrowotna: zdrowotnaB2B,
        pit: podatek,
        employerCost: Math.round(gross)
      };
    }
  };

  const salaryResults = calculateSalary();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-2xs flex justify-end animate-in fade-in">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm">
              <Briefcase className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {isPl ? 'Career Kit · Niezbędnik Kandydata w Polsce' : 'Career Kit · Poland Candidate Toolkit'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {isPl ? 'Wynagrodzenia, prawo pracy, agencje i rozmowa rekrutacyjna' : 'Salaries, work permits, agency directory & interview prep'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50"
            aria-label={isPl ? 'Zamknij' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="flex border-b border-slate-200 bg-white px-3 py-2 gap-1 overflow-x-auto shrink-0 text-xs font-semibold">
          {[
            { id: 'salary', labelPl: 'Kalkulator Płac', labelEn: 'Salary Calc', icon: <Calculator className="w-3.5 h-3.5" /> },
            { id: 'legal', labelPl: 'Legalizacja RP', labelEn: 'Work Permits', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
            { id: 'jobs', labelPl: 'Portale & Agencje', labelEn: 'Job Boards', icon: <TrendingUp className="w-3.5 h-3.5" /> },
            { id: 'interview', labelPl: 'Rozmowa & Audio', labelEn: 'Interview & Audio', icon: <MessageSquare className="w-3.5 h-3.5" /> },
            { id: 'agency', labelPl: 'Weryfikacja Agencji', labelEn: 'Agency Desk', icon: <Building className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSection(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1.5 transition ${
                section === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{isPl ? tab.labelPl : tab.labelEn}</span>
            </button>
          ))}
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs">
          {/* 1. Salary Calculator */}
          {section === 'salary' && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-slate-800 text-sm">
                    {isPl ? 'Szacowane wynagrodzenie "na rękę" (Netto)' : 'Estimated Take-Home Pay (Netto)'}
                  </span>
                  <span className="text-xl font-black font-mono text-indigo-700">
                    {salaryResults.netto.toLocaleString('pl-PL')} PLN
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div>Składki ZUS: <strong className="font-mono">{salaryResults.zusWorker.toLocaleString('pl-PL')} PLN</strong></div>
                  <div>Zdrowotna (9%): <strong className="font-mono">{salaryResults.zdrowotna.toLocaleString('pl-PL')} PLN</strong></div>
                  <div>Zaliczka PIT: <strong className="font-mono">{salaryResults.pit.toLocaleString('pl-PL')} PLN</strong></div>
                  <div>Koszt pracodawcy: <strong className="font-mono">{salaryResults.employerCost.toLocaleString('pl-PL')} PLN</strong></div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isPl ? 'Wynagrodzenie miesięczne Brutto (PLN):' : 'Monthly Gross Salary (PLN):'}
                </label>
                <input
                  type="number"
                  step={100}
                  value={grossSalary}
                  onChange={(e) => setGrossSalary(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-bold font-mono border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isPl ? 'Forma zatrudnienia w Polsce:' : 'Contract Type in Poland:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'uop', label: 'Umowa o Pracę' },
                    { id: 'uz', label: 'Umowa Zlecenie' },
                    { id: 'b2b', label: 'B2B / Ryczałt' }
                  ].map((ct) => (
                    <button
                      key={ct.id}
                      type="button"
                      onClick={() => setContractType(ct.id as any)}
                      className={`p-2 rounded-lg border text-center font-bold transition ${
                        contractType === ct.id
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {ct.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="student-under-26"
                  checked={isStudentUnder26}
                  onChange={(e) => setIsStudentUnder26(e.target.checked)}
                  className="rounded text-indigo-600 w-4 h-4"
                />
                <label htmlFor="student-under-26" className="text-xs text-slate-700 font-medium cursor-pointer">
                  {isPl ? 'Ulga dla młodych / Status studenta do 26. roku życia (0% PIT)' : 'Under 26 / Student tax relief (0% PIT)'}
                </label>
              </div>
            </div>
          )}

          {/* 2. Legalization & Work Permits */}
          {section === 'legal' && (
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-[11px] leading-relaxed">
                {isPl
                  ? 'Zgodnie z przepisami Kodeksu Pracy i Ustawy o Promocji Zatrudnienia, legalna praca cudzoziemca wymaga ważnego tytułu pobytowego oraz dokumentu uprawniającego do pracy.'
                  : 'Under Polish labor law, foreign candidates require both a valid residency title and legal authorization to take up employment.'}
              </div>

              {[
                {
                  titlePl: '1. Obywatelstwo UE / EOG / Szwajcarii',
                  titleEn: '1. EU / EEA / Swiss Citizenship',
                  descPl: 'Swobodny dostęp do polskiego rynku pracy bez konieczności uzyskiwania zezwolenia (art. 45 TFUE).',
                  descEn: 'Unrestricted access to the Polish labor market without a work permit.'
                },
                {
                  titlePl: '2. Karta Pobytu z adnotacją "Dostęp do rynku pracy"',
                  titleEn: '2. Residence Card with "Dostęp do rynku pracy"',
                  descPl: 'Pobyt czasowy (jednolite zezwolenie na pobyt i pracę) lub pobyt stały / rezydent długoterminowy UE.',
                  descEn: 'Temporary or permanent residence permit with explicit right to work in Poland.'
                },
                {
                  titlePl: '3. PESEL UKR (Specustawa ukraińska)',
                  titleEn: '3. PESEL UKR (Temporary Protection Ukraine)',
                  descPl: 'Dostęp do rynku pracy na podstawie powiadomienia do Powiatowego Urzędu Pracy (PUP) w terminie 7 dni.',
                  descEn: 'Simplified hiring via employer notification to the District Labor Office within 7 days.'
                },
                {
                  titlePl: '4. Oświadczenie o powierzeniu wykonywania pracy',
                  titleEn: '4. Employer Declaration (Oświadczenie)',
                  descPl: 'Uproszczona procedura dla obywateli wybranych państw do 24 miesięcy rejestrowana w PUP.',
                  descEn: 'Fast-track declaration registered by the Polish employer for up to 24 months.'
                }
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="font-bold text-slate-900">{isPl ? item.titlePl : item.titleEn}</div>
                  <div className="text-[11px] text-slate-600 mt-1">{isPl ? item.descPl : item.descEn}</div>
                </div>
              ))}
            </div>
          )}

          {/* 3. Job Boards */}
          {section === 'jobs' && (
            <div className="space-y-3">
              {[
                { name: 'Pracuj.pl', url: 'https://pracuj.pl', descPl: 'Główny portal rekrutacyjny dla specjalistów i korporacji w Polsce.', descEn: 'Leading recruitment portal for professionals and corporate roles.' },
                { name: 'NoFluffJobs', url: 'https://nofluffjobs.com', descPl: 'Oferty IT, tech i finance z obowiązkowymi widełkami wynagrodzeń.', descEn: 'Tech and IT job board with mandatory salary brackets.' },
                { name: 'JustJoin.it', url: 'https://justjoin.it', descPl: 'Największy portal pracy w polskiej branży IT i inżynierii oprogramowania.', descEn: 'Largest IT and software engineering job board in Poland.' },
                { name: 'OLX Praca', url: 'https://olx.pl/praca', descPl: 'Praca fizyczna, logistyka, gastronomia, handel i usługi lokalne.', descEn: 'Vocational, logistics, warehouse, trade and local employment.' },
                { name: 'Centralna Baza Ofert Pracy (CBOP)', url: 'https://oferty.praca.gov.pl', descPl: 'Oficjalny państwowy rejestr Urzędów Pracy w Polsce.', descEn: 'Official national job register of Polish Public Employment Services.' }
              ].map((board) => (
                <div key={board.name} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">{board.name}</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">{isPl ? board.descPl : board.descEn}</p>
                  </div>
                  <a
                    href={board.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-indigo-600 hover:text-indigo-800 shrink-0"
                    title={board.name}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* 4. Interview Prep & Audio Flashcards */}
          {section === 'interview' && (
            <div className="space-y-3">
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-indigo-900">
                    {isPl ? 'Fiszki z Wymową Audio (Web Speech API)' : 'Audio Interview Phrase Cards'}
                  </div>
                  <p className="text-[11px] text-indigo-700 mt-0.5">
                    {isPl ? 'Kliknij głośnik, aby usłyszeć poprawną polską wymowę zwrotów rekrutacyjnych.' : 'Click the speaker to hear native Polish pronunciation for interviews.'}
                  </p>
                </div>
              </div>

              {[
                {
                  phrasePl: 'Dzień dobry, aplikuję na stanowisko specjalisty ds. logistyki.',
                  transEn: 'Good morning, I am applying for the logistics specialist role.',
                  phonetic: 'Dzyen\' dob-ry, ap-lee-koo-ye na sta-no-vees-ko...'
                },
                {
                  phrasePl: 'Posiadam ponad 4-letnie udokumentowane doświadczenie w branży.',
                  transEn: 'I have over 4 years of verified industry experience.',
                  phonetic: 'Po-shya-dam po-nad chter-o let-nye do-shvyad-che-nye...'
                },
                {
                  phrasePl: 'Posiadam uprawnienia UDT oraz prawo jazdy kategorii B.',
                  transEn: 'I hold UDT machinery certification and category B driver\'s license.',
                  phonetic: 'Po-shya-dam oop-rav-nyen-ya Oo-De-Teh o-raz pra-vo yaz-dy...'
                },
                {
                  phrasePl: 'Mogę rozpocząć pracę od zaraz lub z 2-tygodniowym okresem wypowiedzenia.',
                  transEn: 'I can start immediately or after a 2-week notice period.',
                  phonetic: 'Mo-ge roz-po-chonts pra-tse od za-raz...'
                }
              ].map((card, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-slate-900 text-xs">{card.phrasePl}</p>
                    <button
                      type="button"
                      onClick={() => speakPolish(card.phrasePl)}
                      className="p-1.5 text-indigo-600 hover:text-indigo-800 bg-white border border-indigo-100 rounded-lg hover:bg-indigo-50 shrink-0"
                      title={isPl ? 'Odtwórz wymowę' : 'Listen pronunciation'}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-600">{card.transEn}</p>
                  <p className="text-[10px] font-mono text-slate-400 bg-white p-1 rounded border border-slate-100">
                    {card.phonetic}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 5. Agency Desk & Verification */}
          {section === 'agency' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="font-bold text-slate-900">
                  {isPl ? 'Odznaka Weryfikacji Agencji w Twoim CV' : 'Agency Verification Badge in CV'}
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {isPl
                    ? 'Współpracujesz z agencją zatrudnienia? Możesz dołączyć oznaczenie agencji w nagłówku CV jednym kliknięciem:'
                    : 'Working with a recruitment agency? Attach agency attribution to your CV header in one click:'}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    onChangeCv({
                      ...cv,
                      agencyBadge: {
                        enabled: !cv.agencyBadge?.enabled,
                        agencyName: cv.agencyBadge?.agencyName || 'PolJobHub'
                      }
                    })
                  }
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    cv.agencyBadge?.enabled
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>
                    {cv.agencyBadge?.enabled
                      ? (isPl ? '✓ Nagłówek Agencji Włączony' : '✓ Agency Header Active')
                      : (isPl ? 'Włącz Oznaczenie Agencji' : 'Enable Agency Header')}
                  </span>
                </button>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="font-bold text-slate-800 text-xs">
                  {isPl ? 'Top Agencje Pracy w Polsce (KRAZ):' : 'Leading Polish Employment Agencies (KRAZ):'}
                </span>
                <ul className="list-disc pl-4 text-[11px] text-slate-600 space-y-1">
                  <li>Randstad Polska (Wszystkie branże, produkcja, logistyka)</li>
                  <li>ManpowerGroup Polska (Specjaliści, inżynieria, biuro)</li>
                  <li>Adecco Poland (Magazyny, SSC/BPO, IT)</li>
                  <li>Gi Group Poland (Praca tymczasowa i stała)</li>
                  <li>Trenkwalder Polska (Cudzoziemcy i relokacja do RP)</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
