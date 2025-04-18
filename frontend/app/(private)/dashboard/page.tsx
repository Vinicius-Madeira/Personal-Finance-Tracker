import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncomesTab from "./incomes-tab";
import ProfileMenu from "./profile-menu";
import ExpensesTab from "./expenses-tab";
import { getUser } from "@/app/api/user";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import OverviewTab from "./overview-tab";

export default function Dashboard() {
  return (
    <div className="flex flex-col px-16 pt-8 mx-24">
      <div id="top-section" className="flex justify-between items-center mb-6">
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardHeader />
        </Suspense>
      </div>
      <Tabs defaultValue="incomes" className="w-[100%]">
        <TabsList className="h-9.5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="incomes">Renda</TabsTrigger>
          <TabsTrigger value="expenses">Gastos</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="incomes">
          <IncomesTab />
        </TabsContent>
        <TabsContent value="expenses">
          <ExpensesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

async function DashboardHeader() {
  const userData = await getUser();

  if (!userData) {
    console.log("User is null. Logging out");
    const response = await fetch("/api/logout", {
      method: "POST",
    });
    if (response.ok) {
      redirect("/login");
    } else {
      console.log(response.text());
    }
    return;
  }

  return (
    <>
      <h1 className="text-4xl font-medium">
        Dashboard - <span className="font-bold">{userData.name}</span>
      </h1>
      <ProfileMenu userData={userData} />
    </>
  );
}
