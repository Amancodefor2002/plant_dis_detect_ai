'use client';

import { FC, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const DashboardPage: FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
        return;
      }
      // All users should see the plant detection page
      router.push('/plant-detection');
    }
  }, [user, loading, router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#E6E6FA] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7C4DFF]"></div>
    </div>
  );
};

export default DashboardPage; 