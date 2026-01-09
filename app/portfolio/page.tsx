'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { getProjects, getCaseStudies, getPortfolioStats } from '../../lib/portfolio-api';

export default function PortfolioPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState([
    { value: '12+', label: 'Projects Completed' },
    { value: '95%', label: 'Client Satisfaction' },
    { value: '12+', label: 'Years Experience' },
    { value: '7', label: 'Happy Clients' }
  ]);
  const [projects, setProjects] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Redirect logged-in users to their dashboard
      if (user.role === 'admin') {
        router.push('/dashboard/admin');
      } else if (user.role === 'staff') {
        router.push('/dashboard/staff');
      } else {
        router.push('/dashboard/client');
      }
    }
  }, [user, router]);

  useEffect(() => {
    setIsVisible(true);
    loadData();
  }, []);

  const loadData = async () => {
    // Load stats
    const { data: statsData } = await getPortfolioStats();
    if (statsData) {
      setStats([
        { value: `${statsData.projects_completed}+`, label: 'Projects Completed' },
        { value: `${statsData.client_satisfaction}%`, label: 'Client Satisfaction' },
        { value: `${statsData.years_experience}+`, label: 'Years Experience' },
        { value: `${statsData.happy_clients}+`, label: 'Happy Clients' }
      ]);
    }

    // Load featured projects (first 4)
    const { data: projectsData } = await getProjects();
    if (projectsData) {
      setProjects(projectsData.slice(0, 4));
    }

    // Load featured case studies (first 3)
    const { data: caseStudiesData } = await getCaseStudies();
    if (caseStudiesData) {
      setCaseStudies(caseStudiesData.slice(0, 3));
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-transparent"></div>
        
        <div className={`max-w-7xl mx-auto relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Our Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-12">
            Explore our collection of successful projects and transformative case studies that showcase our expertise and innovation.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20 backdrop-blur-sm transition-all duration-700 delay-${index * 100} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover our innovative solutions that have helped businesses transform and grow
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {projects.map((project) => (
              <Link key={project.id} href={`/portfolio/projects/${project.slug}`} className="group">
                <div className={`relative h-80 rounded-2xl overflow-hidden bg-gradient-to-br ${project.gradient.replace('from-', 'from-').replace('to-', 'to-')}/40 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-3xl">{project.icon}</span>
                      <span className="text-sm text-purple-400 font-semibold capitalize">{project.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {project.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/portfolio/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
            >
              View All Projects
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Case Studies
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Deep dive into how we helped our clients achieve remarkable results
            </p>
          </div>

          <div className="space-y-8">
            {caseStudies.map((caseStudy) => {
              const challenge = typeof caseStudy.challenge === 'object' ? caseStudy.challenge : { points: [] };
              const results = typeof caseStudy.results === 'object' ? caseStudy.results.metrics || [] : [];
              
              return (
                <Link key={caseStudy.id} href={`/portfolio/case-studies/${caseStudy.slug}`} className="group block">
                  <div className="p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${caseStudy.gradient || 'from-purple-600 to-blue-600'} flex items-center justify-center text-4xl`}>
                          {caseStudy.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                          {caseStudy.title}
                        </h3>
                        <p className="text-gray-400 mb-4">
                          {caseStudy.description}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {results.slice(0, 3).map((result: any, i: number) => (
                            <span key={i} className="px-3 py-1 bg-purple-900/40 rounded-full text-sm text-purple-300">
                              {result.label || result.value || result}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-purple-400 group-hover:translate-x-2 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/portfolio/case-studies"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
            >
              View All Case Studies
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-3xl border border-purple-500/20 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Let's discuss how we can help you achieve similar results
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
            >
              Get In Touch
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
