'use client'

import { servicesData, detailedData } from "../lib/servicesData";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const ExpertiseCard = ({ title, icon: Icon, details }: { title: string, icon: React.ElementType, details: { title: string }[] }) => (
  <div className="group flex flex-col items-center text-center p-6 rounded-lg shadow-md transition-all duration-300 hover:scale-105 cursor-pointer">
    <Icon className="text-4xl text-blue-500 mb-2" />
    <h3 className="text-lg font-semibold text-white mt-2 mb-4 text-center">{title}</h3>
    <ul className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100 transition-all duration-500 ease-out text-sm space-y-2 text-left pl-4">
      {details.map((item, index) => (
        <li
          key={index}
          className="text-left transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out flex items-start gap-2"
          style={{ transitionDelay: `${index * 200}ms` }}
        >
          <span className="text-blue-200 mt-1">•</span>
          <span className="font-semibold text-blue-400 hover:text-blue-200">{item.title}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const ExpertiseBase = ({ cardRefs, sectionRef }: {
  sectionRef?: React.RefObject<HTMLDivElement | null>,
  cardRefs?: React.MutableRefObject<(HTMLDivElement | null)[]>
}) => {
  const { t } = useTranslation('common');
  return (
    <section ref={sectionRef} className="py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-4">{t('our_expertise')}</h2>
        <p className="text-center text-gray-600 mb-12">
          {t('expertise_intro')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {servicesData.map((service, index) => {
            // Find details for this service
            const detailsEntry = detailedData.find(d => d.category === service.title) || { details: [] };
            return (
              <Link
                key={index}
                href={`/services/#${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="expertise-card block"
              >
                <div ref={cardRefs ? el => { cardRefs.current[index] = el; } : undefined}>
                  <ExpertiseCard title={t(service.title)} icon={service.icon} details={detailsEntry.details.map(d => ({ title: t(d.title) }))} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
