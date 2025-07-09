
import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(true); // Por defecto modo oscuro

  useEffect(() => {
    const stored = localStorage.getItem('jobfollower-theme');
    if (stored) {
      const isDarkStored = stored === 'dark';
      setIsDark(isDarkStored);
    }
    
    // Aplicar tema inicial
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('jobfollower-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return { isDark, toggleTheme };
};
