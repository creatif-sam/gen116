// New blog post creation page
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../contexts/AuthContext';
import { createBlogPost } from '../../../lib/blog-api';

export default function NewBlogPostPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [form, setForm] = useState({ title: '', excerpt: '', content: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Only allow admin or staff
  if (!user || !['admin', 'staff'].includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
        Access denied. Only staff or super admin can post.
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await createBlogPost({ ...form, author_id: user.id });
    setLoading(false);
    if (result.error) {
      setError(result.error.message || 'Failed to create blog post');
    } else {
      router.push('/blog');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <section className="pt-32 pb-20 px-6 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-purple-300">New Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Title</label>
            <input name="title" value={form.title} onChange={handleChange} required className="w-full px-4 py-3 bg-purple-900/20 border border-purple-500/30 rounded-lg text-white" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Excerpt</label>
            <input name="excerpt" value={form.excerpt} onChange={handleChange} required className="w-full px-4 py-3 bg-purple-900/20 border border-purple-500/30 rounded-lg text-white" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Content</label>
            <textarea name="content" value={form.content} onChange={handleChange} required rows={8} className="w-full px-4 py-3 bg-purple-900/20 border border-purple-500/30 rounded-lg text-white" />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-white disabled:opacity-50">
            {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
}
