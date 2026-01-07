'use client';

import { useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
    // Add newsletter subscription logic here
  };

  const services = [
    'Website Development',
    'Software Development',
    'Graphic Design',
    'Data Analytics',
  ];

  const company = [
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'Instagram', icon: '📸', href: '#', gradient: 'from-pink-500 to-purple-600' },
    { name: 'TikTok', icon: '🎵', href: '#', gradient: 'from-cyan-400 to-pink-500' },
    { name: 'X', icon: '✖️', href: '#', gradient: 'from-gray-400 to-gray-700' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0a0520] to-[#050210] border-t border-purple-500/20">
      {/* Newsletter Section */}
      <div className="border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left - Newsletter Text */}
            <div>
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                What's New at G11 Consult?
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Get the latest news about web development, software innovation, and cutting-edge AI trends delivered straight to your inbox.
              </p>
            </div>

            {/* Right - Newsletter Form & Social */}
            <div>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-3 mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  Subscribe
                </button>
              </form>

              {/* Social Media Icons */}
              <div className="flex items-center gap-4">
                <span className="text-gray-400">Follow us:</span>
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`w-12 h-12 bg-gradient-to-br ${social.gradient} rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                    aria-label={social.name}
                  >
                    <span className="text-2xl">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-xl">🏢</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                GEN11 CONSULT
              </span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Empowering your vision through innovation and excellence. Together, nothing is impossible.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="text-purple-400">→</span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Company</h3>
            <ul className="space-y-3">
              {company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="text-purple-400">→</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-gray-400">Mpohor</p>
                  <p className="text-gray-400">Western Region</p>
                  <p className="text-gray-400">Ghana</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">📧</span>
                <a
                  href="mailto:info@gen11consult.com"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                >
                  info@gen11consult.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <a
                  href="tel:+233000000000"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                >
                  +233 (0) 000 000 000
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Gen11 Consult. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
          <p className="text-center mt-4 text-sm text-purple-400 italic">
            "Together, nothing is impossible."
          </p>
        </div>
      </div>

      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600"></div>
    </footer>
  );
}
