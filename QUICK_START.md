# Quick Start: Test Authentication

## Valid Test Credentials

Use these email formats for testing (they work with Supabase Auth):

### Admin Account
```
Email: admin@gen11consult.com
Password: admin123456
Role: admin
```

### Staff Account
```
Email: staff@gen11consult.com
Password: staff123456
Role: staff
```

### Client Account
```
Email: client@gen11consult.com
Password: client123456
Role: client
```

## Using Your Own Email

You can also use your real email address:
- Gmail: `yourname@gmail.com`
- Outlook: `yourname@outlook.com`
- Any other real domain

## ⚠️ Blocked Email Domains

Supabase Auth blocks these test domains:
- ❌ `@example.com`
- ❌ `@test.com`
- ❌ `@localhost`
- ❌ `@domain.local`

## Quick Test Steps

1. **Sign Up**: http://localhost:3000/dashboard/signup
   - Use one of the test emails above
   - Or use your real email
   - Choose your role (client/staff/admin)

2. **Login**: http://localhost:3000/dashboard
   - Enter the same email and password
   - You'll be redirected to your dashboard

3. **Test Pages**:
   - Auth Test: http://localhost:3000/auth-test
   - Diagnostics: http://localhost:3000/diagnostics
   - DB Test: http://localhost:3000/test-connection

## Troubleshooting

### "Email address is invalid"
✅ **Solution**: Use a real email domain like `@gmail.com` instead of `@example.com`

### "Invalid login credentials"
✅ **Solution**: Make sure you've signed up first, and the password matches

### "User not found in database"
✅ **Solution**: 
1. Run `lib/add-auth-id.sql` in Supabase
2. Run `lib/supabase-rls-fix.sql` in Supabase
3. Try signing up again

### "Infinite recursion detected"
✅ **Solution**: Run the RLS fix scripts in order:
1. `lib/add-auth-id.sql`
2. `lib/supabase-rls-fix.sql`

## Email Confirmation

By default, Supabase requires email confirmation. For development:

1. Go to Supabase Dashboard → Authentication → Providers
2. Click on **Email** provider
3. Toggle OFF "Enable email confirmations"
4. Save

Now you can test without needing to check email!

## Password Requirements

- Minimum 6 characters
- Can be changed in Supabase Auth settings

## Next Steps

Once you've successfully logged in:
- **Client**: Submit and track requests
- **Staff**: Manage client requests  
- **Admin**: View analytics and system health

Happy testing! 🚀
