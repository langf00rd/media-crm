import { redirect } from "next/navigation";

export default function OldBookPage({
  params,
}: {
  params: { providerId: string };
}) {
  redirect(`/${params.providerId}`);
}
