import React from 'react';
import { CVData } from '../../../types/cv';
import { CV_TRANSLATIONS } from '../../../data/translations';
import { CandidateAvatar } from '../../common/CandidateAvatar';

interface Props {
  cv: CVData;
}

export const NordicCleanTemplate: React.FC<Props> = ({ cv }) => {
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

  const primary = accentColor || '#475569';

  return (
    <div className="bg-white text-slate-800 w-full min-h-[1120px] p-8 md:p-12 flex flex-col justify-between text-[12.8px] leading-relaxed font-sans shadow-lg print:shadow-none">
      <div className="space-y-7">
        {/* Minimalist Nordic Header */}
        <header className="pb-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-light tracking-tight text-slate-900">
                {personalInfo.fullName || (isPl ? 'Imię i Nazwisko' : 'Full Name')}
              </h1>
              <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: primary }}>
                {personalInfo.jobTitle || 'Professional Role'}
              </p>
            </div>

            {personalInfo.showPhoto && (
              <CandidateAvatar
                photoUrl={personalInfo.photoUrl}
                name={personalInfo.fullName}
                size={96}
                shape="circle"
                verified={cv.agencyBadge?.enabled}
                verifiedLabel={cv.agencyBadge?.agencyName || 'Verified Candidate'}
                accentColor={primary}
              />
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span className="tabular-nums">· {personalInfo.phone}</span>}
            {personalInfo.location && <span>· {personalInfo.location}</span>}
            {personalInfo.linkedIn && <span>· {personalInfo.linkedIn.replace(/^https?:\/\//, '')}</span>}
            {personalInfo.drivingLicense && <span>· {t.drivingLicense}: {personalInfo.drivingLicense}</span>}
          </div>
        </header>

        {/* Content Flow */}
        <div className="space-y-6">
          {vis.summary && summary && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-2">
                {t.professionalSummary}
              </h2>
              <p className="text-slate-700 leading-relaxed max-w-3xl">
                {summary}
              </p>
            </section>
          )}

          {/* Work Experience */}
          {vis.experience && experiences && experiences.length > 0 && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">
                {t.experience}
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                    <div className="sm:col-span-3 text-xs font-mono text-slate-400 tabular-nums">
                      {exp.startDate} — {exp.current ? (isPl ? 'Obecnie' : 'Present') : exp.endDate}
                    </div>
                    <div className="sm:col-span-9 space-y-1">
                      <div className="font-semibold text-slate-900 text-xs">{exp.role}</div>
                      <div className="text-slate-500 text-xs">{exp.company} {exp.location && `· ${exp.location}`}</div>
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul className="space-y-1 text-xs text-slate-600 list-disc list-outside ml-3.5 pt-0.5">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx} className="leading-snug">{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {vis.projects && projects && projects.length > 0 && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-2.5">
                {t.projects || 'Projects'}
              </h2>
              <div className="space-y-2.5">
                {projects.map((proj) => (
                  <div key={proj.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                    <div className="sm:col-span-3 text-xs text-slate-400 font-mono">
                      {proj.role || 'Project'}
                    </div>
                    <div className="sm:col-span-9">
                      <div className="font-semibold text-slate-900 text-xs">{proj.name}</div>
                      {proj.description && <p className="text-xs text-slate-600 mt-0.5">{proj.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {vis.education && educations && educations.length > 0 && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">
                {t.education}
              </h2>
              <div className="space-y-3">
                {educations.map((edu) => (
                  <div key={edu.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                    <div className="sm:col-span-3 text-xs font-mono text-slate-400 tabular-nums">
                      {edu.startDate} — {edu.endDate}
                    </div>
                    <div className="sm:col-span-9">
                      <div className="font-semibold text-slate-900 text-xs">{edu.degree} · {edu.fieldOfStudy}</div>
                      <div className="text-slate-500 text-xs">{edu.institution} {edu.faculty && `(${edu.faculty})`}</div>
                      {edu.gradeOrDetails && <p className="text-[11px] text-slate-400 italic mt-0.5">{edu.gradeOrDetails}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Competences Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-3 border-t border-slate-100">
            {vis.skills && (
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  {t.skills}
                </h3>
                <div className="space-y-1 text-xs text-slate-700">
                  {[...cv.technicalSkills, ...cv.toolsAndCertificates].map((s, idx) => (
                    <div key={idx}>{s}</div>
                  ))}
                </div>
              </div>
            )}

            {vis.languages && languages && languages.length > 0 && (
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  {t.languages}
                </h3>
                <div className="space-y-1 text-xs text-slate-700">
                  {languages.map((l) => (
                    <div key={l.id} className="flex justify-between">
                      <span>{l.language}</span>
                      <span className="font-mono text-slate-500">{l.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {vis.certifications && certifications && certifications.length > 0 && (
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  {t.certifications}
                </h3>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {certifications.map((c) => (
                    <div key={c.id}>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-[10.5px] text-slate-400">{c.issuer}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RODO */}
      {vis.rodo && rodo.enabled && (
        <footer className="pt-6 border-t border-slate-100 text-[9.5px] text-slate-400 leading-tight">
          {rodo.text}
        </footer>
      )}
    </div>
  );
};
