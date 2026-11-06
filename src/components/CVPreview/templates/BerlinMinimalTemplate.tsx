import React from 'react';
import { CVData } from '../../../types/cv';
import { CV_TRANSLATIONS } from '../../../data/translations';
import { Mail, Phone, MapPin, Linkedin, Car, ShieldCheck } from 'lucide-react';
import { QrCodeBadge } from '../../common/QrCodeBadge';
import { CandidateAvatar } from '../../common/CandidateAvatar';

interface Props {
  cv: CVData;
}

export const BerlinMinimalTemplate: React.FC<Props> = ({ cv }) => {
  const t = CV_TRANSLATIONS[cv.language];
  const { personalInfo, summary, experiences, educations, languages, certifications, projects, rodo, accentColor } = cv;
  const isPl = cv.language === 'pl';

  const vis = cv.sectionVisibility || {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    languages: true,
    certifications: true,
    projects: true,
    rodo: true,
  };

  const primary = accentColor || '#18181b';

  return (
    <div className="bg-white text-slate-900 w-full min-h-[1120px] print:min-h-0 p-8 md:p-12 flex flex-col justify-between font-sans shadow-lg print:shadow-none text-[12.8px] leading-relaxed">
      <div className="space-y-8">
        {/* Bold Minimalist Header */}
        <header className="border-b-2 border-slate-950 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div className="space-y-2 flex-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 block">
                Curriculum Vitae · {personalInfo.jobTitle || 'Senior Professional'}
              </span>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-950 uppercase">
                {personalInfo.fullName || (isPl ? 'Imię i Nazwisko' : 'Full Name')}
              </h1>

              {/* Minimal Contact Strip */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-mono text-slate-700 pt-1">
                {personalInfo.email && (
                  <span className="flex items-center gap-1">
                    <span className="text-slate-400">@</span>
                    <span>{personalInfo.email}</span>
                  </span>
                )}
                {personalInfo.phone && (
                  <span className="flex items-center gap-1">
                    <span className="text-slate-400">T:</span>
                    <span>{personalInfo.phone}</span>
                  </span>
                )}
                {personalInfo.location && (
                  <span className="flex items-center gap-1">
                    <span className="text-slate-400">LOC:</span>
                    <span>{personalInfo.location}</span>
                  </span>
                )}
                {personalInfo.linkedIn && (
                  <span className="flex items-center gap-1">
                    <span className="text-slate-400">IN:</span>
                    <span>{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</span>
                  </span>
                )}
                {personalInfo.drivingLicense && (
                  <span className="flex items-center gap-1">
                    <span className="text-slate-400">PJ:</span>
                    <span>{personalInfo.drivingLicense}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Photo & QR */}
            <div className="flex items-center gap-4 shrink-0">
              {personalInfo.showQrCode && personalInfo.qrCodeUrl && (
                <div className="p-1 border border-slate-900 hidden sm:block">
                  <QrCodeBadge value={personalInfo.qrCodeUrl} size={48} />
                </div>
              )}

              {personalInfo.showPhoto && (
                <CandidateAvatar
                  photoUrl={personalInfo.photoUrl}
                  name={personalInfo.fullName}
                  size={104}
                  shape="square"
                  verified={cv.agencyBadge?.enabled}
                  verifiedLabel={cv.agencyBadge?.agencyName || (isPl ? 'Profil kandydata' : 'Candidate Profile')}
                  accentColor={primary}
                />
              )}
            </div>
          </div>
        </header>

        {/* Profile Statement */}
        {vis.summary && summary && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2.5 py-1 inline-block">
                01. {t.summary}
              </span>
            </div>
            <div className="md:col-span-9">
              <p className="text-slate-800 leading-relaxed text-[13px] font-medium bg-slate-50 p-3.5 border border-slate-200">
                {summary}
              </p>
            </div>
          </section>
        )}

        {/* Experience Section */}
        {vis.experience && experiences && experiences.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2.5 py-1 inline-block break-after-avoid">
                02. {t.experience}
              </span>
            </div>
            <div className="md:col-span-9 space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1.5 border-b border-slate-200 pb-5 last:border-0 last:pb-0 experience-item break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-extrabold text-slate-950 text-sm break-words">
                      {exp.role} <span className="font-medium text-slate-600">@ {exp.company}</span>
                    </h3>
                    <span className="font-mono text-[11px] font-semibold text-slate-500 shrink-0">
                      [{exp.startDate} → {exp.current ? (isPl ? 'AKTUALNIE' : 'PRESENT') : exp.endDate}]
                    </span>
                  </div>

                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="space-y-1 pt-1 text-[12px] text-slate-700">
                      {exp.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2 break-inside-avoid">
                          <span className="font-mono text-slate-400 mt-0.5 shrink-0">—</span>
                          <span className="break-words">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {vis.projects && projects && projects.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2.5 py-1 inline-block break-after-avoid">
                03. {t.projects || 'Projects'}
              </span>
            </div>
            <div className="md:col-span-9 space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 border border-slate-200 bg-slate-50/50 space-y-1 project-item break-inside-avoid">
                  <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                    <span className="break-words">{proj.name}</span>
                    {proj.role && <span className="font-mono text-slate-500 text-[11px] font-normal">{proj.role}</span>}
                  </div>
                  {proj.description && <p className="text-xs text-slate-600 break-words">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Credentials */}
        {vis.education && educations && educations.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2.5 py-1 inline-block break-after-avoid">
                04. {t.education}
              </span>
            </div>
            <div className="md:col-span-9 space-y-3">
              {educations.map((edu) => (
                <div key={edu.id} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0 education-item break-inside-avoid">
                  <div className="flex justify-between items-baseline font-bold text-slate-950 text-xs">
                    <span className="break-words">{edu.degree} · {edu.fieldOfStudy}</span>
                    <span className="font-mono text-[11px] font-normal text-slate-500 shrink-0">{edu.startDate} — {edu.endDate}</span>
                  </div>
                  <div className="text-slate-600 text-xs break-words">{edu.institution} {edu.faculty && `(${edu.faculty})`}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Languages */}
        {((vis.skills && cv.technicalSkills.length > 0) || (vis.languages && languages.length > 0)) && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2.5 py-1 inline-block break-after-avoid">
                05. {t.skills}
              </span>
            </div>
            <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase text-slate-400 block mb-1.5">Capabilities</span>
                <div className="flex flex-wrap gap-1.5">
                  {[...cv.technicalSkills, ...cv.toolsAndCertificates].map((s, idx) => (
                    <span key={idx} className="font-mono text-xs bg-slate-100 px-2 py-0.5 text-slate-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold uppercase text-slate-400 block mb-1.5">Languages</span>
                <div className="space-y-1 font-mono text-xs text-slate-700">
                  {languages.map((l) => (
                    <div key={l.id} className="flex justify-between border-b border-slate-100 pb-0.5 break-inside-avoid">
                      <span>{l.language}</span>
                      <span className="font-bold">{l.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* RODO */}
      {vis.rodo && rodo.enabled && (
        <footer className="pt-8 border-t border-slate-200 font-mono text-[10px] text-slate-500 leading-relaxed rodo-clause-block break-inside-avoid">
          {rodo.text}
        </footer>
      )}
    </div>
  );
};
