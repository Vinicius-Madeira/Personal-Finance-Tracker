"use server";

import { apiURL } from "@/utils/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type ActionReturn = {
  id?: number;
  status: string;
  message: string;
};

export async function createExpense(
  prevState: any,
  formData: FormData
): Promise<ActionReturn> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("JSESSIONID");

  if (!sessionCookie) {
    console.log("no session cookie found");
    return { status: "error", message: "O usuário não está logado!" };
  }

  const newExpense = {
    titulo: formData.get("titulo"),
    data: formData.get("data"),
    valor: Number(formData.get("valor")),
    categoria: formData.get("categoria"),
    descricao: formData.get("descricao"),
  };

  console.log(`Sending new expense`);
  console.log(newExpense);
  const response = await fetch(`${apiURL}/api/gasto`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `JSESSIONID=${sessionCookie.value}`,
    },
    body: JSON.stringify(newExpense),
  });

  if (!response.ok) {
    console.log(`Failed to create new expense: status: ${response.status}`);
    return { status: "error", message: "Ocorreu uma falha ao criar gasto." };
  }

  console.log("Novo gasto criado com sucesso!");
  revalidateTag("create-expense");
  return { status: "success", message: "Novo gasto criado com sucesso!" };
}
