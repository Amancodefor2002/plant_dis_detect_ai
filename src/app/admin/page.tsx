'use client';

import { FC, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt?: string;
}

const AdminPage: FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get users from localStorage
  useEffect(() => {
    const fetchUsers = () => {
      setIsLoading(true);
      try {
        // Get all users from localStorage
        const allUsers = localStorage.getItem('allUsers');
        if (allUsers) {
          setUsers(JSON.parse(allUsers));
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();

    // Set up event listener for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'allUsers') {
        fetchUsers();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Protect the admin route
  useEffect(() => {
    if (!user || user.email !== 'test@example.com') {
      router.push('/login');
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#E6E6FA] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7C4DFF]"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#E6E6FA] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/20 backdrop-blur-sm rounded-[32px] p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-medium text-black mb-6">Registered Users</h1>
          
          <div className="bg-white/30 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-black/5">
                    <th className="px-6 py-4 text-left text-sm font-medium text-black/70">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black/70">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black/70">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black/70">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-black/5 transition-colors">
                      <td className="px-6 py-4 text-sm text-black/70">{user.id}</td>
                      <td className="px-6 py-4 text-sm text-black/70">{user.fullName}</td>
                      <td className="px-6 py-4 text-sm text-black/70">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-black/70">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-black/50">
                        No users registered yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 text-sm text-black/50">
            Total Users: {users.length}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminPage; 