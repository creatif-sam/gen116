-- Sample data for Staff Portal
-- Run this after running supabase-schema.sql

-- Note: Replace the UUID values with actual auth_id values from your auth.users table
-- You can find these by running: SELECT id, email FROM auth.users;

-- Sample Tasks Data
-- These tasks will be created for staff members to manage
INSERT INTO tasks (id, title, description, category, priority, status, deadline, assigned_to, created_by) VALUES
  (
    uuid_generate_v4(),
    'Website Redesign',
    'Complete homepage redesign with new branding guidelines. Include responsive design and accessibility improvements.',
    'Web Development',
    'high',
    'in-progress',
    '2026-01-20',
    NULL, -- Replace with actual profile.id of staff member
    NULL  -- Replace with actual profile.id of creator
  ),
  (
    uuid_generate_v4(),
    'Mobile App Development',
    'Build iOS and Android app for client portal. Implement push notifications and offline mode.',
    'Software Development',
    'urgent',
    'pending',
    '2026-01-25',
    NULL,
    NULL
  ),
  (
    uuid_generate_v4(),
    'Logo Design',
    'Create brand identity package including logo variations, color palette, and typography guidelines.',
    'Graphic Design',
    'medium',
    'in-progress',
    '2026-01-15',
    NULL,
    NULL
  ),
  (
    uuid_generate_v4(),
    'Data Analysis Report',
    'Analyze Q4 2025 performance data and create comprehensive report with visualizations.',
    'Data Analytics',
    'high',
    'pending',
    '2026-01-18',
    NULL,
    NULL
  ),
  (
    uuid_generate_v4(),
    'API Integration',
    'Integrate third-party payment gateway with existing system. Implement error handling and logging.',
    'Software Development',
    'medium',
    'completed',
    '2026-01-10',
    NULL,
    NULL
  ),
  (
    uuid_generate_v4(),
    'SEO Optimization',
    'Improve site ranking through on-page optimization, meta tags, and content improvements.',
    'Marketing',
    'low',
    'pending',
    '2026-02-01',
    NULL,
    NULL
  ),
  (
    uuid_generate_v4(),
    'Database Migration',
    'Migrate legacy database to PostgreSQL. Ensure data integrity and minimize downtime.',
    'Database Administration',
    'urgent',
    'in-progress',
    '2026-01-12',
    NULL,
    NULL
  ),
  (
    uuid_generate_v4(),
    'Security Audit',
    'Conduct comprehensive security audit of all systems. Provide remediation recommendations.',
    'Security',
    'high',
    'pending',
    '2026-01-22',
    NULL,
    NULL
  ),
  (
    uuid_generate_v4(),
    'Client Training Session',
    'Prepare and deliver training session for new client onboarding. Create documentation.',
    'Training',
    'medium',
    'pending',
    '2026-01-16',
    NULL,
    NULL
  ),
  (
    uuid_generate_v4(),
    'Performance Testing',
    'Load test production environment and optimize bottlenecks. Document findings.',
    'QA Testing',
    'high',
    'in-progress',
    '2026-01-19',
    NULL,
    NULL
  );

-- Update tasks with actual profile IDs after staff members are created
-- Run these queries manually replacing the email addresses with your actual staff emails:
-- 
-- UPDATE tasks SET 
--   assigned_to = (SELECT id FROM profiles WHERE email = 'staff@example.com' LIMIT 1),
--   created_by = (SELECT id FROM profiles WHERE email = 'admin@example.com' LIMIT 1)
-- WHERE assigned_to IS NULL;

-- Verify tasks were created
-- SELECT COUNT(*) as task_count FROM tasks;
-- SELECT * FROM tasks ORDER BY created_at DESC;
