import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../types';
import { SITE_DATA } from '../data/content';
import { SectionDivider } from './StarIcon';

gsap.registerPlugin(ScrollTrigger);

interface ValuesBandProps {
  currentLang: Language;
}

export const ValuesBand: React.FC<ValuesBandProps> = ({ currentLang }) => {
  const v = SITE_DATA[currentLang].brand.values;
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !cardsRef.current) return;

    const cards = cardsRef.current.children;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [currentLang]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#FFFFFF] border-b border-[#1C2B52]/10 py-16"
      aria-label="Valeurs de l’association"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Value 1: Animation (People icon matching official logo) */}
          <div className="flex flex-col items-start p-7 rounded-[3px] bg-[#F8F5EE] border border-[#1C2B52]/10 hover:border-[#C9972E]/50 transition-all duration-300 relative group">
            <div className="w-12 h-12 rounded-full border-2 border-[#C9972E] bg-white flex items-center justify-center mb-4 text-[#C9972E] group-hover:scale-105 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9972E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#C9972E] mb-1 font-sans-brand">
              01 · {currentLang === 'ar' ? 'التنشيط' : 'Animation'}
            </div>
            <h3 className="font-serif-brand text-2xl font-bold text-[#1C2B52] mb-2">
              {v.animation.title}
            </h3>
            <p className="text-sm text-[#4A5168] leading-relaxed font-sans-brand">
              {v.animation.desc}
            </p>
          </div>

          {/* Value 2: Culture (Open Book icon matching official logo) */}
          <div className="flex flex-col items-start p-7 rounded-[3px] bg-[#F8F5EE] border border-[#1C2B52]/10 hover:border-[#C9972E]/50 transition-all duration-300 relative group">
            <div className="w-12 h-12 rounded-full border-2 border-[#C9972E] bg-white flex items-center justify-center mb-4 text-[#C9972E] group-hover:scale-105 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9972E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10" />
                <path d="M6 10h10" />
              </svg>
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#C9972E] mb-1 font-sans-brand">
              02 · {currentLang === 'ar' ? 'الثقافة' : 'Culture'}
            </div>
            <h3 className="font-serif-brand text-2xl font-bold text-[#1C2B52] mb-2">
              {v.culture.title}
            </h3>
            <p className="text-sm text-[#4A5168] leading-relaxed font-sans-brand">
              {v.culture.desc}
            </p>
          </div>

          {/* Value 3: Solidarité (Handshake icon matching official logo) */}
          <div className="flex flex-col items-start p-7 rounded-[3px] bg-[#F8F5EE] border border-[#1C2B52]/10 hover:border-[#C9972E]/50 transition-all duration-300 relative group">
            <div className="w-12 h-12 rounded-full border-2 border-[#C9972E] bg-white flex items-center justify-center mb-4 text-[#C9972E] group-hover:scale-105 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9972E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2-2" />
                <path d="m13 7.1 2.9-2.9a2 2 0 0 1 2.8 0l1.1 1.1a2 2 0 0 1 0 2.8L17 11" />
                <path d="m2 13 4.3 4.3a2 2 0 0 0 2.8 0l2.9-2.9" />
                <path d="m7 7 2-2a1 1 0 0 1 1.4 0l4.3 4.3a1 1 0 0 1 0 1.4l-2 2" />
              </svg>
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#C9972E] mb-1 font-sans-brand">
              03 · {currentLang === 'ar' ? 'التضامن' : 'Solidarité'}
            </div>
            <h3 className="font-serif-brand text-2xl font-bold text-[#1C2B52] mb-2">
              {v.solidarity.title}
            </h3>
            <p className="text-sm text-[#4A5168] leading-relaxed font-sans-brand">
              {v.solidarity.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
