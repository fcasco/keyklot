import React from 'react';

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const THEMES = ['ocean', 'forest'];

const ThemeIcon: React.FC<{ theme: string }> = ({ theme }) => {
  if (theme === 'ocean') {
    return '🐟';
  }
  // Forest theme icon
  return '🦫';
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
