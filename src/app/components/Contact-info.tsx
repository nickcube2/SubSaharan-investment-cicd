import React from 'react';
import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaPinterestP,
  FaHouzz,
} from 'react-icons/fa6';
import contacts from '../lib/contacts.json';

const ContactInfo: React.FC = () => {
  return (
    <div className=" py-12 ">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
        {/* Left Section */}
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-lg">General Inquiries</h3>
            <p className="text-md">{contacts.emails.general}</p>
          </div>
         
          <div>
            <h3 className="font-bold text-lg">Corporate Services</h3>
            <p className="text-md">{contacts.emails.corporate}</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-lg">Phone</h3>
            <p className="text-md">{contacts.phones[0]}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg">Operating Hours</h3>
            <p className="text-md">{contacts.operating_hours}</p>
          </div>
         
          <div className="flex gap-5 pt-2 text-2xl">
            <a href={contacts.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href={contacts.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href={contacts.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <FaXTwitter />
            </a>
            <a href={contacts.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href={contacts.social.pinterest} target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <FaPinterestP />
            </a>
            <a href={contacts.social.houzz} target="_blank" rel="noopener noreferrer" aria-label="Houzz">
              <FaHouzz />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
