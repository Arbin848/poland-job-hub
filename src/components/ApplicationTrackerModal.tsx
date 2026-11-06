import React, { useState, useEffect } from 'react';
import { JobApplication, LanguageCode } from '../types/cv';
import {
  Briefcase,
  Plus,
  Trash2,
  ExternalLink,
  Calendar,
  DollarSign,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  X
} from 'lucide-react';
import { useEscapeKey } from '../hooks/useEscapeKey';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
}

const APPS_STORAGE_KEY = 'polcv_applications_v1';

export const ApplicationTrackerModal: React.FC<Props> = ({ isOpen, onClose, language }) => {
  useEscapeKey(onClose, isOpen);

  const [apps, setApps] = useState<JobApplication[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAdding, setIsAdding] = useState(false);

  // New form fields
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [link, setLink] = useState('');
  const [salaryBrutto, setSalaryBrutto] = useState<number>(7000);
  const [status, setStatus] = useState<JobApplication['status']>('applied');
  const [notes, setNotes] = useState('');

  const isPl = language === 'pl';

  useEffect(() => {
    if (isOpen) {
      try {
        const saved = localStorage.getItem(APPS_STORAGE_KEY);
        if (saved) {
          setApps(JSON.parse(saved));
        } else {
          // Default initial examples
          const sample: JobApplication[] = [
            {
              id: 'app-sample-1',
              company: 'Amazon Fulfillment Polska',
              role: 'Koordynator Logistyki / Area Manager',
              location: 'Wrocław / Bielany Wrocławskie',
              link: 'https://amazon.jobs',
              cvVersionName: 'Modern Polish Pro',
              status: 'interview',
              appliedDate: '2026-03-10',
              followUpDate: '2026-03-24',
              salaryBrutto: 8500,
              salaryNetto: 6150,
              notes: 'Rozmowa techniczna online w czwartek o 14:00.'
            },
            {
              id: 'app-sample-2',
              company: 'Raben Group',
              role: 'Specjalista ds. Dystrybucji i Spedycji',
              location: 'Grodzisk Mazowiecki',
              cvVersionName: 'Clean ATS Minimal',
              status: 'applied',
              appliedDate: '2026-03-15',
              salaryBrutto: 7200,
              salaryNetto: 5280,
              notes: 'Aplikowano przez portal Pracuj.pl z klauzulą RODO.'
            }
          ];
          setApps(sample);
          localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(sample));
        }
      } catch (e) {
        console.warn('Failed to load job applications:', e);
      }
    }
  }, [isOpen]);

  const saveApps = (updated: JobApplication[]) => {
    setApps(updated);
    try {
      localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
  };

  const handleAddApp = () => {
    if (!company.trim() || !role.trim()) return;
    const nettoEst = Math.round(salaryBrutto * 0.72); // approx Polish standard uop
    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      company: company.trim(),
      role: role.trim(),
      location: location.trim() || (isPl ? 'Polska' : 'Poland'),
      link: link.trim() || undefined,
      status,
      appliedDate: new Date().toISOString().slice(0, 10),
      salaryBrutto: salaryBrutto || undefined,
      salaryNetto: nettoEst,
      notes: notes.trim() || undefined
    };
    saveApps([newApp, ...apps]);
    setIsAdding(false);
    setCompany('');
    setRole('');
    setLocation('');
    setLink('');
    setNotes('');
  };

  const handleDelete = (id: string) => {
    saveApps(apps.filter((a) => a.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: JobApplication['status']) => {
    saveApps(apps.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
  };

  const handleExportCsv = () => {
    const headers = ['Company', 'Role', 'Location', 'Status', 'Applied Date', 'Salary Brutto', 'Salary Netto', 'Notes', 'Link'];
    const rows = apps.map((a) => [
      `"${a.company.replace(/"/g, '""')}"`,
      `"${a.role.replace(/"/g, '""')}"`,
      `"${a.location.replace(/"/g, '""')}"`,
      `"${a.status}"`,
      `"${a.appliedDate}"`,
      a.salaryBrutto || '',
      a.salaryNetto || '',
      `"${(a.notes || '').replace(/"/g, '""')}"`,
      `"${a.link || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const linkEl = document.createElement('a');
    linkEl.setAttribute('href', encodedUri);
    linkEl.setAttribute('download', `PolJobHub_Applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(linkEl);
    linkEl.click();
    linkEl.remove();
  };

  const filtered = apps.filter((a) => {
    if (filterStatus === 'all') return true;
    return a.status === filterStatus;
  });

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isPl ? 'Tracker Aplikacji Rekrutacyjnych' : 'Job Applications Tracker'}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isPl ? 'Tracker Aplikacji Rekrutacyjnych' : 'Job Applications Tracker'}
              </h3>
              <p className="text-xs text-slate-500">
                {isPl
                  ? 'Zarządzaj swoimi zgłoszeniami do polskich pracodawców, terminami i stawkami netto.'
                  : 'Track applied roles, interviews, and take-home salary calculations.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCsv}
              className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition"
              title={isPl ? 'Pobierz arkusz CSV' : 'Export CSV'}
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={isPl ? 'Zamknij' : 'Close'}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-500 font-medium mr-1">{isPl ? 'Filtruj:' : 'Filter:'}</span>
            {[
              { id: 'all', labelPl: 'Wszystkie', labelEn: 'All' },
              { id: 'saved', labelPl: 'Zapisane', labelEn: 'Saved' },
              { id: 'applied', labelPl: 'Wysłane', labelEn: 'Applied' },
              { id: 'interview', labelPl: 'Rozmowa', labelEn: 'Interview' },
              { id: 'offer', labelPl: 'Oferta', labelEn: 'Offer' },
              { id: 'rejected', labelPl: 'Odrzucone', labelEn: 'Rejected' }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilterStatus(f.id)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  filterStatus === f.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {isPl ? f.labelPl : f.labelEn}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsAdding(!isAdding)}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold flex items-center gap-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isPl ? 'Dodaj aplikację' : 'Add application'}</span>
          </button>
        </div>

        {/* Add application form drawer */}
        {isAdding && (
          <div className="p-4 bg-indigo-50/50 border-b border-indigo-100 text-xs space-y-3">
            <div className="font-bold text-indigo-900">
              {isPl ? 'Nowe zgłoszenie rekrutacyjne:' : 'New job application record:'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder={isPl ? 'Firma (np. Amazon, DHL)' : 'Company name'}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
              />
              <input
                type="text"
                placeholder={isPl ? 'Stanowisko (np. Magazynier)' : 'Role title'}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
              />
              <input
                type="text"
                placeholder={isPl ? 'Miasto (np. Warszawa)' : 'Location'}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
              />
              <input
                type="number"
                placeholder="Wynagrodzenie brutto (PLN)"
                value={salaryBrutto}
                onChange={(e) => setSalaryBrutto(Number(e.target.value) || 0)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white font-mono"
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white font-medium"
              >
                <option value="saved">{isPl ? 'Zapisana oferta' : 'Saved post'}</option>
                <option value="applied">{isPl ? 'CV wysłane (Aplikowano)' : 'Applied'}</option>
                <option value="interview">{isPl ? 'Zaproszenie na rozmowę' : 'Interview invite'}</option>
                <option value="offer">{isPl ? 'Złożona oferta pracy' : 'Job offer'}</option>
                <option value="rejected">{isPl ? 'Odrzucona' : 'Rejected'}</option>
              </select>
              <input
                type="text"
                placeholder={isPl ? 'Link do ogłoszenia (opcjonalnie)' : 'Job link'}
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-medium"
              >
                {isPl ? 'Anuluj' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleAddApp}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold"
              >
                {isPl ? 'Zapisz aplikację' : 'Save'}
              </button>
            </div>
          </div>
        )}

        {/* Applications List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1 text-xs">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <Briefcase className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>{isPl ? 'Brak aplikacji w tej kategorii.' : 'No applications found in this filter.'}</p>
            </div>
          ) : (
            filtered.map((item) => {
              const statusColors: Record<JobApplication['status'], string> = {
                saved: 'bg-slate-100 text-slate-700 border-slate-300',
                applied: 'bg-blue-50 text-blue-700 border-blue-200',
                interview: 'bg-amber-50 text-amber-800 border-amber-300 font-bold animate-pulse',
                offer: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold',
                rejected: 'bg-rose-50 text-rose-700 border-rose-200'
              };

              return (
                <div
                  key={item.id}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{item.company}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10.5px] border ${statusColors[item.status]}`}>
                        {item.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-slate-600 font-medium">
                      {item.role} · <span className="text-slate-500">{item.location}</span>
                    </div>
                    {item.salaryBrutto && (
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-mono">
                        <span>Brutto: {item.salaryBrutto.toLocaleString('pl-PL')} PLN</span>
                        <span>·</span>
                        <span className="text-emerald-700 font-bold">
                          Netto (na rękę): ~{item.salaryNetto?.toLocaleString('pl-PL')} PLN
                        </span>
                      </div>
                    )}
                    {item.notes && <p className="text-[11px] text-slate-500 italic mt-1">"{item.notes}"</p>}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                      className="px-2 py-1 text-xs border border-slate-300 rounded bg-white font-medium"
                    >
                      <option value="saved">Zapisana</option>
                      <option value="applied">Aplikowano</option>
                      <option value="interview">Rozmowa</option>
                      <option value="offer">Oferta</option>
                      <option value="rejected">Odrzucono</option>
                    </select>

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-indigo-600 hover:text-indigo-800 bg-white border border-slate-200 rounded"
                        title={isPl ? 'Otwórz ogłoszenie' : 'Open link'}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 rounded hover:bg-rose-50"
                      title={isPl ? 'Usuń' : 'Delete'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
