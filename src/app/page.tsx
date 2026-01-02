import { Metadata } from "next";

// Helper to load translation
async function getTranslation(locale: string) {
  try {
    return (await import(`../locales/${locale}/common.json`)).default;
  } catch {
    return (await import(`../locales/en/common.json`)).default;
  }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslation(params.locale);
  const baseUrl = 'https://sub-saharaninvestmentlinkgroup.co.za';
  
  return {
    title: t.seo_title,
    description: t.seo_description,
    keywords: [
      "Sub-Saharan Africa business solutions",
      "African investment advisory",
      "South Africa business consulting",
      "corporate governance Africa",
      "business registration South Africa",
      "African market entry",
      "cross-border business Africa",
      "Behind Glass Doors book",
      "Dinkwanyane Ntoampe author",
      "African literature",
      "family trauma novel",
      "generational healing book"
    ],
    openGraph: {
      title: t.seo_title,
      description: t.seo_description,
      url: baseUrl,
      siteName: "SubSaharan Investment Link Group",
      images: [
        {
          url: "/heroimage.jpg",
          width: 1200,
          height: 630,
          alt: "SubSaharan Investment Link Group - Connecting Africa's Potential",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo_title,
      description: t.seo_description,
      images: ["/heroimage.jpg"],
    },
    alternates: {
      canonical: baseUrl,
      languages: {
        "en-US": `${baseUrl}/en`,
        "fr-FR": `${baseUrl}/fr`,
        "es-ES": `${baseUrl}/es`,
        "zu-ZA": `${baseUrl}/zu`,
        "ha-NG": `${baseUrl}/ha`,
        "sw-TZ": `${baseUrl}/sw`,
      },
    },
  };
}

import Herosection from "./components/Sections/Herosection";
import AboutSection from "./components/Sections/About";
import BookBanner from "./components/BookBanner";

import ContactUs from "./components/Sections/Contact-us";
import Connect from "./components/Sections/Connect";
import ScrollToTop from "./components/ScrollToTop"; // Adjusted path for components
import { ExpertiseBase } from "./components/ExpertiseBase";




export default function Home() {
  return (
    <>
        {/* Banner below fixed navbar to avoid overlap - responsive spacing */}
        <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-20 xl:mt-24">
            <BookBanner />
        </div>
        
        <div className="relative w-full">
            {/* Hero section with sticky positioning */}
            <Herosection />
            
            {/* Main content */}
            <div className="relative z-10 border-t-2 border-gray-800 pri-bg-color">
                <AboutSection />
                <ExpertiseBase/>             
                <Connect/>
                <ContactUs/>
            </div>
            
        </div>
        <ScrollToTop/>
        
        {/* Structured Data for Home Page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "SubSaharan Investment Link Group",
              "description": "Empowering businesses, individuals, and organizations across Sub-Saharan Africa with business setup, governance, and professional supply solutions.",
              "url": "https://sub-saharaninvestmentlinkgroup.co.za",
              "mainEntity": {
                "@type": "Organization",
                "name": "SubSaharan Investment Link Group",
                "description": "Connecting Africa's Potential with Strategic Business Solutions",
                "url": "https://sub-saharaninvestmentlinkgroup.co.za",
                "logo": "https://sub-saharaninvestmentlinkgroup.co.za/subsaharan_logo.png",
                "sameAs": [
                  "https://linkedin.com/company/subsaharan",
                  "https://twitter.com/subsaharan"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "availableLanguage": ["English", "French", "Spanish", "isiZulu", "Hausa", "Kiswahili"]
                },
                "serviceArea": {
                  "@type": "GeoCircle",
                  "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "latitude": -30.5595,
                    "longitude": 22.9375
                  },
                  "geoRadius": "5000000"
                }
              }
            })
          }}
        />
    </>
  );
}
