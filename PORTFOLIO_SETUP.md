# Portfolio Management System - Setup Guide

## Overview
The portfolio management system allows admins and staff to dynamically manage portfolio projects and case studies through a dashboard interface, with complete activity logging for audit trails.

## Features

### 1. **Dynamic Portfolio Content**
- Projects and case studies stored in Supabase database
- Real-time updates without code deployment
- Publish/unpublish functionality
- Rich content editing with support for arrays and JSON data

### 2. **Role-Based Access Control**
- **Admin**: Full access - create, edit, delete, publish, view logs
- **Staff**: Create, edit, publish (cannot delete or view all logs)
- **Public**: View published content only

### 3. **Activity Logging**
- Every action (create, update, delete, publish, unpublish) is logged
- Tracks who did what and when
- Stores before/after values for updates
- Admin-only access to complete audit trail

### 4. **Portfolio Statistics**
- Customizable homepage statistics
- Admin can update: projects completed, client satisfaction, years experience, happy clients

## Setup Instructions

### Step 1: Run Database Schema

1. Open Supabase SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT/sql
2. Copy and paste the contents of `lib/portfolio-schema.sql`
3. Click "Run" to create all tables, policies, and functions

### Step 2: Verify Tables Created

Check that these tables exist in your Supabase database:
- `projects`
- `case_studies`
- `activity_logs`
- `portfolio_stats`

### Step 3: Test the System

1. **Access Portfolio Dashboard**:
   - Navigate to `/dashboard/admin/portfolio`
   - You should see the portfolio overview with stats

2. **Create a Test Project**:
   - Go to `/dashboard/admin/portfolio/projects`
   - Click "+ New Project"
   - Fill in the required fields:
     * Title (required)
     * Slug (required, URL-friendly like "my-project")
     * Category (required)
     * Description (required)
   - Optionally add: Challenge, Solution, Technologies, Features, Results
   - Check "Publish this project" if you want it live immediately
   - Click "Create Project"

3. **Create a Test Case Study**:
   - Go to `/dashboard/admin/portfolio/case-studies`
   - Click "+ New Case Study"
   - Fill in required fields
   - Save and publish

4. **View Activity Logs** (Admin only):
   - Navigate to `/dashboard/admin/activity-logs`
   - You should see logs of all actions performed

5. **View Public Portfolio**:
   - Navigate to `/portfolio`
   - You should see published projects and case studies

## Dashboard Routes

### Admin/Staff Routes:
- `/dashboard/admin/portfolio` - Portfolio overview dashboard
- `/dashboard/admin/portfolio/projects` - Manage all projects
- `/dashboard/admin/portfolio/projects/new` - Create new project
- `/dashboard/admin/portfolio/projects/[id]` - Edit existing project
- `/dashboard/admin/portfolio/case-studies` - Manage all case studies
- `/dashboard/admin/portfolio/case-studies/new` - Create new case study
- `/dashboard/admin/portfolio/case-studies/[id]` - Edit existing case study
- `/dashboard/admin/activity-logs` - View activity logs (Admin only)

### Public Routes:
- `/portfolio` - Portfolio landing page
- `/portfolio/projects` - All published projects
- `/portfolio/projects/[slug]` - Individual project detail
- `/portfolio/case-studies` - All published case studies
- `/portfolio/case-studies/[slug]` - Individual case study detail

## Data Structure

### Projects Table
```typescript
{
  id: UUID,
  slug: string (unique, URL-friendly),
  title: string,
  category: 'web' | 'mobile' | 'ai' | 'design' | 'consulting',
  description: string,
  icon: string (emoji),
  challenge: string,
  solution: string,
  overview: string,
  duration: string,
  year: string,
  gradient: string (Tailwind gradient classes),
  tech: string[] (array of technologies),
  features: string[] (array of features),
  results: string[] (array of results),
  published: boolean,
  created_at: timestamp,
  updated_at: timestamp,
  created_by: UUID,
  updated_by: UUID
}
```

