import React, { useState, useEffect, useRef } from 'react';
import { LanguageCode } from '../types/cv';
import {
  Search,
  FileText,
  Printer,
  Sparkles,
  ShieldCheck,
  Building,
  Calculator,
  Upload,
  Download,
  Palette,
  CheckCircle2,
  X,
  Sliders,
  HelpCircle,
  Copy,
  Languages
} from 'lucide-react';

export interface CommandItem {
  id: string;
  titlePl: string;
  titleEn: string;
  categoryPl: string;
  categoryEn: string;
  keywords: string;
  icon: React.ReactNode;
  action: () => void;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
  commands: CommandItem[];
}

export const CommandPalette: React.FC<Props> = ({
  isOpen,
  onClose,
  language,
  commands
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const isPl = language === 'pl';

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filtered = commands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    const matchTitle = isPl
      ? cmd.titlePl.toLowerCase().includes(q)
      : cmd.titleEn.toLowerCase().includes(q);
    const matchCategory = isPl
      ? cmd.categoryPl.toLowerCase().includes(q)
      : cmd.categoryEn.toLowerCase().includes(q);
    const matchKeywords = cmd.keywords.toLowerCase().includes(q);
    return matchTitle || matchCategory || matchKeywords;
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-start justify-center pt-20 px-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isPl
                ? 'Szukaj akcji, sekcji lub kalkulatora (np. rodo, salary, pdf, ats)...'
                : 'Search actions, tools or calculators (e.g. rodo, salary, pdf, ats)...'
            }
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold text-slate-500 bg-white border border-slate-300 rounded shadow-2xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              {isPl ? 'Brak pasujących poleceń.' : 'No matching commands found.'}
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={() => {
                    cmd.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full px-3 py-2.5 rounded-xl text-left flex items-center justify-between text-xs transition ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`p-1.5 rounded-lg ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {cmd.icon}
                    </span>
                    <div>
                      <div className="font-bold">{isPl ? cmd.titlePl : cmd.titleEn}</div>
                      <div
                        className={`text-[10.5px] ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {isPl ? cmd.categoryPl : cmd.categoryEn}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-semibold ${
                      isSelected ? 'text-amber-300' : 'text-slate-400'
                    }`}
                  >
                    ↵
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-400 flex items-center justify-between">
          <span>{isPl ? 'Nawigacja strzałkami ↑↓ i Enter' : 'Use ↑↓ to navigate, Enter to run'}</span>
          <span>PolJobHub Command Palette</span>
        </div>
      </div>
    </div>
  );
};
