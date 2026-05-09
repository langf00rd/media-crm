import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Page() {
  return (
    <form>
      <h1 className="text-xl font-medium">Welcome back</h1>
      <fieldset>
        <Label>Email</Label>
        <Input type="email" name="email" />
      </fieldset>
      <fieldset>
        <Label>Password</Label>
        <Input type="password" name="password" />
      </fieldset>
      <Button type="submit">Sign me in</Button>
      <p className="text-muted-foreground">
        Don&apos;t have an account? <Link href="/auth/sign-up">Sign up</Link>
      </p>
    </form>
  );
}
