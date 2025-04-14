'use client';

import { FC, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
}

const AdminDashboard: FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data.users);
        setError(null);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch users');
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      if (!user || user.email !== 'test@example.com') {
        router.push('/login');
      } else {
        fetchUsers();
      }
    }
  }, [user, loading, router]);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#E6E6FA] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7C4DFF]"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#E6E6FA] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-medium text-black">Admin Dashboard</h1>
          <Link 
            href="/plant-detection" 
            className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#43A047] transition-colors"
          >
            Go to Plant Detection
          </Link>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-[32px] p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-medium text-black">Registered Users</h2>
            <span className="text-sm text-black/50">Total Users: {users.length}</span>
          </div>

          {error ? (
            <div className="bg-red-100/80 text-red-600 p-4 rounded-xl mb-4">
              {error}
            </div>
          ) : (
            <div className="bg-white/30 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-black/5">
                      <th className="px-6 py-4 text-left text-sm font-medium text-black/70">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-black/70">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-black/70">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-black/70">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-black/5 transition-colors">
                        <td className="px-6 py-4 text-sm text-black/70">{user.fullName}</td>
                        <td className="px-6 py-4 text-sm text-black/70">{user.email}</td>
                        <td className="px-6 py-4 text-sm text-black/70">{user.role}</td>
                        <td className="px-6 py-4 text-sm text-black/70">
                          {new Date(user.createdAt).toLocaleDateString()}
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
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard; 