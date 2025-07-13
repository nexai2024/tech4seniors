"use client"
import React, { useState, useEffect, createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

// Define the Firebase configuration and app ID from the global variables

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJfuTdGmpIxhsznGade8-Q3VGAOlUGZjA",
  authDomain: "tech4seniors.firebaseapp.com",
  projectId: "tech4seniors",
  storageBucket: "tech4seniors.firebasestorage.app",
  messagingSenderId: "594930608812",
  appId: "1:594930608812:web:c05f8303199cf9da3b8d09",
  measurementId: "G-3JYX9JTZ9R"
};
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Initialize Firebase App and Firestore outside of components to prevent re-initialization
let firebaseApp;
let db;
let auth;

try {
  firebaseApp = initializeApp(firebaseConfig);
  db = getFirestore(firebaseApp);
  auth = getAuth(firebaseApp);
} catch (error) {
  console.error("Firebase initialization error:", error);
  // Handle cases where Firebase might already be initialized or config is missing
}

// Create a context for Firebase services and user ID
const FirebaseContext = createContext(null);

// Firebase Provider Component
const FirebaseProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [firebaseInstances, setFirebaseInstances] = useState({ db: null, auth: null });

  useEffect(() => {
    if (!firebaseApp) {
      console.error("Firebase app not initialized. Cannot proceed with authentication.");
      return;
    }

    // Sign in with custom token or anonymously
    const signIn = async () => {
      try {
        if (initialAuthToken) {
          await signInWithCustomToken(auth, initialAuthToken);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Firebase authentication error:", error);
      } finally {
        setIsAuthReady(true); // Mark auth as ready even if sign-in fails
      }
    };

    signIn();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
      setIsAuthReady(true);
    });

    setFirebaseInstances({ db, auth });

    return () => unsubscribe(); // Cleanup auth listener
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <FirebaseContext.Provider value={{ ...firebaseInstances, userId, isAuthReady }}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Custom hook to use Firebase services
const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};


// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  return (
    <FirebaseProvider>
      <div className="min-h-screen bg-gray-50 font-inter text-gray-800 antialiased flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg py-4 px-6 md:px-12">
          <nav className="container mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="text-3xl font-bold tracking-tight mb-4 md:mb-0">
              <button onClick={() => navigate('home')} className="focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-1">
                Tech4Seniors
              </button>
            </div>
            <ul className="flex flex-wrap justify-center space-x-4 md:space-x-8 text-lg font-medium">
              <li><NavLink onClick={() => navigate('home')} active={currentPage === 'home'}>Home</NavLink></li>
              <li><NavLink onClick={() => navigate('services')} active={currentPage === 'services'}>Services</NavLink></li>
              <li><NavLink onClick={() => navigate('about')} active={currentPage === 'about'}>About Us</NavLink></li>
              <li><NavLink onClick={() => navigate('testimonials')} active={currentPage === 'testimonials'}>Testimonials</NavLink></li>
              <li><NavLink onClick={() => navigate('faq')} active={currentPage === 'faq'}>FAQ</NavLink></li>
              <li><NavLink onClick={() => navigate('contact')} active={currentPage === 'contact'}>Contact</NavLink></li>
            </ul>
          </nav>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow">
          {currentPage === 'home' && <HomePage navigate={navigate} />}
          {currentPage === 'services' && <ServicesPage />}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'testimonials' && <TestimonialsPage />}
          {currentPage === 'faq' && <FAQPage />}
          {currentPage === 'contact' && <ContactPage />}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 px-6 md:px-12 mt-12">
          <div className="container mx-auto text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Tech4Seniors. All rights reserved.</p>
            <p className="mt-2">Empowering Seniors with Technology, One Step at a Time.</p>
          </div>
        </footer>
      </div>
    </FirebaseProvider>
  );
};

// NavLink Component for consistent styling and accessibility
const NavLink = ({ onClick, children, active }) => (
  <button
    onClick={onClick}
    className={`py-2 px-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300
      ${active ? 'bg-blue-700 text-white shadow-md' : 'hover:bg-blue-500 hover:text-white'}
    `}
    aria-current={active ? 'page' : undefined}
  >
    {children}
  </button>
);

