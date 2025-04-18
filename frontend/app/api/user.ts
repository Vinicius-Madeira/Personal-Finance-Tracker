import { apiURL } from "@/utils/api";
import { cookies } from "next/headers";
import { cache } from "react";

export interface User {
  user: string;
  name: string;
  email: string;
  senha: string | null;
  id: number;
}

export const getUser = cache(async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("JSESSIONID");

  if (!sessionCookie) {
    console.log("User not authenticated.");
    return null;
  }

  try {
    const response = await fetch(`${apiURL}/me`, {
      method: "GET",
      headers: {
        Cookie: `JSESSIONID=${sessionCookie.value}`,
      },
      credentials: "include",
      cache: "force-cache",
      next: {
        revalidate: 3600,
        tags: ["user"],
      },
    });

    if (!response.ok) {
      console.error("Error fetching user.");
      return null;
    }
    const userData = await response.json();

    return userData;
  } catch {
    console.error("Unexpected error.");
    return null;
  }
});
