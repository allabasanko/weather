'use client';
import { useEffect } from 'react';
import { useAuthStore } from '../authStore';
import { useRouter } from 'next/navigation';

export default function Hydrate({ children }: Readonly<{ children: React.ReactNode }>) {
  const { setAuth, isAuthenticated } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token && token === process.env.NEXT_PUBLIC_TOKEN) {
      setAuth(token);
    } else {
      setAuth('');
      router.push('/login');
    }
  }, [setAuth, isAuthenticated, router]);

  return <>{children}</>;
}
