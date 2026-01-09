// Portfolio API utilities
import { supabase } from './supabase';

// Activity Logging
export async function logActivity(
  action: 'create' | 'update' | 'delete' | 'publish' | 'unpublish',
  entityType: 'project' | 'case_study' | 'portfolio_stats',
  entityId: string,
  entityName?: string,
  changes?: any
) {
  try {
    const { data, error } = await supabase
      .from('activity_logs')
      .insert({
        action,
        entity_type: entityType,
        entity_id: entityId,
        entity_name: entityName,
        changes: changes || null,
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error logging activity:', error);
    return { data: null, error };
  }
}

// Projects CRUD
export async function getProjects(includeUnpublished = false) {
  try {
    let query = supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (!includeUnpublished) {
      query = query.eq('published', true);
    }

    const { data, error } = await query;
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}

export async function createProject(projectData: any) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('projects')
      .insert({
        ...projectData,
        created_by: user?.id,
        updated_by: user?.id,
      })
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await logActivity('create', 'project', data.id, projectData.title);

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}

export async function updateProject(id: string, projectData: any, oldData?: any) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('projects')
      .update({
        ...projectData,
        updated_by: user?.id,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Log activity with changes
    const changes = oldData ? {
      before: oldData,
      after: projectData,
    } : null;
    
    await logActivity('update', 'project', data.id, data.title, changes);

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}

export async function deleteProject(id: string, title: string) {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;

    // Log activity
    await logActivity('delete', 'project', id, title);

    return { error: null };
  } catch (error: any) {
    return { error };
  }
}

export async function toggleProjectPublish(id: string, currentStatus: boolean, title: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('projects')
      .update({
        published: !currentStatus,
        updated_by: user?.id,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await logActivity(
      currentStatus ? 'unpublish' : 'publish',
      'project',
      id,
      title
    );

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}

// Case Studies CRUD
export async function getCaseStudies(includeUnpublished = false) {
  try {
    let query = supabase
      .from('case_studies')
      .select('*')
      .order('created_at', { ascending: false });

    if (!includeUnpublished) {
      query = query.eq('published', true);
    }

    const { data, error } = await query;
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}

export async function getCaseStudyBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}

export async function createCaseStudy(caseStudyData: any) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('case_studies')
      .insert({
        ...caseStudyData,
        created_by: user?.id,
        updated_by: user?.id,
      })
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await logActivity('create', 'case_study', data.id, caseStudyData.title);

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}

export async function updateCaseStudy(id: string, caseStudyData: any, oldData?: any) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('case_studies')
      .update({
        ...caseStudyData,
        updated_by: user?.id,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Log activity with changes
    const changes = oldData ? {
      before: oldData,
      after: caseStudyData,
    } : null;
    
    await logActivity('update', 'case_study', data.id, data.title, changes);

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}

export async function deleteCaseStudy(id: string, title: string) {
  try {
    const { error } = await supabase
      .from('case_studies')
      .delete()
      .eq('id', id);

    if (error) throw error;

    // Log activity
    await logActivity('delete', 'case_study', id, title);

    return { error: null };
  } catch (error: any) {
    return { error };
  }
}

export async function toggleCaseStudyPublish(id: string, currentStatus: boolean, title: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('case_studies')
      .update({
        published: !currentStatus,
        updated_by: user?.id,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await logActivity(
      currentStatus ? 'unpublish' : 'publish',
      'case_study',
      id,
      title
    );

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}

// Portfolio Stats
export async function getPortfolioStats() {
  try {
    const { data, error } = await supabase
      .from('portfolio_stats')
      .select('*')
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}

export async function updatePortfolioStats(stats: any) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('portfolio_stats')
      .update({
        ...stats,
        updated_by: user?.id,
      })
      .eq('id', (await getPortfolioStats()).data?.id)
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await logActivity('update', 'portfolio_stats', data.id, 'Portfolio Statistics');

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}

// Activity Logs
export async function getActivityLogs(limit = 50, entityType?: string) {
  try {
    let query = supabase
      .from('activity_logs')
      .select(`
        *,
        users:user_id (
          full_name,
          email,
          role
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (entityType) {
      query = query.eq('entity_type', entityType);
    }

    const { data, error } = await query;
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}

export async function getActivityLogsByEntity(entityType: string, entityId: string) {
  try {
    const { data, error } = await supabase
      .from('activity_logs')
      .select(`
        *,
        users:user_id (
          full_name,
          email,
          role
        )
      `)
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}

// Request Management Functions
export async function getClientRequests(clientId: string, limit = 10) {
  try {
    // First get the profile ID from the auth ID
    let { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('auth_id', clientId)
      .single();

    // If profile doesn't exist, try to create it
    if (profileError || !profile) {
      console.log('Profile not found for auth ID:', clientId, 'Attempting to create profile...');

      // Get user info from auth
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (authUser) {
        // Create the missing profile
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            auth_id: clientId,
            email: authUser.email || '',
            name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'User',
            role: authUser.user_metadata?.role || 'client',
          })
          .select('id')
          .single();

        if (!createError && newProfile) {
          console.log('Profile created successfully:', newProfile.id);
          profile = newProfile;
        } else {
          console.error('Failed to create profile:', createError);
          return { data: [], error: null };
        }
      } else {
        console.error('No authenticated user found');
        return { data: [], error: null };
      }
    }

    const { data, error } = await supabase
      .from('requests')
      .select(`
        *,
        assigned_user:assigned_to (
          full_name,
          email
        )
      `)
      .eq('client_id', profile.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}

export async function getClientStats(clientId: string) {
  try {
    // First get the profile ID from the auth ID
    let { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('auth_id', clientId)
      .single();

    // If profile doesn't exist, try to create it
    if (profileError || !profile) {
      console.log('Profile not found for auth ID:', clientId, 'Attempting to create profile...');

      // Get user info from auth
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (authUser) {
        // Create the missing profile
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            auth_id: clientId,
            email: authUser.email || '',
            name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'User',
            role: authUser.user_metadata?.role || 'client',
          })
          .select('id')
          .single();

        if (!createError && newProfile) {
          console.log('Profile created successfully:', newProfile.id);
          profile = newProfile;
        } else {
          console.error('Failed to create profile:', createError);
          return { data: { total: 0, pending: 0, 'in-progress': 0, completed: 0, rejected: 0 }, error: null };
        }
      } else {
        console.error('No authenticated user found');
        return { data: { total: 0, pending: 0, 'in-progress': 0, completed: 0, rejected: 0 }, error: null };
      }
    }

    const { data, error } = await supabase
      .from('requests')
      .select('status')
      .eq('client_id', profile.id);

    if (error) throw error;

    // Count requests by status
    const stats = {
      total: data.length,
      pending: data.filter(r => r.status === 'pending').length,
      'in-progress': data.filter(r => r.status === 'in-progress').length,
      completed: data.filter(r => r.status === 'completed').length,
      rejected: data.filter(r => r.status === 'rejected').length,
    };

    return { data: stats, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}

export async function createRequest(requestData: {
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  budget?: string;
  deadline?: string;
}) {
  try {
    // Get the current authenticated user to verify authentication
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) throw new Error('User not authenticated');

    // Get the profile for the current user to use the profile ID as client_id
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('auth_id', authUser.id)
      .single();

    if (profileError || !profile) {
      throw new Error('User profile not found');
    }

    const { data, error } = await supabase
      .from('requests')
      .insert({
        ...requestData,
        client_id: profile.id, // Use profile ID, not auth ID
      })
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await logActivity('create', 'request', data.id, requestData.title);

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}

export async function updateRequestStatus(requestId: string, status: 'pending' | 'in-progress' | 'completed' | 'rejected', progress?: number) {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    const updateData: any = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (progress !== undefined) {
      updateData.progress = progress;
    }

    const { data, error } = await supabase
      .from('requests')
      .update(updateData)
      .eq('id', requestId)
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await logActivity('update', 'request', requestId, `Status: ${status}`);

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}
