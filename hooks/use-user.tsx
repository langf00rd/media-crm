"use client";

import { supabase } from "@/lib/supabase/client";
import { getOrganizationById } from "@/lib/supabase/queries";
import type { Organization } from "@/lib/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface UserContextValue {
  user: { id: string; email?: string } | null;
  org: Organization | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const UserContext = createContext<UserContextValue>({
  user: null,
  org: null,
  loading: true,
  refresh: async () => {},
});

function setOrgCookie(org: Organization | null) {
  if (org) {
    document.cookie = `org_data=${encodeURIComponent(JSON.stringify({ id: org.id, name: org.name, slug: org.slug, category: org.category }))}; path=/; max-age=86400; SameSite=Lax`;
  } else {
    document.cookie = "org_data=; path=/; max-age=0";
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [org, setOrg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const { data: { user: u } } = await supabase.auth.getUser();
    setUser(u ? { id: u.id, email: u.email } : null);
    if (u) {
      const o = await getOrganizationById(u.id);
      setOrg(o);
      setOrgCookie(o);
    } else {
      setOrg(null);
      setOrgCookie(null);
    }
  }, []);

  useEffect(() => {
    fetchData().finally(() => setLoading(false));

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchData();
    });

    return () => subscription.unsubscribe();
  }, [fetchData]);

  return (
    <UserContext.Provider value={{ user, org, loading, refresh: fetchData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
