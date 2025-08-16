'use client';

import { useTheme } from '../contexts/ThemeContext';

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    console.log('Current theme:', theme);
    if (theme === 'light') {
      console.log('Changing to dark');
      setTheme('dark');
    } else if (theme === 'dark') {
      console.log('Changing to system');
      setTheme('system');
    } else {
      console.log('Changing to light');
      setTheme('light');
    }
  };

  const getThemeIcon = () => {
    if (theme === 'system') {
      return '🖥️';
    }
    return resolvedTheme === 'dark' ? '🌙' : '☀️';
  };


  return (
    <nav className="navbar-bg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary">
              Pallettr
            </h1>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center px-1 py-1 rounded-full bg-transparent border border-primary transition-colors duration-200"
            >
              <span className="text-lg">{getThemeIcon()}</span>
            </button>
            <button className="bg-primary hover:bg-primary-hover active:bg-primary-active text-white rounded-lg font-medium transition-colors px-4 cursor-pointer">
                Wishlist
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
