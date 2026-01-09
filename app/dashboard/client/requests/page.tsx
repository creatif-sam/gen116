'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import AuthGuard from '@/app/components/AuthGuard';
import DashboardSidebar from '@/app/components/DashboardSidebar';
import Breadcrumb from '@/app/components/Breadcrumb';
import { getClientRequests } from '@/lib/portfolio-api';

function ClientRequestsContent() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user?.id) return;

      try {
        const { data, error } = await getClientRequests(user.id);
        if (!error && data) {
          setRequests(data);
        }
      } catch (err) {
        console.error('Error fetching requests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user?.id]);

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
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                <p className="text-gray-400 mt-2">Loading requests...</p>
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No requests found</p>
                <Link
                  href="/dashboard/client/submit-request"
                  className="text-purple-400 hover:text-purple-300 text-sm mt-2 inline-block"
                >
                  Submit your first request →
                </Link>
              </div>
            ) : (
              requests.map((request) => (
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
                      request.status === 'rejected' ? 'bg-red-600/20 text-red-400' :
                      'bg-yellow-600/20 text-yellow-400'
                    }`}>
                      {request.status.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{request.category}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`px-2 py-1 rounded ${
                      request.priority === 'urgent' ? 'bg-red-600/20 text-red-400' :
                      request.priority === 'high' ? 'bg-orange-600/20 text-orange-400' :
                      request.priority === 'medium' ? 'bg-yellow-600/20 text-yellow-400' :
                      'bg-gray-600/20 text-gray-400'
                    }`}>
                      {request.priority}
                    </span>
                    <span className="text-gray-400">{new Date(request.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
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
                    selectedRequest.status === 'rejected' ? 'bg-red-600/20 text-red-400' :
                    'bg-yellow-600/20 text-yellow-400'
                  }`}>
                    {selectedRequest.status.replace('-', ' ')}
                  </span>
                </div>

                {/* Progress Bar */}
                {selectedRequest.status !== 'completed' && selectedRequest.status !== 'rejected' && (
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white font-semibold">{selectedRequest.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-purple-900/30 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all"
                        style={{ width: `${selectedRequest.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedRequest.description}</p>
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Request Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Priority:</span>
                        <span className={`px-2 py-1 rounded text-sm font-semibold ${
                          selectedRequest.priority === 'urgent' ? 'bg-red-600/20 text-red-400' :
                          selectedRequest.priority === 'high' ? 'bg-orange-600/20 text-orange-400' :
                          selectedRequest.priority === 'medium' ? 'bg-yellow-600/20 text-yellow-400' :
                          'bg-gray-600/20 text-gray-400'
                        }`}>
                          {selectedRequest.priority}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Created:</span>
                        <span className="text-white">{new Date(selectedRequest.created_at).toLocaleDateString()}</span>
                      </div>
                      {selectedRequest.deadline && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Deadline:</span>
                          <span className="text-white">{new Date(selectedRequest.deadline).toLocaleDateString()}</span>
                        </div>
                      )}
                      {selectedRequest.budget && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Budget:</span>
                          <span className="text-white">{selectedRequest.budget}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Assignment</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Assigned to:</span>
                        <span className="text-white">
                          {selectedRequest.assigned_user ? selectedRequest.assigned_user.full_name : 'Unassigned'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last updated:</span>
                        <span className="text-white">{new Date(selectedRequest.updated_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* No comments/attachments for now - can be added later */}
                <div className="text-center py-8 text-gray-400">
                  <p>Comments and attachments will be available soon</p>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-12 border border-purple-500/20 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-2xl font-bold text-white mb-2">Select a Request</h3>
                <p className="text-gray-400">Choose a request from the list to view its details</p>
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
