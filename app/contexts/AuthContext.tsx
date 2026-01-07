'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserRole } from '../types/user';
import { supabase } from '@/lib/supabase';
import { userAPI } from '@/lib/api';
import type { Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        
        if (session?.user) {
          // Get user data from our database
          const { data: userData } = await userAPI.getUserByEmail(session.user.email!);
          if (userData) {
            setUser({
              id: userData.id,
              name: userData.name,
              email: userData.email,
              role: userData.role as UserRole,
              avatar: userData.avatar,
              company: userData.company,
              phone: userData.phone,
            });
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      
      if (session?.user) {
        const { data: userData } = await userAPI.getUserByEmail(session.user.email!);
        if (userData) {
          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role as UserRole,
            avatar: userData.avatar,
            company: userData.company,
            phone: userData.phone,
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setLoading(true);
    try {
      console.log('Starting signup process...', { email, name, role });
      
      // Sign up with Supabase Auth - profile will be auto-created by trigger
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          },
        },
      });

      console.log('Supabase signup response:', { authData, authError });

      if (authError) {
        console.error('Supabase Auth error:', authError);
        throw new Error(authError.message || 'Authentication failed');
      }

      if (!authData.user) {
        throw new Error('No user returned from signup');
      }

      console.log('Auth user created:', authData.user.id);

      // Wait a moment for trigger to complete
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Fetch the created profile
      const { data: newUser, error: dbError } = await userAPI.getUserByEmail(email);

      console.log('Profile fetch:', { newUser, dbError });

      if (dbError || !newUser) {
        console.error('Profile fetch error:', dbError);
        // Profile might not be created yet, but auth succeeded
        // Set minimal user data
        setUser({
          id: authData.user.id,
          name: name,
          email: email,
          role: role as UserRole,
          avatar: null,
          company: null,
          phone: null,
        });
        console.log('User state updated with auth data');
      } else {
        setUser({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role as UserRole,
          avatar: newUser.avatar,
          company: newUser.company,
          phone: newUser.phone,
        });
        console.log('User state updated successfully');
      }

      return { success: true };
    } catch (error: any) {
      console.error('Signup error details:', {
        message: error.message,
        error: error,
        stack: error.stack,
      });
      
      // Return more descriptive error messages
      let errorMessage = 'Signup failed';
      if (error.message?.includes('already registered')) {
        errorMessage = 'This email is already registered';
      } else if (error.message?.includes('Email not confirmed')) {
        errorMessage = 'Please check your email to confirm your account';
      } else if (error.message?.includes('Invalid email')) {
        errorMessage = 'Please enter a valid email address';
      } else if (error.message?.includes('Password')) {
        errorMessage = 'Password must be at least 6 characters';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log('Starting login process...', { email });
      
      // Sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Supabase login response:', { authData, authError });

      if (authError) {
        console.error('Supabase Auth error:', authError);
        throw new Error(authError.message || 'Authentication failed');
      }

      if (!authData.session) {
        throw new Error('No session returned from login');
      }

      console.log('Auth session created for user:', authData.user?.id);

      // Get user data from our database
      const { data: userData, error: dbError } = await userAPI.getUserByEmail(email);
      
      console.log('Database user lookup:', { userData, dbError });

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error(`Database error: ${dbError.message || 'Failed to fetch user profile'}`);
      }

      if (userData) {
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role as UserRole,
          avatar: userData.avatar,
          company: userData.company,
          phone: userData.phone,
        });
        console.log('User state updated successfully');
      } else {
        throw new Error('User profile not found in database');
      }

      return { success: true };
    } catch (error: any) {
      console.error('Login error details:', {
        message: error.message,
        error: error,
        stack: error.stack,
      });
      
      // Return more descriptive error messages
      let errorMessage = 'Login failed';
      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password';
      } else if (error.message?.includes('Email not confirmed')) {
        errorMessage = 'Please confirm your email before logging in';
      } else if (error.message?.includes('User not found')) {
        errorMessage = 'No account found with this email';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, login, signup, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
