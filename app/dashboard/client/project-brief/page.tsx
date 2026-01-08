'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import AuthGuard from '@/app/components/AuthGuard';
import DashboardSidebar from '@/app/components/DashboardSidebar';
import Breadcrumb from '@/app/components/Breadcrumb';

function ProjectBriefContent() {
  const router = useRouter();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    project_name: '',
    company_name: '',
    industry: '',
    contact_person: '',
    contact_email: user?.email || '',
    contact_phone: '',
    project_type: '',
    project_scope: '',
    objectives: '',
    target_audience: '',
    timeline: '',
    start_date: '',
    budget_range: '',
    team_size_preference: '',
    deliverables: '',
    technical_requirements: '',
    current_challenges: '',
    success_criteria: '',
    additional_info: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // TODO: Submit to Supabase
      console.log('Project brief submitted:', formData);
      alert('Project brief submitted successfully! Our team will review it and contact you within 24-48 hours.');
      router.push('/dashboard/client');
    } catch (error) {
      alert('Failed to submit project brief. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const industries = [
    'Healthcare', 'Finance', 'Retail', 'Technology', 'Manufacturing',
    'Education', 'Real Estate', 'Transportation', 'Hospitality', 
    'Energy', 'Government', 'Non-Profit', 'Other'
  ];

  const projectTypes = [
    'Website Development',
    'Mobile App Development',
    'Software Development',
    'Digital Transformation',
    'AI/ML Implementation',
    'Cloud Migration',
    'Business Consulting',
    'IT Infrastructure',
    'Data Analytics',
    'Cybersecurity',
    'Other'
  ];

  const budgetRanges = [
    'Under $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000 - $250,000',
    '$250,000 - $500,000',
    '$500,000+',
    'To be discussed'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#1a1040] to-[#0a0520] flex">
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64 p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8 mt-16 lg:mt-0">
          <Breadcrumb items={[
            { label: 'Dashboard', href: '/dashboard/client' }, 
            { label: 'Submit Project Brief' }
          ]} />
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Submit Project Brief</h2>
              <p className="text-gray-400">Tell us about your project and we'll create a tailored proposal</p>
            </div>
            <Link
              href="/dashboard/client"
              className="px-4 py-2 bg-purple-900/30 border border-purple-500/30 rounded-lg text-purple-400 text-sm font-semibold hover:bg-purple-900/40 transition-all"
            >
              ← Back
            </Link>
          </div>

          {/* Info Banner */}
          <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="text-white font-semibold mb-1">What is a Project Brief?</p>
                <p className="text-gray-300 text-sm">
                  A project brief helps us understand your needs, goals, and expectations. The more detailed you are, 
                  the better we can tailor our proposal to your specific requirements. Our team will review your brief 
                  and schedule a consultation call within 24-48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-5xl space-y-6">
          {/* Basic Information */}
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📋</span>
              Basic Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="project_name"
                  value={formData.project_name}
                  onChange={handleChange}
                  required
                  placeholder="E-commerce Platform Redesign"
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:border-purple-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  required
                  placeholder="Your Company Inc."
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:border-purple-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Industry *
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                >
                  <option value="">Select Industry</option>
                  {industries.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Project Type *
                </label>
                <select
                  name="project_type"
                  value={formData.project_type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                >
                  <option value="">Select Project Type</option>
                  {projectTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>👤</span>
              Contact Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Contact Person *
                </label>
                <input
                  type="text"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleChange}
                  required
                  placeholder="John Smith"
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:border-purple-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleChange}
                  required
                  placeholder="john@company.com"
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:border-purple-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:border-purple-500/40 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🎯</span>
              Project Details
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Project Scope * (What needs to be done?)
                </label>
                <textarea
                  name="project_scope"
                  value={formData.project_scope}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Describe the overall scope of your project, including key features and functionalities..."
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:border-purple-500/40 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Project Objectives * (What are you trying to achieve?)
                </label>
                <textarea
                  name="objectives"
                  value={formData.objectives}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="List your main objectives and goals for this project..."
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:border-purple-500/40 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Target Audience (Who will use this?)
                </label>
                <textarea
                  name="target_audience"
                  value={formData.target_audience}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe your target users or audience..."
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:border-purple-500/40 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Current Challenges (What problems are you facing?)
                </label>
                <textarea
                  name="current_challenges"
                  value={formData.current_challenges}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the current challenges or pain points you're experiencing..."
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:border-purple-500/40 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Success Criteria (How will you measure success?)
                </label>
                <textarea
                  name="success_criteria"
                  value={formData.success_criteria}
                  onChange={handleChange}
                  rows={3}
                  placeholder="What metrics or outcomes would indicate project success?"
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:border-purple-500/40 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Requirements & Deliverables */}
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📦</span>
              Requirements & Deliverables
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Expected Deliverables (What do you need?)
                </label>
                <textarea
                  name="deliverables"
                  value={formData.deliverables}
                  onChange={handleChange}
                  rows={5}
                  placeholder="List the deliverables you expect (e.g., website, mobile app, documentation, training, etc.)"
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:border-purple-500/40 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Technical Requirements
                </label>
                <textarea
                  name="technical_requirements"
                  value={formData.technical_requirements}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Any specific technical requirements, integrations, or technologies you need?"
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:border-purple-500/40 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Timeline & Budget */}
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📅</span>
              Timeline & Budget
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Preferred Start Date
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Timeline *
                </label>
                <input
                  type="text"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 3-6 months"
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:border-purple-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Budget Range *
                </label>
                <select
                  name="budget_range"
                  value={formData.budget_range}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                >
                  <option value="">Select Budget Range</option>
                  {budgetRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Preferred Team Size
                </label>
                <input
                  type="text"
                  name="team_size_preference"
                  value={formData.team_size_preference}
                  onChange={handleChange}
                  placeholder="e.g., 5-8 consultants"
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:border-purple-500/40 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📝</span>
              Additional Information
            </h3>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Anything else we should know?
              </label>
              <textarea
                name="additional_info"
                value={formData.additional_info}
                onChange={handleChange}
                rows={5}
                placeholder="Any additional context, constraints, or information that would help us understand your project better..."
                className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:border-purple-500/40 focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pb-8">
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-bold text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Project Brief'}
            </button>
            <Link
              href="/dashboard/client"
              className="px-8 py-4 bg-purple-900/30 border border-purple-500/30 rounded-lg font-semibold text-white hover:bg-purple-900/40 transition-all"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProjectBriefPage() {
  return (
    <AuthGuard allowedRoles={['client']}>
      <ProjectBriefContent />
    </AuthGuard>
  );
}
