"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Income } from "../types";

interface ChartData {
  month: string;
  income: number;
}
const chartData: ChartData[] = [
  { month: "January", income: 186 },
  { month: "February", income: 305 },
  { month: "March", income: 237 },
  { month: "April", income: 73 },
  { month: "May", income: 209 },
  { month: "June", income: 214 },
];
const chartConfig = {
  desktop: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface CustomBarChartProps {
  incomes: Income[];
}

export default function CustomBarChart({ incomes }: CustomBarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl">Renda Mensal</CardTitle>
        <CardDescription className="text-center">
          January - June 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="income" fill="var(--chart-2)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
