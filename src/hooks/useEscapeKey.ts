import { useEffect } from 'react';

/**
 * Hook to listen for Escape key presses and trigger a callback (e.g. closing modals).
 */
export function useEscapeKey(onClose: () => void, isOpen: boolean = true) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
}
