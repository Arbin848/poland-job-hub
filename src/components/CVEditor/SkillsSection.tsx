import React, { useState } from 'react';
import { LanguageCode } from '../../types/cv';
import { Plus, X, Tag } from 'lucide-react';

interface Props {
  technicalSkills: string[];
  toolsAndCertificates: string[];
  softSkills: string[];
  onChange: (patch: {
    technicalSkills?: string[];
    toolsAndCertificates?: string[];
    softSkills?: string[];
  }) => void;
  language: LanguageCode;
}

export const SkillsSection: React.FC<Props> = ({
  technicalSkills,
  toolsAndCertificates,
  softSkills,
  onChange,
  language
}) => {
  const isPl = language === 'pl';
  const [techInput, setTechInput] = useState('');
  const [toolInput, setToolInput] = useState('');
  const [softInput, setSoftInput] = useState('');

  const addTechSkill = (val: string) => {
    const trimmed = val.trim();
    if (trimmed && !technicalSkills.includes(trimmed)) {
      onChange({ technicalSkills: [...technicalSkills, trimmed] });
      setTechInput('');
    }
  };

  const removeTechSkill = (idx: number) => {
    onChange({ technicalSkills: technicalSkills.filter((_, i) => i !== idx) });
  };

  const addTool = (val: string) => {
    const trimmed = val.trim();
    if (trimmed && !toolsAndCertificates.includes(trimmed)) {
      onChange({ toolsAndCertificates: [...toolsAndCertificates, trimmed] });
      setToolInput('');
    }
  };

  const removeTool = (idx: number) => {
    onChange({ toolsAndCertificates: toolsAndCertificates.filter((_, i) => i !== idx) });
  };

  const addSoftSkill = (val: string) => {
    const trimmed = val.trim();
    if (trimmed && !softSkills.includes(trimmed)) {
      onChange({ softSkills: [...softSkills, trimmed] });
      setSoftInput('');
    }
  };

  const removeSoftSkill = (idx: number) => {
    onChange({ softSkills: softSkills.filter((_, i) => i !== idx) });
  };

  // Popular in-demand suggestions for Polish and EU job applications
  const popularTech = isPl
    ? ['SAP ERP', 'Systemy WMS', 'Excel zaawansowany', 'Lean Management / 5S', 'SQL', 'AutoCAD', 'Python', 'Zarządzanie projektami (Agile/Scrum)']
    : ['SAP ERP', 'WMS Systems', 'Advanced Excel', 'Lean 5S', 'SQL', 'AutoCAD', 'Python', 'Agile / Scrum'];

  const popularTools = isPl
    ? ['Uprawnienia UDT (Wózki jezdniowe)', 'Uprawnienia SEP do 1kV', 'Prawo jazdy kat. B', 'Prawo jazdy kat. C+E', 'HACCP / Sanepid', 'Jira / Confluence']
    : ['UDT Forklift License', 'SEP Electrical License', 'Driving License B / C', 'HACCP Food Safety', 'Jira / Confluence', 'AWS Certified'];

  return (
    <div className="space-y-6">
      {/* Technical Skills */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
          {isPl ? '1. Umiejętności twarde / Branżowe (Technical Skills)' : '1. Hard & Technical Skills'}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTechSkill(techInput);
              }
            }}
            placeholder={isPl ? 'Wpisz umiejętność i naciśnij Enter (np. SAP MM, WMS, SQL)...' : 'Type skill and press Enter...'}
            className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded bg-white"
          />
          <button
            type="button"
            onClick={() => addTechSkill(techInput)}
            className="px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded hover:bg-slate-800"
          >
            {isPl ? 'Dodaj' : 'Add'}
          </button>
        </div>

        {/* Existing items */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {technicalSkills.map((s, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded text-xs text-slate-800 font-medium"
            >
              <span>{s}</span>
              <button
                type="button"
                onClick={() => removeTechSkill(idx)}
                className="text-slate-400 hover:text-rose-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>

        {/* Quick suggestions */}
        <div className="pt-1 text-[11px] text-slate-500">
          <span className="font-semibold">{isPl ? 'Często poszukiwane:' : 'Suggested:'} </span>
          {popularTech.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => addTechSkill(item)}
              className="text-slate-600 hover:text-slate-900 underline mr-2"
            >
              + {item}
            </button>
          ))}
        </div>
      </div>

      {/* Tools & Certifications */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
          {isPl ? '2. Uprawnienia, Certyfikaty i Narzędzia (UDT, SEP, ERP, Prawo jazdy)' : '2. Tools, Licenses & Certifications'}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={toolInput}
            onChange={(e) => setToolInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTool(toolInput);
              }
            }}
            placeholder={isPl ? 'np. Uprawnienia UDT, Certyfikat SEP, SAP, Git...' : 'e.g. UDT license, SAP, Git...'}
            className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded bg-white"
          />
          <button
            type="button"
            onClick={() => addTool(toolInput)}
            className="px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded hover:bg-slate-800"
          >
            {isPl ? 'Dodaj' : 'Add'}
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {toolsAndCertificates.map((tool, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded text-xs text-slate-800 font-medium"
            >
              <span>{tool}</span>
              <button
                type="button"
                onClick={() => removeTool(idx)}
                className="text-slate-400 hover:text-rose-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>

        <div className="pt-1 text-[11px] text-slate-500">
          <span className="font-semibold">{isPl ? 'Popularne w Polsce:' : 'Popular in PL:'} </span>
          {popularTools.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => addTool(item)}
              className="text-slate-600 hover:text-slate-900 underline mr-2"
            >
              + {item}
            </button>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
          {isPl ? '3. Umiejętności miękkie (Soft Skills)' : '3. Soft Skills'}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={softInput}
            onChange={(e) => setSoftInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addSoftSkill(softInput);
              }
            }}
            placeholder={isPl ? 'np. Praca pod presją czasu, Zarządzanie zespołem...' : 'e.g. Cross-functional leadership...'}
            className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded bg-white"
          />
          <button
            type="button"
            onClick={() => addSoftSkill(softInput)}
            className="px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded hover:bg-slate-800"
          >
            {isPl ? 'Dodaj' : 'Add'}
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {softSkills.map((s, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded text-xs text-slate-700"
            >
              <span>{s}</span>
              <button
                type="button"
                onClick={() => removeSoftSkill(idx)}
                className="text-slate-400 hover:text-rose-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
