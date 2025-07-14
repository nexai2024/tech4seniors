// app/faq/page.js
// This file represents the FAQ page for the Next.js App Router.

"use client"; // This component uses useState in its child (FAQItem), so it must be a Client Component.

import React from 'react';
import FAQItem from '../../components/FAQItem'; // Adjust path for component import

/**
 * FAQPage Component
 * Displays a list of Frequently Asked Questions using collapsible FAQItem components.
 */
const FAQPage = () => (
  <div className="py-16 px-6 md:px-12 bg-white">
    <div className="container mx-auto max-w-3xl">
      <h1 className="text-5xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h1>
      <p className="text-xl text-center text-gray-700 mb-16">
        Here are some common questions we receive. If you don't find your answer here, please don't hesitate to contact us!
      </p>

      <div className="space-y-6">
        <FAQItem
          question="What types of devices do you support?"
          answer="We support a wide range of devices including desktop computers (Windows & Mac), laptops, smartphones (iPhone & Android), tablets (iPad & Android), printers, Wi-Fi routers, smart TVs, streaming devices (Roku, Apple TV, Fire Stick), and smart home devices (thermostats, smart speakers, smart lights)."
        />
        <FAQItem
          question="How do I book an appointment?"
          answer="You can book an appointment by filling out the contact form on our 'Contact Us' page, or by calling us directly at the phone number listed on our site. We'll get back to you promptly to schedule a convenient time."
        />
        <FAQItem
          question="Do you offer in-home service?"
          answer="Yes, our primary service model is in-home support, coaching, and training. We believe this provides the most comfortable and effective learning environment for our senior clients. We also offer remote support for certain issues."
        />
        <FAQItem
          question="What are your service areas?"
          answer="We proudly serve the greater Philadelphia metropolitan area, including specific counties in Pennsylvania, New Jersey, and Delaware. Please contact us to confirm if your location is within our service range."
        />
        <FAQItem
          question="How much do your services cost?"
          answer="Our pricing is transparent and competitive. We offer hourly rates for custom support and discounted packages for coaching and training sessions. Please visit our 'Services' page or contact us for a detailed quote based on your specific needs."
        />
        <FAQItem
          question="Are your technicians background-checked?"
          answer="Absolutely. All our technicians and coaches undergo thorough background checks and are trained to provide respectful, patient, and secure service. Your safety and peace of mind are our top priorities."
        />
        <FAQItem
          question="What if I'm not satisfied with the service?"
          answer="Your satisfaction is guaranteed. If you're not completely happy with our service, please let us know immediately. We are committed to resolving any issues and ensuring you receive the support you need."
        />
      </div>

      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Still Have Questions?</h2>
        <p className="text-xl text-gray-700 mb-8">
          We're here to help! Reach out to our friendly team for any further inquiries.
        </p>
        <button
          // This simulates navigation to the contact page within the current single-page app structure
          // In a true Next.js app, this would be a <Link href="/contact"> component.
          onClick={() => document.querySelector('nav button[aria-current="page"][onClick*="contact"]').click()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 text-xl"
        >
          Contact Us
        </button>
      </div>
    </div>
  </div>
);

export default FAQPage;