### Case Studies Table
```typescript
{
  id: UUID,
  slug: string (unique),
  title: string,
  industry: string,
  client: string,
  icon: string (emoji),
  description: string,
  overview: string,
  duration: string,
  year: string,
  gradient: string,
  challenge: {
    title: string,
    points: string[]
  },
  approach: {
    title: string,
    description: string,
    phases: Array<{
      title: string,
      duration: string,
      activities: string[]
    }>
  },
  solution: {
    title: string,
    components: Array<{
      name: string,
      description: string,
      features: string[]
    }>
  },
  results: {
    title: string,
    metrics: Array<{
      value: string,
      label: string,
      icon: string
    }>,
    testimonial: {
      quote: string,
      author: string,
      company: string
    }
  },
  technologies: string[],
  key_learnings: string[],
  published: boolean,
  created_at: timestamp,
  updated_at: timestamp,
  created_by: UUID,
  updated_by: UUID
}
```

### Activity Logs Table
```typescript
{
  id: UUID,
  user_id: UUID,
  action: 'create' | 'update' | 'delete' | 'publish' | 'unpublish',
  entity_type: 'project' | 'case_study' | 'portfolio_stats',
  entity_id: UUID,
  entity_name: string,
  changes: {
    before: any,
    after: any
  },
  ip_address: string,
  user_agent: string,
  created_at: timestamp
}
```

## API Functions (lib/portfolio-api.ts)

### Projects
- `getProjects(includeUnpublished)` - Get all projects
- `getProjectBySlug(slug)` - Get single project
- `createProject(data)` - Create new project
- `updateProject(id, data, oldData)` - Update project
- `deleteProject(id, title)` - Delete project (admin only)
- `toggleProjectPublish(id, status, title)` - Publish/unpublish

### Case Studies
- `getCaseStudies(includeUnpublished)` - Get all case studies
- `getCaseStudyBySlug(slug)` - Get single case study
- `createCaseStudy(data)` - Create new case study
- `updateCaseStudy(id, data, oldData)` - Update case study
- `deleteCaseStudy(id, title)` - Delete case study (admin only)
- `toggleCaseStudyPublish(id, status, title)` - Publish/unpublish

### Statistics
- `getPortfolioStats()` - Get portfolio stats
- `updatePortfolioStats(stats)` - Update stats (admin only)

### Activity Logs
- `logActivity(action, entityType, entityId, entityName, changes)` - Log activity
- `getActivityLogs(limit, entityType)` - Get activity logs
- `getActivityLogsByEntity(entityType, entityId)` - Get logs for specific entity

## Tips for Content Management

### Creating Projects
1. Use descriptive, unique slugs (e.g., "healthcare-management-system")
2. Select appropriate category for filtering
3. Add technologies as comma-separated values
4. Add features one per line in the textarea
5. Add results one per line
6. Keep descriptions concise and impactful

### Creating Case Studies
For complex JSON structures (challenge, approach, solution, results):
1. Start by creating the case study with basic info
2. Edit the case study to add complex structures
3. Refer to existing examples in the codebase for JSON format

### Publishing Content
- Drafts are only visible to admins and staff
- Published content appears on public portfolio immediately
- You can unpublish content at any time

### Activity Monitoring
- Check activity logs regularly to monitor team actions
- Use filters to view specific types of activities
- Review changes detail to see what was modified

## Troubleshooting

### Projects Not Showing
1. Check if the project is published
2. Verify RLS policies are correctly applied
3. Check browser console for errors

### Cannot Create/Edit
1. Verify you're logged in as admin or staff
2. Check Supabase connection
3. Verify RLS policies allow your role

### Activity Logs Not Working
1. Only admins can view all logs
2. Staff can view their own logs
3. Check that the `log_activity` function exists in Supabase

## Security Notes

- All routes are protected by AuthGuard and role checks
- RLS policies enforce database-level security
- Activity logs provide complete audit trail
- Only admins can delete content and view all logs
- Staff have limited permissions (no delete, limited log access)

## Future Enhancements

Potential additions:
- Image upload for projects/case studies
- Rich text editor for content
- Categories/tags management
- Analytics dashboard
- Export functionality
- Bulk operations
- Version history
- Comments/notes system
