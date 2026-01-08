'use client';

import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* Advanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs */}
        <div className="absolute top-20 -left-20 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse-glow animate-float"></div>
        <div className="absolute top-40 -right-20 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s', animation: 'pulse-glow 8s ease-in-out infinite, float 20s ease-in-out infinite' }}></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-float opacity-60" style={{ animationDuration: '15s', animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-float opacity-40" style={{ animationDuration: '18s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-pink-400 rounded-full animate-float opacity-50" style={{ animationDuration: '20s', animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-purple-300 rounded-full animate-float opacity-30" style={{ animationDuration: '22s', animationDelay: '3s' }}></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      {/* Hero Section - Enhanced */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        {/* Spotlight effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-500/20 via-transparent to-transparent blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center z-10">
          {/* Logo/Company Name - Enhanced Animation */}
          <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="inline-block relative">
              {/* Glow ring around logo */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-spin-slow scale-110"></div>
              
              <div className="flex items-center justify-center mb-4 relative">
                <div className="w-64 md:w-80 lg:w-96 animate-float relative">
                  <img 
                    src="/logos/logo-navbar.png" 
                    alt="GEN11 Logo" 
                    className="w-full h-auto object-contain drop-shadow-[0_0_50px_rgba(168,85,247,0.4)] hover:drop-shadow-[0_0_80px_rgba(168,85,247,0.6)] transition-all duration-700" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Inspiration Quote - Enhanced */}
          <div className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl"></div>
              <p className="text-xl md:text-2xl text-purple-300 font-light italic relative bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent animate-gradient-x">
                "Nothing will be impossible for them"
              </p>
            </div>
          </div>

          {/* Main Tagline - Enhanced */}
          <div className={`mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="inline-block animate-fade-in-up">Empowering Your Vision Through</span>
              <span className="block mt-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x text-4xl md:text-6xl lg:text-7xl font-extrabold">
                Innovation & Excellence
              </span>
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              Unite your ambitions with our expertise. Together, we build solutions that <span className="text-purple-400 font-semibold">transcend boundaries</span>.
            </p>
          </div>

          {/* CTA Buttons - Enhanced */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <a href="/#services">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-full font-semibold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Our Services
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </a>
            <a href="/contact">
              <button className="group px-8 py-4 border-2 border-purple-400 rounded-full font-semibold text-lg relative overflow-hidden transition-all duration-500 hover:scale-105 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/30">
                <span className="relative z-10 flex items-center gap-2">
                  Get In Touch
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </a>
          </div>
        </div>

        {/* Scroll Indicator - Enhanced */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer group">
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex items-start justify-center p-2 group-hover:border-purple-300 transition-colors group-hover:shadow-lg group-hover:shadow-purple-500/50">
            <div className="w-1.5 h-2 bg-purple-400 rounded-full animate-scroll-down"></div>
          </div>
          <p className="text-xs text-purple-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Scroll</p>
        </div>
      </section>
    </>
  );
}
