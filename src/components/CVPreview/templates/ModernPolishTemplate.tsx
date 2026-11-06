import React from 'react';
import { CVData } from '../../../types/cv';
import { CV_TRANSLATIONS } from '../../../data/translations';
import { Mail, Phone, MapPin, Linkedin, Car, ShieldCheck, Briefcase, GraduationCap, FolderGit2, Award, CheckCircle2, Globe, Star } from 'lucide-react';
import { QrCodeBadge } from '../../common/QrCodeBadge';
import { CandidateAvatar } from '../../common/CandidateAvatar';

interface Props {
  cv: CVData;
}

export const ModernPolishTemplate: React.FC<Props> = ({ cv }) => {
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

  const getCefrScore = (level: string): number => {
    const map: Record<string, number> = {
      A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6, Native: 6, Ojczysty: 6
    };
    return map[level] || 4;
  };

  return (
    <div
      data-template="modern-polish"
      style={{ '--sidebar-color': primary } as React.CSSProperties}
      className="modern-polish-wrapper bg-white text-slate-900 w-full min-h-[1120px] print:min-h-0 flex flex-col justify-between font-sans shadow-2xl print:shadow-none text-[12.8px] leading-relaxed"
    >
      <div className="flex flex-col sm:flex-row flex-1">
        {/* Left Rich Colored Sidebar (36% width - Zety Cascade Style) */}
        <aside
          className="w-full sm:w-[36%] px-5 sm:px-6 py-6 text-white flex flex-col justify-start shrink-0 space-y-6"
          style={{
            backgroundColor: primary,
            backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.22) 100%)'
          }}
        >
          <div className="space-y-6">
            {/* Candidate Portrait with Verified Ring */}
            <div className="flex flex-col items-center text-center">
              {personalInfo.showPhoto && (
                <div className="mb-3.5 relative">
                  <div className="p-1 rounded-full bg-white/20 shadow-md">
                    <CandidateAvatar
                      photoUrl={personalInfo.photoUrl}
                      name={personalInfo.fullName}
                      size={118}
                      shape="circle"
                      verified={cv.agencyBadge?.enabled}
                      verifiedLabel={cv.agencyBadge?.agencyName || (isPl ? 'Profil kandydata' : 'Candidate Profile')}
                      accentColor={primary}
                    />
                  </div>
                </div>
              )}

              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                {personalInfo.fullName || (isPl ? 'Imię i Nazwisko' : 'Full Name')}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-white/90 mt-1 tracking-wide">
                {personalInfo.jobTitle || (isPl ? 'Stanowisko Zawodowe' : 'Job Title')}
              </p>

              {cv.agencyBadge?.enabled && (
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[10.5px] font-bold text-slate-200 border border-white/20 shadow-xs">
                  <span>{cv.agencyBadge.agencyName || (isPl ? 'Profil kandydata' : 'Candidate Profile')}</span>
                </div>
              )}
            </div>

            {/* Contact Details */}
            <div className="space-y-2.5 pt-3 border-t border-white/20 text-white/90">
              <div className="font-extrabold text-[11px] uppercase tracking-wider text-white/70 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{isPl ? 'Dane Kontaktowe' : 'Contact Details'}</span>
              </div>

              {personalInfo.phone && (
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-6 h-6 rounded-md bg-white/15 flex items-center justify-center shrink-0 shadow-2xs">
                    <Phone className="w-3 h-3 text-white" />
                  </span>
                  <span className="tabular-nums font-mono text-[11.5px] font-medium min-w-0">{personalInfo.phone}</span>
                </div>
              )}

              {personalInfo.email && (
                <div className="flex items-start sm:items-center gap-2 min-w-0">
                  <span className="w-6 h-6 rounded-md bg-white/15 flex items-center justify-center shrink-0 shadow-2xs mt-0.5 sm:mt-0">
                    <Mail className="w-3 h-3 text-white" />
                  </span>
                  <span className="text-[11.5px] leading-tight break-all font-medium select-all min-w-0 flex-1">{personalInfo.email}</span>
                </div>
              )}

              {personalInfo.location && (
                <div className="flex items-start sm:items-center gap-2 min-w-0">
                  <span className="w-6 h-6 rounded-md bg-white/15 flex items-center justify-center shrink-0 shadow-2xs mt-0.5 sm:mt-0">
                    <MapPin className="w-3 h-3 text-white" />
                  </span>
                  <span className="text-[11.5px] leading-tight break-words min-w-0 flex-1">{personalInfo.location}</span>
                </div>
              )}

              {personalInfo.linkedIn && (
                <div className="flex items-start sm:items-center gap-2 min-w-0">
                  <span className="w-6 h-6 rounded-md bg-white/15 flex items-center justify-center shrink-0 shadow-2xs mt-0.5 sm:mt-0">
                    <Linkedin className="w-3 h-3 text-white" />
                  </span>
                  <span className="text-[11.5px] leading-tight break-all font-medium select-all min-w-0 flex-1">{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</span>
                </div>
              )}

              {personalInfo.drivingLicense && (
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-6 h-6 rounded-md bg-white/15 flex items-center justify-center shrink-0 shadow-2xs">
                    <Car className="w-3 h-3 text-white" />
                  </span>
                  <span className="text-[11.5px] font-medium min-w-0">{personalInfo.drivingLicense}</span>
                </div>
              )}

              {personalInfo.workEligibility && (
                <div className="flex items-start gap-2 pt-1 min-w-0">
                  <span className="w-6 h-6 rounded-md bg-emerald-500/25 text-emerald-300 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[9.5px] uppercase font-bold tracking-wider text-emerald-300/90">
                      {isPl ? 'Oświadczenie kandydata' : 'Candidate Declaration'}
                    </span>
                    <span className="text-[11px] leading-tight text-white/95 font-medium break-words">
                      {personalInfo.workEligibility}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Core Skills with Visual Progress Bars and Complete Skill Stack */}
            {vis.skills && (cv.technicalSkills.length > 0 || cv.toolsAndCertificates.length > 0) && (() => {
              const allSkills = [...cv.technicalSkills, ...cv.toolsAndCertificates];
              // First 6-8 skills receive featured progress bars, remaining are displayed as compact badges
              const featuredCount = Math.min(8, allSkills.length <= 8 ? allSkills.length : 6);
              const featured = allSkills.slice(0, featuredCount);
              const remaining = allSkills.slice(featuredCount);

              return (
                <div className="pt-3 border-t border-white/20 space-y-2.5 skill-cluster">
                  <div className="font-extrabold text-[11px] uppercase tracking-wider text-white/70 mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{t.skills}</span>
                    </span>
                    <span className="text-[10px] font-mono text-white/60">{allSkills.length}</span>
                  </div>

                  <div className="space-y-2">
                    {featured.map((skill, i) => {
                      const percent = Math.max(70, 95 - i * 4);
                      return (
                        <div key={i} className="space-y-0.5 text-xs">
                          <div className="flex justify-between items-center text-[11.5px] font-medium text-white/95">
                            <span className="truncate pr-1">{skill}</span>
                            <span className="text-[10px] font-mono text-white/60">{percent}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-black/25 rounded-full overflow-hidden p-0.2">
                            <div
                              className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-amber-300 to-amber-400"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Remaining skills rendered as elegant, compact badges so NO skills are omitted */}
                  {remaining.length > 0 && (
                    <div className="pt-1.5 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/65 block">
                        {isPl ? 'Pozostałe technologie & narzędzia:' : 'Additional Skills & Tools:'}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {remaining.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-white/12 text-white/95 text-[10.5px] font-medium border border-white/15 break-words"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Languages with CEFR Rating Matrix */}
            {vis.languages && languages && languages.length > 0 && (
              <div className="pt-3 border-t border-white/20 space-y-2.5">
                <div className="font-extrabold text-[11px] uppercase tracking-wider text-white/70 mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{t.languages}</span>
                </div>

                <div className="space-y-2">
                  {languages.map((l) => {
                    const score = getCefrScore(l.level);
                    return (
                      <div key={l.id} className="text-xs space-y-0.5">
                        <div className="flex justify-between items-center text-[11.5px] font-semibold">
                          <span>{l.language}</span>
                          <span className="text-amber-300 font-mono text-[11px] font-bold">{l.level}</span>
                        </div>
                        <div className="flex items-center gap-1 pt-0.5">
                          {[1, 2, 3, 4, 5, 6].map((idx) => (
                            <span
                              key={idx}
                              className={`h-1.5 flex-1 rounded-full transition-all ${
                                idx <= score ? 'bg-amber-400' : 'bg-white/20'
                              }`}
                            />
                          ))}
                        </div>
                        {l.details && (
                          <div className="text-[10px] text-white/70">{l.details}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Certifications (UDT, SEP, ISO, etc.) */}
            {vis.certifications && certifications && certifications.length > 0 && (
              <div className="pt-3 border-t border-white/20 space-y-2">
                <div className="font-extrabold text-[11px] uppercase tracking-wider text-white/70 mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{t.certifications}</span>
                </div>

                <div className="space-y-2">
                  {certifications.map((c) => (
                    <div key={c.id} className="p-2.5 bg-white/10 rounded-lg border border-white/15 text-xs space-y-0.5">
                      <div className="font-bold text-white text-[11.5px] leading-tight flex items-start gap-1">
                        <Award className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                        <span>{c.name}</span>
                      </div>
                      <div className="text-white/75 text-[10.5px]">
                        {c.issuer} {c.date && `· ${c.date}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* QR Code in Sidebar flow */}
            {personalInfo.showQrCode && personalInfo.qrCodeUrl && (
              <div className="pt-4 border-t border-white/20 flex items-center gap-3">
                <div className="p-1 bg-white rounded-md shadow-sm">
                  <QrCodeBadge value={personalInfo.qrCodeUrl} size={48} />
                </div>
                <div className="text-[10.5px] text-white/90 leading-tight">
                  <div className="font-bold text-white">{isPl ? 'Skanuj Profil' : 'Scan Profile'}</div>
                  <div className="text-[9.5px] text-white/70">LinkedIn / Portfolio</div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Right White Main Column (64% width) */}
        <main className="w-full sm:w-[64%] p-6 sm:p-8 space-y-6 flex flex-col justify-between bg-white">
          <div className="space-y-6">
            {/* Professional Summary */}
            {vis.summary && summary && (
              <section className="space-y-2">
                <div className="flex items-center gap-2 border-b-2 pb-1.5" style={{ borderColor: primary }}>
                  <Briefcase className="w-4 h-4" style={{ color: primary }} />
                  <h2 className="text-xs font-black uppercase tracking-wider" style={{ color: primary }}>
                    {t.professionalSummary}
                  </h2>
                </div>
                <p className="text-slate-700 leading-relaxed text-[12.8px] bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-justify">
                  {summary}
                </p>
              </section>
            )}

            {/* Work Experience */}
            {vis.experience && experiences && experiences.length > 0 && (
              <section className="space-y-3.5">
                <div className="flex items-center gap-2 border-b-2 pb-1.5" style={{ borderColor: primary }}>
                  <Briefcase className="w-4 h-4" style={{ color: primary }} />
                  <h2 className="text-xs font-black uppercase tracking-wider" style={{ color: primary }}>
                    {t.experience}
                  </h2>
                </div>

                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200 space-y-1.5 group experience-item break-inside-avoid">
                      <span
                        className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2"
                        style={{ borderColor: primary }}
                      />
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h3 className="font-extrabold text-slate-900 text-[13.5px] break-words">
                          {exp.role}
                        </h3>
                        <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                          {exp.startDate} — {exp.current ? (isPl ? 'Aktualnie' : 'Present') : exp.endDate}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-700 break-words">
                        {exp.company} {exp.location && <span className="font-normal text-slate-500">· {exp.location}</span>}
                      </div>

                      {(() => {
                        const bullets = (exp.bullets && exp.bullets.length > 0)
                          ? exp.bullets
                          : (((exp as any).duties && (exp as any).duties.length > 0)
                            ? (exp as any).duties
                            : []);
                        return bullets.length > 0 ? (
                          <ul className="space-y-1 pt-1 text-[12.2px] text-slate-700">
                            {bullets.map((b: string, bi: number) => (
                              <li key={bi} className="flex items-start gap-2 break-inside-avoid">
                                <span className="font-bold text-slate-400 mt-0.5 shrink-0" style={{ color: primary }}>▸</span>
                                <span className="break-words">{b}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null;
                      })()}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Key Projects & Implementations */}
            {vis.projects && projects && projects.length > 0 && (
              <section className={`space-y-3 ${experiences && experiences.length >= 2 ? 'print:break-before-page' : ''}`}>
                <div className="flex items-center gap-2 border-b-2 pb-1.5 break-after-avoid" style={{ borderColor: primary }}>
                  <FolderGit2 className="w-4 h-4" style={{ color: primary }} />
                  <h2 className="text-xs font-black uppercase tracking-wider" style={{ color: primary }}>
                    {t.projects || (isPl ? 'Kluczowe Projekty & Wdrożenia' : 'Key Projects')}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {projects.map((proj) => (
                    <div key={proj.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 project-item break-inside-avoid">
                      <div className="flex justify-between items-baseline">
                        <div className="font-bold text-slate-900 text-xs break-words">{proj.name}</div>
                        {proj.role && <div className="text-[11px] text-slate-500 font-medium font-mono">{proj.role}</div>}
                      </div>
                      {proj.description && (
                        <p className="text-[11.8px] text-slate-600 leading-normal break-words">{proj.description}</p>
                      )}
                      {proj.techStack && proj.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {proj.techStack.map((tech, ti) => (
                            <span key={ti} className="px-2 py-0.5 bg-white text-[10.5px] font-mono rounded border border-slate-200 text-slate-800">
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

            {/* Education & Qualifications */}
            {vis.education && educations && educations.length > 0 && (
              <section className={`space-y-3 ${experiences && experiences.length >= 2 && (!projects || projects.length === 0) ? 'print:break-before-page' : ''}`}>
                <div className="flex items-center gap-2 border-b-2 pb-1.5 break-after-avoid" style={{ borderColor: primary }}>
                  <GraduationCap className="w-4 h-4" style={{ color: primary }} />
                  <h2 className="text-xs font-black uppercase tracking-wider" style={{ color: primary }}>
                    {t.education}
                  </h2>
                </div>

                <div className="space-y-2.5">
                  {educations.map((edu) => (
                    <div key={edu.id} className="text-xs space-y-0.5 education-item break-inside-avoid">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-900 text-[12.8px] break-words">
                          {edu.degree} — {edu.fieldOfStudy}
                        </span>
                        <span className="font-mono text-[11px] text-slate-500 shrink-0">
                          {edu.startDate} — {edu.endDate}
                        </span>
                      </div>
                      <div className="text-slate-600 font-medium break-words">
                        {edu.institution} {edu.faculty && `(${edu.faculty})`}
                      </div>
                      {edu.gradeOrDetails && (
                        <div className="text-[11px] text-slate-500 italic mt-0.5 break-words">{edu.gradeOrDetails}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Legal Polish RODO Clause */}
          {vis.rodo && rodo.enabled && (
            <footer className="pt-5 border-t border-slate-200 text-[10px] text-slate-500 leading-relaxed rodo-clause-block break-inside-avoid">
              {rodo.text}
            </footer>
          )}
        </main>
      </div>
    </div>
  );
};
