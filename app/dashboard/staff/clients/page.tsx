'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import AuthGuard from '@/app/components/AuthGuard';
import DashboardSidebar from '@/app/components/DashboardSidebar';
import Breadcrumb from '@/app/components/Breadcrumb';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { supabase } from '@/lib/supabase';

function ClientsPageContent() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      // Query profiles table for clients
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'client')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      // Fallback to mock data
      const mockClients = [
        { 
          id: '1', 
          name: 'John Doe', 
          email: 'john@example.com', 
          company: 'Tech Corp', 
          phone: '+1 (555) 123-4567',
          status: 'active',
          projects: 3,
          total_spent: '$45,000',
          created_at: '2025-12-15',
          last_contact: '2026-01-05'
        },
        { 
          id: '2', 
          name: 'Jane Smith', 
          email: 'jane@startup.com', 
          company: 'StartupXYZ', 
          phone: '+1 (555) 234-5678',
          status: 'active',
          projects: 1,
          total_spent: '$12,500',
          created_at: '2026-01-02',
          last_contact: '2026-01-06'
        },
        { 
          id: '3', 
          name: 'Robert Johnson', 
          email: 'robert@corp.com', 
          company: 'Global Industries', 
          phone: '+1 (555) 345-6789',
          status: 'inactive',
          projects: 5,
          total_spent: '$89,000',
          created_at: '2025-11-20',
          last_contact: '2025-12-28'
        },
        { 
          id: '4', 
          name: 'Emily Davis', 
          email: 'emily@design.co', 
          company: 'Creative Design Co', 
          phone: '+1 (555) 456-7890',
          status: 'active',
          projects: 2,
          total_spent: '$28,000',
          created_at: '2025-12-01',
          last_contact: '2026-01-07'
        },
      ];
      setClients(mockClients);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (client: any) => {
    setSelectedClient(client);
    setShowDetailsModal(true);
  };

  const handleContactClient = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    inactive: clients.filter(c => c.status === 'inactive').length,
    newThisMonth: clients.filter(c => {
      const clientDate = new Date(c.created_at);
      const now = new Date();
      return clientDate.getMonth() === now.getMonth() && clientDate.getFullYear() === now.getFullYear();
    }).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#1a1040] to-[#0a0520] flex">
      <DashboardSidebar />
      
      <div className="flex-1 lg:ml-64 p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8 mt-16 lg:mt-0">
          <Breadcrumb items={[
            { label: 'Dashboard', href: '/dashboard/staff' }, 
            { label: 'Clients' }
          ]} />
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Client Management</h2>
              <p className="text-gray-400">View and manage all client accounts</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-4 border border-purple-500/20">
              <div className="text-gray-400 text-sm mb-1">Total Clients</div>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-lg rounded-xl p-4 border border-green-500/20">
              <div className="text-gray-400 text-sm mb-1">Active</div>
              <div className="text-2xl font-bold text-white">{stats.active}</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-lg rounded-xl p-4 border border-yellow-500/20">
              <div className="text-gray-400 text-sm mb-1">Inactive</div>
              <div className="text-2xl font-bold text-white">{stats.inactive}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-lg rounded-xl p-4 border border-blue-500/20">
              <div className="text-gray-400 text-sm mb-1">New This Month</div>
              <div className="text-2xl font-bold text-white">{stats.newThisMonth}</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-purple-900/20 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:border-purple-500/40 focus:outline-none"
            />
          </div>
          <div className="flex gap-3">
            {['all', 'active', 'inactive'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-6 py-3 rounded-lg font-semibold capitalize whitespace-nowrap transition-all ${
                  filterStatus === status
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-purple-900/20 text-gray-400 hover:bg-purple-900/30'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Clients Grid */}
        {loading ? (
          <LoadingSpinner message="Loading clients..." />
        ) : filteredClients.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
            <p className="text-gray-400 text-lg">No clients found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all"
              >
                {/* Client Avatar and Name */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
                    {client.name?.charAt(0) || client.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{client.name || 'N/A'}</h3>
                    <p className="text-gray-400 text-sm">{client.company || 'No company'}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    client.status === 'active' 
                      ? 'bg-green-600/20 text-green-400' 
                      : 'bg-gray-600/20 text-gray-400'
                  }`}>
                    {client.status || 'unknown'}
                  </span>
                </div>

                {/* Client Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">📧</span>
                    <span className="text-gray-400 truncate">{client.email}</span>
                  </div>
                  {client.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500">📞</span>
                      <span className="text-gray-400">{client.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">📅</span>
                    <span className="text-gray-400">Joined: {new Date(client.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Stats */}
                {(client.projects || client.total_spent) && (
                  <div className="grid grid-cols-2 gap-3 mb-4 pt-3 border-t border-purple-500/20">
                    {client.projects !== undefined && (
                      <div>
                        <div className="text-xs text-gray-500">Projects</div>
                        <div className="text-lg font-bold text-white">{client.projects}</div>
                      </div>
                    )}
                    {client.total_spent && (
                      <div>
                        <div className="text-xs text-gray-500">Total Spent</div>
                        <div className="text-lg font-bold text-white">{client.total_spent}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(client)}
                    className="flex-1 px-3 py-2 bg-blue-600/20 text-blue-400 rounded-lg text-sm font-semibold hover:bg-blue-600/30 transition-all"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleContactClient(client.email)}
                    className="flex-1 px-3 py-2 bg-purple-600/20 text-purple-400 rounded-lg text-sm font-semibold hover:bg-purple-600/30 transition-all"
                  >
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Client Details Modal */}
        {showDetailsModal && selectedClient && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-3xl font-bold">
                    {selectedClient.name?.charAt(0) || selectedClient.email?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedClient.name || 'N/A'}</h3>
                    <p className="text-gray-400">{selectedClient.company || 'No company'}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                      selectedClient.status === 'active' 
                        ? 'bg-green-600/20 text-green-400' 
                        : 'bg-gray-600/20 text-gray-400'
                    }`}>
                      {selectedClient.status || 'unknown'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 mb-6">
                <h4 className="text-lg font-bold text-white mb-3">Contact Information</h4>
                <div className="bg-black/20 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500">📧</span>
                    <div>
                      <div className="text-xs text-gray-500">Email</div>
                      <div className="text-white">{selectedClient.email}</div>
                    </div>
                  </div>
                  {selectedClient.phone && (
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500">📞</span>
                      <div>
                        <div className="text-xs text-gray-500">Phone</div>
                        <div className="text-white">{selectedClient.phone}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-4 mb-6">
                <h4 className="text-lg font-bold text-white mb-3">Account Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/20 rounded-lg p-4">
                    <div className="text-xs text-gray-500 mb-1">Member Since</div>
                    <div className="text-white font-semibold">
                      {new Date(selectedClient.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  {selectedClient.last_contact && (
                    <div className="bg-black/20 rounded-lg p-4">
                      <div className="text-xs text-gray-500 mb-1">Last Contact</div>
                      <div className="text-white font-semibold">
                        {new Date(selectedClient.last_contact).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                  {selectedClient.projects !== undefined && (
                    <div className="bg-black/20 rounded-lg p-4">
                      <div className="text-xs text-gray-500 mb-1">Total Projects</div>
                      <div className="text-white font-semibold text-2xl">{selectedClient.projects}</div>
                    </div>
                  )}
                  {selectedClient.total_spent && (
                    <div className="bg-black/20 rounded-lg p-4">
                      <div className="text-xs text-gray-500 mb-1">Total Spent</div>
                      <div className="text-white font-semibold text-2xl">{selectedClient.total_spent}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t border-purple-500/20">
                <button
                  onClick={() => handleContactClient(selectedClient.email)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:scale-105 transition-transform"
                >
                  Send Email
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg font-semibold hover:bg-purple-900/40 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ClientsPage() {
  return (
    <AuthGuard allowedRoles={['staff', 'admin']}>
      <ClientsPageContent />
    </AuthGuard>
  );
}
