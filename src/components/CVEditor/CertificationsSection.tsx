import React from 'react';
import { CertificationItem, LanguageCode } from '../../types/cv';
import { Plus, Trash2, Award } from 'lucide-react';

interface Props {
  certifications: CertificationItem[];
  onChange: (updated: CertificationItem[]) => void;
  language: LanguageCode;
}

export const CertificationsSection: React.FC<Props> = ({ certifications, onChange, language }) => {
  const isPl = language === 'pl';

  const handleAdd = () => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: isPl
        ? 'Uprawnienia UDT – Obsługa wózków widłowych'
        : 'Professional Certification / License',
      issuer: isPl ? 'Urząd Dozoru Technicznego' : 'Certifying Body',
      date: '2023',
      credentialId: ''
    };
    onChange([...certifications, newCert]);
  };

  const handleRemove = (idx: number) => {
    onChange(certifications.filter((_, i) => i !== idx));
  };

  const handleUpdate = (idx: number, patch: Partial<CertificationItem>) => {
    const updated = [...certifications];
    updated[idx] = { ...updated[idx], ...patch };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="text-xs text-slate-500 mb-1">
        {isPl
          ? 'Oficjalne uprawnienia państwowe (UDT, SEP, TDT, Prawo Wykonywania Zawodu PWZ) lub międzynarodowe (ISO, AWS, Prince2, PMP, HACCP).'
          : 'Official vocational licenses, state certifications, or global accreditations.'}
      </div>

      <div className="space-y-3">
        {certifications.map((c, idx) => (
          <div key={c.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                <Award className="w-4 h-4 text-slate-600" />
                <span>#{idx + 1} {c.name}</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="text-rose-600 hover:text-rose-700 text-xs flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isPl ? 'Usuń' : 'Remove'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {isPl ? 'Nazwa Certyfikatu / Uprawnienia' : 'Certification Title'} *
                </label>
                <input
                  type="text"
                  value={c.name ?? ''}
                  onChange={(e) => handleUpdate(idx, { name: e.target.value })}
                  placeholder="np. Uprawnienia UDT kat. I WJO"
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {isPl ? 'Rok / Data uzyskania' : 'Year / Date'}
                </label>
                <input
                  type="text"
                  value={c.date ?? ''}
                  onChange={(e) => handleUpdate(idx, { date: e.target.value })}
                  placeholder="2023"
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {isPl ? 'Instytucja wydająca (Issuer)' : 'Issuing Organization'} *
                </label>
                <input
                  type="text"
                  value={c.issuer ?? ''}
                  onChange={(e) => handleUpdate(idx, { issuer: e.target.value })}
                  placeholder="np. Urząd Dozoru Technicznego / TÜV Rheinland"
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {isPl ? 'Numer uprawnienia / Identyfikator (opcjonalnie)' : 'Credential ID / License Number'}
                </label>
                <input
                  type="text"
                  value={c.credentialId ?? ''}
                  onChange={(e) => handleUpdate(idx, { credentialId: e.target.value })}
                  placeholder="np. UDT/WAW/12345/2023"
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white font-mono"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="w-full py-2 border-2 border-dashed border-slate-300 hover:border-slate-500 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center justify-center gap-1.5 transition"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>{isPl ? 'Dodaj uprawnienie / certyfikat' : 'Add license or certification'}</span>
      </button>
    </div>
  );
};
