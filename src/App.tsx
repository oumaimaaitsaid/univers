import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ValuesBand } from './components/ValuesBand';
import { AboutSection } from './components/AboutSection';
import { ActivitiesList } from './components/ActivitiesList';
import { EventsAgenda } from './components/EventsAgenda';
import { GallerySection } from './components/GallerySection';
import { InstagramSection } from './components/InstagramSection';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';
import { MemberModal } from './components/MemberModal';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('fr');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  // Update HTML document lang and dir attributes on language switch
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    if (currentLang === 'ar') {
      document.title = 'جمعية يونيفر أنيم | جمعية ثقافية بأسفي';
    } else {
      document.title = 'Univers Anim | Association culturelle à Asfi';
    }

    // Refresh ScrollTrigger calculations after language / layout change
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  }, [currentLang]);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
  };

  const handleOpenJoinModal = () => {
    setIsJoinModalOpen(true);
  };

  return (
    <div
      className={`min-h-screen bg-[#F8F5EE] text-[#1C2B52] selection:bg-[#C9972E] selection:text-white ${
        currentLang === 'ar' ? 'font-arabic-brand' : 'font-sans-brand'
      }`}
    >
      {/* 2s Max Skippable Theater Curtain Preloader */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Subtle Gold Dot Cursor on Desktop */}
      <CustomCursor />

      {/* 1. Header: official logo, navigation, FR | عربي, Adhérer button */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenJoinModal={handleOpenJoinModal}
      />

      <main>
        {/* 2. Hero: cream bg, laurel watermark with slow parallax, title line-by-line, 2 buttons, offset photo */}
        <Hero currentLang={currentLang} />

        {/* 3. Three values band: Animation, Culture, Solidarité */}
        <ValuesBand currentLang={currentLang} />

        {/* 4. À propos: editorial block with text & 2 overlapping photo frames with parallax */}
        <AboutSection currentLang={currentLang} />

        {/* 5. Activités: numbered list (01, 02, 03, 04) with scroll slide-in & photo hover */}
        <ActivitiesList currentLang={currentLang} />

        {/* 6. Événements: agenda-style list with expandable rows on hover/tap */}
        <EventsAgenda currentLang={currentLang} />

        {/* 7. Galerie: masonry grid with staggered reveal, zoom & swipe lightbox */}
        <GallerySection currentLang={currentLang} />

        {/* 8. Instagram: navy section, account link, 6 square photo frames */}
        <InstagramSection currentLang={currentLang} />

        {/* 9. Contact et adhésion: simple form, membership button, address Asfi, map, socials */}
        <ContactSection
          currentLang={currentLang}
          onOpenJoinModal={handleOpenJoinModal}
        />
      </main>

      {/* 10. Footer: navy, white logo, quick links, contact, copyright */}
      <FooterSection currentLang={currentLang} />

      {/* Membership Modal */}
      <MemberModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        currentLang={currentLang}
      />
    </div>
  );
}
