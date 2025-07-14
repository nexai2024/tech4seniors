// components/TestimonialCard.js
// This component does not use hooks or event listeners, so it can be a Server Component by default.
// However, for consistency in this simulated environment, we can omit "use client" unless it has interactive children.

import React from 'react';

/**
 * TestimonialCard Component displays a client testimonial.
 * @param {object} props - Component props.
 * @param {string} props.quote - The testimonial quote.
 * @param {string} props.author - The author of the testimonial.
 * @param {string} props.city - The city of the author.
 */
const TestimonialCard = ({ quote, author, city }) => (
  <div className="bg-blue-50 rounded-xl shadow-md p-8 border border-blue-200 flex flex-col justify-between">
    <p className="text-gray-800 text-xl italic mb-6">
      " {quote} "
    </p>
    <div className="text-right">
      <p className="font-semibold text-blue-700 text-lg">- {author}</p>
      <p className="text-gray-600 text-md">{city}</p>
    </div>
  </div>
);

export default TestimonialCard;
