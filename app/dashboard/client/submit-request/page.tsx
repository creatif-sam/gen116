'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SubmitRequestPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'medium',
    description: '',
    budget: '',
    deadline: '',
  });

  useEffect(() => {
    const role = sessionStorage.getItem('userRole');
    const email = sessionStorage.getItem('userEmail');
    
    if (role !== 'client') {
      router.push('/dashboard');
      return;
    }
    
    setUserEmail(email || '');
  }, [router]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Request submitted:', formData, files);
    alert('Request submitted successfully!');
    router.push('/dashboard/client');
  };

  const categories = [
    'Website Development',
    'Software Development',
    'Graphic Design',
    'Data Analytics',
    'IT Consulting',
    'Market Research',
    'Business Consulting',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#1a1040] to-[#0a0520]">
      {/* Top Navigation */}
      <nav className="bg-[#0a0520]/95 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard/client" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-xl">🏢</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">GEN11 CONSULT</h1>
              <p className="text-xs text-gray-400">Submit New Request</p>
            </div>
          </Link>
          
          <Link
            href="/dashboard/client"
            className="px-4 py-2 bg-purple-900/30 border border-purple-500/30 rounded-lg text-purple-400 text-sm font-semibold hover:bg-purple-900/40 transition-all"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20">
          <h2 className="text-3xl font-bold text-white mb-2">Submit New Request</h2>
          <p className="text-gray-400 mb-8">Fill in the details below to submit your project request</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., E-commerce Website Development"
                className="w-full px-4 py-3 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
              />
            </div>

            {/* Category and Priority */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Service Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                >
                  <option value="">Select a service</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Priority Level *
                </label>
                <select
                  required
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-4 py-3 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Project Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                placeholder="Provide detailed information about your project requirements, goals, and expectations..."
                className="w-full px-4 py-3 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500 resize-none"
              ></textarea>
            </div>

            {/* Budget and Deadline */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Estimated Budget
                </label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="e.g., $5,000 - $10,000"
                  className="w-full px-4 py-3 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Expected Deadline
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-4 py-3 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                />
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Attach Files (Optional)
              </label>
              <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-8 text-center hover:border-purple-500/50 transition-all">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-5xl mb-3">📎</div>
                  <p className="text-gray-300 font-semibold mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-400">
                    PDF, DOC, Images, etc. (Max 10MB per file)
                  </p>
                </label>
              </div>

              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-purple-900/20 rounded-lg p-3 border border-purple-500/10">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📄</span>
                        <div>
                          <p className="text-white font-semibold text-sm">{file.name}</p>
                          <p className="text-gray-400 text-xs">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFiles(files.filter((_, i) => i !== index))}
                        className="text-red-400 hover:text-red-300"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all hover:scale-105"
              >
                Submit Request
              </button>
              <Link
                href="/dashboard/client"
                className="px-8 py-4 bg-purple-900/30 border border-purple-500/30 rounded-lg font-semibold hover:bg-purple-900/40 transition-all flex items-center justify-center"
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
