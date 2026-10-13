import React from 'react';
import { Instagram, Facebook, Youtube, ArrowUp } from 'lucide-react';
import { Language } from '../types';
import { SITE_DATA } from '../data/content';

interface FooterSectionProps {
  currentLang: Language;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ currentLang }) => {
  const t = SITE_DATA[currentLang].footer;
  const nav = SITE_DATA[currentLang].nav;
  const contact = SITE_DATA[currentLang].contact;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C2B52] text-[#F8F5EE] border-t border-[#C9972E]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Logo & Identity (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <img
              src="/logo-white.svg"
              alt="Logo Univers Anim Association Asfi"
              className="h-14 sm:h-16 w-auto object-contain"
            />
            <p className="text-xs sm:text-sm text-[#F8F5EE]/80 max-w-sm leading-relaxed">
              {currentLang === 'ar'
                ? 'جمعية ثقافية واجتماعية بأسفي تعمل على تنشيط الساحة المحلية عبر الفنون والمسرح والموسيقى والعمل التضامني.'
                : 'Association culturelle et solidaire à Asfi, engagée dans la pratique artistique et l’animation citoyenne.'}
            </p>
            <div className="text-xs text-[#E6BF63] font-serif-brand italic">
              « Ensemble pour un avenir meilleur »
            </div>
          </div>

          {/* Quick links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#E6BF63]">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F8F5EE]/80">
              <li>
                <a href="#accueil" className="hover:text-[#E6BF63] transition-colors">
                  {nav.home}
                </a>
              </li>
              <li>
                <a href="#a-propos" className="hover:text-[#E6BF63] transition-colors">
                  {nav.about}
                </a>
              </li>
              <li>
                <a href="#activites" className="hover:text-[#E6BF63] transition-colors">
                  {nav.activities}
                </a>
              </li>
              <li>
                <a href="#evenements" className="hover:text-[#E6BF63] transition-colors">
                  {nav.events}
                </a>
              </li>
              <li>
                <a href="#galerie" className="hover:text-[#E6BF63] transition-colors">
                  {nav.gallery}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E6BF63] transition-colors">
                  {nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact recap & Social (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#E6BF63]">
              {t.contact}
            </h4>
            <div className="space-y-1.5 text-xs text-[#F8F5EE]/80">
              <div>📍 Asfi (Safi), Maroc</div>
              <div className="font-mono text-xs">{contact.addressValue}</div>
              <div className="font-mono text-xs">{contact.emailValue}</div>
            </div>

            <div className="pt-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E6BF63] block mb-2">
                Instagram officiel
              </span>
              <a
                href="https://www.instagram.com/association.universanim"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-white hover:text-[#E6BF63] underline underline-offset-4"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@association.universanim</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F5EE]/70">
          <div className="text-center sm:text-left">
            <div>© 2026 Univers Anim. Tous droits réservés.</div>
            <div className="mt-1 text-[#E6BF63]">
              {currentLang === 'ar'
                ? 'تطوير الموقع: Oumaima Ait Said'
                : 'Développement du site : Oumaima Ait Said'}
            </div>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] border border-white/20 hover:border-[#C9972E] text-white transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>{currentLang === 'ar' ? 'الرجوع للأعلى' : 'Haut de page'}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
