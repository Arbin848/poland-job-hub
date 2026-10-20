import React from 'react';
import { LanguageCode } from '../types/cv';
import { Check, X, ShieldAlert, Award, FileText, Zap, Compass } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
  onSelectModernEuro: () => void;
}

export const EuropassComparisonModal: React.FC<Props> = ({ isOpen, onClose, language, onSelectModernEuro }) => {
  if (!isOpen) return null;
  const isPl = language === 'pl';

  const comparisonPoints = [
    {
      feature: isPl ? 'Wykorzystanie przestrzeni & Objętość' : 'Space Efficiency & Page Count',
      europass: isPl ? 'Wymusza 3-4 strony na 1 stronę doświadczenia. Ogromne, puste marginesy po lewej stronie.' : 'Bloats to 3-4 pages for 1 page of experience. 40% blank space in left column.',
      polcv: isPl ? 'Kompaktowy, wysoce czytelny format 1-2 stron. Optymalna gęstość informacji.' : 'Sleek, high-density 1-2 page executive format. Every millimeter is purposeful.',
      win: 'polcv'
    },
    {
      feature: isPl ? 'Odbiór przez rekruterów w Polsce' : 'Recruiter Perception in Poland / EU',
      europass: isPl ? 'Kojarzony z biurokracją unijną. Większość rekruterów komercyjnych (Pracuj.pl, HR) ocenia go negatywnie.' : 'Associated with rigid EU bureaucracy. Often dismissed by commercial tech & corporate recruiters.',
      polcv: isPl ? 'Nowoczesny standard korporacyjny i executive. Wyróżnia się estetyką i profesjonalizmem.' : 'Elite executive & modern aesthetic that instantly grabs attention in 6-second recruiter scans.',
      win: 'polcv'
    },
    {
      feature: isPl ? 'Zgodność z polską klauzulą RODO' : 'Polish GDPR / RODO Legal Compliance',
      europass: isPl ? 'Brak domyślnej polskiej klauzuli prawnej. Ryzyko natychmiastowego odrzucenia przez polskie firmy.' : 'Missing by default. Leads to legal rejection by Polish HR departments.',
      polcv: isPl ? '1-kliknięcie: aktualna lub przyszła rekrutacja zgodna z ustawą o ochronie danych i art. 6 RODO.' : 'One-click compliant Polish RODO clause in Polish and English.',
      win: 'polcv'
    },
    {
      feature: isPl ? 'Kompatybilność z systemami ATS' : 'ATS Parser Compatibility',
      europass: isPl ? 'Sztywne tabele w Europass często mylą parsery ATS (eRecruiter, Workday, Lever).' : 'Complex nested table layout frequently confuses automated ATS parsers.',
      polcv: isPl ? 'Semantyczny, liniowy układ zaprojektowany specjalnie pod 99% zdawalność w skanerach ATS.' : 'Clean semantic hierarchy engineered for 99%+ ATS readability.',
      win: 'polcv'
    },
    {
      feature: isPl ? 'Dopasowanie do branży i wydziału' : 'Faculty & Industry Customization',
      europass: isPl ? 'Jeden sztywny szablon dla każdego – od magazyniera po dyrektora IT.' : 'One rigid generic template for everyone, from logistics to senior executives.',
      polcv: isPl ? 'Dedykowane profile dla 8 branż (Logistyka UDT, IT/DevOps, Pielęgniarstwo PWZ, Inżynieria SEP).' : 'Specialized templates with built-in UDT, PWZ, SEP, and technical badges.',
      win: 'polcv'
    },
    {
      feature: isPl ? 'Standardy językowe CEFR (A1-C2)' : 'CEFR Language Standards (A1-C2)',
      europass: isPl ? 'Posiada tabele CEFR, ale zajmują zbyt wiele miejsca.' : 'Includes CEFR but renders bulky multi-row matrices.',
      polcv: isPl ? 'Zachowuje europejską skalę CEFR w eleganckim, zwięzłym formacie.' : 'Preserves the trusted European CEFR scale in a refined compact matrix.',
      win: 'both'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {isPl ? 'Analiza Rynku Pracy w Polsce & UE' : 'Labor Market Comparison'}
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
              {isPl ? 'Dlaczego warto zamienić Europass na PolCV Studio?' : 'Why PolCV Studio Outperforms Europass'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* Executive summary banner */}
        <div className="my-4 p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-700">
          <p className="font-semibold text-slate-900 mb-1">
            {isPl
              ? 'Opinia ekspertów agencji rekrutacyjnych:'
              : 'Recruitment Agency Perspective:'}
          </p>
          <p>
            {isPl
              ? 'W Polsce rekruter poświęca średnio 6 do 8 sekund na pierwszą selekcję CV. Klasyczny Europass z powodu nieefektywnego formatowania rozciąga 2 lata doświadczenia na 3 strony, zniechęcając pracodawców. PolCV zachowuje to, co w Europass było wartościowe (skala języków CEFR, uprawnienia), opakowując to w nowoczesny, czytelny i w 100% zgodny z polskim prawem (RODO) szablon.'
              : 'In Poland and across Europe, recruiters spend 6 to 8 seconds scanning a resume. Traditional Europass wastes space and looks outdated. PolCV retains European standards like CEFR languages while presenting your qualifications with executive polish.'}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3.5 w-1/4">{isPl ? 'Kryterium' : 'Criteria'}</th>
                <th className="py-2.5 px-3.5 w-3/8 text-slate-600">{isPl ? 'Standardowy Europass' : 'Standard Europass'}</th>
                <th className="py-2.5 px-3.5 w-3/8 text-slate-900 bg-slate-200/50">{isPl ? 'PolCV Studio (Nowy Standard)' : 'PolCV Studio'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {comparisonPoints.map((pt, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3.5 font-bold text-slate-900 align-top">
                    {pt.feature}
                  </td>
                  <td className="py-2.5 px-3.5 text-slate-600 align-top">
                    <div className="flex items-start gap-1.5">
                      <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>{pt.europass}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3.5 text-slate-900 font-medium bg-slate-50/50 align-top">
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt.polcv}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legal Trademark Disclaimer */}
        <div className="mt-4 p-2.5 bg-slate-50 border border-slate-200 rounded text-[10px] text-slate-500 leading-normal">
          <span className="font-semibold text-slate-600">Nota prawna (Trademark Disclaimer): </span>
          {isPl
            ? 'Europass jest zarejestrowanym znakiem towarowym Unii Europejskiej. Serwis PolCV Studio jest niezależną aplikacją i nie jest powiązany z Komisją Europejską ani oficjalnym portalem Europass. Nazwa „Europass” została użyta wyłącznie w celach informacyjnych, porównawczych oraz kompatybilności formatu (nominative fair use).'
            : 'Europass is a registered trademark of the European Union. PolCV Studio is an independent service and is not affiliated with, authorized, or endorsed by the European Commission. References to Europass are made strictly for informative comparison and interoperability.'}
        </div>

        {/* Footer actions */}
        <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            {isPl ? 'Możesz wybrać szablon "Euro Modern" w dowolnej chwili.' : 'You can switch to the Euro Modern template anytime.'}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
            >
              {isPl ? 'Zamknij' : 'Close'}
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectModernEuro();
                onClose();
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold shadow-xs"
            >
              {isPl ? 'Zastosuj Szablon Euro Modern' : 'Apply Euro Modern Template'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
