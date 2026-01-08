'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-purple-900/95 to-blue-900/95 backdrop-blur-lg rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🍪</span>
                <h3 className="text-xl font-bold text-white">We Value Your Privacy</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By clicking "Accept All", you consent to our use of cookies. 
                <a href="/privacy-policy" className="text-purple-400 hover:text-purple-300 underline ml-1">
                  Learn more
                </a>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={handleDecline}
                className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 border border-gray-600/50"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/30"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
