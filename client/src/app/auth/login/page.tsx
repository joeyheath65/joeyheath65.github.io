'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [authComponent, setAuthComponent] = useState<React.ReactNode>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const { createClientComponentClient } = await import('@supabase/auth-helpers-nextjs');
      const { Auth } = await import('@supabase/auth-ui-react');
      const { ThemeSupa } = await import('@supabase/auth-ui-shared');
      
      const supabase = createClientComponentClient();

      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/chat');
        return;
      }

      setAuthComponent(
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#2563eb',
                  brandAccent: '#1d4ed8',
                }
              }
            }
          }}
          theme="dark"
          providers={['google', 'github']}
          redirectTo={`${window.location.origin}/auth/callback`}
        />
      );
    };

    initializeAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Sign in to AI Agent Hub
        </h1>
        {authComponent}
      </div>
    </div>
  );
} 