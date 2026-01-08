'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import { getProjects, deleteProject, toggleProjectPublish } from '@/lib/portfolio-api';

interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function AdminProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const { data, error } = await getProjects(true);
    if (data) {
      setProjects(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    const { error } = await deleteProject(id, title);
    if (!error) {
      setProjects(projects.filter(p => p.id !== id));
    } else {
      alert('Failed to delete project');
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean, title: string) => {
    const { data, error } = await toggleProjectPublish(id, currentStatus, title);
    if (data) {
      setProjects(projects.map(p => p.id === id ? { ...p, published: data.published } : p));
    } else {
      alert('Failed to update project status');
    }
  };

  const filteredProjects = projects.filter(p => {
    if (filter === 'published') return p.published;
    if (filter === 'draft') return !p.published;
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
    <div className="min-h-screen bg-[var(--background)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Manage Projects
              </h1>
              <p className="text-gray-400">Create, edit, and publish portfolio projects</p>
            </div>
            <Link
              href="/dashboard/admin/portfolio/projects/new"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              + New Project
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
              All ({projects.length})
            </button>
            <button
              onClick={() => setFilter('published')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === 'published'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                  : 'bg-purple-900/20 text-gray-400 hover:text-white'
              }`}
            >
              Published ({projects.filter(p => p.published).length})
            </button>
            <button
              onClick={() => setFilter('draft')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === 'draft'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                  : 'bg-purple-900/20 text-gray-400 hover:text-white'
              }`}
            >
              Drafts ({projects.filter(p => !p.published).length})
            </button>
          </div>
        </div>

        {/* Projects List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            <p className="text-gray-400 mt-4">Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
            <p className="text-gray-400 text-lg mb-4">No projects found</p>
            <Link
              href="/dashboard/admin/portfolio/projects/new"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Create Your First Project
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.published
                            ? 'bg-green-900/40 text-green-300'
                            : 'bg-yellow-900/40 text-yellow-300'
                        }`}
                      >
                        {project.published ? 'Published' : 'Draft'}
                      </span>
                      <span className="px-3 py-1 bg-blue-900/40 rounded-full text-xs text-blue-300">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-2">{project.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Slug: {project.slug}</span>
                      <span>•</span>
                      <span>Updated: {new Date(project.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-6">
                    <button
                      onClick={() => handleTogglePublish(project.id, project.published, project.title)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        project.published
                          ? 'bg-yellow-900/40 text-yellow-300 hover:bg-yellow-900/60'
                          : 'bg-green-900/40 text-green-300 hover:bg-green-900/60'
                      }`}
                    >
                      {project.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <Link
                      href={`/dashboard/admin/portfolio/projects/${project.id}`}
                      className="px-4 py-2 bg-blue-900/40 text-blue-300 rounded-lg font-semibold hover:bg-blue-900/60 transition-all"
                    >
                      Edit
                    </Link>
                    {user?.role === 'admin' && (
                      <button
                        onClick={() => handleDelete(project.id, project.title)}
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
  );
}
