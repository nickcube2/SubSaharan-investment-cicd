import { getTranslation } from '../lib/getTranslation';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale?: string } }): Promise<Metadata> {
  const locale = params?.locale || 'en';
  const baseUrl = 'https://sub-saharaninvestmentlinkgroup.co.za';
  
  return {
    title: getTranslation(locale, 'seo_contact_title', 'Contact Us | SubSaharan Investment Link Group'),
    description: getTranslation(locale, 'seo_contact_description', 'Get in touch with SubSaharan Investment Link Group. We provide business setup, governance, and professional services across Sub-Saharan Africa.'),
    keywords: [
      "contact SubSaharan Investment Link Group",
      "business consulting contact",
      "African business solutions contact",
      "South Africa business consulting",
      "get quote business services",
      "consultation request Africa"
    ],
    openGraph: {
      title: getTranslation(locale, 'seo_contact_title', 'Contact Us | SubSaharan Investment Link Group'),
      description: getTranslation(locale, 'seo_contact_description', 'Get in touch with SubSaharan Investment Link Group. We provide business setup, governance, and professional services across Sub-Saharan Africa.'),
      url: `${baseUrl}/contact`,
      siteName: "SubSaharan Investment Link Group",
      images: [
        {
          url: "/heroimage.jpg",
          width: 1200,
          height: 630,
          alt: "Contact SubSaharan Investment Link Group",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: getTranslation(locale, 'seo_contact_title', 'Contact Us | SubSaharan Investment Link Group'),
      description: getTranslation(locale, 'seo_contact_description', 'Get in touch with SubSaharan Investment Link Group. We provide business setup, governance, and professional services across Sub-Saharan Africa.'),
      images: ["/heroimage.jpg"],
    },
    alternates: {
      canonical: `${baseUrl}/contact`,
      languages: {
        "en-US": `${baseUrl}/en/contact`,
        "fr-FR": `${baseUrl}/fr/contact`,
        "es-ES": `${baseUrl}/es/contact`,
        "zu-ZA": `${baseUrl}/zu/contact`,
        "ha-NG": `${baseUrl}/ha/contact`,
        "sw-TZ": `${baseUrl}/sw/contact`,
      },
    },
  };
}

const ContactClient = dynamic(() => import('./ContactClient'));

export default function ContactPage() {
  return (
    <>
      <ContactClient />
      
      {/* Structured Data for Contact Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact SubSaharan Investment Link Group",
            "description": "Get in touch with SubSaharan Investment Link Group for business consulting, governance, and professional services across Sub-Saharan Africa.",
            "url": "https://sub-saharaninvestmentlinkgroup.co.za/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "SubSaharan Investment Link Group",
              "url": "https://sub-saharaninvestmentlinkgroup.co.za",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "telephone": "+1234567890",
                  "email": "info@subsaharan.com",
                  "availableLanguage": ["English", "French", "Spanish", "isiZulu", "Hausa", "Kiswahili"]
                },
                {
                  "@type": "ContactPoint",
                  "contactType": "sales",
                  "telephone": "+1234567890",
                  "email": "sales@subsaharan.com"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "ZA",
                "addressRegion": "South Africa"
              },
              "sameAs": [
                "https://linkedin.com/company/subsaharan",
                "https://twitter.com/subsaharan"
              ]
            }
          })
        }}
      />
    </>
  );
}
