import React from 'react';
import { CVData } from '../../types/cv';
import { ShieldCheck, CheckSquare, FileText, AlertCircle, Stamp, UserCheck, Calendar } from 'lucide-react';
import { QrCodeBadge } from '../common/QrCodeBadge';

interface Props {
  cv: CVData;
}

export const LegalPacketCanvas: React.FC<Props> = ({ cv }) => {
  const isPl = cv.language === 'pl';
  const { personalInfo, agencyProfile, accentColor } = cv;
  const primary = accentColor || '#1e3a8a';

  return (
    <div className="bg-white text-slate-900 w-full min-h-[1120px] p-8 sm:p-12 flex flex-col justify-between font-sans shadow-2xl print:shadow-none text-[12px] leading-relaxed">
      <div className="space-y-5">
        {/* Official Polish Seal Header */}
        <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-600" />
              <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest">
                Rzeczpospolita Polska · Rynek Pracy
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase mt-1">
              Karta Legalności Zatrudnienia Cudzoziemca w RP
            </h1>
            <p className="text-xs text-slate-600">
              Zaświadczenie weryfikacyjne dla Działu Kadr / HR pracodawcy oraz Agencji Zatrudnienia
            </p>
          </div>

          <div className="text-right">
            <span className="px-3 py-1 rounded-md bg-emerald-100 text-emerald-900 font-extrabold text-xs inline-block">
              100% ZGODNE Z PRAWEM RP
            </span>
            <div className="text-[10px] font-mono text-slate-400 mt-1">
              Data weryfikacji: {new Date().toLocaleDateString('pl-PL')}
            </div>
          </div>
        </div>

        {/* Candidate Information Box */}
        <div className="bg-slate-50 border border-slate-300 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-slate-500 font-semibold block text-[10.5px]">Imię i Nazwisko Kandydata:</span>
            <strong className="text-sm font-black text-slate-900">{personalInfo.fullName || 'Kandydat'}</strong>
          </div>
          <div>
            <span className="text-slate-500 font-semibold block text-[10.5px]">Stanowisko Docelowe:</span>
            <strong className="text-sm font-bold text-slate-800">{personalInfo.jobTitle || 'Pracownik'}</strong>
          </div>
          <div>
            <span className="text-slate-500 font-semibold block text-[10.5px]">Telefon Kontaktowy:</span>
            <span className="font-mono font-bold text-slate-900">{personalInfo.phone || '+48 ...'}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold block text-[10.5px]">Adres / Miejsce Pobytu w Polsce:</span>
            <span className="text-slate-800 font-medium">{personalInfo.location || 'Polska'}</span>
          </div>
        </div>

        {/* Section 1: Legal Basis in Poland */}
        <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
          <h2 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>1. Oświadczenie Kandydata o Tytule Pobytowym i Prawie do Pracy w RP</span>
          </h2>
          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-emerald-950 font-medium text-xs leading-relaxed">
            {personalInfo.workEligibility || 'PESEL ze statusem UKR / Obywatelstwo UE / Karta Pobytu z prawem do pracy.'}
          </div>
          <p className="text-[11px] text-slate-600">
            Poniższy wpis stanowi oświadczenie własne kandydata. Pracodawca ma ustawowy obowiązek zweryfikowania oryginalnych dokumentów pobytowych (paszport, wiza, karta pobytu, zaświadczenie o nadaniu PESEL ze statusem UKR) przed dopuszczeniem pracownika do pracy.
          </p>
        </div>

        {/* Section 2: Employer Legal Checklist */}
        <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
          <h2 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-indigo-600" />
            <span>2. Obowiązki Pracodawcy w Polsce (Checklista Działu Kadr / HR)</span>
          </h2>
          <div className="space-y-2 text-xs">
            {[
              {
                title: 'Zawarcie pisemnej umowy o pracę lub zlecenia',
                detail: 'Przed faktycznym dopuszczeniem pracownika do pracy, sporządzonej w języku polskim oraz przetłumaczonej na język zrozumiały dla cudzoziemca.'
              },
              {
                title: 'Powiadomienie do PUP w terminie 7 dni od dnia rozpoczęcia pracy (praca.gov.pl)',
                detail: 'dla obywateli Ukrainy korzystających z ochrony czasowej (art. 5a ustawy o warunkach dopuszczalności powierzania pracy cudzoziemcom, od 5 marca 2026 r.) – zgłoszenie elektroniczne przez praca.gov.pl, bez opłat'
              },
              {
                title: 'Zgłoszenie do ZUS (Formularz ZUS ZUA / ZZA)',
                detail: 'Obowiązkowe zgłoszenie do ubezpieczeń społecznych i zdrowotnych w terminie 7 dni od daty rozpoczęcia pracy.'
              },
              {
                title: 'Wstępne badania lekarskie (Medycyna Pracy)',
                detail: 'Wydanie orzeczenia o braku przeciwwskazań zdrowotnych na koszt pracodawcy (Art. 229 Kodeksu Pracy).'
              },
              {
                title: 'Szkolenie wstępne BHP i instruktaż stanowiskowy',
                detail: 'Przeprowadzenie instruktażu ogólnego BHP i zapoznanie z oceną ryzyka zawodowego przed rozpoczęciem pracy.'
              }
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-2 bg-slate-50 rounded-lg border border-slate-200">
                <div className="w-4 h-4 rounded border-2 border-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <strong className="text-slate-900 font-bold block">{step.title}</strong>
                  <span className="text-[11px] text-slate-600">{step.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Official RODO Clause & Data Processing Statement */}
        <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
          <h2 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-700" />
            <span>3. Klauzula Zgody na Przetwarzanie Danych Osobowych (RODO)</span>
          </h2>
          <p className="text-[11px] font-sans text-slate-700 italic bg-slate-50 p-2.5 rounded-lg border border-slate-200 leading-relaxed">
            {cv.rodo.text}
          </p>
        </div>
      </div>

      {/* Signature and Agency Verification Footer */}
      <div className="pt-6 border-t-2 border-slate-900 mt-6 grid grid-cols-2 gap-8 text-xs text-slate-700">
        <div className="border-t border-dashed border-slate-400 pt-3 text-center">
          <div className="font-bold text-slate-900">{personalInfo.fullName || 'Podpis Kandydata'}</div>
          <span className="text-[10px] text-slate-400 block mt-0.5">Data i czytelny podpis kandydata</span>
        </div>

        <div className="border-t border-dashed border-slate-400 pt-3 text-center">
          <div className="font-bold text-slate-900">PolJobHub Document & Agency Desk</div>
          <span className="text-[10px] text-slate-400 block mt-0.5">Podpis pracownika HR / Pieczęć pracodawcy</span>
        </div>
      </div>
    </div>
  );
};
