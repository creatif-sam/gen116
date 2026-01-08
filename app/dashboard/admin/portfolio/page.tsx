'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { getProjects, getCaseStudies, getPortfolioStats, getActivityLogs } from '@/lib/portfolio-api';

export default function PortfolioDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [projectsCount, setProjectsCount] = useState({ total: 0, published: 0, drafts: 0 });
  const [caseStudiesCount, setCaseStudiesCount] = useState({ total: 0, published: 0, drafts: 0 });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // Load stats
    const { data: statsData } = await getPortfolioStats();
    if (statsData) {
      setStats(statsData);
    }

    // Load projects count
    const { data: projectsData } = await getProjects(true);
    if (projectsData) {
      setProjectsCount({
        total: projectsData.length,
        published: projectsData.filter((p: any) => p.published).length,
        drafts: projectsData.filter((p: any) => !p.published).length,
      });
    }

    // Load case studies count
    const { data: caseStudiesData } = await getCaseStudies(true);
    if (caseStudiesData) {
      setCaseStudiesCount({
        total: caseStudiesData.length,
        published: caseStudiesData.filter((cs: any) => cs.published).length,
        drafts: caseStudiesData.filter((cs: any) => !cs.published).length,
      });
    }

    // Load recent activity
    const { data: activityData } = await getActivityLogs(10);
    if (activityData) {
      setRecentActivity(activityData);
    }

    setLoading(false);
  };

  if (!user || (user.role !== 'admin' && user.role !== 'staff')) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Access Denied</h1>
          <p className="text-gray-400">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Portfolio Management
          </h1>
          <p className="text-gray-400">Manage projects, case studies, and portfolio content</p>
        </div>

        {loading ? (
          <LoadingSpinner message="Loading dashboard..." />
        ) : (
          <>
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="p-6 bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-2xl border border-purple-500/20">
                <div className="text-4xl mb-2">💼</div>
                <div className="text-3xl font-bold text-purple-400 mb-1">{projectsCount.total}</div>
                <div className="text-gray-400">Total Projects</div>
                <div className="mt-2 text-sm">
                  <span className="text-green-400">{projectsCount.published} published</span>
                  <span className="text-gray-500"> • </span>
                  <span className="text-yellow-400">{projectsCount.drafts} drafts</span>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-2xl border border-blue-500/20">
                <div className="text-4xl mb-2">📊</div>
                <div className="text-3xl font-bold text-blue-400 mb-1">{caseStudiesCount.total}</div>
                <div className="text-gray-400">Case Studies</div>
                <div className="mt-2 text-sm">
                  <span className="text-green-400">{caseStudiesCount.published} published</span>
                  <span className="text-gray-500"> • </span>
                  <span className="text-yellow-400">{caseStudiesCount.drafts} drafts</span>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-2xl border border-green-500/20">
                <div className="text-4xl mb-2">✓</div>
                <div className="text-3xl font-bold text-green-400 mb-1">{stats?.projects_completed || 0}</div>
                <div className="text-gray-400">Projects Completed</div>
                <div className="mt-2 text-sm text-gray-500">Public stats</div>
              </div>

              <div className="p-6 bg-gradient-to-br from-orange-900/40 to-red-900/40 rounded-2xl border border-orange-500/20">
                <div className="text-4xl mb-2">⭐</div>
                <div className="text-3xl font-bold text-orange-400 mb-1">{stats?.client_satisfaction || 0}%</div>
                <div className="text-gray-400">Client Satisfaction</div>
                <div className="mt-2 text-sm text-gray-500">Public stats</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Link
                href="/dashboard/admin/portfolio/projects"
                className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl">
                    💼
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                      Manage Projects
                    </h3>
                    <p className="text-sm text-gray-400">View and edit all projects</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/dashboard/admin/portfolio/case-studies"
                className="p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-2xl">
                    📊
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                      Manage Case Studies
                    </h3>
                    <p className="text-sm text-gray-400">View and edit case studies</p>
                  </div>
                </div>
              </Link>

              {user.role === 'admin' && (
                <Link
                  href="/dashboard/admin/activity-logs"
                  className="p-6 bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-2xl">
                      📋
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                        Activity Logs
                      </h3>
                      <p className="text-sm text-gray-400">View all user activities</p>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20 p-6">
              <h2 className="text-2xl font-bold mb-6 text-white">Recent Activity</h2>
              
              {recentActivity.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No recent activity</p>
              ) : (
                <div className="space-y-3">
                  {recentActivity.map((log) => (
                    <div
                      key={log.id}
                      className="p-4 bg-black/40 rounded-lg flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                        {log.entity_type === 'project' ? '💼' : log.entity_type === 'case_study' ? '📊' : '📈'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-white">{log.users?.full_name || 'Unknown'}</span>
                          <span className="text-gray-400 text-sm">{log.action}d</span>
                          <span className="text-purple-400">{log.entity_name}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(log.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
