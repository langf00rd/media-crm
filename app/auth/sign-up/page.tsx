"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpWithEmail } from "@/lib/supabase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await signUpWithEmail(email, password, {
      first_name: firstName,
      last_name: lastName,
    });
    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    router.push("/auth/business");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h1 className="text-xl font-medium">Create your account</h1>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">
          {error}
        </p>
      )}

      <div className="flex gap-4">
        <fieldset className="space-y-2 w-full">
          <Label htmlFor="first_name">First name</Label>
          <Input
            id="first_name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </fieldset>
        <fieldset className="space-y-2 w-full">
          <Label htmlFor="last_name">Last name</Label>
          <Input
            id="last_name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </fieldset>
      </div>

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
          autoComplete="new-password"
          minLength={6}
        />
      </fieldset>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Create my account"}
      </Button>

      <p className="text-muted-foreground text-sm text-center">
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
