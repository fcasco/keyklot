import React from 'react';

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const THEMES = ['ocean', 'forest'];

const ThemeIcon: React.FC<{ theme: string }> = ({ theme }) => {
  if (theme === 'ocean') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-theme-text-muted">
        <path d="M3 12c.83-.64 1.5-1.5 2.5-2 1-.5 2.5-.5 3.5 0 1 .5 2 .5 3 0s2.5-.5 3.5 0c1 .5 1.67 1.36 2.5 2"/>
        <path d="M3 6c.83-.64 1.5-1.5 2.5-2 1-.5 2.5-.5 3.5 0 1 .5 2 .5 3 0s2.5-.5 3.5 0c1 .5 1.67 1.36 2.5 2"/>
        <path d="M3 18c.83-.64 1.5-1.5 2.5-2 1-.5 2.5-.5 3.5 0 1 .5 2 .5 3 0s2.5-.5 3.5 0c1 .5 1.67 1.36 2.5 2"/>
      </svg>
    );
  }
  // Forest theme icon
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-theme-text-muted">
      <path d="m3 3 1.5 12 1.5-12 1.5 12 1.5-12"/>
      <path d="M12 3v18"/>
      <path d="m21 3-1.5 12-1.5-12-1.5 12-1.5-12"/>
    </svg>
  );
};

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  const toggleTheme = () => {
    const currentIndex = THEMES.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    onThemeChange(THEMES[nextIndex]);
  };
  
  const nextThemeName = THEMES[(THEMES.indexOf(currentTheme) + 1) % THEMES.length];

  return (
    <button
      onClick={toggleTheme}
      className="bg-black/20 p-3 rounded-lg transition-colors duration-200 hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-theme-secondary focus:ring-opacity-75"
      aria-label={`Switch to ${nextThemeName} theme`}
      title={`Switch to ${nextThemeName} theme`}
    >
      <ThemeIcon theme={currentTheme} />
    </button>
  );
};

export default ThemeSelector;
