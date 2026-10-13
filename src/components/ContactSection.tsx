import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Instagram, Facebook, Youtube, ExternalLink, Check } from 'lucide-react';
import { Language } from '../types';
import { SITE_DATA } from '../data/content';
import { StarIcon, SectionDivider } from './StarIcon';
import { MagneticButton } from './MagneticButton';

interface ContactSectionProps {
  currentLang: Language;
  onOpenJoinModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLang,
  onOpenJoinModal,
}) => {
  const t = SITE_DATA[currentLang].contact;
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 bg-[#F8F5EE] border-b border-[#1C2B52]/10"
      aria-label="Contact et adhésion"
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
            {t.subtitle}
          </p>
        </div>

        {/* Quick Membership Banner */}
        <div className="mb-12 p-6 sm:p-8 bg-[#FFFFFF] border-2 border-[#C9972E] rounded-[4px] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C9972E]">
              {currentLang === 'ar' ? 'انضم إلى فريق المتطوعين' : 'Campagne d’adhésion'}
            </span>
            <h3 className="font-serif-brand text-xl sm:text-2xl font-bold text-[#1C2B52]">
              {currentLang === 'ar'
                ? 'هل ترغب في أن تصبح عضواً فاعلاً في جمعية يونيفر أنيم؟'
                : 'Devenir membre actif d’Univers Anim'}
            </h3>
            <p className="text-xs sm:text-sm text-[#4A5168]">
              {currentLang === 'ar'
                ? 'نستقبل انخراطات الشباب والمهتمين بالمسرح والموسيقى والعمل التضامني بأسفي.'
                : 'Les portes sont ouvertes à toute personne souhaitant contribuer aux projets artistiques et solidaires.'}
            </p>
          </div>

          <MagneticButton
            variant="primary"
            onClick={onOpenJoinModal}
            className="px-6 py-3 shrink-0"
          >
            {t.membershipBtn}
          </MagneticButton>
        </div>

        {/* Two-Column Grid: Form + Real Contact Info & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-[#FFFFFF] p-8 sm:p-10 border border-[#1C2B52]/15 rounded-[4px] shadow-sm">
            {!isSubmitted ? (
              <>
                <h3 className="font-serif-brand text-2xl font-bold text-[#1C2B52] mb-6 pb-3 border-b border-[#1C2B52]/10">
                  {t.formTitle}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#1C2B52] uppercase tracking-wide mb-1.5">
                        {t.nameLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Fatima Zahra"
                        className="w-full px-4 py-2.5 rounded-[3px] bg-[#F8F5EE] border border-[#1C2B52]/20 text-sm text-[#1C2B52] placeholder-[#4A5168]/50 focus:outline-none focus:border-[#C9972E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1C2B52] uppercase tracking-wide mb-1.5">
                        {t.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+212 6 XX XX XX XX"
                        className="w-full px-4 py-2.5 rounded-[3px] bg-[#F8F5EE] border border-[#1C2B52]/20 text-sm text-[#1C2B52] placeholder-[#4A5168]/50 focus:outline-none focus:border-[#C9972E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C2B52] uppercase tracking-wide mb-1.5">
                      {t.emailLabel} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nom@exemple.com"
                      className="w-full px-4 py-2.5 rounded-[3px] bg-[#F8F5EE] border border-[#1C2B52]/20 text-sm text-[#1C2B52] placeholder-[#4A5168]/50 focus:outline-none focus:border-[#C9972E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C2B52] uppercase tracking-wide mb-1.5">
                      {t.messageLabel} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        currentLang === 'ar'
                          ? 'اكتب رسالتك أو استفسارك هنا...'
                          : 'Précisez votre demande, vos questions ou votre proposition de bénévolat...'
                      }
                      className="w-full px-4 py-2.5 rounded-[3px] bg-[#F8F5EE] border border-[#1C2B52]/20 text-sm text-[#1C2B52] placeholder-[#4A5168]/50 focus:outline-none focus:border-[#C9972E]"
                    />
                  </div>

                  <MagneticButton
                    type="submit"
                    variant="primary"
                    className="w-full py-3.5 gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.sendBtn}</span>
                  </MagneticButton>
                </form>
              </>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#C9972E] text-[#C9972E] flex items-center justify-center mx-auto bg-[#F8F5EE]">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif-brand text-2xl font-bold text-[#1C2B52]">
                  {currentLang === 'ar' ? 'تم استلام الرسالة' : 'Message bien reçu'}
                </h4>
                <p className="text-sm text-[#4A5168] max-w-md mx-auto">
                  {t.successMessage}
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 px-6 py-2 border border-[#1C2B52] text-xs font-bold uppercase rounded-[3px] text-[#1C2B52]"
                >
                  {currentLang === 'ar' ? 'إرسال رسالة جديدة' : 'Nouvelle saisie'}
                </button>
              </div>
            )}
          </div>

          {/* Info & Map Column (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#FFFFFF] p-8 border border-[#1C2B52]/15 rounded-[4px] space-y-6">
              <h3 className="font-serif-brand text-2xl font-bold text-[#1C2B52] pb-3 border-b border-[#1C2B52]/10">
                {currentLang === 'ar' ? 'معلومات الاتصال' : 'Coordonnées de l’association'}
              </h3>

              <div className="space-y-4 text-sm text-[#4A5168]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C9972E] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#1C2B52] block uppercase tracking-wide">
                      {t.addressLabel}
                    </span>
                    <span className="text-xs text-[#1C2B52] font-mono block mt-0.5">
                      {t.addressValue}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#C9972E] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#1C2B52] block uppercase tracking-wide">
                      {currentLang === 'ar' ? 'الهاتف' : 'Téléphone'}
                    </span>
                    <span className="text-xs text-[#1C2B52] font-mono block mt-0.5">
                      {t.phoneValue}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#C9972E] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#1C2B52] block uppercase tracking-wide">
                      {currentLang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </span>
                    <span className="text-xs text-[#1C2B52] font-mono block mt-0.5">
                      {t.emailValue}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#C9972E] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#1C2B52] block uppercase tracking-wide">
                      {t.hoursLabel}
                    </span>
                    <span className="text-xs text-[#4A5168] block mt-0.5">
                      {t.hoursValue}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-[#1C2B52]/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1C2B52] block mb-3">
                  {currentLang === 'ar' ? 'شبكات التواصل' : 'Réseaux officiels'}
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/association.universanim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-[3px] border border-[#1C2B52]/20 hover:border-[#C9972E] text-[#1C2B52] hover:text-[#C9972E] transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-[3px] border border-[#1C2B52]/20 hover:border-[#C9972E] text-[#1C2B52] hover:text-[#C9972E] transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-[3px] border border-[#1C2B52]/20 hover:border-[#C9972E] text-[#1C2B52] hover:text-[#C9972E] transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps Embed Placeholder */}
            <div className="bg-[#FFFFFF] border border-[#1C2B52]/15 rounded-[4px] p-6 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F8F5EE] border border-[#1C2B52]/20 flex items-center justify-center mx-auto text-[#C9972E]">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-serif-brand text-base font-bold text-[#1C2B52]">
                {t.mapPlaceholderNotice}
              </h4>
              <p className="text-xs text-[#4A5168] font-mono">
                [Zone géographique : Ville d’Asfi / Safi · Maroc]
              </p>
              <div className="pt-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Safi+Morocco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1C2B52] hover:text-[#C9972E] underline underline-offset-4"
                >
                  <span>{t.openMapLink}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
