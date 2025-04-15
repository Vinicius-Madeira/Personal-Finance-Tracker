"use server";

import { apiURL } from "@/utils/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function updateExpense(prevState: any, formData: FormData) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("JSESSIONID");

  if (!sessionCookie) {
    console.log("no session cookie found");
    return { status: "error", message: "O usuário não está logado!" };
  }

  if (!prevState?.id) {
    console.log("no id was found for updateExpense");
    return { status: "error", message: "Falha ao atualizar o gasto." };
  }

  const updatedExpense = {
    titulo: formData.get("titulo"),
    data: formData.get("data"),
    valor: Number(formData.get("valor")),
    categoria: formData.get("categoria"),
    descricao: formData.get("descricao"),
  };

  console.log(`Sending updated expense`);
  console.log(updatedExpense);
  const response = await fetch(`${apiURL}/api/gasto/${prevState.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: `JSESSIONID=${sessionCookie.value}`,
    },
    body: JSON.stringify(updatedExpense),
  });

  if (!response.ok) {
    console.log(`failed to update expense: status: ${response.status}`);
    return {
      status: "error",
      message: "Ocorreu uma falha ao atualizar o gasto.",
      id: prevState.id,
    };
  }

  console.log("Gasto atualizado com sucesso!");
  revalidateTag("update-expense");
  return {
    status: "success",
    message: "Gasto atualizado com sucesso!",
    id: prevState.id,
  };
}
