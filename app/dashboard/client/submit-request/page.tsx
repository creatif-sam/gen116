'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import AuthGuard from '@/app/components/AuthGuard';
import DashboardSidebar from '@/app/components/DashboardSidebar';

function SubmitRequestContent() {
  const router = useRouter();
  const { user } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'medium',
    description: '',
    budget: '',
    deadline: '',
  });

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
    <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#1a1040] to-[#0a0520] flex">
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64 p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8 mt-16 lg:mt-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Submit New Request</h2>
              <p className="text-gray-400">Fill in the details below to submit your project request</p>
            </div>
            <Link
              href="/dashboard/client"
              className="px-4 py-2 bg-purple-900/30 border border-purple-500/30 rounded-lg text-purple-400 text-sm font-semibold hover:bg-purple-900/40 transition-all"
            >
              ← Back
            </Link>
          </div>
        </div>

        <div className="max-w-4xl">
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20">
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
    </div>
  );
}

export default function SubmitRequestPage() {
  return (
    <AuthGuard allowedRoles={['client']}>
      <SubmitRequestContent />
    </AuthGuard>
  );
}
