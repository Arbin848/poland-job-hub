import React from 'react';
import { CVData } from '../../../types/cv';
import { CV_TRANSLATIONS } from '../../../data/translations';
import { Mail, Phone, MapPin, Linkedin, Github, Car, ShieldCheck, Briefcase, GraduationCap, FolderGit2, Sparkles, Terminal, Award, Globe, ExternalLink } from 'lucide-react';
import { QrCodeBadge } from '../../common/QrCodeBadge';
import { CandidateAvatar } from '../../common/CandidateAvatar';

interface Props {
  cv: CVData;
}

export const CreativeTechTemplate: React.FC<Props> = ({ cv }) => {
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

  const primary = accentColor || '#4f46e5';

  return (
    <div className="bg-slate-50/50 text-slate-900 w-full min-h-[1120px] print:min-h-0 p-8 md:p-10 flex flex-col justify-between font-sans shadow-lg print:shadow-none text-[12.8px] leading-relaxed">
      <div className="space-y-6">
        {/* Top Hero Card */}
        <header className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200 shadow-2xs relative overflow-hidden">
          {/* Subtle Top Accent Ribbon */}
          <div
            className="absolute top-0 left-0 right-0 h-1.5"
            style={{
              background: `linear-gradient(90deg, ${primary} 0%, #06b6d4 100%)`
            }}
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex-1 space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <Terminal className="w-3.5 h-3.5" style={{ color: primary }} />
                <span>{personalInfo.jobTitle || 'Senior Software Engineer & Tech Lead'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                {personalInfo.fullName || (isPl ? 'Imię i Nazwisko' : 'Full Name')}
              </h1>

              {/* Clean Contact Metadata */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 pt-1">
                {personalInfo.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{personalInfo.email}</span>
                  </span>
                )}
                {personalInfo.phone && (
                  <span className="flex items-center gap-1.5 font-mono">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span className="tabular-nums">{personalInfo.phone}</span>
                  </span>
                )}
                {personalInfo.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{personalInfo.location}</span>
                  </span>
                )}
                {personalInfo.linkedIn && (
                  <span className="flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</span>
                  </span>
                )}
                {personalInfo.github && (
                  <span className="flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-slate-700" />
                    <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Photo & QR */}
            <div className="flex items-center gap-3.5 shrink-0">
              {personalInfo.showQrCode && personalInfo.qrCodeUrl && (
                <div className="p-1 bg-white rounded border border-slate-200 text-center shadow-2xs hidden sm:block">
                  <QrCodeBadge value={personalInfo.qrCodeUrl} size={50} />
                </div>
              )}

              {personalInfo.showPhoto && (
                <CandidateAvatar
                  photoUrl={personalInfo.photoUrl}
                  name={personalInfo.fullName}
                  size={104}
                  shape="rounded-xl"
                  verified={cv.agencyBadge?.enabled}
                  verifiedLabel={cv.agencyBadge?.agencyName || (isPl ? 'Profil kandydata' : 'Candidate Profile')}
                  accentColor={primary}
                />
              )}
            </div>
          </div>
        </header>

        {/* Professional Pitch / Summary */}
        {vis.summary && summary && (
          <section className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
              <Sparkles className="w-4 h-4" style={{ color: primary }} />
              <span>{t.summary}</span>
            </div>
            <p className="text-slate-700 leading-relaxed text-[12.8px]">
              {summary}
            </p>
          </section>
        )}

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Left Column (7 cols) - Experience & Projects */}
          <div className="lg:col-span-7 space-y-6">
            {/* Experience Section */}
            {vis.experience && experiences && experiences.length > 0 && (
              <section className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-900">
                    <Briefcase className="w-4 h-4" style={{ color: primary }} />
                    <span>{t.experience}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {experiences.length} {isPl ? 'stanowiska' : 'positions'}
                  </span>
                </div>

                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="space-y-1.5 border-b border-slate-100 pb-4 last:border-0 last:pb-0 experience-item break-inside-avoid">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h3 className="font-bold text-slate-900 text-sm break-words">
                          {exp.role} <span className="font-semibold text-slate-600">@ {exp.company}</span>
                        </h3>
                        <span className="text-[11px] font-mono text-slate-500 shrink-0">
                          {exp.startDate} → {exp.current ? (isPl ? 'Aktualnie' : 'Present') : exp.endDate}
                        </span>
                      </div>
                      {exp.location && (
                        <div className="text-[11px] text-slate-500">{exp.location}</div>
                      )}

                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul className="space-y-1 text-xs text-slate-700 pt-1">
                          {exp.bullets.map((b, bi) => (
                            <li key={bi} className="flex items-start gap-2 break-inside-avoid">
                              <span className="text-slate-400 mt-1 shrink-0">▸</span>
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

            {/* Featured Projects Cards */}
            {vis.projects && projects && projects.length > 0 && (
              <section className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2.5 break-after-avoid">
                  <FolderGit2 className="w-4 h-4" style={{ color: primary }} />
                  <span>{t.projects || (isPl ? 'Projekty & Architektura' : 'Key Projects & Architecture')}</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {projects.map((proj) => (
                    <div key={proj.id} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1.5 project-item break-inside-avoid">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                          <span className="break-words">{proj.name}</span>
                          {proj.link && (
                            <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                          )}
                        </div>
                        {proj.role && <span className="text-[10.5px] font-mono text-indigo-700 font-semibold">{proj.role}</span>}
                      </div>
                      {proj.description && (
                        <p className="text-xs text-slate-600 leading-normal break-words">{proj.description}</p>
                      )}
                      {proj.techStack && proj.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {proj.techStack.map((tech, ti) => (
                            <span
                              key={ti}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-white text-slate-700 border border-slate-200"
                            >
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
          </div>

          {/* Right Column (5 cols) - Tech Stack, Certs, Education, Languages */}
          <div className="lg:col-span-5 space-y-6">
            {/* Technical Skills & Cloud Stack */}
            {vis.skills && (cv.technicalSkills.length > 0 || cv.toolsAndCertificates.length > 0) && (
              <section className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2.5 break-after-avoid">
                  <Terminal className="w-4 h-4" style={{ color: primary }} />
                  <span>{t.skills}</span>
                </div>

                <div className="space-y-3">
                  {cv.technicalSkills.length > 0 && (
                    <div>
                      <div className="text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                        {t.technicalSkills}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cv.technicalSkills.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 text-slate-800 border border-slate-200"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {cv.toolsAndCertificates.length > 0 && (
                    <div>
                      <div className="text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                        {t.toolsAndCertificates}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cv.toolsAndCertificates.map((tool, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[11px] bg-slate-50 text-slate-700 border border-slate-200"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Education */}
            {vis.education && educations && educations.length > 0 && (
              <section className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2.5 break-after-avoid">
                  <GraduationCap className="w-4 h-4" style={{ color: primary }} />
                  <span>{t.education}</span>
                </div>

                <div className="space-y-3">
                  {educations.map((edu) => (
                    <div key={edu.id} className="text-xs space-y-0.5 education-item break-inside-avoid">
                      <div className="font-bold text-slate-900 break-words">
                        {edu.degree} · {edu.fieldOfStudy}
                      </div>
                      <div className="text-slate-600 font-medium break-words">
                        {edu.institution} {edu.faculty && `(${edu.faculty})`}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        {edu.startDate} — {edu.endDate}
                      </div>
                      {edu.gradeOrDetails && (
                        <div className="text-[10.5px] text-slate-500 italic break-words">{edu.gradeOrDetails}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {vis.certifications && certifications && certifications.length > 0 && (
              <section className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2.5 break-after-avoid">
                  <Award className="w-4 h-4" style={{ color: primary }} />
                  <span>{t.certifications}</span>
                </div>

                <div className="space-y-2">
                  {certifications.map((c) => (
                    <div key={c.id} className="p-2.5 rounded border border-slate-200 bg-slate-50/50 text-xs certification-item break-inside-avoid">
                      <div className="font-bold text-slate-900 break-words">{c.name}</div>
                      <div className="text-[10.5px] text-slate-500">{c.issuer} {c.date && `(${c.date})`}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {vis.languages && languages && languages.length > 0 && (
              <section className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 break-after-avoid">
                  <Globe className="w-4 h-4" style={{ color: primary }} />
                  <span>{t.languages}</span>
                </div>

                <div className="space-y-1.5">
                  {languages.map((l) => (
                    <div key={l.id} className="flex justify-between items-center text-xs break-inside-avoid">
                      <span className="font-semibold text-slate-800">{l.language}</span>
                      <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {l.level}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* RODO Clause */}
      {vis.rodo && rodo.enabled && (
        <footer className="pt-6 border-t border-slate-200 text-[10px] text-slate-500 leading-relaxed rodo-clause-block break-inside-avoid">
          {rodo.text}
        </footer>
      )}
    </div>
  );
};
