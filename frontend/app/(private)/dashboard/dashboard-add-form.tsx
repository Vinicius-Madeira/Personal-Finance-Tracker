"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../../../components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { formSchema, FormSchema } from "./schema";
import { useActionState, useEffect, useTransition } from "react";
import Spinner from "@/components/spinner";
import { showErrorToast } from "@/components/error-toast";
import { showSuccessToast } from "@/components/success-toast";
import { BRLCurrencyInput } from "@/components/currency-input";

const defaultValues = {
  titulo: "",
  data: new Date(),
  valor: 0,
  categoria: "",
  descricao: "",
};

interface DashboardAddFormProps {
  buttonText: string;
  title: string;
  createAction: (prevState: any, formData: FormData) => any;
}

export default function DashboardAddForm({
  buttonText,
  title,
  createAction,
}: DashboardAddFormProps) {
  const [state, formAction] = useActionState(createAction, {
    status: "",
    message: "",
  });
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: FormSchema) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value.toString());
    }
    formData.set("data", new Date(values.data).toISOString().split("T")[0]);

    startTransition(() => formAction(formData));
  }

  useEffect(() => {
    if (state.status === "success") {
      showSuccessToast(state.message);
      form.reset(defaultValues);
    }
    if (state.status === "error") {
      showErrorToast(state.message, "Por favor, tente novamente.");
    }
  }, [state, form]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute left-100 top-24">{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="w-100">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Preencha os campos abaixo</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Investimento" />
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
                    <Input
                      {...field}
                      placeholder="Investimento referente à bolsa de valores..."
                    />
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
                    <Input {...field} placeholder="Passivos" />
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
                        defaultMonth={field.value}
                        disabled={(date) =>
                          date > new Date() || date < new Date("2000-01-01")
                        }
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
              render={({}) => (
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
              {isPending ? "Salvando..." : "Salvar"}
              {isPending && <Spinner />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
