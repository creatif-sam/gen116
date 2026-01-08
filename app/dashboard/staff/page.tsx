'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import AuthGuard from '@/app/components/AuthGuard';
import DashboardSidebar from '@/app/components/DashboardSidebar';
import Breadcrumb from '@/app/components/Breadcrumb';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { supabase } from '@/lib/supabase';

function StaffDashboardContent() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<any[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [stats, setStats] = useState({
    assigned: 0,
    inProgress: 0,
    pending: 0,
    completed: 0
  });

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    category: '',
    deadline: ''
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      // Get current authenticated user's ID
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user?.id) {
        console.error('No authenticated user');
        setLoading(false);
        return;
      }

      // Get current user's profile to find their ID
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('auth_id', session.user.id)
        .single();

      if (profileError || !profile) {
        console.error('Profile not found:', profileError);
        // Try to fetch tasks without filtering by assigned user
        const { data: tasksData, error } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTasks(tasksData || []);
        setLoading(false);
        return;
      }

      // Fetch all tasks from Supabase
      const { data: tasksData, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const fetchedTasks = tasksData || [];
      setTasks(fetchedTasks);

      // Calculate stats
      const assigned = fetchedTasks.filter(t => t.assigned_to === profile.id).length;
      const inProgress = fetchedTasks.filter(t => t.status === 'in-progress').length;
      const pending = fetchedTasks.filter(t => t.status === 'pending').length;
      const completedToday = fetchedTasks.filter(t => {
        const today = new Date().toISOString().split('T')[0];
        const taskDate = new Date(t.updated_at || t.created_at).toISOString().split('T')[0];
        return t.status === 'completed' && taskDate === today;
      }).length;

      setStats({ assigned, inProgress, pending, completed: completedToday });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Get current authenticated user's ID
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user?.id) {
        alert('Please log in to create tasks');
        return;
      }

      // Get current user's profile ID
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('auth_id', session.user.id)
        .single();

      if (!profile) {
        alert('Profile not found. Please contact administrator.');
        return;
      }

      // Insert new task into Supabase
      const { error } = await supabase
        .from('tasks')
        .insert([{
          title: newTask.title,
          description: newTask.description,
          category: newTask.category,
          priority: newTask.priority,
          status: newTask.status,
          deadline: newTask.deadline || null,
          assigned_to: profile.id,
          created_by: profile.id
        }]);

      if (error) throw error;

      setShowCreateModal(false);
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        status: 'pending',
        category: '',
        deadline: ''
      });
      alert('Task created successfully!');
      fetchTasks(); // Refresh tasks list
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    }
  };

  const handleUpdateStatus = async (taskId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', taskId);

      if (error) throw error;

      alert('Task status updated!');
      fetchTasks(); // Refresh tasks list
    } catch (error) {
      console.error('Error updating task status:', error);
      alert('Failed to update task status');
    }
  };

  const handleDeleteTask = async (taskId: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;

      alert('Task deleted successfully!');
      fetchTasks(); // Refresh tasks list
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  const filteredTasks = activeFilter === 'all' 
    ? tasks 
    : tasks.filter(t => t.status === activeFilter);

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  const statCards = [
    { label: 'Assigned to Me', value: stats.assigned.toString(), icon: '👤', color: 'from-purple-600 to-blue-600' },
    { label: 'In Progress', value: stats.inProgress.toString(), icon: '⚙️', color: 'from-blue-600 to-cyan-600' },
    { label: 'Pending', value: stats.pending.toString(), icon: '⏳', color: 'from-yellow-600 to-orange-600' },
    { label: 'Completed Today', value: stats.completed.toString(), icon: '✅', color: 'from-green-600 to-emerald-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#1a1040] to-[#0a0520] flex">
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64 p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8 mt-16 lg:mt-0">
          <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard/staff' }, { label: 'Tasks' }]} />
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">My Tasks</h2>
              <p className="text-gray-400">Manage and track your assigned tasks</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              + Create Task
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-3 overflow-x-auto">
          {['all', 'pending', 'in-progress', 'completed'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-lg font-semibold capitalize whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-purple-900/20 text-gray-400 hover:bg-purple-900/30'
              }`}
            >
              {filter === 'all' ? 'All Requests' : filter}
            </button>
          ))}
        </div>

        {/* Tasks Table */}
        {loading ? (
          <LoadingSpinner message="Loading tasks..." />
        ) : (
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl border border-purple-500/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-900/40 border-b border-purple-500/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Task</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Priority</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Deadline</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => (
                    <tr key={task.id} className="border-b border-purple-500/10 hover:bg-purple-900/20 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-semibold">{task.title}</p>
                          <p className="text-gray-400 text-sm mt-1">{task.description}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-400 text-sm">{task.category}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          task.priority === 'urgent' ? 'bg-red-600/20 text-red-400' :
                          task.priority === 'high' ? 'bg-orange-600/20 text-orange-400' :
                          task.priority === 'medium' ? 'bg-yellow-600/20 text-yellow-400' :
                          'bg-gray-600/20 text-gray-400'
                        }`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={task.status}
                          onChange={(e) => handleUpdateStatus(task.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border-none outline-none cursor-pointer ${
                            task.status === 'completed' ? 'bg-green-600/20 text-green-400' :
                            task.status === 'in-progress' ? 'bg-blue-600/20 text-blue-400' :
                            'bg-yellow-600/20 text-yellow-400'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{task.deadline}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleDeleteTask(task.id, task.title)}
                            className="px-3 py-1 bg-red-600/20 text-red-400 rounded text-xs font-semibold hover:bg-red-600/30 transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Create Task Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Create New Task</h3>
              
              <form onSubmit={handleCreateTask} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Task Title *</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                    placeholder="Enter task title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                    placeholder="Enter task description"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Category *</label>
                    <input
                      type="text"
                      value={newTask.category}
                      onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                      placeholder="Web Development"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Priority *</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Status</label>
                    <select
                      value={newTask.status}
                      onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Deadline</label>
                    <input
                      type="date"
                      value={newTask.deadline}
                      onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    Create Task
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg font-semibold hover:bg-purple-900/40 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default function StaffDashboard() {
  return (
    <AuthGuard allowedRoles={['staff', 'admin']}>
      <StaffDashboardContent />
    </AuthGuard>
  );
}