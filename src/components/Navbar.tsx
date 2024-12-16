import React from 'react';
import { useLocation } from '../hooks/useLocation';

export function Navbar() {
  const { pathname } = useLocation();
  const isProfile = pathname === '/profile';
  const isLandingPage = pathname === '/';

  // Don't render navbar on profile page or landing page
  if (isProfile || isLandingPage) {
    return null;
  }

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[980px] mx-auto px-4 h-12 flex items-center justify-between">
        <a href="/" className="text-white text-sm font-medium hover:text-white/90 transition-colors">
          AI Consultant
        </a>
        <div className="flex items-center space-x-6">
          <a href="/signin" className="text-white/90 text-sm hover:text-white transition-colors">Sign In</a>
          <a href="/signup" className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-full text-white text-sm transition-all">Sign Up</a>
        </div>
      </div>
    </nav>
  );
}