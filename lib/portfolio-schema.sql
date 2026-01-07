-- Portfolio Management Schema with Activity Logging
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT DEFAULT '🚀',
    challenge TEXT,
    solution TEXT,
    overview TEXT,
    duration TEXT,
    year TEXT,
    gradient TEXT DEFAULT 'from-purple-600 to-blue-600',
    tech JSONB DEFAULT '[]'::jsonb,
    features JSONB DEFAULT '[]'::jsonb,
    results JSONB DEFAULT '[]'::jsonb,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

-- Case Studies Table
CREATE TABLE IF NOT EXISTS public.case_studies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    industry TEXT NOT NULL,
    client TEXT,
    icon TEXT DEFAULT '🚀',
    description TEXT NOT NULL,
    overview TEXT NOT NULL,
    duration TEXT,
    year TEXT,
    gradient TEXT DEFAULT 'from-blue-600 to-purple-600',
    challenge JSONB DEFAULT '{}'::jsonb,
    approach JSONB DEFAULT '{}'::jsonb,
    solution JSONB DEFAULT '{}'::jsonb,
    results JSONB DEFAULT '{}'::jsonb,
    technologies JSONB DEFAULT '[]'::jsonb,
    key_learnings JSONB DEFAULT '[]'::jsonb,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

-- Activity Logs Table
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    action TEXT NOT NULL, -- 'create', 'update', 'delete', 'publish', 'unpublish'
    entity_type TEXT NOT NULL, -- 'project', 'case_study', 'user', etc.
    entity_id UUID NOT NULL,
    entity_name TEXT,
    changes JSONB, -- Store before/after values
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio Stats Table (for the overview page)
CREATE TABLE IF NOT EXISTS public.portfolio_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    projects_completed INTEGER DEFAULT 0,
    client_satisfaction INTEGER DEFAULT 0,
    years_experience INTEGER DEFAULT 0,
    happy_clients INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES auth.users(id)
);

-- Insert default stats
INSERT INTO public.portfolio_stats (projects_completed, client_satisfaction, years_experience, happy_clients)
VALUES (150, 95, 12, 50)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON public.case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_published ON public.case_studies(published);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user ON public.activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_entity ON public.activity_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created ON public.activity_logs(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_case_studies_updated_at ON public.case_studies;
CREATE TRIGGER update_case_studies_updated_at
    BEFORE UPDATE ON public.case_studies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_stats ENABLE ROW LEVEL SECURITY;

-- Projects Policies
-- Public can view published projects
CREATE POLICY "Public can view published projects"
    ON public.projects FOR SELECT
    USING (published = true);

-- Admin and staff can view all projects
CREATE POLICY "Admin and staff can view all projects"
    ON public.projects FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.auth_id = auth.uid()
            AND users.role IN ('admin', 'staff')
        )
    );

-- Admin and staff can insert projects
CREATE POLICY "Admin and staff can insert projects"
    ON public.projects FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.auth_id = auth.uid()
            AND users.role IN ('admin', 'staff')
        )
    );

-- Admin and staff can update projects
CREATE POLICY "Admin and staff can update projects"
    ON public.projects FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.auth_id = auth.uid()
            AND users.role IN ('admin', 'staff')
        )
    );

-- Only admin can delete projects
CREATE POLICY "Only admin can delete projects"
    ON public.projects FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.auth_id = auth.uid()
            AND users.role = 'admin'
        )
    );

-- Case Studies Policies
-- Public can view published case studies
CREATE POLICY "Public can view published case studies"
    ON public.case_studies FOR SELECT
    USING (published = true);

-- Admin and staff can view all case studies
CREATE POLICY "Admin and staff can view all case studies"
    ON public.case_studies FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.auth_id = auth.uid()
            AND users.role IN ('admin', 'staff')
        )
    );

-- Admin and staff can insert case studies
CREATE POLICY "Admin and staff can insert case studies"
    ON public.case_studies FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.auth_id = auth.uid()
            AND users.role IN ('admin', 'staff')
        )
    );

-- Admin and staff can update case studies
CREATE POLICY "Admin and staff can update case studies"
    ON public.case_studies FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.auth_id = auth.uid()
            AND users.role IN ('admin', 'staff')
        )
    );

-- Only admin can delete case studies
CREATE POLICY "Only admin can delete case studies"
    ON public.case_studies FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.auth_id = auth.uid()
            AND users.role = 'admin'
        )
    );

-- Activity Logs Policies
-- Only admin can view all activity logs
CREATE POLICY "Admin can view all activity logs"
    ON public.activity_logs FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.auth_id = auth.uid()
            AND users.role = 'admin'
        )
    );

-- Staff can view their own activity logs
CREATE POLICY "Staff can view own activity logs"
    ON public.activity_logs FOR SELECT
    USING (user_id = auth.uid());

-- Admin and staff can insert activity logs
CREATE POLICY "Admin and staff can insert activity logs"
    ON public.activity_logs FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.auth_id = auth.uid()
            AND users.role IN ('admin', 'staff')
        )
    );

-- Portfolio Stats Policies
-- Public can view stats
CREATE POLICY "Public can view portfolio stats"
    ON public.portfolio_stats FOR SELECT
    USING (true);

-- Only admin can update stats
CREATE POLICY "Admin can update portfolio stats"
    ON public.portfolio_stats FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.auth_id = auth.uid()
            AND users.role = 'admin'
        )
    );

-- Function to log activity
CREATE OR REPLACE FUNCTION log_activity(
    p_action TEXT,
    p_entity_type TEXT,
    p_entity_id UUID,
    p_entity_name TEXT DEFAULT NULL,
    p_changes JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_log_id UUID;
BEGIN
    INSERT INTO public.activity_logs (
        user_id,
        action,
        entity_type,
        entity_id,
        entity_name,
        changes
    ) VALUES (
        auth.uid(),
        p_action,
        p_entity_type,
        p_entity_id,
        p_entity_name,
        p_changes
    )
    RETURNING id INTO v_log_id;
    
    RETURN v_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION log_activity TO authenticated;

COMMENT ON TABLE public.projects IS 'Stores portfolio projects with full details';
COMMENT ON TABLE public.case_studies IS 'Stores detailed case studies with metrics and results';
COMMENT ON TABLE public.activity_logs IS 'Tracks all admin and staff activities for audit purposes';
COMMENT ON TABLE public.portfolio_stats IS 'Stores portfolio overview statistics';

-- Set user roles
-- IMPORTANT: Run these AFTER users have signed up through the authentication system

-- Set samuel.creatiftech@gmail.com as admin
UPDATE public.users 
SET role = 'admin', updated_at = NOW()
WHERE email = 'samuel.creatiftech@gmail.com';

-- Set urbrightb@gmail.com as staff
UPDATE public.users 
SET role = 'staff', updated_at = NOW()
WHERE email = 'urbrightb@gmail.com';

-- Verify the role assignments
SELECT id, email, name, role, created_at, auth_id
FROM public.users 
WHERE email IN ('samuel.creatiftech@gmail.com', 'urbrightb@gmail.com')
ORDER BY email;

-- Alternative: If users don't exist yet, this query will show you all current users and their roles
SELECT id, email, name, role, created_at 
FROM public.users 
ORDER BY created_at DESC;

-- Note: If the users table is empty or users haven't signed up yet:
-- 1. Users must first sign up through your app's authentication
-- 2. Then run the UPDATE statements above to change their roles from 'client' to 'admin' or 'staff'
