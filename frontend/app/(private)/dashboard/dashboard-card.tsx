import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import DashboardCardActions from "./dashboard-card-actions";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { currency, parseLocalDate } from "@/utils/format";
import { Income } from "../types";
import { Badge } from "@/components/ui/badge";

interface DashboardCardProps {
  income: Income;
}

export default function DashboardCard({ income }: DashboardCardProps) {
  return (
    <Card className="relative pt-6 pb-3 rounded-lg">
      <CardHeader className="flex justify-between">
        <CardTitle className="truncate">{income.titulo}</CardTitle>
        <CardDescription className="text-xs">
          {format(parseLocalDate(income.data), "P", { locale: ptBR })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="">
          <span className="text-2xl font-mono text-bold text-green-500">{`${currency.format(
            income.valor
          )}`}</span>
        </div>
        <div className="flex justify-between mt-4">
          <span className="text-xs text-neutral-400 truncate max-w-40">
            {income.descricao}
          </span>
          <Badge variant="outline" className="text-xs">
            {income.categoria}
          </Badge>
        </div>
        <DashboardCardActions income={income} />
      </CardContent>
    </Card>
  );
}
