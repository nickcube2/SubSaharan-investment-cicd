# Email Service Setup Guide

## Overview
The contact forms now use a proper email service with nodemailer for sending emails. This replaces the previous console.log approach with actual email functionality.

## Files Modified
- `src/app/api/contact/route.ts` - New API endpoint for handling form submissions
- `src/app/components/Contact-form.tsx` - Enhanced with API integration and status messages
- `src/app/contact/ContactClient.tsx` - Updated with API integration and status messages
- `.env.local.example` - Template for environment variables

## Setup Instructions

### 1. Install Dependencies
Dependencies are already installed:
```bash
npm install nodemailer @types/nodemailer
```

### 2. Environment Variables
Create a `.env.local` file in the project root with your SMTP credentials:

```env
# Email Service Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=contact@subsaharaninvestmentlink.com
```

### 3. Gmail Setup (Recommended)
If using Gmail:
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: Google Account → Security → App passwords
3. Use the App Password (not your regular password) in `SMTP_PASS`

### 4. Email Features
- ✅ Form validation (required fields, email format)
- ✅ HTML email templates with branding
- ✅ Auto-reply confirmation to users
- ✅ Error handling and user feedback
- ✅ Loading states during submission
- ✅ Success/error status messages

### 5. Testing
1. Set up your `.env.local` file with valid SMTP credentials
2. Run the development server: `npm run dev`
3. Navigate to the contact page or homepage contact form
4. Submit a test message to verify email delivery

### 6. Production Deployment
- Ensure environment variables are set in your hosting platform
- For static export builds, the API routes won't work - consider using a service like EmailJS or Formspree for static hosting

## Email Templates
The system sends two emails:
1. **Admin notification** - Sent to your contact email with the form submission details
2. **User confirmation** - Auto-reply to the user confirming their message was received

Both emails include professional HTML formatting with your company branding.

## Troubleshooting
- Check that all environment variables are set correctly
- Verify SMTP credentials are valid
- Check spam folders for test emails
- Ensure firewall/hosting platform allows SMTP connections on port 587