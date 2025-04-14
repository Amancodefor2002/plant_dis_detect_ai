import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  fullName: string;
  [key: string]: string; // Add index signature for compatibility with Jose's JWTPayload
}

export async function verifyAuth(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    // Verify that the payload has all required fields
    if (
      typeof payload.userId === 'string' &&
      typeof payload.email === 'string' &&
      typeof payload.role === 'string' &&
      typeof payload.fullName === 'string'
    ) {
      return payload as JWTPayload;
    }
    return null;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  return token?.value || null;
}

export async function generateToken(payload: JWTPayload): Promise<string> {
  const token = await new SignJWT({
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
    fullName: payload.fullName
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
  return token;
} 