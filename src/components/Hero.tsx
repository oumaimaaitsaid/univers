import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../types';
import { SITE_DATA } from '../data/content';
import { PhotoFrame } from './PhotoFrame';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const t = SITE_DATA[currentLang].hero;
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const photoColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Slow parallax on laurel watermark
      if (!prefersReducedMotion && watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          y: 80,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // 2. Parallax on hero photo frame
      if (!prefersReducedMotion && photoColRef.current) {
        gsap.to(photoColRef.current, {
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // 3. Line-by-line title and content entrance
      if (!prefersReducedMotion) {
        const tl = gsap.timeline({ delay: 0.2 });
        tl.fromTo(
          kickerRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        )
          .fromTo(
            titleLine1Ref.current,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
            '-=0.3'
          )
          .fromTo(
            taglineRef.current,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            '-=0.4'
          )
          .fromTo(
            introRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.4'
          )
          .fromTo(
            buttonsRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            '-=0.3'
          )
          .fromTo(
            photoColRef.current,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
            '-=0.6'
          );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [currentLang]);

  return (
    <section
      ref={sectionRef}
      id="accueil"
      className="relative bg-[#F8F5EE] text-[#1C2B52] overflow-hidden py-16 sm:py-24 lg:py-28 border-b border-[#1C2B52]/10"
    >
      {/* Laurel Wreath Faint Watermark with Slow Parallax */}
      <div
        ref={watermarkRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 sm:w-[540px] sm:h-[540px] pointer-events-none opacity-[0.05] bg-no-repeat bg-contain bg-center z-0 will-change-transform"
        style={{ backgroundImage: `url('/favicon.svg')` }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Column 1: Narrative & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Small uppercase gold label */}
            <div ref={kickerRef} className="flex items-center gap-2">
              <span className="h-[1px] w-6 bg-[#C9972E]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#C9972E] font-sans-brand">
                {t.kicker}
              </span>
            </div>

            {/* Line-by-line big title */}
            <h1
              ref={titleLine1Ref}
              className="font-serif-brand text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1C2B52] leading-[1.05]"
            >
              {t.title}
            </h1>

            {/* Tagline */}
            <p
              ref={taglineRef}
              className="font-serif-brand italic text-xl sm:text-2xl text-[#C9972E] font-medium leading-relaxed"
            >
              « {t.tagline} »
            </p>

            {/* Short Two-Line Intro */}
            <p
              ref={introRef}
              className="text-base sm:text-lg text-[#4A5168] leading-relaxed max-w-xl font-sans-brand"
            >
              {t.intro}
            </p>

            {/* Rectangular Magnetic Buttons */}
            <div
              ref={buttonsRef}
              className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <MagneticButton
                as="a"
                href="#activites"
                variant="primary"
                className="px-6 py-3.5 text-center"
              >
                {t.btnActivities}
              </MagneticButton>

              <MagneticButton
                as="a"
                href="https://www.instagram.com/association.universanim"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="px-6 py-3.5 text-center"
              >
                {t.btnInstagram}
              </MagneticButton>
            </div>

            {/* Quiet notice */}
            <div className="pt-6 border-t border-[#1C2B52]/10 flex items-center gap-3 text-xs text-[#4A5168]">
              <span className="w-1.5 h-1.5 bg-[#C9972E] rounded-full shrink-0" />
              <span>
                {currentLang === 'ar'
                  ? 'جمعية مدنية مسجلة بمدينة أسفي · أنشطة مفتوحة للجميع'
                  : 'Association déclarée à Asfi · Activités ouvertes aux habitants'}
              </span>
            </div>
          </div>

          {/* Column 2: Large Framed Photo Placeholder with subtle tilt & parallax */}
          <div ref={photoColRef} className="lg:col-span-5 flex justify-center will-change-transform">
            <div className="w-full max-w-md">
              <PhotoFrame
                src="/images/hero.jpg"
                formatLabel="PHOTO À AJOUTER (format 4:3)"
                fileNameNotice="[Déposer: /images/hero.jpg]"
                aspectRatio="aspect-[4/3]"
                hasOffsetNavy={true}
                hasGoldBorder={true}
                rotation="-rotate-1 hover:rotate-0"
                enableTilt={true}
                caption={
                  currentLang === 'ar'
                    ? 'صورة تذكارية من أنشطة الجمعية بأسفي'
                    : 'Photo d’ensemble de l’association ou d’un spectacle à Asfi'
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
