-- Gen11 Consult Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles Table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'staff', 'client')),
  avatar TEXT,
  company VARCHAR(255),
  phone VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Requests Table
CREATE TABLE requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  priority VARCHAR(20) NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed', 'rejected')),
  budget VARCHAR(100),
  deadline DATE,
  assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attachments Table
CREATE TABLE attachments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  type VARCHAR(100) NOT NULL,
  size BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comments Table
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  user_name VARCHAR(255) NOT NULL,
  user_role VARCHAR(20) NOT NULL CHECK (user_role IN ('admin', 'staff', 'client')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks Table (for staff task management)
CREATE TABLE tasks (
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
CREATE INDEX idx_requests_client_id ON requests(client_id);
CREATE INDEX idx_requests_assigned_to ON requests(assigned_to);
CREATE INDEX idx_requests_status ON requests(status);
CREATE INDEX idx_attachments_request_id ON attachments(request_id);
CREATE INDEX idx_comments_request_id ON comments(request_id);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_created_by ON tasks(created_by);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert only if profile doesn't already exist
  INSERT INTO public.profiles (auth_id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'client')
  )
  ON CONFLICT (auth_id) DO NOTHING;
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Log error but don't fail the auth user creation
    RAISE WARNING 'Could not create profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile when auth user is created
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_requests_updated_at BEFORE UPDATE ON requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Profiles policies (simplified to avoid recursion)
CREATE POLICY "Allow users to view and manage their own data" ON profiles
  FOR ALL USING (auth.uid()::text = auth_id::text);

-- Requests policies
CREATE POLICY "Clients can view their own requests" ON requests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = requests.client_id 
      AND profiles.auth_id::text = auth.uid()::text
    )
  );

CREATE POLICY "Staff and admins can view all requests" ON requests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.auth_id::text = auth.uid()::text 
      AND role IN ('admin', 'staff')
    )
  );

CREATE POLICY "Clients can create requests" ON requests
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = requests.client_id 
      AND profiles.auth_id::text = auth.uid()::text
    )
  );

CREATE POLICY "Staff and admins can update requests" ON requests
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.auth_id::text = auth.uid()::text 
      AND role IN ('admin', 'staff')
    )
  );

-- Attachments policies
CREATE POLICY "Users can view attachments for their requests" ON attachments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM requests 
      JOIN profiles ON profiles.id = requests.client_id
      WHERE requests.id = attachments.request_id 
      AND (
        profiles.auth_id::text = auth.uid()::text 
        OR EXISTS (
          SELECT 1 FROM profiles p2
          WHERE p2.id = requests.assigned_to
          AND p2.auth_id::text = auth.uid()::text
        )
        OR EXISTS (
          SELECT 1 FROM profiles p3
          WHERE p3.auth_id::text = auth.uid()::text 
          AND p3.role = 'admin'
        )
      )
    )
  );

-- Comments policies
CREATE POLICY "Users can view comments for their requests" ON comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM requests 
      JOIN profiles ON profiles.id = requests.client_id
      WHERE requests.id = comments.request_id 
      AND (
        profiles.auth_id::text = auth.uid()::text 
        OR EXISTS (
          SELECT 1 FROM profiles p2
          WHERE p2.id = requests.assigned_to
          AND p2.auth_id::text = auth.uid()::text
        )
        OR EXISTS (
          SELECT 1 FROM profiles p3
          WHERE p3.auth_id::text = auth.uid()::text 
          AND p3.role = 'admin'
        )
      )
    )
  );

CREATE POLICY "Users can create comments on accessible requests" ON comments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM requests 
      JOIN profiles ON profiles.id = requests.client_id
      WHERE requests.id = comments.request_id 
      AND (
        profiles.auth_id::text = auth.uid()::text 
        OR EXISTS (
          SELECT 1 FROM profiles p2
          WHERE p2.id = requests.assigned_to
          AND p2.auth_id::text = auth.uid()::text
        )
        OR EXISTS (
          SELECT 1 FROM profiles p3
          WHERE p3.auth_id::text = auth.uid()::text 
          AND p3.role = 'admin'
        )
      )
    

-- Tasks policies
CREATE POLICY "Staff and admins can view all tasks" ON tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.auth_id::text = auth.uid()::text 
      AND role IN ('admin', 'staff')
    )
  );

CREATE POLICY "Staff and admins can create tasks" ON tasks
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.auth_id::text = auth.uid()::text 
      AND role IN ('admin', 'staff')
    )
  );

CREATE POLICY "Staff and admins can update tasks" ON tasks
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.auth_id::text = auth.uid()::text 
      AND role IN ('admin', 'staff')
    )
  );

CREATE POLICY "Staff and admins can delete tasks" ON tasks
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.auth_id::text = auth.uid()::text 
      AND role IN ('admin', 'staff')
    )
  );)
  );
