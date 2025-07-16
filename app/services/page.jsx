// app/services/page.js
// This file represents the Services page for the Next.js App Router.

"use client"; // This component doesn't strictly need it, but it's good practice for pages with interactive children.

import React from 'react';
import ServiceDetail from '@/components/ServiceDetail'; // Adjust path for component import

/**
 * ServicesPage Component
 * Displays a detailed overview of all the tech services offered.
 */
const ServicesPage = () => (
  <div className="py-16 px-6 md:px-12 bg-white">
    <div className="container mx-auto">
      <h1 className="text-5xl font-bold text-center text-gray-900 mb-12">Our Comprehensive Tech Services</h1>
      <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-16">
        At SeniorTech Solutions, we offer a range of personalized services designed to help seniors confidently navigate the digital world. We focus on patience, clarity, and practical solutions.
      </p>

      {/* Service Detail: Custom Support */}
      <ServiceDetail
        title="Custom Tech Support"
        description="Experiencing a glitch? Need help understanding an error message? Our custom support service provides on-demand troubleshooting and problem-solving for all your devices. We'll patiently walk you through the solutions, ensuring you understand every step."
        benefits={[
          "Resolve frustrating computer issues (slowdowns, viruses, software problems)",
          "Troubleshoot smartphone and tablet glitches",
          "Fix smart home device connectivity issues",
          "Get clear, simple explanations for complex problems",
          "On-site or remote assistance available"
        ]}
        image="/custom-support.png"
        imageAlt="Senior man receiving patient tech support"
      />

      {/* Service Detail: Installation & Setup */}
      <ServiceDetail
        title="Installation & Device Setup"
        description="Getting a new device should be exciting, not stressful! We handle all the technical aspects of setting up your new computer, phone, printer, Wi-Fi, smart TV, or any other gadget. We ensure everything is connected, configured, and ready for you to use."
        benefits={[
          "New computer setup and data transfer",
          "Printer installation and troubleshooting",
          "Home Wi-Fi network setup and optimization",
          "Smart TV and streaming device configuration",
          "Smart home device installation (thermostats, lights, speakers)"
        ]}
        image="/setup.png"
        imageAlt="Tech expert setting up a new device for a senior"
        reverse={true} // Alternate layout
      />

      {/* Service Detail: Patience-Focused Coaching */}
      <ServiceDetail
        title="Patient 1-on-1 Coaching"
        description="Want to learn how to use a specific app, manage your photos, or stay safe online? Our coaching sessions are tailored to your interests and skill level. We provide gentle, step-by-step guidance in a comfortable, pressure-free environment."
        benefits={[
          "Mastering video calls (Zoom, FaceTime, Skype)",
          "Organizing and sharing digital photos",
          "Understanding online safety and privacy",
          "Using social media to connect with family and friends",
          "Navigating specific apps and software"
        ]}
        image="/patience-focused.png"
        imageAlt="Senior woman learning from a tech coach"
      />

      {/* Service Detail: Comprehensive Training */}
      <ServiceDetail
        title="Comprehensive Tech Training"
        description="Build foundational tech skills with our structured training programs. Whether you're new to computers or want to enhance your digital literacy, our courses cover essential topics to help you feel more confident and independent online."
        benefits={[
          "Email basics and advanced usage",
          "Safe online banking and shopping",
          "Internet browsing and information searching",
          "Understanding your smartphone or tablet",
          "Managing digital documents and files"
        ]}
        image="/training.webp"
        imageAlt="Group of seniors in a tech training class"
        reverse={true} // Alternate layout
      />

      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
        <p className="text-xl text-gray-700 mb-8">
          Contact us today to discuss your specific needs and find the perfect tech solution for you.
        </p>
        <button
          // This simulates navigation to the contact page within the current single-page app structure
          // In a true Next.js app, this would be a <Link href="/contact"> component.
          onClick={() => document.querySelector('nav button[aria-current="page"][onClick*="contact"]').click()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 text-xl"
        >
          Contact Us for Personalized Help
        </button>
      </div>
    </div>
  </div>
);

export default ServicesPage;
