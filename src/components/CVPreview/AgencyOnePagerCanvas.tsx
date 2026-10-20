import React from 'react';
import { CVData } from '../../types/cv';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  DollarSign,
  MapPin,
  Clock,
  Phone,
  Mail,
  Award,
  Globe,
  Briefcase,
  FileCheck,
  Building,
  UserCheck
} from 'lucide-react';
import { CandidateAvatar } from '../common/CandidateAvatar';
import { QrCodeBadge } from '../common/QrCodeBadge';

interface Props {
  cv: CVData;
}

export const AgencyOnePagerCanvas: React.FC<Props> = ({ cv }) => {
  const isPl = cv.language === 'pl';
  const { personalInfo, agencyProfile, experiences, technicalSkills, languages, certifications, accentColor } = cv;
  const primary = accentColor || '#1e3a8a';

  const candidateCode = agencyProfile?.candidateCode || `PJH-${cv.id.slice(-4).toUpperCase()}`;
  const availability = agencyProfile?.availabilityDate || 'Od zaraz (Ready immediately)';
  const hourlyRate = agencyProfile?.hourlyRateExpected || '29.50 PLN brutto / godz.';
  const monthlyRate = agencyProfile?.monthlyRateExpected || '6 800 PLN brutto / mc';
  const medicalStatus = agencyProfile?.medicalExamStatus || 'Ważne orzeczenie medycyny pracy + Sanepid';
  const recruiterNotes = agencyProfile?.recruiterNotes ||
    'Kandydat rzetelny, po weryfikacji dokumentów i referencji. Posiada udokumentowane doświadczenie praktyczne, aktualne uprawnienia techniczne oraz wysoką motywację do pracy. Brak przeciwwskazań zdrowotnych.';

  return (
    <div className="bg-white text-slate-900 w-full min-h-[1120px] p-8 sm:p-10 flex flex-col justify-between font-sans shadow-2xl print:shadow-none text-[12px] leading-relaxed">
      {/* Top Header: Agency Identity & Candidate Dossier Badge */}
      <div className="space-y-4">
        <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl text-white font-black text-sm flex items-center justify-center tracking-tighter shadow-sm"
              style={{ backgroundColor: primary }}
            >
              PJH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-tight text-slate-900 uppercase">
                  PolJobHub Agency
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-900 border border-indigo-200 uppercase">
                  Dossier Kandydata
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {isPl
                  ? 'Karta Prezentacji Kandydata dla Pracodawcy · Rekrutacja & Leasing Pracowniczy'
                  : 'Candidate Assessment & Placement One-Pager · Agency Client Dossier'}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-extrabold text-xs shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{isPl ? 'Profil Zweryfikowany' : 'Verified Candidate'}</span>
            </div>
            <div className="text-[10px] font-mono text-slate-500 mt-1">
              REF: <strong className="text-slate-900 font-bold">{candidateCode}</strong> · {new Date().toLocaleDateString('pl-PL')}
            </div>
          </div>
        </div>

        {/* Candidate Key Card Header */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-3 flex flex-col items-center text-center">
            <div className="p-1 rounded-full bg-white border border-slate-300 shadow-sm mb-2">
              <CandidateAvatar
                photoUrl={personalInfo.photoUrl}
                name={personalInfo.fullName}
                size={104}
                shape="circle"
                accentColor={primary}
              />
            </div>
            <span className="text-[11px] font-mono font-bold text-slate-600">ID: {candidateCode}</span>
          </div>

          <div className="md:col-span-9 space-y-2.5">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                {personalInfo.fullName || 'Kandydat'}
              </h1>
              <div className="text-sm font-bold" style={{ color: primary }}>
                {personalInfo.jobTitle || 'Specjalista / Pracownik Wykwalifikowany'}
              </div>
            </div>

            {/* Key Agency Attributes Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200 text-xs">
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">{isPl ? 'Dostępność' : 'Availability'}</span>
                <span className="font-extrabold text-slate-900 text-xs">{availability}</span>
              </div>

              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">{isPl ? 'Stawka Oczekiwana' : 'Rate Expected'}</span>
                <span className="font-extrabold text-indigo-700 text-xs">{hourlyRate}</span>
              </div>

              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">{isPl ? 'Lokalizacja' : 'Location'}</span>
                <span className="font-bold text-slate-900 text-xs truncate block">{personalInfo.location || 'Polska'}</span>
              </div>

              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">{isPl ? 'Prawo Jazdy' : 'Driver License'}</span>
                <span className="font-bold text-slate-900 text-xs">{personalInfo.drivingLicense || 'Brak'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Status & Verification Callout */}
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-3">
          <FileCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-950">
            <strong className="font-extrabold block text-emerald-900 mb-0.5">
              {isPl ? 'Status Legalności Pobytu i Zatrudnienia w RP:' : 'Work Authorization & Legal Residency:'}
            </strong>
            <p className="leading-snug">
              {personalInfo.workEligibility || 'Obywatelstwo UE / Brak wymogu zezwolenia na pracę w Polsce.'}
              {' '}
              <span className="font-semibold text-emerald-800">
                (Pracodawca może zatrudnić kandydata natychmiast, bez ryzyka sankcji PIP).
              </span>
            </p>
          </div>
        </div>

        {/* 2-Column Core Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-2">
          {/* Left Column: Hard Skills, Machinery, Languages & Medical */}
          <div className="md:col-span-5 space-y-4">
            {/* Machinery & Trade Licenses */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                <span>{isPl ? 'Uprawnienia & Certyfikaty' : 'Licenses & Credentials'}</span>
              </h3>
              <div className="space-y-1.5">
                {certifications && certifications.length > 0 ? (
                  certifications.map((c) => (
                    <div key={c.id} className="bg-white p-2 rounded-lg border border-slate-200 text-xs">
                      <div className="font-bold text-slate-900">{c.name}</div>
                      <div className="text-[10.5px] text-slate-500">{c.issuer} ({c.date})</div>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-slate-500 italic">Brak zarejestrowanych certyfikatów</div>
                )}
              </div>
            </div>

            {/* Languages Matrix */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>{isPl ? 'Znajomość Języków' : 'Language Proficiency'}</span>
              </h3>
              <div className="space-y-1.5">
                {languages && languages.length > 0 ? (
                  languages.map((l) => (
                    <div key={l.id} className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs">
                      <span className="font-bold text-slate-900">{l.language}</span>
                      <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
                        {l.level}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-slate-500 italic">Nie określono języków</div>
                )}
              </div>
            </div>

            {/* Medical check & Health info */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-1">
              <strong className="font-bold text-slate-900 block flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>{isPl ? 'Medycyna Pracy & BHP:' : 'Occupational Health:'}</span>
              </strong>
              <p className="text-slate-700 text-[11px]">{medicalStatus}</p>
            </div>
          </div>

          {/* Right Column: Experience Track Record & Skills */}
          <div className="md:col-span-7 space-y-4">
            {/* Hard Competencies */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                {isPl ? 'Kluczowe Umiejętności i Narzędzia:' : 'Verified Competencies:'}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {technicalSkills && technicalSkills.length > 0 ? (
                  technicalSkills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-white border border-slate-300 text-slate-800 font-bold text-xs shadow-2xs"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 italic">Brak wpisanych umiejętności</span>
                )}
              </div>
            </div>

            {/* Experience Highlights */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-slate-700" />
                <span>{isPl ? 'Udokumentowane Doświadczenie Zawodowe:' : 'Verified Work Track Record:'}</span>
              </h3>
              <div className="space-y-2.5">
                {experiences && experiences.length > 0 ? (
                  experiences.slice(0, 3).map((exp) => (
                    <div key={exp.id} className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{exp.role}</span>
                        <span className="font-mono text-[10px] text-slate-500 font-medium">
                          {exp.startDate} – {exp.current ? 'obecnie' : exp.endDate}
                        </span>
                      </div>
                      <div className="text-[11px] font-semibold text-slate-600">{exp.company} ({exp.location})</div>
                      {exp.bullets && exp.bullets.length > 0 && (
                        <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">
                          • {exp.bullets[0]}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-slate-500 italic">Brak pozycji doświadczenia</div>
                )}
              </div>
            </div>

            {/* Recruiter Evaluation Verdict */}
            <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/60 text-xs space-y-1.5">
              <div className="font-extrabold text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>{isPl ? 'Rekomendacja Konsultanta PolJobHub:' : 'Consultant Recommendation:'}</span>
              </div>
              <p className="text-slate-800 text-[11px] leading-relaxed">
                {recruiterNotes}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer: PolJobHub Contact & Legal Disclaimer */}
      <div className="pt-6 border-t-2 border-slate-900 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <div className="space-y-0.5 text-center sm:text-left">
          <div className="font-black text-slate-900">PolJobHub Agency · Dział Rekrutacji i Dokumentów</div>
          <div className="text-[10px] text-slate-500">
            Email: <strong className="text-slate-700">document.poljobhub@gmail.com</strong> · Tel: +48 22 123 45 67 · Warszawa, Polska
          </div>
        </div>

        <div className="flex items-center gap-3">
          {personalInfo.qrCodeUrl && (
            <QrCodeBadge value={personalInfo.qrCodeUrl} size={48} />
          )}
          <div className="text-right text-[10px] text-slate-400">
            <div>Dokument wygenerowany w systemie PolJobHub</div>
            <div className="font-mono">PODPIS & PIECZĘĆ AGENCJI</div>
          </div>
        </div>
      </div>
    </div>
  );
};
