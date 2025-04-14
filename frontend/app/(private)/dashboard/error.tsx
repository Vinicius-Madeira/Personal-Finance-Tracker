"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { frontendURL } from "@/utils/api";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="grid justify-items-center p-4 mt-16">
      <h2 className="text-red-400 text-5xl max-w-[25ch] text-center">
        Opa! Houve um problema durante a execução da aplicação!
      </h2>
      <p className="text-2xl mt-8">{error.message}</p>
      <Button
        variant="outline"
        className="mt-4"
        onClick={async () => {
          await fetch(`${frontendURL}/api/logout`, { method: "POST" });
          reset();
        }}
      >
        Voltar à tela de login
      </Button>
    </div>
  );
}
