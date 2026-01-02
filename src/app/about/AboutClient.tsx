"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import dynamic from 'next/dynamic';
import AfricanContinentSVG from '../assets/AfricanContinentSVG';
const AnimatedLines = dynamic(() => import('../assets/Animated-lines'), { ssr: false });
const WorldFlatMap = dynamic(() => import('../assets/World-map-flat'), { ssr: false });
import ScrollToTop from '../components/ScrollToTop';
import { useTranslation } from 'react-i18next';

interface Service {
  title: string;
  subservices: string[];
  key: string;
  link: string;
}

interface AboutSection {
  id: string;
  title: string;
  content?: string;
  intro?: string;
  services?: Service[];
}

interface AboutClientProps {
  aboutSections: AboutSection[];
}

const heroVideo = "/videos/whoweare.mp4";
const heroImage = "/heroimage.jpg";

const AboutClient = ({ aboutSections }: AboutClientProps) => {
  const { t } = useTranslation('common');
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sloganRef = useRef<HTMLHeadingElement | null>(null);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const hasAnimated = useRef(false);
  const sloganText = t('about_slogan');

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 0);
    sectionRefs.current.forEach((ref) => {
      if (ref) {
        const children = ref.querySelectorAll('.section-animate');
        gsap.fromTo(
          children,
          { opacity: 0, y: 40, color: '#fff' },
          {
            opacity: 1,
            y: 0,
            color: '#fff',
            duration: 0.8,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
              scrub: true,
            },
          }
        );
      }
    });
    serviceRefs.current.forEach((ref, i) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 30, color: '#fff' },
          {
            opacity: 1,
            y: 0,
            color: '#fff',
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref,
              start: 'top 95%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
              scrub: true,
            },
            delay: i * 0.08 + 0.2,
          }
        );
      }
    });
    if (sloganRef.current) {
      ScrollTrigger.create({
        trigger: sloganRef.current,
        start: 'top 50%',
        onEnter: () => {
          if (!hasAnimated.current) {
            hasAnimated.current = true;
            let i = 0;
            const type = () => {
              if (i <= sloganText.length) {
                setTypedText(sloganText.slice(0, i));
                i++;
                setTimeout(type, 5);
              } else {
                setShowCursor(false);
              }
            };
            type();
          }
        },
      });
    }
  }, [sloganText, t]);

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          poster={heroImage}
        />
        <div className="absolute inset-0 bg-[#0F2C64]/50 z-10 w-full h-full" />
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg" style={{ WebkitTextStroke: '2px black' }}>
            {t('about_us')}
          </h1>
        </div>
      </div>

      {/* Content Sections */}
      <div className='container relative w-full h-full mx-auto overflow-hidden '>
             <div className=" mx-auto px-4 py-12 max-w-3xl max-w-[1200px] ">
        <div className="absolute top-[-10%] md:right-[-50%] right-[-50%] h-full object-cover pointer-events-none select-none z-[-1] opacity-20 md:opacity-100">
          <AnimatedLines />
        </div>
        <div className="flex flex-col gap-24">
          {aboutSections.map((section, i) => (
            <div
              key={section.id}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
              className={`text-left ${
                section.id === 'mission' || section.id === 'vision'
                  ? 'md:text-right md:ml-auto md:max-w-xl'
                  : ''
              } ${section.id === 'services' ? 'md:text-left' : ''}`}
            >
              <h3 className="section-animate text-3xl md:text-5xl font-extrabold mb-6 ">{t(`about_${section.id}_title`)}</h3>
              <div className="section-animate text-lg md:text-2xl font-semibold text-white leading-relaxed max-w-2xl">
                {section.id === 'services' && Array.isArray(section.services) ? (
                  <div>
                    <p className="mb-8 text-base md:text-lg text-white">{t('about_services_intro')}</p>
                    <div className="flex flex-col gap-1 ">
                      {section.services.map((svc, idx) => (
                        <div
                          key={svc.key}
                          ref={(el) => {
                            serviceRefs.current[idx] = el;
                          }}
                          className="group cursor-pointer"
                        >
                          <a href={svc.link} className="font-bold border-b border-blue-200 text-lg md:text-xl text-blue-200 py-2 px-2 rounded hover:bg-blue-900/95 transition-colors duration-300 block">
                            {t(svc.key)}
                          </a>
                          <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-500 ease-in-out mt-2 pl-4">
                            <ul className="list-disc pl-6 space-y-2 text-base md:text-lg">
                              {svc.subservices.map((sub, subIdx) => (
                                <li key={subIdx}>{t(sub)}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  t(`about_${section.id}_content`)
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
     

      {/* Slogan Section */}
      <div className="relative flex items-center justify-center h-[90vh] w-full overflow-hidden mt-24">
        <div className="absolute inset-0 h-full z-0 pointer-events-none select-none overflow-hidden">
          <AfricanContinentSVG className="w-full h-full md:hidden object-cover" preserveAspectRatio="xMidYMid slice" />
          <WorldFlatMap className=" h-full object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-4">
          <h2
            ref={sloganRef}
            className="text-3xl md:text-6xl max-w-[600px] font-bold mb-4 drop-shadow-lg text-white min-h-[3.5em]"
          >
            {typedText}
            {showCursor && <span className="inline-block animate-pulse">|</span>}
          </h2>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default AboutClient; 