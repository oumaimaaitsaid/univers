import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StarIconProps {
  className?: string;
  size?: number;
  color?: string; // navy or gold
}

export const StarIcon: React.FC<StarIconProps> = ({
  className = '',
  size = 28,
  color = 'navy',
}) => {
  const isGold = color === 'gold';
  const fillColor = isGold ? '#C9972E' : '#1C2B52';
  const strokeColor = isGold ? '#1C2B52' : '#C9972E';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
      aria-hidden="true"
    >
      <polygon
        points="24,2 29,17 44,17 32,26 36,41 24,32 12,41 16,26 4,17 19,17"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <path
        d="M20,20 L28,28 M28,20 L20,28"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="square"
      />
    </svg>
  );
};

export const SectionDivider: React.FC<{ className?: string; isDark?: boolean }> = ({
  className = '',
  isDark = false,
}) => {
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        starRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }
      ).fromTo(
        [lineLeftRef.current, lineRightRef.current],
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-center gap-4 my-8 ${className}`}
      aria-hidden="true"
    >
      <div
        ref={lineLeftRef}
        className={`h-[1px] w-16 sm:w-28 origin-right ${
          isDark ? 'bg-[#C9972E]/50' : 'bg-[#C9972E]/60'
        }`}
      />
      <div ref={starRef}>
        <StarIcon size={20} color={isDark ? 'gold' : 'navy'} />
      </div>
      <div
        ref={lineRightRef}
        className={`h-[1px] w-16 sm:w-28 origin-left ${
          isDark ? 'bg-[#C9972E]/50' : 'bg-[#C9972E]/60'
        }`}
      />
    </div>
  );
};
