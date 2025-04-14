'use client';

import { FC, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const DashboardPage: FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      router.push('/login');
      return;
    }

    // Redirect regular users to plant detection page
    // Only admin (test@example.com) can access admin dashboard
    if (user.email !== 'test@example.com') {
      router.push('/plant-detection');
    } else {
      router.push('/admin');
    }
  }, [user, router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#E6E6FA] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7C4DFF]"></div>
    </div>
  );
};

export default DashboardPage; 