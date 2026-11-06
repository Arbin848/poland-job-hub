import React from 'react';
import { CVData } from '../../../types/cv';
import { CV_TRANSLATIONS } from '../../../data/translations';
import { Mail, Phone, MapPin, Linkedin, Car, ShieldCheck } from 'lucide-react';
import { QrCodeBadge } from '../../common/QrCodeBadge';
import { CandidateAvatar } from '../../common/CandidateAvatar';

interface Props {
  cv: CVData;
}

export const EleganceSerifTemplate: React.FC<Props> = ({ cv }) => {
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

  const primary = accentColor || '#78350f'; // Warm Amber/Gold/Bronze

  return (
    <div
      className="bg-[#faf9f6] text-stone-900 w-full min-h-[1120px] print:min-h-0 p-8 md:p-12 flex flex-col justify-between font-serif shadow-lg print:shadow-none text-[12.8px] leading-relaxed border-t-8"
      style={{ borderTopColor: primary }}
    >
      <div className="space-y-6">
        {/* Centered Editorial Header */}
        <header className="text-center border-b border-stone-300 pb-6 relative">
          <div className="flex flex-col items-center justify-center space-y-2">
            {personalInfo.showPhoto && (
              <div className="mb-2">
                <CandidateAvatar
                  photoUrl={personalInfo.photoUrl}
                  name={personalInfo.fullName}
                  size={104}
                  shape="circle"
                  verified={cv.agencyBadge?.enabled}
                  verifiedLabel={cv.agencyBadge?.agencyName || (isPl ? 'Profil kandydata' : 'Candidate Profile')}
                  accentColor={primary}
                />
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl font-normal tracking-wide text-stone-900 uppercase">
              {personalInfo.fullName || (isPl ? 'Imię i Nazwisko' : 'Full Name')}
            </h1>

            <p className="text-xs sm:text-sm font-sans tracking-widest text-stone-600 uppercase font-semibold">
              {personalInfo.jobTitle || (isPl ? 'Doradca Prawny / Radca / Ekspert' : 'Senior Consultant / Legal Counsel')}
            </p>

            {/* Subtle Divider Line with Diamond Motif */}
            <div className="flex items-center justify-center gap-3 w-48 my-2">
              <span className="h-px bg-stone-300 flex-1" />
              <span className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: primary }} />
              <span className="h-px bg-stone-300 flex-1" />
            </div>

            {/* Contact Details in Clean Sans Serif */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-sans text-stone-600">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>· {personalInfo.phone}</span>}
              {personalInfo.location && <span>· {personalInfo.location}</span>}
              {personalInfo.linkedIn && <span>· {personalInfo.linkedIn.replace(/^https?:\/\//, '')}</span>}
              {personalInfo.drivingLicense && <span>· {personalInfo.drivingLicense}</span>}
            </div>

            {cv.agencyBadge?.enabled && (
              <div className="mt-1 text-[10.5px] font-sans text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded border border-stone-200">
                {cv.agencyBadge.agencyName || (isPl ? 'Profil kandydata' : 'Candidate Profile')}
              </div>
            )}
          </div>
        </header>

        {/* Executive Summary */}
        {vis.summary && summary && (
          <section className="space-y-2">
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-stone-700 text-center pb-1">
              — {t.summary} —
            </h2>
            <p className="text-stone-800 leading-relaxed text-[13px] text-justify italic max-w-3xl mx-auto px-4">
              "{summary}"
            </p>
          </section>
        )}

        {/* Experience Section */}
        {vis.experience && experiences && experiences.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-300 pb-1">
              <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-stone-800">
                I. {t.experience}
              </h2>
              <span className="text-[11px] font-sans text-stone-500 italic">Chronologia Zawodowa</span>
            </div>

            <div className="space-y-5">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1 experience-item break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-bold text-stone-950 text-sm break-words">
                      {exp.role}
                    </span>
                    <span className="text-xs font-sans text-stone-500 font-medium shrink-0">
                      {exp.startDate} — {exp.current ? (isPl ? 'Obecnie' : 'Present') : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-sans font-semibold text-stone-700 break-words">
                    {exp.company} {exp.location && <span className="font-normal text-stone-500">· {exp.location}</span>}
                  </div>

                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="space-y-1 pt-1 text-[12.5px] text-stone-700">
                      {exp.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2 break-inside-avoid">
                          <span className="text-stone-400 mt-1 shrink-0">◇</span>
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

        {/* Key Projects or Engagements */}
        {vis.projects && projects && projects.length > 0 && (
          <section className="space-y-3">
            <div className="border-b border-stone-300 pb-1 break-after-avoid">
              <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-stone-800">
                II. {t.projects || (isPl ? 'Kluczowe Transakcje & Projekty' : 'Key Engagements & Projects')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 bg-stone-100/60 rounded border border-stone-200 space-y-1 project-item break-inside-avoid">
                  <div className="font-bold text-xs text-stone-900 break-words">{proj.name}</div>
                  {proj.role && <div className="text-[11px] font-sans text-stone-500">{proj.role}</div>}
                  {proj.description && <p className="text-[11.5px] text-stone-700 break-words">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2-Column Grid: Education & Certifications vs Skills & Languages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {/* Left Column: Education & Certifications */}
          <div className="space-y-5">
            {vis.education && educations && educations.length > 0 && (
              <section className="space-y-3">
                <div className="border-b border-stone-300 pb-1 break-after-avoid">
                  <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-stone-800">
                    III. {t.education}
                  </h2>
                </div>
                <div className="space-y-3">
                  {educations.map((edu) => (
                    <div key={edu.id} className="space-y-0.5 education-item break-inside-avoid">
                      <div className="flex justify-between items-baseline font-bold text-xs text-stone-900">
                        <span className="break-words">{edu.degree} · {edu.fieldOfStudy}</span>
                        <span className="font-sans text-[11px] text-stone-500 shrink-0">{edu.startDate} — {edu.endDate}</span>
                      </div>
                      <div className="text-xs text-stone-600 italic break-words">
                        {edu.institution} {edu.faculty && `(${edu.faculty})`}
                      </div>
                      {edu.gradeOrDetails && (
                        <div className="text-[11px] text-stone-500 font-sans italic break-words">{edu.gradeOrDetails}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {vis.certifications && certifications && certifications.length > 0 && (
              <section className="space-y-2">
                <div className="border-b border-stone-300 pb-1 break-after-avoid">
                  <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-stone-800">
                    IV. {t.certifications}
                  </h2>
                </div>
                <div className="space-y-1.5 text-xs text-stone-800 font-sans">
                  {certifications.map((c) => (
                    <div key={c.id} className="certification-item break-inside-avoid">
                      <span className="font-bold break-words">{c.name}</span>
                      <div className="text-[11px] text-stone-500">{c.issuer} {c.date && `(${c.date})`}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Skills & Languages */}
          <div className="space-y-5">
            {vis.skills && (cv.technicalSkills.length > 0 || cv.toolsAndCertificates.length > 0) && (
              <section className="space-y-2.5">
                <div className="border-b border-stone-300 pb-1 break-after-avoid">
                  <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-stone-800">
                    V. {t.skills}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-1.5 font-sans">
                  {[...cv.technicalSkills, ...cv.toolsAndCertificates].map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-stone-200/70 text-stone-800 text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {vis.languages && languages && languages.length > 0 && (
              <section className="space-y-2">
                <div className="border-b border-stone-300 pb-1 break-after-avoid">
                  <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-stone-800">
                    VI. {t.languages}
                  </h2>
                </div>
                <div className="space-y-1 text-xs font-sans">
                  {languages.map((l) => (
                    <div key={l.id} className="flex justify-between border-b border-stone-200/60 pb-1 break-inside-avoid">
                      <span className="font-semibold text-stone-900">{l.language}</span>
                      <span className="font-mono text-stone-600">{l.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* RODO */}
      {vis.rodo && rodo.enabled && (
        <footer className="pt-6 border-t border-stone-300 text-[10px] font-sans text-stone-500 leading-relaxed rodo-clause-block break-inside-avoid">
          {rodo.text}
        </footer>
      )}
    </div>
  );
};
