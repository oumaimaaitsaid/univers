import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';
import { Language } from '../types';
import { SITE_DATA, GALLERY_SPECS } from '../data/content';
import { PhotoFrame } from './PhotoFrame';
import { SectionDivider } from './StarIcon';

gsap.registerPlugin(ScrollTrigger);

interface GallerySectionProps {
  currentLang: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ currentLang }) => {
  const t = SITE_DATA[currentLang].gallery;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !gridRef.current) return;

    const items = gridRef.current.children;
    const ctx = gsap.context(() => {
      // Staggered reveal of gallery items on scroll
      gsap.fromTo(
        items,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [currentLang]);

  const handleOpenLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    setIsZoomed(false);
  };

  const handleClose = () => {
    setSelectedPhotoIndex(null);
    setIsZoomed(false);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsZoomed(false);
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(
        selectedPhotoIndex === 0 ? GALLERY_SPECS.length - 1 : selectedPhotoIndex - 1
      );
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsZoomed(false);
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(
        selectedPhotoIndex === GALLERY_SPECS.length - 1 ? 0 : selectedPhotoIndex + 1
      );
    }
  };

  // Keyboard navigation & zoom
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext(); // swipe left -> next
      } else {
        handlePrev(); // swipe right -> prev
      }
    }
    setTouchStartX(null);
  };

  return (
    <section
      ref={sectionRef}
      id="galerie"
      className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#1C2B52]/10"
      aria-label="Galerie photos de l’association"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[1px] w-6 bg-[#C9972E]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#C9972E] font-sans-brand">
              {t.label}
            </span>
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C2B52]">
            {t.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4A5168] font-sans-brand">
            {t.subtitle} · <span className="italic text-xs text-[#C9972E]">{t.instruction}</span>
          </p>
        </div>

        {/* Masonry-Style Responsive Grid of Framed Photos with Staggered Reveal */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {GALLERY_SPECS.map((item, index) => {
            const caption = currentLang === 'ar' ? item.captionAr : item.captionFr;

            return (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(index)}
                className="cursor-pointer group flex flex-col justify-between"
              >
                <div className="transform group-hover:-translate-y-1 transition-transform duration-300">
                  <PhotoFrame
                    src={item.fileName}
                    formatLabel={item.formatLabel}
                    fileNameNotice={`[Déposer: ${item.fileName}]`}
                    aspectRatio={item.aspectRatio}
                    hasOffsetNavy={item.hasOffsetNavy}
                    enableTilt={true}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-[#4A5168] px-1">
                  <span className="font-serif-brand italic font-medium text-[#1C2B52]">
                    {caption}
                  </span>
                  <Maximize2 className="w-3.5 h-3.5 text-[#C9972E] opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Section divider */}
        <div className="pt-16">
          <SectionDivider />
        </div>
      </div>

      {/* Lightbox Modal with Zoom and Mobile Swipe */}
      {selectedPhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101B3A]/95 backdrop-blur-sm"
          onClick={handleClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
        >
          {/* Header controls: Counter, Zoom toggle & Close button */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-20">
            <span className="text-xs font-mono bg-black/50 px-3 py-1 rounded-[2px] border border-white/20">
              {selectedPhotoIndex + 1} / {GALLERY_SPECS.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(!isZoomed);
                }}
                className="p-2 rounded-[2px] bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label={isZoomed ? 'Dézoomer' : 'Zoomer'}
              >
                {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-[2px] bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Fermer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Left Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-[3px] bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all z-20"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Lightbox Center Content with Zoom Support */}
          <div
            className={`max-w-4xl max-h-[85vh] flex flex-col items-center justify-center p-4 transition-transform duration-300 ${
              isZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(!isZoomed);
            }}
          >
            <div className="w-full max-w-2xl">
              <PhotoFrame
                src={GALLERY_SPECS[selectedPhotoIndex].fileName}
                formatLabel={GALLERY_SPECS[selectedPhotoIndex].formatLabel}
                fileNameNotice={`[Fichier: ${GALLERY_SPECS[selectedPhotoIndex].fileName}]`}
                aspectRatio={GALLERY_SPECS[selectedPhotoIndex].aspectRatio}
                hasGoldBorder={true}
                enableTilt={false}
              />
            </div>
            <div className="mt-4 text-center text-white">
              <p className="font-serif-brand text-lg font-bold">
                {currentLang === 'ar'
                  ? GALLERY_SPECS[selectedPhotoIndex].captionAr
                  : GALLERY_SPECS[selectedPhotoIndex].captionFr}
              </p>
              <p className="text-xs text-[#E6BF63] mt-1 font-mono">
                Association Univers Anim · Asfi
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-[3px] bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all z-20"
            aria-label="Suivant"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};
