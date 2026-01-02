"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link"; // Changed from react-router-dom
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const ConnectSection = () => { // Renamed component
  const { t } = useTranslation('common');
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const linesRef = useRef<HTMLParagraphElement[]>([]);
  const ctaRef = useRef(null);
  const bgPatternRef = useRef(null);

  useEffect(() => {
    const cta = ctaRef.current as HTMLElement | null;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(linesRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(cta, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.to(bgPatternRef.current, {
        y: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 4,
      });

      // GSAP hover animation for CTA
      if (cta) {
        const handleMouseEnter = () => {
          gsap.to(cta, {
            scale: 1.15,
            textShadow: "0px 0px 16px #00f0ff, 0px 0px 32px #00e0ee",
            color: "#00e0ee",
            duration: 0.35,
            ease: "power2.out",
          });
        };
        const handleMouseLeave = () => {
          gsap.to(cta, {
            scale: 1,
            textShadow: "none",
            color: "#00f0ff",
            duration: 0.35,
            ease: "power2.inOut",
          });
        };
        cta.addEventListener("mouseenter", handleMouseEnter);
        cta.addEventListener("mouseleave", handleMouseLeave);

        // Clean up event listeners
        return () => {
          cta.removeEventListener("mouseenter", handleMouseEnter);
          cta.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-gradient"
     
    >
      

      <div className="max-w-3xl text-center z-10">

        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl font-extrabold text-white mb-6"
        >
          {t('connect_title')}
        </h1>

        <p
          ref={(el) => {
            linesRef.current[0] = el as HTMLParagraphElement;
          }}
          className="text-lg md:text-xl text-gray-200 mb-6"
        >
          {t('connect_description_1')}
        </p>

        <p
          ref={(el) => {
            linesRef.current[1] = el as HTMLParagraphElement;
          }}
          className="text-lg md:text-xl text-gray-200 mb-6"
        >
          {t('connect_description_2')}
        </p>

        <p
          ref={(el) => {
            linesRef.current[2] = el as HTMLParagraphElement;
          }}
          className="text-lg md:text-xl text-gray-200 mb-8"
        >
          {t('connect_description_3')}
        </p>

        <Link
          href="/contact/" // Changed to href with trailing slash
          className="text-lg font-semibold text-[#00f0ff] hover:text-[#00e0ee] transition-all duration-300 inline-block underline decoration-3 underline-offset-4 transform hover:scale-110"
          style={{
            textDecoration: 'underline',
            textDecorationThickness: '3px',
            textUnderlineOffset: '4px'
          }}
          ref={ctaRef} // Ref is kept, but Link component itself handles it.
        >
          {t('connect_cta')}
        </Link>

      </div>
    </section>
  );
};

export default ConnectSection; // Renamed export
