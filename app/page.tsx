import Landing from "@/app/components/landing";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();

  if (userId) redirect("/dashboard");

  return <Landing />;
}
