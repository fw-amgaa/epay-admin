import { auth } from "@/auth";
import { Layout } from "@/components/layout";
import { redirect } from "next/navigation";
import React from "react";

export default async function ReportsLayout({ children }: React.PropsWithChildren) {
  const session = await auth();

  if (!session?.user) {
    return redirect("/login");
  }

  return <Layout>{children}</Layout>;
}

