'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthCallback() {
  const router = useRouter();
  
  useEffect(() => {
    const handleCallback = async () => {
      const { createClientComponentClient } = await import('@supabase/auth-helpers-nextjs');
      const supabase = createClientComponentClient();
      const code = new URL(window.location.href).searchParams.get('code');

      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
        router.push('/chat');
      }
    };

    handleCallback();
  }, [router]);

  return null;
} 