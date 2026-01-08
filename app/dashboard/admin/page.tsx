'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import AuthGuard from '@/app/components/AuthGuard';
import DashboardSidebar from '@/app/components/DashboardSidebar';
import Breadcrumb from '@/app/components/Breadcrumb';
import { supabase } from '@/lib/supabase';

interface DashboardStats {
  totalClients: number;
  activeRequests: number;
  staffMembers: number;
  totalUsers: number;
}

interface Activity {
  id: string;
  type: string;
  user: string;
  action: string;
  time: string;
}

function AdminDashboardContent() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    activeRequests: 0,
    staffMembers: 0,
    totalUsers: 0
  });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch user counts
      const { data: allUsers, error: usersError } = await supabase
        .from('profiles')
        .select('role');

      if (!usersError && allUsers) {
        const clients = allUsers.filter(u => u.role === 'client').length;
        const staff = allUsers.filter(u => u.role === 'staff').length;
        
        setStats({
          totalClients: clients,
          activeRequests: 0, // Will be populated when requests table is ready
          staffMembers: staff,
          totalUsers: allUsers.length
        });
      }

      // Fetch recent users
      const { data: recent, error: recentError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!recentError && recent) {
        setRecentUsers(recent);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers.toString(), change: '+12%', icon: '👥', color: 'from-purple-600 to-blue-600', link: '/dashboard/admin/users' },
    { label: 'Active Clients', value: stats.totalClients.toString(), change: '+5%', icon: '👤', color: 'from-blue-600 to-cyan-600', link: '/dashboard/admin/users' },
    { label: 'Staff Members', value: stats.staffMembers.toString(), change: '+2', icon: '👔', color: 'from-green-600 to-emerald-600', link: '/dashboard/admin/users' },
    { label: 'Active Requests', value: stats.activeRequests.toString(), change: '0%', icon: '📋', color: 'from-yellow-600 to-orange-600', link: '/dashboard/admin' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#1a1040] to-[#0a0520] flex">
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64 p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8 mt-16 lg:mt-0">
          <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard/admin' }, { label: 'Overview' }]} />
          <h2 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h2>
          <p className="text-gray-400">Complete system overview and management</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat, index) => (
                <Link
                  key={index}
                  href={stat.link}
                  className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:scale-105 hover:border-purple-500/40 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-2xl`}>
                      {stat.icon}
                    </div>
                    <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-xs font-semibold">
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </Link>
              ))}
            </div>

            {/* Tabs */}
            <div className="mb-6 flex gap-3 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'users', label: 'Users', link: '/dashboard/admin/users' },
                { id: 'portfolio', label: 'Portfolio', link: '/dashboard/admin/portfolio' },
                { id: 'logs', label: 'Activity Logs', link: '/dashboard/admin/activity-logs' }
              ].map((tab) => (
                tab.link ? (
                  <Link
                    key={tab.id}
                    href={tab.link}
                    className="px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all bg-purple-900/20 text-gray-400 hover:bg-purple-900/30"
                  >
                    {tab.label}
                  </Link>
                ) : (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'bg-purple-900/20 text-gray-400 hover:bg-purple-900/30'
                    }`}
                  >
                    {tab.label}
                  </button>
                )
              ))}
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Users */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Recent Users</h3>
                    <Link
                      href="/dashboard/admin/users"
                      className="text-purple-400 hover:text-purple-300 text-sm font-semibold"
                    >
                      View All →
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {recentUsers.length === 0 ? (
                      <p className="text-gray-400 text-center py-8">No users registered yet</p>
                    ) : (
                      recentUsers.map((userData) => (
                        <div key={userData.id} className="flex items-start gap-4 bg-purple-900/20 rounded-lg p-4 border border-purple-500/10 hover:bg-purple-900/30 transition-all">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-lg font-bold">
                            {userData.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-white font-semibold truncate">{userData.name}</p>
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                userData.role === 'admin' ? 'bg-purple-600/20 text-purple-400' :
                                userData.role === 'staff' ? 'bg-blue-600/20 text-blue-400' :
                                'bg-green-600/20 text-green-400'
                              }`}>
                                {userData.role}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm truncate">{userData.email}</p>
                            <p className="text-gray-500 text-xs mt-1">Joined {formatTimeAgo(userData.created_at)}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* System Stats */}
                <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
                  <h3 className="text-xl font-bold text-white mb-6">User Distribution</h3>
                  <div className="space-y-4">
                    <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Clients</span>
                        <span className="text-white font-semibold">{stats.totalClients}</span>
                      </div>
                      <div className="w-full bg-purple-900/30 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full transition-all"
                          style={{ width: `${stats.totalUsers > 0 ? (stats.totalClients / stats.totalUsers) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Staff</span>
                        <span className="text-white font-semibold">{stats.staffMembers}</span>
                      </div>
                      <div className="w-full bg-purple-900/30 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all"
                          style={{ width: `${stats.totalUsers > 0 ? (stats.staffMembers / stats.totalUsers) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Admins</span>
                        <span className="text-white font-semibold">{stats.totalUsers - stats.totalClients - stats.staffMembers}</span>
                      </div>
                      <div className="w-full bg-purple-900/30 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                          style={{ width: `${stats.totalUsers > 0 ? ((stats.totalUsers - stats.totalClients - stats.staffMembers) / stats.totalUsers) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions & System Health */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
                  <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link
                      href="/dashboard/admin/users"
                      className="block w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-center hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105"
                    >
                      👥 Manage Users
                    </Link>
                    <Link
                      href="/dashboard/admin/portfolio"
                      className="block w-full py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg font-semibold text-center hover:bg-purple-900/40 transition-all"
                    >
                      📊 View Portfolio
                    </Link>
                    <Link
                      href="/dashboard/admin/activity-logs"
                      className="block w-full py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg font-semibold text-center hover:bg-purple-900/40 transition-all"
                    >
                      📋 Activity Logs
                    </Link>
                    <button
                      onClick={() => fetchDashboardData()}
                      className="w-full py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg font-semibold text-center hover:bg-purple-900/40 transition-all"
                    >
                      🔄 Refresh Data
                    </button>
                  </div>
                </div>

                {/* System Health */}
                <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
                  <h3 className="text-xl font-bold text-white mb-4">System Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Database</span>
                      <span className="flex items-center gap-2 text-green-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Authentication</span>
                      <span className="flex items-center gap-2 text-green-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total Users</span>
                      <span className="text-white font-semibold">{stats.totalUsers}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Last Updated</span>
                      <span className="text-gray-400 text-sm">Just now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AuthGuard allowedRoles={['admin']}>
      <AdminDashboardContent />
    </AuthGuard>
  );
}