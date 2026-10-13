import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Language } from '../types';
import { SITE_DATA } from '../data/content';
import { MagneticButton } from './MagneticButton';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenJoinModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onOpenJoinModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('accueil');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const data = SITE_DATA[currentLang];
  const tNav = data.nav;

  const navLinks = [
    { href: '#accueil', id: 'accueil', label: tNav.home },
    { href: '#a-propos', id: 'a-propos', label: tNav.about },
    { href: '#activites', id: 'activites', label: tNav.activities },
    { href: '#evenements', id: 'evenements', label: tNav.events },
    { href: '#galerie', id: 'galerie', label: tNav.gallery },
    { href: '#contact', id: 'contact', label: tNav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // 1. Shrink header state
      setIsScrolled(window.scrollY > 30);

      // 2. Scroll Progress Bar (0 to 100%)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((window.scrollY / docHeight) * 100);
      }

      // 3. Active section spy
      const sections = ['contact', 'galerie', 'evenements', 'activites', 'a-propos', 'accueil'];
      const scrollPos = window.scrollY + 120;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 bg-[#1C2B52] text-[#F8F5EE] border-b border-[#C9972E]/40 shadow-md transition-all duration-300 ${
        isScrolled ? 'py-2 shadow-lg shadow-black/20' : 'py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Official Logo (Emblem + Typography Lockup) */}
          <a
            href="#accueil"
            className="flex items-center gap-3 shrink-0 py-1 focus:outline-none focus:ring-1 focus:ring-[#C9972E] group"
            aria-label="Univers Anim - Accueil"
          >
            <img
              src="/logo-white.svg"
              alt="Logo Association Univers Anim Asfi"
              className={`w-auto object-contain transition-all duration-300 ${
                isScrolled ? 'h-11 sm:h-12' : 'h-13 sm:h-15'
              }`}
            />
          </a>

          {/* Desktop Navigation with Animated Gold Underline on Active Link */}
          <nav
            className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide"
            aria-label="Menu principal"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`py-1.5 text-xs uppercase tracking-wider font-semibold transition-colors relative ${
                    isActive ? 'text-[#E6BF63]' : 'text-[#F8F5EE]/85 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Animated Gold Underline */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9972E] rounded-full transition-all duration-300 ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Actions: FR | عربي Switcher + Magnetic Adhérer Button */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center text-xs font-semibold tracking-wider border border-[#C9972E]/40 rounded-[4px] overflow-hidden bg-[#101B3A]">
              <button
                type="button"
                onClick={() => onLanguageChange('fr')}
                className={`px-2.5 py-1.5 transition-colors ${
                  currentLang === 'fr'
                    ? 'bg-[#C9972E] text-[#1C2B52] font-bold'
                    : 'text-[#F8F5EE]/80 hover:text-white'
                }`}
                aria-label="Version française"
              >
                FR
              </button>
              <span className="text-[#C9972E]/50 select-none">|</span>
              <button
                type="button"
                onClick={() => onLanguageChange('ar')}
                className={`px-2.5 py-1.5 transition-colors font-arabic-brand ${
                  currentLang === 'ar'
                    ? 'bg-[#C9972E] text-[#1C2B52] font-bold'
                    : 'text-[#F8F5EE]/80 hover:text-white'
                }`}
                aria-label="النسخة العربية"
              >
                عربي
              </button>
            </div>

            {/* Magnetic Rectangular Adhérer Button */}
            <MagneticButton
              variant="primary"
              onClick={onOpenJoinModal}
              className="hidden sm:inline-flex px-4 py-2"
            >
              {tNav.joinBtn}
            </MagneticButton>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#F8F5EE] hover:text-[#C9972E] border border-white/10 rounded-[4px]"
              aria-label="Ouvrir le menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Thin Gold Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#C9972E] to-[#F3DC9B] transition-[width] duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#101B3A] border-b border-[#C9972E]/40 px-6 py-6 space-y-4 animate-in fade-in">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base py-2 border-b border-white/5 transition-colors ${
                  activeSection === link.id
                    ? 'text-[#C9972E] font-bold'
                    : 'text-[#F8F5EE]/90 hover:text-[#C9972E]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoinModal();
              }}
              className="w-full py-3 rounded-[4px] bg-[#C9972E] text-[#1C2B52] font-bold text-sm uppercase tracking-wider text-center"
            >
              {tNav.joinBtn}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
