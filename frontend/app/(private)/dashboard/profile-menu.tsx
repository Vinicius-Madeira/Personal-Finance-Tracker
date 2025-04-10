"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { frontendURL } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function ProfileMenu() {
  const router = useRouter();

  async function onClick() {
    console.log("logging out...");
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
          <Avatar className="cursor-pointer">
            <AvatarImage src="" />
            <AvatarFallback>V</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-min p-0 mt-1">
        <Button variant="ghost" onClick={onClick}>
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
}
