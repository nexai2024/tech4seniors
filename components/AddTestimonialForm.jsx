// components/AddTestimonialForm.js
"use client"; // This component uses useState, so it must be a Client Component.

import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Import necessary Firestore functions

/**
 * AddTestimonialForm Component
 * A form for users to submit new testimonials, integrated with Firestore.
 * @param {object} props - Component props.
 * @param {object} props.db - Firestore database instance.
 * @param {string} props.userId - Current user's ID.
 * @param {boolean} props.isAuthReady - Flag indicating if Firebase auth is ready.
 * @param {string} props.appId - The application ID for Firestore collection path.
 */
const AddTestimonialForm = ({ db, userId, isAuthReady, appId }) => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  /**
   * Handles the form submission.
   * Validates input, submits data to Firestore, and provides feedback to the user.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage(''); // Clear previous messages
    setMessageType('');

    // Client-side validation
    if (!quote || !author || !city) {
      setSubmitMessage('Please fill in all fields.');
      setMessageType('error');
      return;
    }

    // Check if Firebase and user authentication are ready
    if (!db || !isAuthReady || !userId) {
      setSubmitMessage('Authentication not ready. Please try again.');
      setMessageType('error');
      console.error("Firebase or user not ready for testimonial submission.");
      return;
    }

    setIsSubmitting(true); // Disable button and show loading state
    try {
      // Define the collection path for public data as per Firestore security rules
      const testimonialsCollectionRef = collection(db, `artifacts/${appId}/public/data/testimonials`);
      await addDoc(testimonialsCollectionRef, {
        quote,
        author,
        city,
        createdAt: serverTimestamp(), // Use server timestamp for consistency
        submittedBy: userId // Record the ID of the user who submitted the testimonial
      });
      setSubmitMessage('Thank you for your testimonial! It will appear shortly.');
      setMessageType('success');
      // Clear form fields on successful submission
      setQuote('');
      setAuthor('');
      setCity('');
    } catch (error) {
      console.error("Error adding testimonial:", error);
      setSubmitMessage('Failed to submit testimonial. Please try again.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  return (
    <div className="mt-16 p-8 bg-gray-50 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Share Your Experience</h2>
      <p className="text-center text-gray-700 mb-8">
        Your feedback helps others. Please share your positive experience with SeniorTech Solutions!
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="testimonial-quote" className="block text-lg font-medium text-gray-700 mb-2">Your Testimonial</label>
          <textarea
            id="testimonial-quote"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
            rows="5"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="e.g., 'SeniorTech Solutions made learning new software so easy!'"
            required
            aria-required="true"
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="testimonial-author" className="block text-lg font-medium text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              id="testimonial-author"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g., Eleanor R."
              required
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="testimonial-city" className="block text-lg font-medium text-gray-700 mb-2">Your City</label>
            <input
              type="text"
              id="testimonial-city"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g., Philadelphia, PA"
              required
              aria-required="true"
            />
          </div>
        </div>
        <button
          type="submit"
          className={`w-full py-3 px-6 rounded-lg text-xl font-bold shadow-md transition-all duration-300
            ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300'}
          `}
          disabled={isSubmitting}
          aria-live="polite" // Announce changes to screen readers
        >
          {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
        </button>
        {submitMessage && (
          <div
            className={`mt-4 p-4 rounded-lg text-center text-lg ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            role={messageType === 'error' ? 'alert' : 'status'} // ARIA role for alerts/status messages
          >
            {submitMessage}
          </div>
        )}
      </form>
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>Your User ID for this session: <span className="font-mono text-blue-800 break-all">{userId || 'Not authenticated'}</span></p>
        <p className="text-xs mt-1">This ID is used for internal tracking of submissions.</p>
      </div>
    </div>
  );
};

export default AddTestimonialForm;
