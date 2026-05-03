import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import { supabase } from '../../lib/supabase';
import { Session } from '@supabase/supabase-js';

export function ProtectedRoute({ children }: { children?: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for changes to the auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>; // Bisa diganti dengan komponen Loader
  }

  // If no session exists, navigate to the home page
  if (!session) {
    return <Navigate to="/" replace />;
  }

  // If session exists, render children or child routes
  return children ? <>{children}</> : <Outlet />;
}
