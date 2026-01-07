-- Gen11 Consult Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  priority VARCHAR(20) NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed', 'rejected')),
  budget VARCHAR(100),
  deadline DATE,
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
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
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user_name VARCHAR(255) NOT NULL,
  user_role VARCHAR(20) NOT NULL CHECK (user_role IN ('admin', 'staff', 'client')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_requests_client_id ON requests(client_id);
CREATE INDEX idx_requests_assigned_to ON requests(assigned_to);
CREATE INDEX idx_requests_status ON requests(status);
CREATE INDEX idx_attachments_request_id ON attachments(request_id);
CREATE INDEX idx_comments_request_id ON comments(request_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_requests_updated_at BEFORE UPDATE ON requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id::text = auth.uid()::text AND role = 'admin'
    )
  );

-- Requests policies
CREATE POLICY "Clients can view their own requests" ON requests
  FOR SELECT USING (client_id::text = auth.uid()::text);

CREATE POLICY "Staff and admins can view all requests" ON requests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'staff')
    )
  );

CREATE POLICY "Clients can create requests" ON requests
  FOR INSERT WITH CHECK (client_id::text = auth.uid()::text);

CREATE POLICY "Staff and admins can update requests" ON requests
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'staff')
    )
  );

-- Attachments policies
CREATE POLICY "Users can view attachments for their requests" ON attachments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM requests 
      WHERE requests.id = attachments.request_id 
      AND (
        requests.client_id::text = auth.uid()::text 
        OR requests.assigned_to::text = auth.uid()::text
        OR EXISTS (
          SELECT 1 FROM users 
          WHERE id::text = auth.uid()::text 
          AND role = 'admin'
        )
      )
    )
  );

-- Comments policies
CREATE POLICY "Users can view comments for their requests" ON comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM requests 
      WHERE requests.id = comments.request_id 
      AND (
        requests.client_id::text = auth.uid()::text 
        OR requests.assigned_to::text = auth.uid()::text
        OR EXISTS (
          SELECT 1 FROM users 
          WHERE id::text = auth.uid()::text 
          AND role = 'admin'
        )
      )
    )
  );

CREATE POLICY "Users can create comments on accessible requests" ON comments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM requests 
      WHERE requests.id = comments.request_id 
      AND (
        requests.client_id::text = auth.uid()::text 
        OR requests.assigned_to::text = auth.uid()::text
        OR EXISTS (
          SELECT 1 FROM users 
          WHERE id::text = auth.uid()::text 
          AND role = 'admin'
        )
      )
    )
  );
