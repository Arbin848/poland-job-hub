import React from 'react';
import { CVData } from '../../../types/cv';
import { CV_TRANSLATIONS } from '../../../data/translations';
import { Mail, Phone, MapPin, Linkedin, TrendingUp, Award, Briefcase, GraduationCap, ShieldCheck, FolderGit2, Star, CheckCircle, Car, Globe } from 'lucide-react';
import { QrCodeBadge } from '../../common/QrCodeBadge';
import { CandidateAvatar } from '../../common/CandidateAvatar';

interface Props {
  cv: CVData;
}

export const DynamicImpactTemplate: React.FC<Props> = ({ cv }) => {
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

  const primary = accentColor || '#b91c1c';

  return (
    <div className="bg-white text-slate-900 w-full min-h-[1120px] print:min-h-0 flex flex-col justify-between text-[12.8px] leading-relaxed font-sans shadow-2xl print:shadow-none overflow-hidden print:overflow-visible">
      <div>
        {/* Top Executive Colored Banner Header (Canva Executive Style) */}
        <header
          className="p-8 sm:p-10 text-white relative shadow-md"
          style={{
            backgroundColor: primary,
            backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.3) 100%)'
          }}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div className="flex-1 text-center sm:text-left space-y-2">
              <span className="text-[10.5px] font-mono font-bold tracking-widest uppercase bg-white/20 text-white px-3 py-1 rounded-full border border-white/20 inline-block">
                {isPl ? 'Lider Biznesowy & Wyniki' : 'Executive Leadership Profile'}
              </span>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase drop-shadow-xs">
                {personalInfo.fullName || (isPl ? 'Imię i Nazwisko' : 'Full Name')}
              </h1>

              <p className="text-sm sm:text-base font-semibold text-white/90 tracking-wide">
                {personalInfo.jobTitle || 'Executive / Sales Leader'}
              </p>

              {/* Contact Chips on Top Banner */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs text-white/90 pt-2">
                {personalInfo.phone && (
                  <span className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-md">
                    <Phone className="w-3.5 h-3.5 text-amber-300" />
                    <span className="tabular-nums font-mono">{personalInfo.phone}</span>
                  </span>
                )}
                {personalInfo.email && (
                  <span className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-md">
                    <Mail className="w-3.5 h-3.5 text-amber-300" />
                    <span>{personalInfo.email}</span>
                  </span>
                )}
                {personalInfo.location && (
                  <span className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-md">
                    <MapPin className="w-3.5 h-3.5 text-amber-300" />
                    <span>{personalInfo.location}</span>
                  </span>
                )}
                {personalInfo.linkedIn && (
                  <span className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-md">
                    <Linkedin className="w-3.5 h-3.5 text-amber-300" />
                    <span>{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</span>
                  </span>
                )}
                {personalInfo.drivingLicense && (
                  <span className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-md">
                    <Car className="w-3.5 h-3.5 text-amber-300" />
                    <span>{personalInfo.drivingLicense}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Photo on Banner with Double Ring */}
            <div className="shrink-0 flex flex-col items-center">
              {personalInfo.showPhoto && (
                <div className="p-1 rounded-2xl bg-white/20 shadow-lg backdrop-blur-xs">
                  <CandidateAvatar
                    photoUrl={personalInfo.photoUrl}
                    name={personalInfo.fullName}
                    size={112}
                    shape="rounded-xl"
                    verified={cv.agencyBadge?.enabled}
                    verifiedLabel={cv.agencyBadge?.agencyName || (isPl ? 'Profil kandydata' : 'Candidate Profile')}
                    accentColor={primary}
                  />
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Body */}
        <div className="p-8 md:p-10 space-y-6">
          {/* Summary / Mission */}
          {vis.summary && summary && (
            <section className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
              <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider" style={{ color: primary }}>
                <TrendingUp className="w-4 h-4" />
                <span>{t.summary}</span>
              </div>
              <p className="text-slate-700 leading-relaxed text-[12.8px] text-justify">
                {summary}
              </p>
            </section>
          )}

          {/* 2-Column Split: Work History (7 cols) vs Skills & Credentials (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Work Experience & Projects (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Experience */}
              {vis.experience && experiences && experiences.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-center gap-2 border-b-2 pb-1.5" style={{ borderColor: primary }}>
                    <Briefcase className="w-4 h-4" style={{ color: primary }} />
                    <h2 className="font-black text-xs uppercase tracking-wider text-slate-900">
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
                          <h3 className="font-extrabold text-slate-950 text-sm break-words">
                            {exp.role} <span className="font-bold text-slate-600">| {exp.company}</span>
                          </h3>
                          <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                            {exp.startDate} — {exp.current ? (isPl ? 'Aktualnie' : 'Present') : exp.endDate}
                          </span>
                        </div>
                        {exp.location && <div className="text-[11px] text-slate-500 font-medium">{exp.location}</div>}

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

              {/* Strategic Projects */}
              {vis.projects && projects && projects.length > 0 && (
                <section className="space-y-3">
                  <div className="flex items-center gap-2 border-b-2 pb-1.5 break-after-avoid" style={{ borderColor: primary }}>
                    <FolderGit2 className="w-4 h-4" style={{ color: primary }} />
                    <h2 className="font-black text-xs uppercase tracking-wider text-slate-900">
                      {t.projects || (isPl ? 'Kluczowe Projekty & Wdrożenia' : 'Strategic Projects')}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {projects.map((proj) => (
                      <div key={proj.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1 project-item break-inside-avoid">
                        <div className="flex justify-between items-baseline font-bold text-xs text-slate-900">
                          <span className="break-words">{proj.name}</span>
                          {proj.role && <span className="text-[11px] font-semibold text-slate-500">{proj.role}</span>}
                        </div>
                        {proj.description && <p className="text-xs text-slate-600 leading-normal break-words">{proj.description}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right: Skills, Languages, Education (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Core Competencies with Level Bars and Complete Skill Stack */}
              {vis.skills && (cv.technicalSkills.length > 0 || cv.toolsAndCertificates.length > 0) && (() => {
                const allSkills = [...cv.technicalSkills, ...cv.toolsAndCertificates];
                const featuredCount = Math.min(8, allSkills.length <= 8 ? allSkills.length : 6);
                const featured = allSkills.slice(0, featuredCount);
                const remaining = allSkills.slice(featuredCount);

                return (
                  <section className="space-y-3 skill-cluster break-inside-avoid">
                    <div className="flex items-center justify-between border-b-2 pb-1.5 break-after-avoid" style={{ borderColor: primary }}>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" style={{ color: primary }} />
                        <h2 className="font-black text-xs uppercase tracking-wider text-slate-900">
                          {t.skills}
                        </h2>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{allSkills.length}</span>
                    </div>

                    <div className="space-y-2">
                      {featured.map((skill, idx) => {
                        const percent = Math.max(75, 95 - idx * 4);
                        return (
                          <div key={idx} className="space-y-0.5 text-xs">
                            <div className="flex justify-between items-center text-[11.5px] font-bold text-slate-800">
                              <span>{skill}</span>
                              <span className="text-[10px] font-mono text-slate-500">{percent}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-300"
                                style={{ width: `${percent}%`, backgroundColor: primary }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Remaining skills as high-contrast impact pills */}
                    {remaining.length > 0 && (
                      <div className="pt-1 space-y-1.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                          {isPl ? 'Pozostałe narzędzia i technologie:' : 'Additional Tools & Skills:'}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {remaining.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md text-[10.5px] font-semibold bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs break-words"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>
                );
              })()}

              {/* Education */}
              {vis.education && educations && educations.length > 0 && (
                <section className="space-y-2.5">
                  <div className="flex items-center gap-2 border-b-2 pb-1.5 break-after-avoid" style={{ borderColor: primary }}>
                    <GraduationCap className="w-4 h-4" style={{ color: primary }} />
                    <h2 className="font-black text-xs uppercase tracking-wider text-slate-900">
                      {t.education}
                    </h2>
                  </div>
                  <div className="space-y-2">
                    {educations.map((edu) => (
                      <div key={edu.id} className="text-xs space-y-0.5 p-2.5 bg-slate-50 rounded border border-slate-200 education-item break-inside-avoid">
                        <div className="font-bold text-slate-900 break-words">{edu.degree} · {edu.fieldOfStudy}</div>
                        <div className="text-slate-600 break-words">{edu.institution}</div>
                        <div className="text-[11px] font-mono text-slate-500">{edu.startDate} — {edu.endDate}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Languages */}
              {vis.languages && languages && languages.length > 0 && (
                <section className="space-y-2">
                  <div className="flex items-center gap-2 border-b-2 pb-1.5 break-after-avoid" style={{ borderColor: primary }}>
                    <Globe className="w-4 h-4" style={{ color: primary }} />
                    <h2 className="font-black text-xs uppercase tracking-wider text-slate-900">
                      {t.languages}
                    </h2>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {languages.map((l) => (
                      <div key={l.id} className="flex justify-between items-center p-2 bg-slate-50 rounded border border-slate-200 break-inside-avoid">
                        <span className="font-bold text-slate-800">{l.language}</span>
                        <span className="font-bold font-mono px-2 py-0.5 rounded text-white text-[11px]" style={{ backgroundColor: primary }}>
                          {l.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Certifications */}
              {vis.certifications && certifications && certifications.length > 0 && (
                <section className="space-y-2">
                  <div className="flex items-center gap-2 border-b-2 pb-1.5 break-after-avoid" style={{ borderColor: primary }}>
                    <Award className="w-4 h-4" style={{ color: primary }} />
                    <h2 className="font-black text-xs uppercase tracking-wider text-slate-900">
                      {t.certifications}
                    </h2>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {certifications.map((c) => (
                      <div key={c.id} className="p-2 bg-slate-50 rounded border border-slate-200 certification-item break-inside-avoid">
                        <div className="font-bold text-slate-900 break-words">{c.name}</div>
                        <div className="text-[10.5px] text-slate-500">{c.issuer} {c.date && `(${c.date})`}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RODO */}
      {vis.rodo && rodo.enabled && (
        <footer className="p-8 pt-4 border-t border-slate-200 text-[10px] text-slate-500 leading-relaxed rodo-clause-block break-inside-avoid">
          {rodo.text}
        </footer>
      )}
    </div>
  );
};
