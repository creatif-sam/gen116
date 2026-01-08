'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import AuthGuard from '@/app/components/AuthGuard';
import DashboardSidebar from '@/app/components/DashboardSidebar';

function AdminDashboardContent() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  const stats = [
    { label: 'Total Clients', value: '47', change: '+12%', icon: '👥', color: 'from-purple-600 to-blue-600' },
    { label: 'Active Projects', value: '23', change: '+5%', icon: '📊', color: 'from-blue-600 to-cyan-600' },
    { label: 'Staff Members', value: '12', change: '+2', icon: '👔', color: 'from-green-600 to-emerald-600' },
    { label: 'Revenue (MTD)', value: '$45K', change: '+18%', icon: '💰', color: 'from-yellow-600 to-orange-600' },
  ];

  const recentActivity = [
    { type: 'new-client', user: 'John Doe', action: 'registered as new client', time: '5 min ago' },
    { type: 'request', user: 'Jane Smith', action: 'submitted a new request', time: '12 min ago' },
    { type: 'completed', user: 'Staff: Mike', action: 'completed "Website Redesign"', time: '1 hour ago' },
    { type: 'payment', user: 'Acme Corp', action: 'made payment of $5,000', time: '2 hours ago' },
  ];

  const staffPerformance = [
    { name: 'Mike Johnson', completed: 12, active: 3, rating: 4.8 },
    { name: 'Sarah Williams', completed: 10, active: 5, rating: 4.9 },
    { name: 'David Brown', completed: 8, active: 2, rating: 4.7 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#1a1040] to-[#0a0520] flex">
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64 p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8 mt-16 lg:mt-0">
          <h2 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h2>
          <p className="text-gray-400">Overview of your business operations</p>
        </div>
        {/* Main Content */}
        <div className="mb-8 mt-16 lg:mt-0">
          <h2 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h2>
          <p className="text-gray-400">Complete system overview and management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:scale-105 transition-transform">
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
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-3 overflow-x-auto">
          {['overview', 'users', 'requests', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold capitalize whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-purple-900/20 text-gray-400 hover:bg-purple-900/30'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 mb-6">
              <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                      activity.type === 'new-client' ? 'bg-purple-600/20' :
                      activity.type === 'request' ? 'bg-blue-600/20' :
                      activity.type === 'completed' ? 'bg-green-600/20' :
                      'bg-yellow-600/20'
                    }`}>
                      {activity.type === 'new-client' ? '👤' :
                       activity.type === 'request' ? '📋' :
                       activity.type === 'completed' ? '✅' :
                       '💳'}
                    </div>
                    <div className="flex-1">
                      <p className="text-white">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-gray-400 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Staff Performance */}
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-bold text-white mb-6">Staff Performance</h3>
              <div className="space-y-4">
                {staffPerformance.map((staff, index) => (
                  <div key={index} className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                          {staff.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{staff.name}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-yellow-400">⭐ {staff.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Completed</p>
                        <p className="text-white font-semibold">{staff.completed} projects</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Active</p>
                        <p className="text-white font-semibold">{staff.active} projects</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & System Health */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-center hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105">
                  + Add New User
                </button>
                <button className="w-full py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg font-semibold text-center hover:bg-purple-900/40 transition-all">
                  📊 Generate Report
                </button>
                <button className="w-full py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg font-semibold text-center hover:bg-purple-900/40 transition-all">
                  ⚙️ System Settings
                </button>
                <button className="w-full py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg font-semibold text-center hover:bg-purple-900/40 transition-all">
                  📧 Send Broadcast
                </button>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20">
              <h3 className="text-lg font-bold text-white mb-4">System Health</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Server Load</span>
                    <span className="text-green-400 font-semibold">Good</span>
                  </div>
                  <div className="w-full bg-purple-900/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Database</span>
                    <span className="text-green-400 font-semibold">Optimal</span>
                  </div>
                  <div className="w-full bg-purple-900/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">API Response</span>
                    <span className="text-green-400 font-semibold">45ms</span>
                  </div>
                  <div className="w-full bg-purple-900/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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