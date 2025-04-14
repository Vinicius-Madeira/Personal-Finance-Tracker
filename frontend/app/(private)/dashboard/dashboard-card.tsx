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

interface DashboardCardProps {
  income: Income;
}

export default function DashboardCard({ income }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle className="truncate">{income.titulo}</CardTitle>
        <CardDescription className="text-xs">
          {format(parseLocalDate(income.data), "P", { locale: ptBR })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <span className="text-bold text-green-400">{`${currency.format(
          income.valor
        )}`}</span>
        <DashboardCardActions income={income} />
      </CardContent>
    </Card>
  );
}
