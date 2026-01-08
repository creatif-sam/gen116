'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  const clientNavItems = [
    { name: 'Dashboard', href: '/dashboard/client', icon: '📊' },
    { name: 'My Requests', href: '/dashboard/client/requests', icon: '📋' },
    { name: 'New Request', href: '/dashboard/client/submit-request', icon: '➕' },
    { name: 'Profile', href: '/dashboard/client/profile', icon: '👤' },
  ];

  const adminNavItems = [
    { name: 'Dashboard', href: '/dashboard/admin', icon: '📊' },
    { name: 'Portfolio Manager', href: '/dashboard/admin/portfolio', icon: '💼' },
    { name: 'Activity Logs', href: '/dashboard/admin/activity-logs', icon: '📝' },
    { name: 'Users', href: '/dashboard/admin/users', icon: '👥' },
  ];

  const staffNavItems = [
    { name: 'Dashboard', href: '/dashboard/staff', icon: '📊' },
    { name: 'My Tasks', href: '/dashboard/staff/tasks', icon: '📋' },
    { name: 'Clients', href: '/dashboard/staff/clients', icon: '👥' },
  ];

  const navItems = user?.role === 'admin' ? adminNavItems : user?.role === 'staff' ? staffNavItems : clientNavItems;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-purple-600 rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isCollapsed ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-[#0a0520] to-[#1a1040] border-r border-purple-500/20 transition-all duration-300 z-40 ${
          isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0 w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="p-6 border-b border-purple-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex-shrink-0">
                <img src="/logos/logo-navbar.png" alt="GEN11 Logo" className="w-full h-full object-contain" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-lg font-bold text-white">GEN11</h1>
                  <p className="text-xs text-purple-400 capitalize">{user?.role} Portal</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                          : 'text-gray-400 hover:bg-purple-900/30 hover:text-white'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      {!isCollapsed && <span className="font-medium">{item.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-purple-500/20">
            {!isCollapsed && (
              <div className="mb-4 p-3 bg-purple-900/30 rounded-lg">
                <p className="text-sm text-white font-semibold truncate">{user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-red-400 font-semibold transition-all"
            >
              <span className="text-xl">🚪</span>
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>

          {/* Collapse Toggle (Desktop) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:block p-2 border-t border-purple-500/20 hover:bg-purple-900/30 transition-colors"
          >
            <svg
              className={`w-6 h-6 text-gray-400 mx-auto transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
}
