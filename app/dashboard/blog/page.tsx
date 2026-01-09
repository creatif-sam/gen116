// Blog management dashboard for admin/staff
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { getBlogPosts } from '../../../lib/blog-api';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function BlogDashboardPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const { data } = await getBlogPosts();
    if (data) setPosts(data);
    setLoading(false);
  };

  if (!user || !['admin', 'staff'].includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
        Access denied. Only staff or super admin can manage blog posts.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <section className="pt-32 pb-20 px-6">
        <h1 className="text-4xl font-bold mb-6 text-purple-300">Blog Management</h1>
        <Link href="/blog/new" className="inline-block mb-8 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold shadow hover:scale-105 transition">
          + New Blog Post
        </Link>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map(post => (
              <div key={post.id} className="block p-6 bg-purple-900/20 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-purple-300 mb-2">{post.title}</h2>
                <p className="text-gray-400 mb-2">{post.excerpt}</p>
                <span className="text-xs text-gray-500">{new Date(post.created_at).toLocaleDateString()}</span>
                <div className="mt-4">
                  <Link href={`/blog/${post.slug}`} className="text-blue-400 hover:underline mr-4">View</Link>
                  {/* Add edit/delete links here if needed */}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
