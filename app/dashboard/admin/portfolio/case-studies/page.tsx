'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import { getCaseStudies, deleteCaseStudy, toggleCaseStudyPublish } from '@/lib/portfolio-api';
import Breadcrumb from '@/app/components/Breadcrumb';
import LoadingSpinner from '@/app/components/LoadingSpinner';

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  industry: string;
  description: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function AdminCaseStudiesPage() {
  const { user } = useAuth();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    loadCaseStudies();
  }, []);

  const loadCaseStudies = async () => {
    setLoading(true);
    const { data, error } = await getCaseStudies(true);
    if (data) {
      setCaseStudies(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    const { error } = await deleteCaseStudy(id, title);
    if (!error) {
      setCaseStudies(caseStudies.filter(cs => cs.id !== id));
    } else {
      alert('Failed to delete case study');
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean, title: string) => {
    const { data, error } = await toggleCaseStudyPublish(id, currentStatus, title);
    if (data) {
      setCaseStudies(caseStudies.map(cs => cs.id === id ? { ...cs, published: data.published } : cs));
    } else {
      alert('Failed to update case study status');
    }
  };

  const filteredCaseStudies = caseStudies.filter(cs => {
    if (filter === 'published') return cs.published;
    if (filter === 'draft') return !cs.published;
    return true;
  });

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
    <div className="min-h-screen bg-[var(--background)] lg:ml-64">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb 
            items={[
              { label: 'Dashboard', href: '/dashboard/admin' },
              { label: 'Portfolio', href: '/dashboard/admin/portfolio' },
              { label: 'Case Studies' }
            ]} 
          />

          {/* Header */}
          <div className="mb-8 mt-6">
            <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Manage Case Studies
              </h1>
              <p className="text-gray-400">Create, edit, and publish case studies</p>
            </div>
            <Link
              href="/dashboard/admin/portfolio/case-studies/new"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              + New Case Study
            </Link>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                  : 'bg-purple-900/20 text-gray-400 hover:text-white'
              }`}
            >
              All ({caseStudies.length})
            </button>
            <button
              onClick={() => setFilter('published')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === 'published'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                  : 'bg-purple-900/20 text-gray-400 hover:text-white'
              }`}
            >
              Published ({caseStudies.filter(cs => cs.published).length})
            </button>
            <button
              onClick={() => setFilter('draft')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === 'draft'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                  : 'bg-purple-900/20 text-gray-400 hover:text-white'
              }`}
            >
              Drafts ({caseStudies.filter(cs => !cs.published).length})
            </button>
          </div>
        </div>

        {/* Case Studies List */}
        {loading ? (
          <LoadingSpinner message="Loading case studies..." />
        ) : filteredCaseStudies.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
            <p className="text-gray-400 text-lg mb-4">No case studies found</p>
            <Link
              href="/dashboard/admin/portfolio/case-studies/new"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Create Your First Case Study
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCaseStudies.map((caseStudy) => (
              <div
                key={caseStudy.id}
                className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{caseStudy.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          caseStudy.published
                            ? 'bg-green-900/40 text-green-300'
                            : 'bg-yellow-900/40 text-yellow-300'
                        }`}
                      >
                        {caseStudy.published ? 'Published' : 'Draft'}
                      </span>
                      <span className="px-3 py-1 bg-blue-900/40 rounded-full text-xs text-blue-300">
                        {caseStudy.industry}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-2">{caseStudy.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Slug: {caseStudy.slug}</span>
                      <span>•</span>
                      <span>Updated: {new Date(caseStudy.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-6">
                    <button
                      onClick={() => handleTogglePublish(caseStudy.id, caseStudy.published, caseStudy.title)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        caseStudy.published
                          ? 'bg-yellow-900/40 text-yellow-300 hover:bg-yellow-900/60'
                          : 'bg-green-900/40 text-green-300 hover:bg-green-900/60'
                      }`}
                    >
                      {caseStudy.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <Link
                      href={`/dashboard/admin/portfolio/case-studies/${caseStudy.id}`}
                      className="px-4 py-2 bg-blue-900/40 text-blue-300 rounded-lg font-semibold hover:bg-blue-900/60 transition-all"
                    >
                      Edit
                    </Link>
                    {user?.role === 'admin' && (
                      <button
                        onClick={() => handleDelete(caseStudy.id, caseStudy.title)}
                        className="px-4 py-2 bg-red-900/40 text-red-300 rounded-lg font-semibold hover:bg-red-900/60 transition-all"
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
        </div>
      </div>
    </div>
  );
}
