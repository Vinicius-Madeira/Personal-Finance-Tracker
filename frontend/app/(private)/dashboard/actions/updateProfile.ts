"use server";

import { apiURL } from "@/utils/api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateProfile(prevState: any, formData: FormData) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("JSESSIONID");

  if (!sessionCookie) {
    console.log("no session cookie found");
    return { status: "error", message: "O usuário não está logado!" };
  }

  const updatedProfile = {
    name: formData.get("name"),
    user: formData.get("user"),
    id: formData.get("id"),
  };

  console.log(`Sending updated profile`);
  console.log(updatedProfile);
  const response = await fetch(`${apiURL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: `JSESSIONID=${sessionCookie.value}`,
    },
    body: JSON.stringify(updatedProfile),
  });

  if (!response.ok) {
    console.log(`failed to update profile: status: ${response.status}`);
    return {
      status: "error",
      message: "Ocorreu uma falha ao atualizar o perfil.",
    };
  }

  console.log("perfil atualizado com sucesso!");
  revalidatePath("/dashboard");
  return {
    status: "success",
    message: "Perfil atualizado com sucesso!",
  };
}
