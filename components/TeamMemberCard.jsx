// components/TeamMemberCard.js
// This component does not use hooks or event listeners, so it can be a Server Component by default.

import React from 'react';

/**
 * TeamMemberCard Component displays information about a team member.
 * @param {object} props - Component props.
 * @param {string} props.name - The name of the team member.
 * @param {string} props.title - The title/role of the team member.
 * @param {string} props.description - A brief description of the team member.
 * @param {string} props.image - URL for the team member's portrait image.
 */
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

export default TeamMemberCard;
