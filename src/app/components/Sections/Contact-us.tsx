'use client';
import { useTranslation } from 'react-i18next';

const ContactUs = () => {
    const { t } = useTranslation('common');
    return (
        <div className="relative min-h-[60vh] flex items-center justify-center">
            {/* Background image with overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/heroimage.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('contact_us_title')}</h2>
                <p className="text-lg md:text-xl mb-8 text-gray-300">
                    {t('contact_us_description')}
                </p>
                <a 
                    href="mailto:contact@subsaharan.com" 
                    className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg text-lg font-semibold"
                >
                    {t('contact_us_cta')}
                </a>
            </div>
        </div>
    );
};

export default ContactUs;
