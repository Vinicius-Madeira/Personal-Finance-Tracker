"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Pen, Trash } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { Income } from "../types";
import DashboardUpdateForm from "./dashboard-update-form";
import { useActionState, useEffect, useState, useTransition } from "react";
import Spinner from "@/components/spinner";
import { deleteIncome } from "./actions/deleteIncome";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { showErrorToast } from "@/components/error-toast";

interface DashboardCardProps {
  income: Income;
}

export default function DashboardCardActions({ income }: DashboardCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [state, deleteAction] = useActionState(deleteIncome, {
    id: income.id,
    status: "",
    message: "",
  });
  const [isDeletePending, startDeleteTransition] = useTransition();

  function onDelete() {
    startDeleteTransition(() => {
      deleteAction();
    });
  }

  function closeMenu(open: boolean) {
    !open && setMenuOpen(false);
  }

  useEffect(() => {
    if (state.status === "error") {
      showErrorToast(state.message, "Por favor, tente novamente.");
    }
  }, [state]);

  return (
    <div id="action-buttons" className="flex flex-col">
      <Popover
        open={menuOpen}
        onOpenChange={() => setMenuOpen((open) => !open)}
      >
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="absolute top-[-2] right-1 w-8 h-2 pb-5 text-2xl font-medium text-gray-900 dark:text-neutral-400"
          >
            ...
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0 flex flex-col items-center">
          <Edit income={income} onOpen={closeMenu} />
          <Delete
            pendingState={isDeletePending}
            onDelete={onDelete}
            onOpen={closeMenu}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface EditProps {
  income: Income;
  onOpen: (open: boolean) => void;
}
export function Edit({ income, onOpen }: EditProps) {
  return (
    <Dialog onOpenChange={onOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Pen />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="w-100">
        <DialogHeader>
          <DialogTitle>
            Editando &#8594; <span className="font-bold">{income.titulo}</span>
          </DialogTitle>
          <DialogDescription>Altere os campos abaixo</DialogDescription>
        </DialogHeader>
        <DashboardUpdateForm income={income} />
      </DialogContent>
    </Dialog>
  );
}

interface DeleteProps {
  pendingState: boolean;
  onDelete: () => void;
  onOpen: (open: boolean) => void;
}
function Delete({ pendingState, onDelete, onOpen }: DeleteProps) {
  return (
    <AlertDialog onOpenChange={onOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <Trash />
          Excluir
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-fit">
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Renda?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-self-center">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={onDelete}>
              {pendingState ? "Excluindo..." : "Excluir"}
              {pendingState && <Spinner />}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
