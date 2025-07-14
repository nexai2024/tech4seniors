// app/contact/page.js
// This file represents the Contact Us page, now also serving as the Login/Sign Up page.

"use client"; // This component uses useState and useFirebase hook, so it must be a Client Component.

import React, { useState } from 'react';
import { useFirebase } from '@/context/FirebaseContext'; // Import useFirebase hook

/**
 * ContactPage Component
 * Provides a contact form for inquiries and displays contact information.
 * Now also includes functionality for user login and sign-up.
 */
const ContactPage = () => {
  const { signIn, signUp, user, isAuthReady } = useFirebase(); // Get auth functions and user from context

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [contactMessageType, setContactMessageType] = useState(''); // 'success' or 'error'
  const [authMessage, setAuthMessage] = useState('');
  const [authMessageType, setAuthMessageType] = useState(''); // 'success' or 'error'
  const [showAuthSection, setShowAuthSection] = useState(false); // State to toggle auth form visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateContactForm = () => {
    const { name, email, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setContactMessage('Please fill in all required fields (Name, Email, Message).');
      setContactMessageType('error');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setContactMessage('Please enter a valid email address.');
      setContactMessageType('error');
      return false;
    }
    return true;
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactMessage('');
    setContactMessageType('');

    if (!validateContactForm()) {
      return;
    }

    setIsSubmittingContact(true);
    try {
      // Simulate API call or email sending for contact form
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Contact form data submitted:', formData);
      setContactMessage('Your message has been sent successfully! We will get back to you shortly.');
      setContactMessageType('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (error) {
      console.error('Contact submission error:', error);
      setContactMessage('There was an error sending your message. Please try again later.');
      setContactMessageType('error');
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthMessage('');
    setAuthMessageType('');
    if (!authEmail || !authPassword) {
      setAuthMessage('Please enter both email and password.');
      setAuthMessageType('error');
      return;
    }
    setIsSubmittingAuth(true);
    try {
      await signIn(authEmail, authPassword);
      setAuthMessage('Logged in successfully!');
      setAuthMessageType('success');
      setAuthEmail('');
      setAuthPassword('');
      // In a real Next.js app, you'd use router.push('/portal')
      // For this simulated environment, we rely on the layout to redirect
    } catch (error) {
      console.error("Login error:", error);
      setAuthMessage(`Login failed: ${error.message}`);
      setAuthMessageType('error');
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setAuthMessage('');
    setAuthMessageType('');
    if (!authEmail || !authPassword) {
      setAuthMessage('Please enter both email and password.');
      setAuthMessageType('error');
      return;
    }
    setIsSubmittingAuth(true);
    try {
      await signUp(authEmail, authPassword);
      setAuthMessage('Account created and logged in successfully!');
      setAuthMessageType('success');
      setAuthEmail('');
      setAuthPassword('');
      // In a real Next.js app, you'd use router.push('/portal')
    } catch (error) {
      console.error("Sign up error:", error);
      setAuthMessage(`Sign up failed: ${error.message}`);
      setAuthMessageType('error');
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  // If user is already logged in, show a message and option to go to portal
  if (isAuthReady && user) {
    return (
      <div className="py-16 px-6 md:px-12 bg-white text-center">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">You are already logged in!</h1>
          <p className="text-xl text-gray-700 mb-8">
            Welcome back, <span className="font-semibold text-blue-700">{user.email}</span>.
            You can access your client portal or continue browsing.
          </p>
          <button
            onClick={() => document.querySelector('nav button[onClick*="portal"]').click()} // Simulate navigation
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg"
          >
            Go to Client Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-6 md:px-12 bg-white">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-12">Contact Us / Client Login</h1>
        <p className="text-xl text-center text-gray-700 mb-16">
          Have questions, need support, or ready to book a consultation? Reach out to our friendly team today!
          Existing clients can also log in here.
        </p>

        {/* Contact Form Section */}
        <div className="bg-blue-50 rounded-xl shadow-md p-8 border border-blue-200 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Send Us a Message</h2>
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div>
              <label htmlFor="contact-name" className="block text-lg font-medium text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="contact-name"
                name="name"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-lg font-medium text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
              <input
                type="email"
                id="contact-email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className="block text-lg font-medium text-gray-700 mb-2">Phone Number (Optional)</label>
              <input
                type="tel"
                id="contact-phone"
                name="phone"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
              />
            </div>
            <div>
              <label htmlFor="contact-service" className="block text-lg font-medium text-gray-700 mb-2">Preferred Service (Optional)</label>
              <select
                id="contact-service"
                name="service"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg bg-white"
                value={formData.service}
                onChange={handleChange}
              >
                <option value="">Select a service...</option>
                <option value="Custom Support">Custom Support</option>
                <option value="Installation & Setup">Installation & Setup</option>
                <option value="Patient Coaching">Patient Coaching</option>
                <option value="Comprehensive Training">Comprehensive Training</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-lg font-medium text-gray-700 mb-2">Your Message <span className="text-red-500">*</span></label>
              <textarea
                id="contact-message"
                name="message"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help you..."
                required
                aria-required="true"
              ></textarea>
            </div>
            <button
              type="submit"
              className={`w-full py-4 px-6 rounded-lg text-xl font-bold shadow-md transition-all duration-300
                ${isSubmittingContact ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300'}
              `}
              disabled={isSubmittingContact}
              aria-live="polite"
            >
              {isSubmittingContact ? 'Sending Message...' : 'Send Message'}
            </button>
            {contactMessage && (
              <div
                className={`mt-4 p-4 rounded-lg text-center text-lg ${contactMessageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                role={contactMessageType === 'error' ? 'alert' : 'status'}
              >
                {contactMessage}
              </div>
            )}
          </form>
        </div>

        {/* Login/Sign Up Section */}
        <div className="bg-gray-50 rounded-xl shadow-md p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Client Login / Sign Up</h2>
          <p className="text-center text-gray-700 mb-8">
            Access your personalized client portal for service history, resources, and more.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div>
              <label htmlFor="auth-email" className="block text-lg font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="auth-email"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="auth-password" className="block text-lg font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="auth-password"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                required
                aria-required="true"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={handleLogin}
                className={`flex-1 py-3 px-6 rounded-lg text-xl font-bold shadow-md transition-all duration-300
                  ${isSubmittingAuth ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300'}
                `}
                disabled={isSubmittingAuth}
                aria-live="polite"
              >
                {isSubmittingAuth ? 'Logging In...' : 'Login'}
              </button>
              <button
                type="button"
                onClick={handleSignUp}
                className={`flex-1 py-3 px-6 rounded-lg text-xl font-bold shadow-md transition-all duration-300
                  ${isSubmittingAuth ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300'}
                `}
                disabled={isSubmittingAuth}
                aria-live="polite"
              >
                {isSubmittingAuth ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
            {authMessage && (
              <div
                className={`mt-4 p-4 rounded-lg text-center text-lg ${authMessageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                role={authMessageType === 'error' ? 'alert' : 'status'}
              >
                {authMessage}
              </div>
            )}
          </form>
        </div>

        <div className="mt-12 text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Other Ways to Connect</h2>
          <p className="text-xl text-gray-700">
            Prefer to speak with someone directly?
          </p>
          <p className="text-2xl font-bold text-blue-700">
            Phone: <a href="tel:+15551234567" className="hover:underline">(555) 123-4567</a>
          </p>
          <p className="text-2xl font-bold text-blue-700">
            Email: <a href="mailto:info@seniortechsolutions.com" className="hover:underline">info@seniortechsolutions.com</a>
          </p>
          <p className="text-lg text-gray-600">
            Operating Hours: Monday - Friday, 9:00 AM - 5:00 PM EST
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
