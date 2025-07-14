// components/NavLink.js
"use client"; // This component uses onClick, so it must be a Client Component.

import Link from 'next/link';
import React from 'react';

/**
 * NavLink Component for consistent styling and accessibility in navigation.
 * @param {object} props - Component props.
 * @param {function} props.onClick - Function to call when the button is clicked.
 * @param {React.ReactNode} props.children - The content to be displayed inside the link.
 * @param {boolean} props.active - True if the link is currently active, for styling.
 */
const NavLink = ({ onClick, children, active }) => (
  <Link href={onClick}>
  <button
    className={`py-2 px-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300
      ${active ? 'bg-blue-700 text-white shadow-md' : 'hover:bg-blue-500 hover:text-white'}
    `}
    aria-current={active ? 'page' : undefined} // ARIA attribute for current page
  >
    {children}
  </button>
  </Link>
);

export default NavLink;
