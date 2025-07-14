// app/about/page.js
// This file represents the About Us page for the Next.js App Router.

"use client"; // No direct hooks here, but good practice for pages.

import React from 'react';
import TeamMemberCard from '../../components/TeamMemberCard'; // Adjust path for component import

/**
 * AboutPage Component
 * Provides information about the company's mission, values, approach,
 * and introduces the team members.
 */
const AboutPage = () => (
  <div className="py-16 px-6 md:px-12 bg-white">
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-5xl font-bold text-center text-gray-900 mb-12">About SeniorTech Solutions</h1>
      <p className="text-xl text-center text-gray-700 mb-16">
        We are a dedicated team passionate about bridging the digital divide for senior citizens. Our mission is to empower you with the knowledge and confidence to embrace technology, connect with loved ones, and access the vast resources of the internet.
      </p>

      <div className="space-y-12">
        {/* Our Mission */}
        <div className="bg-blue-50 rounded-xl shadow-md p-8 border border-blue-200">
          <h2 className="text-3xl font-bold text-blue-700 mb-4 flex items-center">
            {/* Lucide target icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target mr-3">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            Our Mission
          </h2>
          <p className="text-lg text-gray-700">
            To provide patient, accessible, and personalized technology support, coaching, and training to senior citizens, fostering digital independence and enhancing their quality of life. We believe everyone deserves to feel comfortable and connected in the digital age.
          </p>
        </div>

        {/* Our Values */}
        <div className="bg-green-50 rounded-xl shadow-md p-8 border border-green-200">
          <h2 className="text-3xl font-bold text-green-700 mb-4 flex items-center">
            {/* Lucide gem icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gem mr-3">
              <path d="M6 3v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
              <path d="M12 21v-4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v4" />
              <path d="M22 10a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z" />
            </svg>
            Our Values
          </h2>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
            <li><strong className="text-green-600">Patience:</strong> We take the time needed to ensure understanding, without rush or judgment.</li>
            <li><strong className="text-green-600">Empathy:</strong> We approach every interaction with understanding and respect for individual learning styles and comfort levels.</li>
            <li><strong className="text-green-600">Clarity:</strong> We explain complex concepts in simple, easy-to-digest language.</li>
            <li><strong className="text-green-600">Trust:</strong> We build lasting relationships based on reliability, honesty, and consistent quality service.</li>
            <li><strong className="text-green-600">Empowerment:</strong> Our ultimate goal is to equip seniors with the skills and confidence to use technology independently.</li>
          </ul>
        </div>

        {/* Our Approach */}
        <div className="bg-purple-50 rounded-xl shadow-md p-8 border border-purple-200">
          <h2 className="text-3xl font-bold text-purple-700 mb-4 flex items-center">
            {/* Lucide route icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-route mr-3">
              <circle cx="6" cy="19" r="3" />
              <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7H14a2 2 0 0 1-2-2V3" />
              <circle cx="18" cy="5" r="3" />
            </svg>
            Our Approach
          </h2>
          <p className="text-lg text-gray-700">
            We believe in a hands-on, personalized approach. Whether it's a one-time fix or ongoing coaching, we start by listening to your needs. Our certified technicians and patient coaches work alongside you, providing step-by-step guidance and practical solutions. We ensure you're comfortable and confident before we leave.
          </p>
        </div>

        {/* Team Section (Placeholder) */}
        <div className="bg-gray-50 rounded-xl shadow-md p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TeamMemberCard
              name="Jane Doe"
              title="Founder & Lead Technician"
              description="With over 15 years in IT support and a passion for community service, Jane founded SeniorTech Solutions to provide compassionate tech help to seniors."
              image="https://placehold.co/150x150/A7C7E7/2C3E50?text=Jane"
            />
            <TeamMemberCard
              name="John Smith"
              title="Senior Tech Coach"
              description="John specializes in making complex tech simple. His patient teaching style helps seniors master new skills with ease and confidence."
              image="https://placehold.co/150x150/A7C7E7/2C3E50?text=John"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;
