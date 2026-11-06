/**
 * Bulletproof download helper for Stage 3C ZIP package.
 * Designed specifically to overcome iframe sandbox, Safari ITP cookie restrictions,
 * and cross-origin download policies in AI Studio preview environments.
 */

export async function downloadStage3CZip(
  onStatusChange?: (status: 'idle' | 'downloading' | 'success' | 'error', message?: string) => void
): Promise<boolean> {
  const filename = 'PolJobHub_Stage3C_Multipage_A4_Acceptance.zip';
  const binaryUrl = '/api/download/stage3c-zip';
  const base64Url = '/api/download/stage3c-zip-base64';
  const staticUrl = '/PolJobHub_Stage3C_Multipage_A4_Acceptance.zip';

  if (onStatusChange) {
    onStatusChange('downloading', 'Pobieranie paczki ZIP (8.34 MB)...');
  }

  // Helper to trigger save dialog from Blob
  const saveBlob = (blob: Blob, name: string) => {
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = blobUrl;
    link.download = name;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      try {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } catch {}
    }, 4000);
  };

  // STRATEGY 1: Fetch binary as Blob in current authenticated iframe session
  try {
    const res = await fetch(binaryUrl, {
      method: 'GET',
      headers: { Accept: 'application/zip' }
    });

    if (res.ok) {
      const blob = await res.blob();
      if (blob.size > 1000) {
        saveBlob(blob, filename);
        if (onStatusChange) {
          onStatusChange('success', '✓ Pobrano ZIP na dysk!');
          setTimeout(() => onStatusChange('idle'), 3500);
        }
        return true;
      }
    }
  } catch (err) {
    console.warn('[Stage3CDownload] Strategy 1 (Blob fetch) failed:', err);
  }

  // STRATEGY 2: Fetch Base64 via JSON API (bypasses browser binary/download sandboxing)
  try {
    if (onStatusChange) {
      onStatusChange('downloading', 'Pobieranie przez API pamięci...');
    }
    const res = await fetch(base64Url);
    if (res.ok) {
      const json = await res.json();
      if (json.base64 && json.base64.length > 1000) {
        const binaryStr = window.atob(json.base64);
        const len = binaryStr.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/zip' });
        saveBlob(blob, json.filename || filename);
        if (onStatusChange) {
          onStatusChange('success', '✓ Pobrano ZIP na dysk!');
          setTimeout(() => onStatusChange('idle'), 3500);
        }
        return true;
      }
    }
  } catch (err) {
    console.warn('[Stage3CDownload] Strategy 2 (Base64 JSON) failed:', err);
  }

  // STRATEGY 3: Hidden iframe navigation in current session
  try {
    if (onStatusChange) {
      onStatusChange('downloading', 'Inicjowanie strumienia...');
    }
    const hiddenIframe = document.createElement('iframe');
    hiddenIframe.style.display = 'none';
    hiddenIframe.src = binaryUrl;
    document.body.appendChild(hiddenIframe);
    setTimeout(() => {
      try {
        document.body.removeChild(hiddenIframe);
      } catch {}
    }, 6000);
    if (onStatusChange) {
      onStatusChange('success', '✓ Strumień pobierania aktywny!');
      setTimeout(() => onStatusChange('idle'), 3500);
    }
    return true;
  } catch (err) {
    console.warn('[Stage3CDownload] Strategy 3 (Hidden iframe) failed:', err);
  }

  // STRATEGY 4: Same-frame location assignment (attachment header prevents navigation)
  try {
    window.location.assign(staticUrl);
    if (onStatusChange) {
      onStatusChange('success', '✓ Pobieranie rozpoczęte!');
      setTimeout(() => onStatusChange('idle'), 3500);
    }
    return true;
  } catch (err) {
    console.error('[Stage3CDownload] All automatic download strategies failed:', err);
    if (onStatusChange) {
      onStatusChange('error', '✕ Kliknij link bezpośredni poniżej');
      setTimeout(() => onStatusChange('idle'), 4000);
    }
    return false;
  }
}

