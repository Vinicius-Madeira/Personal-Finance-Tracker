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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

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
        {true && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="absolute top-[-2] right-1 w-8 h-2 pb-5 text-2xl font-medium text-gray-900 dark:text-neutral-400"
              >
                ...
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-0 flex-col items-center">
              <DashboardCardActions income={income} />
            </PopoverContent>
          </Popover>
        )}
      </CardContent>
    </Card>
  );
}
