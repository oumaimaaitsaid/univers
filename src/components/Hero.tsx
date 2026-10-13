import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../types';
import { SITE_DATA } from '../data/content';
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
  const photoCardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mp4SourceRef = useRef<HTMLSourceElement>(null);
  const webmSourceRef = useRef<HTMLSourceElement>(null);
  const fadeFrameRef = useRef<number | null>(null);
  const sourceLoadedRef = useRef(false);
  const shouldPlayRef = useRef(false);
  const userPausedRef = useRef(false);
  const isIntersectingRef = useRef(false);
  const isPageVisibleRef = useRef(true);
  const soundEnabledRef = useRef(false);
  const loadVideoRef = useRef<() => void>(() => undefined);
  const startPlaybackRef = useRef<() => void>(() => undefined);
  const fadeVolumeRef = useRef<(target: number, muteWhenDone?: boolean, onDone?: () => void) => void>(
    () => undefined
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoRestricted, setIsVideoRestricted] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

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

  useEffect(() => {
    const video = videoRef.current;
    const mp4Source = mp4SourceRef.current;
    const webmSource = webmSourceRef.current;
    const section = sectionRef.current;
    if (!video || !mp4Source || !webmSource || !section) return;
    video.volume = 0;
    video.muted = true;

    const fadeVolume = (
      target: number,
      muteWhenDone = false,
      onDone?: () => void
    ) => {
      if (fadeFrameRef.current !== null) {
        window.cancelAnimationFrame(fadeFrameRef.current);
      }

      video.muted = false;
      const startVolume = video.volume;
      const startedAt = performance.now();
      const duration = target > startVolume ? 450 : 250;

      const step = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        video.volume = startVolume + (target - startVolume) * progress;

        if (progress < 1) {
          fadeFrameRef.current = window.requestAnimationFrame(step);
          return;
        }

        fadeFrameRef.current = null;
        if (muteWhenDone) video.muted = true;
        onDone?.();
      };

      fadeFrameRef.current = window.requestAnimationFrame(step);
    };

    const startPlayback = () => {
      if (!sourceLoadedRef.current || !isIntersectingRef.current || !isPageVisibleRef.current) return;
      if (video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) return;

      video.muted = !soundEnabledRef.current;
      void video.play().then(() => {
        if (soundEnabledRef.current && video.volume < 1) fadeVolume(1);
      }).catch(() => {
        setIsPlaying(false);
      });
    };

    const loadVideo = () => {
      if (sourceLoadedRef.current) return;

      sourceLoadedRef.current = true;
      video.preload = 'metadata';
      mp4Source.src = '/videos/hero.mp4';
      webmSource.src = '/videos/hero.webm';
      setIsVideoLoaded(true);
      video.load();
    };

    const pauseWhenHidden = () => {
      fadeVolume(0, true, () => video.pause());
    };

    const isRestricted = () => {
      const connection = (navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }).connection;
      const slowConnection = connection?.saveData === true ||
        connection?.effectiveType === 'slow-2g' ||
        connection?.effectiveType === '2g' ||
        connection?.effectiveType === '3g';

      return window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        Boolean(slowConnection);
    };

    const updatePlaybackPolicy = () => {
      const restricted = isRestricted();
      setIsVideoRestricted(restricted);

      if (restricted) {
        shouldPlayRef.current = false;
        if (!video.paused) pauseWhenHidden();
        return;
      }

      if (!userPausedRef.current) shouldPlayRef.current = true;
      if (sourceLoadedRef.current && shouldPlayRef.current) startPlayback();
    };

    fadeVolumeRef.current = fadeVolume;
    loadVideoRef.current = loadVideo;
    startPlaybackRef.current = startPlayback;

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleCallbackId: number | null = null;
    let idleTimeoutId: number | null = null;
    const scheduleVideoLoad = () => {
      if (isRestricted()) return;
      if (idleWindow.requestIdleCallback) {
        idleCallbackId = idleWindow.requestIdleCallback(loadVideo, { timeout: 2500 });
      } else {
        idleTimeoutId = window.setTimeout(loadVideo, 1200);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          if (!video.paused) pauseWhenHidden();
          return;
        }

        if (shouldPlayRef.current && isPageVisibleRef.current) {
          if (!sourceLoadedRef.current && !isRestricted()) loadVideo();
          else startPlayback();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(section);

    const handleVisibilityChange = () => {
      isPageVisibleRef.current = !document.hidden;
      if (!isPageVisibleRef.current) {
        if (!video.paused) pauseWhenHidden();
      } else if (isIntersectingRef.current && shouldPlayRef.current) {
        startPlayback();
      }
    };

    const handleCanPlay = () => {
      if (shouldPlayRef.current && isIntersectingRef.current && isPageVisibleRef.current) {
        startPlayback();
      }
    };

    const handleVideoError = () => {
      setIsVideoError(true);
      setIsPlaying(false);
    };

    const connection = (navigator as Navigator & { connection?: EventTarget }).connection;
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    document.addEventListener('visibilitychange', handleVisibilityChange);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleVideoError);
    window.addEventListener('resize', updatePlaybackPolicy);
    reducedMotionQuery.addEventListener('change', updatePlaybackPolicy);
    connection?.addEventListener('change', updatePlaybackPolicy);

    updatePlaybackPolicy();
    scheduleVideoLoad();

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleVideoError);
      window.removeEventListener('resize', updatePlaybackPolicy);
      reducedMotionQuery.removeEventListener('change', updatePlaybackPolicy);
      connection?.removeEventListener('change', updatePlaybackPolicy);
      if (idleCallbackId !== null) idleWindow.cancelIdleCallback?.(idleCallbackId);
      if (idleTimeoutId !== null) window.clearTimeout(idleTimeoutId);
      if (fadeFrameRef.current !== null) window.cancelAnimationFrame(fadeFrameRef.current);
      fadeVolumeRef.current = () => undefined;
      loadVideoRef.current = () => undefined;
      startPlaybackRef.current = () => undefined;
      video.pause();
    };
  }, []);

  const handleTogglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlayRef.current) {
      shouldPlayRef.current = false;
      userPausedRef.current = true;
      fadeVolumeRef.current(0, true, () => video.pause());
      return;
    }

    shouldPlayRef.current = true;
    userPausedRef.current = false;
    if (!sourceLoadedRef.current) loadVideoRef.current();
    startPlaybackRef.current();
  };

  const handleToggleSound = () => {
    const enableSound = !soundEnabledRef.current;
    soundEnabledRef.current = enableSound;
    setIsSoundEnabled(enableSound);

    const video = videoRef.current;
    if (!video) return;

    if (enableSound) {
      video.muted = false;
      if (!video.paused) fadeVolumeRef.current(1);
    } else {
      fadeVolumeRef.current(0, true);
    }
  };

  const handlePhotoMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!photoCardRef.current) return;
    const bounds = photoCardRef.current.getBoundingClientRect();
    const rotateX = ((event.clientY - bounds.top - bounds.height / 2) / (bounds.height / 2)) * -5;
    const rotateY = ((event.clientX - bounds.left - bounds.width / 2) / (bounds.width / 2)) * 5;

    gsap.to(photoCardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 900,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handlePhotoMouseLeave = () => {
    if (!photoCardRef.current) return;
    gsap.to(photoCardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const isArabic = currentLang === 'ar';
  const playLabel = isArabic ? 'تشغيل الفيديو' : 'Lire la vidéo';
  const soundLabel = isSoundEnabled
    ? isArabic ? 'كتم الصوت' : 'Couper le son'
    : isArabic ? 'تشغيل الصوت' : 'Activer le son';

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
              <div
                ref={photoCardRef}
                onMouseMove={handlePhotoMouseMove}
                onMouseLeave={handlePhotoMouseLeave}
                className="relative -rotate-1 transition-transform will-change-transform hover:rotate-0"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[3px] bg-[#1C2B52] -z-10"
                  aria-hidden="true"
                />
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3px] border-2 border-[#C9972E] bg-[#EDE8DC] shadow-sm">
                  <img
                    src="/images/hero.jpg"
                    alt=""
                    loading="eager"
                    fetchPriority="high"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                      isPlaying && !isVideoError ? 'opacity-0' : 'opacity-100'
                    }`}
                    aria-hidden="true"
                  />
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    playsInline
                    muted
                    preload="none"
                    poster="/images/hero.jpg"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                      isPlaying && !isVideoError ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden="true"
                    tabIndex={-1}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source ref={mp4SourceRef} type="video/mp4" />
                    <source ref={webmSourceRef} type="video/webm" />
                  </video>
                  <div
                    dir={isArabic ? 'rtl' : 'ltr'}
                    className="absolute bottom-2 z-20 flex items-center gap-2"
                    style={{ insetInlineEnd: '0.5rem' }}
                  >
                    {!isVideoError && isVideoRestricted && !isPlaying && (
                        <button
                          type="button"
                          onClick={handleTogglePlayback}
                          className="inline-flex min-h-10 items-center gap-2 rounded border border-[#C9972E] bg-[#101B3A]/80 px-3 py-2 text-xs font-semibold text-white shadow-sm backdrop-blur-sm transition-colors hover:bg-[#1C2B52] focus:outline-none focus:ring-2 focus:ring-[#E6BF63]"
                          aria-label={playLabel}
                        >
                          <Play className="h-4 w-4 shrink-0" aria-hidden="true" />
                          <span>{playLabel}</span>
                        </button>
                      )}
                    {isVideoLoaded && !isVideoError && (!isVideoRestricted || isPlaying) && (
                      <>
                        <button
                          type="button"
                          onClick={handleToggleSound}
                          className="inline-flex min-h-10 items-center gap-2 rounded border border-[#C9972E] bg-[#101B3A]/80 px-3 py-2 text-xs font-semibold text-white shadow-sm backdrop-blur-sm transition-colors hover:bg-[#1C2B52] focus:outline-none focus:ring-2 focus:ring-[#E6BF63]"
                          aria-label={soundLabel}
                          aria-pressed={isSoundEnabled}
                        >
                          {isSoundEnabled
                            ? <Volume2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                            : <VolumeX className="h-4 w-4 shrink-0" aria-hidden="true" />}
                          <span>{soundLabel}</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleTogglePlayback}
                          className="inline-flex h-10 w-10 items-center justify-center rounded border border-[#C9972E]/80 bg-[#101B3A]/80 text-white shadow-sm backdrop-blur-sm transition-colors hover:bg-[#1C2B52] focus:outline-none focus:ring-2 focus:ring-[#E6BF63]"
                          aria-label={isPlaying
                            ? isArabic ? 'إيقاف الفيديو مؤقتًا' : 'Mettre la vidéo en pause'
                            : playLabel}
                        >
                          {isPlaying
                            ? <Pause className="h-4 w-4" aria-hidden="true" />
                            : <Play className="h-4 w-4" aria-hidden="true" />}
                        </button>
                      </>
                    )}
                    {isVideoError && (
                      <span role="status" className="rounded bg-[#101B3A]/85 px-3 py-2 text-xs text-white">
                        {isArabic ? 'الفيديو غير متاح' : 'Vidéo indisponible'}
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-center font-serif-brand text-xs italic text-[#4A5168]">
                  {isArabic
                    ? 'صورة تذكارية من أنشطة الجمعية بأسفي'
                    : 'Photo d’ensemble de l’association ou d’un spectacle à Asfi'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
