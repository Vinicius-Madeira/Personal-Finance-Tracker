import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncomesTab from "./incomes-tab";
import ProfileMenu from "./profile-menu";

export default function Dashboard() {
  return (
    <div className="flex flex-col px-16 pt-8 mx-24">
      <div id="top-section" className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <ProfileMenu />
      </div>
      <Tabs defaultValue="incomes" className="w-[100%]">
        <TabsList className="h-9.5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="incomes">Renda</TabsTrigger>
          <TabsTrigger value="expenses">Gastos</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          Esta aba estará disponível na versão 2.0
        </TabsContent>
        <TabsContent value="incomes">
          <IncomesTab />
        </TabsContent>
        <TabsContent value="expenses">Aba de gastos!</TabsContent>
      </Tabs>
    </div>
  );
}