export async function downloadStage3DZip(
  onStatusChange?: (status: 'idle' | 'downloading' | 'success' | 'error', message?: string) => void
): Promise<boolean> {
  const filename = 'PolJobHub_Stage3D_Final_QA_Acceptance.zip';
  const binaryUrl = '/api/download/stage3d-zip';
  const base64Url = '/api/download/stage3d-zip-base64';
  const staticUrl = '/PolJobHub_Stage3D_Final_QA_Acceptance.zip';

  if (onStatusChange) {
    onStatusChange('downloading', 'Pobieranie paczki Stage 3D Final QA...');
  }

  const saveBlob = (blob: Blob, name: string) => {
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = blobUrl;
    link.download = name;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      try {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } catch {}
    }, 4000);
  };

  try {
    const res = await fetch(binaryUrl, {
      method: 'GET',
      headers: { Accept: 'application/zip' }
    });

    if (res.ok) {
      const blob = await res.blob();
      if (blob.size > 1000) {
        saveBlob(blob, filename);
        if (onStatusChange) {
          onStatusChange('success', '✓ Pobrano ZIP Stage 3D!');
          setTimeout(() => onStatusChange('idle'), 3500);
        }
        return true;
      }
    }
  } catch (err) {
    console.warn('[Stage3DDownload] Strategy 1 (Blob fetch) failed:', err);
  }

  try {
    if (onStatusChange) {
      onStatusChange('downloading', 'Pobieranie przez API pamięci...');
    }
    const res = await fetch(base64Url);
    if (res.ok) {
      const json = await res.json();
      if (json.base64 && json.base64.length > 1000) {
        const binaryStr = window.atob(json.base64);
        const len = binaryStr.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/zip' });
        saveBlob(blob, json.filename || filename);
        if (onStatusChange) {
          onStatusChange('success', '✓ Pobrano ZIP Stage 3D!');
          setTimeout(() => onStatusChange('idle'), 3500);
        }
        return true;
      }
    }
  } catch (err) {
    console.warn('[Stage3DDownload] Strategy 2 (Base64 JSON) failed:', err);
  }

  try {
    window.location.assign(staticUrl);
    if (onStatusChange) {
      onStatusChange('success', '✓ Rozpoczęto pobieranie!');
      setTimeout(() => onStatusChange('idle'), 3500);
    }
    return true;
  } catch (err) {
    console.error('[Stage3DDownload] Fallback failed:', err);
    if (onStatusChange) {
      onStatusChange('error', '✕ Użyj linku bezpośredniego');
      setTimeout(() => onStatusChange('idle'), 4000);
    }
    return false;
  }
}

export async function downloadGitBundle(
  onStatusChange?: (status: 'idle' | 'downloading' | 'success' | 'error', message?: string) => void
): Promise<boolean> {
  const filename = 'poljobhub_v5_repo.bundle';
  const binaryUrl = '/api/download/git-bundle';
  const staticUrl = '/poljobhub_v5_repo.bundle';

  if (onStatusChange) {
    onStatusChange('downloading', 'Pobieranie Git bundle (33 MB)...');
  }

  const saveBlob = (blob: Blob, name: string) => {
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = blobUrl;
    link.download = name;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      try {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } catch {}
    }, 10000);
  };

  try {
    const res = await fetch(binaryUrl);
    if (res.ok) {
      const blob = await res.blob();
      if (blob.size > 1000) {
        saveBlob(blob, filename);
        if (onStatusChange) {
          onStatusChange('success', '✓ Pobrano Git bundle (33 MB)!');
          setTimeout(() => onStatusChange('idle'), 4000);
        }
        return true;
      }
    }
  } catch (err) {
    console.warn('[GitBundleDownload] Blob strategy failed, falling back:', err);
  }

  try {
    window.location.assign(staticUrl);
    if (onStatusChange) {
      onStatusChange('success', '✓ Pobieranie rozpoczęte!');
      setTimeout(() => onStatusChange('idle'), 4000);
    }
    return true;
  } catch (err) {
    console.error('[GitBundleDownload] Direct navigation failed:', err);
    if (onStatusChange) {
      onStatusChange('error', '✕ Błąd pobierania');
      setTimeout(() => onStatusChange('idle'), 4000);
    }
    return false;
  }
}

