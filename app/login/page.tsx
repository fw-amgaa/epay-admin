"use client";

import { SignInSchema } from "@/auth";
import { LoginForm } from "@/components/login-form";
import { useLogin } from "@refinedev/core";
import { GalleryVerticalEnd } from "lucide-react";
import { SubmitHandler } from "react-hook-form";

export default function Login() {
  const { mutate: login } = useLogin();
  const onSubmit: SubmitHandler<SignInSchema> = (data) => login(data);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          E-pay admin
        </a>
        <LoginForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}
