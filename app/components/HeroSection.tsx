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

        <div className="max-w-7xl mx-auto text-center z-10 px-4">
          {/* Animated Journey: Idea → Website → Mobile */}
          <div className={`mb-8 sm:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-12 lg:gap-16 py-4">
              
              {/* Step 1: Idea (Lightbulb) */}
              <div className="relative animate-pulse-glow">
                <div className="absolute inset-0 bg-yellow-500/30 blur-xl sm:blur-2xl rounded-full animate-float"></div>
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_30px_rgba(234,179,8,0.6)] animate-float" style={{ animationDuration: '3s' }}>
                    {/* Lightbulb */}
                    <path d="M50 10 C35 10 25 20 25 35 C25 45 30 52 35 58 L35 70 L65 70 L65 58 C70 52 75 45 75 35 C75 20 65 10 50 10 Z" 
                          fill="url(#bulbGradient)" stroke="#FCD34D" strokeWidth="2"/>
                    <rect x="38" y="72" width="24" height="8" rx="2" fill="#94A3B8"/>
                    <rect x="40" y="82" width="20" height="3" rx="1.5" fill="#64748B"/>
                    
                    {/* Light rays */}
                    <g className="animate-spin-slow origin-center" style={{ transformBox: 'fill-box', animationDuration: '8s' }}>
                      <line x1="50" y1="5" x2="50" y2="0" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="70" y1="15" x2="75" y2="10" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="30" y1="15" x2="25" y2="10" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="80" y1="35" x2="85" y2="35" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="20" y1="35" x2="15" y2="35" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round"/>
                    </g>
                    
                    <defs>
                      <linearGradient id="bulbGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FEF3C7"/>
                        <stop offset="100%" stopColor="#FCD34D"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-yellow-400 mt-2 font-semibold">Idea</p>
              </div>

              {/* Arrow 1 - Horizontal on desktop, vertical on mobile */}
              <div className="flex sm:flex-row flex-col items-center gap-1 sm:gap-2 animate-pulse-glow rotate-90 sm:rotate-0" style={{ animationDelay: '1s' }}>
                <div className="h-0.5 w-6 sm:w-8 md:w-12 lg:w-16 bg-gradient-to-r from-yellow-400 via-purple-400 to-purple-600 animate-gradient-flow"></div>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </div>

              {/* Step 2: Website */}
              <div className="relative animate-pulse-glow" style={{ animationDelay: '2s' }}>
                <div className="absolute inset-0 bg-purple-500/30 blur-xl sm:blur-2xl rounded-xl animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="relative w-16 h-14 sm:w-20 sm:h-16 md:w-24 md:h-20 lg:w-28 lg:h-24">
                  <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-[0_0_30px_rgba(168,85,247,0.6)] animate-float" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                    {/* Monitor */}
                    <rect x="10" y="10" width="100" height="65" rx="4" fill="url(#monitorGradient)" stroke="#A855F7" strokeWidth="2"/>
                    <rect x="15" y="15" width="90" height="55" rx="2" fill="#1E1B4B"/>
                    
                    {/* Website content lines */}
                    <rect x="20" y="20" width="35" height="4" rx="2" fill="#A855F7" className="animate-pulse"/>
                    <rect x="20" y="28" width="50" height="3" rx="1.5" fill="#818CF8" className="animate-pulse" style={{ animationDelay: '0.2s' }}/>
                    <rect x="20" y="34" width="45" height="3" rx="1.5" fill="#818CF8" className="animate-pulse" style={{ animationDelay: '0.4s' }}/>
                    
                    {/* Browser dots */}
                    <circle cx="22" cy="22" r="2" fill="#EF4444"/>
                    <circle cx="29" cy="22" r="2" fill="#FBBF24"/>
                    <circle cx="36" cy="22" r="2" fill="#10B981"/>
                    
                    {/* Stand */}
                    <path d="M 50 75 L 45 82 L 75 82 L 70 75 Z" fill="#64748B"/>
                    <rect x="35" y="82" width="50" height="3" rx="1.5" fill="#475569"/>
                    
                    <defs>
                      <linearGradient id="monitorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#312E81"/>
                        <stop offset="100%" stopColor="#1E1B4B"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-purple-400 mt-2 font-semibold">Website</p>
              </div>

              {/* Arrow 2 - Horizontal on desktop, vertical on mobile */}
              <div className="flex sm:flex-row flex-col items-center gap-1 sm:gap-2 animate-pulse-glow rotate-90 sm:rotate-0" style={{ animationDelay: '3s' }}>
                <div className="h-0.5 w-6 sm:w-8 md:w-12 lg:w-16 bg-gradient-to-r from-purple-600 via-blue-400 to-blue-600 animate-gradient-flow" style={{ animationDelay: '1s' }}></div>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </div>

              {/* Step 3: Mobile App */}
              <div className="relative animate-pulse-glow" style={{ animationDelay: '4s' }}>
                <div className="absolute inset-0 bg-blue-500/30 blur-xl sm:blur-2xl rounded-xl animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="relative w-10 h-16 sm:w-12 sm:h-20 md:w-14 md:h-24 lg:w-16 lg:h-28">
                  <svg viewBox="0 0 60 100" className="w-full h-full drop-shadow-[0_0_30px_rgba(59,130,246,0.6)] animate-float" style={{ animationDuration: '5s', animationDelay: '2s' }}>
                    {/* Phone body */}
                    <rect x="5" y="5" width="50" height="90" rx="8" fill="url(#phoneGradient)" stroke="#3B82F6" strokeWidth="2"/>
                    <rect x="10" y="15" width="40" height="65" rx="3" fill="#0F172A"/>
                    
                    {/* App icons */}
                    <rect x="13" y="18" width="8" height="8" rx="2" fill="#8B5CF6" className="animate-pulse"/>
                    <rect x="23" y="18" width="8" height="8" rx="2" fill="#3B82F6" className="animate-pulse" style={{ animationDelay: '0.2s' }}/>
                    <rect x="33" y="18" width="8" height="8" rx="2" fill="#EC4899" className="animate-pulse" style={{ animationDelay: '0.4s' }}/>
                    <rect x="13" y="28" width="8" height="8" rx="2" fill="#10B981" className="animate-pulse" style={{ animationDelay: '0.6s' }}/>
                    <rect x="23" y="28" width="8" height="8" rx="2" fill="#F59E0B" className="animate-pulse" style={{ animationDelay: '0.8s' }}/>
                    <rect x="33" y="28" width="8" height="8" rx="2" fill="#06B6D4" className="animate-pulse" style={{ animationDelay: '1s' }}/>
                    
                    {/* Notification bar */}
                    <rect x="13" y="10" width="14" height="2" rx="1" fill="#64748B"/>
                    <circle cx="44" cy="11" r="1.5" fill="#10B981"/>
                    
                    {/* Home button */}
                    <circle cx="30" cy="87" r="4" fill="#1E293B" stroke="#475569" strokeWidth="1"/>
                    
                    <defs>
                      <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1E3A8A"/>
                        <stop offset="100%" stopColor="#0F172A"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-blue-400 mt-2 font-semibold">Mobile App</p>
              </div>
            </div>
          </div>

          {/* Inspiration Quote - Enhanced */}
          <div className={`mb-8 sm:mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl"></div>
              <p className="text-lg sm:text-xl md:text-2xl text-purple-300 font-light italic relative bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent animate-gradient-x px-4">
                "Nothing will be impossible for them"
              </p>
            </div>
          </div>

          {/* Main Tagline - Enhanced */}
          <div className={`mb-12 sm:mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-4">
              <span className="inline-block animate-fade-in-up">Empowering Your Vision Through</span>
              <span className="block mt-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold">
                Innovation & Excellence
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up px-4" style={{ animationDelay: '0.6s' }}>
              Unite your ambitions with our expertise. Together, we build solutions that <span className="text-purple-400 font-semibold">transcend boundaries</span>.
            </p>
          </div>

          {/* CTA Buttons - Enhanced */}
          <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <a href="/#services" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-full font-semibold text-base sm:text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Our Services
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </a>
            <a href="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 border-2 border-purple-400 rounded-full font-semibold text-base sm:text-lg relative overflow-hidden transition-all duration-500 hover:scale-105 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/30">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get In Touch
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </a>
          </div>
        </div>

        {/* Plane Switch - Enhanced */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer group">
          <label className="plane-switch">
            <input type="checkbox" />
            <div>
              <div>
                <svg viewBox="0 0 13 13">
                  <path d="M1.55989957,5.41666667 L5.51582215,5.41666667 L4.47015462,0.108333333 L4.47015462,0.108333333 C4.47015462,0.0634601974 4.49708054,0.0249592654 4.5354546,0.00851337035 L4.57707145,0 L5.36229752,0 C5.43359776,0 5.50087375,0.028779451 5.55026392,0.0782711996 L5.59317877,0.134368264 L7.13659662,2.81558333 L8.29565964,2.81666667 C8.53185377,2.81666667 8.72332694,3.01067661 8.72332694,3.25 C8.72332694,3.48932339 8.53185377,3.68333333 8.29565964,3.68333333 L7.63589819,3.68225 L8.63450135,5.41666667 L11.9308317,5.41666667 C12.5213171,5.41666667 13,5.90169152 13,6.5 C13,7.09830848 12.5213171,7.58333333 11.9308317,7.58333333 L8.63450135,7.58333333 L7.63589819,9.31666667 L8.29565964,9.31666667 C8.53185377,9.31666667 8.72332694,9.51067661 8.72332694,9.75 C8.72332694,9.98932339 8.53185377,10.1833333 8.29565964,10.1833333 L7.13659662,10.1833333 L5.59317877,12.8656317 C5.55725264,12.9280353 5.49882018,12.9724157 5.43174295,12.9907056 L5.36229752,13 L4.57707145,13 L4.55610333,12.9978962 C4.51267695,12.9890959 4.48069792,12.9547924 4.47230803,12.9134397 L4.47223088,12.8704208 L5.51582215,7.58333333 L1.55989957,7.58333333 L0.891288881,8.55114605 C0.853775374,8.60544678 0.798421006,8.64327676 0.73629202,8.65879796 L0.672314689,8.66666667 L0.106844414,8.66666667 L0.0715243949,8.66058466 L0.0715243949,8.66058466 C0.0297243066,8.6457608 0.00275502199,8.60729104 0,8.5651586 L0.00593007386,8.52254537 L0.580855011,6.85813984 C0.64492547,6.67265611 0.6577034,6.47392717 0.619193545,6.28316421 L0.580694768,6.14191703 L0.00601851064,4.48064746 C0.00203480725,4.4691314 0,4.45701613 0,4.44481314 C0,4.39994001 0.0269259152,4.36143908 0.0652999725,4.34499318 L0.106916826,4.33647981 L0.672546853,4.33647981 C0.737865848,4.33647981 0.80011301,4.36066329 0.848265401,4.40322477 L0.89131128,4.45169723 L1.55989957,5.41666667 Z" fill="currentColor" />
                </svg>
              </div>
              <span className="street-middle" />
              <span className="cloud" />
              <span className="cloud two" />
            </div>
          </label>
          <style jsx>{`
            .plane-switch {
              --dot: #fff;
              --street: #6B6D76;
              --street-line: #A8AAB4;
              --street-line-mid: #C0C2C8;
              --sky-1: #60A7FA;
              --sky-2: #2F8EFC;
              --light-1: rgba(255, 233, 0, 1);
              --light-2: rgba(255, 233, 0, .3);
              cursor: pointer;
              -webkit-tap-highlight-color: transparent;
            }

            .plane-switch input {
              display: none;
            }

            .plane-switch input + div {
              -webkit-mask-image: -webkit-radial-gradient(white, black);
              position: relative;
              overflow: hidden;
              width: 50px;
              height: 25px;
              padding: 1px;
              border-radius: 13px;
              background: linear-gradient(90deg, var(--street) 0%, var(--street) 25%, var(--sky-1) 75%, var(--sky-2) 100%) left var(--p, 0%) top 0;
              background-position-x: var(--p, 0%);
              background-size: 400% auto;
              transition: background-position 0.6s;
            }

            .plane-switch input + div:before, .plane-switch input + div:after {
              content: "";
              display: block;
              position: absolute;
              transform: translateX(var(--s, 0));
              transition: transform 0.3s;
            }

            .plane-switch input + div:before {
              width: 42px;
              right: 2px;
              top: 4px;
              height: 1px;
              background: var(--street-line);
              box-shadow: 0 16px 0 0 var(--street-line);
            }

            .plane-switch input + div:after {
              width: 2px;
              height: 2px;
              border-radius: 50%;
              left: 23px;
              top: 1px;
              -webkit-animation: lights2 2s linear infinite;
              animation: lights2 2s linear infinite;
              box-shadow: inset 0 0 0 2px var(--light-1), 0 21px 0 var(--light-1), 8px 0 0 var(--light-2), 8px 21px 0 var(--light-2), 16px 0 0 var(--light-2), 16px 21px 0 var(--light-2);
            }

            .plane-switch input + div span {
              display: block;
              position: absolute;
            }

            .plane-switch input + div span.street-middle {
              top: 12px;
              left: 21px;
              width: 3px;
              height: 1px;
              transform: translateX(var(--s, 0));
              background: var(--street-line-mid);
              box-shadow: 5px 0 0 var(--street-line-mid), 10px 0 0 var(--street-line-mid), 15px 0 0 var(--street-line-mid), 20px 0 0 var(--street-line-mid), 25px 0 0 var(--street-line-mid);
              transition: transform 0.3s;
            }

            .plane-switch input + div span.cloud {
              width: 12px;
              height: 4px;
              border-radius: 2px;
              background: #fff;
              position: absolute;
              top: var(--ct, 8px);
              left: 100%;
              opacity: var(--co, 0);
              transition: opacity 0.3s;
              -webkit-animation: clouds2 2s linear infinite var(--cd, 0s);
              animation: clouds2 2s linear infinite var(--cd, 0s);
            }

            .plane-switch input + div span.cloud:before, .plane-switch input + div span.cloud:after {
              content: "";
              position: absolute;
              transform: translateX(var(--cx, 0));
              border-radius: 50%;
              width: var(--cs, 5px);
              height: var(--cs, 5px);
              background: #fff;
              bottom: 1px;
              left: 1px;
            }

            .plane-switch input + div span.cloud:after {
              --cs: 6px;
              --cx: 4px;
            }

            .plane-switch input + div span.cloud.two {
              --ct: 20px;
              --cd: 1s;
              opacity: var(--co-2, 0);
            }

            .plane-switch input + div div {
              display: table;
              position: relative;
              z-index: 1;
              padding: 5px;
              border-radius: 50%;
              background: var(--dot);
              transform: translateX(var(--x, 0));
              transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.35, 1.2);
            }

            .plane-switch input + div div svg {
              width: 13px;
              height: 13px;
              display: block;
              color: var(--c, var(--street));
              transition: color 0.6s;
            }

            .plane-switch input:checked + div {
              --p: 100%;
              --x: 25px;
              --s: -50px;
              --c: var(--sky-2);
              --co: .8;
              --co-2: .6;
            }

            @keyframes lights2 {
              20%, 30% {
                box-shadow: inset 0 0 0 2px var(--light-2), 0 21px 0 var(--light-2), 8px 0 0 var(--light-1), 8px 21px 0 var(--light-1), 16px 0 0 var(--light-2), 16px 21px 0 var(--light-2);
              }

              55%, 65% {
                box-shadow: inset 0 0 0 2px var(--light-2), 0 21px 0 var(--light-2), 8px 0 0 var(--light-2), 8px 21px 0 var(--light-2), 16px 0 0 var(--light-1), 16px 21px 0 var(--light-1);
              }

              90%, 100% {
                box-shadow: inset 0 0 0 2px var(--light-1), 0 21px 0 var(--light-1), 8px 0 0 var(--light-2), 8px 21px 0 var(--light-2), 16px 0 0 var(--light-2), 16px 21px 0 var(--light-2);
              }
            }

            @keyframes clouds2 {
              97% {
                transform: translateX(-72px);
                visibility: visible;
              }

              98%, 100% {
                visibility: hidden;
              }

              99% {
                transform: translateX(-72px);
              }

              100% {
                transform: translateX(0);
              }
            }
          `}</style>
        </div>
      </section>
    </>
  );
}
