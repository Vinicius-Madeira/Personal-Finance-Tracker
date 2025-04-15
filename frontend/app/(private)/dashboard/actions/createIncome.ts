"use server";

import { apiURL } from "@/utils/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type ActionReturn = {
  id?: number;
  status: string;
  message: string;
};

export async function createIncome(
  prevState: any,
  formData: FormData
): Promise<ActionReturn> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("JSESSIONID");

  if (!sessionCookie) {
    console.log("no session cookie found");
    return { status: "error", message: "O usuário não está logado!" };
  }

  // workaround to deal with integers on back-end
  const value = Number(
    (formData.get("valor") as string).replace(".", "").replace(",", ".")
  );

  const newIncome = {
    titulo: formData.get("titulo"),
    data: formData.get("data"),
    valor: value,
    categoria: formData.get("categoria"),
    descricao: formData.get("descricao"),
  };

  console.log(`Sending new income`);
  console.log(newIncome);
  const response = await fetch(`${apiURL}/api/renda`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `JSESSIONID=${sessionCookie.value}`,
    },
    body: JSON.stringify(newIncome),
  });

  if (!response.ok) {
    console.log(`Failed to create new income: status: ${response.status}`);
    return { status: "error", message: "Ocorreu uma falha ao criar a renda." };
  }

  console.log("Nova renda criada com sucesso!");
  revalidateTag("create-renda");
  return { status: "success", message: "Nova renda criada com sucesso!" };
}
