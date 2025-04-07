import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncomesTab from "./IncomesTab";

export default function Dashboard() {
  return (
    <div className="flex flex-col px-16 pt-8 mx-24">
      <div id="top-section" className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>V</AvatarFallback>
        </Avatar>
      </div>
      <Tabs defaultValue="overview" className="w-[100%]">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="incomes">Ganhos</TabsTrigger>
          <TabsTrigger value="expenses">Gastos</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          Esta aba estará disponível na versão 2.0
        </TabsContent>
        <TabsContent value="incomes">
          <IncomesTab />
        </TabsContent>
        <TabsContent value="expenses">Getting expensive!</TabsContent>
      </Tabs>
    </div>
  );
}
