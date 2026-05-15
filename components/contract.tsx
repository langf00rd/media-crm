import { Contract } from "@/lib/types";
import { isoToDate } from "@/lib/utils";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function ContractItem(props: { contract: Contract }) {
  return (
    <Card className="h-full">
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
        <p className="text-muted-foreground">
          Created {isoToDate(props.contract.created_dt)}
        </p>
      </CardFooter>
    </Card>
  );
}
