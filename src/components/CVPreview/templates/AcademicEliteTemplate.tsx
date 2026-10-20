import React from 'react';
import { CVData } from '../../../types/cv';
import { CV_TRANSLATIONS } from '../../../data/translations';
import { BookOpen, Award, GraduationCap } from 'lucide-react';
import { CandidateAvatar } from '../../common/CandidateAvatar';

interface Props {
  cv: CVData;
}

export const AcademicEliteTemplate: React.FC<Props> = ({ cv }) => {
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

  const primary = accentColor || '#1e3a8a';

  return (
    <div className="bg-white text-slate-900 w-full min-h-[1120px] p-8 md:p-12 flex flex-col justify-between text-[12.8px] leading-relaxed font-sans shadow-lg print:shadow-none">
      <div className="space-y-6">
        {/* Classical Academic Header */}
        <header className="border-b-2 border-slate-900 pb-5 text-center">
          <div className="flex flex-col items-center">
            {personalInfo.showPhoto && (
              <div className="mb-3">
                <CandidateAvatar
                  photoUrl={personalInfo.photoUrl}
                  name={personalInfo.fullName}
                  size={96}
                  shape="circle"
                  verified={cv.agencyBadge?.enabled}
                  verifiedLabel={cv.agencyBadge?.agencyName || 'Verified Candidate'}
                  accentColor={primary}
                />
              </div>
            )}

            <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-normal mb-1">
              {personalInfo.fullName || (isPl ? 'Imię i Nazwisko' : 'Full Academic Name')}
            </h1>
            <p className="text-sm font-medium text-slate-700 italic mb-2">
              {personalInfo.jobTitle || 'Faculty Member / Research Specialist'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-600 font-sans">
              {personalInfo.location && <span>{personalInfo.location}</span>}
              {personalInfo.phone && <span className="tabular-nums">· {personalInfo.phone}</span>}
              {personalInfo.email && <span>· {personalInfo.email}</span>}
              {personalInfo.linkedIn && <span>· {personalInfo.linkedIn.replace(/^https?:\/\//, '')}</span>}
              {personalInfo.workEligibility && <span>· {personalInfo.workEligibility}</span>}
            </div>
          </div>
        </header>

        {/* Academic Sections: Education first, then Research/Professional appointments */}
        <div className="space-y-6">
          {vis.summary && summary && (
            <section>
              <h2 className="text-xs font-serif font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
                {t.professionalSummary}
              </h2>
              <p className="text-slate-800 text-xs leading-relaxed text-justify">
                {summary}
              </p>
            </section>
          )}

          {/* Education & Academic Qualifications (Prioritized for Academic & Faculty roles) */}
          {vis.education && educations && educations.length > 0 && (
            <section>
              <h2 className="text-xs font-serif font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-slate-700" />
                <span>{t.education}</span>
              </h2>
              <div className="space-y-3.5">
                {educations.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                      <span>{edu.degree} · {edu.fieldOfStudy}</span>
                      <span className="font-mono text-slate-500 tabular-nums font-normal">{edu.startDate} — {edu.endDate || t.present}</span>
                    </div>
                    <div className="text-slate-700 italic text-xs">
                      {edu.institution} {edu.faculty && `— ${edu.faculty}`}
                    </div>
                    {edu.gradeOrDetails && (
                      <p className="text-slate-600 text-[11px] mt-0.5 leading-snug">
                        {edu.gradeOrDetails}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Professional Appointments & Clinical/Industry Experience */}
          {vis.experience && experiences && experiences.length > 0 && (
            <section>
              <h2 className="text-xs font-serif font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-slate-700" />
                <span>{t.experience}</span>
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 text-xs">{exp.role}</span>
                      <span className="font-mono text-slate-500 text-xs tabular-nums font-normal">{exp.startDate} — {exp.current ? t.present : (exp.endDate || t.present)}</span>
                    </div>
                    <div className="text-slate-700 font-serif italic text-xs mb-1">
                      {exp.company} {exp.location && `[${exp.location}]`}
                    </div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700 text-xs">
                        {exp.bullets.map((b, idx) => (
                          <li key={idx} className="leading-snug">{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Research Projects & Key Deliverables */}
          {vis.projects && projects && projects.length > 0 && (
            <section>
              <h2 className="text-xs font-serif font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2.5 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-slate-700" />
                <span>{t.projects || 'Research Projects & Grants'}</span>
              </h2>
              <div className="space-y-2 text-xs">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-2.5 bg-slate-50 rounded border border-slate-200">
                    <div className="font-bold text-slate-900">{proj.name} {proj.role && <span className="font-normal italic">({proj.role})</span>}</div>
                    {proj.description && <p className="text-slate-700 mt-0.5">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Licenses, Certifications, Languages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-200">
            {vis.certifications && certifications.length > 0 && (
              <div>
                <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-slate-900 mb-2">
                  {t.certifications}
                </h3>
                <div className="space-y-1.5 text-xs text-slate-800">
                  {certifications.map((c) => (
                    <div key={c.id}>
                      <span className="font-bold">{c.name}</span>
                      <div className="text-[11px] text-slate-500">{c.issuer} ({c.date}) {c.credentialId && `· ${c.credentialId}`}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {vis.languages && languages && languages.length > 0 && (
              <div>
                <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-slate-900 mb-2">
                  {t.languages}
                </h3>
                <div className="space-y-1 text-xs text-slate-800">
                  {languages.map((l) => (
                    <div key={l.id} className="flex justify-between">
                      <span>{l.language}</span>
                      <span className="font-mono text-slate-600">{l.level}</span>
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
        <footer className="pt-6 border-t border-slate-200 text-[9.5px] text-slate-400 font-sans leading-tight">
          {rodo.text}
        </footer>
      )}
    </div>
  );
};
