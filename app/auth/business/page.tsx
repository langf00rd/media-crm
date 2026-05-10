"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createOrganization } from "@/lib/supabase/queries";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BusinessPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const slug = name
    ? name.replace(/\s+/g, "-").toLowerCase()
    : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: orgError } = await createOrganization({
      name,
      slug,
      category: "",
      phone: phone || null,
      email: email || null,
    });

    setLoading(false);

    if (orgError) {
      setError(orgError.message);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h1 className="text-xl font-medium">Create your business</h1>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">
          {error}
        </p>
      )}

      <fieldset className="space-y-2">
        <Label htmlFor="name">Business Name</Label>
        <div>
          <Input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name && (
            <small className="font-medium ml-4 text-muted-foreground">
              {`${window.location.origin}/${slug}`}
            </small>
          )}
        </div>
      </fieldset>

      <div className="flex items-center gap-4">
        <fieldset className="space-y-2 w-full">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </fieldset>
        <fieldset className="space-y-2 w-full">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
      </div>

      <Button type="submit" className="w-full" disabled={loading || !name}>
        {loading ? "Creating..." : "Create my business"}
      </Button>
    </form>
  );
}
