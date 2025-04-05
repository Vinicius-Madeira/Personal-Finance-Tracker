"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Auth() {
  const [counter, setCounter] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup if component unmounts early
  }, []);

  useEffect(() => {
    if (counter === 0) router.push("/dashboard");
  }, [counter]);

  return (
    <div className="grid grid-rows-[1fr_20px] justify-items-center p-4 mt-50">
      <h1 className="font-bold text-5xl mb-4">
        Esta página estará disponível na versão 2.0!
      </h1>
      <h4 className="text-2xl text-neutral-400">
        Você será redirecionado em {counter} segundos.
      </h4>
    </div>
  );
}
