"use client";

import { User } from "@/app/api/user";
import Spinner from "@/components/spinner";
import { showSuccessToast } from "@/components/success-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { frontendURL } from "@/utils/api";
import { LogOut, UserRoundPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ProfileMenuProps {
  userData: User;
}

export default function ProfileMenu({ userData }: ProfileMenuProps) {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function onClick() {
    setPending(true);
    const response = await fetch(`${frontendURL}/api/logout`, {
      method: "POST",
    });
    if (response.ok) {
      showSuccessToast("Você foi deslogado!");
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
            <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-min p-4 mt-1 flex flex-col items-center">
        <div className="flex flex-col">
          <h4 className="text-md font-bold text-center">{userData.name}</h4>
          <span className="mt-1 text-xs font-light text-neutral-300 text-center">
            {userData.user}
          </span>
        </div>
        <Separator className="mt-3 mb-2" />
        <Button
          variant="ghost"
          onClick={() => {
            toast("Esta funcionalidade estará disponível na versão 2.0");
          }}
        >
          <UserRoundPen />
          Perfil
        </Button>
        <Button variant="ghost" onClick={onClick}>
          <LogOut />
          {pending ? "Saindo..." : "Sair"}
          {pending && <Spinner />}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
