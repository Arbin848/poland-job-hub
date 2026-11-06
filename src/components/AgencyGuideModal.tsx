import React from 'react';
import { LanguageCode } from '../types/cv';
import { BookOpen, ShieldCheck, Camera, Globe, Car, HelpCircle, FileCheck } from 'lucide-react';
import { useEscapeKey } from '../hooks/useEscapeKey';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
}

export const AgencyGuideModal: React.FC<Props> = ({ isOpen, onClose, language }) => {
  useEscapeKey(onClose, isOpen);

  if (!isOpen) return null;
  const isPl = language === 'pl';

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isPl ? 'Poradnik Agencji: Jak Napisać Perfekcyjne CV w Polsce' : 'Agency Guide: Secrets of High-Impact CVs in Poland & EU'}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 my-8 max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-slate-800" />
            <h2 className="text-lg font-bold text-slate-900">
              {isPl ? 'Poradnik Agencji: Jak Napisać Perfekcyjne CV w Polsce' : 'Agency Guide: Secrets of High-Impact CVs in Poland & EU'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isPl ? 'Zamknij' : 'Close'}
            className="p-1 text-slate-400 hover:text-slate-600 font-bold rounded"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 my-4 text-xs leading-relaxed text-slate-700">
          {/* Tip 1: RODO */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>1. {isPl ? 'Klauzula RODO – Prawny warunek konieczny w Polsce' : '1. Polish GDPR (RODO) Clause'}</span>
            </div>
            <p>
              {isPl
                ? 'W Polsce agencje i pracodawcy podlegają karom UODO za przetwarzanie danych bez zgody kandydata. Jeśli wysyłasz CV do agencji pracy, ZAWSZE wybieraj klauzulę z dopiskiem "na potrzeby przyszłych rekrutacji" – dzięki temu konsultanci mogą legalnie zaproponować Ci kolejne oferty, gdy pojawi się nowe zlecenie.'
                : 'Polish recruiters face regulatory fines for processing data without explicit consent. When applying through staffing agencies, always select the clause permitting "future recruitment processes" so consultants can retain your profile.'}
            </p>
          </div>

          {/* Tip 2: Photo */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
              <Camera className="w-4 h-4 text-slate-700" />
              <span>2. {isPl ? 'Zdjęcie w CV: Standard w Polsce czy zbędny dodatek?' : '2. Headshots in Polish CVs'}</span>
            </div>
            <p>
              {isPl
                ? 'W Polsce ok. 75% pracodawców na stanowiskach biurowych, handlowych i obsługi klienta pozytywnie ocenia profesjonalne zdjęcie twarzy. Jednak w branży IT oraz przy aplikacjach do firm w USA/UK zdjęcie często jest odradzane ze względu na procedury antydyskryminacyjne. W PolCV Studio możesz włączyć lub wyłączyć zdjęcie jednym kliknięciem.'
                : 'In Poland, headshots remain common for client-facing and corporate roles. In tech and US/UK multinationals, no-photo resumes are preferred. Toggle on or off as needed.'}
            </p>
          </div>

          {/* Tip 3: Work permit for foreigners */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
              <FileCheck className="w-4 h-4 text-emerald-700" />
              <span>3. {isPl ? 'Dla cudzoziemców w Polsce: Status prawny i prawo do pracy' : '3. For International Applicants in Poland'}</span>
            </div>
            <p>
              {isPl
                ? 'Jeśli jesteś obcokrajowcem pracującym w Polsce, polskie działy HR często obawiają się procedur legalizacyjnych. Dodaj w sekcji danych osobowych jasną informację: "Karta Pobytu z dostępem do rynku pracy", "Student stacjonarny w RP (zwolniony z zezwolenia)", lub "Obywatel UE". To natychmiast usuwa wątpliwości rekrutera.'
                : 'Polish HR departments often hesitate if legal work status is unclear. Explicitly state: "EU Citizen", "Karta Pobytu with labor market access", or "Full-time student in Poland (exempt from work permit)".'}
            </p>
          </div>

          {/* Tip 4: Languages CEFR */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
              <Globe className="w-4 h-4 text-indigo-700" />
              <span>4. {isPl ? 'Skala CEFR (A1-C2) zamiast "angielski komunikatywny"' : '4. Standard CEFR Language Scale'}</span>
            </div>
            <p>
              {isPl
                ? 'Nigdy nie pisz "angielski dobry" ani nie rysuj 4/5 kropek. Rekruterzy nie wiedzą, co to znaczy. Podaj dokładny poziom Rady Europy: B1 (proste rozmowy), B2 (płynna praca), C1 (zaawansowane negocjacje). W Europass było to cenione i ten element w pełni zachowujemy w PolCV Studio.'
                : 'Never use ambiguous terms like "good english" or graphic star ratings. Use CEFR levels: B1, B2, C1. This is the single strongest asset retained from the European framework.'}
            </p>
          </div>

          {/* Tip 5: Driving License & Technical Certifications */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
              <Car className="w-4 h-4 text-amber-700" />
              <span>5. {isPl ? 'Prawo jazdy (B, C, C+E) oraz uprawnienia UDT / SEP' : '5. Driving Licenses & Vocational Permits'}</span>
            </div>
            <p>
              {isPl
                ? 'W branżach takich jak logistyka, technika, produkcja, serwis czy handel, prawo jazdy kat. B oraz uprawnienia Urzędu Dozoru Technicznego (UDT) są często kryterium bezwzględnym. Umieść je wyraźnie na pierwszej stronie.'
                : 'In logistics, field engineering, and sales, driving licenses (Cat. B/C) and state technical permits (UDT, SEP) are top filtering criteria. Keep them prominent.'}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold"
          >
            {isPl ? 'Rozumiem, wróć do edytora' : 'Got it, back to editor'}
          </button>
        </div>
      </div>
    </div>
  );
};
