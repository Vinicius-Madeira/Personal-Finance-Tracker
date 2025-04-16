"use server";

import { apiURL } from "@/utils/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function deleteExpense(prevState: any) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("JSESSIONID");

  if (!sessionCookie) {
    console.log("no session cookie found");
    return {
      status: "error",
      message: "O usuário não está logado!",
      id: prevState?.id,
    };
  }

  if (!prevState?.id) {
    console.log("no id was found for deleteExpense");
    return {
      status: "error",
      message: "Falha ao excluir o gasto.",
      id: prevState?.id,
    };
  }

  console.log(`Deleting expense of ID: ${prevState.id}`);
  const response = await fetch(`${apiURL}/api/gasto/${prevState.id}`, {
    method: "DELETE",
    headers: {
      Cookie: `JSESSIONID=${sessionCookie.value}`,
    },
  });

  if (!response.ok) {
    console.log(`failed to delete expense. status: ${response.status}`);
    return {
      status: "error",
      message: "Ocorreu uma falha ao excluir o gasto.",
      id: prevState.id,
    };
  }

  console.log("gasto excluído com sucesso!");
  // since the card is gone when deleted, we're sending a cookie to be able to display the toast
  cookieStore.set(
    "toast",
    JSON.stringify({
      status: "success",
      message: "Gasto excluído com sucesso!",
    })
  );
  revalidateTag("delete-expense");
  return {
    status: "success",
    message: "Gasto excluído com sucesso!",
    id: prevState.id,
  };
}
