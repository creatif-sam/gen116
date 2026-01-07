'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function CaseStudyDetailPage() {
  const [isVisible, setIsVisible] = useState(false);
  const params = useParams();
  const studyId = params.slug as string;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Case study data - in a real app, this would come from a database or API
  const caseStudies: Record<string, any> = {
    'retail-transformation': {
      title: 'Retail Giant Digital Transformation',
      industry: 'Retail & E-Commerce',
      icon: '🛍️',
      client: 'Major National Retail Chain',
      duration: '6 months',
      year: '2025',
      gradient: 'from-purple-600 to-blue-600',
      overview: 'A leading retail chain with 500+ physical stores was facing declining online sales and losing market share to digital-first competitors. They needed a comprehensive digital transformation to compete in the modern retail landscape.',
      challenge: {
        title: 'The Challenge',
        points: [
          'Online sales declining 15% year-over-year despite growing e-commerce market',
          'Legacy systems unable to handle omnichannel retail operations',
          'Poor mobile shopping experience causing 70% cart abandonment',
          'No integration between online and physical store inventory',
          'Limited data insights preventing personalized customer experiences'
        ]
      },
      approach: {
        title: 'Our Approach',
        description: 'We implemented a comprehensive digital transformation strategy focused on customer experience, operational efficiency, and data-driven decision making.',
        phases: [
          {
            title: 'Discovery & Planning',
            duration: '4 weeks',
            activities: [
              'Customer journey mapping and pain point analysis',
              'Technical infrastructure assessment',
              'Competitive analysis and market research',
              'Stakeholder interviews and requirements gathering'
            ]
          },
          {
            title: 'Platform Development',
            duration: '12 weeks',
            activities: [
              'Built responsive e-commerce platform with Next.js',
              'Integrated AI-powered recommendation engine',
              'Implemented real-time inventory management system',
              'Developed mobile-first progressive web application',
              'Created unified customer data platform'
            ]
          },
          {
            title: 'Integration & Migration',
            duration: '6 weeks',
            activities: [
              'Integrated with existing ERP and POS systems',
              'Migrated product catalog and customer data',
              'Set up analytics and monitoring infrastructure',
              'Implemented A/B testing framework'
            ]
          },
          {
            title: 'Launch & Optimization',
            duration: '4 weeks',
            activities: [
              'Phased rollout starting with pilot stores',
              'Staff training and change management',
              'Performance monitoring and optimization',
              'Continuous improvement based on user feedback'
            ]
          }
        ]
      },
      solution: {
        title: 'The Solution',
        components: [
          {
            name: 'Omnichannel E-Commerce Platform',
            description: 'Modern, scalable platform built with Next.js providing seamless shopping experience across all devices',
            features: ['Progressive Web App', 'Real-time inventory', 'One-click checkout', 'Multi-payment support']
          },
          {
            name: 'AI Recommendation Engine',
            description: 'Machine learning-powered system that personalizes product recommendations based on browsing and purchase history',
            features: ['Collaborative filtering', 'Real-time personalization', 'A/B testing', 'Conversion optimization']
          },
          {
            name: 'Unified Customer Platform',
            description: 'Single source of truth for customer data across all channels',
            features: ['360° customer view', 'Loyalty program integration', 'Behavioral analytics', 'Marketing automation']
          },
          {
            name: 'Analytics Dashboard',
            description: 'Real-time business intelligence platform for data-driven decision making',
            features: ['Sales analytics', 'Customer insights', 'Inventory optimization', 'Predictive analytics']
          }
        ]
      },
      results: {
        title: 'Results & Impact',
        metrics: [
          { value: '250%', label: 'Increase in Online Revenue', icon: '📈' },
          { value: '65%', label: 'Reduction in Cart Abandonment', icon: '🛒' },
          { value: '40%', label: 'Lower Customer Acquisition Cost', icon: '💰' },
          { value: '85%', label: 'Customer Satisfaction Score', icon: '⭐' },
          { value: '3.2M', label: 'New Online Customers', icon: '👥' },
          { value: '50%', label: 'Faster Page Load Times', icon: '⚡' }
        ],
        testimonial: {
          quote: 'The digital transformation delivered by Gen11 has been nothing short of remarkable. We\'ve not only recovered our market position but are now leading in digital innovation within our sector.',
          author: 'Chief Digital Officer',
          company: 'National Retail Chain'
        }
      },
      technologies: [
        'Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis',
        'TensorFlow', 'AWS', 'Docker', 'Kubernetes', 'Stripe', 'Analytics'
      ],
      keyLearnings: [
        'Phased rollout approach minimized disruption and allowed for continuous improvement',
        'AI-powered personalization was the biggest driver of conversion rate improvements',
        'Mobile-first design was critical - 70% of traffic came from mobile devices',
        'Integration with existing systems required careful planning and strong partnerships',
        'Change management and staff training were as important as the technology itself'
      ]
    },
    'startup-scaling': {
      title: 'FinTech Startup Scaling Success',
      industry: 'Financial Technology',
      icon: '🚀',
      client: 'Fast-Growing FinTech Startup',
      duration: '12 months',
      year: '2024',
      gradient: 'from-blue-600 to-cyan-600',
      overview: 'A promising fintech startup offering peer-to-peer payment solutions was experiencing explosive growth but facing critical infrastructure challenges that threatened their ability to scale.',
      challenge: {
        title: 'The Challenge',
        points: [
          'User base growing from 1,000 to 100,000 in 6 months',
          'Infrastructure unable to handle transaction volume during peak times',
          'Security concerns with rapid scaling and compliance requirements',
          'System downtime averaging 2 hours per week affecting user trust',
          'Technical debt from rapid initial development'
        ]
      },
      approach: {
        title: 'Our Approach',
        description: 'We implemented a comprehensive infrastructure modernization and scaling strategy while maintaining zero downtime.',
        phases: [
          {
            title: 'Infrastructure Assessment',
            duration: '2 weeks',
            activities: [
              'Performance bottleneck analysis',
              'Security audit and compliance review',
              'Architecture review and optimization planning',
              'Team capability assessment'
            ]
          },
          {
            title: 'Architecture Redesign',
            duration: '8 weeks',
            activities: [
              'Migrated to microservices architecture',
              'Implemented event-driven processing',
              'Set up containerization with Kubernetes',
              'Built auto-scaling infrastructure',
              'Enhanced security and encryption'
            ]
          },
          {
            title: 'Migration & Testing',
            duration: '12 weeks',
            activities: [
              'Blue-green deployment strategy',
              'Load testing and performance optimization',
              'Security penetration testing',
              'Disaster recovery planning and testing'
            ]
          },
          {
            title: 'Monitoring & Optimization',
            duration: '6 weeks',
            activities: [
              'Real-time monitoring and alerting',
              'Performance tuning and optimization',
              'Team training and documentation',
              'Incident response procedures'
            ]
          }
        ]
      },
      solution: {
        title: 'The Solution',
        components: [
          {
            name: 'Scalable Microservices Architecture',
            description: 'Event-driven microservices architecture enabling horizontal scaling and fault isolation',
            features: ['Service mesh', 'Auto-scaling', 'Load balancing', 'Circuit breakers']
          },
          {
            name: 'Enhanced Security Infrastructure',
            description: 'Multi-layer security approach ensuring PCI DSS compliance and data protection',
            features: ['End-to-end encryption', 'Fraud detection', 'Multi-factor authentication', 'Compliance monitoring']
          },
          {
            name: 'Real-time Processing Pipeline',
            description: 'High-throughput transaction processing system handling millions of transactions',
            features: ['Event streaming', 'Async processing', 'Real-time validation', 'Transaction queuing']
          },
          {
            name: 'Monitoring & Observability',
            description: 'Comprehensive monitoring solution providing real-time insights into system health',
            features: ['Distributed tracing', 'Log aggregation', 'Custom dashboards', 'Automated alerts']
          }
        ]
      },
      results: {
        title: 'Results & Impact',
        metrics: [
          { value: '100x', label: 'User Growth Supported', icon: '📊' },
          { value: '99.9%', label: 'System Uptime Achieved', icon: '✓' },
          { value: '0', label: 'Security Incidents', icon: '🔒' },
          { value: '5M+', label: 'Monthly Transactions', icon: '💳' },
          { value: '50ms', label: 'Average Response Time', icon: '⚡' },
          { value: '70%', label: 'Infrastructure Cost Savings', icon: '💰' }
        ],
        testimonial: {
          quote: 'Gen11 didn\'t just help us scale - they built us a foundation that will support our growth for years to come. Their expertise in fintech and security was invaluable.',
          author: 'CTO & Co-founder',
          company: 'FinTech Startup'
        }
      },
      technologies: [
        'Node.js', 'React Native', 'Kubernetes', 'Docker', 'PostgreSQL', 'Redis',
        'Apache Kafka', 'AWS', 'Terraform', 'Blockchain', 'Prometheus', 'Grafana'
      ],
      keyLearnings: [
        'Zero-downtime migration required careful planning and blue-green deployment strategy',
        'Microservices architecture provided flexibility but required strong DevOps practices',
        'Security and compliance must be built in from the start, not added later',
        'Real-time monitoring and observability are critical for maintaining high availability',
        'Auto-scaling capabilities were essential for handling unpredictable traffic patterns'
      ]
    },
    'enterprise-automation': {
      title: 'Enterprise Automation & Efficiency',
      industry: 'Manufacturing',
      icon: '⚡',
      client: 'Fortune 500 Manufacturing Company',
      duration: '10 months',
      year: '2025',
      gradient: 'from-purple-600 to-pink-600',
      overview: 'A global manufacturing company with operations across 20 countries needed to modernize their operations and reduce costs while improving quality and speed.',
      challenge: {
        title: 'The Challenge',
        points: [
          'Manual processes causing delays and errors across supply chain',
          'High operational costs due to inefficient workflows',
          'Quality control issues leading to 15% defect rate',
          'Limited visibility into operations across multiple facilities',
          'Slow decision-making due to lack of real-time data'
        ]
      },
      approach: {
        title: 'Our Approach',
        description: 'We implemented comprehensive AI-driven automation across manufacturing, quality control, and supply chain operations.',
        phases: [
          {
            title: 'Process Analysis',
            duration: '6 weeks',
            activities: [
              'Mapped all operational processes',
              'Identified automation opportunities',
              'Conducted time and motion studies',
              'Assessed existing technology stack'
            ]
          },
          {
            title: 'Automation Implementation',
            duration: '16 weeks',
            activities: [
              'Deployed IoT sensors across facilities',
              'Built AI-powered quality control system',
              'Automated supply chain management',
              'Implemented predictive maintenance',
              'Created unified operations dashboard'
            ]
          },
          {
            title: 'Integration & Training',
            duration: '8 weeks',
            activities: [
              'Integrated with ERP and MES systems',
              'Trained staff on new systems',
              'Established new workflows and procedures',
              'Created documentation and support materials'
            ]
          },
          {
            title: 'Optimization',
            duration: '6 weeks',
            activities: [
              'Fine-tuned AI models',
              'Optimized workflows based on data',
              'Scaled solution across facilities',
              'Established continuous improvement process'
            ]
          }
        ]
      },
      solution: {
        title: 'The Solution',
        components: [
          {
            name: 'AI-Powered Quality Control',
            description: 'Computer vision system for automated defect detection and quality assurance',
            features: ['Real-time inspection', '99.5% accuracy', 'Root cause analysis', 'Predictive alerts']
          },
          {
            name: 'Smart Supply Chain',
            description: 'Automated supply chain management with predictive ordering and optimization',
            features: ['Demand forecasting', 'Auto-ordering', 'Route optimization', 'Supplier integration']
          },
          {
            name: 'Predictive Maintenance',
            description: 'IoT-enabled equipment monitoring preventing breakdowns before they happen',
            features: ['Real-time monitoring', 'Failure prediction', 'Maintenance scheduling', 'Cost optimization']
          },
          {
            name: 'Unified Operations Platform',
            description: 'Central dashboard providing real-time visibility across all facilities',
            features: ['Real-time metrics', 'Custom reports', 'Alert system', 'Mobile access']
          }
        ]
      },
      results: {
        title: 'Results & Impact',
        metrics: [
          { value: '60%', label: 'Reduction in Operational Costs', icon: '💰' },
          { value: '10x', label: 'Faster Processing Speed', icon: '⚡' },
          { value: '85%', label: 'Reduction in Defect Rate', icon: '✓' },
          { value: '40%', label: 'Increase in Productivity', icon: '📈' },
          { value: '200%', label: 'Return on Investment', icon: '💎' },
          { value: '95%', label: 'Equipment Uptime', icon: '⚙️' }
        ],
        testimonial: {
          quote: 'The automation solution transformed our operations. We\'re now more efficient, profitable, and competitive than ever before. The ROI exceeded our expectations.',
          author: 'Chief Operations Officer',
          company: 'Fortune 500 Manufacturer'
        }
      },
      technologies: [
        'Python', 'TensorFlow', 'PyTorch', 'IoT', 'Computer Vision', 'React',
        'Node.js', 'TimescaleDB', 'Apache Kafka', 'AWS', 'Docker', 'Edge Computing'
      ],
      keyLearnings: [
        'Change management was critical - employees needed to understand AI was augmenting, not replacing them',
        'Starting with pilot programs helped prove value before full rollout',
        'Edge computing was essential for real-time processing in manufacturing environment',
        'Data quality and sensor placement were crucial for accurate AI predictions',
        'Continuous model training and refinement drove ongoing improvements'
      ]
    }
  };

  const study = caseStudies[studyId] || caseStudies['retail-transformation'];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-transparent"></div>
        
        <div className={`max-w-6xl mx-auto relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link href="/portfolio/case-studies" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 transition-colors">
            <span>←</span>
            Back to Case Studies
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl">{study.icon}</span>
            <div>
              <span className="text-purple-400 text-sm font-semibold">{study.industry}</span>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {study.title}
              </h1>
            </div>
          </div>
          
          <p className="text-xl text-gray-300 mb-8">
            {study.overview}
          </p>

          {/* Meta Information */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="p-4 bg-purple-900/20 rounded-xl border border-purple-500/20">
              <div className="text-sm text-gray-400 mb-1">Client</div>
              <div className="font-semibold text-white">{study.client}</div>
            </div>
            <div className="p-4 bg-purple-900/20 rounded-xl border border-purple-500/20">
              <div className="text-sm text-gray-400 mb-1">Duration</div>
              <div className="font-semibold text-white">{study.duration}</div>
            </div>
            <div className="p-4 bg-purple-900/20 rounded-xl border border-purple-500/20">
              <div className="text-sm text-gray-400 mb-1">Year</div>
              <div className="font-semibold text-white">{study.year}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-2xl border border-red-500/20">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span>🎯</span>
              {study.challenge.title}
            </h2>
            <ul className="space-y-4">
              {study.challenge.points.map((point: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-red-400 mt-1 flex-shrink-0">⚠</span>
                  <span className="text-gray-300 text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">{study.approach.title}</h2>
          <p className="text-gray-400 text-lg text-center mb-12 max-w-3xl mx-auto">
            {study.approach.description}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {study.approach.phases.map((phase: any, index: number) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl border border-blue-500/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                    <span className="text-sm text-gray-400">{phase.duration}</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {phase.activities.map((activity: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">{study.solution.title}</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {study.solution.components.map((component: any, index: number) => (
              <div
                key={index}
                className="p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20"
              >
                <h3 className="text-2xl font-bold mb-3 text-purple-400">{component.name}</h3>
                <p className="text-gray-300 mb-6">{component.description}</p>
                
                <div className="space-y-2">
                  {component.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-purple-400">✓</span>
                      <span className="text-gray-400 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent via-green-900/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">{study.results.title}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {study.results.metrics.map((metric: any, index: number) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl border border-green-500/20 text-center"
              >
                <div className="text-4xl mb-2">{metric.icon}</div>
                <div className="text-4xl font-bold text-green-400 mb-2">{metric.value}</div>
                <div className="text-gray-400 text-sm">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
            <div className="text-6xl text-purple-400 mb-4">"</div>
            <p className="text-xl text-gray-300 mb-6 italic">
              {study.results.testimonial.quote}
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-xl">
                👤
              </div>
              <div>
                <div className="font-semibold text-white">{study.results.testimonial.author}</div>
                <div className="text-sm text-gray-400">{study.results.testimonial.company}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Technology Stack</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {study.technologies.map((tech: string, index: number) => (
              <span
                key={index}
                className="px-6 py-3 bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-full text-white font-semibold border border-purple-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Key Learnings */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Learnings</h2>
          <div className="space-y-4">
            {study.keyLearnings.map((learning: string, index: number) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/20 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-300">{learning}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-3xl border border-purple-500/20 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Let's discuss how we can help you achieve similar results
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
              >
                Start Your Transformation
                <span>→</span>
              </Link>
              <Link
                href="/portfolio/case-studies"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-900/20 border border-purple-500/20 rounded-full font-semibold hover:border-purple-500/40 transition-all duration-300"
              >
                View More Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
