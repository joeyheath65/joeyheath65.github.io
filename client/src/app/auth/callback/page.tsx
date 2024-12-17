'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthCallback() {
  const router = useRouter();
  
  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { createClientComponentClient } = await import('@supabase/auth-helpers-nextjs');
        const supabase = createClientComponentClient();
        const code = new URL(window.location.href).searchParams.get('code');

        if (code) {
          await supabase.auth.exchangeCodeForSession(code);
          router.push('/chat');
        } else {
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        router.push('/auth/login');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg">
        <div className="text-white">Completing sign in...</div>
      </div>
    </div>
  );
} 