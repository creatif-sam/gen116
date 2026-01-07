import { supabase } from './supabase';

// User API
export const userAPI = {
  // Get user by email
  async getUserByEmail(email: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single();
    
    return { data, error };
  },

  // Create new user
  async createUser(userData: any) {
    const { data, error } = await supabase
      .from('profiles')
      .insert(userData)
      .select()
      .single();
    
    return { data, error };
  },

  // Get all users (admin only)
  async getAllUsers() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  // Get users by role
  async getUsersByRole(role: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', role);
    
    return { data, error };
  },
};

// Request API
export const requestAPI = {
  // Get all requests for a client
  async getClientRequests(clientId: string) {
    const { data, error } = await supabase
      .from('requests')
      .select(`
        *,
        attachments(*),
        comments(*)
      `)
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  // Get all requests (staff/admin)
  async getAllRequests() {
    const { data, error } = await supabase
      .from('requests')
      .select(`
        *,
        client:users!client_id(name, email, company),
        assigned_staff:users!assigned_to(name, email),
        attachments(*),
        comments(*)
      `)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  // Get requests by status
  async getRequestsByStatus(status: string) {
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .eq('status', status);
    
    return { data, error };
  },

  // Create new request
  async createRequest(requestData: any) {
    const { data, error } = await supabase
      .from('requests')
      .insert(requestData)
      .select()
      .single();
    
    return { data, error };
  },

  // Update request
  async updateRequest(requestId: string, updates: any) {
    const { data, error } = await supabase
      .from('requests')
      .update(updates)
      .eq('id', requestId)
      .select()
      .single();
    
    return { data, error };
  },

  // Delete request
  async deleteRequest(requestId: string) {
    const { error } = await supabase
      .from('requests')
      .delete()
      .eq('id', requestId);
    
    return { error };
  },

  // Get request statistics
  async getRequestStats(clientId?: string) {
    let query = supabase
      .from('requests')
      .select('status, priority, count');
    
    if (clientId) {
      query = query.eq('client_id', clientId);
    }
    
    const { data, error } = await query;
    return { data, error };
  },
};

// Attachment API
export const attachmentAPI = {
  // Upload file to Supabase Storage
  async uploadFile(file: File, requestId: string) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${requestId}/${Date.now()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('request-attachments')
      .upload(fileName, file);
    
    if (uploadError) return { data: null, error: uploadError };
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('request-attachments')
      .getPublicUrl(fileName);
    
    // Save attachment metadata to database
    const { data, error } = await supabase
      .from('attachments')
      .insert({
        request_id: requestId,
        name: file.name,
        url: publicUrl,
        type: file.type,
        size: file.size,
      })
      .select()
      .single();
    
    return { data, error };
  },

  // Get attachments for a request
  async getRequestAttachments(requestId: string) {
    const { data, error } = await supabase
      .from('attachments')
      .select('*')
      .eq('request_id', requestId);
    
    return { data, error };
  },

  // Delete attachment
  async deleteAttachment(attachmentId: string, fileUrl: string) {
    // Delete from storage
    const fileName = fileUrl.split('/').pop();
    if (fileName) {
      await supabase.storage
        .from('request-attachments')
        .remove([fileName]);
    }
    
    // Delete from database
    const { error } = await supabase
      .from('attachments')
      .delete()
      .eq('id', attachmentId);
    
    return { error };
  },
};

// Comment API
export const commentAPI = {
  // Get comments for a request
  async getRequestComments(requestId: string) {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('request_id', requestId)
      .order('created_at', { ascending: true });
    
    return { data, error };
  },

  // Add comment to request
  async addComment(commentData: any) {
    const { data, error } = await supabase
      .from('comments')
      .insert(commentData)
      .select()
      .single();
    
    return { data, error };
  },

  // Delete comment
  async deleteComment(commentId: string) {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);
    
    return { error };
  },
};

// Analytics API
export const analyticsAPI = {
  // Get dashboard statistics
  async getDashboardStats(userId?: string, role?: string) {
    const stats: any = {};
    
    // Total requests count
    let requestQuery = supabase.from('requests').select('*', { count: 'exact', head: true });
    if (role === 'client' && userId) {
      requestQuery = requestQuery.eq('client_id', userId);
    }
    const { count: totalRequests } = await requestQuery;
    stats.totalRequests = totalRequests || 0;
    
    // Pending requests
    let pendingQuery = supabase.from('requests').select('*', { count: 'exact', head: true }).eq('status', 'pending');
    if (role === 'client' && userId) {
      pendingQuery = pendingQuery.eq('client_id', userId);
    }
    const { count: pendingCount } = await pendingQuery;
    stats.pending = pendingCount || 0;
    
    // In progress
    let inProgressQuery = supabase.from('requests').select('*', { count: 'exact', head: true }).eq('status', 'in-progress');
    if (role === 'client' && userId) {
      inProgressQuery = inProgressQuery.eq('client_id', userId);
    }
    const { count: inProgressCount } = await inProgressQuery;
    stats.inProgress = inProgressCount || 0;
    
    // Completed
    let completedQuery = supabase.from('requests').select('*', { count: 'exact', head: true }).eq('status', 'completed');
    if (role === 'client' && userId) {
      completedQuery = completedQuery.eq('client_id', userId);
    }
    const { count: completedCount } = await completedQuery;
    stats.completed = completedCount || 0;
    
    // Total clients (admin/staff only)
    if (role === 'admin' || role === 'staff') {
      const { count: clientCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'client');
      stats.totalClients = clientCount || 0;
      
      // Total staff
      const { count: staffCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'staff');
      stats.totalStaff = staffCount || 0;
    }
    
    return stats;
  },
};
