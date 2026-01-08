'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import AuthGuard from '@/app/components/AuthGuard';
import DashboardSidebar from '@/app/components/DashboardSidebar';

function StaffDashboardContent() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  const stats = [
    { label: 'Assigned to Me', value: '8', icon: '👤', color: 'from-purple-600 to-blue-600' },
    { label: 'In Progress', value: '5', icon: '⚙️', color: 'from-blue-600 to-cyan-600' },
    { label: 'Pending Review', value: '12', icon: '⏳', color: 'from-yellow-600 to-orange-600' },
    { label: 'Completed Today', value: '3', icon: '✅', color: 'from-green-600 to-emerald-600' },
  ];

  const requests = [
    { id: '1', client: 'John Doe', title: 'Website Redesign', category: 'Web Development', status: 'in-progress', priority: 'high', date: '2026-01-05', assignedTo: 'me' },
    { id: '2', client: 'Jane Smith', title: 'Mobile App', category: 'Software Development', status: 'pending', priority: 'urgent', date: '2026-01-04', assignedTo: 'unassigned' },
    { id: '3', client: 'Acme Corp', title: 'Logo Design', category: 'Graphic Design', status: 'in-progress', priority: 'medium', date: '2026-01-03', assignedTo: 'me' },
    { id: '4', client: 'Tech Start', title: 'Data Analysis', category: 'Data Analytics', status: 'pending', priority: 'high', date: '2026-01-02', assignedTo: 'unassigned' },
  ];

  const filteredRequests = activeFilter === 'all' 
    ? requests 
    : requests.filter(r => r.status === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#1a1040] to-[#0a0520] flex">
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64 p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8 mt-16 lg:mt-0">
          <h2 className="text-3xl font-bold text-white mb-2">Staff Dashboard</h2>
          <p className="text-gray-400">Manage client requests and projects</p>
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

        {/* Filters */}
        <div className="mb-6 flex gap-3 overflow-x-auto">
          {['all', 'pending', 'in-progress', 'completed'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-lg font-semibold capitalize whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-purple-900/20 text-gray-400 hover:bg-purple-900/30'
              }`}
            >
              {filter === 'all' ? 'All Requests' : filter}
            </button>
          ))}
        </div>

        {/* Requests Table */}
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl border border-purple-500/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-purple-900/40 border-b border-purple-500/20">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Request</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Priority</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="border-b border-purple-500/10 hover:bg-purple-900/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-sm">
                          {request.client.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{request.client}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white font-semibold">{request.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-400 text-sm">{request.category}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        request.priority === 'urgent' ? 'bg-red-600/20 text-red-400' :
                        request.priority === 'high' ? 'bg-orange-600/20 text-orange-400' :
                        request.priority === 'medium' ? 'bg-yellow-600/20 text-yellow-400' :
                        'bg-gray-600/20 text-gray-400'
                      }`}>
                        {request.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        request.status === 'completed' ? 'bg-green-600/20 text-green-400' :
                        request.status === 'in-progress' ? 'bg-blue-600/20 text-blue-400' :
                        'bg-yellow-600/20 text-yellow-400'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{request.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded text-xs font-semibold hover:bg-blue-600/30 transition-all">
                          View
                        </button>
                        {request.assignedTo === 'unassigned' && (
                          <button className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded text-xs font-semibold hover:bg-purple-600/30 transition-all">
                            Assign
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function StaffDashboard() {
  return (
    <AuthGuard allowedRoles={['staff', 'admin']}>
      <StaffDashboardContent />
    </AuthGuard>
  );
}