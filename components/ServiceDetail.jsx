// components/ServiceDetail.js
// This component does not use hooks or event listeners, so it can be a Server Component by default.

import React from 'react';

/**
 * ServiceDetail Component provides a detailed section for a single service.
 * It includes a title, description, a list of benefits, and an image.
 * The layout can be reversed for alternating visual presentation.
 * @param {object} props - Component props.
 * @param {string} props.title - The main title of the service detail.
 * @param {string} props.description - A detailed description of the service.
 * @param {string[]} props.benefits - An array of benefits related to the service.
 * @param {string} props.image - URL for the service image.
 * @param {string} props.imageAlt - Alt text for the service image.
 * @param {boolean} [props.reverse=false] - If true, reverses the order of image and text.
 */
const ServiceDetail = ({ title, description, benefits, image, imageAlt, reverse = false }) => (
  <div className={`flex flex-col md:flex-row items-center gap-10 py-12 ${reverse ? 'md:flex-row-reverse' : ''}`}>
    <div className="md:w-1/2">
      <img
        src={image}
        alt={imageAlt}
        className="rounded-xl shadow-xl border-4 border-blue-100 w-full h-auto"
      />
    </div>
    <div className="md:w-1/2">
      <h3 className="text-4xl font-bold text-gray-900 mb-6">{title}</h3>
      <p className="text-lg text-gray-700 mb-6">{description}</p>
      <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start">
            {/* Lucide check-circle icon for benefits list */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle text-green-500 mr-2 flex-shrink-0">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.5" />
              <path d="m22 4-7 7-4-4" />
            </svg>
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default ServiceDetail;
