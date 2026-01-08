'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
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
    setShowProfileMenu(false);
    router.push('/auth/login');
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0a0520]/80 backdrop-blur-xl border-b border-purple-500/30 shadow-2xl shadow-purple-500/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center group relative">
            <div className="h-14 w-auto transform group-hover:scale-110 transition-all duration-500 group-hover:rotate-2">
              <img 
                src="/logos/logo-navbar.png" 
                alt="GEN11 Logo" 
                className="h-full w-auto object-contain drop-shadow-2xl group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]" 
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-all duration-300 relative group font-medium"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 group-hover:w-full transition-all duration-500"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-blue-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></span>
              </a>
            ))}
          </div>

          {/* User Profile / Get Started Button - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <a href="/auth/login" className="text-gray-300 hover:text-purple-300 transition-all duration-300 font-medium">
                  Sign In
                </a>
                <a href="/auth/register">
                  <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-full font-semibold hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-0.5 animate-gradient-x">
                    Get Started
                  </button>
                </a>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-lg rounded-full border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:rotate-12">
                      {getInitials(user?.name)}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0520] animate-pulse"></span>
                  </div>
                  <span className="text-sm text-gray-200 font-medium max-w-[120px] truncate">{user?.name}</span>
                  <svg 
                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-3 w-64 bg-[#0a0520]/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20 overflow-hidden animate-slide-down">
                    <div className="p-4 border-b border-purple-500/20 bg-gradient-to-br from-purple-900/30 to-blue-900/30">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {getInitials(user?.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold truncate">{user?.name}</p>
                          <p className="text-xs text-purple-300 truncate">{user?.email}</p>
                        </div>
                      </div>
                      <div className="mt-2 inline-flex px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300 font-medium capitalize">
                        {user?.role}
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <a 
                        href={`/dashboard/${user?.role}`}
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-900/30 rounded-lg transition-all duration-200 group"
                      >
                        <svg className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        <span className="font-medium">Dashboard</span>
                      </a>
                      
                      <a 
                        href={`/dashboard/${user?.role}/profile`}
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-900/30 rounded-lg transition-all duration-200 group"
                      >
                        <svg className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="font-medium">Profile</span>
                      </a>

                      <div className="my-2 border-t border-purple-500/20"></div>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all duration-200 group"
                      >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white focus:outline-none relative z-50"
            aria-label="Toggle menu"
          >
            <div className="w-7 h-6 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-[600px] mt-6' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-3 py-4 bg-[#0a0520]/60 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-4">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-purple-900/40 px-4 py-3 rounded-xl transition-all duration-300 font-medium"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
              </a>
            ))}
            
            {isAuthenticated ? (
              <>
                <div className="my-2 border-t border-purple-500/20"></div>
                <div className="flex items-center gap-3 px-4 py-3 bg-purple-900/30 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    {getInitials(user?.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{user?.name}</p>
                    <p className="text-xs text-purple-300 truncate">{user?.email}</p>
                  </div>
                </div>
                <a
                  href={`/dashboard/${user?.role}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-white hover:bg-purple-900/40 px-4 py-3 rounded-xl transition-all duration-300 font-medium"
                >
                  Dashboard
                </a>
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20 px-4 py-3 rounded-xl transition-all duration-300 text-left font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <a href="/auth/login">
                  <button className="w-full mt-2 px-6 py-3 bg-purple-900/40 border border-purple-500/30 rounded-xl font-semibold hover:bg-purple-900/60 transition-all duration-300">
                    Sign In
                  </button>
                </a>
                <a href="/auth/register">
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                    Get Started
                  </button>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
