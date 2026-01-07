'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { analyticsAPI, userAPI, requestAPI } from '@/lib/api';
import Link from 'next/link';

export default function TestConnectionPage() {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'success' | 'error'>('testing');
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      // Test 1: Check Supabase connection
      const { data, error: connError } = await supabase.from('users').select('count');
      
      if (connError) {
        setConnectionStatus('error');
        setError(`Connection Error: ${connError.message}`);
        return;
      }

      // Test 2: Get statistics
      const stats = await analyticsAPI.getDashboardStats();
      setStats(stats);

      // Test 3: Check tables exist
      const tables = ['users', 'requests', 'attachments', 'comments'];
      for (const table of tables) {
        const { error: tableError } = await supabase.from(table).select('count', { count: 'exact', head: true });
        if (tableError) {
          setConnectionStatus('error');
          setError(`Table "${table}" not found. Please run the SQL schema.`);
          return;
        }
      }

      setConnectionStatus('success');
    } catch (err: any) {
      setConnectionStatus('error');
      setError(err.message || 'Unknown error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#1a1040] to-[#0a0520] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Supabase Connection Test
            </h1>
            <p className="text-gray-400">Verifying database integration</p>
          </div>

          {/* Connection Status */}
          <div className="mb-8">
            <div className={`flex items-center justify-center gap-4 p-6 rounded-xl ${
              connectionStatus === 'testing' ? 'bg-yellow-900/20 border border-yellow-500/30' :
              connectionStatus === 'success' ? 'bg-green-900/20 border border-green-500/30' :
              'bg-red-900/20 border border-red-500/30'
            }`}>
              <div className="text-5xl">
                {connectionStatus === 'testing' ? '🔄' :
                 connectionStatus === 'success' ? '✅' : '❌'}
              </div>
              <div>
                <h3 className={`text-xl font-bold ${
                  connectionStatus === 'testing' ? 'text-yellow-400' :
                  connectionStatus === 'success' ? 'text-green-400' :
                  'text-red-400'
                }`}>
                  {connectionStatus === 'testing' ? 'Testing Connection...' :
                   connectionStatus === 'success' ? 'Connected Successfully!' :
                   'Connection Failed'}
                </h3>
                <p className="text-gray-400 text-sm">
                  {connectionStatus === 'testing' ? 'Please wait...' :
                   connectionStatus === 'success' ? 'Your Supabase database is ready' :
                   error}
                </p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          {connectionStatus === 'success' && stats && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Database Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
                  <p className="text-gray-400 text-sm mb-1">Total Requests</p>
                  <p className="text-3xl font-bold text-white">{stats.totalRequests || 0}</p>
                </div>
                <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/10">
                  <p className="text-gray-400 text-sm mb-1">Pending</p>
                  <p className="text-3xl font-bold text-white">{stats.pending || 0}</p>
                </div>
                <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/10">
                  <p className="text-gray-400 text-sm mb-1">In Progress</p>
                  <p className="text-3xl font-bold text-white">{stats.inProgress || 0}</p>
                </div>
                <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/10">
                  <p className="text-gray-400 text-sm mb-1">Completed</p>
                  <p className="text-3xl font-bold text-white">{stats.completed || 0}</p>
                </div>
              </div>
            </div>
          )}

          {/* Connection Details */}
          <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-500/10 mb-8">
            <h3 className="text-lg font-bold text-white mb-4">Configuration</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Supabase URL:</span>
                <span className="text-white font-mono">
                  {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Configured' : '❌ Missing'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">API Key:</span>
                <span className="text-white font-mono">
                  {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Configured' : '❌ Missing'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tables Created:</span>
                <span className="text-white">
                  {connectionStatus === 'success' ? '✅ All tables exist' : '⏳ Checking...'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={testConnection}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              🔄 Test Again
            </button>
            <Link
              href="/dashboard"
              className="flex-1 py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg font-semibold text-center hover:bg-purple-900/40 transition-all"
            >
              Go to Dashboard
            </Link>
          </div>

          {/* Help Text */}
          {connectionStatus === 'error' && (
            <div className="mt-6 bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-400 font-semibold mb-2">⚠️ Troubleshooting</h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Make sure you've run the SQL schema in Supabase SQL Editor</li>
                <li>• Check that your .env.local file has the correct credentials</li>
                <li>• Verify your Supabase project is active</li>
                <li>• Check SUPABASE_SETUP.md for detailed instructions</li>
              </ul>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
