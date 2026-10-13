import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Language } from '../types';
import { StarIcon } from './StarIcon';

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const MemberModal: React.FC<MemberModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [domain, setDomain] = useState('theatre');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101B3A]/85 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#F8F5EE] border-2 border-[#C9972E] rounded-[4px] max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-[#1C2B52]/60 hover:text-[#1C2B52] p-1.5 rounded-[2px] border border-[#1C2B52]/10"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div className="flex items-center gap-2 mb-2">
              <StarIcon size={18} color="navy" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#C9972E] font-sans-brand">
                {currentLang === 'ar' ? 'طلب الانخراط' : 'ADHÉSION ASSOCIATIVE'}
              </span>
            </div>

            <h3 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#1C2B52] mb-2">
              {currentLang === 'ar'
                ? 'الانخراط في جمعية يونيفر أنيم'
                : 'Rejoindre Univers Anim'}
            </h3>

            <p className="text-xs sm:text-sm text-[#4A5168] mb-6">
              {currentLang === 'ar'
                ? 'استمارة مخصصة للراغبين في الانضمام إلى الأنشطة أو التطوع مع فريق الجمعية بأسفي.'
                : 'Formulaire d’inscription pour participer aux ateliers réguliers ou rejoindre l’équipe de bénévoles à Asfi.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1C2B52] uppercase tracking-wide mb-1">
                  {currentLang === 'ar' ? 'الاسم الكامل *' : 'Nom complet *'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Yassine El Amrani"
                  className="w-full px-3.5 py-2.5 rounded-[3px] bg-white border border-[#1C2B52]/20 text-sm text-[#1C2B52] focus:outline-none focus:border-[#C9972E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1C2B52] uppercase tracking-wide mb-1">
                    {currentLang === 'ar' ? 'البريد الإلكتروني *' : 'Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@exemple.com"
                    className="w-full px-3.5 py-2.5 rounded-[3px] bg-white border border-[#1C2B52]/20 text-sm text-[#1C2B52] focus:outline-none focus:border-[#C9972E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1C2B52] uppercase tracking-wide mb-1">
                    {currentLang === 'ar' ? 'الهاتف' : 'Téléphone'}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+212 6 XX XX XX XX"
                    className="w-full px-3.5 py-2.5 rounded-[3px] bg-white border border-[#1C2B52]/20 text-sm text-[#1C2B52] focus:outline-none focus:border-[#C9972E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C2B52] uppercase tracking-wide mb-1">
                  {currentLang === 'ar' ? 'مجال النشاط المرغوب' : 'Pôle d’intérêt'}
                </label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[3px] bg-white border border-[#1C2B52]/20 text-sm text-[#1C2B52] focus:outline-none focus:border-[#C9972E]"
                >
                  <option value="theatre">
                    {currentLang === 'ar' ? 'المسرح وفنون الأداء' : 'Théâtre & Expression scénique'}
                  </option>
                  <option value="musique">
                    {currentLang === 'ar' ? 'الموسيقى والعزف' : 'Musique & Pratique instrumentale'}
                  </option>
                  <option value="ateliers">
                    {currentLang === 'ar' ? 'أنشطة الأطفال والناشئة' : 'Ateliers jeunesse & Animation'}
                  </option>
                  <option value="solidarite">
                    {currentLang === 'ar' ? 'العمل الميداني والتضامني' : 'Solidarité & Logistique événementielle'}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C2B52] uppercase tracking-wide mb-1">
                  {currentLang === 'ar' ? 'ملاحظة أو دافع الانخراط' : 'Remarque ou motivation'}
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    currentLang === 'ar'
                      ? 'ملاحظات حول وقت فراغك أو رغبتك...'
                      : 'Vos disponibilités ou ce que vous souhaitez apporter...'
                  }
                  className="w-full px-3.5 py-2.5 rounded-[3px] bg-white border border-[#1C2B52]/20 text-sm text-[#1C2B52] focus:outline-none focus:border-[#C9972E]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-[4px] bg-[#C9972E] hover:bg-[#E6BF63] text-[#1C2B52] font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                {currentLang === 'ar' ? 'إرسال طلب الانخراط' : 'Valider ma demande d’adhésion'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 rounded-full border-2 border-[#C9972E] text-[#C9972E] flex items-center justify-center mx-auto bg-white">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-serif-brand text-2xl font-bold text-[#1C2B52]">
              {currentLang === 'ar' ? 'تم تسجيل الطلب' : 'Demande enregistrée'}
            </h4>
            <p className="text-xs sm:text-sm text-[#4A5168] max-w-sm mx-auto">
              {currentLang === 'ar'
                ? `شكراً ${name}، سيتم التواصل معك من طرف مسؤولي الجمعية بأسفي لاستكمال إجراءات الانخراط.`
                : `Merci ${name}, votre demande d’adhésion a été prise en compte. Un membre du bureau vous contactera pour la finalisation.`}
            </p>
            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2 border border-[#1C2B52] text-xs font-bold uppercase rounded-[3px] text-[#1C2B52]"
            >
              {currentLang === 'ar' ? 'إغلاق' : 'Fermer'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
