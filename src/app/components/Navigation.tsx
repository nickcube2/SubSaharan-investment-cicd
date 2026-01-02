'use client'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiX, FiChevronDown, FiGlobe } from 'react-icons/fi';
import { createPortal } from 'react-dom';

const logo = "/subsaharan_logo.png";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const { t, i18n } = useTranslation('common');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; width: number } | null>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'zu', name: 'isiZulu', flag: '🇿🇦' },
    { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
    { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // Helper to open dropdown and set position
  const openDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const dropdownWidth = 192; // 48 * 4 (w-48 in Tailwind = 12rem = 192px)
    let left = rect.left + window.scrollX;
    // Check if dropdown would overflow right edge
    if (left + dropdownWidth > window.innerWidth) {
      left = window.innerWidth - dropdownWidth - 8; // 8px margin from right
      if (left < 0) left = 0;
    }
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left,
      width: rect.width,
    });
    setLanguageDropdownOpen(true);
  };

  // Click outside handler (update to close portal dropdown)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false);
        setDropdownPosition(null);
      }
    };
    if (languageDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [languageDropdownOpen]);

  const changeLanguage = (lng: string) => {
    if (i18n && typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(lng);
    } else {
      // fallback: redirect to the locale route if i18n is not available
      window.location.pathname = `/${lng}${window.location.pathname.replace(/^\/\w{2}/, '')}`;
    }
    setLanguageDropdownOpen(false);
  };

  // Dropdown element for portal
  const dropdownElement = languageDropdownOpen && dropdownPosition
    ? createPortal(
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            minWidth: dropdownPosition.width,
            zIndex: 9999,
          }}
          className="w-48 max-w-xs bg-black/20 backdrop-blur-md rounded-lg shadow-xl border border-white/30"
        >
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-white/20 transition-colors flex items-center gap-3 text-white ${
                  i18n.language === language.code ? 'bg-white/10' : ''
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="text-white">{language.name}</span>
                {i18n.language === language.code && (
                  <span className="ml-auto text-white">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full max-w-full overflow-x-hidden bg-transparent backdrop-blur-sm text-white p-2 sm:p-4 z-50 border-b border-white/10">
        <div className="container max-w-full w-full overflow-x-hidden mx-auto flex flex-col md:flex-row items-center justify-between px-2 sm:px-4">
          {/* Top row: Logo and menu toggle */}
          <div className="w-full flex items-center justify-between">
            <Link href="/" className="flex-shrink-0 ml-2 sm:ml-9">
              <picture>
                <source srcSet={logo} type="image/png" />
                <img src={logo} alt="subsaharan logo" className="h-12 sm:h-16 md:h-20 object-contain max-w-full" />
              </picture>
            </Link>
            
            {/* Mobile: Language dropdown and hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Language Dropdown for Mobile */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={openDropdown}
                  className="flex items-center gap-2 px-2 py-2 rounded hover:bg-white/20 transition-colors"
                  aria-label="Select language"
                >
                  <FiGlobe className="text-lg" />
                  <span className="text-sm">{currentLanguage.code.toUpperCase()}</span>
                  <FiChevronDown className={`text-sm transition-transform ${languageDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <button
                className="text-2xl"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>

          {/* Navigation Links and Desktop Language Dropdown */}
          <div
            className={`w-full md:w-auto flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8 mt-4 md:mt-0 ${
              menuOpen ? 'flex' : 'hidden'
            } md:flex`}
          >
            <Link 
              href="/" 
              onClick={() => setMenuOpen(false)} 
              className="hover:text-gray-300 transition-colors whitespace-nowrap text-sm md:text-base font-medium min-w-fit"
            >
              {t('home')}
            </Link>
            <Link 
              href="/services/" 
              onClick={() => setMenuOpen(false)} 
              className="hover:text-gray-300 transition-colors whitespace-nowrap text-sm md:text-base font-medium min-w-fit"
            >
              {t('services')}
            </Link>
            <Link 
              href="/about/" 
              onClick={() => setMenuOpen(false)} 
              className="hover:text-gray-300 transition-colors whitespace-nowrap text-sm md:text-base font-medium min-w-fit"
            >
              {t('about')}
            </Link>
            <Link 
              href="/contact/" 
              onClick={() => setMenuOpen(false)} 
              className="hover:text-gray-300 transition-colors whitespace-nowrap text-sm md:text-base font-medium min-w-fit"
            >
              {t('contact')}
            </Link>
            
            {/* Desktop Language Dropdown */}
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button
                onClick={openDropdown}
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/20 transition-colors"
                aria-label="Select language"
              >
                <FiGlobe className="text-lg" />
                <span className="text-sm">{currentLanguage.code.toUpperCase()}</span>
                <FiChevronDown className={`text-sm transition-transform ${languageDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>
      {dropdownElement}
    </>
  );
};

export default Navigation; 