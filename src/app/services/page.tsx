import dynamic from 'next/dynamic';
import { getTranslation } from '../lib/getTranslation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale?: string } }): Promise<Metadata> {
  const locale = params?.locale || 'en';
  const baseUrl = 'https://sub-saharaninvestmentlinkgroup.co.za';
  
  return {
    title: getTranslation(locale, 'seo_services_title', 'Our Services | SubSaharan Investment Link Group'),
    description: getTranslation(locale, 'seo_services_description', 'Discover strategic services including consulting, compliance, and more across Africa.'),
    keywords: [
      "business consulting Africa",
      "corporate governance Africa",
      "business registration services",
      "investment advisory Africa",
      "market entry strategy Africa",
      "compliance services South Africa",
      "office supplies Africa"
    ],
    openGraph: {
      title: getTranslation(locale, 'seo_services_title', 'Our Services | SubSaharan Investment Link Group'),
      description: getTranslation(locale, 'seo_services_description', 'Discover strategic services including consulting, compliance, and more across Africa.'),
      url: `${baseUrl}/services`,
      siteName: "SubSaharan Investment Link Group",
      images: [
        {
          url: "/consulting.jpg",
          width: 1200,
          height: 630,
          alt: "SubSaharan Investment Link Group Services",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: getTranslation(locale, 'seo_services_title', 'Our Services | SubSaharan Investment Link Group'),
      description: getTranslation(locale, 'seo_services_description', 'Discover strategic services including consulting, compliance, and more across Africa.'),
      images: ["/consulting.jpg"],
    },
    alternates: {
      canonical: `${baseUrl}/services`,
      languages: {
        "en-US": `${baseUrl}/en/services`,
        "fr-FR": `${baseUrl}/fr/services`,
        "es-ES": `${baseUrl}/es/services`,
        "zu-ZA": `${baseUrl}/zu/services`,
        "ha-NG": `${baseUrl}/ha/services`,
        "sw-TZ": `${baseUrl}/sw/services`,
      },
    },
  };
}

const ServicesClient = dynamic(() => import('../components/ServicesClient'));

export default function ServicesPage() {
  return (
    <>
      <ServicesClient />
      
      {/* Structured Data for Services Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "SubSaharan Investment Link Group Services",
            "description": "Comprehensive business consulting, governance, and professional services across Sub-Saharan Africa",
            "provider": {
              "@type": "Organization",
              "name": "SubSaharan Investment Link Group",
              "url": "https://sub-saharaninvestmentlinkgroup.co.za"
            },
            "serviceType": [
              "Business Consulting",
              "Corporate Governance",
              "Business Registration",
              "Investment Advisory",
              "Office Supplies"
            ],
            "areaServed": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": -30.5595,
                "longitude": 22.9375
              },
              "geoRadius": "5000000"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Business Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Business Consulting",
                    "description": "Market entry strategy, business planning and structuring, and tailored advisory for growth."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Business Registration & Compliance",
                    "description": "Company registration, annual returns, tax, BBBEE, COIDA/UIF, and licensing compliance."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Office Supplies & Procurement",
                    "description": "Affordable, reliable office stationery and equipment delivered in record time."
                  }
                }
              ]
            }
          })
        }}
      />
    </>
  );
}
