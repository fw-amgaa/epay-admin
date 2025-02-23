"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";

export function MainProviders({ children, ...props }: ThemeProviderProps) {
  return (
    <SessionProvider>
      {/* <NextThemesProvider {...props}> */}
      <TooltipProvider>
        <NuqsAdapter>{children}</NuqsAdapter>
      </TooltipProvider>
      {/* </NextThemesProvider> */}
    </SessionProvider>
  );
}
