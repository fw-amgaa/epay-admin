import { auth } from "@/auth";
import { Layout } from "@/components/layout";
import { redirect } from "next/navigation";
import React from "react";

export default async function ConnectionsLayout({ children }: React.PropsWithChildren) {
  const session = await auth();

  console.log('sess', session)

  if (!session?.user) {
    return redirect("/login");
  }

  return <Layout>{children}</Layout>;
}

