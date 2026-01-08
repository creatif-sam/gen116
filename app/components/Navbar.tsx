'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
    ...(isAuthenticated ? [{ name: `${user?.role} Dashboard`, href: `/dashboard/${user?.role}` }] : [{ name: 'Login', href: '/auth/login' }]),
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0520]/95 backdrop-blur-lg border-b border-purple-500/20 shadow-lg shadow-purple-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center group">
            <div className="h-12 w-auto transform group-hover:scale-110 transition-transform duration-300">
              <img src="/logos/logo-navbar.png" alt="GEN11 Logo" className="h-full w-auto object-contain" />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-red-400 transition-colors duration-300"
              >
                Logout
              </button>
            )}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            {!isAuthenticated ? (
              <a href="/auth/register">
                <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                  Get Started
                </button>
              </a>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-900/30 rounded-full border border-purple-500/30">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm text-gray-300">{user?.name}</span>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 mt-6' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-4 py-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-purple-900/30 px-4 py-2 rounded-lg transition-all duration-300"
              >
                {item.name}
              </a>
            ))}
            <button className="mt-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
