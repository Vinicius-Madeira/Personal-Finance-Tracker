import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

export default async function HomeButtons() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("JSESSIONID");

  if (sessionCookie) {
    return (
      <Button asChild className="px-6 h-12 text-lg rounded-xl">
        <Link href="/dashboard">Voltar ao Dashboard</Link>
      </Button>
    );
  }

  return (
    <>
      <Button asChild className="px-6 h-12 text-lg rounded-xl">
        <Link href="/signup">Cadastrar</Link>
      </Button>
      <Button asChild className="px-6 h-12 text-lg rounded-xl">
        <Link href="/login">Login</Link>
      </Button>
    </>
  );
}
