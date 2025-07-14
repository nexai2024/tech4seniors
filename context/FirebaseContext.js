// context/FirebaseContext.js
"use client"; // This component uses useState and useEffect, so it must be a Client Component.

import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged,
  signOut as firebaseSignOut, // Renamed to avoid conflict with local signOut
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCJfuTdGmpIxhsznGade8-Q3VGAOlUGZjA",
  authDomain: "tech4seniors.firebaseapp.com",
  projectId: "tech4seniors",
  storageBucket: "tech4seniors.firebasestorage.app",
  messagingSenderId: "594930608812",
  appId: "1:594930608812:web:c05f8303199cf9da3b8d09",
  measurementId: "G-3JYX9JTZ9R"
};
// Define the Firebase configuration and app ID from the global variables
//const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
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
}

// Create a context for Firebase services and user ID
export const FirebaseContext = createContext(null);

/**
 * FirebaseProvider Component
 * Provides Firebase database (db), authentication (auth) instances,
 * the current authenticated user (user), and their ID (userId) to its children components.
 * It also manages the authentication state and ensures Firebase is ready.
 */
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the full user object
  const [userId, setUserId] = useState(null); // Store the user's UID
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [firebaseInstances, setFirebaseInstances] = useState({ db: null, auth: null });

  useEffect(() => {
    if (!firebaseApp) {
      console.error("Firebase app not initialized. Cannot proceed with authentication.");
      return;
    }

    const signInInitial = async () => { // Renamed to avoid conflict with context method
      try {
        if (initialAuthToken) {
          await signInWithCustomToken(auth, initialAuthToken);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Firebase authentication error:", error);
      } finally {
        setIsAuthReady(true);
      }
    };

    signInInitial();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the full user object
      setUserId(currentUser ? currentUser.uid : null); // Set UID if user exists
      setIsAuthReady(true); // Confirm auth state has been checked
    });

    setFirebaseInstances({ db, auth });

    return () => unsubscribe(); // Cleanup auth listener
  }, []);

  /**
   * Signs a user in with email and password.
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   * @returns {Promise<UserCredential>} - Firebase UserCredential.
   */
  const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  /**
   * Creates a new user with email and password.
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   * @returns {Promise<UserCredential>} - Firebase UserCredential.
   */
  const signUp = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  /**
   * Signs out the current user.
   * @returns {Promise<void>}
   */
  const signOut = async () => {
    return await firebaseSignOut(auth);
  };

  // Provide all necessary Firebase instances, user info, and auth functions to children
  return (
    <FirebaseContext.Provider value={{ ...firebaseInstances, user, userId, isAuthReady, appId, signIn, signUp, signOut }}>
      {children}
    </FirebaseContext.Provider>
  );
};

/**
 * Custom hook to consume Firebase services from the context.
 * Throws an error if used outside of a FirebaseProvider.
 */
export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
