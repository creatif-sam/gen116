'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import { getCaseStudyBySlug, createCaseStudy, updateCaseStudy } from '@/lib/portfolio-api';
import Breadcrumb from '@/app/components/Breadcrumb';

export default function CaseStudyEditorPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const caseStudyId = params.new as string;
  const isNew = caseStudyId === 'new' || !caseStudyId;

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [oldData, setOldData] = useState<any>(null);

  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    industry: '',
    client: '',
    description: '',
    challenge: '',
    solution: '',
    overview: '',
    duration: '',
    year: new Date().getFullYear().toString(),
    gradient: 'from-purple-600 to-blue-600',
    objectives: '',
    approach: '',
    results: '',
    metrics: '',
    testimonial: '',
    testimonial_author: '',
    testimonial_role: '',
    published: false,
  });

  useEffect(() => {
    if (!isNew && caseStudyId !== 'new') {
      loadCaseStudy();
    }
  }, [caseStudyId]);

  const loadCaseStudy = async () => {
    const { data, error } = await getCaseStudyBySlug(caseStudyId);
    if (data) {
      setOldData(data);
      setFormData({
        slug: data.slug || '',
        title: data.title || '',
        industry: data.industry || '',
        client: data.client || '',
        description: data.description || '',
        challenge: data.challenge || '',
        solution: data.solution || '',
        overview: data.overview || '',
        duration: data.duration || '',
        year: data.year || new Date().getFullYear().toString(),
        gradient: data.gradient || 'from-purple-600 to-blue-600',
        objectives: Array.isArray(data.objectives) ? data.objectives.join('\n') : '',
        approach: Array.isArray(data.approach) ? data.approach.join('\n') : '',
        results: Array.isArray(data.results) ? data.results.join('\n') : '',
        metrics: Array.isArray(data.metrics) ? data.metrics.join('\n') : '',
        testimonial: data.testimonial || '',
        testimonial_author: data.testimonial_author || '',
        testimonial_role: data.testimonial_role || '',
        published: data.published || false,
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const caseStudyData = {
      ...formData,
      objectives: formData.objectives.split('\n').filter(Boolean),
      approach: formData.approach.split('\n').filter(Boolean),
      results: formData.results.split('\n').filter(Boolean),
      metrics: formData.metrics.split('\n').filter(Boolean),
    };

    if (isNew) {
      const { data, error } = await createCaseStudy(caseStudyData);
      if (data) {
        alert('Case study created successfully!');
        router.push('/dashboard/admin/portfolio/case-studies');
      } else {
        alert('Failed to create case study: ' + error?.message);
      }
    } else {
      const { data, error } = await updateCaseStudy(caseStudyId, caseStudyData, oldData);
      if (data) {
        alert('Case study updated successfully!');
        router.push('/dashboard/admin/portfolio/case-studies');
      } else {
        alert('Failed to update case study: ' + error?.message);
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
          <p className="text-gray-400 mt-4">Loading case study...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] lg:ml-64">
      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb 
            items={[
              { label: 'Dashboard', href: '/dashboard/admin' },
              { label: 'Portfolio', href: '/dashboard/admin/portfolio' },
              { label: 'Case Studies', href: '/dashboard/admin/portfolio/case-studies' },
              { label: isNew ? 'New Case Study' : 'Edit Case Study' }
            ]} 
          />

          {/* Header */}
          <div className="mb-8 mt-6">
            <Link
              href="/dashboard/admin/portfolio/case-studies"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4 transition-colors"
            >
              <span>←</span>
              Back to Case Studies
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              {isNew ? 'Create New Case Study' : 'Edit Case Study'}
            </h1>
            <p className="text-gray-400">
              {isNew ? 'Add a new case study to showcase your consulting work' : 'Update case study details'}
            </p>
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
                    placeholder="Digital Transformation for Healthcare Provider"
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
                    placeholder="healthcare-digital-transformation"
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Industry *</label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                  >
                    <option value="">Select Industry</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Retail">Retail</option>
                    <option value="Technology">Technology</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Education">Education</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Energy">Energy</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Client Name</label>
                  <input
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleChange}
                    placeholder="MediCare Solutions Inc."
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
                    placeholder="6 months"
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
                    placeholder="2024"
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold mb-2 text-gray-300">Description * (Brief summary)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="A comprehensive digital transformation project that modernized patient care delivery..."
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                />
              </div>
            </div>

            {/* Challenge & Solution */}
            <div className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">Challenge & Solution</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Overview</label>
                  <textarea
                    name="overview"
                    value={formData.overview}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Provide a high-level overview of the case study..."
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Challenge</label>
                  <textarea
                    name="challenge"
                    value={formData.challenge}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe the main challenges the client was facing..."
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Solution</label>
                  <textarea
                    name="solution"
                    value={formData.solution}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Explain the solution you provided..."
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Detailed Content */}
            <div className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">Detailed Content</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Objectives (one per line)</label>
                  <textarea
                    name="objectives"
                    value={formData.objectives}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Modernize patient management system&#10;Improve operational efficiency by 40%&#10;Enhance patient experience"
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Approach (one per line)</label>
                  <textarea
                    name="approach"
                    value={formData.approach}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Conducted comprehensive needs assessment&#10;Designed scalable cloud architecture&#10;Implemented agile development process&#10;Provided staff training and change management"
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
                    placeholder="45% reduction in patient wait times&#10;60% improvement in staff productivity&#10;90% patient satisfaction score&#10;$2M cost savings in first year"
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Key Metrics (one per line)</label>
                  <textarea
                    name="metrics"
                    value={formData.metrics}
                    onChange={handleChange}
                    rows={5}
                    placeholder="45% - Reduction in wait times&#10;60% - Productivity increase&#10;90% - Patient satisfaction&#10;$2M - Annual cost savings"
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">Client Testimonial (Optional)</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Testimonial</label>
                  <textarea
                    name="testimonial"
                    value={formData.testimonial}
                    onChange={handleChange}
                    rows={4}
                    placeholder="The team's expertise in digital transformation was exceptional..."
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">Author Name</label>
                    <input
                      type="text"
                      name="testimonial_author"
                      value={formData.testimonial_author}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">Author Role</label>
                    <input
                      type="text"
                      name="testimonial_role"
                      value={formData.testimonial_role}
                      onChange={handleChange}
                      placeholder="CEO, MediCare Solutions"
                      className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                    />
                  </div>
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
                <span className="text-white font-semibold">Publish this case study</span>
              </label>
              <p className="text-sm text-gray-400 mt-2 ml-8">
                Published case studies will be visible on the public portfolio page
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pb-8">
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : isNew ? 'Create Case Study' : 'Update Case Study'}
              </button>
              <Link
                href="/dashboard/admin/portfolio/case-studies"
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
