import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { C } from "./constants";

export function AdminRoute({ children }: { children?: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function verifyAdminAuthorization(currentSession: Session | null) {
      if (!currentSession) {
        if (isMounted) {
          setSession(null);
          setIsAdmin(false);
          setLoading(false);
        }
        return;
      }

      try {
        const { data, error } = await supabase.rpc("is_admin");
        if (error) {
          console.warn("Admin RPC authorization notice: Access denied.");
          if (isMounted) {
            setSession(currentSession);
            setIsAdmin(false);
            setLoading(false);
          }
          return;
        }

        if (isMounted) {
          setSession(currentSession);
          setIsAdmin(Boolean(data));
          setLoading(false);
        }
      } catch {
        console.warn("Admin verification notice: Exception caught during RPC execution.");
        if (isMounted) {
          setSession(currentSession);
          setIsAdmin(false);
          setLoading(false);
        }
      }
    }

    // Initial verification
    supabase.auth.getSession().then(({ data: { session } }) => {
      verifyAdminAuthorization(session);
    });

    // Auth listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      verifyAdminAuthorization(session);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div
          className="flex items-center gap-3 px-5 py-2.5 rounded-full"
          style={{ backgroundColor: "rgba(0,31,63,0.5)", border: "1px solid rgba(219,230,76,0.3)", backdropFilter: "blur(10px)" }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: C.lime }} />
          <span style={{ color: C.white, fontSize: "12px", fontWeight: 600 }}>
            Verifying Administrative Authorization...
          </span>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/monitoring" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
