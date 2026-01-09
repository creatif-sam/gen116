'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import DashboardSidebar from '@/app/components/DashboardSidebar';
import Breadcrumb from '@/app/components/Breadcrumb';
import { createBlog } from '@/lib/blog-api';

export default function NewBlogPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    tags: '',
    published: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const blogData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      author: user?.name || user?.email || 'Anonymous',
    };

    const { data, error } = await createBlog(blogData);
    if (data) {
      alert('Blog created successfully!');
      router.push('/dashboard/admin/blog');
    } else {
      alert('Failed to create blog: ' + error?.message);
    }

    setSaving(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
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

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      <DashboardSidebar />
      <div className="flex-1 p-6 lg:ml-64">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Header */}
          <div className="mb-8">
            <Link
              href="/dashboard/admin/blog"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4 transition-colors"
            >
              <span>←</span>
              Back to Blogs
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Create New Blog Post
            </h1>
            <p className="text-gray-400">Write and publish your latest insights</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">Blog Details</h2>

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
                    placeholder="my-awesome-blog-post"
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold mb-2 text-gray-300">Excerpt *</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Brief summary of your blog post..."
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold mb-2 text-gray-300">Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="technology, web development, tips"
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">Content</h2>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Blog Content *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={20}
                  placeholder="Write your blog post content here..."
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                />
              </div>
            </div>

            {/* Publishing */}
            <div className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                  className="w-5 h-5 rounded bg-black/40 border border-purple-500/20 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-white font-semibold">Publish this blog post</span>
              </label>
              <p className="text-sm text-gray-400 mt-2 ml-8">
                Published blogs will be visible on the public blog page
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Creating...' : 'Create Blog Post'}
              </button>
              <Link
                href="/dashboard/admin/blog"
                className="px-8 py-4 bg-purple-900/20 border border-purple-500/20 rounded-lg font-semibold hover:border-purple-500/40 transition-all"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}