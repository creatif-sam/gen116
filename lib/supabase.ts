import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
  });
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Log Supabase client status (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('Supabase client initialized:', {
    url: supabaseUrl,
    hasKey: !!supabaseAnonKey,
  });
}

// Database Types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          auth_id?: string;
          email: string;
          name: string;
          role: 'admin' | 'staff' | 'client';
          avatar?: string;
          company?: string;
          phone?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      requests: {
        Row: {
          id: string;
          client_id: string;
          title: string;
          description: string;
          category: string;
          priority: 'low' | 'medium' | 'high' | 'urgent';
          status: 'pending' | 'in-progress' | 'completed' | 'rejected';
          budget?: string;
          deadline?: string;
          assigned_to?: string;
          progress: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['requests']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['requests']['Insert']>;
      };
      attachments: {
        Row: {
          id: string;
          request_id: string;
          name: string;
          url: string;
          type: string;
          size: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['attachments']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['attachments']['Insert']>;
      };
      comments: {
        Row: {
          id: string;
          request_id: string;
          user_id: string;
          user_name: string;
          user_role: 'admin' | 'staff' | 'client';
          content: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['comments']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['comments']['Insert']>;
      };
    };
  };
}
