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
import { showSuccessToast } from "@/components/success-toast";

const formSchema = z.object({
  name: z
    .string({
      message: "Campo obrigatório.",
    })
    .min(3, { message: "Este campo requer no mínimo 3 caracteres." })
    .max(20, { message: "Este campo não pode exceder 20 caracteres." }),
  user: z
    .string({
      message: "Campo obrigatório.",
    })
    .min(3, { message: "Este campo requer no mínimo 3 caracteres." })
    .max(20, { message: "Este campo não pode exceder 20 caracteres." }),
  email: z
    .string({
      message: "Campo obrigatório.",
    })
    .email({
      message: "Email inválido.",
    }),
  senha: z
    .string({
      message: "Campo obrigatório.",
    })
    .min(4, { message: "Este campo requer no mínimo 4 caracteres." })
    .max(20, { message: "Este campo não pode exceder 20 caracteres." }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function SignupForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      user: "",
      email: "",
      senha: "",
    },
  });
  const router = useRouter();

  async function onSubmit(values: FormSchema) {
    const response = await fetch(`${frontendURL}/api/signup`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(values),
    });
    if (response.ok) {
      showSuccessToast("Cadastro realizado com sucesso!");
      router.push("/login");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Cadastre um novo usuário</CardTitle>
          <CardDescription>Insira suas credenciais abaixo</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Usuário</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                Cadastrar
              </Button>
              <div className="mt-4 text-center text-sm">
                Já possui uma conta?
                <Button asChild variant="ghost" className="ml-1">
                  <Link href="/login" className="underline underline-offset-4">
                    Faça login
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
