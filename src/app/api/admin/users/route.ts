import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { verifyAuth } from '@/lib/auth';
import { Types } from 'mongoose';

interface UserDocument {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  role: string;
  createdAt: Date;
}

export async function GET(req: Request) {
  try {
    // Get token from Authorization header or cookie
    let token: string | null = null;
    
    // Try Authorization header first
    const authHeader = req.headers.get('Authorization');
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
    
    // If no token in header, try cookie
    if (!token) {
      const cookieStore = cookies();
      const tokenCookie = cookieStore.get('token');
      token = tokenCookie?.value || null;
    }

    // If still no token, return unauthorized
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    // Verify admin authentication
    const payload = await verifyAuth(token);
    if (!payload || payload.email !== 'test@example.com') {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
    }

    console.log('Starting database connection...');
    // Connect to database
    const db = await connectDB();
    console.log('Database connection established:', db.connection.readyState);

    console.log('Fetching users from database...');
    
    // First, let's count the total users
    const totalUsers = await User.countDocuments();
    console.log('Total users in database:', totalUsers);

    // Fetch all users without any restrictions first
    const allUsers = await User.find({}).lean();
    console.log('All users (without select):', JSON.stringify(allUsers, null, 2));

    // Now fetch with our specific selection
    const users = await User.find()
      .select('+fullName +email +role +createdAt')
      .sort({ createdAt: -1 })
      .lean();

    console.log('Raw users data:', JSON.stringify(users, null, 2));

    if (!users || users.length === 0) {
      console.log('No users found in the database');
      return NextResponse.json({ users: [] });
    }

    // Transform the data to ensure consistent field names
    const formattedUsers = users.map(user => {
      console.log('Processing user:', user);
      
      // Format the date
      let createdDate = new Date().toISOString(); // Default value
      try {
        if (user.createdAt) {
          createdDate = new Date(user.createdAt).toISOString();
        }
      } catch (e) {
        console.error('Error formatting date for user:', user._id?.toString(), e);
      }

      return {
        _id: user._id?.toString() || 'unknown',
        fullName: user.fullName || 'Unknown',
        email: user.email || '',
        role: user.role || 'user',
        createdAt: createdDate
      };
    });

    console.log('Formatted users data:', JSON.stringify(formattedUsers, null, 2));

    return NextResponse.json({ users: formattedUsers });
  } catch (error) {
    console.error('Error in admin users API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 