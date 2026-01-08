# Staff Portal Database Setup Guide

This guide will help you set up the database for the dynamic staff portal.

## 📋 Prerequisites

- Supabase project created and connected
- Access to Supabase SQL Editor
- At least one staff/admin user created

## 🚀 Setup Steps

### Step 1: Run the Migration

If you already have the database set up, run the migration to add the tasks table:

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Open and run `lib/migrate-tasks-table.sql`

This will:
- Create the `tasks` table
- Add necessary indexes
- Set up Row Level Security (RLS) policies
- Add triggers for automatic timestamp updates

### Step 2: Verify Table Creation

Run this query in the SQL Editor:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'tasks';
```

You should see the `tasks` table listed.

### Step 3: Add Sample Data (Optional)

To test the staff portal with sample tasks:

1. First, get your staff profile IDs:
```sql
SELECT id, email, name, role 
FROM profiles 
WHERE role IN ('staff', 'admin');
```

2. Open `lib/seed-staff-data.sql`
3. Replace `NULL` values in the `assigned_to` and `created_by` columns with actual profile IDs
4. Run the modified SQL in Supabase SQL Editor

**OR** Run this automated version:

```sql
-- This will assign all tasks to the first staff member and set creator as first admin
WITH staff_member AS (
  SELECT id FROM profiles WHERE role = 'staff' LIMIT 1
),
admin_member AS (
  SELECT id FROM profiles WHERE role = 'admin' LIMIT 1
)
UPDATE tasks 
SET 
  assigned_to = (SELECT id FROM staff_member),
  created_by = (SELECT id FROM admin_member)
WHERE assigned_to IS NULL;
```

### Step 4: Verify RLS Policies

Check that policies are active:

```sql
SELECT schemaname, tablename, policyname, roles, cmd 
FROM pg_policies 
WHERE tablename = 'tasks';
```

You should see 4 policies:
- Staff and admins can view all tasks (SELECT)
- Staff and admins can create tasks (INSERT)
- Staff and admins can update tasks (UPDATE)
- Staff and admins can delete tasks (DELETE)

## 📊 What's Now Dynamic

### Staff Dashboard (`/dashboard/staff`)
- ✅ Fetches tasks from Supabase `tasks` table
- ✅ Real-time stats calculation (assigned, in-progress, pending, completed)
- ✅ Create new tasks (saves to database)
- ✅ Update task status (updates database)
- ✅ Delete tasks (removes from database)
- ✅ Filtered views (all, pending, in-progress, completed)

### Staff Tasks Page (`/dashboard/staff/tasks`)
- ✅ Card-based task display from database
- ✅ Full CRUD operations
- ✅ Edit task details (updates database)
- ✅ Status dropdown (inline editing)
- ✅ Priority and category management
- ✅ Stats dashboard (live calculated)

### Staff Clients Page (`/dashboard/staff/clients`)
- ✅ Fetches clients from `profiles` table where role='client'
- ✅ Search by name, email, or company
- ✅ Filter by active/inactive status
- ✅ View client details in modal
- ✅ Live stats calculation
- ✅ Contact clients via email

## 🗄️ Database Schema

### Tasks Table Structure

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `title` | VARCHAR(255) | Task title (required) |
| `description` | TEXT | Task description |
| `category` | VARCHAR(100) | Task category (required) |
| `priority` | VARCHAR(20) | low, medium, high, urgent |
| `status` | VARCHAR(20) | pending, in-progress, completed |
| `deadline` | DATE | Due date |
| `assigned_to` | UUID | References profiles(id) |
| `created_by` | UUID | References profiles(id) |
| `created_at` | TIMESTAMP | Auto-generated |
| `updated_at` | TIMESTAMP | Auto-updated |

### Indexes

- `idx_tasks_assigned_to` - Fast lookup by assigned user
- `idx_tasks_status` - Fast filtering by status
- `idx_tasks_created_by` - Fast lookup by creator
- `idx_tasks_deadline` - Fast sorting by deadline
- `idx_tasks_priority` - Fast filtering by priority

## 🔒 Security

All tables have Row Level Security (RLS) enabled:

- **Tasks**: Only staff and admin can view, create, update, and delete
- **Profiles**: Users can only view their own profile
- **Clients**: Staff and admin can view all client profiles

## 🧪 Testing

### Test Task Creation
1. Log in as a staff member
2. Go to `/dashboard/staff`
3. Click "+ Create Task"
4. Fill in the form and submit
5. Verify task appears in the list
6. Check Supabase Table Editor to confirm it's saved

### Test Task Updates
1. Change task status using the dropdown
2. Click Edit button and modify task details
3. Verify changes are reflected immediately
4. Check database to confirm updates

### Test Client Display
1. Go to `/dashboard/staff/clients`
2. Verify all clients with role='client' are shown
3. Test search functionality
4. Test filter buttons (All, Active, Inactive)
5. Click "View Details" to see full client information

## 🐛 Troubleshooting

### No tasks appearing?
- Check if you're logged in as staff/admin user
- Verify RLS policies are enabled: `SELECT * FROM pg_policies WHERE tablename = 'tasks';`
- Check browser console for errors
- Verify your auth token is valid

### Can't create tasks?
- Ensure you have INSERT policy: `Staff and admins can create tasks`
- Check if your profile role is 'staff' or 'admin'
- Verify all required fields are filled

### Clients not loading?
- Ensure you have clients in the `profiles` table with `role = 'client'`
- Check if RLS policies allow staff to read profiles
- Verify Supabase connection is working

## 📈 Next Steps

Consider adding:
- Task assignment to specific staff members
- Task comments and activity log
- Due date reminders
- Task tags/labels
- File attachments for tasks
- Time tracking
- Task templates
- Client-specific task boards

## 💡 Tips

- Use the stats cards to monitor team workload
- Filter tasks by status to focus on what's important
- Set realistic deadlines when creating tasks
- Update task status regularly to keep dashboard accurate
- Use priority levels to indicate urgency
- Add detailed descriptions to help team members understand requirements

## 🔗 Related Files

- `lib/supabase-schema.sql` - Full database schema
- `lib/migrate-tasks-table.sql` - Migration for tasks table only
- `lib/seed-staff-data.sql` - Sample data for testing
- `app/dashboard/staff/page.tsx` - Main staff dashboard
- `app/dashboard/staff/tasks/page.tsx` - Tasks management page
- `app/dashboard/staff/clients/page.tsx` - Client management page

---

**Ready to go! 🎉** Your staff portal is now fully dynamic and connected to Supabase!