export async function downloadSourceZip(
  onStatusChange?: (status: 'idle' | 'downloading' | 'success' | 'error', message?: string) => void
): Promise<boolean> {
  const filename = 'poljobhub_v5_source.zip';
  const binaryUrl = '/api/download/source-zip';
  const base64Url = '/api/download/source-zip-base64';

  if (onStatusChange) {
    onStatusChange('downloading', 'Pobieranie kodu ZIP (438 KB)...');
  }

  const saveBlob = (blob: Blob, name: string) => {
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = blobUrl;
    link.download = name;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      try {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } catch {}
    }, 4000);
  };

  try {
    const res = await fetch(binaryUrl);
    if (res.ok) {
      const blob = await res.blob();
      if (blob.size > 500) {
        saveBlob(blob, filename);
        if (onStatusChange) {
          onStatusChange('success', '✓ Pobrano ZIP z kodem!');
          setTimeout(() => onStatusChange('idle'), 3500);
        }
        return true;
      }
    }
  } catch (err) {
    console.warn('[SourceZip] Blob fetch failed, trying base64:', err);
  }

  try {
    const res = await fetch(base64Url);
    if (res.ok) {
      const json = await res.json();
      if (json.base64) {
        const binaryStr = window.atob(json.base64);
        const len = binaryStr.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/zip' });
        saveBlob(blob, filename);
        if (onStatusChange) {
          onStatusChange('success', '✓ Pobrano ZIP z kodem!');
          setTimeout(() => onStatusChange('idle'), 3500);
        }
        return true;
      }
    }
  } catch (err) {
    console.warn('[SourceZip] Base64 fetch failed:', err);
  }

  return false;
}

export async function downloadGitPatch(
  onStatusChange?: (status: 'idle' | 'downloading' | 'success' | 'error', message?: string) => void
): Promise<boolean> {
  const filename = 'poljobhub_v5_stage3d.patch';
  const binaryUrl = '/api/download/git-patch';
  const base64Url = '/api/download/git-patch-base64';

  if (onStatusChange) {
    onStatusChange('downloading', 'Pobieranie łatki Git Patch (1.3 MB)...');
  }

  const saveBlob = (blob: Blob, name: string) => {
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = blobUrl;
    link.download = name;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      try {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } catch {}
    }, 4000);
  };

  try {
    const res = await fetch(binaryUrl);
    if (res.ok) {
      const blob = await res.blob();
      if (blob.size > 500) {
        saveBlob(blob, filename);
        if (onStatusChange) {
          onStatusChange('success', '✓ Pobrano łatkę Git Patch!');
          setTimeout(() => onStatusChange('idle'), 3500);
        }
        return true;
      }
    }
  } catch (err) {
    console.warn('[GitPatch] Blob fetch failed, trying base64:', err);
  }

  try {
    const res = await fetch(base64Url);
    if (res.ok) {
      const json = await res.json();
      if (json.base64) {
        const binaryStr = window.atob(json.base64);
        const len = binaryStr.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'text/x-diff' });
        saveBlob(blob, filename);
        if (onStatusChange) {
          onStatusChange('success', '✓ Pobrano łatkę Git Patch!');
          setTimeout(() => onStatusChange('idle'), 3500);
        }
        return true;
      }
    }
  } catch (err) {
    console.warn('[GitPatch] Base64 fetch failed:', err);
  }

  return false;
}

