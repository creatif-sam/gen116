'use client';

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      title: 'Website Development',
      description: 'Crafting responsive, modern websites that drive engagement and deliver results.',
      icon: '🌐',
      gradient: 'from-purple-600 to-blue-600'
    },
    {
      title: 'Software Development',
      description: 'Building scalable software solutions tailored to your business needs.',
      icon: '💻',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      title: 'Graphic Design',
      description: 'Creating stunning visual identities that capture your brand essence.',
      icon: '🎨',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Data Analytics Consulting',
      description: 'Transform data into actionable insights for strategic decision-making.',
      icon: '📊',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'IT Consulting',
      description: 'Expert guidance to optimize your technology infrastructure and operations.',
      icon: '🔧',
      gradient: 'from-indigo-600 to-blue-600'
    },
    {
      title: 'Market Research and Market Studies',
      description: 'In-depth market analysis to uncover opportunities and competitive advantages.',
      icon: '📈',
      gradient: 'from-purple-600 to-indigo-600'
    },
    {
      title: 'Business Consulting',
      description: 'Strategic advisory services to accelerate growth and transformation.',
      icon: '💼',
      gradient: 'from-blue-700 to-purple-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#1a1040] to-[#0a0520] animate-gradient text-white overflow-hidden">
      {/* Navbar */}
      <Navbar />
      
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

          {/* Stats Row - NEW */}
          <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {[
              { value: '16+', label: 'Projects' },
              { value: '7+', label: 'Clients' },
              { value: '100%', label: 'Satisfaction' },
              { value: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="group relative p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2 relative z-10">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-medium relative z-10">{stat.label}</div>
              </div>
            ))}
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

      {/* Services Section */}
      <section id="services" className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-xl text-gray-300">Comprehensive solutions for your digital transformation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Effect - Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <span className="text-2xl text-purple-400">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '16+', label: 'Projects Delivered' },
              { number: '7', label: 'Happy Clients' },
              { number: '7', label: 'Core Services' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg border border-purple-500/20">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Technologies & Platforms We Work With
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              At Gen11 Consult, we construct web apps using up-to-date reliable tech tools that are quick, safe, and prepared for every circumstance.
            </p>
          </div>

          {/* Tech Categories Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Front-End */}
            <div className="group relative bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform duration-500">
                    🎨
                  </div>
                  <h3 className="text-2xl font-bold text-white">Front-End</h3>
                </div>
                <p className="text-gray-300 mb-6">Building stunning, responsive user interfaces with modern frameworks</p>
                <div className="flex flex-wrap gap-3">
                  {['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript'].map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-purple-900/50 border border-purple-500/30 rounded-full text-sm text-purple-200 hover:bg-purple-800/50 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Back-End */}
            <div className="group relative bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform duration-500">
                    ⚙️
                  </div>
                  <h3 className="text-2xl font-bold text-white">Back-End</h3>
                </div>
                <p className="text-gray-300 mb-6">Powering applications with robust, scalable server-side solutions</p>
                <div className="flex flex-wrap gap-3">
                  {['Node.js', 'Python', 'Django', 'Express.js', 'REST APIs', 'GraphQL', 'PHP', 'Java'].map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-blue-900/50 border border-blue-500/30 rounded-full text-sm text-blue-200 hover:bg-blue-800/50 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Database */}
            <div className="group relative bg-gradient-to-br from-emerald-900/40 to-teal-900/40 backdrop-blur-lg rounded-2xl p-8 border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform duration-500">
                    🗄️
                  </div>
                  <h3 className="text-2xl font-bold text-white">Database</h3>
                </div>
                <p className="text-gray-300 mb-6">Managing data efficiently with reliable database systems</p>
                <div className="flex flex-wrap gap-3">
                  {['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Supabase', 'Firebase', 'SQLite', 'Oracle'].map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-emerald-900/50 border border-emerald-500/30 rounded-full text-sm text-emerald-200 hover:bg-emerald-800/50 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Cloud Computing */}
            <div className="group relative bg-gradient-to-br from-cyan-900/40 to-sky-900/40 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-sky-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-sky-600 rounded-xl flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform duration-500">
                    ☁️
                  </div>
                  <h3 className="text-2xl font-bold text-white">Cloud Computing</h3>
                </div>
                <p className="text-gray-300 mb-6">Deploying and scaling applications on modern cloud platforms</p>
                <div className="flex flex-wrap gap-3">
                  {['AWS', 'Azure', 'Google Cloud', 'Vercel', 'Netlify', 'Heroku', 'Docker', 'Kubernetes'].map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-cyan-900/50 border border-cyan-500/30 rounded-full text-sm text-cyan-200 hover:bg-cyan-800/50 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CMS and Custom Request Side by Side */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* CMS */}
            <div className="group relative bg-gradient-to-br from-amber-900/40 to-orange-900/40 backdrop-blur-lg rounded-2xl p-8 border border-amber-500/30 hover:border-amber-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-orange-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform duration-500">
                    📝
                  </div>
                  <h3 className="text-2xl font-bold text-white">CMS</h3>
                </div>
                <p className="text-gray-300 mb-6">Content management systems for easy website control</p>
                <div className="flex flex-wrap gap-3">
                  {['WordPress', 'Joomla', 'Shopify', 'Drupal'].map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-amber-900/50 border border-amber-500/30 rounded-full text-sm text-amber-200 hover:bg-amber-800/50 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Technology Request - Animated */}
            <div className="relative bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-indigo-900/30 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 animate-pulse-slow">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl animate-pulse"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-2xl animate-bounce">
                    💡
                  </div>
                  <h3 className="text-2xl font-bold text-white">Don't See Your Tech?</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  We have a <span className="text-purple-400 font-semibold">versatile team and extensive network</span> able to undertake any project. 
                  <span className="block mt-2 text-blue-300">Our consultants will contact you within 24 hours!</span>
                </p>

                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name *"
                      className="w-full px-4 py-3 bg-purple-900/20 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      className="w-full px-4 py-3 bg-purple-900/20 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Technology / Platform *"
                      className="w-full px-4 py-3 bg-purple-900/20 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <textarea
                      placeholder="Project Description *"
                      rows={3}
                      className="w-full px-4 py-3 bg-purple-900/20 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    Submit Request
                    <span className="text-lg">→</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section id="contact" className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build the Impossible?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Let's unite our expertise with your vision to create something extraordinary.
          </p>
          <button className="px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold text-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
            Start Your Project Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
