import DashboardCard from "@/app/(private)/dashboard/dashboard-card";
import CustomPieChart from "./dashboard-pie-chart";
import CustomBarChart from "./dashboard-bar-chart";
import DashboardAddForm from "@/app/(private)/dashboard/dashboard-add-form";
import { apiURL } from "@/utils/api";
import { cookies } from "next/headers";
import { Item } from "../types";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToastHandler } from "./toast-handler";
import { createExpense } from "./actions/createExpense";
import { updateExpense } from "./actions/updateExpense";
import { deleteExpense } from "./actions/deleteExpense";
import DownloadStatistics from "./download-statistics";

export default async function ExpensesTab() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("JSESSIONID");
  if (!sessionCookie) {
    console.log("no session cookie found: incomes-tab");
    redirect("/login");
  }

  const response = await fetch(`${apiURL}/api/gasto/all`, {
    headers: {
      Cookie: `JSESSIONID=${sessionCookie.value}`,
    },
    cache: "no-cache",
    next: {
      tags: ["create-expense", "update-expense", "delete-expense"],
      revalidate: 600,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      console.log("user not authenticated, need to login");
      throw new Error("Seu usuário não está autenticado.", { cause: 401 });
    } else {
      console.error(
        `Unexpected error.\nStatus code: ${response.status}.\n`,
        "Try refreshing the page."
      );
      console.log(await response.json());
      return;
    }
  }

  const expenses = (await response.json()) as Item[];
  return (
    <>
      <DashboardAddForm
        title="Novo Gasto"
        buttonText="Novo Gasto"
        createAction={createExpense}
      />
      <DownloadStatistics buttonText="Baixar Relatório" />
      <ToastHandler items={expenses.length} />

      {(expenses.length === 0 && (
        <div className="w-fit mx-auto my-16">
          <p className="font-bold text-4xl">
            Clique em{" "}
            <span className="text-primary">&quot;Novo Gasto&quot;</span> para
            começar a gerenciar seus gastos.
          </p>
        </div>
      )) || (
        <>
          <ScrollArea className="h-48 p-2 rounded-md mt-2">
            <div id="cards" className="grid grid-cols-5 gap-4">
              {expenses.map((expense) => (
                <DashboardCard
                  key={expense.id}
                  item={expense}
                  updateAction={updateExpense}
                  deleteAction={deleteExpense}
                />
              ))}
            </div>
          </ScrollArea>
          <div id="charts" className="grid grid-cols-2 mt-4 gap-4">
            <CustomPieChart
              title="Gasto"
              description="gasto(s)"
              items={expenses}
            />
            <CustomBarChart
              title="Gasto"
              description="gasto"
              items={expenses}
            />
          </div>
        </>
      )}
    </>
  );
}