// HomePage Component
const HomePage = ({ navigate }) => (
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
          onClick={() => navigate('contact')}
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
            navigate={() => navigate('services')}
          />
          <ServiceCard
            icon="M12 22v-4h4v-4M2 10l10-8 10 8M6 17v-7h12v7a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z"
            title="Installation & Setup"
            description="Hassle-free setup of new devices, Wi-Fi, printers, smart TVs, and more."
            navigate={() => navigate('services')}
          />
          <ServiceCard
            icon="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
            title="Patient Coaching"
            description="One-on-one guidance on using specific apps, online safety, and digital communication."
            navigate={() => navigate('services')}
          />
          <ServiceCard
            icon="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M10 13h4M10 17h4"
            title="Comprehensive Training"
            description="Structured lessons to master essential tech skills like video calls, email, and online banking."
            navigate={() => navigate('services')}
          />
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('services')}
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
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Tech4Seniors?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 text-lg text-gray-700">
            <p><strong className="text-blue-600">Patience & Empathy:</strong> We understand that technology can be daunting. Our experts are trained to listen, explain clearly, and move at your pace.</p>
            <p><strong className="text-blue-600">Personalized Approach:</strong> No one-size-fits-all solutions. We tailor our support, coaching, and training to your specific needs and comfort level.</p>
            <p><strong className="text-blue-600">Local & Trusted:</strong> We're part of your community, offering reliable and friendly service right to your door.</p>
            <p><strong className="text-blue-600">Empowerment, Not Just Fixes:</strong> Our goal is to help you feel confident and independent using technology, not just to solve a problem.</p>
          </div>
          <div className="flex justify-center">
            <img
              src="https://placehold.co/500x350/E0F2F7/2C3E50?text=Friendly+Tech+Support"
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
            quote="Tech4Seniors helped me set up my new smart TV and showed me how to use streaming services. They were so patient and kind!"
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
            onClick={() => navigate('testimonials')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Read More Success Stories
          </button>
        </div>
      </div>
    </section>

    {/* Call to Action Section */}
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-black py-20 px-6 md:px-12 text-center">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Simplify Your Tech Life?</h2>
        <p className="text-xl md:text-2xl mb-10">
          Let Tech4Seniors provide the patient, expert assistance you deserve.
        </p>
        <button
          onClick={() => navigate('contact')}
          className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white text-xl"
        >
          Get Started Today
        </button>
      </div>
    </section>
  </>
);

