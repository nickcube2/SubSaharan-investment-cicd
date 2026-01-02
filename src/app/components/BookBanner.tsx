'use client'
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiX, FiStar, FiTrendingUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const BookBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { t } = useTranslation('common');

  // Check localStorage on mount
  useEffect(() => {
    const isDismissed = localStorage.getItem('bookBannerDismissed');
    if (isDismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('bookBannerDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="book-banner"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        role="region"
        aria-label={t('book_banner_title')}
        className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden z-40"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
        </div>

        {/* Animated Background Elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-10 -left-10 w-20 h-20 bg-white/5 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-5 -right-5 w-16 h-16 bg-white/5 rounded-full"
        />

        <div className="relative container mx-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 lg:space-x-6 w-full sm:w-auto">
              {/* Book Cover with Real Image */}
              <motion.div
                animate={{
                  rotateY: hasAnimated ? [0, 180, 0] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="flex-shrink-0"
              >
                <div className="relative">
                  {/* Real Book Cover Image with WebP + SVG fallback */}
                  <div className="w-10 h-14 sm:w-12 sm:h-16 lg:w-14 lg:h-18 rounded-sm shadow-lg transform rotate-12 hover:rotate-6 transition-transform duration-300 overflow-hidden border border-white/20">
                    <picture>
                      <source srcSet="/bookcover.webp" type="image/webp" />
                      <img
                        src="/book-cover-behind-glass-doors.svg"
                        width={112}
                        height={160}
                        alt="Behind Glass Doors book cover"
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                    </picture>
                  </div>
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"
                  >
                    <span className="absolute inset-0 text-white text-[8px] sm:text-xs font-bold flex items-center justify-center">!</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-col lg:flex-row lg:items-center lg:space-x-4">
                  {/* Main Text */}
                  <div className="flex-1">
                    <h3 className="text-xs sm:text-sm lg:text-lg font-bold text-yellow-300 leading-tight">
                      {t('book_banner_title')}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] lg:text-xs text-white/80 mb-1">
                      {t('book_banner_author')}
                    </p>
                    <p className="text-[11px] sm:text-xs lg:text-sm text-white/90 leading-tight line-clamp-2 sm:line-clamp-3">
                      {t('book_banner_description')}
                    </p>
                  </div>

                  {/* Features & CTA */}
                  <div className="flex items-center justify-between sm:justify-start space-x-2 sm:space-x-3 lg:space-x-4 mt-2 lg:mt-0 w-full sm:w-auto">
                    {/* Features - Hidden on very small screens */}
                    <div className="hidden sm:flex items-center space-x-2 lg:space-x-3 text-[10px] sm:text-xs">
                      <div className="flex items-center space-x-1">
                        <FiStar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400" />
                        <span className="text-white/80">{t('book_banner_rating')}</span>
                      </div>
                      <div className="hidden lg:flex items-center space-x-1">
                        <FiTrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-400" />
                        <span className="text-white/80">{t('book_banner_bestseller')}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://shop.sub-saharaninvestmentlinkgroup.co.za/store/book/vxPw8nR0okH8kRe2POUc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-2 rounded-full font-semibold text-[10px] sm:text-xs lg:text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:from-yellow-300 hover:to-yellow-400 inline-flex items-center justify-center whitespace-nowrap"
                    >
                      {t('book_banner_cta')}
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="flex-shrink-0 self-start sm:self-center p-1 hover:bg-white/10 rounded-full transition-colors duration-200"
              aria-label={t('book_banner_close')}
            >
              <FiX className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white/70 hover:text-white" />
            </motion.button>
          </div>
        </div>

        {/* Animated Border */}
        <motion.div
          animate={{
            scaleX: [0, 1, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            times: [0, 0.3, 0.7, 1],
          }}
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-300 w-full origin-left"
        />
      </motion.div>
      {/* JSON-LD for Book - Enhanced SEO */}
      <script
        key="book-schema"
        type="application/ld+json"
       
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Book',
            '@id': 'https://shop.sub-saharaninvestmentlinkgroup.co.za/store/book/vxPw8nR0okH8kRe2POUc',
            name: 'Behind Glass Doors',
            alternateName: 'Behind Glass Doors: A Novel',
            author: {
              '@type': 'Person',
              name: 'Dinkwanyane Ntoampe',
              nationality: 'South African',
            },
            publisher: {
              '@type': 'Organization',
              name: 'SubSaharan Investment Link Group',
              url: 'https://sub-saharaninvestmentlinkgroup.co.za',
            },
            description: 'The past always finds its way home. A haunting and powerful novel that pulls readers into the hidden corners of family life where love and violence live side by side. Through the eyes of Thabiso Mokoena, we witness the scars of generational trauma, bruises counted like currency, silences that speak louder than words, and the fragile hope that breaking cycles of pain is possible.',
            genre: ['Literary Fiction', 'African Literature', 'Family Saga', 'Contemporary Fiction'],
            inLanguage: 'en',
            keywords: ['African literature', 'family trauma', 'generational healing', 'South African fiction', 'domestic violence', 'family dynamics', 'contemporary African authors', 'literary fiction'],
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://sub-saharaninvestmentlinkgroup.co.za',
            },
            url: 'https://shop.sub-saharaninvestmentlinkgroup.co.za/store/book/vxPw8nR0okH8kRe2POUc',
            workExample: {
              '@type': 'Book',
              bookFormat: 'EBook',
              url: 'https://shop.sub-saharaninvestmentlinkgroup.co.za/store/book/vxPw8nR0okH8kRe2POUc',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '1',
              bestRating: '5',
              worstRating: '1',
            },
            review: {
              '@type': 'Review',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: '5',
                bestRating: '5',
              },
              author: {
                '@type': 'Organization',
                name: 'SubSaharan Investment Link Group',
              },
              reviewBody: 'A haunting and powerful novel that explores the hidden corners of family life with unflinching honesty. This book is not just a story—it is a mirror, a question and a conversation waiting to happen.',
            },
            offers: {
              '@type': 'Offer',
              url: 'https://shop.sub-saharaninvestmentlinkgroup.co.za/store/book/vxPw8nR0okH8kRe2POUc',
              priceCurrency: 'ZAR',
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: 'SubSaharan Investment Link Group',
              },
            },
          }),
        }}
      />
    </AnimatePresence>
  );
};

export default BookBanner;