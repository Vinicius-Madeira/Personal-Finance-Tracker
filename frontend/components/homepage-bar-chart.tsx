"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartItem {
  date: string;
  incomes: number;
  expenses: number;
}

const chartData: ChartItem[] = [
  { date: "2024-04-30", incomes: 52_103, expenses: 31_914 },
  { date: "2024-05-31", incomes: 97_601, expenses: 53_301 },
  { date: "2024-06-30", incomes: 81_210, expenses: 35_041 },
  { date: "2024-07-31", incomes: 242_582, expenses: 104_195 },
  { date: "2024-08-31", incomes: 373_323, expenses: 135_577 },
  { date: "2024-09-30", incomes: 301_921, expenses: 153_345 },
  { date: "2024-10-31", incomes: 245_710, expenses: 149_761 },
  { date: "2024-11-30", incomes: 409_245, expenses: 201_977 },
  { date: "2024-12-31", incomes: 293_924, expenses: 110_590 },
  { date: "2025-01-31", incomes: 261_209, expenses: 190_561 },
  { date: "2025-02-28", incomes: 327_887, expenses: 171_156 },
  { date: "2025-03-31", incomes: 292_437, expenses: 145_059 },
];

const chartConfig = {
  views: {
    label: "R$",
  },
  incomes: {
    label: "incomes",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function CustomChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("incomes");

  const total = React.useMemo(
    () => ({
      incomes: chartData.reduce((acc, curr) => acc + curr.incomes, 0),
      expenses: chartData.reduce((acc, curr) => acc + curr.expenses, 0),
    }),
    []
  );

  return (
    <Card className="">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6">
          <CardTitle className="text-2xl">
            Gráfico de Barras Interativo
          </CardTitle>
          <CardDescription>
            Exibindo Ganhos e Gastos dos últimos 12 meses
          </CardDescription>
        </div>
        <div className="flex">
          {["incomes", "expenses"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 "
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label === "incomes" ? "Ganhos" : "Gastos"}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 4,
              right: 4,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("pt-BR", {
                  month: "2-digit",
                  year: "2-digit",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar
              dataKey={activeChart}
              fill={`var(--${
                activeChart == "incomes" ? "primary" : "chart-2"
              })`}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
