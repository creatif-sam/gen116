'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';

export default function Home() {
  const [activeService, setActiveService] = useState<number | null>(null);

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
      
      {/* Hero Section */}
      <HeroSection />

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
                className="group relative bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer"
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
