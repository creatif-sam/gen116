'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { getProjectBySlug } from '../../../../lib/portfolio-api';

export default function ProjectDetailPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const projectSlug = params.slug as string;

  useEffect(() => {
    setIsVisible(true);
    loadProject();
  }, [projectSlug]);

  const loadProject = async () => {
    const { data, error } = await getProjectBySlug(projectSlug);
    if (data) {
      setProject(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner message="Loading project..." />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-400 mb-4">Project Not Found</h1>
            <Link href="/portfolio/projects" className="text-purple-400 hover:text-purple-300">
              ← Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const tech = Array.isArray(project.tech) ? project.tech : [];
  const features = Array.isArray(project.features) ? project.features : [];
  const results = Array.isArray(project.results) ? project.results : [];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-transparent"></div>
        
        <div className={`max-w-5xl mx-auto relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link href="/portfolio/projects" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 transition-colors">
            <span>←</span>
            Back to Projects
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl">{project.icon}</span>
            <div>
              <span className="text-purple-400 text-sm font-semibold">{project.category}</span>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {project.title}
              </h1>
            </div>
          </div>
          
          <p className="text-xl text-gray-300 mb-8">
            {project.description}
          </p>

          {/* Project Meta */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-purple-400">📅</span>
              <span className="text-gray-400">Duration: <span className="text-white">{project.duration}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-400">🗓️</span>
              <span className="text-gray-400">Year: <span className="text-white">{project.year}</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-2xl border border-red-500/20">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <span>🎯</span>
              The Challenge
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {project.challenge}
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl border border-blue-500/20">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <span>💡</span>
              Our Solution
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {project.solution}
            </p>

          <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-purple-900/20 rounded-lg">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span>🛠️</span>
            Technology Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {tech.map((t: string, index: number) => (
              <span
                key={index}
                className="px-6 py-3 bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-full text-white font-semibold border border-purple-500/20"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl border border-green-500/20">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span>📈</span>
              Results & Impact
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {results.map((result: string, index: number) => (
                <div
                  key={index}
                  className="p-6 bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-xl border border-green-500/20"
                >
                  <div className="text-4xl mb-2">✓</div>
                  <p className="text-lg font-semibold text-green-300">{result}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-3xl border border-purple-500/20 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Interested in Similar Results?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Let's discuss how we can help transform your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
              >
                Start Your Project
                <span>→</span>
              </Link>
              <Link
                href="/portfolio/projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-900/20 border border-purple-500/20 rounded-full font-semibold hover:border-purple-500/40 transition-all duration-300"
              >
                View More Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
