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
import { useActionState, useEffect, useTransition } from "react";
import { showSuccessToast } from "@/components/success-toast";
import { showErrorToast } from "@/components/error-toast";
import Spinner from "@/components/spinner";
import { deleteIncome } from "./actions/deleteIncome";

interface DashboardCardProps {
  income: Income;
}

export default function DashboardCardActions({ income }: DashboardCardProps) {
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

  useEffect(() => {
    if (state.status === "success") {
      showSuccessToast(state.message);
    }
    if (state.status === "error") {
      showErrorToast(state.message, "Por favor, tente novamente.");
    }
  }, [state]);

  return (
    <div id="action-buttons">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Pen />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-100">
          <DialogHeader>
            <DialogTitle>
              Editando &#8594;{" "}
              <span className="font-bold">{income.titulo}</span>
            </DialogTitle>
            <DialogDescription>Edição de formulário</DialogDescription>
          </DialogHeader>
          <DashboardUpdateForm income={income} />
        </DialogContent>
      </Dialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Trash />
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
                {isDeletePending ? "Excluindo..." : "Excluir"}
                {isDeletePending && <Spinner />}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
