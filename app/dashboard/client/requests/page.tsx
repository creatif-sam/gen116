'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import AuthGuard from '@/app/components/AuthGuard';
import DashboardSidebar from '@/app/components/DashboardSidebar';
import Breadcrumb from '@/app/components/Breadcrumb';

function ClientRequestsContent() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const requests = [
    {
      id: '1',
      title: 'Website Redesign',
      category: 'Web Development',
      status: 'in-progress',
      priority: 'high',
      date: '2026-01-05',
      description: 'Complete redesign of company website with modern UI/UX',
      assignedTo: 'Mike Johnson',
      progress: 65,
      comments: [
        { user: 'Mike Johnson', role: 'staff', message: 'Started working on the homepage design', time: '2 hours ago' },
        { user: 'You', role: 'client', message: 'Looks great! Can we add more animations?', time: '1 hour ago' },
      ],
      attachments: [
        { name: 'wireframe.pdf', size: '2.4 MB', date: '2026-01-05' },
        { name: 'requirements.docx', size: '156 KB', date: '2026-01-05' },
      ],
    },
    {
      id: '2',
      title: 'Mobile App Development',
      category: 'Software Development',
      status: 'pending',
      priority: 'urgent',
      date: '2026-01-04',
      description: 'iOS and Android app for e-commerce platform',
      assignedTo: 'Unassigned',
      progress: 0,
      comments: [],
      attachments: [],
    },
    {
      id: '3',
      title: 'Logo Design',
      category: 'Graphic Design',
      status: 'completed',
      priority: 'medium',
      date: '2026-01-03',
      description: 'Professional logo design for brand identity',
      assignedTo: 'Sarah Williams',
      progress: 100,
      comments: [
        { user: 'Sarah Williams', role: 'staff', message: 'Final design delivered', time: '1 day ago' },
      ],
      attachments: [
        { name: 'logo-final.ai', size: '5.2 MB', date: '2026-01-03' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#1a1040] to-[#0a0520] flex">
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64 p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8 mt-16 lg:mt-0">
          <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard/client' }, { label: 'My Requests' }]} />
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">My Requests</h2>
              <p className="text-gray-400">View and manage all your service requests</p>
            </div>
            <Link
              href="/dashboard/client"
              className="px-4 py-2 bg-purple-900/30 border border-purple-500/30 rounded-lg text-purple-400 text-sm font-semibold hover:bg-purple-900/40 transition-all"
            >
              ← Back
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Requests List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">All Requests</h2>
            {requests.map((request) => (
              <div
                key={request.id}
                onClick={() => setSelectedRequest(request)}
                className={`bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-4 border cursor-pointer transition-all hover:scale-105 ${
                  selectedRequest?.id === request.id
                    ? 'border-purple-500 shadow-lg shadow-purple-500/30'
                    : 'border-purple-500/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold">{request.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    request.status === 'completed' ? 'bg-green-600/20 text-green-400' :
                    request.status === 'in-progress' ? 'bg-blue-600/20 text-blue-400' :
                    'bg-yellow-600/20 text-yellow-400'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{request.category}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2 py-1 rounded ${
                    request.priority === 'urgent' ? 'bg-red-600/20 text-red-400' :
                    request.priority === 'high' ? 'bg-orange-600/20 text-orange-400' :
                    'bg-gray-600/20 text-gray-400'
                  }`}>
                    {request.priority}
                  </span>
                  <span className="text-gray-400">{request.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Request Details */}
          <div className="lg:col-span-2">
            {selectedRequest ? (
              <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedRequest.title}</h2>
                    <p className="text-gray-400">{selectedRequest.category}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                    selectedRequest.status === 'completed' ? 'bg-green-600/20 text-green-400' :
                    selectedRequest.status === 'in-progress' ? 'bg-blue-600/20 text-blue-400' :
                    'bg-yellow-600/20 text-yellow-400'
                  }`}>
                    {selectedRequest.status}
                  </span>
                </div>

                {/* Progress Bar */}
                {selectedRequest.status !== 'completed' && (
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white font-semibold">{selectedRequest.progress}%</span>
                    </div>
                    <div className="w-full bg-purple-900/30 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all"
                        style={{ width: `${selectedRequest.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Details */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
                    <p className="text-gray-400 text-sm mb-1">Assigned To</p>
                    <p className="text-white font-semibold">{selectedRequest.assignedTo}</p>
                  </div>
                  <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
                    <p className="text-gray-400 text-sm mb-1">Priority</p>
                    <p className="text-white font-semibold capitalize">{selectedRequest.priority}</p>
                  </div>
                  <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
                    <p className="text-gray-400 text-sm mb-1">Created</p>
                    <p className="text-white font-semibold">{selectedRequest.date}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-3">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedRequest.description}</p>
                </div>

                {/* Attachments */}
                {selectedRequest.attachments.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-white mb-3">Attachments</h3>
                    <div className="space-y-2">
                      {selectedRequest.attachments.map((file: any, index: number) => (
                        <div key={index} className="flex items-center justify-between bg-purple-900/20 rounded-lg p-3 border border-purple-500/10">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">📄</span>
                            <div>
                              <p className="text-white font-semibold text-sm">{file.name}</p>
                              <p className="text-gray-400 text-xs">{file.size} • {file.date}</p>
                            </div>
                          </div>
                          <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comments */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Comments</h3>
                  <div className="space-y-3 mb-4">
                    {selectedRequest.comments.length > 0 ? (
                      selectedRequest.comments.map((comment: any, index: number) => (
                        <div key={index} className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-white">{comment.user}</span>
                            <span className={`px-2 py-0.5 rounded text-xs ${
                              comment.role === 'staff' ? 'bg-blue-600/20 text-blue-400' : 'bg-purple-600/20 text-purple-400'
                            }`}>
                              {comment.role}
                            </span>
                            <span className="text-gray-400 text-xs ml-auto">{comment.time}</span>
                          </div>
                          <p className="text-gray-300">{comment.message}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-center py-4">No comments yet</p>
                    )}
                  </div>

                  {/* Add Comment */}
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 px-4 py-3 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                    />
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-12 border border-purple-500/20 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-2xl font-bold text-white mb-2">Select a Request</h3>
                <p className="text-gray-400">Click on a request from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClientRequestsPage() {
  return (
    <AuthGuard allowedRoles={['client']}>
      <ClientRequestsContent />
    </AuthGuard>
  );
}
