
import React from 'react';

export const RubiksCube = ({ size = 20, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
    <line x1="3" y1="16.5" x2="12" y2="12" />
    <line x1="21" y1="16.5" x2="12" y2="12" />
    <line x1="12" y1="7" x2="12" y2="2" />
    <line x1="7.5" y1="4.5" x2="16.5" y2="9.5" />
    <line x1="7.5" y1="19.5" x2="16.5" y2="14.5" />
  </svg>
);
