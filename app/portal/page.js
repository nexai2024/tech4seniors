// app/portal/page.js
// This file represents the Client Portal page, accessible only to authenticated users.

"use client"; // This component uses useFirebase hook, so it must be a Client Component.

import React, { useEffect } from 'react';
import { useFirebase } from '../../context/FirebaseContext'; // Adjust path for context import
import { redirect } from 'next/navigation'


/**
 * ClientPortalPage Component
 * Displays user-specific information and a logout option.
 * This page is intended to be protected and only accessible after authentication.
 */
const ClientPortalPage = () => {
  const { user, userId, isAuthReady, signOut } = useFirebase();
  if (!user)
    redirect('sign-in')
  // Redirect unauthenticated users if trying to access this page directly
  useEffect(() => {
    if (isAuthReady && !user) {
      // In a real Next.js app, you'd use router.push('/login')
      redirect('/contact'); // Redirect to contact/login page if not authenticated
      console.log("Redirecting unauthenticated user from portal.");
    }
  }, [isAuthReady, user]);

  const handleLogout = async () => {
    try {
      await signOut();
      redirect('/'); // Redirect to home page after logout
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error);
      // In a real app, display a user-friendly error message
    }
  };

  if (!isAuthReady) {
    return (
      <div className="py-16 px-6 md:px-12 text-center text-xl text-blue-600">
        Loading authentication status...
      </div>
    );
  }

  if (!user) {
    // This state should ideally be prevented by the useEffect redirect,
    // but acts as a fallback or brief display before redirect.
    return (
      <div className="py-16 px-6 md:px-12 text-center text-xl text-red-600">
        You must be logged in to view this page. Redirecting...
      </div>
    );
  }

  return (
    <div className="py-16 px-6 md:px-12 bg-white">
      <div className="container mx-auto max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">Welcome to Your Client Portal!</h1>
        <p className="text-xl text-gray-700 mb-6">
          Hello, <span className="font-semibold text-blue-700">{user.email || "Valued Client"}</span>!
          Here you can manage your services, view your history, and access exclusive resources.
        </p>
        <div className="bg-blue-50 rounded-xl shadow-md p-8 border border-blue-200 inline-block">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Your Account Details:</h2>
          <p className="text-lg text-gray-800 mb-2">
            <strong>User ID:</strong> <span className="font-mono break-all">{userId}</span>
          </p>
          <p className="text-lg text-gray-800 mb-4">
            <strong>Email:</strong> <span className="font-mono break-all">{user.email || "N/A"}</span>
          </p>
          {/* Add more user-specific information here in a real application */}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300 text-lg mt-4"
          >
            Logout
          </button>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => console.log("Navigate to service history")}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 text-xl"
            >
              View Service History
            </button>
            <button
              onClick={() => console.log("Navigate to exclusive resources")}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300 text-xl"
            >
              Access Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortalPage;
