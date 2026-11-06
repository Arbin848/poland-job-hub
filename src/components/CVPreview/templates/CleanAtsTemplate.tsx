import React from 'react';
import { CVData } from '../../../types/cv';
import { CV_TRANSLATIONS } from '../../../data/translations';
import { ShieldCheck } from 'lucide-react';

interface Props {
  cv: CVData;
}

export const CleanAtsTemplate: React.FC<Props> = ({ cv }) => {
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

  const primary = accentColor || '#0f766e';

  return (
    <div className="bg-white text-slate-900 w-full min-h-[1120px] print:min-h-0 p-8 md:p-12 flex flex-col justify-between text-[13px] leading-relaxed font-sans shadow-lg print:shadow-none border-t-4"
         style={{ borderTopColor: primary }}>
      <div className="space-y-6">
        {/* ATS Master Header */}
        <header className="text-center pb-5 border-b-2 border-slate-200">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-1" style={{ color: primary }}>
              {personalInfo.fullName || 'Candidate Name'}
            </h1>
            <p className="text-sm font-bold text-slate-700 tracking-wide uppercase">
              {personalInfo.jobTitle || 'Professional Title'}
            </p>

            {cv.agencyBadge?.enabled && (
              <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-800 border border-slate-300">
                <span>{cv.agencyBadge.agencyName || (isPl ? 'Profil kandydata' : 'Candidate Profile')}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-600 mt-2 font-mono">
              {personalInfo.location && <span>{personalInfo.location}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.email && <span>• {personalInfo.email}</span>}
              {personalInfo.linkedIn && <span>• {personalInfo.linkedIn.replace(/^https?:\/\//, '')}</span>}
              {personalInfo.github && <span>• {personalInfo.github.replace(/^https?:\/\//, '')}</span>}
              {personalInfo.drivingLicense && <span>• {personalInfo.drivingLicense}</span>}
            </div>
          </div>
        </header>

        {/* Professional Summary */}
        {vis.summary && summary && (
          <section className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 flex items-center justify-between"
                style={{ color: primary }}>
              <span>{t.summary}</span>
              <span className="text-[10px] font-mono text-slate-400 font-normal">PROFILE</span>
            </h2>
            <p className="text-slate-700 text-[12.8px] leading-relaxed text-justify pt-1">
              {summary}
            </p>
          </section>
        )}

        {/* Skills Matrix */}
        {vis.skills && (cv.technicalSkills.length > 0 || cv.toolsAndCertificates.length > 0) && (
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 flex items-center justify-between"
                style={{ color: primary }}>
              <span>{t.skills}</span>
              <span className="text-[10px] font-mono text-slate-400 font-normal">COMPETENCIES</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs pt-1">
              {cv.technicalSkills.length > 0 && (
                <div className="sm:col-span-12 flex flex-wrap items-center gap-1.5">
                  <span className="font-bold text-slate-900 mr-1 text-[11px] uppercase tracking-wide">{t.technicalSkills}:</span>
                  {cv.technicalSkills.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[11.5px] bg-slate-50 border border-slate-200 text-slate-800 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              )}
              {cv.toolsAndCertificates.length > 0 && (
                <div className="sm:col-span-12 flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="font-bold text-slate-900 mr-1 text-[11px] uppercase tracking-wide">{t.toolsAndCertificates}:</span>
                  {cv.toolsAndCertificates.map((tool, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[11.5px] bg-slate-100/70 border border-slate-200 text-slate-700 font-medium">
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {vis.experience && experiences && experiences.length > 0 && (
          <section className="space-y-3.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 flex items-center justify-between"
                style={{ color: primary }}>
              <span>{t.experience}</span>
              <span className="text-[10px] font-mono text-slate-400 font-normal">TIMELINE</span>
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1 experience-item break-inside-avoid">
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <span className="font-bold text-slate-900 text-[13.5px] break-words">
                      {exp.role} <span className="text-slate-600 font-semibold">— {exp.company}</span>
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-medium tabular-nums shrink-0">
                      {exp.startDate} — {exp.current ? t.present : (exp.endDate || t.present)}
                    </span>
                  </div>
                  {exp.location && (
                    <div className="text-[11.5px] text-slate-500">{exp.location}</div>
                  )}

                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700 text-[12.2px] pt-1">
                      {exp.bullets.map((b, idx) => (
                        <li key={idx} className="leading-snug break-inside-avoid break-words">{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Projects */}
        {vis.projects && projects && projects.length > 0 && (
          <section className="space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 flex items-center justify-between break-after-avoid"
                style={{ color: primary }}>
              <span>{t.projects}</span>
              <span className="text-[10px] font-mono text-slate-400 font-normal">PORTFOLIO</span>
            </h2>
            <div className="space-y-2.5 text-xs">
              {projects.map((proj) => (
                <div key={proj.id} className="p-2.5 bg-slate-50 rounded border border-slate-200/80 project-item break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-[12px] break-words">{proj.name}</span>
                    {proj.role && <span className="text-slate-500 font-mono text-[10.5px]">{proj.role}</span>}
                  </div>
                  <p className="text-slate-700 mt-0.5 leading-snug break-words">{proj.description}</p>
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div className="text-[10.5px] text-slate-600 mt-1 flex gap-1 flex-wrap">
                      {proj.techStack.map((tech, ti) => (
                        <span key={ti} className="px-1.5 py-0.2 bg-white rounded border border-slate-200 text-slate-700 font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certifications Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
          {vis.education && educations && educations.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 break-after-avoid"
                  style={{ color: primary }}>
                {t.education}
              </h2>
              <div className="space-y-2 text-xs">
                {educations.map((edu) => (
                  <div key={edu.id} className="education-item break-inside-avoid">
                    <div className="font-bold text-slate-900 break-words">{edu.degree} {edu.fieldOfStudy && `— ${edu.fieldOfStudy}`}</div>
                    <div className="text-slate-600 break-words">{edu.institution}</div>
                    <div className="text-[10.5px] font-mono text-slate-500">{edu.startDate} — {edu.endDate || t.present}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {vis.languages && languages && languages.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 break-after-avoid"
                  style={{ color: primary }}>
                {t.languages}
              </h2>
              <div className="space-y-1.5 text-xs">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between items-center border-b border-slate-100 pb-1 break-inside-avoid">
                    <span className="font-semibold text-slate-800">{l.language}</span>
                    <span className="font-mono text-[11px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                      {l.level}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* RODO Legal Clause Footer */}
      {vis.rodo && rodo.enabled && (
        <footer className="mt-8 pt-4 border-t border-slate-300 text-[10px] text-slate-500 leading-relaxed rodo-clause-block break-inside-avoid">
          {rodo.text}
        </footer>
      )}
    </div>
  );
};
