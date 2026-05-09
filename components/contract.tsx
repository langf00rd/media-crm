import { Contract } from "@/lib/types";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { DownloadIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function ContractItem(props: { contract: Contract }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.contract.title}</CardTitle>
        <CardDescription>{props.contract.description}</CardDescription>
      </CardHeader>
      {/*<CardContent className="h-[200px] overflow-y-scroll">
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{props.contract.content}</ReactMarkdown>
        </div>
      </CardContent>*/}
      <CardFooter className="gap-4">
        <Button className="bg-primary/10 text-primary">
          <DownloadIcon />
          Download PDF
        </Button>
        <Button variant="outline">Send</Button>
      </CardFooter>
    </Card>
  );
}
