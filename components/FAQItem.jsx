// components/FAQItem.js
"use client"; // This component uses useState, so it must be a Client Component.

import React, { useState } from 'react';

/**
 * FAQItem Component implements an accordion-like item for Frequently Asked Questions.
 * @param {object} props - Component props.
 * @param {string} props.question - The question text.
 * @param {string} props.answer - The answer text.
 */
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <button
        className="flex justify-between items-center w-full p-6 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 text-2xl font-semibold text-gray-900 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        // Generate a unique ID for aria-controls
        aria-controls={`faq-answer-${question.replace(/\s/g, '-').toLowerCase()}`}
      >
        {question}
        {/* SVG for accordion arrow, rotates based on isOpen state */}
        <svg
          className={`w-8 h-8 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div
        id={`faq-answer-${question.replace(/\s/g, '-').toLowerCase()}`}
        className={`px-6 pb-6 text-lg text-gray-700 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100 pt-4' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        {answer}
      </div>
    </div>
  );
};

export default FAQItem;
