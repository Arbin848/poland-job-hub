import React from 'react';
import { CVData } from '../../../types/cv';
import { CV_TRANSLATIONS } from '../../../data/translations';
import { Mail, Phone, MapPin, Linkedin, Car, ShieldCheck, Globe, Award, Briefcase, GraduationCap, FolderGit2, CheckCircle2 } from 'lucide-react';
import { QrCodeBadge } from '../../common/QrCodeBadge';
import { CandidateAvatar } from '../../common/CandidateAvatar';

interface Props {
  cv: CVData;
}

export const EuroModernTemplate: React.FC<Props> = ({ cv }) => {
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

  const primary = accentColor || '#0369a1';

  return (
    <div className="bg-white text-slate-900 w-full min-h-[1120px] print:min-h-0 flex flex-col justify-between text-[12.8px] leading-relaxed font-sans shadow-2xl print:shadow-none overflow-hidden print:overflow-visible">
      <div>
        {/* European Union Official Top Bar */}
        <div className="bg-[#003399] text-white px-8 py-2.5 flex items-center justify-between text-xs font-bold border-b-2 border-amber-400">
          <div className="flex items-center gap-2">
            <span className="text-amber-300 font-bold tracking-widest text-sm">★ ★ ★</span>
            <span className="tracking-wider uppercase text-[11px] font-mono">
              {isPl ? 'EUROPEJSKI FORMAT CV · RYNEK POLSKI & UE' : 'EUROPEAN UNION STANDARD CV · SCHENGEN ZONE'}
            </span>
          </div>
          <span className="text-amber-300 font-mono text-[10px] hidden sm:inline">
            CEFR EUROPASS RE-IMAGINED 2026
          </span>
        </div>

        {/* European Executive Header */}
        <header className="p-8 pb-6 border-b border-slate-200 bg-slate-50/60">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
                <Globe className="w-3.5 h-3.5 text-blue-700" />
                <span>{isPl ? 'Zgodność z unijnymi agencjami zatrudnienia' : 'EU Staffing & Recruitment Standard'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900" style={{ color: primary }}>
                {personalInfo.fullName || (isPl ? 'Imię i Nazwisko' : 'Candidate Name')}
              </h1>
              <p className="text-sm font-bold text-slate-700 tracking-wide uppercase">
                {personalInfo.jobTitle || 'Professional Role'}
              </p>

              {/* Contact Bar */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 pt-1">
                {personalInfo.email && (
                  <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded border border-slate-200 shadow-2xs">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{personalInfo.email}</span>
                  </span>
                )}
                {personalInfo.phone && (
                  <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded border border-slate-200 shadow-2xs font-mono">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span className="tabular-nums">{personalInfo.phone}</span>
                  </span>
                )}
                {personalInfo.location && (
                  <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded border border-slate-200 shadow-2xs">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{personalInfo.location}</span>
                  </span>
                )}
                {personalInfo.linkedIn && (
                  <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded border border-slate-200 shadow-2xs">
                    <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</span>
                  </span>
                )}
                {personalInfo.drivingLicense && (
                  <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded border border-slate-200 shadow-2xs font-bold text-slate-800">
                    <Car className="w-3.5 h-3.5 text-blue-600" />
                    <span>{personalInfo.drivingLicense}</span>
                  </span>
                )}
              </div>

              {/* Status & Work Eligibility Pill */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {personalInfo.workEligibility && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-2xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{personalInfo.workEligibility}</span>
                  </span>
                )}
                {cv.agencyBadge?.enabled && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-300 shadow-2xs">
                    <span>{cv.agencyBadge.agencyName || (isPl ? 'Profil kandydata' : 'Candidate Profile')}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Photo & QR */}
            <div className="flex items-center gap-3.5 shrink-0">
              {personalInfo.showQrCode && personalInfo.qrCodeUrl && (
                <div className="hidden sm:block p-1 bg-white border border-slate-200 rounded shadow-xs">
                  <QrCodeBadge value={personalInfo.qrCodeUrl} size={60} />
                </div>
              )}

              {personalInfo.showPhoto && (
                <CandidateAvatar
                  photoUrl={personalInfo.photoUrl}
                  name={personalInfo.fullName}
                  size={108}
                  shape="rounded-xl"
                  verified={cv.agencyBadge?.enabled}
                  verifiedLabel={cv.agencyBadge?.agencyName || (isPl ? 'Profil kandydata' : 'Candidate Profile')}
                  accentColor={primary}
                />
              )}
            </div>
          </div>
        </header>

        {/* 2-Column Asymmetric Body */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Work History (8 cols) */}
          <div className="md:col-span-8 space-y-6">
            {/* Professional Summary */}
            {vis.summary && summary && (
              <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-1.5 flex items-center gap-2" style={{ color: primary }}>
                  <Briefcase className="w-4 h-4" />
                  <span>{t.summary}</span>
                </h2>
                <p className="text-slate-700 text-xs leading-relaxed text-justify">
                  {summary}
                </p>
              </section>
            )}

            {/* Work Experience */}
            {vis.experience && experiences && experiences.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 border-b-2 pb-1.5" style={{ borderColor: primary }}>
                  <Briefcase className="w-4 h-4" style={{ color: primary }} />
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    {t.experience}
                  </h2>
                </div>

                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200 space-y-1 experience-item break-inside-avoid">
                      <span
                        className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2"
                        style={{ borderColor: primary }}
                      />
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h3 className="font-extrabold text-slate-900 text-[13.5px] break-words">
                          {exp.role}
                        </h3>
                        <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                          {exp.startDate} — {exp.current ? (isPl ? 'Aktualnie' : 'Present') : exp.endDate}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-700 break-words">
                        {exp.company} {exp.location && <span className="font-normal text-slate-500">· {exp.location}</span>}
                      </div>

                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul className="space-y-1 text-xs text-slate-700 pt-1">
                          {exp.bullets.map((b, bi) => (
                            <li key={bi} className="flex items-start gap-2 break-inside-avoid">
                              <span className="font-bold mt-0.5 shrink-0" style={{ color: primary }}>▸</span>
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

            {/* Key Deliverables & Projects */}
            {vis.projects && projects && projects.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-2 border-b-2 pb-1.5 break-after-avoid" style={{ borderColor: primary }}>
                  <FolderGit2 className="w-4 h-4" style={{ color: primary }} />
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    {t.projects || (isPl ? 'Kluczowe Projekty & Wdrożenia' : 'Key Projects')}
                  </h2>
                </div>

                <div className="space-y-2">
                  {projects.map((proj) => (
                    <div key={proj.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1 project-item break-inside-avoid">
                      <div className="flex justify-between items-baseline font-bold text-xs text-slate-900">
                        <span className="break-words">{proj.name}</span>
                        {proj.role && <span className="text-[11px] font-mono text-slate-500">{proj.role}</span>}
                      </div>
                      {proj.description && <p className="text-xs text-slate-600 break-words">{proj.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {vis.education && educations && educations.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-2 border-b-2 pb-1.5 break-after-avoid" style={{ borderColor: primary }}>
                  <GraduationCap className="w-4 h-4" style={{ color: primary }} />
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    {t.education}
                  </h2>
                </div>

                <div className="space-y-2.5">
                  {educations.map((edu) => (
                    <div key={edu.id} className="text-xs space-y-0.5 education-item break-inside-avoid">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-900 text-[12.8px] break-words">
                          {edu.degree} · {edu.fieldOfStudy}
                        </span>
                        <span className="font-mono text-[11px] text-slate-500 shrink-0">
                          {edu.startDate} — {edu.endDate}
                        </span>
                      </div>
                      <div className="text-slate-600 break-words">
                        {edu.institution} {edu.faculty && `(${edu.faculty})`}
                      </div>
                      {edu.gradeOrDetails && (
                        <div className="text-[10.5px] text-slate-500 italic mt-0.5 break-words">{edu.gradeOrDetails}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* European Competences Sidebar (4 cols) */}
          <div className="md:col-span-4 space-y-6">
            {/* CEFR Language Passport */}
            {vis.languages && languages && languages.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-1.5 border-b-2 pb-1.5 break-after-avoid" style={{ borderColor: primary }}>
                  <Globe className="w-4 h-4" style={{ color: primary }} />
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    {isPl ? 'Języki (CEFR Standard)' : 'Languages (CEFR)'}
                  </h2>
                </div>

                <div className="space-y-2">
                  {languages.map((l) => (
                    <div key={l.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5 break-inside-avoid">
                      <div className="flex justify-between items-center font-bold text-slate-900">
                        <span>{l.language}</span>
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold text-white shadow-2xs" style={{ backgroundColor: primary }}>
                          {l.level}
                        </span>
                      </div>
                      {l.details && (
                        <div className="text-[10.5px] text-slate-500 leading-tight">{l.details}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Technical Skills */}
            {vis.skills && (cv.technicalSkills.length > 0 || cv.toolsAndCertificates.length > 0) && (
              <section className="space-y-2.5">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 pb-1.5 break-after-avoid" style={{ borderColor: primary }}>
                  {t.skills}
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {[...cv.technicalSkills, ...cv.toolsAndCertificates].map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs bg-slate-100 text-slate-900 border border-slate-200 font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications (UDT, SEP, ADR, etc.) */}
            {vis.certifications && certifications && certifications.length > 0 && (
              <section className="space-y-2.5">
                <div className="flex items-center gap-1.5 border-b-2 pb-1.5 break-after-avoid" style={{ borderColor: primary }}>
                  <Award className="w-4 h-4" style={{ color: primary }} />
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    {t.certifications}
                  </h2>
                </div>

                <div className="space-y-2">
                  {certifications.map((c) => (
                    <div key={c.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs certification-item break-inside-avoid">
                      <div className="font-bold text-slate-900 leading-tight break-words">{c.name}</div>
                      <div className="text-[10.5px] text-slate-500 mt-0.5">{c.issuer} {c.date && `(${c.date})`}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* RODO Legal Clause Footer */}
      {vis.rodo && rodo.enabled && (
        <footer className="p-8 pt-4 border-t border-slate-200 text-[10px] text-slate-500 leading-relaxed rodo-clause-block break-inside-avoid">
          {rodo.text}
        </footer>
      )}
    </div>
  );
};
