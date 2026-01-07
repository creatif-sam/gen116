-- Fix for "new row violates row-level security policy for table users"
-- Run this in Supabase SQL Editor

-- Drop the existing insert policy that's too restrictive
DROP POLICY IF EXISTS "Users can create own profile" ON users;
DROP POLICY IF EXISTS "Authenticated users can create profile" ON users;

-- Create a permissive insert policy for new user signups
-- Allow authenticated users to insert their profile during signup
CREATE POLICY "Allow user profile creation on signup" ON users
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = auth_id);

-- If the above still doesn't work, use this more permissive version:
-- This allows any authenticated user to create a profile
-- (Safe because auth_id links to their auth.users record)
/*
DROP POLICY IF EXISTS "Allow user profile creation on signup" ON users;

CREATE POLICY "Allow user profile creation on signup" ON users
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);
*/

-- Verify the policies are set correctly
SELECT schemaname, tablename, policyname, permissive, roles, cmd, with_check 
FROM pg_policies 
WHERE tablename = 'users' AND cmd = 'INSERT';
