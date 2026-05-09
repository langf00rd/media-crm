import { supabase } from "./client";

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signUpWithEmail(
  email: string,
  password: string,
  options?: { first_name?: string; last_name?: string },
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: options?.first_name ?? "",
        last_name: options?.last_name ?? "",
      },
    },
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
}
