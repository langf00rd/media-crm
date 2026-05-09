import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Page() {
  return (
    <form>
      <h1 className="text-xl font-medium">Create your account</h1>
      <div className="flex gap-4 w-full">
        <fieldset>
          <Label>First name</Label>
          <Input type="text" name="first_name" />
        </fieldset>
        <fieldset>
          <Label>Last name</Label>
          <Input type="text" name="last_name" />
        </fieldset>
      </div>
      <fieldset>
        <Label>Email</Label>
        <Input type="email" name="email" />
      </fieldset>
      <fieldset>
        <Label>Password</Label>
        <Input type="password" name="password" />
      </fieldset>
      <Button type="submit">Create my account</Button>
      <p className="text-muted-foreground">
        Already have an account? <Link href="/auth/sign-in">Sign in</Link>
      </p>
    </form>
  );
}
