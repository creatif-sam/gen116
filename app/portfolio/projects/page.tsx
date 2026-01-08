'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getProjects } from '../../../lib/portfolio-api';

export default function ProjectsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const { data } = await getProjects();
    if (data) {
      setProjects(data);
    }
    setLoading(false);
  };

  const filters = ['all', 'web', 'mobile', 'ai', 'design', 'consulting'];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-transparent"></div>
        
        <div className={`max-w-7xl mx-auto relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 transition-colors">
            <span>←</span>
            Back to Portfolio
          </Link>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Our Projects
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-12">
            Explore our diverse portfolio of innovative solutions across web, mobile, AI, and design
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full font-semibold capitalize transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white scale-105'
                    : 'bg-purple-900/20 text-gray-400 hover:text-white border border-purple-500/20 hover:border-purple-500/40'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <LoadingSpinner message="Loading projects..." />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => {
                const tech = Array.isArray(project.tech) ? project.tech : [];
                return (
                  <Link
                    key={project.id}
                    href={`/portfolio/projects/${project.slug}`}
                    className={`group transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="h-full p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-5xl">{project.icon}</span>
                        <span className="text-xs text-gray-500">{project.year}</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-6">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tech.slice(0, 3).map((t: string, i: number) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-purple-900/40 rounded-full text-xs text-purple-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2 text-purple-400 group-hover:gap-4 transition-all">
                        View Project
                        <span>→</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No projects found in this category</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
