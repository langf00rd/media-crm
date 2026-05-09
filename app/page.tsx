import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Balancer } from "react-wrap-balancer";

export default function HomePage() {
  return (
    <div className="w-screen px-5 h-screen gap-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-[2.4rem] leading-[1.3] max-w-xl text-center font-medium">
        <Balancer>Send Contracts. Collect Deposits. Start Work</Balancer>
      </h1>
      <p className="max-w-xl text-center md:text-xl text-muted-foreground">
        <>
          Send contracts, collect signatures, and request deposits in one simple
          flow. Built for service providers who are tired of WhatsApp chaos and
          unpaid work
        </>
      </p>
      <div className="flex flex-col gap-1 mt-10">
        <Link href="/activity" className="block mx-auto">
          <Button>
            Get Started
            <ChevronRight />
          </Button>
        </Link>
        <small className="font-medium">
          It&apos;s free &mdash; No credit card required
        </small>
      </div>
    </div>
  );
}
