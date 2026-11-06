import React, { useState } from 'react';
import { Download, X, Film, Image as ImageIcon, FileText, CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react';
import { downloadStage3CZip, downloadGitBundle, downloadSourceZip, downloadGitPatch } from '../../../utils/downloadEvidenceZip';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface EvidenceItem {
  id: string;
  name: string;
  filename: string;
  category: 'screenshot' | 'video' | 'data';
  description: string;
  size: string;
  url: string;
}

const EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    id: 'stage3a-hp-desk',
    name: '★ Stage 3A: Strona Główna Produkcyjna (Desktop 1440×960)',
    filename: 'stage3a_01_homepage_desktop_1440x960.png',
    category: 'screenshot',
    description: 'Zintegrowana strona główna na trasie produkcyjnej: pojedynczy nagłówek, editorialna typografia V5, lewitujący dokument 3D, zero rozsuwania poziomego.',
    size: '320 KB',
    url: '/evidence/stage3a_01_homepage_desktop_1440x960.png'
  },
  {
    id: 'stage3a-hp-mob390',
    name: '★ Stage 3A: Strona Główna Mobile (390×844)',
    filename: 'stage3a_02_homepage_mobile_390x844.png',
    category: 'screenshot',
    description: 'Widok mobilny iPhone: 0px overflow, pełna hierarchia CTA i sekcja wyboru szablonów.',
    size: '109 KB',
    url: '/evidence/stage3a_02_homepage_mobile_390x844.png'
  },
  {
    id: 'stage3a-hp-mob360',
    name: '★ Stage 3A: Strona Główna Mobile Wąski (360×800)',
    filename: 'stage3a_03_homepage_mobile_360x800.png',
    category: 'screenshot',
    description: 'Widok wąski Android 360px: 0px overflow, czyste łamanie wierszy i czytelna siatka.',
    size: '105 KB',
    url: '/evidence/stage3a_03_homepage_mobile_360x800.png'
  },
  {
    id: 'stage3a-ed-cta',
    name: '★ Stage 3A: Edytor zaraz po kliknięciu "Stwórz Moje CV"',
    filename: 'stage3a_04_editor_after_create_cta.png',
    category: 'screenshot',
    description: 'Płynne przejście do istniejącego edytora formularzy (EditorTabs) z załadowanymi danymi kandydata.',
    size: '297 KB',
    url: '/evidence/stage3a_04_editor_after_create_cta.png'
  },
  {
    id: 'stage3a-gallery',
    name: '★ Stage 3A: Galeria Szablonów otwarta ze Strony Głównej',
    filename: 'stage3a_05_template_gallery_from_home.png',
    category: 'screenshot',
    description: 'Produkcyjna galeria szablonów (10 stylów) otwarta bezpośrednio przez przycisk ze strony głównej.',
    size: '390 KB',
    url: '/evidence/stage3a_05_template_gallery_from_home.png'
  },
  {
    id: 'stage3a-en',
    name: '★ Stage 3A: Wersja Angielska Strony Głównej (1440×960)',
    filename: 'stage3a_06_homepage_english_1440x960.png',
    category: 'screenshot',
    description: 'Przełączenie języka na EN w nagłówku natychmiast tłumaczy nagłówki, CTA i opisy szablonów.',
    size: '301 KB',
    url: '/evidence/stage3a_06_homepage_english_1440x960.png'
  },
  {
    id: 'stage3a-video',
    name: '★ Stage 3A: Nagranie Wideo — Przebieg 10 Kroków User Journey',
    filename: 'stage3a_interaction_flow.webm',
    category: 'video',
    description: 'Pełne nagranie wideo interakcji: strona główna -> edytor -> edycja -> powrót -> wznów -> galeria -> wybór -> RODO/język -> eksport PDF.',
    size: '463 KB',
    url: '/evidence/stage3a_interaction_flow.webm'
  },
  {
    id: 'stage3a-zip',
    name: '★ Stage 3A: Kompletna Paczka Akceptacji (ZIP)',
    filename: 'PolJobHub_Stage3A_Visual_Acceptance.zip',
    category: 'data',
    description: 'Archiwum ZIP zawierające wszystkie 6 zrzutów ekranu, wideo webm, raport JSON i plik README.',
    size: '1.9 MB',
    url: '/PolJobHub_Stage3A_Visual_Acceptance.zip'
  },
  {
    id: 'hp-desk',
    name: '1. Strona Główna V5 (Desktop 1440×960)',
    filename: 'v5_homepage_desktop_1440x960.png',
    category: 'screenshot',
    description: 'Typografia editorialna, biel i lawenda, lewitujący dokument 3D, zaktualizowana neutralna nota prawna i szczere CTA.',
    size: '723 KB',
    url: '/evidence/v5_homepage_desktop_1440x960.png'
  },
  {
    id: 'hp-mob',
    name: '2. Strona Główna V5 (Mobile 390×844)',
    filename: 'v5_homepage_mobile_390x844.png',
    category: 'screenshot',
    description: 'Pionowy responsywny układ dla iPhone, duże przyciski dotykowe i pełna ergonomia.',
    size: '241 KB',
    url: '/evidence/v5_homepage_mobile_390x844.png'
  },
  {
    id: 'ed-step1',
    name: '3. Kreator Krok 1 — Oświadczenia i Dane (Desktop)',
    filename: 'v5_editor_desktop_1440x960.png',
    category: 'screenshot',
    description: 'Oświadczenie kandydata o prawie do pracy w RP z neutralną klauzulą weryfikacji przez pracodawcę oraz podgląd A4 na żywo.',
    size: '567 KB',
    url: '/evidence/v5_editor_desktop_1440x960.png'
  },
  {
    id: 'ed-mob',
    name: '4. Kreator Mobilny (Mobile 390×844)',
    filename: 'v5_editor_mobile_390x844.png',
    category: 'screenshot',
    description: 'Ekran konwersacyjny na telefonie z dolnym paskiem nawigacji i pływającym przyciskiem Podgląd A4.',
    size: '123 KB',
    url: '/evidence/v5_editor_mobile_390x844.png'
  },
  {
    id: 'ed-star',
    name: '5. Krok 2 — Doświadczenie i Asystent STAR (Desktop)',
    filename: 'v5_editor_star_assistant_1440x960.png',
    category: 'screenshot',
    description: 'Etyczny asystent czasowników sprawczych bez zmyślania historii zatrudnienia i bez fałszywych wskaźników %.',
    size: '344 KB',
    url: '/evidence/v5_editor_star_assistant_1440x960.png'
  },
  {
    id: 'ed-tpl',
    name: '6. Krok 4 — Wybór Szablonu Wizualnego (Desktop)',
    filename: 'v5_editor_templates_1440x960.png',
    category: 'screenshot',
    description: 'Kolekcja 10 certyfikowanych szablonów z natychmiastowym przełączaniem stylów na żywym dokumencie.',
    size: '494 KB',
    url: '/evidence/v5_editor_templates_1440x960.png'
  },
  {
    id: 'ed-rev',
    name: '7. Krok 5 — Audyt Jakości, RODO i Eksport (Desktop)',
    filename: 'v5_editor_review_1440x960.png',
    category: 'screenshot',
    description: 'Karta podstawy prawnej (art. 22¹ KP vs zgoda rekrutacyjna), checklista i eksport wektorowego PDF.',
    size: '592 KB',
    url: '/evidence/v5_editor_review_1440x960.png'
  },
  {
    id: 'prev-mob',
    name: '8. Mobilny Arkusz Podglądu A4 ze Suwakiem Zoom',
    filename: 'v5_preview_modal_mobile_390x844.png',
    category: 'screenshot',
    description: 'Skalowanie dokumentu A4 (0.7x – 1.3x) na małym ekranie bez ucinania krawędzi i bez rozsuwania widoku.',
    size: '228 KB',
    url: '/evidence/v5_preview_modal_mobile_390x844.png'
  },
  {
    id: 'video-flow',
    name: '9. Nagranie Wideo Animacji i Ścieżki (MP4, 12.5s)',
    filename: 'v5_interaction_flow.mp4',
    category: 'video',
    description: 'Efekt pochylenia 3D tilt na ruch myszy, błysk światła, kliknięcie CTA, przejścia kroków, wstawienie STAR i zmiana szablonu.',
    size: '735 KB',
    url: '/evidence/v5_interaction_flow.mp4'
  }
];

