import DashboardCard from "@/components/dashboard-card";
import CustomPieChart from "./dashboard-pie-chart";
import CustomBarChart from "./dashboard-bar-chart";
import { Button } from "@/components/ui/button";
import { ListPlus } from "lucide-react";
import DashboardAddForm from "@/components/dashboard-add-form";

interface Income {
  title: string;
  date: Date;
  value: number;
}

export default async function IncomesTab() {
  const data = await fetch("http://localhost:4000/incomes");
  const incomes = (await data.json()) as Income[];
  return (
    <>
      <DashboardAddForm />
      <div id="cards" className="grid grid-cols-5 gap-4 mt-8">
        {incomes.map((income) => (
          <DashboardCard
            key={income.value}
            title={income.title}
            date={income.date}
            value={income.value}
          />
        ))}
      </div>
      <div id="charts" className="grid grid-cols-2 mt-4 gap-4">
        <CustomPieChart incomes={incomes} />
        <CustomBarChart incomes={incomes} />
      </div>
    </>
  );
}
