import React, { useRef } from 'react';
import { PersonalInfo, LanguageCode } from '../../types/cv';
import { User, Mail, Phone, MapPin, Linkedin, Globe, Github, Camera, ShieldCheck, Car, Trash2 } from 'lucide-react';

interface Props {
  info: PersonalInfo;
  onChange: (updated: Partial<PersonalInfo>) => void;
  language: LanguageCode;
  agencyBadge?: { enabled: boolean; agencyName: string };
  onAgencyBadgeChange?: (badge: { enabled: boolean; agencyName: string }) => void;
}

export const PersonalInfoSection: React.FC<Props> = ({
  info,
  onChange,
  language,
  agencyBadge,
  onAgencyBadgeChange
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isPl = language === 'pl';

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({ photoUrl: reader.result as string, showPhoto: true });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* Photo Controls */}
      <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {info.photoUrl ? (
            <img
              src={info.photoUrl}
              alt={info.fullName ? `${info.fullName} – podgląd zdjęcia` : 'Kandydat – podgląd zdjęcia'}
              className="w-14 h-14 rounded-md object-cover border border-slate-300"
            />
          ) : (
            <div className="w-14 h-14 rounded-md bg-slate-200 flex items-center justify-center text-slate-400">
              <User className="w-6 h-6" />
            </div>
          )}
          <div>
            <div className="text-xs font-semibold text-slate-900">
              {isPl ? 'Zdjęcie profilowe w CV' : 'CV Profile Headshot'}
            </div>
            <p className="text-[11px] text-slate-500">
              {isPl
                ? 'W Polsce zdjęcie jest standardem (do ofert międzynarodowych możesz je wyłączyć jednym kliknięciem).'
                : 'Customary in Poland/EU. Can be toggled off for UK/US tech ATS standards.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePhotoUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition"
          >
            <Camera className="w-3.5 h-3.5 inline mr-1" />
            {isPl ? 'Wgraj zdjęcie' : 'Upload photo'}
          </button>

          {info.photoUrl && (
            <button
              type="button"
              onClick={() => onChange({ showPhoto: !info.showPhoto })}
              className={`px-3 py-1.5 text-xs font-medium rounded border transition ${
                info.showPhoto
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-300'
              }`}
            >
              {info.showPhoto 
                ? (isPl ? 'Widoczne w CV' : 'Visible in CV') 
                : (isPl ? 'Ukryte' : 'Hidden')}
            </button>
          )}

          {info.photoUrl && (
            <button
              type="button"
              onClick={() => onChange({ photoUrl: '', showPhoto: false })}
              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition"
              title={isPl ? 'Usuń zdjęcie' : 'Remove photo'}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Photo Quality & Etiquette Checker */}
        {info.photoUrl && (
          <div className="w-full sm:col-span-2 pt-2 border-t border-slate-200/70 text-[11px] text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {isPl
                  ? 'Zdjęcie załadowane. Wskazówka: Polscy rekruterzy cenią jednolite, jasne tło i strój biznesowy.'
                  : 'Photo uploaded. Tip: Recruiters prefer neutral, well-lit backgrounds and professional attire.'}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              Auto-crop: 1:1 portrait
            </span>
          </div>
        )}
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {isPl ? 'Imię i Nazwisko' : 'Full Name'} *
          </label>
          <input
            type="text"
            value={info.fullName ?? ''}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder="np. Mikołaj Kamiński"
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded focus:outline-hidden focus:ring-1 focus:ring-slate-800"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {isPl ? 'Stanowisko / Tytuł zawodowy' : 'Job Title / Target Role'} *
          </label>
          <input
            type="text"
            value={info.jobTitle ?? ''}
            onChange={(e) => onChange({ jobTitle: e.target.value })}
            placeholder={isPl ? 'np. Koordynator Logistyki / Full Stack Developer' : 'e.g. Senior Logistics Specialist'}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded focus:outline-hidden focus:ring-1 focus:ring-slate-800"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            <Mail className="w-3 h-3 inline mr-1 text-slate-400" />
            Email *
          </label>
          <input
            type="email"
            value={info.email ?? ''}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="twoj.email@domena.com"
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded focus:outline-hidden focus:ring-1 focus:ring-slate-800"
          />
          {info.email && !info.email.includes('@') && (
            <p className="text-[10.5px] text-rose-600 mt-1">
              {isPl ? 'Wpisz poprawny adres e-mail ze znakiem @' : 'Please provide a valid email containing @'}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            <Phone className="w-3 h-3 inline mr-1 text-slate-400" />
            {isPl ? 'Telefon kontaktowy' : 'Phone'} *
          </label>
          <input
            type="tel"
            value={info.phone ?? ''}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="+48 601 234 567"
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded focus:outline-hidden focus:ring-1 focus:ring-slate-800"
          />
          {info.phone && !info.phone.trim().startsWith('+') && (
            <p className="text-[10.5px] text-amber-700 mt-1">
              {isPl ? 'Wskazówka: Dodaj numer kierunkowy (np. +48 dla Polski), aby rekruterzy mogli zadzwonić.' : 'Tip: Add country code (e.g. +48 for Poland) for recruiter outreach.'}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            <MapPin className="w-3 h-3 inline mr-1 text-slate-400" />
            {isPl ? 'Lokalizacja / Miasto' : 'Location (City, Country)'}
          </label>
          <input
            type="text"
            value={info.location ?? ''}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder={isPl ? 'np. Warszawa, Polska (lub gotowy do relokacji)' : 'e.g. Warsaw, Poland (open to relocation)'}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded focus:outline-hidden focus:ring-1 focus:ring-slate-800"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            <Car className="w-3 h-3 inline mr-1 text-slate-400" />
            {isPl ? 'Prawo Jazdy (ważne dla wielu pracodawców w PL)' : 'Driving License'}
          </label>
          <input
            type="text"
            value={info.drivingLicense || ''}
            onChange={(e) => onChange({ drivingLicense: e.target.value })}
            placeholder="np. Kat. B, Kat. C+E"
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded focus:outline-hidden focus:ring-1 focus:ring-slate-800"
          />
          {info.drivingLicense && /foreign|zagraniczn|ukr|ind|nep|non-eu|biel|mold/i.test(info.drivingLicense) && (
            <div className="mt-1.5 text-[11px] text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-1 rounded flex items-center justify-between">
              <span>Converting a foreign licence in Poland?</span>
              <a href="https://prawojazdy.io" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-indigo-900">
                &rarr; PrawoJazdy.io
              </a>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            <Linkedin className="w-3 h-3 inline mr-1 text-slate-400" />
            LinkedIn Profile
          </label>
          <input
            type="text"
            value={info.linkedIn || ''}
            onChange={(e) => onChange({ linkedIn: e.target.value })}
            placeholder="linkedin.com/in/imie-nazwisko"
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded focus:outline-hidden focus:ring-1 focus:ring-slate-800"
          />
        </div>

        <div className="sm:col-span-2 p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <label className="block text-xs font-semibold text-slate-800 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 inline mr-1 text-slate-600" />
            {isPl ? 'Status prawny w Polsce (Ważne dla cudzoziemców)' : 'Work Eligibility & Polish Residency Status'}
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              onChange={(e) => {
                if (e.target.value) {
                  onChange({
                    workEligibility: e.target.value,
                    workEligibilityType: e.target.value
                  });
                }
              }}
              className="text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-700"
            >
              <option value="">{isPl ? '-- Wybierz szablon statusu --' : '-- Select status template --'}</option>
              <option value={isPl ? 'Obywatelstwo Polskie / UE – pełny dostęp do rynku pracy' : 'EU / Polish Citizen – Full labor market access'}>
                {isPl ? 'Obywatel UE / Polski (pełny dostęp)' : 'EU Citizen (full access)'}
              </option>
              <option value={isPl ? 'Karta Pobytu z adnotacją „dostęp do rynku pracy”' : 'Temporary Residence Card (Karta Pobytu) with labor market access'}>
                {isPl ? 'Karta Pobytu (dostęp do rynku pracy)' : 'Karta Pobytu (labor access)'}
              </option>
              <option value={isPl ? 'PESEL ze statusem UKR (legalny pobyt i praca na mocy ustawy)' : 'PESEL UKR status (legal stay and work under special act)'}>
                {isPl ? 'PESEL UKR (Obywatele Ukrainy)' : 'PESEL UKR (Ukrainian citizens)'}
              </option>
              <option value={isPl ? 'Student studiów stacjonarnych w RP (zwolniony z zezwolenia na pracę)' : 'Full-time University Student in Poland (exempt from work permit)'}>
                {isPl ? 'Student w RP (zwolniony z zezwolenia)' : 'Student in Poland (exempt)'}
              </option>
              <option value={isPl ? 'Wiza z prawem do pracy / Zezwolenie typ A' : 'Work visa / Type A work permit'}>
                {isPl ? 'Wiza z prawem do pracy / Zezwolenie' : 'Work visa / Type A permit'}
              </option>
            </select>

            <input
              type="text"
              value={info.workEligibility || ''}
              onChange={(e) => onChange({ workEligibility: e.target.value })}
              placeholder={isPl ? 'Wpisz lub wybierz status prawny powyżej...' : 'Type work status...'}
              className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded bg-white"
            />
          </div>
          <p className="text-[10px] text-slate-500 mt-1">
            {isPl
              ? 'Wpisanie jasnego statusu usuwa obawy polskich pracodawców przed biurokracją i drastycznie zwiększa liczbę telefonów od agencji.'
              : 'Explicitly stating your Polish legal status eliminates employer hesitation regarding permits.'}
          </p>

          <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800">
                {isPl ? 'Odznaka prawa do pracy w nagłówku CV' : 'Work Authorization Badge in CV Header'}
              </span>
              <p className="text-[10px] text-slate-500">
                {isPl
                  ? 'Wyświetla zieloną odznakę "✓ Prawo do pracy w Polsce" bezpośrednio w nagłówku CV.'
                  : 'Displays a verified "✓ Legal right to work in Poland" badge in the CV header.'}
              </p>
            </div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(info.showWorkPermitBadge)}
                onChange={(e) => onChange({ showWorkPermitBadge: e.target.checked })}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 w-4 h-4"
              />
              <span>{isPl ? 'Włącz odznakę' : 'Enable badge'}</span>
            </label>
          </div>
        </div>

        {/* QR Code section */}
        <div className="sm:col-span-2 p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-800">
                {isPl ? 'Kod QR w nagłówku CV (LinkedIn / Portfolio)' : 'QR Code in CV Header (LinkedIn / Portfolio)'}
              </label>
              <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(info.showQrCode)}
                  onChange={(e) => onChange({ showQrCode: e.target.checked })}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-800"
                />
                <span>{isPl ? 'Pokaż kod QR' : 'Show QR code'}</span>
              </label>
            </div>
            {info.showQrCode && (
              <input
                type="url"
                value={info.qrCodeUrl ?? ''}
                onChange={(e) => onChange({ qrCodeUrl: e.target.value })}
                placeholder="https://linkedin.com/in/twoj-profil"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white font-mono mt-1"
              />
            )}
          </div>
        </div>

        {/* Agency Verification Badge Toggle */}
        {agencyBadge && onAgencyBadgeChange && (
          <div className="sm:col-span-2 p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-800">
                {isPl ? 'Stempel weryfikacji agencji (PolJobHub Agency)' : 'Agency Verification Seal (PolJobHub)'}
              </label>
              <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(agencyBadge.enabled)}
                  onChange={(e) => onAgencyBadgeChange({ ...agencyBadge, enabled: e.target.checked })}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-800"
                />
                <span>{isPl ? 'Aktywny stempel' : 'Show verification'}</span>
              </label>
            </div>
            {agencyBadge.enabled && (
              <input
                type="text"
                value={agencyBadge.agencyName ?? ''}
                onChange={(e) => onAgencyBadgeChange({ ...agencyBadge, agencyName: e.target.value })}
                placeholder="np. PolJobHub Agency Network"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white mt-1"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
