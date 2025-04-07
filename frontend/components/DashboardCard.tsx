import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import DashboardCardActions from "./DashboardCardActions";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { currency } from "@/utils/format";

interface DashboardCardProps {
  title: string;
  date: Date;
  value: number;
}

export default function DashboardCard({
  title,
  date,
  value,
}: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle className="truncate">{title}</CardTitle>
        <CardDescription className="text-xs">
          {format(date, "P", { locale: ptBR })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <span className="text-bold text-green-400">{`${currency.format(
          value
        )}`}</span>
        <DashboardCardActions title={title} date={date} value={value} />
      </CardContent>
    </Card>
  );
}
