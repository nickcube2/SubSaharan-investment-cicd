// File: components/ServicesClient.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { servicesData, detailedData } from '../lib/servicesData';
import ScrollToTop from '../components/ScrollToTop';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function ServicesClient() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [activeService, setActiveService] = useState(servicesData[0]);
  const [, setShowScrollTop] = useState(false);
  const activeDetails = detailedData.find((d) => d.category === activeService.title);
  const serviceRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    gsap.from('.hero-title', { y: -30, opacity: 0, duration: 0.6, ease: 'power3.out' });
    gsap.from('.description-text', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out', delay: 0.2 });
  }, [activeService]);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const match = servicesData.find((s) => s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === hash);
      if (match) {
        setActiveService(match);
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
      }
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 200);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen pri-bg-color text-gray-800">
      <ScrollToTop />
      <div className="flex items-center justify-center h-[70vh] relative inset-0 mb-20">
        <div
          className="absolute inset-0 w-full h-full z-0"
          aria-hidden="true"
          style={{
            backgroundImage: `url('${activeService.backgroundImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="w-full h-full bg-[#1667A7]/30"></div>
        </div>
        <h1
          className="hero-title text-6xl font-bold text-white text-center relative z-30 drop-shadow-lg px-4 py-2 rounded-lg"
          style={{ WebkitTextStroke: '1px black' }}
        >
          <span className="relative z-30 px-6 py-2 rounded-lg inline-block">
            {t(activeService.title)}
          </span>
        </h1>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-[1000px]">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 relative">
          <div className="flex flex-col md:sticky md:top-[120px] self-start md:max-h-[calc(100vh-120px)] md:overflow-y-auto">
            {servicesData.map((service) => {
              const slug = service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return (
                <div
                  key={service.title}
                  ref={(el) => { serviceRefs.current[slug] = el; }}
                  onClick={() => {
                    setActiveService(service);
                    router.push(`#${slug}`);
                  }}
                  className={`flex items-center text-left py-3 px-4 border-l-2 transition-all duration-200 cursor-pointer ${
                    activeService.title === service.title
                      ? 'border-white text-white bg-white/10'
                      : 'border-transparent hover:border-white/50 text-white/70 hover:text-white'
                  }`}
                >
                  <span className="text-lg mr-3 opacity-70">{typeof service.icon === 'function' ? <service.icon /> : service.icon}</span>
                  <span className="text-base">{t(service.title)}</span>
                </div>
              );
            })}
          </div>

          <div className="px-4 text-white text-left" id="service-details">
            <div className="mb-12">
              <h1 className="text-3xl font-serif mb-6 text-white">{t(activeService.title)}</h1>
              <p className="text-xl text-white/80 leading-relaxed font-light">
                {t(activeService.description)}
              </p>
            </div>
            <div className="space-y-10">
              {activeDetails?.details.map((detail) => (
                <article key={detail.title} className="group">
                  <h2 className="text-2xl font-serif mb-4 text-white">{t(detail.title)}</h2>
                  <p className="text-white/80 leading-relaxed">{t(detail.description)}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Carousel of Service Cards (moved below details) */}
      <div className="container mx-auto px-4 pt-8 pb-4 max-w-[1000px]">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="service-swiper"
          style={{ cursor: 'grab' }}
        >
          {servicesData.map((service) => {
            const slug = service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return (
              <SwiperSlide key={service.title}>
                <div
                  onClick={() => {
                    setActiveService(service);
                    router.push(`#${slug}`);
                    setTimeout(() => {
                      const el = document.getElementById('service-details');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className={`h-full flex flex-col justify-between cursor-pointer bg-white/10 rounded-xl shadow-lg p-6 items-center transition-all border-2 ${
                    activeService.title === service.title
                      ? 'border-white scale-105'
                      : 'border-transparent hover:border-white/50'
                  }`}
                  style={{ minHeight: 240, height: '100%' }}
                >
                  <span className="text-4xl mb-4 text-white opacity-80">
                    {typeof service.icon === 'function' ? <service.icon /> : service.icon}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2 text-center">{t(service.title)}</h3>
                  <p className="text-sm text-white/70 text-center">{t(service.description)}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {/* End Carousel */}

      <ScrollToTop />
    </div>
  );
}
