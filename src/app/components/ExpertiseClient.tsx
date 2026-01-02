'use client';

import { useEffect, useRef } from 'react';
import { ExpertiseBase } from './ExpertiseBase';

const ExpertiseClient = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let tween: gsap.core.Tween | undefined;
    let gsap: typeof import('gsap').default | undefined;
    let ScrollTrigger: typeof import('gsap/ScrollTrigger').default | undefined;

    const run = async () => {
      if (typeof window === 'undefined') return;
      gsap = (await import('gsap')).default;
      ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      gsap.registerPlugin(ScrollTrigger);

      const cards = cardRefs.current.filter(Boolean);
      if (cards.length && sectionRef.current) {
        tween = gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    };

    run();

    return () => {
      if (tween) tween.kill();
    };
  }, []);

  return <ExpertiseBase sectionRef={sectionRef} cardRefs={cardRefs} />;
};

export default ExpertiseClient;
