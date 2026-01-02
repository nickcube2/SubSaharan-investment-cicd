'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import {
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';

import contacts from "../lib/contacts.json"
import { servicesData } from "../lib/servicesData";

const logofull = '/subsaharan_logo_white.png'; // Path to the full logo image
const Footer = () => {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 z-[1000]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 justify-center ">
            <picture>
              <source srcSet={logofull} type="image/png" />
              <img
                src={logofull}
                alt="SubSaharan Investment Link Group Logo"
                width={200}
                height={60}
                className="h-30 object-contain mx-auto mb-4"
                loading="eager"
              />
            </picture>
            
            <div className="flex space-x-4 py-6 pt-4">
              <a
                href={contacts.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href={contacts.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href={`mailto:${contacts.emails.general}`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              {t('footer_quick_links')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/about/" className="hover:text-white transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/services/" className="hover:text-white transition-colors">
                  {t('services')}
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="hover:text-white transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services - Hidden on small screens */}
          <div className="hidden lg:block">
            <h3 className="text-white text-lg font-semibold mb-4">{t('footer_our_services')}</h3>
            <ul className="space-y-2 text-sm">
              {servicesData.map((service) => {
                const slug = service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                return (
                  <li key={service.title}>
                    <Link href={`/services/#${slug}`} className="hover:text-white transition-colors">
                      {t(service.title)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Info - Hidden on small screens */}
          <div className="hidden sm:block">
            <h3 className="text-white text-lg font-semibold mb-4">{t('footer_contact_us')}</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-400" />
                <a
                  href={`mailto:${contacts.emails.general}`}
                  className="hover:text-white transition-colors"
                >
                  {contacts.emails.general}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="text-gray-400" />
                <span>{contacts.phones[0]}</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-gray-400" />
                <span>{contacts.address}</span>
              </li>
              <li className="text-xs mt-2 text-gray-400">
                {contacts.operating_hours}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <p className="text-sm text-center text-gray-500">
            &copy; {currentYear} {t('footer_copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
// This code defines a Footer component for a React application.
// It includes company information, quick links, services, and contact details.
// The footer is styled with Tailwind CSS classes for a modern look.
// The component is responsive, with some sections hidden on smaller screens.
// It also includes social media icons for Twitter and LinkedIn, and a copyright notice that updates with the current year.
// The footer is structured using a grid layout for better organization and readability.
// The component uses React Router's Link for navigation, ensuring smooth transitions within the app.
// The contact information includes an email, phone number, and location, enhancing user accessibility.