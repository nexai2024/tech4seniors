// app/page.js
// This file represents the root page (Home Page) for the Next.js App Router.

"use client"; // This component uses useState, so it must be a Client Component.

import React from 'react';
import ServiceCard from '../components/ServiceCard'; // Import reusable components
import TestimonialCard from '../components/TestimonialCard';

/**
 * HomePage Component
 * Displays the main landing page content including hero, services overview,
 * "Why Choose Us" section, and testimonials.
 * @param {object} props - Component props.
 * @param {function} props.navigate - Function to navigate to other pages (simulated for this environment).
 */
const HomePage = () => (
  <>
    {/* Hero Section */}
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-6 md:px-12 text-center">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Tech Support You Can Trust, <span className="text-blue-600">Designed for Seniors</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-10">
          Empowering senior citizens with personalized, patient, and easy-to-understand technology assistance.
          From setting up new devices to mastering video calls, we're here for you.
        </p>
        <button
          onClick={() => navigate('contact')} // Use the navigate prop from layout
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 text-xl"
        >
          Book a Free Consultation
        </button>
      </div>
    </section>

    {/* Services Overview */}
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Services at a Glance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard
            icon="M10 21h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-7"
            title="Custom Support"
            description="Personalized troubleshooting for your computer, phone, tablet, and smart home devices."
          />
          <ServiceCard
            icon="M12 22v-4h4v-4M2 10l10-8 10 8M6 17v-7h12v7a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z"
            title="Installation & Setup"
            description="Hassle-free setup of new devices, Wi-Fi, printers, smart TVs, and more."
          />
          <ServiceCard
            icon="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
            title="Patient Coaching"
            description="One-on-one guidance on using specific apps, online safety, and digital communication."
          />
          <ServiceCard
            icon="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M10 13h4M10 17h4"
            title="Comprehensive Training"
            description="Structured lessons to master essential tech skills like video calls, email, and online banking."
          />
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('services')} // Use the navigate prop
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            Explore All Services
          </button>
        </div>
      </div>
    </section>

    {/* Why Choose Us Section */}
    <section className="py-16 px-6 md:px-12 bg-blue-50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why SeniorTech Solutions?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 text-lg text-gray-700">
            <p><strong className="text-blue-600">Patience & Empathy:</strong> We understand that technology can be daunting. Our experts are trained to listen, explain clearly, and move at your pace.</p>
            <p><strong className="text-blue-600">Personalized Approach:</strong> No one-size-fits-all solutions. We tailor our support, coaching, and training to your specific needs and comfort level.</p>
            <p><strong className="text-blue-600">Local & Trusted:</strong> We're part of your community, offering reliable and friendly service right to your door.</p>
            <p><strong className="text-blue-600">Empowerment, Not Just Fixes:</strong> Our goal is to help you feel confident and independent using technology, not just to solve a problem.</p>
          </div>
          <div className="flex justify-center">
            <img
              src="/techsupport.png"
              alt="Senior woman happily using a tablet with a tech support person"
              className="rounded-xl shadow-xl border-4 border-blue-200"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials Section */}
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TestimonialCard
            quote="SeniorTech Solutions helped me set up my new smart TV and showed me how to use streaming services. They were so patient and kind!"
            author="Eleanor R."
            city="Philadelphia, PA"
          />
          <TestimonialCard
            quote="I finally feel confident using email and video calls to connect with my grandchildren. The training was incredibly clear and easy to follow."
            author="Arthur L."
            city="Cherry Hill, NJ"
          />
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('testimonials')} // Use the navigate prop
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Read More Success Stories
          </button>
        </div>
      </div>
    </section>

    {/* Call to Action Section */}
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 md:px-12 text-center">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Simplify Your Tech Life?</h2>
        <p className="text-xl md:text-2xl mb-10">
          Let SeniorTech Solutions provide the patient, expert assistance you deserve.
        </p>
        <button
          onClick={() => navigate('contact')} // Use the navigate prop
          className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white text-xl"
        >
          Get Started Today
        </button>
      </div>
    </section>
  </>
);

export default HomePage;
