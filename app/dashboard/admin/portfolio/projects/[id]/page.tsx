'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import { getProjectBySlug, createProject, updateProject } from '@/lib/portfolio-api';

export default function ProjectEditorPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  const isNew = projectId === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [oldData, setOldData] = useState<any>(null);

  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    category: 'web',
    description: '',
    icon: '🚀',
    challenge: '',
    solution: '',
    overview: '',
    duration: '',
    year: new Date().getFullYear().toString(),
    gradient: 'from-purple-600 to-blue-600',
    tech: '',
    features: '',
    results: '',
    published: false,
  });

  useEffect(() => {
    if (!isNew) {
      loadProject();
    }
  }, [projectId]);

  const loadProject = async () => {
    const { data, error } = await getProjectBySlug(projectId);
    if (data) {
      setOldData(data);
      setFormData({
        slug: data.slug || '',
        title: data.title || '',
        category: data.category || 'web',
        description: data.description || '',
        icon: data.icon || '🚀',
        challenge: data.challenge || '',
        solution: data.solution || '',
        overview: data.overview || '',
        duration: data.duration || '',
        year: data.year || new Date().getFullYear().toString(),
        gradient: data.gradient || 'from-purple-600 to-blue-600',
        tech: Array.isArray(data.tech) ? data.tech.join(', ') : '',
        features: Array.isArray(data.features) ? data.features.join('\n') : '',
        results: Array.isArray(data.results) ? data.results.join('\n') : '',
        published: data.published || false,
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const projectData = {
      ...formData,
      tech: formData.tech.split(',').map(t => t.trim()).filter(Boolean),
      features: formData.features.split('\n').filter(Boolean),
      results: formData.results.split('\n').filter(Boolean),
    };

    if (isNew) {
      const { data, error } = await createProject(projectData);
      if (data) {
        alert('Project created successfully!');
        router.push('/dashboard/admin/portfolio/projects');
      } else {
        alert('Failed to create project: ' + error?.message);
      }
    } else {
      const { data, error } = await updateProject(projectId, projectData, oldData);
      if (data) {
        alert('Project updated successfully!');
        router.push('/dashboard/admin/portfolio/projects');
      } else {
        alert('Failed to update project: ' + error?.message);
      }
    }

    setSaving(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
          <p className="text-gray-400 mt-4">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/admin/portfolio/projects"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4 transition-colors"
          >
            <span>←</span>
            Back to Projects
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            {isNew ? 'Create New Project' : 'Edit Project'}
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-6 text-purple-400">Basic Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Slug * (URL-friendly)</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  pattern="[a-z0-9-]+"
                  placeholder="e-commerce-platform"
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                >
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile App</option>
                  <option value="ai">AI & Machine Learning</option>
                  <option value="design">Design</option>
                  <option value="consulting">Consulting</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Icon (Emoji)</label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  maxLength={2}
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="8 months"
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Year</label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold mb-2 text-gray-300">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-6 text-purple-400">Project Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Overview</label>
                <textarea
                  name="overview"
                  value={formData.overview}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Challenge</label>
                <textarea
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Solution</label>
                <textarea
                  name="solution"
                  value={formData.solution}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Technologies (comma-separated)</label>
                <input
                  type="text"
                  name="tech"
                  value={formData.tech}
                  onChange={handleChange}
                  placeholder="Next.js, React, Node.js, PostgreSQL"
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Features (one per line)</label>
                <textarea
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  rows={6}
                  placeholder="AI-powered recommendations&#10;Real-time inventory&#10;Mobile-responsive design"
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Results (one per line)</label>
                <textarea
                  name="results"
                  value={formData.results}
                  onChange={handleChange}
                  rows={6}
                  placeholder="300% increase in conversion rate&#10;50% reduction in page load times&#10;5 million+ transactions processed monthly"
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Publishing */}
          <div className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-5 h-5 rounded bg-black/40 border border-purple-500/20 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-white font-semibold">Publish this project</span>
            </label>
            <p className="text-sm text-gray-400 mt-2 ml-8">
              Published projects will be visible on the public portfolio page
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : isNew ? 'Create Project' : 'Update Project'}
            </button>
            <Link
              href="/dashboard/admin/portfolio/projects"
              className="px-8 py-4 bg-purple-900/20 border border-purple-500/20 rounded-lg font-semibold hover:border-purple-500/40 transition-all"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
