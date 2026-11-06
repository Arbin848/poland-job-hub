import React, { useState, useEffect } from 'react';
import { CVData, LanguageCode, CvVersionMeta } from '../types/cv';
import {
  History,
  Plus,
  Trash2,
  Check,
  RotateCcw,
  Target,
  Sparkles,
  Calendar,
  X,
  Copy
} from 'lucide-react';
import { useEscapeKey } from '../hooks/useEscapeKey';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentCv: CVData;
  onRestoreVersion: (versionCv: CVData) => void;
  onTailorToJob: (versionCv: CVData) => void;
  language: LanguageCode;
}

const VERSIONS_STORAGE_KEY = 'polcv_versions_v1';

export const CvVersionsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentCv,
  onRestoreVersion,
  onTailorToJob,
  language
}) => {
  useEscapeKey(onClose, isOpen);

  const [versions, setVersions] = useState<CvVersionMeta[]>([]);
  const [newVersionName, setNewVersionName] = useState('');
  const [newJobTarget, setNewJobTarget] = useState('');
  const isPl = language === 'pl';

  useEffect(() => {
    if (isOpen) {
      try {
        const saved = localStorage.getItem(VERSIONS_STORAGE_KEY);
        if (saved) {
          setVersions(JSON.parse(saved));
        }
      } catch (e) {
        console.warn('Failed to load CV versions:', e);
      }
    }
  }, [isOpen]);

  const saveVersionsToStorage = (updated: CvVersionMeta[]) => {
    setVersions(updated);
    try {
      localStorage.setItem(VERSIONS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save CV versions:', e);
    }
  };

  const handleCreateVersion = () => {
    const name = newVersionName.trim() || `${currentCv.personalInfo.jobTitle || 'CV'} - ${new Date().toLocaleDateString()}`;
    const newVer: CvVersionMeta = {
      id: `ver-${Date.now()}`,
      name,
      createdAt: new Date().toISOString(),
      jobTarget: newJobTarget.trim() || undefined,
      templateId: currentCv.templateId,
      cv: JSON.parse(JSON.stringify(currentCv))
    };
    saveVersionsToStorage([newVer, ...versions]);
    setNewVersionName('');
    setNewJobTarget('');
  };

  const handleDeleteVersion = (id: string) => {
    saveVersionsToStorage(versions.filter((v) => v.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isPl ? 'Wersje CV & Dopasowanie do Ofert' : 'CV Versions & Job Tailoring'}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isPl ? 'Wersje CV & Dopasowanie do Ofert' : 'CV Versions & Job Tailoring'}
              </h3>
              <p className="text-xs text-slate-500">
                {isPl
                  ? 'Zapisuj dedykowane wersje pod konkretne firmy, stanowiska i języki.'
                  : 'Save tailored copies for specific employers, job posts, and industries.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={isPl ? 'Zamknij' : 'Close'}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Create new version box */}
        <div className="p-4 bg-slate-50/70 border-b border-slate-200">
          <div className="text-xs font-bold text-slate-800 mb-2">
            {isPl ? 'Zapisz bieżący stan jako nową wersję:' : 'Save current state as new version:'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              value={newVersionName}
              onChange={(e) => setNewVersionName(e.target.value)}
              placeholder={isPl ? 'Nazwa wersji (np. Wersja IT / Amazon)' : 'Version name (e.g. Amazon Logistics)'}
              className="sm:col-span-2 px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
            />
            <button
              type="button"
              onClick={handleCreateVersion}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isPl ? 'Zapisz kopię' : 'Save version'}</span>
            </button>
          </div>
        </div>

        {/* Versions list */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {versions.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              <History className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p>{isPl ? 'Brak zapisanych wersji. Zapisz swoją pierwszą kopię powyżej.' : 'No saved versions yet. Save your first version above.'}</p>
            </div>
          ) : (
            versions.map((ver) => (
              <div
                key={ver.id}
                className="p-3.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl flex items-center justify-between gap-3 transition"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs">{ver.name}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
                      {ver.templateId}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                    <span>{ver.cv.personalInfo.fullName}</span>
                    <span>·</span>
                    <span>{new Date(ver.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      onRestoreVersion(ver.cv);
                      onClose();
                    }}
                    className="px-2.5 py-1.5 bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                    title={isPl ? 'Wczytaj tę wersję do edytora' : 'Load this version'}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isPl ? 'Wczytaj' : 'Restore'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onTailorToJob(ver.cv);
                      onClose();
                    }}
                    className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                    title={isPl ? 'Dopasuj tę wersję do oferty w ATS' : 'Tailor to job ad'}
                  >
                    <Target className="w-3.5 h-3.5" />
                    <span>{isPl ? 'Dopasuj' : 'Tailor'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteVersion(ver.id)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                    title={isPl ? 'Usuń wersję' : 'Delete version'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500">
            {isPl ? 'Wersje przechowywane są lokalnie w Twojej przeglądarce.' : 'Versions are stored safely in local browser memory.'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold"
          >
            {isPl ? 'Zamknij' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
