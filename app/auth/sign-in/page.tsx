"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithEmail } from "@/lib/supabase/auth";
import { hasOrganization } from "@/lib/supabase/queries";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await signInWithEmail(email, password);
    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const hasOrg = await hasOrganization();
    router.push(hasOrg ? "/dashboard" : "/auth/business");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h1 className="text-xl font-medium">Welcome back</h1>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">
          {error}
        </p>
      )}

      <fieldset className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </fieldset>

      <fieldset className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </fieldset>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign me in"}
      </Button>

      <p className="text-muted-foreground text-sm text-center">
        Don&apos;t have an account?{" "}
        <Link href="/auth/sign-up" className="underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
