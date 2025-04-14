'use client';

import { FC, useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage: FC = () => {
  const { signup } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;
    
    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) {
      alert('Please fill in all required fields correctly');
    }
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await signup(formData.fullName, formData.email, formData.password);
      router.push('/login');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred during signup');
      alert(error instanceof Error ? error.message : 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Initialize Google Sign-In
      const auth2 = await (window as any).gapi.auth2.getAuthInstance();
      if (!auth2) {
        throw new Error('Google Sign-In not initialized');
      }

      const googleUser = await auth2.signIn();
      const profile = googleUser.getBasicProfile();
      
      // Get user details from Google profile
      const userData = {
        fullName: profile.getName(),
        email: profile.getEmail(),
        // Generate a secure random password for Google sign-in users
        password: Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10)
      };

      // Sign up with Google credentials
      await signup(userData.fullName, userData.email, userData.password);
      router.push('/login');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      alert('Error signing in with Google. Please try again.');
    }
  };

  // Add Google Sign-In SDK
  useEffect(() => {
    // Load Google Sign-In SDK
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      (window as any).gapi.load('auth2', () => {
        (window as any).gapi.auth2.init({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
        });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#E6E6FA] flex flex-col py-8">
      {/* Header */}
      <div className="flex items-center px-6 md:px-8 mb-6">
        <Link href="/" className="text-black hover:opacity-75 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <h1 className="ml-4 text-2xl md:text-3xl font-semibold text-black">Sign Up</h1>
      </div>

      {/* Form Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-[400px] bg-white/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-black">Create your account</h2>
            <p className="text-black/70 text-base md:text-lg">
              Join us to detect plant diseases
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name Input */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-black/70">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
              </div>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={`w-full h-12 px-4 rounded-xl bg-white/50 border-none
                  text-black placeholder-black/40 text-base
                  focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:bg-white/60
                  transition-all duration-200 ${errors.fullName ? 'ring-2 ring-red-500' : ''}`}
              />
              <div className="h-4">
                {errors.fullName && (
                  <p className="text-red-500 text-xs">{errors.fullName}</p>
                )}
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-black/70">
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
                className={`w-full h-12 px-4 rounded-xl bg-white/50 border-none
                  text-black placeholder-black/40 text-base
                  focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:bg-white/60
                  transition-all duration-200 ${errors.email ? 'ring-2 ring-red-500' : ''}`}
              />
              <div className="h-4">
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-black/70">
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
                  className="text-black/40 hover:text-black/60 transition-colors"
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
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full h-12 px-4 rounded-xl bg-white/50 border-none
                  text-black placeholder-black/40 text-base
                  focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:bg-white/60
                  transition-all duration-200 ${errors.password ? 'ring-2 ring-red-500' : ''}`}
              />
              <div className="h-4">
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-black/70">
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
                </div>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-black/40 hover:text-black/60 transition-colors"
                >
                  {showConfirmPassword ? (
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
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={`w-full h-12 px-4 rounded-xl bg-white/50 border-none
                  text-black placeholder-black/40 text-base
                  focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:bg-white/60
                  transition-all duration-200 ${errors.confirmPassword ? 'ring-2 ring-red-500' : ''}`}
              />
              <div className="h-4">
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#4CAF50] text-white rounded-xl font-medium 
                text-base hover:bg-[#43A047] active:bg-[#388E3C]
                transform transition-all duration-200 hover:scale-[1.02] 
                active:scale-[0.98] shadow-lg hover:shadow-xl
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center mt-6"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Sign Up'
              )}
            </button>

            <div className="relative py-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black/10"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-sm text-black/50 bg-gradient-to-b from-[#87CEEB] to-[#E6E6FA]">or continue with</span>
              </div>
            </div>

            {/* Google Sign Up Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full h-12 bg-white text-gray-700 rounded-xl font-medium 
                text-base hover:bg-gray-50 active:bg-gray-100
                transform transition-all duration-200 hover:scale-[1.02] 
                active:scale-[0.98] shadow-lg hover:shadow-xl
                flex items-center justify-center gap-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z"
                />
              </svg>
              Sign up with Google
            </button>

            {/* Login Link */}
            <div className="text-center mt-6">
              <span className="text-black/70">Already have an account? </span>
              <Link href="/login" className="text-[#4CAF50] hover:text-[#43A047] font-medium transition-colors duration-200">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage; 