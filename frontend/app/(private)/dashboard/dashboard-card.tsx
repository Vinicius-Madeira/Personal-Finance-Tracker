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
import { Item } from "../types";
import { Badge } from "@/components/ui/badge";

interface DashboardCardProps {
  item: Item;
  updateAction: (prevState: any, formData: FormData) => any;
  deleteAction: (prevState: any) => any;
}

export default function DashboardCard({
  item,
  updateAction,
  deleteAction,
}: DashboardCardProps) {
  return (
    <Card className="relative pt-6 pb-3 rounded-lg">
      <CardHeader className="flex justify-between">
        <CardTitle className="truncate">{item.titulo}</CardTitle>
        <CardDescription className="text-xs">
          {format(parseLocalDate(item.data), "P", { locale: ptBR })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <span className="text-2xl font-mono text-bold text-green-500">{`${currency.format(
            item.valor
          )}`}</span>
        </div>
        <div className="flex justify-between mt-4">
          <span className="text-xs text-neutral-400 truncate max-w-40">
            {item.descricao}
          </span>
          <Badge variant="outline" className="text-xs">
            {item.categoria}
          </Badge>
        </div>
        <DashboardCardActions
          item={item}
          updateAction={updateAction}
          deleteAction={deleteAction}
        />
      </CardContent>
    </Card>
  );
}
