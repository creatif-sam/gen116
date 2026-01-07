'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // Sequential animation - each step activates after the previous
    const timers = [
      setTimeout(() => setActiveStep(0), 500),
      setTimeout(() => setActiveStep(1), 1500),
      setTimeout(() => setActiveStep(2), 2500),
    ];

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const processes = [
    {
      number: '1',
      title: 'Join us for a discovery call',
      description: 'Our experts will engage with you to understand your business requirements, technical specifications, and project objectives.',
    },
    {
      number: '2',
      title: 'Concept Translation & Rapid Prototyping',
      description: 'We transform your ideas into tangible prototypes, ensuring alignment with your vision through iterative design and development.',
    },
    {
      number: '3',
      title: 'Agreement & Onboarding',
      description: 'Finalize project scope, timelines, and deliverables. We onboard your team and kickstart the development journey together.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#1a1040] to-[#0a0520]">
      <Navbar />

      <div className="pt-20">
        <div className="grid lg:grid-cols-2 min-h-screen">
          {/* Left Section - Dark */}
          <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] p-8 md:p-16 flex flex-col justify-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Where do we go
              </h1>
              <h1 className="text-4xl md:text-6xl font-bold mb-8">
                from{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  here?
                </span>
              </h1>

              <p className="text-gray-300 text-lg mb-12">
                You will hear from our team within the next 24 hours.
              </p>

              {/* Process Steps */}
              <div className="space-y-8">
                {processes.map((process, index) => {
                  const isActive = index <= activeStep;
                  const isCurrent = index === activeStep;
                  
                  return (
                    <div 
                      key={index} 
                      className="relative pl-8 border-l-2 border-purple-500/30"
                    >
                      {/* Animated connector line */}
                      {index < processes.length - 1 && (
                        <div 
                          className={`absolute left-[-2px] top-8 w-0.5 h-full bg-gradient-to-b from-purple-600 to-blue-600 transition-all duration-700 origin-top ${
                            isActive ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                          }`}
                        />
                      )}

                      {/* Number Circle with throw animation */}
                      <div 
                        className={`absolute -left-4 top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-700 ${
                          isActive
                            ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white scale-110 shadow-lg shadow-purple-500/50'
                            : 'border-2 border-purple-500/30 text-purple-500/50 bg-transparent scale-100'
                        } ${
                          isCurrent ? 'animate-pulse' : ''
                        }`}
                        style={{
                          transform: isActive ? 'scale(1.1) translateY(0)' : 'scale(1) translateY(-10px)',
                          opacity: isActive ? 1 : 0.5,
                        }}
                      >
                        {process.number}
                      </div>

                      {/* Content with slide-in animation */}
                      <div 
                        className="transition-all duration-700"
                        style={{
                          transform: isActive ? 'translateX(0)' : 'translateX(-20px)',
                          opacity: isActive ? 1 : 0.3,
                        }}
                      >
                        <h3 className={`text-xl md:text-2xl font-bold mb-3 transition-all duration-700 ${
                          isActive ? 'text-white' : 'text-gray-600'
                        }`}>
                          {process.title}
                        </h3>
                        <p className={`leading-relaxed transition-all duration-700 ${
                          isActive ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {process.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Section - Light */}
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-16 flex flex-col justify-center">
            <div className="max-w-xl">
              <p className="text-gray-800 text-lg md:text-xl mb-8 leading-relaxed">
                Feel free to reach out to discuss your idea, get estimates for your project, or seek expert advice.
              </p>

              <p className="text-gray-600 mb-8">
                To apply for a job, please visit the{' '}
                <a href="#" className="text-purple-600 font-semibold underline hover:text-purple-700">
                  career page.
                </a>
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                1. Tell us about your company.
              </h2>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name*"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email*"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone number*"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="company"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Tell us about your project*"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-6 py-4 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
                >
                  Send Message
                </button>
              </form>

              {/* Additional Info */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Other ways to reach us</h3>
                <div className="space-y-3">
                  <p className="text-gray-700 flex items-center gap-3">
                    <span className="text-2xl">📧</span>
                    <a href="mailto:info@gen11consult.com" className="hover:text-purple-600 transition-colors">
                      info@gen11consult.com
                    </a>
                  </p>
                  <p className="text-gray-700 flex items-center gap-3">
                    <span className="text-2xl">📞</span>
                    <a href="tel:+233000000000" className="hover:text-purple-600 transition-colors">
                      +233 (0) 000 000 000
                    </a>
                  </p>
                  <p className="text-gray-700 flex items-start gap-3">
                    <span className="text-2xl">📍</span>
                    <span>Mpohor, Western Region, Ghana</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
