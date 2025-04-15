"use server";

import { apiURL } from "@/utils/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function updateIncome(prevState: any, formData: FormData) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("JSESSIONID");

  if (!sessionCookie) {
    console.log("no session cookie found");
    return { status: "error", message: "O usuário não está logado!" };
  }

  if (!prevState?.id) {
    console.log("no id was found for updateIncome");
    return { status: "error", message: "Falha ao atualizar a renda." };
  }

  const updatedIncome = {
    titulo: formData.get("titulo"),
    data: formData.get("data"),
    valor: Number(formData.get("valor")),
    categoria: formData.get("categoria"),
    descricao: formData.get("descricao"),
  };

  console.log(`Sending updated income`);
  console.log(updatedIncome);
  const response = await fetch(`${apiURL}/api/renda/${prevState.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: `JSESSIONID=${sessionCookie.value}`,
    },
    body: JSON.stringify(updatedIncome),
  });

  if (!response.ok) {
    console.log(`failed to update income: status: ${response.status}`);
    return {
      status: "error",
      message: "Ocorreu uma falha ao atualizar a renda.",
      id: prevState.id,
    };
  }

  console.log("renda atualizada com sucesso!");
  revalidateTag("update-renda");
  return {
    status: "success",
    message: "Renda atualizada com sucesso!",
    id: prevState.id,
  };
}