// ServiceCard Component
const ServiceCard = ({ icon, title, description, navigate }) => (
  <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-200 hover:shadow-xl transition-shadow duration-300">
    <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-6">
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

// TestimonialCard Component
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

// ServicesPage Component
const ServicesPage = () => (
  <div className="py-16 px-6 md:px-12 bg-white">
    <div className="container mx-auto">
      <h1 className="text-5xl font-bold text-center text-gray-900 mb-12">Our Comprehensive Tech Services</h1>
      <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-16">
        At Tech4Seniors, we offer a range of personalized services designed to help seniors confidently navigate the digital world. We focus on patience, clarity, and practical solutions.
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
        image="https://placehold.co/600x400/D1E9F7/2C3E50?text=Custom+Support"
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
        image="https://placehold.co/600x400/E0F2F7/2C3E50?text=Installation+Setup"
        imageAlt="Tech expert setting up a new device for a senior"
        reverse={true} // Alternate layout
      />

      {/* Service Detail: Patient Coaching */}
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
        image="https://placehold.co/600x400/C8E6F7/2C3E50?text=Patient+Coaching"
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
        image="https://placehold.co/600x400/B2D8F7/2C3E50?text=Comprehensive+Training"
        imageAlt="Group of seniors in a tech training class"
        reverse={true} // Alternate layout
      />

      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
        <p className="text-xl text-gray-700 mb-8">
          Contact us today to discuss your specific needs and find the perfect tech solution for you.
        </p>
        <button
          onClick={() => document.querySelector('nav button[aria-current="page"][onClick*="contact"]').click()} // Simulate navigation to contact page
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 text-xl"
        >
          Contact Us for Personalized Help
        </button>
      </div>
    </div>
  </div>
);

// ServiceDetail Component for consistent layout
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

// AboutPage Component
const AboutPage = () => (
  <div className="py-16 px-6 md:px-12 bg-white">
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-5xl font-bold text-center text-gray-900 mb-12">About Tech4Seniors</h1>
      <p className="text-xl text-center text-gray-700 mb-16">
        We are a dedicated team passionate about bridging the digital divide for senior citizens. Our mission is to empower you with the knowledge and confidence to embrace technology, connect with loved ones, and access the vast resources of the internet.
      </p>

      <div className="space-y-12">
        {/* Our Mission */}
        <div className="bg-blue-50 rounded-xl shadow-md p-8 border border-blue-200">
          <h2 className="text-3xl font-bold text-blue-700 mb-4 flex items-center">
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
              description="With over 15 years in IT support and a passion for community service, Jane founded Tech4Seniors to provide compassionate tech help to seniors."
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

// TeamMemberCard Component
const TeamMemberCard = ({ name, title, description, image }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
    <img
      src={image}
      alt={`Portrait of ${name}`}
      className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-200"
    />
    <h3 className="text-2xl font-semibold text-gray-900 mb-1">{name}</h3>
    <p className="text-blue-600 font-medium mb-3">{title}</p>
    <p className="text-gray-700 text-md">{description}</p>
  </div>
);

// TestimonialsPage Component
const TestimonialsPage = () => {
  const { db, isAuthReady, userId } = useFirebase();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch testimonials from Firestore
  useEffect(() => {
    if (!db || !isAuthReady) {
      console.log("Firestore not ready or user not authenticated.");
      return;
    }

    setLoading(true);
    setError(null);

    // Define the collection path for public data
    const testimonialsCollectionRef = collection(db, `artifacts/${appId}/public/data/testimonials`);
    const q = query(testimonialsCollectionRef, orderBy('createdAt', 'desc')); // Order by creation time

    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const fetchedTestimonials = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTestimonials(fetchedTestimonials);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials. Please try again later.");
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Clean up listener on unmount
  }, [db, isAuthReady, appId]);


  return (
    <div className="py-16 px-6 md:px-12 bg-white">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-12">Hear From Our Happy Clients</h1>
        <p className="text-xl text-center text-gray-700 mb-16">
          We are incredibly proud of the positive impact we've had on the lives of our senior clients. Read their stories below.
        </p>

        {loading && <div className="text-center text-blue-600 text-xl">Loading testimonials...</div>}
        {error && <div className="text-center text-red-600 text-xl">{error}</div>}
        {!loading && testimonials.length === 0 && !error && (
          <div className="text-center text-gray-600 text-xl">No testimonials yet. Be the first to share your experience!</div>
        )}

        <div className="grid grid-cols-1 gap-10">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-blue-50 rounded-xl shadow-md p-8 border border-blue-200">
              <p className="text-gray-800 text-xl italic mb-6">
                " {testimonial.quote} "
              </p>
              <div className="text-right">
                <p className="font-semibold text-blue-700 text-lg">- {testimonial.author}</p>
                <p className="text-gray-600 text-md">{testimonial.city}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add a form to submit new testimonials */}
        <AddTestimonialForm db={db} userId={userId} isAuthReady={isAuthReady} appId={appId} />
      </div>
    </div>
  );
};

// AddTestimonialForm Component
const AddTestimonialForm = ({ db, userId, isAuthReady, appId }) => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');
    setMessageType('');

    if (!quote || !author || !city) {
      setSubmitMessage('Please fill in all fields.');
      setMessageType('error');
      return;
    }

    if (!db || !isAuthReady || !userId) {
      setSubmitMessage('Authentication not ready. Please try again.');
      setMessageType('error');
      console.error("Firebase or user not ready for testimonial submission.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Store in public data collection
      const testimonialsCollectionRef = collection(db, `artifacts/${appId}/public/data/testimonials`);
      await addDoc(testimonialsCollectionRef, {
        quote,
        author,
        city,
        createdAt: serverTimestamp(), // Use server timestamp for consistency
        submittedBy: userId // Record who submitted it
      });
      setSubmitMessage('Thank you for your testimonial! It will appear shortly.');
      setMessageType('success');
      setQuote('');
      setAuthor('');
      setCity('');
    } catch (error) {
      console.error("Error adding testimonial:", error);
      setSubmitMessage('Failed to submit testimonial. Please try again.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16 p-8 bg-gray-50 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Share Your Experience</h2>
      <p className="text-center text-gray-700 mb-8">
        Your feedback helps others. Please share your positive experience with Tech4Seniors!
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
            placeholder="e.g., 'Tech4Seniors made learning new software so easy!'"
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
          aria-live="polite"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
        </button>
        {submitMessage && (
          <div
            className={`mt-4 p-4 rounded-lg text-center text-lg ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            role={messageType === 'error' ? 'alert' : 'status'}
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


// FAQPage Component
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
          onClick={() => document.querySelector('nav button[aria-current="page"][onClick*="contact"]').click()} // Simulate navigation to contact page
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 text-xl"
        >
          Contact Us
        </button>
      </div>
    </div>
  </div>
);

// FAQItem Component (Accordion-like)
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <button
        className="flex justify-between items-center w-full p-6 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 text-2xl font-semibold text-gray-900 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question.replace(/\s/g, '-')}`}
      >
        {question}
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
        id={`faq-answer-${question.replace(/\s/g, '-')}`}
        className={`px-6 pb-6 text-lg text-gray-700 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100 pt-4' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        {answer}
      </div>
    </div>
  );
};

// ContactPage Component
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setSubmitMessage('Please fill in all required fields (Name, Email, Message).');
      setMessageType('error');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitMessage('Please enter a valid email address.');
      setMessageType('error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');
    setMessageType('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call or email sending
      // In a real Next.js app, this would be an API route
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      console.log('Form data submitted:', formData);
      setSubmitMessage('Your message has been sent successfully! We will get back to you shortly.');
      setMessageType('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' }); // Clear form
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitMessage('There was an error sending your message. Please try again later.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 px-6 md:px-12 bg-white">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-12">Contact Us</h1>
        <p className="text-xl text-center text-gray-700 mb-16">
          Have questions, need support, or ready to book a consultation? Reach out to our friendly team today!
        </p>

        <div className="bg-blue-50 rounded-xl shadow-md p-8 border border-blue-200">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300'}
              `}
              disabled={isSubmitting}
              aria-live="polite"
            >
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </button>
            {submitMessage && (
              <div
                className={`mt-4 p-4 rounded-lg text-center text-lg ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                role={messageType === 'error' ? 'alert' : 'status'}
              >
                {submitMessage}
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

// Ensure Tailwind CSS is loaded
const TailwindCSS = () => (
  <script src="https://cdn.tailwindcss.com"></script>
);

// Add Inter font
const InterFont = () => (
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
);

// Render the App with necessary head elements
export default function MainApp() {
  return (
    <>
      <TailwindCSS />
      <InterFont />
      <App />
    </>
  );
}
