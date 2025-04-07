"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CountdownProps {
  redirectURL: string;
}

export default function Countdown({ redirectURL }: CountdownProps) {
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
    if (counter === 0) router.push(redirectURL);
  }, [counter]);

  return (
    <h4 className="text-2xl text-neutral-400">
      Você será redirecionado em {counter}{" "}
      {counter > 1 ? "segundos" : "segundo"}.
    </h4>
  );
}
