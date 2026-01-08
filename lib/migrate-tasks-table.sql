-- Migration: Add Tasks Table to Existing Database
-- Run this file if you already have the database set up and just need to add the tasks table
-- Date: January 8, 2026

-- Create Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  priority VARCHAR(20) NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed')),
  deadline DATE,
  assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_created_by ON tasks(created_by);
CREATE INDEX IF NOT EXISTS idx_tasks_deadline ON tasks(deadline);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);

-- Add trigger for updated_at
CREATE TRIGGER update_tasks_updated_at 
  BEFORE UPDATE ON tasks
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Tasks Table

-- Staff and admins can view all tasks
CREATE POLICY "Staff and admins can view all tasks" ON tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.auth_id::text = auth.uid()::text 
      AND role IN ('admin', 'staff')
    )
  );

-- Staff and admins can create tasks
CREATE POLICY "Staff and admins can create tasks" ON tasks
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.auth_id::text = auth.uid()::text 
      AND role IN ('admin', 'staff')
    )
  );

-- Staff and admins can update tasks
CREATE POLICY "Staff and admins can update tasks" ON tasks
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.auth_id::text = auth.uid()::text 
      AND role IN ('admin', 'staff')
    )
  );

-- Staff and admins can delete tasks
CREATE POLICY "Staff and admins can delete tasks" ON tasks
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.auth_id::text = auth.uid()::text 
      AND role IN ('admin', 'staff')
    )
  );

-- Grant permissions (if needed)
GRANT ALL ON tasks TO authenticated;
GRANT ALL ON tasks TO service_role;

-- Verify the migration
SELECT 'Tasks table created successfully!' as status;
SELECT COUNT(*) as task_count FROM tasks;
