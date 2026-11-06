/**
 * Premium Blue-Violet Design System Tokens
 * PolJobHub - Premium Motion Experience
 */

export const THEME = {
  colors: {
    primary: '#6250F4',        // Brand Blue-Violet
    primaryHover: '#5240e3',
    primaryLight: '#f0eeff',
    secondary: '#A447F4',      // Soft Purple Accent
    secondaryLight: '#faf5ff',
    gradient: 'linear-gradient(135deg, #6250F4 0%, #A447F4 100%)',
    gradientSubtle: 'linear-gradient(135deg, rgba(98,80,244,0.08) 0%, rgba(164,71,244,0.06) 100%)',
    textPrimary: '#18233F',    // Deep Slate / Obsidian
    textMuted: '#75819C',      // Cool Muted Slate
    background: '#F8F9FF',     // Canvas Backdrop
    card: '#FFFFFF',           // Crisp White Card
    border: '#E5E8F3',         // Subtle Clean Border
    borderHover: '#d0d5ea',
    success: '#059669',        // Polish Verified Green
    successLight: '#ecfdf5',
    warning: '#d97706',
    warningLight: '#fffbeb',
  },
  shadows: {
    xs: '0 1px 2px rgba(24, 35, 63, 0.04)',
    sm: '0 2px 8px rgba(24, 35, 63, 0.06)',
    card: '0 8px 24px -4px rgba(24, 35, 63, 0.08), 0 2px 6px -1px rgba(24, 35, 63, 0.04)',
    cardHover: '0 20px 35px -8px rgba(98, 80, 244, 0.16), 0 8px 16px -4px rgba(24, 35, 63, 0.06)',
    glow: '0 0 35px rgba(98, 80, 244, 0.22)',
    sheetA4: '0 25px 60px -15px rgba(24, 35, 63, 0.18), 0 0 0 1px rgba(24, 35, 63, 0.05)',
  },
  radii: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    pill: '9999px',
  },
  motion: {
    buttonFeedback: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    formTransition: '240ms cubic-bezier(0.16, 1, 0.3, 1)',
    templateSelection: '320ms cubic-bezier(0.16, 1, 0.3, 1)',
    pageTransition: '380ms cubic-bezier(0.16, 1, 0.3, 1)',
    heroEntrance: '550ms cubic-bezier(0.16, 1, 0.3, 1)',
  }
} as const;
