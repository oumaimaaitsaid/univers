import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wreathPathLeftRef = useRef<SVGPathElement>(null);
  const wreathPathRightRef = useRef<SVGPathElement>(null);
  const starRef = useRef<SVGGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // 1. Draw laurel wreath paths
      if (wreathPathLeftRef.current && wreathPathRightRef.current) {
        const lenLeft = wreathPathLeftRef.current.getTotalLength();
        const lenRight = wreathPathRightRef.current.getTotalLength();

        gsap.set([wreathPathLeftRef.current, wreathPathRightRef.current], {
          strokeDasharray: lenLeft,
          strokeDashoffset: lenLeft,
        });

        tl.to([wreathPathLeftRef.current, wreathPathRightRef.current], {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: 'power2.out',
        });
      }

      // 2. Star with X appears
      if (starRef.current) {
        tl.fromTo(
          starRef.current,
          { opacity: 0, scale: 0.7, transformOrigin: 'center center' },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
          '-=0.3'
        );
      }

      // 3. Name reveals
      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          '-=0.2'
        );
      }

      // 4. Screen lifts like a theater curtain
      tl.to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 0.75,
          ease: 'power3.inOut',
          delay: 0.25,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const handleSkip = () => {
    if (skipped) return;
    setSkipped(true);
    gsap.killTweensOf(containerRef.current);
    gsap.to(containerRef.current, {
      yPercent: -100,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete,
    });
  };

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[100] bg-[#101B3A] text-[#F8F5EE] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
      aria-label="Chargement Univers Anim (Cliquer pour passer)"
      role="progressbar"
    >
      <div className="flex flex-col items-center text-center p-6">
        {/* Animated Laurel Wreath & Star Emblem */}
        <svg
          width="160"
          height="160"
          viewBox="0 0 280 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-4"
        >
          <defs>
            <linearGradient id="preloaderGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#E8C773" />
              <stop offset="50%" stop-color="#C9972E" />
              <stop offset="100%" stop-color="#AA7818" />
            </linearGradient>
          </defs>

          {/* Left Wreath Branch */}
          <path
            ref={wreathPathLeftRef}
            d="M125 235 C75 225 35 185 35 130 C35 75 65 35 115 10"
            fill="none"
            stroke="url(#preloaderGold)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Right Wreath Branch */}
          <path
            ref={wreathPathRightRef}
            d="M155 235 C205 225 245 185 245 130 C245 75 215 35 165 10"
            fill="none"
            stroke="url(#preloaderGold)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Star & X Emblem */}
          <g ref={starRef} transform="translate(140, 132)">
            <polygon
              points="0,-82 20,-24 82,-24 32,12 50,72 0,36 -50,72 -32,12 -82,-24 -20,-24"
              fill="url(#preloaderGold)"
            />
            <polygon
              points="0,-74 18,-22 74,-22 28,11 45,65 0,32 -45,65 -28,11 -74,-22 -18,-22"
              fill="#101B3A"
              stroke="url(#preloaderGold)"
              strokeWidth="2"
            />
            {/* Center X */}
            <g transform="translate(0, -5)">
              <path
                d="M-13 -20 L-6 -20 C-3 -10 -3 -5 -10 0 C-3 5 -3 10 -6 20 L-13 20 C-10 10 -10 5 -15 0 C-10 -5 -10 -10 -13 -20 Z"
                fill="url(#preloaderGold)"
              />
              <path
                d="M13 -20 L6 -20 C3 -10 3 -5 10 0 C3 5 3 10 6 20 L13 20 C10 10 10 5 15 0 C10 -5 10 -10 13 -20 Z"
                fill="url(#preloaderGold)"
              />
            </g>
          </g>
        </svg>

        {/* Wordmark */}
        <div ref={textRef} className="space-y-1">
          <div className="font-serif-brand text-2xl font-black tracking-widest text-[#E6BF63]">
            UNIVERS ANIM
          </div>
          <div className="text-[11px] font-sans-brand tracking-[0.3em] uppercase text-[#F8F5EE]/70">
            ASSOCIATION · ASFI
          </div>
        </div>

        <div className="mt-8 text-[11px] text-[#F8F5EE]/40 uppercase tracking-widest font-mono">
          Cliquer pour passer
        </div>
      </div>
    </div>
  );
};
