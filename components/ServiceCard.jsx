// components/ServiceCard.js
"use client"; // This component uses onClick, so it must be a Client Component.

import React from 'react';

/**
 * ServiceCard Component displays a single service with an icon, title, and description.
 * @param {object} props - Component props.
 * @param {string} props.icon - SVG path data for the icon.
 * @param {string} props.title - Title of the service.
 * @param {string} props.description - Brief description of the service.
 * @param {function} props.navigate - Function to navigate to the detailed services page.
 */
const ServiceCard = ({ icon, title, description, navigate }) => (
  <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-200 hover:shadow-xl transition-shadow duration-300">
    <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-6">
      {/* Lucide icon SVG for visual representation of the service */}
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity">
        <path d={icon} />
      </svg>
    </div>
    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-700 text-lg mb-6">{description}</p>
    <button
      onClick={navigate}
      className="mt-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded-lg text-md font-medium shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      Learn More
    </button>
  </div>
);

export default ServiceCard;
