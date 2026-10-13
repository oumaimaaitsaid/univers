import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      if (!dotRef.current || !ringRef.current) return;
      gsap.to(dotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
      gsap.to(ringRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.22,
        ease: 'power2.out',
      });
    };

    const onMouseEnterInteractive = () => setIsPointer(true);
    const onMouseLeaveInteractive = () => setIsPointer(false);

    window.addEventListener('mousemove', onMouseMove);

    const checkInteractives = () => {
      const interactives = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .interactive-hover'
      );
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    checkInteractives();
    const observer = new MutationObserver(checkInteractives);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Small gold dot cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#C9972E] pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2"
      />
      {/* Outer subtle follower ring that expands over links */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-[#C9972E]/40 pointer-events-none z-[998] -translate-x-1/2 -translate-y-1/2 transition-[width,height,opacity] duration-200 ${
          isPointer ? 'w-8 h-8 bg-[#C9972E]/10' : 'w-5 h-5 opacity-40'
        }`}
      />
    </>
  );
};
