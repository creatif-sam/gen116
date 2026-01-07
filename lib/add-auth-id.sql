-- Quick fix: Add auth_id column and create index
-- Run this FIRST before the RLS fix

-- Add auth_id column to users table if not exists
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_auth_id ON users(auth_id);

-- Make auth_id unique to prevent duplicate profiles
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_auth_id_unique ON users(auth_id);
