import { Layout as BaseLayout } from "@/components/layout";
import { redirect } from "next/navigation";
import React from "react";
import { auth } from "../../auth";

export default async function Layout({ children }: React.PropsWithChildren) {
  const data = await getData();

  if (!data.session?.user) {
    return redirect("/login");
  }

  return <BaseLayout>{children}</BaseLayout>;
}

async function getData() {
  const session = await auth();
  return {
    session,
  };
}
