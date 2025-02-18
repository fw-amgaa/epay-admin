import React from "react";
import { auth } from "../../auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }: React.PropsWithChildren) {
  const session = await auth();

  // if (!session?.user) {
  //   return redirect("/login");
  // }

  return <>{children}</>;
}

