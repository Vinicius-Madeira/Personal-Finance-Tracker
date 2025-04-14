import DashboardCard from "@/app/(private)/dashboard/dashboard-card";
import CustomPieChart from "./dashboard-pie-chart";
import CustomBarChart from "./dashboard-bar-chart";
import DashboardAddForm from "@/app/(private)/dashboard/dashboard-add-form";
import { apiURL } from "@/utils/api";
import { cookies } from "next/headers";
import { Income } from "../types";

export default async function IncomesTab() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("JSESSIONID");
  if (!sessionCookie) {
    console.log("no session cookie found: incomes-tab");
    return;
  }

  const response = await fetch(`${apiURL}/api/renda/all`, {
    headers: {
      Cookie: `JSESSIONID=${sessionCookie.value}`,
    },
    cache: "no-cache",
    next: {
      tags: ["create-renda", "update-renda", "delete-renda"],
      revalidate: 600,
    },
  });
  const incomes = (await response.json()) as Income[];

  return (
    <>
      <DashboardAddForm />
      <div id="cards" className="grid grid-cols-5 gap-4 mt-8">
        {incomes.map((income) => (
          <DashboardCard key={income.id} income={income} />
        ))}
      </div>
      <div id="charts" className="grid grid-cols-2 mt-4 gap-4">
        <CustomPieChart incomes={incomes} />
        <CustomBarChart incomes={incomes} />
      </div>
    </>
  );
}
