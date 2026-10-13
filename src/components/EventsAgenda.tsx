import React, { useState } from 'react';
import { Clock, MapPin, ChevronDown, Calendar, Check } from 'lucide-react';
import { Language } from '../types';
import { SITE_DATA, EVENTS_LIST, EventItem } from '../data/content';
import { SectionDivider } from './StarIcon';

interface EventsAgendaProps {
  currentLang: Language;
}

export const EventsAgenda: React.FC<EventsAgendaProps> = ({ currentLang }) => {
  const t = SITE_DATA[currentLang].events;
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const upcomingEvents = EVENTS_LIST.filter((e) => !e.isPast);
  const pastEvents = EVENTS_LIST.filter((e) => e.isPast);

  const displayedEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="evenements"
      className="py-20 sm:py-28 bg-[#F8F5EE] border-b border-[#1C2B52]/10"
      aria-label="Agenda des événements"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[1px] w-6 bg-[#C9972E]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#C9972E] font-sans-brand">
                {t.label}
              </span>
            </div>
            <h2 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C2B52]">
              {t.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#4A5168] max-w-xl font-sans-brand">
              {t.subtitle}
            </p>
          </div>

          {/* Clean Segmented Tab Switcher */}
          <div className="flex items-center border border-[#1C2B52]/20 rounded-[4px] p-1 bg-[#FFFFFF] shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-[3px] transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-[#1C2B52] text-[#F8F5EE]'
                  : 'text-[#1C2B52] hover:bg-[#F8F5EE]'
              }`}
            >
              {t.upcomingTab} ({upcomingEvents.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-[3px] transition-colors ${
                activeTab === 'past'
                  ? 'bg-[#1C2B52] text-[#F8F5EE]'
                  : 'text-[#1C2B52] hover:bg-[#F8F5EE]'
              }`}
            >
              {t.pastTab} ({pastEvents.length})
            </button>
          </div>
        </div>

        {/* Clean Agenda-Style List with Expandable Rows on Hover/Tap */}
        {displayedEvents.length === 0 ? (
          <div className="p-8 text-center bg-[#FFFFFF] border border-[#1C2B52]/10 rounded-[4px] text-sm text-[#4A5168]">
            {activeTab === 'upcoming' ? t.emptyUpcoming : t.emptyPast}
          </div>
        ) : (
          <div className="divide-y divide-[#1C2B52]/10 bg-[#FFFFFF] border border-[#1C2B52]/15 rounded-[4px] shadow-sm overflow-hidden">
            {displayedEvents.map((item) => {
              const isExpanded = expandedId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => toggleExpand(item.id)}
                  onMouseEnter={() => setExpandedId(item.id)}
                  className={`p-6 sm:p-8 transition-all duration-300 cursor-pointer ${
                    isExpanded ? 'bg-[#FAF7F0] border-l-4 border-l-[#C9972E]' : 'hover:bg-[#FBF9F5]'
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(item.id);
                    }
                  }}
                  aria-expanded={isExpanded}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    {/* Big Date on Left */}
                    <div className="w-24 shrink-0 text-center p-3 rounded-[3px] bg-[#F8F5EE] border border-[#1C2B52]/15 transition-transform group-hover:scale-105">
                      <div className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#1C2B52] leading-none">
                        {item.day}
                      </div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#C9972E] mt-1">
                        {item.month}
                      </div>
                      <div className="text-[10px] text-[#4A5168] font-mono">
                        {item.year}
                      </div>
                    </div>

                    {/* Main Title & Metadata */}
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif-brand text-xl sm:text-2xl font-bold text-[#1C2B52]">
                          {item.title}
                        </h3>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C9972E] shrink-0 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : 'rotate-0'
                          }`}
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#1C2B52] pt-1">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#C9972E]" />
                          <span>{item.time}</span>
                        </span>
                        <span className="text-[#C9972E]/40" aria-hidden="true">·</span>
                        <span className="flex items-center gap-1.5 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#C9972E]" />
                          <span>{item.location}</span>
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="shrink-0 self-start md:self-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-[2px] text-xs font-bold tracking-wide uppercase ${
                          item.isPast
                            ? 'bg-[#EAE4D6] text-[#4A5168]'
                            : 'bg-[#C9972E]/15 text-[#C9972E] border border-[#C9972E]/30'
                        }`}
                      >
                        {item.isPast
                          ? currentLang === 'ar'
                            ? 'فعالية سابقة'
                            : 'Passé'
                          : currentLang === 'ar'
                          ? 'مفتوح للجميع'
                          : 'Entrée libre'}
                      </span>
                    </div>
                  </div>

                  {/* Expandable Accordion Body on Hover/Tap */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-60 mt-4 opacity-100 pt-3 border-t border-[#1C2B52]/10' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-sm text-[#4A5168] leading-relaxed max-w-3xl">
                      {item.description}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-[#1C2B52]">
                      <span className="font-semibold text-[#C9972E]">
                        {currentLang === 'ar' ? 'معلومات المشاركة :' : 'Modalités :'}
                      </span>
                      <span>
                        {currentLang === 'ar'
                          ? 'الحضور مفتوح لجميع المهتمين من ساكنة أسفي. يرجى الحضور في الموعد المحدد.'
                          : 'Accès libre sans réservation préalable dans la limite des places disponibles.'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="pt-16">
          <SectionDivider />
        </div>
      </div>
    </section>
  );
};
