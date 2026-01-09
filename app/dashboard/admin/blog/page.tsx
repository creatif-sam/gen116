'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import DashboardSidebar from '@/app/components/DashboardSidebar';
import Breadcrumb from '@/app/components/Breadcrumb';
import { getBlogs, deleteBlog, toggleBlogPublish } from '@/lib/blog-api';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  author: string;
}

export default function AdminBlogPage() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    const { data, error } = await getBlogs(true);
    if (data) {
      setBlogs(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    const { error } = await deleteBlog(id);
    if (!error) {
      setBlogs(blogs.filter(blog => blog.id !== id));
      alert('Blog deleted successfully!');
    } else {
      alert('Failed to delete blog: ' + error.message);
    }
  };

  const handleTogglePublish = async (id: string, published: boolean, title: string) => {
    const { error } = await toggleBlogPublish(id, !published);
    if (!error) {
      setBlogs(blogs.map(blog =>
        blog.id === id ? { ...blog, published: !published } : blog
      ));
      alert(`Blog ${!published ? 'published' : 'unpublished'} successfully!`);
    } else {
      alert('Failed to update blog: ' + error.message);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    if (filter === 'published') return blog.published;
    if (filter === 'draft') return !blog.published;
    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      <DashboardSidebar />
      <div className="flex-1 p-6 lg:ml-64">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Blog Manager
              </h1>
              <p className="text-gray-400">Manage your blog posts and content</p>
            </div>
            <Link
              href="/dashboard/admin/blog/new"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Create New Blog
            </Link>
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
              All Blogs ({blogs.length})
            </button>
            <button
              onClick={() => setFilter('published')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === 'published'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                  : 'bg-purple-900/20 text-gray-400 hover:text-white'
              }`}
            >
              Published ({blogs.filter(b => b.published).length})
            </button>
            <button
              onClick={() => setFilter('draft')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === 'draft'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                  : 'bg-purple-900/20 text-gray-400 hover:text-white'
              }`}
            >
              Drafts ({blogs.filter(b => !b.published).length})
            </button>
          </div>

          {/* Blogs List */}
          {loading ? (
            <LoadingSpinner message="Loading blogs..." />
          ) : (
            <div className="space-y-4">
              {filteredBlogs.length === 0 ? (
                <div className="text-center py-20 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
                  <p className="text-gray-400 text-lg">No blogs found</p>
                  <Link
                    href="/dashboard/admin/blog/new"
                    className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    Create Your First Blog
                  </Link>
                </div>
              ) : (
                filteredBlogs.map((blog) => (
                  <div key={blog.id} className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-white">{blog.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            blog.published
                              ? 'bg-green-900/40 text-green-300'
                              : 'bg-yellow-900/40 text-yellow-300'
                          }`}>
                            {blog.published ? 'Published' : 'Draft'}
                          </span>
                        </div>

                        <p className="text-gray-400 mb-3">{blog.excerpt}</p>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Slug: {blog.slug}</span>
                          <span>•</span>
                          <span>By: {blog.author}</span>
                          <span>•</span>
                          <span>Updated: {new Date(blog.updated_at).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-6">
                        <button
                          onClick={() => handleTogglePublish(blog.id, blog.published, blog.title)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                            blog.published
                              ? 'bg-yellow-900/40 text-yellow-300 hover:bg-yellow-900/60'
                              : 'bg-green-900/40 text-green-300 hover:bg-green-900/60'
                          }`}
                        >
                          {blog.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <Link
                          href={`/dashboard/admin/blog/${blog.id}`}
                          className="px-4 py-2 bg-blue-900/40 text-blue-300 rounded-lg font-semibold hover:bg-blue-900/60 transition-all"
                        >
                          Edit
                        </Link>
                        {user?.role === 'admin' && (
                          <button
                            onClick={() => handleDelete(blog.id, blog.title)}
                            className="px-4 py-2 bg-red-900/40 text-red-300 rounded-lg font-semibold hover:bg-red-900/60 transition-all"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}