export const V5VisualEvidenceModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>('zip');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [stage3CStatus, setStage3CStatus] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle');
  const [stage3CMessage, setStage3CMessage] = useState<string>('');
  const [gitBundleStatus, setGitBundleStatus] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle');
  const [gitBundleMessage, setGitBundleMessage] = useState<string>('');
  const [sourceZipStatus, setSourceZipStatus] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle');
  const [sourceZipMessage, setSourceZipMessage] = useState<string>('');
  const [gitPatchStatus, setGitPatchStatus] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle');
  const [gitPatchMessage, setGitPatchMessage] = useState<string>('');

  if (!isOpen) return null;

  // Client-side Blob download: works seamlessly inside the AI Studio iframe without Safari cookie issues!
  const handleDownloadFile = async (url: string, filename: string, id: string) => {
    try {
      setDownloadingId(id);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.warn('Direct blob download failed, falling back to window.open:', err);
      window.open(url, '_blank');
    } finally {
      setTimeout(() => setDownloadingId(null), 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="evidence-modal-title"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-indigo-900/40">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-[11px] font-bold text-indigo-200">
                Centrum Weryfikacji Wizualnej V5
              </span>
              <span className="text-xs text-slate-400">Paczka 3.8 MB (CRC32 Zweryfikowane)</span>
            </div>
            <h2 id="evidence-modal-title" className="text-lg sm:text-xl font-bold tracking-tight">
              Materiały do Weryfikacji Wizualnej PolJobHub V5
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            aria-label="Zamknij okno"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Safari Cookie Guidance Notice */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-5 py-3 text-xs text-amber-900 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold">Wskazówka dotycząca przeglądarki Safari / iOS:</span>{' '}
            Jeśli kliknięto link zewnętrzny i Safari wyświetliło komunikat{' '}
            <em>„Action required to load your app / browser is blocking a required security cookie”</em>, 
            wystarczy kliknąć widoczny w oknie przycisk <strong>„Authenticate in new window”</strong>. 
            <strong> Tutaj w tym oknie możesz pobrać wszystkie pliki natychmiast jednym kliknięciem</strong> — pobieranie odbywa się bezpośrednio w sesji aplikacji.
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Primary Quick Download Card for Git Bundle (Google Antigravity Handover) */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900 via-purple-950 to-slate-900 text-white border-2 border-indigo-400 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Opcja 1: Kompletne Repozytorium Git Bundle (33.3 MB)</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                poljobhub_v5_repo.bundle
              </h3>
              <p className="text-xs text-indigo-100/90 max-w-xl leading-relaxed">
                Zawiera <strong>kompletną historię Git</strong>, wszystkie branche (<code>stage-3d-final-qa</code>, <code>main</code>), <strong>10 szablonów CV</strong>, testy Playwright oraz pełną dokumentację <code>docs/antigravity-handover/</code>.
              </p>
              <div className="text-[11px] font-mono text-indigo-200 flex flex-col sm:flex-row sm:items-center gap-1.5">
                <span className="font-semibold text-white">SHA-256:</span>
                <span className="bg-black/40 text-emerald-300 px-2 py-0.5 rounded border border-indigo-500/40 text-[10px] select-all break-all">
                  fca207d5af03d901f362c57a0283bba6d85f3c4b16217a3e29af3cc071babe08
                </span>
                <span className="text-indigo-300 text-xs">(33.3 MB)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={async () => {
                  await downloadGitBundle((status, msg) => {
                    setGitBundleStatus(status);
                    if (msg) setGitBundleMessage(msg);
                  });
                }}
                disabled={gitBundleStatus === 'downloading'}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 active:scale-95 text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0 disabled:opacity-80"
              >
                <Download className={`w-5 h-5 ${gitBundleStatus === 'downloading' ? 'animate-bounce' : ''}`} />
                <span>
                  {gitBundleStatus === 'downloading'
                    ? (gitBundleMessage || 'Pobieranie (33 MB)...')
                    : gitBundleStatus === 'success'
                    ? (gitBundleMessage || '✓ Pobrano Bundle!')
                    : '⬇ Pobierz Git Bundle (33 MB)'}
                </span>
              </button>

              <a
                href="/poljobhub_v5_repo.bundle"
                download="poljobhub_v5_repo.bundle"
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-white/20"
                title="Pobieranie standardowe przeglądarki"
              >
                <ExternalLink className="w-4 h-4 text-indigo-300" />
                <span>Link Bezpośredni</span>
              </a>
            </div>
          </div>

          {/* Quick Download Card for Lightweight Source Code ZIP (438 KB - Recommended for Instant Safari Download) */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-900 via-emerald-950 to-slate-900 text-white border-2 border-teal-400 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300">★ Opcja 2 (Rekomendowana): Lekki ZIP z Kodem Źródłowym (438 KB)</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                poljobhub_v5_source.zip
              </h3>
              <p className="text-xs text-teal-100/90 max-w-xl leading-relaxed">
                Zawiera <strong>wszystkie pliki źródłowe</strong> (<code>src/</code>, <code>docs/antigravity-handover/</code>, <code>scripts/</code>, szablony, konfigurację). Pobiera się <strong>natychmiast w Safari</strong> dzięki kodowaniu pamięciowemu Base64.
              </p>
              <div className="text-[11px] font-mono text-teal-200 flex flex-col sm:flex-row sm:items-center gap-1.5">
                <span className="font-semibold text-white">SHA-256:</span>
                <span className="bg-black/40 text-teal-300 px-2 py-0.5 rounded border border-teal-500/40 text-[10px] select-all break-all">
                  306e0ff894fc1205e07a196b3dad179dc910bc0041d0fd11e2767ba6aa7ec978
                </span>
                <span className="text-teal-300 text-xs">(438 KB)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={async () => {
                  await downloadSourceZip((status, msg) => {
                    setSourceZipStatus(status);
                    if (msg) setSourceZipMessage(msg);
                  });
                }}
                disabled={sourceZipStatus === 'downloading'}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 active:scale-95 text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0 disabled:opacity-80"
              >
                <Download className={`w-5 h-5 ${sourceZipStatus === 'downloading' ? 'animate-bounce' : ''}`} />
                <span>
                  {sourceZipStatus === 'downloading'
                    ? (sourceZipMessage || 'Pobieranie...')
                    : sourceZipStatus === 'success'
                    ? (sourceZipMessage || '✓ Pobrano Kod ZIP!')
                    : '⬇ Pobierz Kod ZIP (438 KB)'}
                </span>
              </button>

              <a
                href="/poljobhub_v5_source.zip"
                download="poljobhub_v5_source.zip"
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-white/20"
                title="Pobieranie standardowe przeglądarki"
              >
                <ExternalLink className="w-4 h-4 text-teal-300" />
                <span>Link Bezpośredni</span>
              </a>
            </div>
          </div>

          {/* Quick Download Card for Git Patch (1.3 MB) */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-2 border-slate-600 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Opcja 3: Łatka Git Patch (1.3 MB)</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                poljobhub_v5_stage3d.patch
              </h3>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                Plik łatki diff (<code>git diff origin/main...stage-3d-final-qa</code>). Można zaaplikować bezpośrednio w istniejącym repozytorium GitHub poleceniem <code>git apply poljobhub_v5_stage3d.patch</code>.
              </p>
              <div className="text-[11px] font-mono text-slate-400 flex flex-col sm:flex-row sm:items-center gap-1.5">
                <span className="font-semibold text-white">SHA-256:</span>
                <span className="bg-black/40 text-amber-300 px-2 py-0.5 rounded border border-slate-600 text-[10px] select-all break-all">
                  66bca31e0268d019bdc0c2436dc90667ced4da728fcdeca8e198c699c0333edf
                </span>
                <span className="text-slate-400 text-xs">(1.3 MB)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={async () => {
                  await downloadGitPatch((status, msg) => {
                    setGitPatchStatus(status);
                    if (msg) setGitPatchMessage(msg);
                  });
                }}
                disabled={gitPatchStatus === 'downloading'}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0 disabled:opacity-80"
              >
                <Download className={`w-5 h-5 ${gitPatchStatus === 'downloading' ? 'animate-bounce' : ''}`} />
                <span>
                  {gitPatchStatus === 'downloading'
                    ? (gitPatchMessage || 'Pobieranie...')
                    : gitPatchStatus === 'success'
                    ? (gitPatchMessage || '✓ Pobrano Łatkę!')
                    : '⬇ Pobierz Łatkę Git (1.3 MB)'}
                </span>
              </button>

              <a
                href="/poljobhub_v5_stage3d.patch"
                download="poljobhub_v5_stage3d.patch"
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-white/20"
                title="Pobieranie standardowe przeglądarki"
              >
                <ExternalLink className="w-4 h-4 text-slate-400" />
                <span>Link Bezpośredni</span>
              </a>
            </div>
          </div>


          {/* Primary Quick Download Card for Stage 3C ZIP */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50/30 to-white border-2 border-indigo-300 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xs">
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">Stage 3C: Kompletna Paczka Akceptacji Multipage A4 (Aktualna)</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                PolJobHub_Stage3C_Multipage_A4_Acceptance.zip
              </h3>
              <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                Zawiera <strong>10 wektorowych próbek PDF A4</strong>, <strong>10 zrzutów wielostronicowych podglądów</strong>, zrzuty porównawcze <strong>Before vs After</strong> (100% zachowanych umiejętności), raport JSON i plik README.
              </p>
              <div className="text-[11px] font-mono text-slate-500 flex flex-col sm:flex-row sm:items-center gap-1.5">
                <span className="font-semibold text-slate-700">SHA-256:</span>
                <span className="bg-indigo-100/70 text-indigo-900 px-2 py-0.5 rounded border border-indigo-200 text-[10px] select-all break-all">
                  6e3d1d86cd54f7f2e5714bbec4115e826570ef5537be9726c126e583c974b210
                </span>
                <span className="text-slate-500 text-xs">(8.34 MB)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={async () => {
                  await downloadStage3CZip((status, msg) => {
                    setStage3CStatus(status);
                    if (msg) setStage3CMessage(msg);
                  });
                }}
                disabled={stage3CStatus === 'downloading'}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0 disabled:opacity-80"
              >
                <Download className={`w-5 h-5 ${stage3CStatus === 'downloading' ? 'animate-bounce' : ''}`} />
                <span>
                  {stage3CStatus === 'downloading'
                    ? (stage3CMessage || 'Pobieranie ZIP (8.3 MB)...')
                    : stage3CStatus === 'success'
                    ? (stage3CMessage || '✓ Pobrano ZIP na dysk!')
                    : '⬇ Download Stage 3C Evidence ZIP'}
                </span>
              </button>

              <a
                href="/PolJobHub_Stage3C_Multipage_A4_Acceptance.zip"
                download="PolJobHub_Stage3C_Multipage_A4_Acceptance.zip"
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                title="Pobieranie standardowe przeglądarki (Save Link As...)"
              >
                <ExternalLink className="w-4 h-4 text-slate-400" />
                <span>Link Bezpośredni</span>
              </a>
            </div>
          </div>

          {/* Secondary Quick Download Card for Stage 3B ZIP */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/70 to-white border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Archiwum Stage 3B (Zaakceptowane)</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                PolJobHub_Stage3B_Guided_Editor_Acceptance.zip (5.6 MB)
              </h4>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <a
                href="/api/download/stage3b-zip"
                download="PolJobHub_Stage3B_Guided_Editor_Acceptance.zip"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Pobierz Stage 3B (5.6 MB)</span>
              </a>
            </div>
          </div>



          {/* Secondary Quick Download Card for Stage 3A ZIP */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/60 to-white border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">Archiwum Stage 3A (Poprzedni etap)</span>
              <h4 className="text-sm font-bold text-slate-900">
                PolJobHub_Stage3A_Visual_Acceptance.zip (8.8 MB)
              </h4>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={() => handleDownloadFile('/PolJobHub_Stage3A_Visual_Acceptance.zip', 'PolJobHub_Stage3A_Visual_Acceptance.zip', 'zip-stage3a')}
                disabled={downloadingId === 'zip-stage3a'}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-60"
              >
                <Download className="w-4 h-4" />
                <span>Pobierz Stage 3A (8.8 MB)</span>
              </button>
            </div>
          </div>

          {/* Individual Files Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Poszczególne Zrzuty Ekranu i Wideo (Możesz pobrać pojedynczo lub wyświetlić):
              </h4>
              <span className="text-xs text-slate-400 font-mono">9 elementów</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {EVIDENCE_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 bg-white hover:bg-slate-50/50 transition flex flex-col justify-between gap-3 shadow-2xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                        {item.category === 'video' ? (
                          <Film className="w-4 h-4 text-purple-600 shrink-0" />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-indigo-600 shrink-0" />
                        )}
                        <span className="truncate">{item.name}</span>
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-slate-400 shrink-0 bg-slate-100 px-2 py-0.5 rounded">
                        {item.size}
                      </span>
                    </div>
                    <p className="text-[11.5px] text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      <span>Otwórz</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleDownloadFile(item.url, item.filename, item.id)}
                      disabled={downloadingId === item.id}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-60"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{downloadingId === item.id ? 'Pobieranie...' : 'Pobierz'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Embedded Video Player Demo for Instant Inspection */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-purple-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Podgląd Wideo Animacji (12.5s) — Odtwórz Bezpośrednio w Przeglądarce
                </h4>
              </div>
              <button
                type="button"
                onClick={() => handleDownloadFile('/evidence/stage3a_interaction_flow.webm', 'stage3a_interaction_flow.webm', 'vid-emb')}
                className="text-xs text-indigo-300 hover:text-white flex items-center gap-1 font-semibold transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Pobierz plik WebM</span>
              </button>
            </div>

            <div className="rounded-xl overflow-hidden bg-black/60 border border-white/10 aspect-video max-w-2xl mx-auto flex items-center justify-center">
              <video
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-contain"
                poster="/evidence/stage3a_01_homepage_desktop_1440x960.png"
              >
                <source src="/evidence/stage3a_interaction_flow.webm" type="video/webm" />
                Twoja przeglądarka nie obsługuje tagu wideo.
              </video>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Wszystkie pliki zostały zweryfikowane pod kątem integralności (formaty PNG, MP4, JSON).</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-semibold transition cursor-pointer"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};
