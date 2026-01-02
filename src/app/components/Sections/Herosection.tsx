'use client'
import { motion } from 'framer-motion';
import Button from '../Button';

import { useTranslation } from 'react-i18next';
import AnimatedMap from '../AnimatedMap';

const Herosection = () => {
  const { t } = useTranslation('common');
  return (
    <div className="sticky top-0 h-screen w-full z-0 her-bg-color">
      <div className="relative w-full h-full mx-auto">
        {/* Animated Globe - centered on small screens, right aligned on md+ */}
        <div className="absolute w-full flex justify-center md:justify-end translate-y-[20%] px-4 md:px-10">
          <AnimatedMap className="h-[65vh] sm:h-[70vh] md:h-[60vh] lg:h-[80vh]" />
          {/* Overlay for small screens */}
          
        </div>
        <div className="absolute inset-0 bg-black/40 sm:hidden pointer-events-none rounded-xl" />
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-start justify-center px-4 sm:px-8 md:px-16 py-12 z-10 pointer-events-none">
          <div className="text-left max-w-full sm:max-w-lg pointer-events-none">
            <motion.h1
              className="text-[3rem] sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#26A4DD] drop-shadow-lg 
                sm:text-shadow-none text-shadow-white"
              style={{
                textShadow:
                  '0 0 0 #fff, 0 0 1px #fff, 0 0 1px #fff, 0 0 2px #fff'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {t('hero_title')}
            </motion.h1>

            <motion.h2
              className="text-[1.5rem] sm:text-2xl md:text-3xl font-bold border-none mb-4 drop-shadow-lg text-white 
                sm:text-shadow-none text-shadow-white"
              
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              {t('hero_subtitle')}
            </motion.h2>
          </div>

          {/* Call-to-Action Buttons */}
        <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-6 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            >
            <Button
                to="/services"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-colors"
            >
                {t('explore_services')}
            </Button>
            <Button
                to="/contact"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-colors"
            >
                {t('contact_consultation')}
            </Button>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
