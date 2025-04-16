import { z } from "zod";

export type FormSchema = z.infer<typeof formSchema>;

export const formSchema = z.object({
  titulo: z
    .string({ message: "Campo requirido." })
    .min(3, {
      message: "O título requer pelo menos 3 caracteres.",
    })
    .max(50),
  data: z.date({ message: "Campo requirido." }),
  valor: z
    .number({ message: "Campo requirido." })
    .min(0.01, { message: "O valor deve ser maior que zero." })
    .max(1000000, {
      message: "O valor não pode ser maior que R$ 1.000.000,00",
    }),
  categoria: z
    .string({ message: "Campo requirido." })
    .min(3, {
      message: "A categoria requer pelo menos 3 caracteres.",
    })
    .max(24),
  descricao: z
    .string({ message: "Campo requirido." })
    .min(3, {
      message: "A descrição requer pelo menos 3 caracteres.",
    })
    .max(50),
});
