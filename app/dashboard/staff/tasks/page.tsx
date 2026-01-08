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

function TasksPageContent() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<any[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);

  const [taskForm, setTaskForm] = useState({
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
      // Fetch all tasks from Supabase
      const { data: tasksData, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTasks(tasksData || []);
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
          title: taskForm.title,
          description: taskForm.description,
          category: taskForm.category,
          priority: taskForm.priority,
          status: taskForm.status,
          deadline: taskForm.deadline || null,
          assigned_to: profile.id,
          created_by: profile.id
        }]);

      if (error) throw error;

      setShowCreateModal(false);
      resetForm();
      alert('Task created successfully!');
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    }
  };

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          title: taskForm.title,
          description: taskForm.description,
          category: taskForm.category,
          priority: taskForm.priority,
          status: taskForm.status,
          deadline: taskForm.deadline || null
        })
        .eq('id', editingTask.id);

      if (error) throw error;

      setEditingTask(null);
      resetForm();
      alert('Task updated successfully!');
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
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
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  const handleEditClick = (task: any) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      category: task.category,
      deadline: task.deadline
    });
  };

  const resetForm = () => {
    setTaskForm({
      title: '',
      description: '',
      priority: 'medium',
      status: 'pending',
      category: '',
      deadline: ''
    });
  };

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', taskId);

      if (error) throw error;

      fetchTasks(); // Refresh the tasks list
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const filteredTasks = activeFilter === 'all' 
    ? tasks 
    : tasks.filter(t => t.status === activeFilter);

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#1a1040] to-[#0a0520] flex">
      <DashboardSidebar />
      
      <div className="flex-1 lg:ml-64 p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8 mt-16 lg:mt-0">
          <Breadcrumb items={[
            { label: 'Dashboard', href: '/dashboard/staff' }, 
            { label: 'My Tasks' }
          ]} />
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">My Tasks</h2>
              <p className="text-gray-400">Manage and track all your assigned tasks</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setEditingTask(null);
                setShowCreateModal(true);
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              + Create Task
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-4 border border-purple-500/20">
              <div className="text-gray-400 text-sm mb-1">Total Tasks</div>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-lg rounded-xl p-4 border border-yellow-500/20">
              <div className="text-gray-400 text-sm mb-1">Pending</div>
              <div className="text-2xl font-bold text-white">{stats.pending}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-lg rounded-xl p-4 border border-blue-500/20">
              <div className="text-gray-400 text-sm mb-1">In Progress</div>
              <div className="text-2xl font-bold text-white">{stats.inProgress}</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-lg rounded-xl p-4 border border-green-500/20">
              <div className="text-gray-400 text-sm mb-1">Completed</div>
              <div className="text-2xl font-bold text-white">{stats.completed}</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
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
              {filter === 'all' ? 'All Tasks' : filter.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Tasks Grid */}
        {loading ? (
          <LoadingSpinner message="Loading tasks..." />
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
            <p className="text-gray-400 text-lg mb-4">No tasks found</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Create Your First Task
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{task.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{task.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ml-2 ${
                    task.priority === 'urgent' ? 'bg-red-600/20 text-red-400' :
                    task.priority === 'high' ? 'bg-orange-600/20 text-orange-400' :
                    task.priority === 'medium' ? 'bg-yellow-600/20 text-yellow-400' :
                    'bg-gray-600/20 text-gray-400'
                  }`}>
                    {task.priority}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">📂</span>
                    <span className="text-gray-400">{task.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">📅</span>
                    <span className="text-gray-400">Due: {task.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">Status:</span>
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      className={`flex-1 px-3 py-1 rounded-lg text-xs font-semibold border-none outline-none cursor-pointer ${
                        task.status === 'completed' ? 'bg-green-600/20 text-green-400' :
                        task.status === 'in-progress' ? 'bg-blue-600/20 text-blue-400' :
                        'bg-yellow-600/20 text-yellow-400'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-purple-500/20">
                  <button
                    onClick={() => handleEditClick(task)}
                    className="flex-1 px-3 py-2 bg-blue-600/20 text-blue-400 rounded-lg text-sm font-semibold hover:bg-blue-600/30 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id, task.title)}
                    className="flex-1 px-3 py-2 bg-red-600/20 text-red-400 rounded-lg text-sm font-semibold hover:bg-red-600/30 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create/Edit Task Modal */}
        {(showCreateModal || editingTask) && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h3>
              
              <form onSubmit={editingTask ? handleUpdateTask : handleCreateTask} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Task Title *</label>
                  <input
                    type="text"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                    placeholder="Enter task title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
                  <textarea
                    value={taskForm.description}
                    onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
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
                      value={taskForm.category}
                      onChange={(e) => setTaskForm({ ...taskForm, category: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                      placeholder="Web Development"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Priority *</label>
                    <select
                      value={taskForm.priority}
                      onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
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
                      value={taskForm.status}
                      onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
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
                      value={taskForm.deadline}
                      onChange={(e) => setTaskForm({ ...taskForm, deadline: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg text-white focus:border-purple-500/40 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    {editingTask ? 'Update Task' : 'Create Task'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingTask(null);
                      resetForm();
                    }}
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

export default function TasksPage() {
  return (
    <AuthGuard allowedRoles={['staff', 'admin']}>
      <TasksPageContent />
    </AuthGuard>
  );
}
