'use client';
import Link from "next/link"; // Changed from react-router-dom
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
const ConnectivityGlobe = dynamic(() => import("../Connectivityglobe"), { ssr: false });
const heroVideo = "/videos/whoweare.mp4"; // Updated path for Next.js public directory

const AboutSection = () => {
    const { t } = useTranslation('common');
    const [showVideo, setShowVideo] = useState(false);
    useEffect(() => {
        setShowVideo(true);
    }, []);
    return (
        <div className="relative w-full min-h-screen py-20 flex flex-col items-center justify-center ">
       <div className="relative w-full min-h-screen flex flex-col md:flex-row items-center max-w-[1200px] mx-auto px-4 py-12 gap-8 overflow-hidden">
  {/* Globe: Background on small screens, side on md+ */}
  <div className="absolute inset-0 md:static w-full md:w-1/2 flex justify-center z-0">
     <ConnectivityGlobe className="h-[60vh] md:h-[70vh] lg:h-[80vh] w-auto opacity-20 md:opacity-100" />
  </div>

  {/* Content: layered above globe on small, side-by-side on md+ */}
  <div className="w-full md:w-1/2 flex flex-col items-start justify-center max-w-[550px] z-10  ">
    <div className="mb-6">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-left text-white">
        {t('about_company_name')}
      </h1>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-left text-white">
        {t('about_company_group')}
      </h2>
    </div>
    <p className="text-base sm:text-lg text-left text-gray-200">
      {t('about_company_description')}
    </p>
  </div>
</div>


                {/* who we are interactive corusel*/}
            <div className="relative w-full h-[75vh]">
                {/* background video */}
                <div className="absolute inset-0">
                    {showVideo && (
                        <video src={heroVideo} autoPlay muted loop className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-[#0F2C64]/50 bg-opacity-50"></div>
                </div>

                {/* corusel content */}
                
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 max-w-[600px] mx-auto px-8">
                    <h2 className="text-5xl font-bold text-center">{t('about_mission_title')}</h2>
                    <p className="text-2xl text-center">
                        {t('about_mission_content')}
                    </p>
                    <div className="flex flex-row items-center justify-center">
                        <Link href="/about" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            {t('about_learn_more')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default AboutSection;