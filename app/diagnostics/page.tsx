'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function DiagnosticsPage() {
  const [diagnostics, setDiagnostics] = useState<any>({
    env: {
      url: '',
      hasKey: false,
    },
    connection: {
      status: 'checking',
      error: null,
    },
    auth: {
      status: 'checking',
      session: null,
      error: null,
    },
  });

  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    // Check environment variables
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    setDiagnostics((prev: any) => ({
      ...prev,
      env: {
        url: url || 'MISSING',
        hasKey: !!key,
      },
    }));

    // Test connection
    try {
      const { data, error } = await supabase.from('profiles').select('count').limit(1);
      setDiagnostics((prev: any) => ({
        ...prev,
        connection: {
          status: error ? 'failed' : 'success',
          error: error?.message || null,
        },
      }));
    } catch (err: any) {
      setDiagnostics((prev: any) => ({
        ...prev,
        connection: {
          status: 'failed',
          error: err.message,
        },
      }));
    }

    // Check auth status
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      setDiagnostics((prev: any) => ({
        ...prev,
        auth: {
          status: error ? 'failed' : 'success',
          session: session ? {
            user_id: session.user.id,
            email: session.user.email,
            expires: new Date(session.expires_at! * 1000).toLocaleString(),
          } : null,
          error: error?.message || null,
        },
      }));
    } catch (err: any) {
      setDiagnostics((prev: any) => ({
        ...prev,
        auth: {
          status: 'failed',
          session: null,
          error: err.message,
        },
      }));
    }
  };

  const testSignup = async () => {
    // Use a valid email domain for testing
    const testEmail = `test${Date.now()}@gen11test.local`;
    const testPassword = 'test123456';
    
    console.log('Testing signup with:', testEmail);
    
    alert(`⚠️ Note: This will create a test account with email: ${testEmail}\n\nIf you get "email invalid" error, use a real email domain like @gmail.com or configure Supabase to allow test domains.`);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: {
            name: 'Test User',
            role: 'client',
          },
        },
      });
      
      console.log('Signup result:', { data, error });
      
      if (error) {
        alert(`Signup Error: ${error.message}`);
      } else if (data.user) {
        alert(`✅ Signup successful! User ID: ${data.user.id}\n\nCheck if email confirmation is required in Supabase Auth settings.`);
      }
    } catch (err: any) {
      console.error('Signup exception:', err);
      alert(`Exception: ${err.message}`);
    }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      checking: 'bg-yellow-500',
      success: 'bg-green-500',
      failed: 'bg-red-500',
    };
    return (
      <span className={`inline-block w-3 h-3 rounded-full ${colors[status as keyof typeof colors] || 'bg-gray-500'}`} />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#1a1040] to-[#0a0520] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            System Diagnostics
          </h1>
          <p className="text-gray-400">Supabase Configuration & Connection Status</p>
        </div>

        {/* Environment Variables */}
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span>🔧</span> Environment Variables
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <StatusBadge status={diagnostics.env.url !== 'MISSING' ? 'success' : 'failed'} />
              <div className="flex-1">
                <p className="text-gray-300 font-semibold">NEXT_PUBLIC_SUPABASE_URL</p>
                <code className="text-sm text-gray-400 bg-black/30 px-2 py-1 rounded block mt-1">
                  {diagnostics.env.url}
                </code>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <StatusBadge status={diagnostics.env.hasKey ? 'success' : 'failed'} />
              <div className="flex-1">
                <p className="text-gray-300 font-semibold">NEXT_PUBLIC_SUPABASE_ANON_KEY</p>
                <code className="text-sm text-gray-400 bg-black/30 px-2 py-1 rounded block mt-1">
                  {diagnostics.env.hasKey ? '✓ Present (hidden)' : '✗ MISSING'}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Database Connection */}
        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/20 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span>🗄️</span> Database Connection
          </h2>
          <div className="flex items-start gap-3">
            <StatusBadge status={diagnostics.connection.status} />
            <div className="flex-1">
              <p className="text-gray-300 font-semibold">
                {diagnostics.connection.status === 'checking' && 'Checking connection...'}
                {diagnostics.connection.status === 'success' && '✓ Connected to database'}
                {diagnostics.connection.status === 'failed' && '✗ Connection failed'}
              </p>
              {diagnostics.connection.error && (
                <code className="text-sm text-red-400 bg-black/30 px-2 py-1 rounded block mt-2">
                  {diagnostics.connection.error}
                </code>
              )}
            </div>
          </div>
        </div>

        {/* Authentication Status */}
        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-lg rounded-2xl p-6 border border-green-500/20 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span>🔐</span> Authentication Service
          </h2>
          <div className="flex items-start gap-3 mb-4">
            <StatusBadge status={diagnostics.auth.status} />
            <div className="flex-1">
              <p className="text-gray-300 font-semibold">
                {diagnostics.auth.status === 'checking' && 'Checking auth service...'}
                {diagnostics.auth.status === 'success' && '✓ Auth service available'}
                {diagnostics.auth.status === 'failed' && '✗ Auth service error'}
              </p>
              {diagnostics.auth.error && (
                <code className="text-sm text-red-400 bg-black/30 px-2 py-1 rounded block mt-2">
                  {diagnostics.auth.error}
                </code>
              )}
            </div>
          </div>
          {diagnostics.auth.session ? (
            <div className="bg-black/30 p-4 rounded-lg">
              <p className="text-green-400 font-semibold mb-2">✓ Active Session</p>
              <div className="text-sm text-gray-400 space-y-1">
                <p><strong>User ID:</strong> {diagnostics.auth.session.user_id}</p>
                <p><strong>Email:</strong> {diagnostics.auth.session.email}</p>
                <p><strong>Expires:</strong> {diagnostics.auth.session.expires}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No active session</p>
          )}
        </div>

        {/* Test Actions */}
        <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/20 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span>🧪</span> Test Actions
          </h2>
          <div className="space-y-4">
            <button
              onClick={testSignup}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-white hover:shadow-lg transition-all"
            >
              Test Signup (Create Random User)
            </button>
            <p className="text-sm text-gray-400">
              This will attempt to create a test user with Supabase Auth and log the results to the console.
            </p>
          </div>
        </div>

        {/* Common Issues */}
        <div className="bg-gradient-to-br from-red-900/30 to-pink-900/30 backdrop-blur-lg rounded-2xl p-6 border border-red-500/20 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span>⚠️</span> Common Issues & Solutions
          </h2>
          <div className="space-y-4 text-sm text-gray-300">
            <div>
              <p className="font-semibold text-white mb-1">✗ Environment variables missing</p>
              <p className="text-gray-400">Check that <code className="bg-black/30 px-2 py-1 rounded">.env.local</code> file exists and contains both variables</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-1">✗ Email provider not enabled</p>
              <p className="text-gray-400">Go to Supabase Dashboard → Authentication → Providers → Enable Email</p>
            </div>
            <div>
              <p className="font-semibold text-red-400 mb-1">✗ Email address invalid (@example.com blocked)</p>
              <p className="text-gray-400">Supabase blocks test domains like @example.com, @test.com. Use real domains like @gmail.com or configure your own domain in Supabase Email settings.</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-1">✗ Database tables missing</p>
              <p className="text-gray-400">Run the SQL schema from <code className="bg-black/30 px-2 py-1 rounded">lib/supabase-schema.sql</code></p>
            </div>
            <div>
              <p className="font-semibold text-white mb-1">✗ Infinite recursion in RLS policies</p>
              <p className="text-gray-400">Run <code className="bg-black/30 px-2 py-1 rounded">lib/add-auth-id.sql</code> then <code className="bg-black/30 px-2 py-1 rounded">lib/supabase-rls-fix.sql</code></p>
            </div>
            <div>
              <p className="font-semibold text-white mb-1">✗ Email confirmation required</p>
              <p className="text-gray-400">In Supabase Auth settings, disable "Enable email confirmations" for development</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/auth-test">
            <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20 text-center hover:bg-purple-900/30 transition-colors">
              <p className="text-purple-400 font-semibold">Auth Test</p>
            </div>
          </Link>
          <Link href="/test-connection">
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20 text-center hover:bg-blue-900/30 transition-colors">
              <p className="text-blue-400 font-semibold">DB Test</p>
            </div>
          </Link>
          <Link href="/auth/register">
            <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/20 text-center hover:bg-green-900/30 transition-colors">
              <p className="text-green-400 font-semibold">Signup</p>
            </div>
          </Link>
          <Link href="/">
            <div className="p-4 bg-cyan-900/20 rounded-lg border border-cyan-500/20 text-center hover:bg-cyan-900/30 transition-colors">
              <p className="text-cyan-400 font-semibold">Home</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
