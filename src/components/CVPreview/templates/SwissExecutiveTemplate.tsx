import React from 'react';
import { CVData } from '../../../types/cv';
import { CV_TRANSLATIONS } from '../../../data/translations';
import { Mail, Phone, MapPin, Linkedin, Car, ShieldCheck, Briefcase, GraduationCap, FolderGit2, Award, Globe } from 'lucide-react';
import { QrCodeBadge } from '../../common/QrCodeBadge';
import { CandidateAvatar } from '../../common/CandidateAvatar';

interface Props {
  cv: CVData;
}

export const SwissExecutiveTemplate: React.FC<Props> = ({ cv }) => {
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

  const primary = accentColor || '#0f172a';

  const getCefrDots = (level: string) => {
    const map: Record<string, number> = {
      A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6, Native: 6
    };
    const score = map[level] || 3;
    return (
      <div className="flex items-center gap-1 mt-1">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i <= score ? 'bg-amber-400 shadow-2xs' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white text-slate-900 w-full min-h-[1120px] flex flex-col justify-between font-sans shadow-lg print:shadow-none text-[12.8px] leading-relaxed">
      <div className="flex flex-col sm:flex-row flex-1">
        {/* Left Dark / Sapphire Executive Sidebar (35% width) */}
        <aside
          className="w-full sm:w-[35%] p-6 sm:p-7 text-white flex flex-col justify-between shrink-0"
          style={{
            backgroundColor: primary,
            backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.25) 100%)'
          }}
        >
          <div className="space-y-6">
            {/* Candidate Headshot & Photo Ring */}
            <div className="flex flex-col items-center text-center">
              {personalInfo.showPhoto && (
                <div className="mb-3.5">
                  <CandidateAvatar
                    photoUrl={personalInfo.photoUrl}
                    name={personalInfo.fullName}
                    size={116}
                    shape="circle"
                    verified={cv.agencyBadge?.enabled}
                    verifiedLabel={cv.agencyBadge?.agencyName || 'Verified Candidate'}
                    accentColor={primary}
                  />
                </div>
              )}

              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                {personalInfo.fullName || (isPl ? 'Imię i Nazwisko' : 'Full Name')}
              </h1>
              <p className="text-xs sm:text-sm font-medium text-white/85 mt-1 tracking-wide">
                {personalInfo.jobTitle || (isPl ? 'Tytuł Zawodowy' : 'Job Title')}
              </p>

              {cv.agencyBadge?.enabled && (
                <div className="mt-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/15 text-[10px] font-semibold text-emerald-300 border border-emerald-400/30">
                  <ShieldCheck className="w-3 h-3 text-emerald-300" />
                  <span>{cv.agencyBadge.agencyName || 'Verified Candidate'}</span>
                </div>
              )}
            </div>

            {/* Contact Details Card */}
            <div className="space-y-2.5 pt-2 border-t border-white/15 text-xs text-white/90">
              <div className="font-bold text-[11px] uppercase tracking-wider text-white/70 mb-2">
                {isPl ? 'Kontakt & Dane' : 'Contact Details'}
              </div>

              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-white/80" />
                  </span>
                  <span className="truncate">{personalInfo.email}</span>
                </div>
              )}

              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5 text-white/80" />
                  </span>
                  <span className="tabular-nums font-mono">{personalInfo.phone}</span>
                </div>
              )}

              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-white/80" />
                  </span>
                  <span>{personalInfo.location}</span>
                </div>
              )}

              {personalInfo.linkedIn && (
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                    <Linkedin className="w-3.5 h-3.5 text-white/80" />
                  </span>
                  <span className="truncate">{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</span>
                </div>
              )}

              {personalInfo.drivingLicense && (
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                    <Car className="w-3.5 h-3.5 text-white/80" />
                  </span>
                  <span>{personalInfo.drivingLicense}</span>
                </div>
              )}

              {personalInfo.workEligibility && (
                <div className="flex items-start gap-2 pt-1">
                  <span className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] leading-tight text-white/85">{personalInfo.workEligibility}</span>
                </div>
              )}
            </div>

            {/* Skills with Executive Progress Bars */}
            {vis.skills && (cv.technicalSkills.length > 0 || cv.toolsAndCertificates.length > 0) && (
              <div className="pt-2 border-t border-white/15 space-y-2.5">
                <div className="font-extrabold text-[11px] uppercase tracking-wider text-white/70">
                  {t.skills}
                </div>
                <div className="space-y-2">
                  {[...cv.technicalSkills, ...cv.toolsAndCertificates].slice(0, 7).map((skill, i) => {
                    const percent = Math.max(70, 96 - i * 4);
                    return (
                      <div key={i} className="space-y-0.5 text-xs">
                        <div className="flex justify-between items-center text-[11px] font-medium text-white/90">
                          <span className="truncate pr-1">{skill}</span>
                          <span className="text-[9.5px] font-mono text-white/60">{percent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-amber-400 to-amber-300"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Languages with CEFR Meters */}
            {vis.languages && languages && languages.length > 0 && (
              <div className="pt-2 border-t border-white/15 space-y-2.5">
                <div className="font-bold text-[11px] uppercase tracking-wider text-white/70">
                  {t.languages}
                </div>
                <div className="space-y-2">
                  {languages.map((l) => (
                    <div key={l.id} className="text-xs">
                      <div className="flex justify-between items-center text-[11.5px] font-semibold">
                        <span>{l.language}</span>
                        <span className="text-amber-300 font-mono text-[11px]">{l.level}</span>
                      </div>
                      {getCefrDots(l.level)}
                      {l.details && (
                        <div className="text-[10px] text-white/70 mt-0.5">{l.details}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications in Sidebar */}
            {vis.certifications && certifications && certifications.length > 0 && (
              <div className="pt-2 border-t border-white/15 space-y-2">
                <div className="font-bold text-[11px] uppercase tracking-wider text-white/70">
                  {t.certifications}
                </div>
                <div className="space-y-2">
                  {certifications.map((c) => (
                    <div key={c.id} className="text-[11px] bg-white/10 p-2 rounded-md border border-white/10">
                      <div className="font-bold text-white leading-tight">{c.name}</div>
                      <div className="text-white/75 text-[10px] mt-0.5">{c.issuer} {c.date && `• ${c.date}`}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* QR Code in Sidebar footer */}
          {personalInfo.showQrCode && personalInfo.qrCodeUrl && (
            <div className="pt-4 border-t border-white/15 flex items-center gap-3">
              <div className="p-1 bg-white rounded shadow-xs">
                <QrCodeBadge value={personalInfo.qrCodeUrl} size={48} />
              </div>
              <div className="text-[10.5px] text-white/80 leading-tight">
                <div className="font-bold text-white">{isPl ? 'Skanuj Profil' : 'Scan Profile'}</div>
                <div className="text-[9.5px] text-white/60">LinkedIn / Portfolio</div>
              </div>
            </div>
          )}
        </aside>

        {/* Right Main Body (65% width) */}
        <main className="w-full sm:w-[65%] p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Professional Summary */}
            {vis.summary && summary && (
              <section className="space-y-2">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primary }} />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    {t.summary}
                  </h2>
                </div>
                <p className="text-slate-700 leading-relaxed text-[12.8px] bg-slate-50/70 p-3.5 rounded-lg border border-slate-200/80">
                  {summary}
                </p>
              </section>
            )}

            {/* Experience Timeline */}
            {vis.experience && experiences && experiences.length > 0 && (
              <section className="space-y-3.5">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
                  <Briefcase className="w-4 h-4 text-slate-700" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    {t.experience}
                  </h2>
                </div>

                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200 space-y-1.5 group">
                      <span
                        className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-white border-2"
                        style={{ borderColor: primary }}
                      />
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h3 className="font-bold text-slate-900 text-[13.5px]">
                          {exp.role}
                        </h3>
                        <span className="text-[11px] font-mono font-medium text-slate-500 shrink-0">
                          {exp.startDate} — {exp.current ? (isPl ? 'Obecnie' : 'Present') : exp.endDate}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-slate-700">
                        {exp.company} {exp.location && <span className="font-normal text-slate-500">• {exp.location}</span>}
                      </div>

                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul className="space-y-1 pt-1 text-[12px] text-slate-600">
                          {exp.bullets.map((b, bi) => (
                            <li key={bi} className="flex items-start gap-2">
                              <span className="text-slate-400 mt-1">▸</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects / Implementations */}
            {vis.projects && projects && projects.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
                  <FolderGit2 className="w-4 h-4 text-slate-700" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    {t.projects || (isPl ? 'Kluczowe Projekty & Wdrożenia' : 'Key Projects & Implementations')}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {projects.map((proj) => (
                    <div key={proj.id} className="p-3 bg-slate-50/70 rounded-lg border border-slate-200/80 space-y-1">
                      <div className="flex justify-between items-baseline">
                        <div className="font-bold text-slate-900 text-xs">{proj.name}</div>
                        {proj.role && <div className="text-[11px] text-slate-500 font-medium">{proj.role}</div>}
                      </div>
                      {proj.description && (
                        <p className="text-[11.5px] text-slate-600 leading-normal">{proj.description}</p>
                      )}
                      {proj.techStack && proj.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {proj.techStack.map((tech, ti) => (
                            <span key={ti} className="px-1.5 py-0.5 bg-white text-[10px] font-mono rounded border border-slate-200 text-slate-700">
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

            {/* Education */}
            {vis.education && educations && educations.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
                  <GraduationCap className="w-4 h-4 text-slate-700" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    {t.education}
                  </h2>
                </div>

                <div className="space-y-2.5">
                  {educations.map((edu) => (
                    <div key={edu.id} className="text-xs">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-900 text-[12.5px]">
                          {edu.degree} — {edu.fieldOfStudy}
                        </span>
                        <span className="font-mono text-[11px] text-slate-500">
                          {edu.startDate} — {edu.endDate}
                        </span>
                      </div>
                      <div className="text-slate-600 font-medium">
                        {edu.institution} {edu.faculty && `(${edu.faculty})`}
                      </div>
                      {edu.gradeOrDetails && (
                        <div className="text-[11px] text-slate-500 italic mt-0.5">{edu.gradeOrDetails}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RODO Clause */}
          {vis.rodo && rodo.enabled && (
            <footer className="pt-4 border-t border-slate-200 text-[9.5px] text-slate-400 leading-tight">
              {rodo.text}
            </footer>
          )}
        </main>
      </div>
    </div>
  );
};
