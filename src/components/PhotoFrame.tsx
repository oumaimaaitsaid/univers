import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { StarIcon } from './StarIcon';

interface PhotoFrameProps {
  src?: string;
  formatLabel?: string;
  fileNameNotice?: string;
  alt?: string;
  aspectRatio?: string;
  hasOffsetNavy?: boolean;
  hasGoldBorder?: boolean;
  rotation?: string;
  className?: string;
  caption?: string;
  enableTilt?: boolean;
}

export const PhotoFrame: React.FC<PhotoFrameProps> = ({
  src,
  formatLabel = 'PHOTO À AJOUTER (format 4:3)',
  fileNameNotice,
  alt = 'Cadre photo Univers Anim',
  aspectRatio = 'aspect-[4/3]',
  hasOffsetNavy = false,
  hasGoldBorder = false,
  rotation = '',
  className = '',
  caption,
  enableTilt = true,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 900,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!enableTilt || !cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${rotation} ${className} transition-transform will-change-transform`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Offset navy print block */}
      {hasOffsetNavy && (
        <div
          className="absolute inset-0 translate-x-2.5 translate-y-2.5 bg-[#1C2B52] rounded-[3px] -z-10"
          aria-hidden="true"
        />
      )}

      {/* Main framed photo card */}
      <div
        className={`relative ${aspectRatio} w-full overflow-hidden rounded-[3px] bg-[#EDE8DC] ${
          hasGoldBorder
            ? 'border-2 border-[#C9972E]'
            : 'border border-[#1C2B52]/15'
        } shadow-sm flex flex-col items-center justify-center p-4 text-center`}
      >
        {/* Hidden image probe if src provided */}
        {src && !imageError && (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100 z-10' : 'opacity-0'
            }`}
          />
        )}

        {/* Empty Frame State (Clean Graphic Designer Aesthetic) */}
        {(!src || imageError || !imageLoaded) && (
          <div className="flex flex-col items-center justify-center p-3 select-none">
            <div className="w-12 h-12 rounded-full border border-[#1C2B52]/20 flex items-center justify-center mb-3 bg-[#F8F5EE]">
              <StarIcon size={24} color="navy" />
            </div>

            <span className="font-sans-brand text-xs font-bold tracking-widest text-[#1C2B52] uppercase px-2 py-1 bg-[#F8F5EE] border border-[#1C2B52]/10 rounded-[2px] mb-1.5">
              {formatLabel}
            </span>

            {fileNameNotice && (
              <span className="font-mono text-[11px] text-[#4A5168] tracking-tight">
                {fileNameNotice}
              </span>
            )}
          </div>
        )}
      </div>

      {caption && (
        <p className="mt-2 text-xs font-serif-brand italic text-[#4A5168] text-center">
          {caption}
        </p>
      )}
    </div>
  );
};
