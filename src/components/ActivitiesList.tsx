import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../types';
import { SITE_DATA } from '../data/content';
import { PhotoFrame } from './PhotoFrame';
import { SectionDivider } from './StarIcon';

gsap.registerPlugin(ScrollTrigger);

interface ActivitiesListProps {
  currentLang: Language;
}

export const ActivitiesList: React.FC<ActivitiesListProps> = ({ currentLang }) => {
  const t = SITE_DATA[currentLang].activities;
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isRtl = currentLang === 'ar';
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row, idx) => {
        if (!row) return;
        const numberEl = row.querySelector('.activity-number');
        const contentEl = row.querySelector('.activity-content');
        const frameEl = row.querySelector('.activity-frame');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        // Numbers slide in on scroll
        tl.fromTo(
          numberEl,
          { x: isRtl ? 40 : -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
        )
          .fromTo(
            contentEl,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
            '-=0.3'
          )
          .fromTo(
            frameEl,
            { opacity: 0, scale: 0.96 },
            { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
            '-=0.3'
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [currentLang, isRtl]);

  return (
    <section
      ref={sectionRef}
      id="activites"
      className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#1C2B52]/10"
      aria-label="Activités de l’association"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[1px] w-6 bg-[#C9972E]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#C9972E] font-sans-brand">
              {t.label}
            </span>
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C2B52] leading-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#4A5168] font-sans-brand">
            {t.subtitle}
          </p>
        </div>

        {/* Varied Asymmetric List with Big Numbers (01, 02, 03, 04) */}
        <div className="space-y-16 lg:space-y-24">
          {t.items.map((item, index) => {
            const isEven = index % 2 === 1;
            const isHovered = hoveredIdx === index;

            return (
              <div
                key={item.number}
                ref={(el) => {
                  rowsRef.current[index] = el;
                }}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center pb-14 border-b border-[#1C2B52]/10 last:border-b-0 group cursor-pointer transition-colors duration-300 ${
                  isHovered ? 'bg-[#FAF7F0]/40 -mx-4 px-4 rounded-[4px]' : ''
                }`}
              >
                {/* Text Block */}
                <div
                  className={`activity-content lg:col-span-6 space-y-4 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  {/* Huge Editorial Number (slides in on scroll) */}
                  <div className="activity-number font-serif-brand text-5xl sm:text-6xl font-bold text-[#C9972E]/40 group-hover:text-[#C9972E] transition-colors duration-300 leading-none select-none">
                    {item.number}
                  </div>

                  {/* Title with small floating photo thumbnail that appears on hover next to title */}
                  <div className="relative inline-block">
                    <h3 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#1C2B52] group-hover:text-[#0F1B3D]">
                      {item.title}
                    </h3>

                    {/* Quick photo hover indicator pill on desktop */}
                    <div
                      className={`hidden sm:inline-flex items-center gap-1.5 ml-3 px-2 py-0.5 rounded-[2px] bg-[#1C2B52] text-[#F8F5EE] text-[10px] font-mono tracking-wider transition-all duration-300 ${
                        isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9972E]" />
                      <span>{item.details.split('·')[0]}</span>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg text-[#4A5168] leading-relaxed font-sans-brand">
                    {item.description}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs font-medium text-[#1C2B52]">
                    <span className="w-1.5 h-1.5 bg-[#C9972E] rounded-full shrink-0" />
                    <span>{item.details}</span>
                  </div>
                </div>

                {/* Varied Photo Frame */}
                <div
                  className={`activity-frame lg:col-span-6 flex justify-center ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div
                    className={`w-full max-w-md transition-transform duration-300 ${
                      isHovered ? 'scale-[1.02]' : 'scale-100'
                    }`}
                  >
                    <PhotoFrame
                      src={item.imageFileName}
                      formatLabel={`PHOTO À AJOUTER (${item.aspectRatio.replace('aspect-[', '').replace(']', '')})`}
                      fileNameNotice={`[Déposer: ${item.imageFileName}]`}
                      aspectRatio={item.aspectRatio}
                      hasOffsetNavy={item.hasOffsetNavy}
                      hasGoldBorder={item.hasGoldBorder || isHovered}
                      caption={item.title}
                      enableTilt={true}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-8">
          <SectionDivider />
        </div>
      </div>
    </section>
  );
};
