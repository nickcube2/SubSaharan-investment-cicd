'use client';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import ScrollToTop from '../components/ScrollToTop';
import ContactInfo from '../components/Contact-info';
import Image from 'next/image';
import contacts from '../lib/contacts.json';

const heroImage = "/heroimage.jpg";

const ContactClient = () => {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null as string | null,
  });

  const contactLinks = [
    {
      href: `tel:${contacts.phones[0]}`,
      label: t('contact_call_us'),
      icon: FiPhone,
      ariaLabel: t('contact_call_us'),
    },
    {
      href: `mailto:${contacts.emails.general}`,
      label: t('contact_email'),
      icon: FiMail,
      ariaLabel: t('contact_email'),
    },
    {
      href: 'https://goo.gl/maps/xyz',
      label: t('contact_location'),
      icon: FiMapPin,
      ariaLabel: t('contact_location'),
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear any previous errors when user starts typing
    if (status.error) {
      setStatus({ ...status, error: null });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        setStatus({ loading: false, success: false, error: result.error || 'Failed to send message' });
      }
    } catch {
      setStatus({ loading: false, success: false, error: 'Network error. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-0">
      {/* Hero Header */}
      <div className="relative w-full h-64 md:h-[60vh] flex items-center justify-center">
        <Image
          src={heroImage}
          alt="Contact Hero"
          fill
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-[#0F2C64]/40" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-6xl font-bold text-white drop-shadow-lg" style={{ WebkitTextStroke: '2px black' }}>
            {t('contact_page_title')}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-[1000px] mx-auto">
          <p className="text-2xl md:text-5xl font-bold text-center mb-8 leading-snug">
            {t('contact_page_subtitle')}
          </p>

          {/* Contact Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {contactLinks.map(({ href, label, icon: Icon, ariaLabel, target, rel }) => (
              <a
                key={label}
                href={href}
                aria-label={ariaLabel}
                target={target}
                rel={rel}
                className="flex flex-col items-center p-6 rounded-lg hover:bg-gray-800 transition"
              >
                <Icon className="text-4xl mb-2 text-blue-400" />
                <span className="font-semibold text-lg">{label}</span>
              </a>
            ))}
          </div>

          <p className="text-base text-center mb-6">
            {t('contact_description')}
          </p>

          {/* Contact Info (Mobile Centered) */}
          <div className="flex justify-center mb-10">
            <ContactInfo />
          </div>

          {/* Form Section */}
          <div className="bg-gray-800 rounded-xl p-6 sm:p-10 shadow-lg">
            {/* Status Messages */}
            {status.success && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                <p className="font-semibold">Message sent successfully! ✅</p>
                <p className="text-sm">We&apos;ll get back to you within 24-48 hours.</p>
              </div>
            )}
            
            {status.error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p className="font-semibold">Error: {status.error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Name */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <label className="w-full md:w-[180px] text-xl font-semibold text-white">
                  {t('contact_form_name')}
                </label>
                <div className="relative flex-1 w-full">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact_form_name_placeholder')}
                    required
                    className="w-full border-b-2 bg-transparent border-gray-500 focus:outline-none focus:border-white text-lg py-2 pr-10"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <label className="w-full md:w-[180px] text-xl font-semibold text-white">
                  {t('contact_form_email')}
                </label>
                <div className="relative flex-1 w-full">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact_form_email_placeholder')}
                    required
                    className="w-full border-b-2 bg-transparent border-gray-500 focus:outline-none focus:border-white text-lg py-2 pr-10"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <label className="w-full md:w-[180px] text-xl font-semibold text-white">
                  {t('contact_form_message')}
                </label>
                <div className="relative flex-1 w-full">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact_form_message_placeholder')}
                    required
                    className="w-full border-b-2 bg-transparent border-gray-500 focus:outline-none focus:border-white text-lg resize-none py-2 min-h-[100px]"
                  />
                  <span className="absolute right-2 top-4 text-gray-400">💬</span>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={status.loading}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full shadow-lg transition duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status.loading ? 'Sending...' : t('contact_form_submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
};

export default ContactClient; 