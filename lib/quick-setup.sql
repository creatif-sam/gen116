-- Quick Setup: Run this entire script in Supabase SQL Editor
-- This will set up everything you need for the staff portal

-- ============================================
-- PART 1: Create Tasks Table
-- ============================================

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

-- ============================================
-- PART 2: Create Indexes
-- ============================================

CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_created_by ON tasks(created_by);
CREATE INDEX IF NOT EXISTS idx_tasks_deadline ON tasks(deadline);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);

-- ============================================
-- PART 3: Add Updated At Trigger
-- ============================================

CREATE TRIGGER update_tasks_updated_at 
  BEFORE UPDATE ON tasks
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- PART 4: Enable RLS
-- ============================================

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PART 5: Create RLS Policies
-- ============================================

-- View policy
DROP POLICY IF EXISTS "Staff and admins can view all tasks" ON tasks;
CREATE POLICY "Staff and admins can view all tasks" ON tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.auth_id::text = auth.uid()::text 
      AND role IN ('admin', 'staff')
    )
  );

-- Insert policy
DROP POLICY IF EXISTS "Staff and admins can create tasks" ON tasks;
CREATE POLICY "Staff and admins can create tasks" ON tasks
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.auth_id::text = auth.uid()::text 
      AND role IN ('admin', 'staff')
    )
  );

-- Update policy
DROP POLICY IF EXISTS "Staff and admins can update tasks" ON tasks;
CREATE POLICY "Staff and admins can update tasks" ON tasks
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.auth_id::text = auth.uid()::text 
      AND role IN ('admin', 'staff')
    )
  );

-- Delete policy
DROP POLICY IF EXISTS "Staff and admins can delete tasks" ON tasks;
CREATE POLICY "Staff and admins can delete tasks" ON tasks
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.auth_id::text = auth.uid()::text 
      AND role IN ('admin', 'staff')
    )
  );

-- ============================================
-- PART 6: Add Sample Tasks (Optional)
-- ============================================

-- First, let's create a few sample tasks
-- These will be assigned to the first staff member found

DO $$
DECLARE
  staff_id UUID;
  admin_id UUID;
BEGIN
  -- Get first staff member
  SELECT id INTO staff_id FROM profiles WHERE role = 'staff' LIMIT 1;
  
  -- Get first admin
  SELECT id INTO admin_id FROM profiles WHERE role = 'admin' LIMIT 1;
  
  -- Only insert if we found at least one staff/admin
  IF staff_id IS NOT NULL OR admin_id IS NOT NULL THEN
    INSERT INTO tasks (title, description, category, priority, status, deadline, assigned_to, created_by) VALUES
      ('Website Redesign', 'Complete homepage redesign with new branding', 'Web Development', 'high', 'in-progress', '2026-01-20', staff_id, admin_id),
      ('Mobile App Development', 'Build iOS app for client portal', 'Software Development', 'urgent', 'pending', '2026-01-25', staff_id, admin_id),
      ('Logo Design', 'Create brand identity package', 'Graphic Design', 'medium', 'in-progress', '2026-01-15', staff_id, admin_id),
      ('Data Analysis Report', 'Analyze Q4 data', 'Data Analytics', 'high', 'pending', '2026-01-18', staff_id, admin_id),
      ('API Integration', 'Integrate payment gateway', 'Software Development', 'medium', 'completed', '2026-01-10', staff_id, admin_id),
      ('SEO Optimization', 'Improve site ranking', 'Marketing', 'low', 'pending', '2026-02-01', staff_id, admin_id);
    
    RAISE NOTICE 'Sample tasks created successfully!';
  ELSE
    RAISE NOTICE 'No staff or admin users found. Create a staff/admin user first.';
  END IF;
END $$;

-- ============================================
-- PART 7: Verify Setup
-- ============================================

-- Check table exists
SELECT 'Tasks table' as component, 
       CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'tasks') 
       THEN '✓ Created' ELSE '✗ Missing' END as status;

-- Check RLS is enabled
SELECT 'RLS on tasks' as component,
       CASE WHEN relrowsecurity THEN '✓ Enabled' ELSE '✗ Disabled' END as status
FROM pg_class WHERE relname = 'tasks';

-- Check policies
SELECT 'RLS Policies' as component, COUNT(*)::text || ' policies created' as status
FROM pg_policies WHERE tablename = 'tasks';

-- Check indexes
SELECT 'Indexes' as component, COUNT(*)::text || ' indexes created' as status
FROM pg_indexes WHERE tablename = 'tasks';

-- Count tasks
SELECT 'Sample Tasks' as component, COUNT(*)::text || ' tasks in database' as status
FROM tasks;

-- Show all tasks
SELECT 
  title,
  category,
  priority,
  status,
  deadline,
  created_at
FROM tasks
ORDER BY created_at DESC;

-- Done!
SELECT '🎉 Setup Complete!' as message;
SELECT 'You can now use the staff portal at /dashboard/staff' as next_step;
