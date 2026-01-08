'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import AuthGuard from '@/app/components/AuthGuard';
import DashboardSidebar from '@/app/components/DashboardSidebar';
import Breadcrumb from '@/app/components/Breadcrumb';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { supabase } from '@/lib/supabase';

function StaffProfileContent() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    avatar: '',
    role: 'staff'
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      // Get current authenticated user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user?.id) {
        console.error('No authenticated user');
        setLoading(false);
        return;
      }

      // Fetch profile from Supabase
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('auth_id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        // If profile doesn't exist, create it
        if (error.code === 'PGRST116') {
          await createProfile(session.user);
        }
      } else if (data) {
        setProfile({
          name: data.name || '',
          email: data.email || session.user.email || '',
          phone: data.phone || '',
          company: data.company || '',
          avatar: data.avatar || '',
          role: data.role || 'staff'
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (authUser: any) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert([{
          auth_id: authUser.id,
          email: authUser.email,
          name: authUser.email.split('@')[0],
          role: 'staff'
        }]);

      if (error) throw error;
      
      // Fetch the newly created profile
      await fetchProfile();
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to create profile. Please contact administrator.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Get current authenticated user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user?.id) {
        alert('Please log in to update profile');
        return;
      }

      // Update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          name: profile.name,
          phone: profile.phone,
          company: profile.company,
          avatar: profile.avatar
        })
        .eq('auth_id', session.user.id);

      if (error) throw error;

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#1a1040] to-[#0a0520] flex items-center justify-center">
        <LoadingSpinner message="Loading profile..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#1a1040] to-[#0a0520] flex">
      <DashboardSidebar />
      
      <div className="flex-1 lg:ml-64 p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8 mt-16 lg:mt-0">
          <Breadcrumb items={[
            { label: 'Dashboard', href: '/dashboard/staff' }, 
            { label: 'Profile' }
          ]} />
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">My Profile</h2>
              <p className="text-gray-400">Manage your account information</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg border border-red-500/20 transition-all"
              title="Logout"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <div className="max-w-3xl">
          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8">
            {/* Avatar Section */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-purple-500/20">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-4xl font-bold text-white">
                {profile.name ? profile.name.charAt(0).toUpperCase() : '?'}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{profile.name || 'Staff Member'}</h3>
                <p className="text-gray-400">{profile.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                  {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                </span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-3 bg-black/30 border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500/50 transition-all"
                  required
                />
              </div>

              {/* Email (read-only) */}
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/10 rounded-lg text-gray-500 cursor-not-allowed"
                />
                <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 bg-black/30 border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Company/Department
                </label>
                <input
                  type="text"
                  value={profile.company}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  placeholder="e.g. Engineering Department"
                  className="w-full px-4 py-3 bg-black/30 border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>

              {/* Role (read-only) */}
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Role
                </label>
                <input
                  type="text"
                  value={profile.role}
                  disabled
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/10 rounded-lg text-gray-500 cursor-not-allowed"
                />
                <p className="text-sm text-gray-500 mt-1">Role is managed by administrators</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 pt-8 border-t border-purple-500/20">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : '💾 Save Changes'}
              </button>
              <button
                type="button"
                onClick={fetchProfile}
                className="px-6 py-3 bg-gray-700/30 hover:bg-gray-700/50 text-gray-300 rounded-lg font-medium transition-all border border-gray-600/20"
              >
                ↻ Reset
              </button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
            <p className="text-sm text-gray-400">
              <strong className="text-blue-400">💡 Tip:</strong> Keep your profile up to date so your team can reach you easily.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StaffProfilePage() {
  return (
    <AuthGuard allowedRoles={['staff', 'admin']}>
      <StaffProfileContent />
    </AuthGuard>
  );
}
