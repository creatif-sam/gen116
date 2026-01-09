'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
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
    
    const handleScroll = () => {
      const sections = document.querySelectorAll('.scroll-section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { value: '2024', label: 'Founded', icon: '🚀' },
    { value: '12+', label: 'Projects Delivered', icon: '💼' },
    { value: '7', label: 'Happy Clients', icon: '😊' },
    { value: '24/7', label: 'Support Available', icon: '🛟' }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Excellence',
      description: 'We strive for perfection in every project, delivering solutions that exceed expectations.'
    },
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'We work closely with our clients, ensuring their vision becomes our mission.'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We embrace cutting-edge technology to solve complex business challenges.'
    },
    {
      icon: '🔒',
      title: 'Integrity',
      description: 'We build trust through transparency, honesty, and ethical business practices.'
    }
  ];

  const timeline = [
    {
      year: '2024',
      title: 'Our Beginning',
      description: 'Gen116 was founded with a vision to revolutionize business consulting and digital transformation.',
      icon: '🌟'
    },
    {
      year: '2024',
      title: 'First Major Clients',
      description: 'Successfully delivered transformative solutions to our initial portfolio of clients.',
      icon: '🎉'
    },
    {
      year: '2025',
      title: 'Rapid Growth',
      description: 'Expanded our team and service offerings, reaching new markets and industries.',
      icon: '📈'
    },
    {
      year: '2026',
      title: 'Innovation Leader',
      description: 'Recognized as a leading force in digital transformation and business consulting.',
      icon: '🏆'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0520] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
        <div 
          className={`max-w-7xl mx-auto px-6 relative z-10 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6 animate-bounce">
              <span className="text-6xl">🏢</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              About Gen116 Consult
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Since 2024, we've been transforming businesses through innovative consulting and cutting-edge digital solutions. 
              We're not just consultants—we're your partners in growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                  Work With Us
                </button>
              </Link>
              <Link href="/portfolio">
                <button className="px-8 py-3 border-2 border-purple-500/50 rounded-full font-semibold hover:bg-purple-900/30 transition-all duration-300 hover:scale-105">
                  View Our Work
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </section>

      {/* Stats Section */}
      <section className="scroll-section py-20 bg-gradient-to-b from-transparent to-purple-900/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-3 animate-bounce" style={{ animationDelay: `${index * 200}ms` }}>
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="scroll-section py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div 
              className={`p-8 bg-gradient-to-br from-purple-900/30 to-transparent rounded-2xl border border-purple-500/20 transition-all duration-700 ${
                activeSection >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="text-5xl mb-4">🎯</div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-gray-300 leading-relaxed">
                To empower businesses with innovative consulting and technology solutions that drive growth, 
                efficiency, and sustainable success. We believe every business deserves access to world-class 
                expertise and cutting-edge tools to thrive in the digital age.
              </p>
            </div>

            <div 
              className={`p-8 bg-gradient-to-br from-blue-900/30 to-transparent rounded-2xl border border-blue-500/20 transition-all duration-700 delay-200 ${
                activeSection >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="text-5xl mb-4">🔮</div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Our Vision
              </h2>
              <p className="text-gray-300 leading-relaxed">
                To be the most trusted partner for businesses seeking transformation, recognized globally for 
                our innovation, integrity, and impact. We envision a future where every organization can 
                harness the full potential of technology to achieve extraordinary results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="scroll-section py-20 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Our Journey
            </h2>
            <p className="text-gray-400 text-lg">From debut to industry leader</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500 opacity-20"></div>

            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative mb-16 transition-all duration-700 ${
                  activeSection >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 12}ms` }}
              >
                <div className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <div className="text-2xl font-bold text-purple-400 mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>

                  <div className="hidden md:block w-2/12 relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
                  </div>

                  <div className="hidden md:block w-5/12"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="scroll-section py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Our Core Values
            </h2>
            <p className="text-gray-400 text-lg">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className={`p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 ${
                  activeSection >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-purple-300">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="scroll-section py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div 
            className={`text-center p-12 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-blue-900/30 rounded-3xl border border-purple-500/30 transition-all duration-700 ${
              activeSection >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Ready to Transform Your Business?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Join the businesses who trust Gen116 to drive their success. Let's create something extraordinary together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                  Get Started Today
                </button>
              </Link>
              <Link href="/portfolio">
                <button className="px-8 py-3 border-2 border-purple-500/50 rounded-full font-semibold hover:bg-purple-900/30 transition-all duration-300 hover:scale-105">
                  See Our Success Stories
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
