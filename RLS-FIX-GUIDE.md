# Fix: Infinite Recursion in RLS Policies

## Problem
The error "infinite recursion detected in policy for relation 'users'" occurs when a Row Level Security (RLS) policy on the `users` table queries the same `users` table to check permissions.

## Root Cause
The original policy:
```sql
CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id::text = auth.uid()::text AND role = 'admin'
    )
  );
```

This creates infinite recursion because:
1. You try to SELECT from `users`
2. The policy checks if you're admin by querying `users`
3. That query triggers the policy again → infinite loop

## Solution Steps

### Step 1: Add auth_id column (if not exists)

Run in Supabase SQL Editor:

```sql
-- File: lib/add-auth-id.sql
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_users_auth_id ON users(auth_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_auth_id_unique ON users(auth_id);
```

### Step 2: Fix RLS Policies

Run the complete fix in Supabase SQL Editor:

```sql
-- File: lib/supabase-rls-fix.sql
-- (Copy the entire content from that file)
```

This creates:
- Helper functions that break the recursion (`auth.is_admin()`, `auth.user_id()`)
- New policies that use `auth_id` instead of querying `users` recursively
- Proper permissions for all tables

### Step 3: Update existing users (if any)

If you have existing test users without `auth_id`, you'll need to either:

**Option A: Delete and recreate**
```sql
DELETE FROM users;
-- Then signup again through the app
```

**Option B: Manually link (if you know the auth IDs)**
```sql
-- Get auth user IDs
SELECT id, email FROM auth.users;

-- Update users with their auth_id
UPDATE users SET auth_id = 'auth-user-id-here' WHERE email = 'user@example.com';
```

### Step 4: Verify the fix

1. Go to http://localhost:3000/diagnostics
2. Click "Test Signup" - should work without recursion error
3. Check Supabase logs for any policy errors

## How It Works Now

### Before (Recursive):
```
User tries to read users table
  ↓
Policy checks: "Is user admin?"
  ↓
Queries users table to check role
  ↓
Policy triggers again... ♾️
```

### After (No Recursion):
```
User tries to read users table
  ↓
Policy checks: auth.is_admin()
  ↓
Function uses auth.uid() directly
  ↓
Returns result ✅
```

## Key Changes

1. **auth_id column**: Links database users to Supabase Auth users
2. **Helper functions**: `auth.is_admin()`, `auth.is_staff_or_admin()`, `auth.user_id()`
3. **SECURITY DEFINER**: Functions run with elevated privileges without recursion
4. **Direct auth.uid()**: Policies check `auth.uid() = auth_id` directly

## Testing

After applying the fix:

```javascript
// Should work now
const { data, error } = await supabase
  .from('users')
  .select('*');

console.log({ data, error }); // Should return users without recursion error
```

## Troubleshooting

### "function auth.is_admin() does not exist"
- Make sure you ran the entire `supabase-rls-fix.sql` file
- Check that functions are in the `auth` schema

### "permission denied for schema auth"
- Functions need `SECURITY DEFINER`
- Run the GRANT commands at the end of the fix script

### Still getting recursion
- Drop ALL old policies first: `DROP POLICY IF EXISTS ...`
- Clear browser cache and reload
- Check Supabase logs for which policy is causing it

## Files to Run (in order)

1. `lib/add-auth-id.sql` - Adds the auth_id column
2. `lib/supabase-rls-fix.sql` - Fixes all RLS policies
3. Test signup at http://localhost:3000/dashboard/signup

## Alternative: Disable RLS (NOT RECOMMENDED for production)

For development testing only:
```sql
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE attachments DISABLE ROW LEVEL SECURITY;
ALTER TABLE comments DISABLE ROW LEVEL SECURITY;
```

⚠️ This removes all security! Only use for local testing.
