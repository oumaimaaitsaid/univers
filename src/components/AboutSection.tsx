import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../types';
import { SITE_DATA } from '../data/content';
import { PhotoFrame } from './PhotoFrame';
import { SectionDivider } from './StarIcon';

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  currentLang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang }) => {
  const t = SITE_DATA[currentLang].about;
  const sectionRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const frameBackRef = useRef<HTMLDivElement>(null);
  const frameFrontRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax on overlapping frames
      if (frameBackRef.current && frameFrontRef.current) {
        gsap.to(frameBackRef.current, {
          y: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
        gsap.to(frameFrontRef.current, {
          y: 35,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Soft reveal of text column
      if (textColRef.current) {
        gsap.fromTo(
          textColRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: textColRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [currentLang]);

  return (
    <section
      ref={sectionRef}
      id="a-propos"
      className="py-20 sm:py-28 bg-[#F8F5EE] border-b border-[#1C2B52]/10 relative"
      aria-label="À propos d'Univers Anim"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Column 1: Editorial Text (7 cols) */}
          <div ref={textColRef} className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-6 bg-[#C9972E]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#C9972E] font-sans-brand">
                {t.label}
              </span>
            </div>

            <h2 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C2B52] leading-tight">
              {t.title}
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#4A5168] leading-relaxed font-sans-brand">
              <p>{t.paragraph1}</p>
              <p>{t.paragraph2}</p>
            </div>

            {/* Practical info pills/cards with concrete placeholders */}
            <div className="pt-4 space-y-3">
              <div className="p-4 bg-[#FFFFFF] border border-[#1C2B52]/10 rounded-[3px] shadow-sm">
                <span className="text-xs font-bold text-[#1C2B52] uppercase tracking-wide block mb-1">
                  {currentLang === 'ar' ? 'الوضعية القانونية' : 'Cadre associatif'}
                </span>
                <p className="text-xs sm:text-sm text-[#4A5168]">
                  {t.infoPill}
                </p>
              </div>

              <div className="p-4 bg-[#FFFFFF] border border-[#1C2B52]/10 rounded-[3px] shadow-sm">
                <span className="text-xs font-bold text-[#C9972E] uppercase tracking-wide block mb-1">
                  {currentLang === 'ar' ? 'فريق العمل والقيادة' : 'Bureau et coordination'}
                </span>
                <p className="text-xs sm:text-sm text-[#4A5168]">
                  {t.teamNotice}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Two Overlapping Photo Frames with Parallax (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center py-6">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Back photo frame (slightly shifted) */}
              <div ref={frameBackRef} className="w-4/5 sm:w-3/4 will-change-transform">
                <PhotoFrame
                  src="/images/association-1.jpg"
                  formatLabel="PHOTO À AJOUTER (format 4:3)"
                  fileNameNotice="[Déposer: /images/association-1.jpg]"
                  aspectRatio="aspect-[4/3]"
                  hasOffsetNavy={true}
                  rotation="-rotate-2"
                  enableTilt={true}
                  caption={
                    currentLang === 'ar'
                      ? 'أعضاء الجمعية والمتطوعون بأسفي'
                      : 'Membres et bénévoles lors d’une réunion'
                  }
                />
              </div>

              {/* Front overlapping photo frame */}
              <div
                ref={frameFrontRef}
                className="w-4/5 sm:w-3/4 absolute right-0 top-24 sm:top-28 z-10 shadow-lg will-change-transform"
              >
                <PhotoFrame
                  src="/images/association-2.jpg"
                  formatLabel="PHOTO À AJOUTER (format 4:3)"
                  fileNameNotice="[Déposer: /images/association-2.jpg]"
                  aspectRatio="aspect-[4/3]"
                  hasGoldBorder={true}
                  rotation="rotate-2"
                  enableTilt={true}
                  caption={
                    currentLang === 'ar'
                      ? 'جانب من ورشة عمل داخل المقr'
                      : 'Atelier de préparation en salle'
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Brand star divider */}
        <div className="pt-16">
          <SectionDivider />
        </div>
      </div>
    </section>
  );
};
