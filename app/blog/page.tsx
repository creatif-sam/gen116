// Blog listing page
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getBlogPosts } from '../../lib/blog-api';

export default function BlogPage() {
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

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <section className="pt-32 pb-20 px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Blog
        </h1>
        <p className="text-xl text-gray-300 mb-12">Insights, news, and updates from Gen116 Consult.</p>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="block p-6 bg-purple-900/20 rounded-lg shadow hover:scale-105 transition">
                <h2 className="text-2xl font-bold text-purple-300 mb-2">{post.title}</h2>
                <p className="text-gray-400 mb-2">{post.excerpt}</p>
                <span className="text-xs text-gray-500">{new Date(post.created_at).toLocaleDateString()}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
