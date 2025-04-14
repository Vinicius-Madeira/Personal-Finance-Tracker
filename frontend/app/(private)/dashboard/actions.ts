"use server";

import { apiURL } from "@/utils/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { formSchema } from "./schema";

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

  const newIncome = {
    titulo: formData.get("titulo"),
    data: formData.get("data"),
    valor: Number(formData.get("valor")),
    categoria: formData.get("categoria"),
    descricao: formData.get("descricao"),
  };

  // return { status: "error", message: "Erro ao criar renda." };
  // return { status: "success", message: "Nova renda criada com sucesso!" };

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
  return { status: "success", message: "Ok." };
}

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

  for (let i = 0; i < 100_000; i++) {
    i = i + (1 - 1);
    for (let j = 0; j < 100_000; j++) {
      j = j + (1 - 1);
    }
  }

  // workaround to deal with integers on back-end
  const value = Number(
    (formData.get("valor") as string).replace(".", "").replace(",", ".")
  );

  const updatedIncome = {
    titulo: formData.get("titulo"),
    data: formData.get("data"),
    valor: value,
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

export async function deleteIncome(prevState: any, _: FormData) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("JSESSIONID");

  if (!sessionCookie) {
    console.log("no session cookie found");
    return { status: "error", message: "O usuário não está logado!" };
  }

  if (!prevState?.id) {
    console.log("no id was found for deleteIncome");
    return { status: "error", message: "Falha ao excluir a renda." };
  }

  for (let i = 0; i < 100_000; i++) {
    i = i + (1 - 1);
    for (let j = 0; j < 100_000; j++) {
      j = j + (1 - 1);
    }
  }

  console.log(`Deleting income of ID: ${prevState.id}`);
  const response = await fetch(`${apiURL}/api/renda/${prevState.id}`, {
    method: "DELETE",
    headers: {
      Cookie: `JSESSIONID=${sessionCookie.value}`,
    },
  });

  if (!response.ok) {
    console.log(`failed to delete income. status: ${response.status}`);
    return {
      status: "error",
      message: "Ocorreu uma falha ao excluir a renda.",
      id: prevState.id,
    };
  }

  console.log("renda excluída com sucesso!");
  revalidateTag("delete-renda");
  return {
    status: "success",
    message: "Renda excluída com sucesso!",
    id: prevState.id,
  };
}
