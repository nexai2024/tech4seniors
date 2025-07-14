// app/testimonials/page.js
// This file represents the Testimonials page for the Next.js App Router.

"use client"; // This component uses useState and useEffect, so it must be a Client Component.

import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useFirebase } from '../../context/FirebaseContext'; // Adjust path for context import
import TestimonialCard from '../../components/TestimonialCard'; // Adjust path for component import
import AddTestimonialForm from '../../components/AddTestimonialForm'; // Adjust path for component import

/**
 * TestimonialsPage Component
 * Fetches and displays client testimonials from Firestore.
 * Also includes a form for users to submit new testimonials.
 */
const TestimonialsPage = () => {
  const { db, isAuthReady, userId, appId } = useFirebase(); // Get Firebase instances and user info from context
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect to fetch testimonials from Firestore in real-time
  useEffect(() => {
    // Only proceed if Firestore is initialized and authentication state is ready
    if (!db || !isAuthReady) {
      console.log("Firestore not ready or user not authenticated. Skipping testimonial fetch.");
      return;
    }

    setLoading(true); // Set loading state to true
    setError(null); // Clear any previous errors

    // Define the collection path for public data as per Firestore security rules
    const testimonialsCollectionRef = collection(db, `artifacts/${appId}/public/data/testimonials`);
    // Create a query to order testimonials by creation time (newest first)
    const q = query(testimonialsCollectionRef, orderBy('createdAt', 'desc'));

    // Set up a real-time listener (onSnapshot)
    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        // Map the Firestore document snapshot to an array of testimonial objects
        const fetchedTestimonials = snapshot.docs.map(doc => ({
          id: doc.id, // Document ID
          ...doc.data() // All other fields from the document
        }));
        setTestimonials(fetchedTestimonials); // Update testimonials state
        setLoading(false); // Set loading state to false
      },
      (err) => {
        // Handle errors during data fetching
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials. Please try again later.");
        setLoading(false); // Set loading state to false even on error
      }
    );

    // Cleanup function: unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [db, isAuthReady, appId]); // Re-run effect if db, isAuthReady, or appId changes

  return (
    <div className="py-16 px-6 md:px-12 bg-white">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-12">Hear From Our Happy Clients</h1>
        <p className="text-xl text-center text-gray-700 mb-16">
          We are incredibly proud of the positive impact we've had on the lives of our senior clients. Read their stories below.
        </p>

        {/* Loading, Error, and No Testimonials messages */}
        {loading && <div className="text-center text-blue-600 text-xl" aria-live="polite">Loading testimonials...</div>}
        {error && <div className="text-center text-red-600 text-xl" role="alert">{error}</div>}
        {!loading && testimonials.length === 0 && !error && (
          <div className="text-center text-gray-600 text-xl">No testimonials yet. Be the first to share your experience!</div>
        )}

        {/* Display fetched testimonials */}
        <div className="grid grid-cols-1 gap-10">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              quote={testimonial.quote}
              author={testimonial.author}
              city={testimonial.city}
            />
          ))}
        </div>

        {/* Form to submit new testimonials */}
        <AddTestimonialForm db={db} userId={userId} isAuthReady={isAuthReady} appId={appId} />
      </div>
    </div>
  );
};

export default TestimonialsPage;
