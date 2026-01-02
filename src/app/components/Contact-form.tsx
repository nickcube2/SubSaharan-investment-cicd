import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  
  const [status, setStatus] = useState<FormStatus>({
    loading: false,
    success: false,
    error: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        setStatus({ loading: false, success: false, error: result.error || 'Failed to send message' });
      }
    } catch {
      setStatus({ loading: false, success: false, error: 'Network error. Please try again.' });
    }
  };

  return (
    <div className=" mx-auto p-6 text-white">
      <h2 className="text-3xl font-bold mb-2">We&apos;d love to hear from you.</h2>
      <p className="text-gray-500 mb-10">
        Please submit your question here and we will respond as quickly as possible.
      </p>

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
        {/* Name Field */}
        <div>
          <label className="block text-4xl font-bold text-gray-900 mb-1">
            My name is
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name here*"
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-black text-lg py-2 pr-10"
              required
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-4xl font-bold text-gray-900 mb-1">
            Here is my email
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email here*"
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-black text-lg py-2 pr-10"
              required
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-4xl font-bold text-gray-900 mb-1">I need</label>
          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your project details here"
              rows={4}
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-black text-lg py-2 pr-10 resize-none"
              required
            />
            <span className="absolute right-2 top-4 text-gray-400">💬</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={status.loading}
            className={`px-8 py-3 rounded-full shadow-lg transition duration-300 ${
              status.loading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gray-900 hover:bg-gray-800'
            } text-white`}
          >
            {status.loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              'Send message'
            )}
          </button>
        </div>

        {/* Privacy Note */}
        <p className="text-sm text-gray-500 mt-4">
          We are committed to protecting your privacy. We will never collect information about you without your explicit consent.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
