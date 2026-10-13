import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { SITE_DATA } from '../data/content';
import { PhotoFrame } from './PhotoFrame';
import { StarIcon } from './StarIcon';

interface InstagramSectionProps {
  currentLang: Language;
}

export const InstagramSection: React.FC<InstagramSectionProps> = ({ currentLang }) => {
  const t = SITE_DATA[currentLang].instagram;

  const placeholders = [
    { id: 'ig-1', fileName: '/images/insta-1.jpg' },
    { id: 'ig-2', fileName: '/images/insta-2.jpg' },
    { id: 'ig-3', fileName: '/images/insta-3.jpg' },
    { id: 'ig-4', fileName: '/images/insta-4.jpg' },
    { id: 'ig-5', fileName: '/images/insta-5.jpg' },
    { id: 'ig-6', fileName: '/images/insta-6.jpg' },
  ];

  return (
    <section
      id="instagram"
      className="py-20 sm:py-24 bg-[#1C2B52] text-[#F8F5EE] border-b border-[#C9972E]/40"
      aria-label="Section Instagram"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[1px] w-6 bg-[#C9972E]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#E6BF63] font-sans-brand">
                INSTAGRAM · @association.universanim
              </span>
            </div>
            <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#F8F5EE]">
              {t.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#F8F5EE]/80 max-w-xl font-sans-brand">
              {t.subtitle}
            </p>
          </div>

          <a
            href="https://www.instagram.com/association.universanim"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-[4px] text-xs uppercase font-bold tracking-wider bg-[#C9972E] hover:bg-[#E6BF63] text-[#1C2B52] transition-colors shadow-sm shrink-0"
          >
            <Instagram className="w-4 h-4" />
            <span>{t.btnText}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

        {/* Row of 6 Square Photo Placeholders */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {placeholders.map((item) => (
            <a
              key={item.id}
              href="https://www.instagram.com/association.universanim"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="transform group-hover:scale-[1.02] transition-transform duration-200">
                <PhotoFrame
                  src={item.fileName}
                  formatLabel="PHOTO 1:1"
                  fileNameNotice={`[Déposer: ${item.fileName}]`}
                  aspectRatio="aspect-square"
                />
              </div>
            </a>
          ))}
        </div>

        {/* Small note */}
        <div className="mt-6 text-center text-xs text-[#F8F5EE]/60 font-mono">
          <span>Lien officiel : https://www.instagram.com/association.universanim</span>
        </div>
      </div>
    </section>
  );
};
