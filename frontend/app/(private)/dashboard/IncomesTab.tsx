import DashboardCard from "@/components/DashboardCard";
import CustomPieChart from "./CustomPieChart";

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
      <div id="charts" className="grid grid-cols-2 mt-8 ml-[30%]">
        <CustomPieChart incomes={incomes} />
      </div>
    </>
  );
}
