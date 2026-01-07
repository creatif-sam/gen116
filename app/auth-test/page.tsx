'use client';

import { useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import Link from 'next/link';

export default function AuthTestPage() {
  const { user, session, isAuthenticated, loading, login, signup, logout } = useAuth();
  const [testEmail, setTestEmail] = useState('test@gen11consult.com');
  const [testPassword, setTestPassword] = useState('test123456');
  const [testName, setTestName] = useState('Test User');
  const [testRole, setTestRole] = useState<'admin' | 'staff' | 'client'>('client');
  const [message, setMessage] = useState('');

  const handleTestSignup = async () => {
    setMessage('Creating account...');
    const result = await signup(testEmail, testPassword, testName, testRole);
    setMessage(result.success ? '✅ Signup successful!' : `❌ ${result.error}`);
  };

  const handleTestLogin = async () => {
    setMessage('Logging in...');
    const result = await login(testEmail, testPassword);
    setMessage(result.success ? '✅ Login successful!' : `❌ ${result.error}`);
  };

  const handleTestLogout = async () => {
    setMessage('Logging out...');
    await logout();
    setMessage('✅ Logged out successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#1a1040] to-[#0a0520] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Authentication Test Page
          </h1>
          <p className="text-gray-400">Test Supabase Auth integration</p>
        </div>

        {/* Current Auth Status */}
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Current Auth Status</h2>
          <div className="space-y-2 text-gray-300">
            <p><strong>Loading:</strong> {loading ? '⏳ Yes' : '✅ No'}</p>
            <p><strong>Authenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
            {user && (
              <>
                <p><strong>User ID:</strong> <code className="bg-black/30 px-2 py-1 rounded">{user.id}</code></p>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> <span className="px-3 py-1 bg-purple-600 rounded-full text-sm">{user.role}</span></p>
              </>
            )}
            {session && (
              <p><strong>Session Expires:</strong> {new Date(session.expires_at! * 1000).toLocaleString()}</p>
            )}
          </div>
        </div>

        {/* Test Controls */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Signup Test */}
          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-lg rounded-2xl p-6 border border-green-500/20">
            <h3 className="text-lg font-bold text-white mb-4">Test Signup</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                placeholder="Name"
                className="w-full px-4 py-2 bg-black/30 border border-green-500/30 rounded-lg text-white"
              />
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 bg-black/30 border border-green-500/30 rounded-lg text-white"
              />
              <input
                type="password"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 bg-black/30 border border-green-500/30 rounded-lg text-white"
              />
              <select
                value={testRole}
                onChange={(e) => setTestRole(e.target.value as any)}
                className="w-full px-4 py-2 bg-black/30 border border-green-500/30 rounded-lg text-white"
              >
                <option value="client">Client</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
              <button
                onClick={handleTestSignup}
                disabled={loading}
                className="w-full py-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg font-semibold text-white hover:shadow-lg transition-all disabled:opacity-50"
              >
                Test Signup
              </button>
            </div>
          </div>

          {/* Login Test */}
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/20">
            <h3 className="text-lg font-bold text-white mb-4">Test Login</h3>
            <div className="space-y-3">
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 bg-black/30 border border-blue-500/30 rounded-lg text-white"
              />
              <input
                type="password"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 bg-black/30 border border-blue-500/30 rounded-lg text-white"
              />
              <button
                onClick={handleTestLogin}
                disabled={loading}
                className="w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold text-white hover:shadow-lg transition-all disabled:opacity-50"
              >
                Test Login
              </button>
            </div>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className="mt-6 p-4 bg-purple-900/30 border border-purple-500/30 rounded-lg text-center">
            <p className="text-white">{message}</p>
          </div>
        )}

        {/* Logout Button */}
        {isAuthenticated && (
          <div className="mt-6">
            <button
              onClick={handleTestLogout}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg font-semibold text-white hover:shadow-lg transition-all disabled:opacity-50"
            >
              Test Logout
            </button>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/dashboard">
            <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20 text-center hover:bg-purple-900/30 transition-colors">
              <p className="text-purple-400 font-semibold">Login Page</p>
            </div>
          </Link>
          <Link href="/dashboard/signup">
            <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/20 text-center hover:bg-green-900/30 transition-colors">
              <p className="text-green-400 font-semibold">Signup Page</p>
            </div>
          </Link>
          <Link href="/test-connection">
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20 text-center hover:bg-blue-900/30 transition-colors">
              <p className="text-blue-400 font-semibold">Test DB</p>
            </div>
          </Link>
          <Link href="/">
            <div className="p-4 bg-cyan-900/20 rounded-lg border border-cyan-500/20 text-center hover:bg-cyan-900/30 transition-colors">
              <p className="text-cyan-400 font-semibold">Home</p>
            </div>
          </Link>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
          <h3 className="text-lg font-bold text-yellow-400 mb-3">⚠️ Setup Required</h3>
          <div className="text-gray-300 space-y-2 text-sm">
            <p>1. Go to Supabase Dashboard → Authentication → Providers</p>
            <p>2. Enable <strong>Email</strong> authentication</p>
            <p>3. Run the database schema from <code className="bg-black/30 px-2 py-1 rounded">lib/supabase-schema.sql</code></p>
            <p>4. Add the auth trigger from <code className="bg-black/30 px-2 py-1 rounded">AUTHENTICATION_GUIDE.md</code></p>
            <p>5. Test signup/login above</p>
          </div>
        </div>
      </div>
    </div>
  );
}
