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
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }}></div>
      </div>id="home" 

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-7xl mx-auto text-center z-10">
          {/* Logo/Company Name */}
          <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="inline-block">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center animate-float">
                  <span className="text-3xl">🏢</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  GEN11 CONSULT
                </h1>
              </div>
            </div>
          </div>

          {/* Inspiration Quote */}
          <div className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-xl md:text-2xl text-purple-300 font-light italic">
              "Nothing will be impossible for them"
            </p>
          </div>

          {/* Main Tagline */}
          <div className={`mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Empowering Your Vision Through
              <span className="block mt-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Innovation & Excellence
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Unite your ambitions with our expertise. Together, we build solutions that transcend boundaries.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
              Explore Our Services
            </button>
            <button className="px-8 py-4 border-2 border-purple-400 rounded-full font-semibold text-lg hover:bg-purple-400/10 transition-all duration-300 hover:scale-105">
              Get In Touch
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-2 bg-purple-400 rounded-full"></div>
          </div>
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
              { number: '100+', label: 'Projects Delivered' },
              { number: '50+', label: 'Happy Clients' },
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
