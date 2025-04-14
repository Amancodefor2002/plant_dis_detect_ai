'use client';

import { FC, useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginPage: FC = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});

    try {
      await login(formData.email, formData.password);
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ 
        general: error instanceof Error ? error.message : 'Failed to login. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#E6E6FA] flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 md:p-6">
        <Link href="/" className="text-black">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <h1 className="ml-4 text-2xl md:text-3xl font-medium text-black">Login</h1>
      </div>

      {/* Form Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-[320px] md:max-w-[380px] bg-white/20 backdrop-blur-sm rounded-[32px] p-6 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl mb-2">Welcome back!</h2>
            <p className="text-black/60 text-base md:text-lg">
              Login to continue your journey
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {submitError && (
              <div className="bg-red-100/80 text-red-600 px-4 py-2 rounded-lg text-sm">
                {submitError}
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-black/60">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <label htmlFor="email" className="text-sm font-medium">Email</label>
              </div>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full h-12 px-4 rounded-2xl bg-white/50 border-none
                  text-black placeholder-black/40 text-base md:text-lg
                  focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:bg-white/60
                  transition-all duration-200 ${errors.email ? 'ring-2 ring-red-500' : ''}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-black/60">
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-black/40 hover:text-black/60 transition-colors
                    w-5 h-5 flex items-center justify-center"
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="1" y1="1" x2="23" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full h-12 px-4 rounded-2xl bg-white/50 border-none
                    text-black placeholder-black/40 text-base md:text-lg
                    focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:bg-white/60
                    transition-all duration-200 ${errors.password ? 'ring-2 ring-red-500' : ''}`}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember me and Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-black/30 text-[#7C4DFF] 
                    focus:ring-[#7C4DFF] focus:ring-offset-0 focus:ring-2"
                />
                <span className="text-sm text-black/70">Remember me</span>
              </label>
              <Link 
                href="/forgot-password" 
                className="text-sm text-[#7C4DFF] hover:text-[#6E45E2] 
                  transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#7C4DFF] text-white rounded-2xl font-medium 
                text-base md:text-lg hover:bg-[#6E45E2] active:bg-[#5E3BC3]
                transform transition-all duration-200 hover:scale-[1.02] 
                active:scale-[0.98] shadow-md hover:shadow-lg
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Login'
              )}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black/10"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-sm md:text-base text-black/40 bg-gradient-to-b from-[#87CEEB] to-[#E6E6FA]">or</span>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              className="w-full h-12 bg-white rounded-2xl font-medium text-black/80 
                text-base md:text-lg flex items-center justify-center gap-2 
                hover:bg-white/90 transform transition-all duration-200 
                hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.2 17.64 11.9 17.64 9.2z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Login with Google
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-4">
              <span className="text-black/60">Don't have an account? </span>
              <Link href="/signup" className="text-[#7C4DFF] hover:text-[#6E45E2] transition-colors duration-200">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage; 