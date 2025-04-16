"use client";

import Spinner from "@/components/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { frontendURL } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileMenu() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function onClick() {
    console.log("logging out...");
    setPending(true);
    const response = await fetch(`${frontendURL}/api/logout`, {
      method: "POST",
    });
    if (response.ok) {
      console.log("user logged out successfully!");
      router.push("/");
    } else {
      console.log(response.text());
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" asChild>
          <Avatar className="cursor-pointer rounded-2xl">
            <AvatarImage src="" />
            <AvatarFallback>V</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-min p-0 mt-1 flex items-center">
        <Button variant="ghost" onClick={onClick}>
          {pending ? "Saindo..." : "Sair"}
        </Button>
        {pending && <Spinner />}
      </PopoverContent>
    </Popover>
  );
}
