'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleCallback = async () => {
      const code = new URL(window.location.href).searchParams.get('code');

      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
        router.push('/chat');
      }
    };

    handleCallback();
  }, [router, supabase.auth]);

  return null;
} 