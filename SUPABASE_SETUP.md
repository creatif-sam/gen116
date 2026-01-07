# Gen11 Consult - Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in project details:
   - Name: Gen11 Consult
   - Database Password: (create a strong password)
   - Region: Choose closest to your location
4. Click "Create new project"

## Step 2: Get API Credentials

1. Once your project is created, go to Settings > API
2. Copy your project URL and anon/public key
3. Update `.env.local` file with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://ecplwimbyoujqjnzwjjm.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

## Step 3: Set Up Database Schema

1. In Supabase dashboard, go to SQL Editor
2. Create a new query
3. Copy and paste the contents of `lib/supabase-schema.sql`
4. Run the query to create all tables, indexes, and policies

## Step 4: Create Storage Bucket

1. Go to Storage in Supabase dashboard
2. Click "New bucket"
3. Name it: `request-attachments`
4. Set it to Public
5. Click "Create bucket"

## Step 5: Configure Storage Policies

1. Click on the `request-attachments` bucket
2. Go to Policies tab
3. Add the following policies:

**Upload Policy:**
```sql
CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'request-attachments');
```

**Download Policy:**
```sql
CREATE POLICY "Public can download files"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'request-attachments');
```

## Step 6: Install Dependencies

Run the following command in your project:
```bash
npm install @supabase/supabase-js
```

## Step 7: Test Connection

The dashboard pages will automatically connect to Supabase once you:
1. Set up the environment variables
2. Install the Supabase package
3. Create the database tables

## Database Structure

### Tables Created:
- **users**: Store user information (admin, staff, clients)
- **requests**: Store project requests from clients
- **attachments**: Store file metadata for requests
- **comments**: Store communication between users

### Features:
- Row Level Security (RLS) enabled for data protection
- Automatic timestamps with triggers
- Proper foreign key relationships
- Indexes for performance optimization
- Storage bucket for file uploads

## Usage in Code

The API utilities are located in `lib/api.ts`:
- `userAPI`: User management functions
- `requestAPI`: Request CRUD operations
- `attachmentAPI`: File upload/download
- `commentAPI`: Comments management
- `analyticsAPI`: Dashboard statistics

All dashboard pages are ready to use these APIs once Supabase is configured!
