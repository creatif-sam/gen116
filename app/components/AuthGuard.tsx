'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/user';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      // Not authenticated
      if (!user) {
        router.push('/dashboard');
        return;
      }

      // Check role permissions
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.push(`/dashboard/${user.role}`);
        return;
      }
    }
  }, [user, loading, allowedRoles, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#1a1040] to-[#0a0520] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show nothing while redirecting
  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return null;
  }

  // Render protected content
  return <>{children}</>;
}
