'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { getActivityLogs } from '@/lib/portfolio-api';

interface ActivityLog {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  entity_name: string;
  changes: any;
  created_at: string;
  users: {
    full_name: string;
    email: string;
    role: string;
  };
}

export default function AdminActivityLogsPage() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadLogs();
  }, [filter]);

  const loadLogs = async () => {
    setLoading(true);
    const entityType = filter === 'all' ? undefined : filter;
    const { data, error } = await getActivityLogs(100, entityType);
    if (data) {
      setLogs(data);
    }
    setLoading(false);
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create': return 'text-green-400 bg-green-900/40';
      case 'update': return 'text-blue-400 bg-blue-900/40';
      case 'delete': return 'text-red-400 bg-red-900/40';
      case 'publish': return 'text-purple-400 bg-purple-900/40';
      case 'unpublish': return 'text-yellow-400 bg-yellow-900/40';
      default: return 'text-gray-400 bg-gray-900/40';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create': return '➕';
      case 'update': return '✏️';
      case 'delete': return '🗑️';
      case 'publish': return '🚀';
      case 'unpublish': return '📦';
      default: return '📋';
    }
  };

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case 'project': return '💼';
      case 'case_study': return '📊';
      case 'portfolio_stats': return '📈';
      default: return '📄';
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Access Denied</h1>
          <p className="text-gray-400">Only administrators can view activity logs.</p>
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
            Activity Logs
          </h1>
          <p className="text-gray-400">Monitor all portfolio management activities</p>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                : 'bg-purple-900/20 text-gray-400 hover:text-white'
            }`}
          >
            All Activities
          </button>
          <button
            onClick={() => setFilter('project')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'project'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                : 'bg-purple-900/20 text-gray-400 hover:text-white'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setFilter('case_study')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'case_study'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                : 'bg-purple-900/20 text-gray-400 hover:text-white'
            }`}
          >
            Case Studies
          </button>
          <button
            onClick={() => setFilter('portfolio_stats')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'portfolio_stats'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                : 'bg-purple-900/20 text-gray-400 hover:text-white'
            }`}
          >
            Statistics
          </button>
        </div>

        {/* Logs List */}
        {loading ? (
          <LoadingSpinner message="Loading activity logs..." />
        ) : logs.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
            <p className="text-gray-400 text-lg">No activity logs found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div
                key={log.id}
                className="p-5 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                      {getEntityIcon(log.entity_type)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getActionColor(log.action)}`}>
                        {getActionIcon(log.action)} {log.action.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 bg-purple-900/40 rounded-full text-xs text-purple-300">
                        {log.entity_type.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="mb-2">
                      <span className="text-white font-semibold">{log.users?.full_name || 'Unknown User'}</span>
                      <span className="text-gray-400"> {log.action}d </span>
                      <span className="text-purple-400">{log.entity_name || 'an item'}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{log.users?.email}</span>
                      <span>•</span>
                      <span className="capitalize">{log.users?.role}</span>
                      <span>•</span>
                      <span>{new Date(log.created_at).toLocaleString()}</span>
                    </div>

                    {/* Changes Detail */}
                    {log.changes && (
                      <details className="mt-3">
                        <summary className="text-sm text-blue-400 cursor-pointer hover:text-blue-300">
                          View changes
                        </summary>
                        <div className="mt-2 p-3 bg-black/40 rounded-lg">
                          <pre className="text-xs text-gray-300 overflow-auto">
                            {JSON.stringify(log.changes, null, 2)}
                          </pre>
                        </div>
                      </details>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {!loading && logs.length > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-4 bg-green-900/20 rounded-xl border border-green-500/20 text-center">
              <div className="text-2xl font-bold text-green-400">
                {logs.filter(l => l.action === 'create').length}
              </div>
              <div className="text-sm text-gray-400">Created</div>
            </div>
            <div className="p-4 bg-blue-900/20 rounded-xl border border-blue-500/20 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {logs.filter(l => l.action === 'update').length}
              </div>
              <div className="text-sm text-gray-400">Updated</div>
            </div>
            <div className="p-4 bg-red-900/20 rounded-xl border border-red-500/20 text-center">
              <div className="text-2xl font-bold text-red-400">
                {logs.filter(l => l.action === 'delete').length}
              </div>
              <div className="text-sm text-gray-400">Deleted</div>
            </div>
            <div className="p-4 bg-purple-900/20 rounded-xl border border-purple-500/20 text-center">
              <div className="text-2xl font-bold text-purple-400">
                {logs.filter(l => l.action === 'publish').length}
              </div>
              <div className="text-sm text-gray-400">Published</div>
            </div>
            <div className="p-4 bg-yellow-900/20 rounded-xl border border-yellow-500/20 text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {logs.filter(l => l.action === 'unpublish').length}
              </div>
              <div className="text-sm text-gray-400">Unpublished</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
