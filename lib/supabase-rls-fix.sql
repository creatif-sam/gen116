-- Fix for Infinite Recursion in Users RLS Policy
-- Run this in Supabase SQL Editor to fix the issue

-- First, drop the problematic policies
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Admins can view all users" ON users;

-- Link users table to auth.users using auth_id
-- This assumes you've already added the auth_id column
-- If not, run: ALTER TABLE users ADD COLUMN IF NOT EXISTS auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- New policies that don't cause recursion
-- Users can view their own profile using auth_id
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT 
  USING (auth.uid() = auth_id);

-- Users can view profiles if they're an admin (check via auth metadata or separate admin check)
-- Option 1: Use a function to check role without recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users 
    WHERE auth_id = auth.uid() 
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Now create the admin policy using the function
CREATE POLICY "Admins can view all users" ON users
  FOR SELECT 
  USING (public.is_admin());

-- Users can insert their own profile (for signup)
CREATE POLICY "Users can create own profile" ON users
  FOR INSERT 
  WITH CHECK (auth.uid() = auth_id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE 
  USING (auth.uid() = auth_id);

-- Admins can update any profile
CREATE POLICY "Admins can update any profile" ON users
  FOR UPDATE 
  USING (public.is_admin());

-- Fix requests policies to use auth_id instead of id
DROP POLICY IF EXISTS "Clients can view their own requests" ON requests;
DROP POLICY IF EXISTS "Staff and admins can view all requests" ON requests;
DROP POLICY IF EXISTS "Clients can create requests" ON requests;
DROP POLICY IF EXISTS "Staff and admins can update requests" ON requests;

-- Create function to check if user is staff or admin
CREATE OR REPLACE FUNCTION public.is_staff_or_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users 
    WHERE auth_id = auth.uid() 
    AND role IN ('admin', 'staff')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Get current user's database ID from auth_id
CREATE OR REPLACE FUNCTION public.user_id()
RETURNS UUID AS $$
BEGIN
  RETURN (SELECT id FROM users WHERE auth_id = auth.uid() LIMIT 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- New request policies
CREATE POLICY "Users can view own requests" ON requests
  FOR SELECT 
  USING (
    client_id = public.user_id() 
    OR assigned_to = public.user_id()
    OR public.is_staff_or_admin()
  );

CREATE POLICY "Clients can create requests" ON requests
  FOR INSERT 
  WITH CHECK (client_id = public.user_id());

CREATE POLICY "Staff can update requests" ON requests
  FOR UPDATE 
  USING (public.is_staff_or_admin());

-- Fix attachments policies
DROP POLICY IF EXISTS "Users can view attachments for their requests" ON attachments;

CREATE POLICY "Users can view request attachments" ON attachments
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM requests r
      WHERE r.id = attachments.request_id 
      AND (
        r.client_id = public.user_id()
        OR r.assigned_to = public.user_id()
        OR public.is_staff_or_admin()
      )
    )
  );

CREATE POLICY "Users can upload attachments" ON attachments
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM requests r
      WHERE r.id = attachments.request_id 
      AND (
        r.client_id = public.user_id()
        OR r.assigned_to = public.user_id()
        OR public.is_staff_or_admin()
      )
    )
  );

-- Fix comments policies
DROP POLICY IF EXISTS "Users can view comments for their requests" ON comments;
DROP POLICY IF EXISTS "Users can create comments on accessible requests" ON comments;

CREATE POLICY "Users can view request comments" ON comments
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM requests r
      WHERE r.id = comments.request_id 
      AND (
        r.client_id = public.user_id()
        OR r.assigned_to = public.user_id()
        OR public.is_staff_or_admin()
      )
    )
  );

CREATE POLICY "Users can create comments" ON comments
  FOR INSERT 
  WITH CHECK (
    user_id = public.user_id()
    AND EXISTS (
      SELECT 1 FROM requests r
      WHERE r.id = comments.request_id 
      AND (
        r.client_id = public.user_id()
        OR r.assigned_to = public.user_id()
        OR public.is_staff_or_admin()
      )
    )
  );

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_staff_or_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.user_id() TO authenticated;
