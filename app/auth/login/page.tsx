'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showEmailConfirmModal, setShowEmailConfirmModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        // Redirect will happen in redirect page based on user role
        router.push('/dashboard/redirect');
      } else {
        // Check if error is related to email confirmation
        if (result.error?.includes('Email not confirmed') || result.error?.includes('confirm') || result.error?.includes('verify')) {
          setShowEmailConfirmModal(true);
        } else {
          setError(result.error || 'Login failed');
          setShowErrorModal(true);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#1a1040] to-[#0a0520]">
      <Navbar />
      
      {/* Email Confirmation Modal */}
      {showEmailConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-gradient-to-br from-purple-900/95 to-blue-900/95 backdrop-blur-lg rounded-2xl border border-purple-500/30 shadow-2xl max-w-md w-full p-8 animate-scale-in">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-3">Email Confirmation Required</h2>
              <p className="text-gray-300 leading-relaxed">
                Please confirm your email before logging in. Check your inbox for the confirmation link we sent you.
              </p>
              <p className="text-purple-400 text-sm mt-4">
                Don't forget to check your spam folder!
              </p>
            </div>
            <button
              onClick={() => setShowEmailConfirmModal(false)}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-white hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-gradient-to-br from-red-900/95 to-orange-900/95 backdrop-blur-lg rounded-2xl border border-red-500/30 shadow-2xl max-w-md w-full p-8 animate-scale-in">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-3">Login Failed</h2>
              <p className="text-gray-200 leading-relaxed">
                {error}
              </p>
            </div>
            <button
              onClick={() => setShowErrorModal(false)}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg font-semibold text-white hover:shadow-xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
      
      <div className="pt-24 pb-20 px-6 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full">
          {/* Login Card */}
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Dashboard Login
              </h1>
              <p className="text-gray-400">Access your Gen116 Consult dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-white hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link 
                  href="/auth/register"
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
