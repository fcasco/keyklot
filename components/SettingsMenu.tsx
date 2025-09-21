import React, { useState, useRef, useEffect } from 'react';
import ThemeSelector from './ThemeSelector';

interface SettingsMenuProps {
  isMuted: boolean;
  onToggleMute: () => void;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ isMuted, onToggleMute, currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const SoundIcon = isMuted 
    ? () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-theme-text-muted opacity-60"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
    )
    : () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-theme-text-muted"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
    );
  
  const GearIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-theme-text-muted"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
  );

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/20 p-3 rounded-lg transition-colors duration-200 hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-theme-secondary focus:ring-opacity-75"
        aria-label="Open settings"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <GearIcon />
      </button>

      {isOpen && (
        <div
          className="absolute bottom-full right-0 mb-2 bg-black/40 backdrop-blur-sm rounded-lg p-2 flex flex-col items-center gap-2 shadow-lg z-20"
          role="menu"
        >
          <button
            onClick={onToggleMute}
            className="bg-black/20 p-3 rounded-lg transition-colors duration-200 hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-theme-secondary focus:ring-opacity-75 w-full"
            aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
            role="menuitem"
          >
            <SoundIcon />
          </button>
          <div role="menuitem">
            <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;
