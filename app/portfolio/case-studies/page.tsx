'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function CaseStudiesPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const caseStudies = [
    {
      id: 'retail-transformation',
      title: 'Retail Giant Digital Transformation',
      industry: 'Retail',
      icon: '🛍️',
      description: 'How we helped a major retail chain increase online sales by 250% through digital transformation',
      challenge: 'Legacy systems, declining online sales',
      results: ['+250% Revenue', '6 Months', '-40% Costs'],
      gradient: 'from-purple-600 to-blue-600',
      year: '2025'
    },
    {
      id: 'startup-scaling',
      title: 'FinTech Startup Scaling Success',
      industry: 'FinTech',
      icon: '🚀',
      description: 'Scaling from 1,000 to 100,000+ users while maintaining security and performance',
      challenge: 'Rapid growth, infrastructure scaling',
      results: ['100x Growth', '99.9% Uptime', 'Zero Downtime'],
      gradient: 'from-blue-600 to-cyan-600',
      year: '2024'
    },
    {
      id: 'enterprise-automation',
      title: 'Enterprise Automation & Efficiency',
      industry: 'Manufacturing',
      icon: '⚡',
      description: 'AI-driven automation reducing operational costs by 60% and improving speed by 10x',
      challenge: 'Manual processes, high operational costs',
      results: ['-60% Costs', '10x Faster', '+200% ROI'],
      gradient: 'from-purple-600 to-pink-600',
      year: '2025'
    },
    {
      id: 'healthcare-innovation',
      title: 'Healthcare Digital Innovation',
      industry: 'Healthcare',
      icon: '🏥',
      description: 'Revolutionizing patient care with telemedicine and AI diagnostics',
      challenge: 'Patient access, diagnosis accuracy',
      results: ['50K+ Patients', '95% Accuracy', '-70% Wait Time'],
      gradient: 'from-green-600 to-blue-600',
      year: '2024'
    },
    {
      id: 'education-platform',
      title: 'EdTech Platform Transformation',
      industry: 'Education',
      icon: '📚',
      description: 'Building an adaptive learning platform serving 1 million+ students',
      challenge: 'Personalization, engagement',
      results: ['1M+ Users', '+85% Engagement', '+40% Completion'],
      gradient: 'from-blue-600 to-indigo-600',
      year: '2025'
    },
    {
      id: 'real-estate-tech',
      title: 'Real Estate Tech Innovation',
      industry: 'Real Estate',
      icon: '🏢',
      description: 'Virtual reality property tours increasing sales conversions by 180%',
      challenge: 'Remote viewing, conversion rates',
      results: ['+180% Conversions', '10K+ Properties', '-50% Time'],
      gradient: 'from-orange-600 to-red-600',
      year: '2024'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-transparent"></div>
        
        <div className={`max-w-7xl mx-auto relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 transition-colors">
            <span>←</span>
            Back to Portfolio
          </Link>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Case Studies
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-12">
            Real stories of transformation, innovation, and measurable business impact
          </p>
        </div>
      </section>

      {/* Case Studies List */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {caseStudies.map((study, index) => (
            <Link
              key={study.id}
              href={`/portfolio/case-studies/${study.id}`}
              className={`group block transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="p-8 md:p-10 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Icon & Industry */}
                  <div className="flex-shrink-0">
                    <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${study.gradient} flex items-center justify-center text-5xl mb-4`}>
                      {study.icon}
                    </div>
                    <span className="inline-block px-4 py-2 bg-purple-900/40 rounded-full text-sm text-purple-300 font-semibold">
                      {study.industry}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-3xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                          {study.title}
                        </h3>
                        <p className="text-gray-400 text-lg">
                          {study.description}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500 ml-4">{study.year}</span>
                    </div>

                    <div className="mb-6">
                      <span className="text-sm text-gray-500 font-semibold">Challenge:</span>
                      <p className="text-gray-400">{study.challenge}</p>
                    </div>

                    {/* Results */}
                    <div className="flex flex-wrap gap-3">
                      {study.results.map((result, i) => (
                        <span
                          key={i}
                          className={`px-4 py-2 bg-gradient-to-r ${study.gradient} bg-opacity-20 rounded-full text-sm font-semibold backdrop-blur-sm`}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center">
                    <span className="text-purple-400 text-2xl group-hover:translate-x-2 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-3xl border border-blue-500/20 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to Be Our Next Success Story?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Let's create a case study together that showcases remarkable results
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
            >
              Start Your Transformation
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
