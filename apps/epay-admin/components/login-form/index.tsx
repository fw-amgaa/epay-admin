'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitHandler, useForm } from "react-hook-form"
import { SignInSchema } from "@/auth"

interface Props {
  onSubmit: SubmitHandler<SignInSchema>
}

export function LoginForm({onSubmit}: Props) {
    const form = useForm<SignInSchema>()
  
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Нэвтрэх</CardTitle>
          <CardDescription>
            И-мэйл болон нууц үгээ оруулна уу.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="identifier">
                    И-мэйл
                  </Label>
                  <Input
                    type="email"
                    placeholder="example@epayment.mn"
                    {...form.register('identifier')}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">
                      Нууц үг
                    </Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Нууц үгээ мартсан уу?
                    </a>
                  </div>
                  <Input 
                    type="password"                    
                    {...form.register('password')}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Нэвтрэх
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
