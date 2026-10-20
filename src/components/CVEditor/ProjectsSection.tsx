import React, { useState } from 'react';
import { ProjectItem, LanguageCode } from '../../types/cv';
import { Plus, Trash2, FolderGit2, Sparkles, ExternalLink, Tag } from 'lucide-react';

interface Props {
  projects: ProjectItem[];
  onChange: (updated: ProjectItem[]) => void;
  language: LanguageCode;
}

export const ProjectsSection: React.FC<Props> = ({ projects, onChange, language }) => {
  const isPl = language === 'pl';
  const [techInput, setTechInput] = useState<{ [projectId: string]: string }>({});

  const handleAddProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: '',
      role: '',
      description: '',
      link: '',
      techStack: []
    };
    onChange([newProj, ...projects]);
  };

  const handleUpdate = (id: string, patch: Partial<ProjectItem>) => {
    onChange(projects.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const handleRemove = (id: string) => {
    onChange(projects.filter((p) => p.id !== id));
  };

  const handleAddTech = (projectId: string) => {
    const val = (techInput[projectId] || '').trim();
    if (!val) return;
    const current = projects.find((p) => p.id === projectId);
    if (current) {
      const updated = current.techStack ? [...current.techStack, val] : [val];
      handleUpdate(projectId, { techStack: updated });
      setTechInput((prev) => ({ ...prev, [projectId]: '' }));
    }
  };

  const handleRemoveTech = (projectId: string, index: number) => {
    const current = projects.find((p) => p.id === projectId);
    if (current && current.techStack) {
      handleUpdate(projectId, {
        techStack: current.techStack.filter((_, i) => i !== index)
      });
    }
  };

  const projectExamples = isPl
    ? [
        {
          name: 'Wdrożenie strefy automatycznego sortowania paczek',
          role: 'Lider wdrożenia operacyjnego',
          description: 'Zaprojektowanie i uruchomienie 4 linii sortowniczych w hubie dystrybucyjnym, skracające czas przeładunku cross-docking o 35 minut na naczepę.',
          techStack: ['WMS', 'Lean Management', 'Excel Zaawansowany', 'Kanban']
        },
        {
          name: 'Platforma rekrutacyjna B2B w architekturze mikroserwisowej',
          role: 'Full-Stack Developer',
          description: 'Budowa portalu zintegrowanego z polskim systemem e-Doręczenia i podpisem kwalifikowanym mSzafir. Obsługa 15k zapytań dziennie.',
          techStack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker']
        },
        {
          name: 'Projekt optymalizacji redukcji odpadów produkcyjnych (Six Sigma Green Belt)',
          role: 'Inżynier Procesu',
          description: 'Analiza DMAIC dla linii montażu podzespołów automotive. Ograniczenie poziomu braków z 4.2% do 1.1%, oszczędność 85 000 EUR/rok.',
          techStack: ['Six Sigma DMAIC', 'AutoCAD', 'Minitab', 'FMEA']
        }
      ]
    : [
        {
          name: 'Automated Cross-Dock Sorting System Deployment',
          role: 'Operations Project Lead',
          description: 'Designed and deployed 4 high-speed sorting lines in a central distribution hub, cutting trailer turnaround by 35 minutes.',
          techStack: ['WMS', 'Lean Warehousing', 'Advanced Excel', 'Kanban']
        },
        {
          name: 'Enterprise Recruitment Platform (Microservices)',
          role: 'Lead Full-Stack Developer',
          description: 'Built a high-volume candidate portal supporting digital signing and ATS integrations handling 15k daily API hits.',
          techStack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker']
        }
      ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-indigo-600" />
            <span>{isPl ? 'Projekty & Osiągnięcia Portfolio' : 'Projects & Portfolio Portfolio'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isPl
              ? 'Wyróżnij kluczowe wdrożenia, projekty inżynierskie, programistyczne lub biznesowe. Bardzo cenione przez rekruterów w IT, logistyce i przemyśle.'
              : 'Highlight key implementations, engineering, coding, or business projects. Highly valued by modern recruiters in IT, engineering, and logistics.'}
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddProject}
          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isPl ? 'Dodaj Projekt' : 'Add Project'}</span>
        </button>
      </div>

      {/* Quick Example Loader */}
      {projects.length === 0 && (
        <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>{isPl ? 'Szybkie szablony projektów (kliknij, aby dodać gotowy wzór):' : 'One-click project presets (click to insert):'}</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {projectExamples.map((ex, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  const newProj: ProjectItem = {
                    id: `proj-${Date.now()}-${i}`,
                    name: ex.name,
                    role: ex.role,
                    description: ex.description,
                    techStack: ex.techStack,
                    link: ''
                  };
                  onChange([...projects, newProj]);
                }}
                className="text-left p-2.5 bg-white hover:bg-indigo-100/50 rounded-lg border border-indigo-100 text-xs transition"
              >
                <div className="font-semibold text-slate-900">{ex.name}</div>
                <div className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">{ex.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-slate-300 transition space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                  #{idx + 1}
                </span>
                <span className="font-bold text-sm text-slate-900">
                  {proj.name || (isPl ? 'Nowy Projekt' : 'New Project')}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(proj.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition"
                title={isPl ? 'Usuń projekt' : 'Delete project'}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isPl ? 'Nazwa projektu / wdrożenia *' : 'Project / initiative name *'}
                </label>
                <input
                  type="text"
                  value={proj.name ?? ''}
                  onChange={(e) => handleUpdate(proj.id, { name: e.target.value })}
                  placeholder={isPl ? 'np. Wdrożenie systemu ERP / Migracja do chmury' : 'e.g. ERP System Migration'}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isPl ? 'Rola w projekcie' : 'Role in project'}
                </label>
                <input
                  type="text"
                  value={proj.role ?? ''}
                  onChange={(e) => handleUpdate(proj.id, { role: e.target.value })}
                  placeholder={isPl ? 'np. Lider Techniczny / Koordynator' : 'e.g. Technical Lead / Coordinator'}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isPl ? 'Link do projektu / GitHub / Raport (opcjonalnie)' : 'Project URL / GitHub / Demo (optional)'}
                </label>
                <div className="relative">
                  <ExternalLink className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={proj.link ?? ''}
                    onChange={(e) => handleUpdate(proj.id, { link: e.target.value })}
                    placeholder="https://..."
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isPl ? 'Opis i rezultaty (mierzalny wpływ, liczby)' : 'Description & Measurable Impact'}
                </label>
                <textarea
                  rows={2}
                  value={proj.description ?? ''}
                  onChange={(e) => handleUpdate(proj.id, { description: e.target.value })}
                  placeholder={
                    isPl
                      ? 'Opisz cel projektu oraz uzyskane rezultaty (np. skrócono czas o 30%, obniżono koszty o 50 000 zł, przeszkolono 20 osób).'
                      : 'Describe the objective and results achieved (e.g. reduced processing time by 30%, saved €50,000, trained 20 staff).'
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              {/* Technologies / Tools Tags */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-slate-500" />
                  <span>{isPl ? 'Narzędzia / Technologie użyte w projekcie' : 'Tools & Tech Stack'}</span>
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput[proj.id] || ''}
                    onChange={(e) => setTechInput({ ...techInput, [proj.id]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTech(proj.id);
                      }
                    }}
                    placeholder={isPl ? 'Wpisz narzędzie (np. SAP, Docker, AutoCAD) i naciśnij Enter' : 'Type tool and hit Enter'}
                    className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddTech(proj.id)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition"
                  >
                    {isPl ? 'Dodaj' : 'Add'}
                  </button>
                </div>

                {proj.techStack && proj.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs border border-slate-200"
                      >
                        <span>{tech}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTech(proj.id, tIdx)}
                          className="hover:text-rose-600 font-bold ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
