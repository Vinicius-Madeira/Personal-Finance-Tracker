"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Pen, Trash } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../../../components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { Income } from "../types";
import { formSchema, FormSchema } from "./schema";
import { useActionState, useEffect, useTransition } from "react";
import { updateIncome } from "./actions";
import { showSuccessToast } from "@/components/success-toast";
import { showErrorToast } from "@/components/error-toast";
import { Toaster } from "sonner";
import Spinner from "@/components/spinner";
import { parseLocalDate } from "@/utils/format";
import { BRLCurrencyInput } from "@/components/currency-input";

interface DashboardCardProps {
  income: Income;
}

export default function DashboardCardActions({ income }: DashboardCardProps) {
  const [state, formAction] = useActionState(updateIncome, {
    id: income.id,
    status: "",
    message: "",
  });
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: income.titulo,
      descricao: income.descricao,
      categoria: income.categoria,
      data:
        income.data instanceof Date ? income.data : parseLocalDate(income.data),
      valor: income.valor,
    },
  });

  function onSubmit(values: FormData) {
    startTransition(() => {
      formAction(values);
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
    <div id="action-buttons">
      <Dialog>
        <Toaster closeButton duration={4000} position="top-center" />
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Pen />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Editando &#8594;{" "}
              <span className="font-bold">{income.titulo}</span>
            </DialogTitle>
            <DialogDescription>Edição de formulário</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form action={onSubmit} className="space-y-8">
              <FormField
                control={form.control}
                name="titulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="data"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data</FormLabel>
                    <input
                      type="hidden"
                      name="data"
                      value={
                        field.value ? format(field.value, "yyyy-MM-dd", {}) : ""
                      }
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          locale={ptBR}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("2000-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="valor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <BRLCurrencyInput name="valor" control={form.control} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? "Atualizando..." : "Atualizar"}
                {isPending && <Spinner />}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Renda?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={() => console.log(`Deleting ${income.titulo}...`)}
              >
                Confirmar
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
