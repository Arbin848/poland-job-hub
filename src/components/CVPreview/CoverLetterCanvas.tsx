import React from 'react';
import { CVData } from '../../types/cv';
import { Mail, Phone, MapPin, Linkedin, Car } from 'lucide-react';

interface Props {
  cv: CVData;
}

export const CoverLetterCanvas: React.FC<Props> = ({ cv }) => {
  const { personalInfo, coverLetter, rodo, accentColor } = cv;

  return (
    <div className="bg-white text-slate-900 w-full min-h-[1120px] p-10 md:p-14 flex flex-col justify-between text-[13px] leading-relaxed font-sans shadow-xl rounded-sm ring-1 ring-slate-900/5 print:shadow-none print:ring-0 print:m-0 print:w-full print:p-8">
      <div>
        {/* Top Accent Stripe */}
        <div className="h-1.5 w-full mb-8 rounded-full" style={{ backgroundColor: accentColor }}></div>

        {/* Sender Header & City/Date */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-200 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900" style={{ color: accentColor }}>
              {personalInfo.fullName || 'Imię i Nazwisko'}
            </h1>
            <p className="text-xs font-semibold text-slate-600 mb-2">
              {personalInfo.jobTitle || 'Stanowisko Zawodowe'}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span>{personalInfo.email}</span>
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span className="tabular-nums">{personalInfo.phone}</span>
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{personalInfo.location}</span>
                </span>
              )}
            </div>
          </div>

          <div className="sm:text-right text-xs text-slate-600 font-medium">
            <span>{coverLetter.cityAndDate || 'Warszawa, 2026 r.'}</span>
          </div>
        </div>

        {/* Recipient Information Block */}
        <div className="max-w-xs ml-auto mb-10 text-right sm:text-left bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div className="text-xs font-bold text-slate-900">{coverLetter.recipientName || 'Dział Rekrutacji / Zarząd'}</div>
          <div className="text-xs font-semibold text-slate-800">{coverLetter.companyName || 'Nazwa Przedsiębiorstwa'}</div>
          <div className="text-xs text-slate-600 whitespace-pre-line mt-0.5">{coverLetter.companyAddress || 'Polska'}</div>
        </div>

        {/* Subject Line */}
        <div className="mb-6">
          <h2 className="text-sm font-extrabold text-slate-900 tracking-tight pb-1 border-b-2 inline-block" style={{ borderColor: accentColor }}>
            {coverLetter.subject || 'Dotyczy: Aplikacja na stanowisko'}
          </h2>
        </div>

        {/* Salutation */}
        <div className="mb-4 text-xs font-bold text-slate-800">
          {coverLetter.salutation || 'Szanowni Państwo,'}
        </div>

        {/* Body Paragraphs */}
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed text-justify">
          {coverLetter.bodyParagraphs && coverLetter.bodyParagraphs.length > 0 ? (
            coverLetter.bodyParagraphs.map((para, idx) => (
              <p key={idx} className="indent-4">
                {para}
              </p>
            ))
          ) : (
            <p className="italic text-slate-400">
              Wpisz treść listu motywacyjnego lub wygeneruj z asystentem AI w zakładce Edytor...
            </p>
          )}
        </div>

        {/* Sign-off & Printed Name */}
        <div className="mt-8 pt-4">
          <div className="text-xs text-slate-700 mb-6 font-medium">
            {coverLetter.signOff || 'Z poważaniem,'}
          </div>
          <div className="font-bold text-xs text-slate-900" style={{ color: accentColor }}>
            {personalInfo.fullName}
          </div>
        </div>
      </div>

      {/* RODO clause at bottom of Cover Letter */}
      {rodo.enabled && rodo.text && (
        <footer className="mt-12 pt-3 border-t border-slate-200">
          <p className="text-[8.5px] text-slate-500 leading-tight text-justify">
            {rodo.text}
          </p>
        </footer>
      )}
    </div>
  );
};
