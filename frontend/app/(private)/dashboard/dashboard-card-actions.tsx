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
import { Item } from "../types";
import DashboardUpdateForm from "./dashboard-update-form";
import { useActionState, useEffect, useState, useTransition } from "react";
import Spinner from "@/components/spinner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { showErrorToast } from "@/components/error-toast";

interface DashboardCardActionsProps {
  item: Item;
  updateAction: (prevState: any, formData: FormData) => any;
  deleteAction: (prevState: any) => any;
}

export default function DashboardCardActions({
  item,
  updateAction,
  deleteAction,
}: DashboardCardActionsProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [state, deleteItem] = useActionState(deleteAction, {
    id: item.id,
    status: "",
    message: "",
  });
  const [isDeletePending, startDeleteTransition] = useTransition();

  function onDelete() {
    startDeleteTransition(() => {
      deleteItem();
    });
  }

  function closeMenu(open: boolean) {
    if (!open) setMenuOpen(false);
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
          <Edit item={item} onEdit={updateAction} onOpen={closeMenu} />
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
  item: Item;
  onEdit: (prevState: any, formData: FormData) => any;
  onOpen: (open: boolean) => void;
}
export function Edit({ item, onEdit, onOpen }: EditProps) {
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
            Editando &#8594; <span className="font-bold">{item.titulo}</span>
          </DialogTitle>
          <DialogDescription>Altere os campos abaixo</DialogDescription>
        </DialogHeader>
        <DashboardUpdateForm item={item} editAction={onEdit} />
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
          <AlertDialogTitle>Excluir Item?</AlertDialogTitle>
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
