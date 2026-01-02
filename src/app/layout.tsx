import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import I18nProvider from "./components/I18nProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sub-saharaninvestmentlinkgroup.co.za'),
  title: {
    default: "SubSaharan Investment Link Group",
    template: "%s | SubSaharan Investment Link Group"
  },
  description: "Empowering businesses, individuals, and organizations across Sub-Saharan Africa with business setup, governance, and professional supply solutions.",
  keywords: [
    "Sub-Saharan Africa",
    "business consulting",
    "corporate governance",
    "business registration",
    "investment advisory",
    "South Africa business",
    "African business solutions",
    "compliance services",
    "office supplies"
  ],
  authors: [{ name: "SubSaharan Investment Link Group" }],
  creator: "SubSaharan Investment Link Group",
  publisher: "SubSaharan Investment Link Group",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sub-saharaninvestmentlinkgroup.co.za",
    siteName: "SubSaharan Investment Link Group",
    title: "SubSaharan Investment Link Group",
    description: "Empowering businesses, individuals, and organizations across Sub-Saharan Africa with business setup, governance, and professional supply solutions.",
    images: [
      {
        url: "/subsaharan_logo.png",
        width: 1200,
        height: 630,
        alt: "SubSaharan Investment Link Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SubSaharan Investment Link Group",
    description: "Empowering businesses, individuals, and organizations across Sub-Saharan Africa with business setup, governance, and professional supply solutions.",
    images: ["/subsaharan_logo.png"],
    creator: "@subsaharan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://sub-saharaninvestmentlinkgroup.co.za",
    languages: {
      "en-US": "https://sub-saharaninvestmentlinkgroup.co.za/en",
      "fr-FR": "https://sub-saharaninvestmentlinkgroup.co.za/fr",
      "es-ES": "https://sub-saharaninvestmentlinkgroup.co.za/es",
      "zu-ZA": "https://sub-saharaninvestmentlinkgroup.co.za/zu",
      "ha-NG": "https://sub-saharaninvestmentlinkgroup.co.za/ha",
      "sw-TZ": "https://sub-saharaninvestmentlinkgroup.co.za/sw",
    },
  },
  category: "business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/subsaharan_logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/subsaharan_logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0F2C64" />
        <meta name="msapplication-TileColor" content="#0F2C64" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SubSaharan" />
        <meta name="application-name" content="SubSaharan Investment Link Group" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SubSaharan Investment Link Group",
              "url": "https://sub-saharaninvestmentlinkgroup.co.za",
              "logo": "https://sub-saharaninvestmentlinkgroup.co.za/subsaharan_logo.png",
              "description": "Empowering businesses, individuals, and organizations across Sub-Saharan Africa with business setup, governance, and professional supply solutions.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "ZA",
                "addressRegion": "South Africa"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["English", "French", "Spanish", "isiZulu", "Hausa", "Kiswahili"]
              },
              "sameAs": [
                "https://linkedin.com/company/subsaharan",
                "https://twitter.com/subsaharan"
              ],
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": -30.5595,
                  "longitude": 22.9375
                },
                "geoRadius": "5000000"
              }
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <I18nProvider>
          <Header />
          {children}
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
} 