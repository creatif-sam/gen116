'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import AuthGuard from '@/app/components/AuthGuard';
import DashboardSidebar from '@/app/components/DashboardSidebar';
import Breadcrumb from '@/app/components/Breadcrumb';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  auth_id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff' | 'client';
  avatar?: string;
  company?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

function UsersManagementContent() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'clients' | 'staff' | 'admins'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRole, setEditRole] = useState<'admin' | 'staff' | 'client'>('client');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (userId: string, newRole: 'admin' | 'staff' | 'client') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (error) throw error;
      
      await fetchUsers();
      setShowEditModal(false);
      setSelectedUser(null);
      alert(`User role updated to ${newRole} successfully!`);
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId: string, userEmail: string) => {
    if (!confirm(`Are you sure you want to delete user: ${userEmail}?`)) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;
      
      await fetchUsers();
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setEditRole(user.role);
    setShowEditModal(true);
  };

  const filteredUsers = users.filter(u => {
    const matchesTab = 
      activeTab === 'all' ? true :
      activeTab === 'clients' ? u.role === 'client' :
      activeTab === 'staff' ? u.role === 'staff' :
      u.role === 'admin';
    
    const matchesSearch = 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.company && u.company.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  const stats = {
    total: users.length,
    clients: users.filter(u => u.role === 'client').length,
    staff: users.filter(u => u.role === 'staff').length,
    admins: users.filter(u => u.role === 'admin').length,
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-600/20 text-purple-400 border-purple-500/30';
      case 'staff': return 'bg-blue-600/20 text-blue-400 border-blue-500/30';
      case 'client': return 'bg-green-600/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-600/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#1a1040] to-[#0a0520] flex">
      <DashboardSidebar />
      
      <div className="flex-1 lg:ml-64 p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8 mt-16 lg:mt-0">
          <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard/admin' }, { label: 'Users' }]} />
          <h2 className="text-3xl font-bold text-white mb-2">User Management</h2>
          <p className="text-gray-400">Manage all system users, roles, and permissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Users</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-lg rounded-xl p-6 border border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Clients</p>
                <p className="text-3xl font-bold text-white">{stats.clients}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Staff</p>
                <p className="text-3xl font-bold text-white">{stats.staff}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👔</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Admins</p>
                <p className="text-3xl font-bold text-white">{stats.admins}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Tabs */}
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 mb-6">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'all', label: 'All Users', count: stats.total },
              { id: 'clients', label: 'Clients', count: stats.clients },
              { id: 'staff', label: 'Staff', count: stats.staff },
              { id: 'admins', label: 'Admins', count: stats.admins },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-purple-900/20 text-gray-400 hover:bg-purple-900/30'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Users List */}
        {loading ? (
          <LoadingSpinner message="Loading users..." />
        ) : filteredUsers.length === 0 ? (
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-12 border border-purple-500/20 text-center">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-2xl font-bold text-white mb-2">No Users Found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredUsers.map((userData) => (
              <div
                key={userData.id}
                className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* User Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                      {userData.avatar ? (
                        <img src={userData.avatar} alt={userData.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span>{userData.name.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white truncate">{userData.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRoleBadgeColor(userData.role)}`}>
                          {userData.role.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-1">{userData.email}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        {userData.company && (
                          <span className="flex items-center gap-1">
                            <span>🏢</span> {userData.company}
                          </span>
                        )}
                        {userData.phone && (
                          <span className="flex items-center gap-1">
                            <span>📞</span> {userData.phone}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <span>📅</span> Joined {formatDate(userData.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => openEditModal(userData)}
                      className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg text-blue-400 text-sm font-semibold transition-all"
                    >
                      Edit Role
                    </button>
                    {userData.auth_id !== user?.id && (
                      <button
                        onClick={() => handleDeleteUser(userData.id, userData.email)}
                        className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-red-400 text-sm font-semibold transition-all"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Role Modal */}
        {showEditModal && selectedUser && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30 max-w-md w-full animate-scale-in">
              <h3 className="text-2xl font-bold text-white mb-4">Edit User Role</h3>
              <p className="text-gray-400 mb-6">
                Changing role for: <span className="text-white font-semibold">{selectedUser.email}</span>
              </p>

              <div className="space-y-3 mb-6">
                {(['client', 'staff', 'admin'] as const).map((role) => (
                  <label
                    key={role}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      editRole === role
                        ? 'border-purple-500 bg-purple-600/20'
                        : 'border-purple-500/20 bg-purple-900/20 hover:bg-purple-900/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={editRole === role}
                      onChange={(e) => setEditRole(e.target.value as any)}
                      className="w-5 h-5 text-purple-600"
                    />
                    <div>
                      <p className="text-white font-semibold capitalize">{role}</p>
                      <p className="text-gray-400 text-xs">
                        {role === 'client' && 'Can submit and view own requests'}
                        {role === 'staff' && 'Can manage tasks and clients'}
                        {role === 'admin' && 'Full system access'}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleUpdateRole(selectedUser.id, editRole)}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  Update Role
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedUser(null);
                  }}
                  className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg font-semibold hover:bg-purple-900/40 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function UsersManagementPage() {
  return (
    <AuthGuard allowedRoles={['admin']}>
      <UsersManagementContent />
    </AuthGuard>
  );
}
