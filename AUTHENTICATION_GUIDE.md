# Authentication Setup Guide

## Overview
Gen11 Consult dashboard now uses **Supabase Auth** for secure user authentication with role-based access control.

## Features Implemented

### 1. **Supabase Authentication Integration**
- Email/password sign up and login
- Secure session management
- Auto-refresh tokens
- Protected routes with role-based guards

### 2. **User Roles**
- **Client**: Submit and track service requests
- **Staff**: Manage client requests, update progress
- **Admin**: Full system access, analytics, user management

### 3. **Protected Pages**
All dashboard pages are protected with `AuthGuard`:
- `/dashboard/client` - Client role only
- `/dashboard/staff` - Staff and Admin roles
- `/dashboard/admin` - Admin role only

## Setup Instructions

### Step 1: Enable Email Auth in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `ecplwimbyoujqjnzwjjm`
3. Navigate to **Authentication** → **Providers**
4. Enable **Email** provider
5. Configure settings:
   - ✅ Enable Email provider
   - ✅ Confirm email: OFF (for development) or ON (for production)
   - ✅ Secure email change: ON (recommended)

**⚠️ Important**: Supabase blocks common test email domains like:
- `@example.com`, `@test.com`, `@localhost`
- For testing, use real email domains like `@gmail.com`, `@outlook.com`
- Or configure a custom SMTP server in Authentication → Email Auth → SMTP Settings

### Step 2: Configure Email Templates (Optional)

Navigate to **Authentication** → **Email Templates** to customize:
- Confirmation email
- Magic Link email
- Password Reset email

### Step 3: Run Database Schema

The database schema is ready in `lib/supabase-schema.sql`. To add auth integration:

1. Go to Supabase Dashboard → **SQL Editor**
2. Click **New Query**
3. Paste and run this additional migration:

```sql
-- Add auth_id column to users table (if not exists)
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_auth_id ON users(auth_id);

-- Function to auto-create user profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (auth_id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'New User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'client')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Step 4: Test Authentication Flow

1. **Sign Up**
   - Navigate to: http://localhost:3000/dashboard/signup
   - Fill in: Name, Email, Password, Select Role
   - Click "Create Account"
   - You'll be redirected to your role-specific dashboard

2. **Login**
   - Navigate to: http://localhost:3000/dashboard
   - Enter your email and password
   - Click "Sign In"
   - Redirected to your dashboard

3. **Logout**
   - Click "Logout" in the navbar
   - Session is cleared
   - Redirected to login page

## Authentication Flow

```
1. User visits /dashboard/signup
   ↓
2. Fills form and submits
   ↓
3. AuthContext.signup() called
   ↓
4. Supabase Auth creates user account
   ↓
5. User profile created in database (via trigger or API)
   ↓
6. User automatically logged in
   ↓
7. Redirected to /dashboard/{role}
   ↓
8. AuthGuard checks authentication & role
   ↓
9. Dashboard content rendered
```

## File Structure

### Core Authentication Files
- `app/contexts/AuthContext.tsx` - Auth state management, login/signup/logout
- `app/components/AuthGuard.tsx` - Protected route wrapper with role checks
- `lib/supabase.ts` - Supabase client configuration
- `lib/api.ts` - Database API functions

### Authentication Pages
- `app/dashboard/page.tsx` - Login page
- `app/dashboard/signup/page.tsx` - Registration page
- `app/dashboard/redirect/page.tsx` - Auto-redirect helper

### Protected Pages
- `app/dashboard/client/page.tsx` - Client dashboard (protected)
- `app/dashboard/staff/page.tsx` - Staff dashboard (protected)
- `app/dashboard/admin/page.tsx` - Admin dashboard (protected)

## Environment Variables

Ensure these are set in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ecplwimbyoujqjnzwjjm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Security Features

### Row Level Security (RLS)
All tables have RLS policies:

**Users Table**
- Users can read their own profile
- Admins can read all profiles
- Users can update their own profile

**Requests Table**
- Clients see only their requests
- Staff see assigned requests
- Admins see all requests

**Comments & Attachments**
- Linked to request permissions

### Password Requirements
- Minimum 6 characters (enforced by Supabase)
- Can be customized in Supabase Auth settings

### Session Management
- JWT-based authentication
- Auto-refresh on expiry
- Secure HttpOnly cookies (when configured)

## Testing Credentials

For development testing, create accounts with these roles:

```
Admin Account:
Email: admin@gen11consult.com
Password: admin123
Role: admin

Staff Account:
Email: staff@gen11consult.com  
Password: staff123
Role: staff

Client Account:
Email: client@gen11consult.com
Password: client123
Role: client
```

## Troubleshooting

### "User not found" error
- Check that the user exists in both `auth.users` and `public.users` tables
- Run the trigger migration above to auto-create profiles

### "Invalid credentials" error
- Verify email and password are correct
- Check Supabase Auth logs in dashboard

### Redirect loop
- Clear browser cache and cookies
- Check that AuthGuard has correct role permissions
- Verify user role in database matches expected role

### Session not persisting
- Check browser allows cookies
- Verify Supabase URL and anon key are correct
- Check Network tab for auth API calls

## Next Steps

1. **Enable Email Confirmation** - For production, enable email confirmation
2. **Add Password Reset** - Implement forgot password flow
3. **Social Auth** - Add Google/GitHub OAuth providers
4. **Two-Factor Auth** - Enable 2FA for enhanced security
5. **Rate Limiting** - Configure rate limits in Supabase

## API Reference

### AuthContext Hooks

```typescript
const { user, session, login, signup, logout, isAuthenticated, loading } = useAuth();

// Login
const result = await login(email, password);
if (result.success) { /* handle success */ }

// Signup
const result = await signup(email, password, name, role);
if (result.success) { /* handle success */ }

// Logout
await logout();

// Check auth status
if (isAuthenticated) { /* user is logged in */ }
```

### AuthGuard Usage

```typescript
// Protect entire page
export default function ProtectedPage() {
  return (
    <AuthGuard allowedRoles={['admin', 'staff']}>
      <YourContent />
    </AuthGuard>
  );
}
```

## Support

For issues or questions:
- Check Supabase Dashboard logs
- Review browser console for errors
- Verify environment variables are set
- Test database connection at `/test-connection`
