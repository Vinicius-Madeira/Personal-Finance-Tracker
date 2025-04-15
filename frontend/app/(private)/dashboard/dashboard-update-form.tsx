"use client";

import { BRLCurrencyInput } from "@/components/currency-input";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import React, { useActionState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { formSchema, FormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseLocalDate } from "@/utils/format";
import { showSuccessToast } from "@/components/success-toast";
import { showErrorToast } from "@/components/error-toast";
import { Income } from "../types";
import { updateIncome } from "./actions/updateIncome";

interface DashboardUpdateFormProps {
  income: Income;
}

export default function DashboardUpdateForm({
  income,
}: DashboardUpdateFormProps) {
  const [state, formAction] = useActionState(updateIncome, {
    id: income.id,
    status: "",
    message: "",
  });
  const [isUpdatePending, startUpdateTransition] = useTransition();

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
    startUpdateTransition(() => {
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
                value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
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
        <Button type="submit" disabled={isUpdatePending}>
          {isUpdatePending ? "Alterando..." : "Alterar"}
          {isUpdatePending && <Spinner />}
        </Button>
      </form>
    </Form>
  );
}
