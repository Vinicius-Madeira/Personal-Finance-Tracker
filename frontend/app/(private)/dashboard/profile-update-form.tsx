"use client";

import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showSuccessToast } from "@/components/success-toast";
import { showErrorToast } from "@/components/error-toast";
import { User } from "@/app/api/user";
import { z } from "zod";
import { updateProfile } from "./actions/updateProfile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserRoundPen } from "lucide-react";

const userSchema = z.object({
  id: z.number(),
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
});

type UserSchema = z.infer<typeof userSchema>;

interface ProfileUpdateFormProps {
  userData: User;
}

export default function ProfileUpdateForm({
  userData,
}: ProfileUpdateFormProps) {
  const [state, formAction] = useActionState(updateProfile, {
    status: "",
    message: "",
  });

  const [isUpdatePending, startUpdateTransition] = useTransition();

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: userData.id,
      name: userData.name,
      user: userData.user,
      email: userData.email,
    },
  });

  function onSubmit(values: UserSchema) {
    const formData = new FormData();

    formData.append("id", String(userData.id));
    formData.append("name", values.name);
    formData.append("user", values.user);

    startUpdateTransition(() => {
      formAction(formData);
    });
  }

  useEffect(() => {
    if (state.status === "success") {
      showSuccessToast(state.message);
    }
    if (state.status === "error") {
      showErrorToast(state.message, "Por favor, tente novamente.");
    }
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <UserRoundPen />
          Perfil
        </Button>
      </DialogTrigger>
      <DialogContent className="w-100">
        <DialogHeader>
          <DialogTitle>Atualizando Perfil</DialogTitle>
          <DialogDescription>Edite os campos abaixo</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
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
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="border-0 bg-white"
                      disabled
                      readOnly
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isUpdatePending}>
              {isUpdatePending ? "Alterando..." : "Alterar"}
              {isUpdatePending && <Spinner />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
