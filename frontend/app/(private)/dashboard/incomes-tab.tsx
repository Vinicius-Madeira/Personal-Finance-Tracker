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
import { createIncome } from "./actions/createIncome";
import { updateIncome } from "./actions/updateIncome";
import { deleteIncome } from "./actions/deleteIncome";
import DownloadStatistics from "./download-statistics";

export default async function IncomesTab() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("JSESSIONID");
  if (!sessionCookie) {
    console.log("no session cookie found: incomes-tab");
    redirect("/login");
  }

  const response = await fetch(`${apiURL}/api/renda/all`, {
    headers: {
      Cookie: `JSESSIONID=${sessionCookie.value}`,
    },
    cache: "no-cache",
    next: {
      tags: ["create-income", "update-income", "delete-income"],
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

  const incomes = (await response.json()) as Item[];
  return (
    <>
      <DashboardAddForm
        title="Nova Renda"
        buttonText="Nova Renda"
        createAction={createIncome}
      />
      <DownloadStatistics buttonText="Baixar Relatório" />
      <ToastHandler items={incomes.length} />

      {(incomes.length === 0 && (
        <div className="w-fit mx-auto my-16">
          <p className="font-bold text-4xl">
            Clique em{" "}
            <span className="text-primary">&quot;Nova Renda&quot;</span> para
            começar a gerenciar suas rendas.
          </p>
        </div>
      )) || (
        <>
          <ScrollArea className="h-48 p-2 rounded-md mt-2">
            <div id="cards" className="grid grid-cols-5 gap-4">
              {incomes.map((income) => (
                <DashboardCard
                  key={income.id}
                  item={income}
                  updateAction={updateIncome}
                  deleteAction={deleteIncome}
                />
              ))}
            </div>
          </ScrollArea>
          <div id="charts" className="grid grid-cols-2 mt-4 gap-4">
            <CustomPieChart
              title="Renda"
              description="renda(s)"
              items={incomes}
            />
            <CustomBarChart title="Renda" description="renda" items={incomes} />
          </div>
        </>
      )}
    </>
  );
}
