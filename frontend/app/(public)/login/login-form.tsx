"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { frontendURL } from "@/utils/api";

const formSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(4).max(24),
});

type FormSchema = z.infer<typeof formSchema>;

export default function LoginForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });
  const router = useRouter();

  async function onSubmit(values: FormSchema) {
    const response = await fetch(`${frontendURL}/api/login`, {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (response.ok) {
      router.push("/dashboard");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Entre na sua conta</CardTitle>
          <CardDescription>Insira seu email e senha abaixo</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-2">
                Login
              </Button>
              <div className="mt-4 text-center text-sm">
                Não tem uma conta?
                <Button asChild variant="ghost">
                  <Link href="/signup" className="underline underline-offset-4">
                    Cadastre-se
                  </Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
