import { loginUser } from '@/services/operations';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const response = await loginUser(username, password);
    if (!response) {
      console.log('No response from server');
      throw new Error('Invalid credentials');
    }
    {
      (await cookies()).set('isAuthenticated', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60,
        path: '/',
      });

      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  }
}
