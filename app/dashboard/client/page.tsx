'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import AuthGuard from '@/app/components/AuthGuard';

function ClientDashboardContent() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    await logout();
    router.push('/dashboard');
  };

  const stats = [
    { label: 'Active Requests', value: '3', icon: '📋', color: 'from-purple-600 to-blue-600' },
    { label: 'Completed', value: '12', icon: '✅', color: 'from-green-600 to-emerald-600' },
    { label: 'Pending', value: '2', icon: '⏳', color: 'from-yellow-600 to-orange-600' },
    { label: 'Total Projects', value: '15', icon: '📊', color: 'from-blue-600 to-cyan-600' },
  ];

  const recentRequests = [
    { id: '1', title: 'Website Redesign', status: 'in-progress', priority: 'high', date: '2026-01-05' },
    { id: '2', title: 'Mobile App Development', status: 'pending', priority: 'urgent', date: '2026-01-04' },
    { id: '3', title: 'Logo Design', status: 'completed', priority: 'medium', date: '2026-01-03' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#1a1040] to-[#0a0520]">
      {/* Top Navigation */}
      <nav className="bg-[#0a0520]/95 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-xl">🏢</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">GEN11 CONSULT</h1>
              <p className="text-xs text-gray-400">Client Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm text-white font-semibold">{user?.email}</p>
              <p className="text-xs text-purple-400">Client Account</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-red-400 text-sm font-semibold transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back! 👋</h2>
          <p className="text-gray-400">Manage your projects and submit new requests</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Requests */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Recent Requests</h3>
                <Link
                  href="/dashboard/client/requests"
                  className="text-sm text-purple-400 hover:text-purple-300 font-semibold"
                >
                  View All →
                </Link>
              </div>

              <div className="space-y-4">
                {recentRequests.map((request) => (
                  <div key={request.id} className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10 hover:border-purple-500/30 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">{request.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        request.status === 'completed' ? 'bg-green-600/20 text-green-400' :
                        request.status === 'in-progress' ? 'bg-blue-600/20 text-blue-400' :
                        'bg-yellow-600/20 text-yellow-400'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className={`px-2 py-1 rounded ${
                        request.priority === 'urgent' ? 'bg-red-600/20 text-red-400' :
                        request.priority === 'high' ? 'bg-orange-600/20 text-orange-400' :
                        'bg-gray-600/20 text-gray-400'
                      }`}>
                        {request.priority}
                      </span>
                      <span>📅 {request.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/dashboard/client/submit-request"
                  className="block w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-center hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105"
                >
                  ✨ New Request
                </Link>
                <Link
                  href="/dashboard/client/requests"
                  className="block w-full py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg font-semibold text-center hover:bg-purple-900/40 transition-all"
                >
                  📋 View All Requests
                </Link>
                <Link
                  href="/dashboard/client/uploads"
                  className="block w-full py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg font-semibold text-center hover:bg-purple-900/40 transition-all"
                >
                  📎 Upload Files
                </Link>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20">
              <h3 className="text-lg font-bold text-white mb-3">Need Help?</h3>
              <p className="text-gray-400 text-sm mb-4">Our support team is here to assist you</p>
              <a
                href="/contact"
                className="block w-full py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-center text-blue-400 font-semibold hover:bg-blue-600/30 transition-all"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function ClientDashboard() {
  return (
    <AuthGuard allowedRoles={['client']}>
      <ClientDashboardContent />
    </AuthGuard>
  );
}