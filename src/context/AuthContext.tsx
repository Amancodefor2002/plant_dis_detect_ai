'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  email: string;
  fullName: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define public and protected routes
const PUBLIC_ROUTES = ['/', '/login', '/signup'];
const PROTECTED_ROUTES = ['/plant-detection', '/admin', '/dashboard'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const checkAuth = () => {
      try {
        const cookies = document.cookie.split(';');
        const userCookie = cookies.find(c => c.trim().startsWith('user='));
        
        if (userCookie) {
          const userData = JSON.parse(userCookie.split('=')[1]);
          setUser(userData);
          
          // Only redirect if on login/signup pages
          if (pathname === '/login' || pathname === '/signup') {
            router.push(userData.role === 'admin' ? '/admin' : '/plant-detection');
          }
        } else {
          // Only redirect if on protected routes
          const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
          if (isProtectedRoute) {
            router.push('/login');
          }
        }
      } catch (e) {
        console.error('Error checking auth:', e);
        document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
        if (isProtectedRoute) {
          router.push('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [isMounted, pathname, router]);

  const signup = async (fullName: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      if (!fullName || !email || !password) {
        throw new Error('All fields are required');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // After successful signup, redirect to login
      router.push('/login');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      if (!email || !password) throw new Error('Email and password are required');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        email,
        role: email === 'test@example.com' ? 'admin' : 'user',
        fullName: email === 'test@example.com' ? 'Admin User' : 'Regular User'
      };

      document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=86400; secure; samesite=strict`;
      setUser(userData);
      router.push(userData.role === 'admin' ? '/admin' : '/plant-detection');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setUser(null);
    router.push('/login');
  };

  if (!isMounted) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#E6E6FA] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7C4DFF]"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, signup }}>
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