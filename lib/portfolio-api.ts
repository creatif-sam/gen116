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
