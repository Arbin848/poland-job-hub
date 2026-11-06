import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface Props {
  text?: string;
  value?: string;
  size?: number;
}

export const QrCodeBadge: React.FC<Props> = ({ text, value, size = 64 }) => {
  const [dataUrl, setDataUrl] = useState<string>('');
  const qrValue = text || value || '';

  useEffect(() => {
    if (!qrValue) return;
    QRCode.toDataURL(qrValue, {
      width: size * 2,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    })
      .then((url) => setDataUrl(url))
      .catch((err) => console.warn('QR code gen error:', err));
  }, [qrValue, size]);

  if (!dataUrl) return null;

  return (
    <div className="flex flex-col items-center">
      <img
        src={dataUrl}
        alt="Kod QR do profilu online / QR code to online profile"
        style={{ width: size, height: size }}
        className="rounded border border-slate-200 bg-white p-0.5 shadow-2xs"
      />
      <span className="text-[9px] text-slate-500 font-mono mt-0.5 tracking-tight">
        Scan Profile
      </span>
    </div>
  );
};
