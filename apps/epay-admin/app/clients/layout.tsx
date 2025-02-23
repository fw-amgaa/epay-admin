import { auth } from "@/auth";
import React from "react";

export default async function Layout({ children }: React.PropsWithChildren) {
  const session = await auth();

  // if (!session?.user) {
  //   return redirect("/login");
  // }
  return <>{children}</>;
}

